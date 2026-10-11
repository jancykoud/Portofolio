# AUDIT — Portfolio KOUD (état au 11/10/2026)

Point de retour arrière : tag Git `pre-redesign-v1` (commit `f72a866`, branche `main`).
Refonte : branche `redesign/koud-v2`.

## 1. Stack existante

| Élément | Constat |
|---|---|
| Framework | Next.js **14.2.12**, App Router, **JavaScript** (pas de TypeScript) |
| Rendu | `output: "export"` → site 100 % statique, `images.unoptimized: true` |
| Styles | Tailwind 3.4 + **styles inline massifs** (`style={{…}}` dans quasi tous les composants) |
| Animations | framer-motion 10.18 (rétrogradé volontairement depuis 11.x) |
| Polices | Playfair Display, Syne, Inter (next/font) + Geist / Geist Mono locales **non utilisées** |
| Contenu | Données projets codées en dur dans 3 fichiers différents (`app/page.jsx`, `app/work/page.jsx`, `components/ProjectCarousel.jsx`) ; blog en MDX (`content/blog`) ; JSON (`learning`, `fun`, `now`) |
| Déploiement | Netlify (`netlify.toml`, publish `out`, Node 20) |
| Script build | `npm install && next build` (installation répétée dans le build) |

## 2. Routes

| Route | État |
|---|---|
| `/` | Hero crème « JANCY KOUD », liste projets avec aperçu au survol, logos texte d'organisations, blocs colorés, footer horloge |
| `/work` | Grille bento + carrousel + `GitHubCard` |
| `/resume` | Timeline, onglets Expérience/Éducation/Compétences/À propos, 2 CV PDF |
| `/contact` | Formulaire (validation client + honeypot) |
| `/blog`, `/blog/[slug]` | 3 articles MDX, rendus via `remark-html` en HTML brut |
| `/learning` | 10 cours Cisco NetAcad avec **barres de progression en %** |
| `/fun` | Galerie de 3 **SVG de remplacement** légendés « Islande », « Rwanda », « Yaoundé » |

## 3. Défauts bloquants

1. **Formulaire de contact cassé en production.** Il appelle `POST /api/contact`, mais aucune route API n'existe et `output: "export"` interdit toute route serveur. Chaque envoi échoue.
2. **`GitHubCard` cassée.** Elle appelle `/api/github`, qui n'existe pas non plus. Elle affiche toujours son état d'erreur.
3. **Lien mort** : `github.com/jancykoud/CongoStore---E-commerce-Android-Application` répond 404 (dépôt supprimé ou privé).
4. **Le chatbot exigé par la refonte est incompatible avec l'export statique.** Il faut sortir de `output: "export"`.

## 4. Incohérences de contenu (à arbitrer par Jancy)

| Sujet | Sources en conflit |
|---|---|
| LinkedIn | `linkedin.com/in/jancykoudbanga` (footer accueil) vs `jancy-koud-banga` (CV + page CV) |
| Localisation | Clermont-Ferrand (site) vs adresse complète à Orsay (CV PDF) |
| Akili / EduConnect | La démo historique d'EduConnect (`edu-connect-web.vercel.app`) affiche aujourd'hui « Akili — L'intelligence éducative ». **Preuve d'un renommage** → présenté comme un seul produit. La maquette de référence décrit Akili comme une « Université numérique », ce qui contredit le site en ligne (gestion scolaire). |
| Akili — lancement | « Lancement sept. 2026 » ; on est en octobre 2026 → statut à mettre à jour |
| Wmbia | Nom « Wmbia » dans le repo, « WMBai — Assistant Biblique William Branham » sur wmbia.com |
| DECLIC | Présenté jusqu'ici sous le nom FROST-FORMS, avec le badge « Confidentiel » |
| Langues | « Français, Anglais, Chinois » (page CV) vs « Français natif, Anglais B2 » (CV PDF) |
| Expérience | « 2+ ans » (page CV), non daté |
| Accord grammatical | Le site mélange « Ingénieure »/« Développeuse » et « Ingénieur »/« Il ». La refonte écrit à la 1re personne et utilise des intitulés de poste neutres. |

