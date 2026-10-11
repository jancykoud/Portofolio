# CONTENT INVENTORY — ce qui est vérifié, ce qui manque

Légende : ✅ sourcé (repo, CV ou site en ligne) · ⚠️ à confirmer par Jancy · ❌ manquant (non publié)

## 1. Identité

| Élément | Valeur | Source | État |
|---|---|---|---|
| Nom | Jancy Koud Banga (KOUD BANGA Jancy) | CV, site | ✅ |
| Email | fridelinbanga@gmail.com | CV, site | ✅ |
| Ville | Clermont-Ferrand, France | site (commit « Privacy ») | ⚠️ le CV indique Orsay |
| GitHub | github.com/jancykoud | CV, site (200 OK) | ✅ |
| GitLab | gitlab.com/fridelinbanga | site (200 OK) | ✅ |
| LinkedIn | linkedin.com/in/jancy-koud-banga | CV | ⚠️ le footer actuel pointe vers `jancykoudbanga` |
| Portrait | `public/images/profile.jpg` (1250², fond blanc) → `portrait-cutout.png` | repo | ✅ Seul le fond blanc a été retiré (remplissage depuis les bords), sans aucune retouche du visage. La référence montre un portrait studio en plan large sur fond sombre : **à fournir** pour un rendu optimal. L'original n'est pas modifié. |
| YouTube / WhatsApp (maquette) | — | — | ❌ non publiés (aucune URL fournie) |
| Téléphone | +33 7 88 70 29 85 | CV | Non affiché dans la refonte (anti-spam, conforme à la maquette « Contact ») |

## 2. Parcours (source : CV PDF + page `/resume`)

| Période | Intitulé | Organisation | État |
|---|---|---|---|
| 10/2025 → | SIG & développement fullstack, projet ANR TERRA FORMA | CNRS · INRAE · IRD · UCA | ✅ (page CV) |
| 02/2025 – 08/2025 | Stage développement d'applications web (DataMesh, CI/CD GitLab + Docker) | Orange DATA/IA | ✅ |
| 06/2024 – 08/2024 | Développeur full-stack | GSI Concept, Nîmes | ✅ |
| 2024 → | Développeur freelance | Outlier | ⚠️ présent sur le site, absent du CV |
| 2020 – 2022 | Professeur de mathématiques | Lycée de la Révolution, Congo | ✅ |
| 2024 – 2025 | Master 2 MTS | IAE Montpellier | ✅ (site + CV IAE) |
| 2023 – 2025 | Master 2 Informatique & Technologies Cloud | Université de Montpellier | ✅ |
| 2023 | Master de perfectionnement en mathématiques | Université de Bourgogne | ✅ |
| 2014 – 2019 | Master d'enseignement en mathématiques | ENS Brazzaville | ✅ |

Formation continue : 10 cours Cisco NetAcad (`content/learning.json`), publiés **sans pourcentage**. ⚠️ Leurs dates de fin (juillet–sept. 2026) sont dépassées : statut à mettre à jour.

## 3. Projets

| Projet | Publié ? | Données disponibles | Manquant |
|---|---|---|---|
| **DECLIC** (ex-FROST-FORMS) | ✅ featured, statut « Confidentiel » | Contexte TERRA FORMA, rôle, stack (React 18, TS, PostgreSQL, Docker), OGC SensorThings / INSPIRE / ISO 19115, catalogue de 53 instruments LoRaWAN, wizard, carte, modération | ⚠️ **à valider avant publication** : nombre de laboratoires (« 30 » dans un article, « une trentaine » dans la maquette), taille de la base de code (« 30k » dans la maquette), OIDC, habilitations, journalisation, CI/CD, Docker/K8s, périmètre exact (« développement solo »). ❌ Captures autorisées. Lien public autorisé. |
| **Wmbia** | ✅ | wmbia.com (200), React, Python, FastAPI, Qdrant, embeddings OpenAI ; article détaillé | ⚠️ nom affiché « WMBai » sur le site en ligne. ❌ Captures. |
| **Akili** (ex-EduConnect) | ✅ | Démo `edu-connect-web.vercel.app` (titre « Akili »), stack détaillée (commit 8fd2774), gestion scolaire multi-établissements, 5 rôles, PWA offline-first, FCM, WebSockets, JWT + 2FA TOTP | ⚠️ statut post-« lancement sept. 2026 » ; la maquette dit « Université numérique ». ❌ Captures. |
| **Orient'Ex** | ✅ | orient-ex.org (200), mentorat bénévole, Nuxt.js, MySQL, Docker, GitLab CI/CD | ⚠️ rôle exact. ❌ Captures. |
| **Tash-Cash Agency** | ✅ | Site trilingue FR/EN/ES, Next.js 15, NestJS, Supabase, Prisma, freelance (Yaoundé) | ❌ URL publique, captures, année |
| **HSLU Exam Assistant (RAG)** | ✅ | CV : FastAPI, Pinecone, GPT, Next.js ; démo en ligne (200) ; **3 captures réelles** | ⚠️ le dépôt est sur le compte GitHub `rogerjeasy` : préciser « projet en équipe » / rôle |
| **Let Us Connect** | ✅ | CV : Go Fiber, Next.js, Firebase, Cloudinary, Pusher, Zod, Zustand ; démo (200) ; **3 captures réelles** | ⚠️ même remarque (`rogerjeasy`). Les captures contiennent des **témoignages et statistiques de démonstration** de l'application : légendées comme telles |
| **CongoStore** | ✅ | CV : Android Java, Firebase, MVC, RecyclerView, Glide ; vidéo YouTube (200) ; **3 captures réelles** | Lien GitHub **mort (404)** → retiré |
| **Nzoto** | ❌ brouillon | Maquette : « Plateforme e-santé » | Tout : description, rôle, stack, statut, lien, captures |
| **Carhilo** | ❌ brouillon | Maquette : « Covoiturage & transport de colis » | Tout |
| **VY** | ❌ brouillon | Maquette : « E-commerce lifestyle » | Tout |
| **ESGE Services** | ❌ brouillon | Aucune | Tout |

