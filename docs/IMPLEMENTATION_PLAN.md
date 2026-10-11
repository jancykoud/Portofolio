# IMPLEMENTATION PLAN

Chaque phase se termine par : `npm run typecheck && npm run lint && npm run build`, un lancement local, une inspection visuelle (Playwright, 390 / 768 / 1440 px), des corrections, puis un commit.

| Phase | Contenu | Critère de sortie |
|---|---|---|
| 0 | Audit + 5 documents, branche, tag de retour | Docs commités |
| 1 | Design system : tokens 5 thèmes, typographie Geist, Tailwind v4 | Tests de contraste verts |
| 2 | Migration TS / Next 15.5 / React 19, dépendances nettoyées, `content/` typé, redirections | Build vert, anciennes URLs redirigées |
| 3 | Header flottant, menu mobile (Radix), Theme Studio, footer, primitives UI | Navigation clavier complète, persistance, pas de flash |
| 4 | Hero cinématographique (scène three lazy + fallback CSS), accueil complet | Hero lisible à 320 px, sans WebGL en mode lite |
| 5 | Showroom (filtres animés) + études de cas (nav sticky, galerie, lightbox, diagramme d'architecture DECLIC) | Galerie utilisable au clavier, pages générées pour chaque projet publié |
| 6 | À propos (timeline), Services, Blog MDX (Shiki, sommaire), Lab (2 expériences réelles), Contact (API Resend) | Formulaire testé avec API mockée |
| 7 | KOUD AI : route streaming, base de connaissances, rate limit, widget + plein écran | Test : état « non configuré » honnête sans clé ; flux réel avec clé |
| 8 | Vidéo : lecteur accessible + storyboard | Fallback affiché sans média |
| 9 | Animations : reveal, stagger, magnetic CTA mesuré, transitions de thème | Tout désactivé en mouvement réduit |
| 10 | SEO (metadata, OG image, sitemap, robots, JSON-LD), a11y (axe), sécurité (headers), perf | 0 violation axe sérieuse |
| 11 | Suite Playwright complète, Lighthouse mesuré, README, rapport final | Rapport chiffré **mesuré** |

## Risques

| Risque | Mitigation |
|---|---|
| Netlify + routes serveur Next 15 | `@netlify/plugin-nextjs` v5 supporte Next 15 ; à valider sur une *deploy preview* (avec accord) |
| Coût API IA / abus | Rate limit, `max_tokens` borné, effort `low`, modèle configurable, aucun outil |
| Contenus non vérifiés | Champs `facts` avec source obligatoire ; brouillons exclus |
| Poids de three.js | Import dynamique après `requestIdleCallback`, desktop uniquement, désactivable |
| Migration Tailwind v4 | Réécriture complète des composants de toute façon (styles inline à éliminer) |
| Régression d'URL / SEO | Redirections 308 + sitemap |

## État d'avancement (11/10/2026)

| Phase | État |
|---|---|
| 0–6 | ✅ Faites |
| 7 — KOUD AI | ✅ Code + interface + tests en mode non configuré. ⏳ Validation avec une vraie clé |
| 8 — Vidéo | ✅ Lecteur + storyboard. ⏳ Tournage (contenu) |
| 9 — Animations | ✅ Reveal, entrée du hero, transitions de filtres, transitions de thème, parallaxe 3D au pointeur. ❌ « Magnetic buttons » non retenus (gêne de précision sur les CTA, aucun gain d'usage) |
| 10 — A11y / SEO / sécurité / perf | ✅ Voir QA_REPORT |
| 11 — Tests | ✅ 98 tests Playwright. ⏳ Déploiement (validation requise) |

Hors périmètre ou à venir : traduction anglaise, filtres du blog (inutiles à 3 articles), limitation de débit globale (Upstash), Next 16.
