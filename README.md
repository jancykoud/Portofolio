# KOUD — Jancy Koud Banga · Digital Engineering Experience

Portfolio de Jancy Koud Banga : ingénierie logicielle et produits numériques.
Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · motion · Three.js · Anthropic SDK.

## Démarrer

```bash
npm install
cp .env.local.example .env.local   # facultatif : KOUD AI et le formulaire fonctionnent en mode « non configuré » sans clés
npm run dev                        # http://localhost:3000
```

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run typecheck` · `npm run lint` | TypeScript strict · ESLint |
| `npm run check` | Les trois à la suite |
| `npm run test:e2e` | Suite Playwright (navigation, thèmes, contrastes, galerie, KOUD AI, contact, axe) |

Les tests utilisent le build de production (`npm run build` d'abord). Ils tournent **sans clés API** : aucun appel payant n'est jamais émis.

## Variables d'environnement

| Variable | Requis | Rôle |
|---|---|---|
| `ANTHROPIC_API_KEY` | pour KOUD AI | Clé serveur ; sans elle, l'assistant s'affiche « Non activé » |
| `KOUD_AI_MODEL` | non | Modèle (défaut `claude-opus-5-5`, effort `low`) |
| `RESEND_API_KEY` | pour le formulaire | Envoi des messages de contact |
| `CONTACT_TO_EMAIL` | non | Destinataire (défaut : e-mail du site) |
| `CONTACT_FROM_EMAIL` | non | Expéditeur vérifié dans Resend (défaut : `onboarding@resend.dev`, qui ne délivre qu'à l'adresse du compte Resend) |
| `NEXT_PUBLIC_SITE_URL` | non | URL canonique (SEO, sitemap) |

## Ajouter du contenu

- **Projet** : ajouter un objet à `content/projects.ts`, puis les captures dans `public/projects/<slug>/`. La page, le showroom, le sitemap et KOUD AI se mettent à jour seuls. `draft: true` masque le projet partout. Tout chiffre publié passe par `facts`, avec une `source`.
- **Article** : un fichier `.mdx` dans `content/blog/` (frontmatter `title`, `date`, `category`, `excerpt`, `tags`).
- **Vidéo** : déposer les fichiers dans `public/video/`, puis renseigner `INTRO_VIDEO` dans `content/video.ts`.
- **Parcours / services** : `content/experience.ts`, `content/services.ts`.

## Architecture

Voir `docs/` : [AUDIT](docs/AUDIT.md), [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [IMPLEMENTATION_PLAN](docs/IMPLEMENTATION_PLAN.md), [CONTENT_INVENTORY](docs/CONTENT_INVENTORY.md), [QA_REPORT](docs/QA_REPORT.md).

## Déploiement

Netlify, avec le runtime Next.js (`netlify.toml`). Les pages sont statiques ; `/api/chat` et `/api/contact` deviennent des fonctions serveur. Définir les variables ci-dessus dans Netlify **avant** de mettre en production.

## Retour arrière

L'ancien site est conservé dans `_legacy/` et sur le tag Git `pre-redesign-v1`.