Les brouillons existent dans `content/projects.ts` avec `draft: true`. Ils sont invisibles sur le site, dans le sitemap et pour KOUD AI.

### Médias à fournir par projet (prioritaire)

`public/projects/<slug>/` : `desktop-01.webp…` (1600×1000), `tablet-01.webp` (1200×1600), `mobile-01.webp` (750×1500), `cover.webp` (1600×1000). Ensuite, déclarer chaque fichier dans `media.screens` avec sa légende.

## 4. Services (à confirmer)

Développement d'applications web · Architecture backend & API · Applications métier & données · Intégration d'IA (RAG, recherche sémantique) · Modernisation & DevOps · Conseil technique.
Rédigés à partir des projets réels. **Aucun tarif, délai ni résultat promis.** ⚠️ À valider.

## 5. Vidéo

❌ Aucune vidéo. La page `/video` présente le storyboard de 60 s et un lecteur prêt (sous-titres FR/EN, poster, lazy-load). Le statut « En préparation » est affiché honnêtement. Fichiers attendus : `public/video/koud-intro.mp4`, `koud-intro.webm`, `koud-intro-poster.jpg`, `koud-intro.fr.vtt`, `koud-intro.en.vtt`, puis à déclarer dans `content/video.ts`.

## 6. Blog

3 articles conservés tels quels (contenu de Jancy) : OGC SensorThings (15/04/2026), LoRaWAN terrain (01/05/2026), Qdrant/Wmbia (20/05/2026). Les articles de la maquette (SensorThings API, Claude Code, CI/CD GitLab-K8s) **n'existent pas** et ne sont pas inventés.

## 7. Interface

Version anglaise **en place** (`/en`) avec un sélecteur FR/EN fonctionnel. Les traductions (`content/en/`) sont des traductions fidèles des contenus validés, faites par Claude : **à relire par Jancy**, en particulier les intitulés de diplômes et de postes. Les articles de blog restent en français.

## 8. Retiré (avec justification)

| Contenu | Raison |
|---|---|
| « 100 % Passion », « 5+ projets livrés », « Budget 12M€ », « 30k lignes » | Non sourcés |
| Bandeau « organisations de référence » incluant Orange/Cisco | Formulation trompeuse. Les organisations sont citées dans leur contexte réel (expérience, projet). |
| Galerie Détente (SVG génériques) | Images non représentatives |
| Pourcentages NetAcad | Barres de progression interdites |
| `stage.pdf` | Doublon exact du CV fullstack (fichier conservé, non lié) |

## 9. Captures ajoutées (11/10/2026)

Captures réelles prises sur les sites publics, sans compte et sans retouche, au format WebP dans `public/projects/<slug>/` :
- **Wmbia** (wmbia.com) : accueil/connexion desktop + mobile. L'assistant connecté reste à capturer.
- **Orient'Ex** (orient-ex.org) : accueil, « Pourquoi Orient'Ex », « Comment ça marche », programmes + mobile. Volontairement exclus : la page des mentors (noms et profils de personnes réelles) et le bandeau des logos partenaires.
- **Akili** (démo) : connexion, inscription, création d'établissement, desktop + mobile. Les tableaux de bord (compte de démo) restent à capturer avec l'accord de Jancy.

## 10. Nouveaux projets publiés (11/10/2026, avec l'accord de Jancy)

| Projet | Source | Captures | À confirmer |
|---|---|---|---|
| **Nzoto** (ex-brouillon) | esante-web.vercel.app (textes du site, projet Vercel Next.js en monorepo) | Accueil et 3 sections + mobile. **Annuaire des praticiens exclu** (noms de personnes réelles) ; page pharmacies exclue (vide) | Rôle exact, stack au-delà de Next.js, statut de lancement |
| **VY** (ex-brouillon) | vy-fawn.vercel.app (textes du site, projet Vercel Next.js) | Accueil, boutique, fiche produit, tenue + mobile ; bannière cookies refusée avant capture | Rôle exact, stack, statut commercial |
| **Akili Université** (nouveau) | akili-universite.vercel.app | Création d'établissement desktop + mobile. **Pages de connexion exclues** : elles affichent « 847 élèves · 5 établissements · 98 % satisfaction » et un témoignage, non vérifiables | Rôle, stack, statut ; origine des chiffres de la page de connexion |

Comptes de démo Akili (`directeur@horizon.ci`, `prof.math@horizon.ci`) : **refusés** (mots de passe changés depuis l'ancien site, ce qui est souhaitable). Tableaux de bord non capturés ; aucune autre tentative faite.
Tash-Cash Agency : non publié (pas d'accord).

## 11. ESGE Services (11/10/2026)

Source : dépôt local `~/Documents/esgegroupprestation` (dépôt GitHub privé `jancykoud/esgeservices`) : README, `docs/SPEC.md`, `ARCHITECTURE.md`, `AVANCEMENT.md`, `ASSETS.md`. Captures reprises de `docs/captures/` (base locale de démonstration, comptes `is_demo`).

Exclusions volontaires : tous les écrans affichant des prix (formules, « dès 16 €/h », cartes services « dès 32 €/h », calculateur) — conditions commerciales du client avant lancement ; anciennes captures de l'accueil dont la photo précède le remplacement des images aux droits non documentés (`ASSETS.md`). Aucune donnée du PDF confidentiel des associés.

À confirmer : accord d'ESGE pour l'affichage de sa marque dans le portfolio ; URL publique après mise en service.