## 5. Contenus non vérifiables présents sur le site actuel

- « Budget 12M€ » (TERRA FORMA), « 5+ projets livrés », « 100 % Passion », « 30k lignes de code » (maquette).
- Bandeau « Projets réalisés avec des organisations de référence » : il cite **Orange, Cisco** au même rang que CNRS/INRAE. Pour Cisco, il s'agit de cours NetAcad, pas d'une collaboration. Formulation trompeuse.
- Pourcentages de progression des cours NetAcad (interdits par le brief : pas de barres de compétences).
- Galerie « Détente » en SVG génériques présentés comme des souvenirs de voyage.
- `content/now.json` contient « À compléter ».

## 6. Sécurité & vie privée

- `my-app/` : copie imbriquée et obsolète du site avec son propre `.git`. Elle contient un **`.env.local` avec de vrais secrets** (GITHUB_TOKEN, RESEND_API_KEY). Non suivie par Git, désormais ajoutée à `.gitignore`. **Recommandation : faire tourner les deux clés et supprimer le dossier** (non fait automatiquement : opération destructive).
- Le commit `8fd2774` a publié dans l'historique Git des identifiants de démo (`directeur@horizon.ci / Admin1234!`). Ce sont des comptes de démo, mais à changer si l'instance est partagée.
- Le CV PDF public contient l'adresse postale complète.
- `public/assets/resume/stage.pdf` est un doublon octet pour octet de `CV_Koud-UM.pdf`.
- Le contenu du blog est injecté via `dangerouslySetInnerHTML`. Le risque est faible (contenu local), mais un rendu MDX natif est préférable.

## 7. Performance & accessibilité

- Toutes les pages sont `"use client"` (y compris du contenu statique) → JS inutile.
- Images non optimisées (`unoptimized`) ; captures PNG de 2,9k px servies brutes.
- Une horloge `setInterval` à 1 s sur l'accueil entraîne un re-render permanent.
- Survols gérés par `onMouseEnter` + mutation de `style` : pas d'équivalent clavier, pas de `:focus-visible`.
- Champ honeypot sans `aria-hidden` ; labels non reliés aux champs (`htmlFor` absent).
- Contrastes trop faibles : nombreux textes en `rgba(0,0,0,0.28–0.38)` sur crème et `rgba(255,255,255,0.25–0.35)` sur noir (< 4,5:1).
- Aucun `prefers-reduced-motion`. Le marquee est infini.
- Le preview flottant du survol projet est positionné en `right: 320px` fixe, ce qui casse sur mobile.
- `<html lang="fr">` est correct, mais l'accueil n'a pas de `<h1>` signifiant (il contient le nom en lettres décoratives).

## 8. Dépendances

- Utilisées mais remplaçables : swiper, embla, react-countup, react-masonry-css, leaflet/react-leaflet, canvas-confetti, yet-another-react-lightbox, react-icons (+ lucide en doublon), remark-html.
- `next-mdx-remote` installé mais **non utilisé**.
- `resend` installé, sans route serveur pour l'utiliser.

## 9. Fonctionnalités à préserver

| Fonctionnalité | Devenir |
|---|---|
| Blog MDX (3 articles) | Conservé, rendu MDX natif + coloration syntaxique + sommaire |
| CV téléchargeables (2) | Conservés |
| Formulaire de contact | **Réparé** (route serveur + Resend + validation zod) |
| Aperçu projet au survol | Repensé dans le Showroom |
| Barre de progression de lecture | Conservée |
| Cours en cours (NetAcad) | Conservés en liste « Formation continue », **sans pourcentages** |
| Anciennes URLs `/work`, `/resume`, `/learning`, `/fun` | Redirections 308 vers les nouvelles pages |
| Galerie « Détente » | Retirée : images génériques non représentatives (contrainte « aucune image générique »). Réintégrable dès que de vraies photos sont fournies. |
| GitHubCard | Retirée : jamais fonctionnelle. Réintégrable via une route serveur si souhaité. |
| Mode Recruteur/Freelance, Konami | Composants orphelins, non montés dans le layout actuel → supprimés |
