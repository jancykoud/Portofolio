# ARCHITECTURE — KOUD v2

## 1. Décisions techniques

| Choix | Décision | Justification |
|---|---|---|
| Framework | **Next.js 15.5 (App Router)**, React 19 | Continuité avec l'existant (pas de réécriture de paradigme). La 15.5 est stable et bien supportée par `@netlify/plugin-nextjs`. La 16.x est possible plus tard via codemod. |
| Langage | **TypeScript strict** | Demandé ; sécurise le modèle de contenu (un projet mal renseigné casse le build, pas la prod) |
| Rendu | **Sortie de `output: "export"`** → SSG par défaut + 2 route handlers serveur | Indispensable pour `/api/chat` (clé IA côté serveur) et `/api/contact` (actuellement cassé). Toutes les pages restent pré-rendues statiquement. |
| Styles | **Tailwind CSS v4** + variables CSS sémantiques | Les thèmes deviennent de simples redéfinitions de variables : zéro JS pour changer de thème, zéro flash |
| Animations | **motion** (successeur de framer-motion) | Déjà dans les habitudes du projet ; suffisant pour reveal, stagger, layout transitions, filtres |
| 3D | **three** (sans React Three Fiber), chargé dynamiquement | Une seule scène, ~130 kB gz chargés **après** l'affichage, uniquement si desktop + mouvement autorisé + mode non-lite. R3F ajouterait un runtime React sans bénéfice pour une scène unique. |
| GSAP | **Non retenu** | Pas de timeline complexe ni de scroll-scrubbing nécessitant GSAP ; motion couvre le besoin |
| Lenis | **Non retenu** | Le smooth-scroll détourné nuit à l'accessibilité et au contrôle utilisateur |
| React Bits | **Non retenu** | Les effets sont écrits sur mesure, tokenisés et testés |
| Composants accessibles | `@radix-ui/react-dialog` (déjà présent) | Focus trap, `aria-modal`, Échap : utilisé pour le menu mobile, la lightbox et KOUD AI plein écran |
| Icônes | `lucide-react` (déjà présent) | On retire `react-icons` (doublon). Les logos GitHub/LinkedIn sont en SVG inline. |
| MDX | `next-mdx-remote/rsc` + `rehype-pretty-code` (Shiki) + `rehype-slug` | Rendu côté serveur, coloration syntaxique **au build** (0 kB client), sommaire généré |
| Validation | `zod` | Entrées du chat et du formulaire de contact |
| IA | `@anthropic-ai/sdk`, Messages API en streaming | Voir §4 |
| E-mail | `resend` (déjà présent) | Déjà prévu par le projet, clé déjà possédée |
| CMS headless | **Non retenu pour l'instant** | Volume faible (≈ 10 projets, quelques articles). Les fichiers typés versionnés dans Git sont plus sûrs et sans coût. Le modèle de contenu est isolé dans `content/` : une migration vers un CMS ne toucherait que `lib/content.ts`. |
| Stockage des contacts | **Non retenu** | Le message est transmis par e-mail (Resend) et non stocké : pas de base de données à sécuriser, conforme au principe de minimisation RGPD |
| Tests | **Playwright** (parcours + captures + axe) | Demandé ; déjà installé sur la machine |

## 2. Arborescence

```
app/
  layout.tsx            # polices, script anti-flash de thème, header/footer, KOUD AI
  page.tsx              # accueil
  projets/page.tsx      # showroom (filtres)
  projets/[slug]/page.tsx  # étude de cas
  a-propos/page.tsx     # parcours, timeline, formation, CV
  services/page.tsx
  video/page.tsx        # lecteur + storyboard
  blog/page.tsx, blog/[slug]/page.tsx
  lab/page.tsx
  contact/page.tsx
  api/chat/route.ts     # KOUD AI (streaming)
  api/contact/route.ts  # Resend
  sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
  globals.css           # Tailwind v4 + @theme
  styles/tokens.css     # 5 thèmes + modificateurs
components/
  layout/   SiteHeader, MobileMenu, SiteFooter, ThemeStudio
  ui/       Button, Eyebrow, Tag, Panel, SectionHeading, Reveal
  home/     Hero, HeroScene (three), FeaturedProject, ...
  projects/ Showroom, ProjectCard, ProjectCover, Gallery, Lightbox, CaseStudyNav, ArchitectureDiagram
  about/    Timeline
  video/    VideoPlayer, Storyboard
  chat/     KoudAI, ChatMessages, useChat
  contact/  ContactForm
  mdx/      Prose, Toc
  lab/      ContrastInspector, ParticleLab
content/
  site.ts        # identité, liens, faits vérifiés
  projects.ts    # modèle Project typé (draft/published, champs vérifiés)
  experience.ts  # expériences, formations, formation continue
  services.ts
  video.ts       # storyboard + sources (null tant que la vidéo n'existe pas)
  blog/*.mdx
lib/
  content.ts     # accès aux contenus, filtrage des brouillons
  theme.ts       # thèmes, script d'init
  ai/knowledge.ts  # base de connaissances générée depuis content/
  ai/rate-limit.ts
  mdx.ts, seo.ts, utils.ts
tests/   *.spec.ts (Playwright)
```

## 3. Modèle de contenu (extrait)

