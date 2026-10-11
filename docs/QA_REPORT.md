# QA REPORT — KOUD v2 (11/10/2026)

Toutes les valeurs ci-dessous ont été **mesurées** sur le build de production local (`next build && next start`), sur la branche `redesign/koud-v2`. Elles ne valent pas mesure en production : à refaire sur une *deploy preview* Netlify avec PageSpeed Insights.

## 1. Vérifications statiques

| Contrôle | Résultat |
|---|---|
| `tsc --noEmit` (strict, `noUncheckedIndexedAccess`) | 0 erreur |
| `eslint .` (next/core-web-vitals + next/typescript) | 0 erreur, 0 avertissement |
| `next build` | OK — 26 routes ; toutes statiques sauf `/api/chat` et `/api/contact` |
| First Load JS | 103 kB partagés ; accueil 148 kB ; `/projets` 168 kB (motion pour les filtres animés) |

## 2. Tests Playwright — 98 réussis, 3 ignorés, 0 échec

| Suite | Couverture |
|---|---|
| `navigation` | 11 pages × desktop + mobile (Pixel 7) : statut 200, un seul `h1`, aucun débordement horizontal, **aucune erreur console** ; redirections 308 ; 404 ; brouillons non publiés (pages + sitemap) ; nav active ; menu mobile (Échap) ; lien d'évitement ; en-têtes de sécurité |
| `themes` | 5 thèmes × 2 niveaux de contraste : **8 paires de tokens ≥ WCAG AA** ; thème appliqué avant hydratation (pas de flash) ; System suit l'OS ; Theme Studio (thème, contraste, performance, persistance) ; radios au clavier ; repli statique sans GPU, en mouvement réduit, en mode allégé et sur mobile |
| `projects` | Filtres + URL partageable ; ouverture d'une étude de cas ; diagramme interactif DECLIC ; ancres de section ; projet suivant ; galerie (flèches, clavier, miniatures, plein écran, zoom, Échap) ; lien mort supprimé |
| `chat` | API sans clé → `configured:false` et **503 (aucune réponse codée en dur)** ; origine croisée → 403 ; widget « Non activé » ; flux, liens sûrs (`javascript:` neutralisé), historique de session et réinitialisation (**endpoint simulé : teste l'interface, pas le modèle**) ; erreur 429 affichée |
| `contact` | Validation serveur (400 + champs), honeypot, message « non configuré » avec l'e-mail ; validation client + focus ; sujet pré-rempli ; état succès (envoi simulé) |
| `a11y` | axe-core (WCAG 2.0/2.1/2.2 A/AA), 12 pages × thèmes Obsidian et Daylight : **0 violation sérieuse ou critique** |

Ignorés : 2 tests mobile-only dans le projet desktop, et le test WebGL GPU (headless sans GPU). Ce dernier a été **exécuté en mode headed avec GPU : réussi**.

## 3. Lighthouse 12.8 (local, Chromium 156)

| Page | Mobile (perf / a11y / BP / SEO) | LCP mobile | Desktop |
|---|---|---|---|
| `/` | 96 / 100 / 100 / 100 | 2,7 s | 100 / 100 / 100 / 100 |
| `/projets` | 94 / 100 / 100 / 100 | 3,1 s | 100 / 100 / 100 / 100 |
| `/projets/declic` | 97 / 100 / 100 / 100 | 2,6 s | 100 / 100 / 100 / 100 |
| `/a-propos` | 96 / 100 / 100 / 100 | 2,7 s | 100 / 100 / 100 / 100 |
| `/services` | 97 / 100 / 100 / 100 | 2,6 s | 100 / 100 / 100 / 100 |
| `/blog/qdrant-…` | 97 / 96* / 100 / 100 | 2,6 s | 100 / 96* / 100 / 100 |
| `/lab` | 97 / 100 / 100 / 100 | 2,6 s | 100 / 100 / 100 / 100 |
| `/contact` | 97 / 100 / 100 / 100 | 2,6 s | 100 / 100 / 100 / 100 |

\* Mesuré avant la correction du thème de code clair (orange à 3,48:1). Après passage à `github-light-high-contrast`, axe ne relève plus de violation sur cette page ; Lighthouse n'a pas été relancé.

CLS ≈ 0 partout ; TBT 0–60 ms. **Avertissement** : pendant une partie de la session, la machine a subi une charge système externe (moyenne de charge > 100, services macOS). Les mesures faites à ce moment-là (perf mobile 63–89) ont été écartées. Les chiffres ci-dessus proviennent d'une passe à charge normale.

## 4. Problèmes trouvés et corrigés pendant la QA

| Problème | Cause | Correctif |
|---|---|---|
| Clic sur une ancre de section interrompu | `scrollIntoView` (nav horizontale) scrollait aussi la fenêtre | Scroll du seul conteneur |
| Révélations invisibles après un saut de page | IntersectionObserver ne voit pas les éléments survolés trop vite | Révélation aussi des éléments déjà dépassés |
| LCP mobile 4,0 s | Titre du hero animé ligne par ligne | Animation réservée au desktop ; polices woff2 sous-ensemble (-58 %) |
| Scène WebGL à ~100 % CPU sans GPU | Rendu logiciel (SwiftShader) | `failIfMajorPerformanceCaveat` + détection → globe statique |
| Lien inline distingué par la couleur seule | — | Souligné |
| Contraste insuffisant (« PDF », thème de code clair) | Opacité / thème Shiki | Corrigés |
| Ordre des titres sur `/projets` | `h3` directement sous le `h1` | Niveau de titre configurable |

## 5. Sécurité

- Clés uniquement côté serveur ; CSP stricte (sauf `'unsafe-inline'`, nécessaire au script de thème anti-flash), `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, pas de `X-Powered-By`.
- Entrées validées par zod ; origine vérifiée ; limitation de débit ; honeypot + délai minimal ; HTML d'e-mail échappé ; liens du chat filtrés.
- `npm audit --omit=dev` après `npm audit fix` : il reste PostCSS (embarqué dans Next, utilisé au build sur nos propres CSS) et js-yaml (via gray-matter, sur nos propres MDX). Le correctif exige **Next 16** (montée de version majeure, à planifier).
- **À faire par Jancy** : faire tourner `GITHUB_TOKEN` et `RESEND_API_KEY` présents dans `my-app/.env.local`, puis supprimer `my-app/`.

## 6. Non vérifié (honnêtement)

- **Réponses réelles de KOUD AI** : aucune clé n'était disponible. La route suit la documentation du SDK et compile, mais le flux réel avec le modèle n'a pas été exécuté.
- **Envoi réel via Resend** (pas de clé).
- **Déploiement Netlify** (runtime Next 15, fonctions) : non effectué, en attente de validation.
- Navigateurs autres que Chromium (Safari, Firefox) : non testés.

---

## 7. Mise à jour — préversion Netlify (11/10/2026, après passage à Next 16.4)

Préversion : https://koud-v2--koud-portfolio.netlify.app (branche `redesign/koud-v2`, *draft deploy* ; la production n'est pas touchée).

### Lighthouse 12.8 sur la préversion (réseau réel, CDN Netlify)

| Page | Mobile (perf / a11y / BP / SEO) | LCP mobile | Desktop |
|---|---|---|---|
| `/` | 98 / 100 / 100 / 100 | 2,4 s | 100 / 100 / 100 / 100 |
| `/projets` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 |
| `/projets/declic` | 99 / 100 / 100 / 100 | 2,2 s | 100 / 100 / 100 / 100 |
| `/a-propos` | 98 / 100 / 100 / 100 | 2,3 s | 100 / 100 / 100 / 100 |
| `/blog/qdrant-…` | 98 / 100 / 100 / 100 | 2,3 s | 100 / 100 / 100 / 100 |
| `/contact` | 97 / 100 / 100 / 100 | 2,3 s | 100 / 100 / 100 / 100 |

CLS 0 partout ; TBT ≤ 80 ms.

### Vérifications sur la préversion

- 15 URL : codes attendus (200, 404 pour l'inconnu et les brouillons, 308 pour `/work`, `/resume`, `/fun`).
- `/api/chat` : `configured:false` puis 503 sans clé. `/api/contact` : 400 avec erreurs par champ. En-têtes de sécurité présents.
- Suite Playwright Chromium (desktop + Pixel 7) **contre la préversion** : 94 réussis. Les tests de l'API contact sont exclus, car la limite réelle de 5 envois / 10 min s'y applique.

### Navigateurs

| Moteur | Résultat local |
|---|---|
| Chromium desktop + Pixel 7 | 98 / 98 |
| Firefox desktop | tous réussis |
| WebKit desktop + iPhone 15 | tous réussis ; 3 tests de thème instables sous 3 workers parallèles, réussis en exécution séquentielle |

### Autres changements

- Next.js 16.4 (Turbopack). ESLint React 19 strict **sans aucune exception de règle** (effets réécrits).
- `npm audit --omit=dev` : **0 vulnérabilité** (`gray-matter` remplacé par `yaml`).
- KOUD AI : seul le lanceur est chargé sur chaque page ; le panneau est téléchargé au premier usage.

---

## 8. Version anglaise (11/10/2026)

- **391 tests réussis, 0 échec** en local sur 5 configurations (Chromium desktop, Pixel 7, Firefox, WebKit, iPhone 15), dont la suite i18n : sélecteur FR⇄EN sur 9 pages, `html lang`, `hreflang`, contenus traduits, redirections des URL internes, 404 anglaise, images Open Graph, sitemap bilingue. Les audits axe portent aussi sur les pages anglaises.
- **Préversion Netlify** : 27/27 tests i18n et 135 tests Chromium réussis contre l'URL déployée ; routage identique à la version locale.
- **Lighthouse sur la préversion (anglais)** : `/en` 92 mobile / 100 desktop (LCP mobile 3,0 s, une seule mesure) ; `/en/projects/declic` 99 / 100 ; `/en/about` 99 / 100. Accessibilité, bonnes pratiques et SEO à 100 partout.
- Bug trouvé et corrigé par les tests : `usePathname()` renvoie le chemin réécrit (`/fr/…`), ce qui cassait le sélecteur de langue et l'état actif de la navigation.