```ts
type Project = {
  slug: string; name: string; formerName?: string;
  tagline: string; summary: string;
  categories: ProjectCategory[];        // filtres du showroom
  status: "production" | "in-progress" | "confidential" | "archived" | "prototype";
  year: string; role: string; context?: string;
  stack: string[];                       // uniquement des technologies sourcées
  problem?: string; solution?: string; architecture?: ArchitectureNode[];
  challenges?: string[]; outcomes?: Fact[]; learnings?: string[];
  facts?: Fact[];                        // { value, label, source } — sans source → non affiché
  media: { screens: Screen[]; video?: VideoRef };
  links: { label: string; href: string; kind: "live" | "repo" | "demo" | "video" }[];
  featured?: boolean;
  draft?: boolean;                       // brouillon : exclu du build, du sitemap et de KOUD AI
  missing?: string[];                    // contenus attendus, affichés dans CONTENT_INVENTORY
};
```

Ajouter un projet = ajouter un objet à `content/projects.ts` (+ captures dans `public/projects/<slug>/`). Aucun composant à toucher.

## 4. KOUD AI

```
Navigateur ──POST /api/chat {messages}──▶ Route handler (Node)
  │                                        1. Origine vérifiée (même site)
  │                                        2. Rate limit IP (10 req / 5 min, fenêtre glissante)
  │                                        3. zod : ≤ 12 messages, ≤ 1 200 car./message
  │                                        4. system = règles + base de connaissances (cache_control)
  │                                        5. client.beta.messages.stream(...)
  ◀────────── text/plain en flux ──────────┘
```

- **Modèle configurable** : `KOUD_AI_MODEL` (défaut `claude-opus-5-5`), `effort: low` (chat), `max_tokens` borné à 1 500.
- **Sécurité** : la clé `ANTHROPIC_API_KEY` n'existe que côté serveur. Sans clé, l'API répond 503 et le widget affiche honnêtement « KOUD AI n'est pas encore activé ». Aucune réponse codée en dur.
- **Anti-hallucination** : la base de connaissances est générée **depuis les mêmes fichiers `content/`** que le site (une seule source de vérité, brouillons exclus). Le prompt impose de répondre uniquement à partir de cette base, de dire « je ne sais pas » sinon, et de renvoyer vers les pages internes.
- **Refus** : `fallbacks: "default"` (beta `server-side-fallback-2026-07-01`) ; un `stop_reason: "refusal"` résiduel produit un message neutre.
- **Abus** : limite de débit, taille des entrées bornée, historique tronqué aux 12 derniers messages, aucun outil exposé au modèle (surface d'injection nulle).
- **Conservation** : **aucune conversation stockée côté serveur** ; l'historique vit dans `sessionStorage` (effacé à la fermeture de l'onglet, bouton « Réinitialiser »). Mention affichée dans le widget.
- **Limite connue** : le rate limiting en mémoire est par instance serverless. Pour une garantie globale, brancher Upstash Redis (documenté, non installé : coût/compte à valider).

## 5. Thèmes sans flash

Un script inline bloquant dans `<head>` lit `localStorage["koud:prefs"]`, résout `system` via `matchMedia` et pose `data-theme`, `data-contrast`, `data-motion` et `data-perf` sur `<html>` **avant le premier rendu**. Les composants ne lisent que des variables CSS. Pendant un changement de thème, une classe `theme-transition` active 300 ms de transition des couleurs, sauf en mouvement réduit.

## 6. Déploiement

Netlify, avec le runtime Next.js (`@netlify/plugin-nextjs`, auto-détecté). Les pages sont statiques et les deux routes `/api/*` deviennent des Netlify Functions. Variables à définir dans Netlify : `ANTHROPIC_API_KEY`, `KOUD_AI_MODEL` (optionnel), `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
**Aucun déploiement n'est fait sans validation explicite.**

## 7. Redirections (préservation des URLs)

`/work → /projets`, `/resume → /a-propos`, `/learning → /a-propos#formation`, `/fun → /a-propos` (308, `next.config.ts`).

## 8. Internationalisation (FR / EN)

| Élément | Choix |
|---|---|
| URL | Français sans préfixe (URL historiques conservées : `/projets`, `/a-propos`…), anglais sous `/en` avec slugs anglais (`/en/projects`, `/en/about`…) |
| Arborescence | Toutes les pages vivent dans `app/[lang]/<dossier-français>` ; `[lang]` est le layout racine, il porte donc un vrai `<html lang>` |
| Routage | `next.config.ts` : réécritures *afterFiles* (URL publique → arbre interne), redirections 308 des formes internes (`/fr/…`, `/en/projets`) vers les formes publiques. Table unique : `lib/i18n/routing.ts` |
| 404 | `app/[lang]/[...rest]` appelle `notFound()`, si bien que la 404 s'affiche dans le bon layout (sans dépendre de `global-not-found`, encore expérimental) |
| Textes d'interface | `lib/i18n/dictionaries.ts` : dictionnaire FR typé, l'anglais doit avoir exactement les mêmes clés (erreur de compilation sinon) |
| Contenus | Source française dans `content/*.ts`, traductions dans `content/en/*.ts`, fusionnées par `lib/content.ts`. Faits, stacks et liens restent communs ; seule la formulation est traduite |
| Blog | Les articles restent en français (`lang="fr"` sur le contenu, mention sur les pages anglaises, URL française canonique) |
| SEO | `hreflang` fr / en / x-default sur chaque page, sitemap bilingue avec alternates, image Open Graph par langue |
| KOUD AI | Interface traduite ; la base de connaissances reste en français (source validée) et l'assistant répond dans la langue de l'utilisateur, avec les liens `/en` en anglais |

Ajouter une langue : ajouter le code dans `LOCALES`, une table de segments, un dictionnaire et des fichiers `content/<lang>/`.
