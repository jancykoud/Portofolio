import type { Project, ProjectCategory } from "./types";

/**
 * Single source of truth for projects — used by pages, sitemap and KOUD AI.
 * Rule: every published claim is traceable (CV, repository history, Jancy's
 * own articles or the live product). Unverified numbers go in `missing`.
 */
export const PROJECTS: Project[] = [
  {
    slug: "declic",
    name: "DECLIC",
    formerName: "FROST-FORMS",
    tagline: "Plateforme de déclaration et de gestion d'instruments scientifiques pour la recherche environnementale.",
    summary:
      "Application métier conçue pour les laboratoires du projet ANR TERRA FORMA : les chercheurs déclarent leurs instruments IoT via un parcours guidé, un administrateur modère, et chaque déclaration devient une entité conforme au standard OGC SensorThings.",
    categories: ["professional", "web", "ai-data"],
    status: "confidential",
    statusNote: "Application interne — code, captures et données non publiables.",
    year: "2025 → aujourd'hui",
    role: "Ingénierie SIG & développement fullstack — conception et développement du portail",
    context: "Projet ANR TERRA FORMA (CNRS · INRAE · IRD · UCA)",
    stack: ["React 18", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "FROST-Server", "OGC SensorThings API", "Leaflet", "Docker"],
    problem:
      "Les laboratoires du réseau déploient des capteurs LoRaWAN sur des écosystèmes très différents, chacun avec ses instruments, ses unités et ses conventions de nommage. Sans référentiel commun, agréger leurs données devient un travail manuel permanent — et une erreur de référencement peut ruiner des mois de mesures.",
    solution: [
      "Un wizard de déclaration en 4 étapes pensé pour des écologues, pas pour des développeurs : site sur carte (WGS84), type d'instrument, configuration LoRaWAN, métadonnées scientifiques.",
      "Une couche d'abstraction qui traduit les saisies « terrain » en entités SensorThings valides (Thing, Location, Sensor, ObservedProperty, Datastream) dans FROST-Server.",
      "Un statut « brouillon » pour les capteurs anciens ou mal documentés, et un workflow de modération obligatoire avant publication.",
      "La génération de fiches de métadonnées ISO 19139 conformes INSPIRE / ISO 19115, pour rendre les jeux de données découvrables par d'autres systèmes européens.",
    ],
    architecture: {
      note: "Vue fonctionnelle simplifiée, reconstituée à partir d'éléments déjà publics. Aucun détail d'infrastructure interne n'est exposé.",
      nodes: [
        { id: "field", label: "Capteurs LoRaWAN", kind: "device", detail: "Instruments déployés sur les sites d'observation. Faible débit, duty cycle < 1 %, données parfois reçues avec plusieurs heures de retard.", col: 1, row: 1 },
        { id: "researcher", label: "Chercheurs", kind: "actor", detail: "Déclarent leurs instruments via le wizard en 4 étapes, avec validation progressive et statut brouillon.", col: 1, row: 2 },
        { id: "admin", label: "Administrateurs", kind: "actor", detail: "Modèrent chaque déclaration avant publication : les erreurs de référencement coûtent cher une fois les données accumulées.", col: 1, row: 3 },
        { id: "portal", label: "Portail DECLIC", kind: "app", detail: "Interface React/Next.js et API Node.js : wizard, carte Leaflet, catalogue d'instruments, workflow de modération.", col: 2, row: 2 },
        { id: "db", label: "PostgreSQL", kind: "data", detail: "Référentiel du portail : sites, instruments, déclarations et leur statut, contrôles de cohérence (DevEUI, coordonnées).", col: 3, row: 3 },
        { id: "frost", label: "FROST-Server", kind: "service", detail: "Implémentation de référence d'OGC SensorThings : stocke Things, Datastreams et Observations avec des URL stables.", col: 3, row: 1 },
        { id: "sta", label: "OGC SensorThings API", kind: "standard", detail: "Modèle commun Thing → Location → Datastream → Observation : n'importe quel client conforme peut interroger les données.", col: 4, row: 1 },
        { id: "inspire", label: "Métadonnées INSPIRE", kind: "standard", detail: "Fiches ISO 19139 générées depuis le portail (ISO 19115), pour la découverte des jeux de données en Europe.", col: 4, row: 3 },
      ],
      edges: [
        { from: "researcher", to: "portal", label: "déclare" },
        { from: "admin", to: "portal", label: "modère" },
        { from: "portal", to: "db", label: "persiste" },
        { from: "portal", to: "frost", label: "crée les entités" },
        { from: "field", to: "frost", label: "observations (asynchrone)" },
        { from: "frost", to: "sta", label: "expose" },
        { from: "portal", to: "inspire", label: "génère" },
      ],
    },
    challenges: [
      {
        title: "L'identité des capteurs",
        body: "Plusieurs conventions de nommage selon les laboratoires, des DevEUI non documentés, des coordonnées approximatives : la tâche « d'import » est devenue un problème de gestion d'identité des objets IoT.",
      },
      {
        title: "UX contre conformité",
        body: "Le formulaire doit rester intuitif pour des scientifiques tout en produisant un modèle de données strictement standard. La conformité est rendue invisible par une couche d'abstraction.",
      },
      {
        title: "Des coordonnées qui sont des opinions",
        body: "GPS de précision, téléphone ou carte en ligne : deux déclarations d'un même site divergent. Ajout d'un champ de précision estimée et d'une alerte au-delà de 50 m d'écart.",
      },
      {
        title: "Ingestion asynchrone",
        body: "LoRaWAN impose faible débit et messages retardés : le système est conçu pour les données manquantes et différées, pas pour le temps réel strict.",
      },
    ],
    outcomes: [
      "Un catalogue unifié de 53 modèles d'instruments LoRaWAN.",
      "Un parcours de déclaration qui rend structurellement impossibles les erreurs de saisie les plus coûteuses.",
      "Des données publiées dans un standard ouvert : un nouveau laboratoire peut rejoindre le réseau sans négociation de format.",
    ],
    learnings: [
      "L'interopérabilité, c'est de la dette technique évitée, pas contractée.",
      "La validation ne peut pas être stricte dès le premier jour : il faut un chemin pour les données imparfaites.",
      "Le workflow de modération n'est pas un manque de confiance, c'est une assurance sur la qualité des données.",
    ],
    facts: [
      { value: "53", label: "modèles d'instruments catalogués", source: "Articles « LoRaWAN terrain » et « OGC SensorThings »" },
      { value: "4", label: "étapes de déclaration guidée", source: "Article « LoRaWAN terrain »" },
      { value: "10/2025", label: "début du projet", source: "Parcours professionnel" },
    ],
    screens: [],
    links: [],
    cover: { hue: "#2563eb", motif: "nodes" },
    featured: true,
    relatedPost: "ogc-sensorthings-guide",
    missing: [
      "Nombre de laboratoires utilisateurs (30 ? « une trentaine » ?)",
      "Taille de la base de code",
      "Authentification OIDC, habilitations, journalisation",
      "CI/CD, Docker / Kubernetes",
      "Périmètre exact (« développement solo » ?)",
      "Captures autorisées et lien public éventuel",
    ],
  },
  {
    slug: "wmbia",
    name: "Wmbia",
    tagline: "Assistant de recherche sémantique fondé exclusivement sur un corpus de textes religieux.",
    summary:
      "Un moteur de recherche qui retrouve un passage à partir de son sens, pas de ses mots exacts. Indexation vectorielle, API Python et interface React volontairement minimaliste.",
    categories: ["ai-data", "web"],
    status: "production",
    year: "2026",
    role: "Conception et développement — projet personnel",
    stack: ["React", "Python", "FastAPI", "Qdrant", "OpenAI Embeddings"],
    problem:
      "La recherche par mots-clés échoue quand on ne se souvient que du sens général d'un passage. Il fallait une recherche sémantique fiable sur un corpus littéral et multilingue.",
    solution: [
      "Embeddings `text-embedding-3-small` indexés dans Qdrant, avec le texte stocké directement dans le payload du vecteur (aucune jointure à la lecture).",
      "Une API FastAPI `/search` : embedding de la requête, similarité cosinus, filtres par métadonnées, top 10 avec score.",
      "Des collections séparées par langue, les embeddings FR et EN n'étant pas directement comparables sur des textes très littéraux.",
      "Une interface qui n'explique pas la technique : l'utilisateur cherche un passage et le trouve.",
    ],
    challenges: [
      { title: "pgvector ou Qdrant ?", body: "Benchmark sur un corpus d'environ 31 000 entrées : latence p95 ~45 ms (pgvector) contre ~8 ms (Qdrant) sur 10k vecteurs, filtrage natif et payload stocké. Qdrant retenu." },
      { title: "Le seuil de pertinence", body: "Un score cosinus n'a pas la même signification selon le corpus : un seuil empirique a été calibré et des suggestions de reformulation ont été ajoutées." },
    ],
    learnings: ["La recherche vectorielle impressionne dès le POC ; la rendre robuste en production prend beaucoup plus de temps."],
    facts: [
      { value: "~8 ms", label: "latence p95 mesurée (Qdrant, 10k vecteurs)", source: "Article « Recherche vectorielle avec Qdrant »" },
    ],
    screens: [],
    links: [{ label: "wmbia.com", href: "https://wmbia.com", kind: "live" }],
    cover: { hue: "#b9ff66", motif: "orbit" },
    relatedPost: "qdrant-recherche-vectorielle",
    missing: ["Captures", "Le site en ligne s'intitule « WMBai » : confirmer le nom affiché"],
  },
  {
    slug: "akili",
    name: "Akili",
    formerName: "EduConnect",
    tagline: "Gestion scolaire multi-établissements pensée pour l'Afrique.",
    summary:
      "Plateforme SaaS qui couvre le cycle de vie d'un établissement : inscriptions, notes, bulletins, présences, emplois du temps, paiements et documents officiels. Pensée offline-first pour des connexions intermittentes.",
    categories: ["web", "education", "mobile"],
    status: "in-progress",
    statusNote: "Démo publique en ligne — date de lancement à confirmer.",
    year: "2025 → aujourd'hui",
    role: "Conception et développement fullstack — projet personnel",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "Turborepo", "Firebase Cloud Messaging", "WebSockets", "JWT + 2FA TOTP"],
    problem:
      "Les établissements visés jonglent entre papier, tableurs et outils déconnectés, avec une connectivité irrégulière et des paiements en mobile money (XOF).",
    solution: [
      "PWA offline-first : l'application reste utilisable hors ligne et synchronise au retour du réseau.",
      "5 rôles utilisateurs avec des espaces dédiés, du directeur au professeur.",
      "Notifications push (FCM) et temps réel (WebSockets), génération de documents PDF.",
      "Authentification JWT avec double facteur TOTP.",
      "Monorepo Turborepo partageant types et logique métier entre front et API.",
    ],
    facts: [{ value: "5", label: "rôles utilisateurs", source: "Historique du dépôt (commit 8fd2774)" }],
    screens: [],
    links: [{ label: "Démo en ligne", href: "https://edu-connect-web.vercel.app", kind: "demo" }],
    cover: { hue: "#f59e0b", motif: "stack" },
    missing: ["Captures", "Statut après la date de lancement annoncée (sept. 2026)"],
  },
  {
    slug: "orient-ex",
    name: "Orient'Ex",
    tagline: "Mentorat bénévole pour étudiants et jeunes professionnels.",
    summary:
      "Plateforme qui met en relation des jeunes avec des mentors bénévoles pour les accompagner dans leurs études, leur carrière et leur développement personnel.",
    categories: ["web", "education"],
    status: "production",
    year: "",
    role: "Développement web",
    stack: ["Nuxt.js", "MySQL", "Docker", "GitLab CI/CD"],
    solution: [
      "Architecture modulaire Nuxt.js avec base MySQL.",
      "Conteneurisation Docker et pipeline GitLab CI/CD pour des déploiements reproductibles.",
    ],
    screens: [],
    links: [{ label: "orient-ex.org", href: "https://orient-ex.org", kind: "live" }],
    cover: { hue: "#10b981", motif: "wave" },
    missing: ["Captures", "Rôle exact et année", "Problème / résultats"],
  },
  {
    slug: "tash-cash-agency",
    name: "Tash-Cash Agency",
    tagline: "Site trilingue pour une agence panafricaine basée à Yaoundé.",
    summary: "Mission freelance : site FR / EN / ES avec SEO multilingue et attention particulière aux Core Web Vitals.",
    categories: ["professional", "web"],
    status: "in-progress",
    year: "2026",
    role: "Développement fullstack — mission freelance",
    stack: ["Next.js 15", "NestJS", "Supabase", "Prisma"],
    screens: [],
    links: [],
    cover: { hue: "#c9982a", motif: "grid" },
    missing: ["URL publique", "Captures", "Statut de livraison"],
  },
  {
    slug: "hslu-exam-assistant",
    name: "HSLU Exam Assistant",
    tagline: "Assistant d'étude RAG fondé sur les supports de cours.",
    summary:
      "Système de questions-réponses spécifique à des cours universitaires : les réponses citent les supports, et l'outil génère guides et exercices de révision.",
    categories: ["ai-data", "web", "education"],
    status: "demo",
    year: "2025",
    role: "Développement backend IA et frontend",
    stack: ["Python", "FastAPI", "Pinecone", "OpenAI", "Next.js", "Tailwind CSS", "Firebase"],
    solution: [
      "Backend FastAPI intégrant Pinecone pour le stockage des embeddings.",
      "Génération de réponses par LLM, avec citations des supports sources.",
      "Client Next.js / Tailwind CSS, documentation d'API OpenAPI / Swagger UI.",
    ],
    screens: [
      { src: "/projects/hslu-exam-assistant/desktop-02.png", alt: "Section des fonctionnalités : assistant IA, guides de révision, questions d'entraînement, lacunes", caption: "Fonctionnalités : assistant, guides de révision, questions d'entraînement, détection des lacunes.", device: "desktop", width: 2938, height: 1674 },
      { src: "/projects/hslu-exam-assistant/desktop-03.png", alt: "Parcours en quatre étapes de l'application", caption: "Parcours utilisateur en 4 étapes.", device: "desktop", width: 2938, height: 1666 },
      { src: "/projects/hslu-exam-assistant/desktop-01.png", alt: "Page d'accueil de HSLU Data Science Exam Preparation", caption: "Accueil — les compteurs affichés sont des contenus de démonstration de l'interface.", device: "desktop", width: 2938, height: 1666 },
    ],
    links: [{ label: "Démo en ligne", href: "https://hslu-exam-ai-assistant.vercel.app/", kind: "demo" }],
    cover: { hue: "#6366f1", motif: "orbit" },
    missing: ["Périmètre exact : dépôt hébergé sur un compte GitHub tiers (projet en équipe ?)"],
  },
  {
    slug: "let-us-connect",
    name: "Let Us Connect",
    tagline: "Réseau étudiants–alumni : mentorat, événements et suivi de candidatures.",
    summary:
      "Plateforme sociale qui relie étudiants et anciens élèves pour le mentorat, les projets et les opportunités, avec un outil de suivi de recherche d'emploi.",
    categories: ["web"],
    status: "demo",
    year: "2024 → 2025",
    role: "Développement d'API et d'interfaces",
    stack: ["Go", "Go Fiber", "Next.js", "Firebase", "Cloudinary", "Pusher", "Zod", "Zustand", "Tailwind CSS"],
    solution: [
      "API RESTful en Go Fiber pour un backend évolutif.",
      "Cloudinary pour la gestion des fichiers, Pusher pour les notifications temps réel.",
      "Interface NextUI / shadcn/ui, validation Zod, état global Zustand.",
    ],
    screens: [
      { src: "/projects/let-us-connect/desktop-01.png", alt: "Page d'accueil de Let's Connect", caption: "Accueil et appels à l'action principaux.", device: "desktop", width: 2938, height: 1680 },
      { src: "/projects/let-us-connect/desktop-02.png", alt: "Grille des fonctionnalités clés de la plateforme", caption: "Fonctionnalités clés : mentorat, réseau, emplois, événements.", device: "desktop", width: 2934, height: 1674 },
    ],
    links: [{ label: "Démo en ligne", href: "https://letusconnect.vercel.app/", kind: "demo" }],
    cover: { hue: "#3b82f6", motif: "nodes" },
    missing: ["Périmètre exact : dépôt hébergé sur un compte GitHub tiers (projet en équipe ?)"],
  },
  {
    slug: "congostore",
    name: "CongoStore",
    tagline: "Application e-commerce Android native.",
    summary: "Application de vente en ligne complète : catalogue, panier, authentification et synchronisation temps réel.",
    categories: ["mobile", "ecommerce"],
    status: "archived",
    year: "2025",
    role: "Conception et développement",
    stack: ["Android", "Java", "Firebase", "RecyclerView", "Glide"],
    solution: [
      "Architecture MVC modulaire.",
      "Firebase pour la synchronisation temps réel et l'authentification.",
      "RecyclerView pour les listes dynamiques, Glide pour le chargement asynchrone des images.",
    ],
    screens: [
      { src: "/projects/congostore/mobile-01.png", alt: "Écran d'accueil de CongoStore", caption: "Onboarding.", device: "mobile", width: 592, height: 1286 },
      { src: "/projects/congostore/mobile-03.png", alt: "Catalogue de produits avec notes et prix", caption: "Catalogue produits.", device: "mobile", width: 616, height: 1306 },
      { src: "/projects/congostore/mobile-02.png", alt: "Panier avec quantités, code promo et total", caption: "Panier et récapitulatif.", device: "mobile", width: 554, height: 1190 },
    ],
    links: [{ label: "Vidéo de démonstration", href: "https://youtu.be/mH8q9B0G3kE", kind: "video" }],
    cover: { hue: "#8b5cf6", motif: "stack" },
  },

  /* ── Drafts: named in the brief, no verifiable content yet ── */
  { slug: "nzoto", name: "Nzoto", tagline: "", summary: "", categories: ["web"], status: "in-progress", year: "", role: "", stack: [], screens: [], links: [], cover: { hue: "#ef4444", motif: "wave" }, draft: true, missing: ["Tout le contenu"] },
  { slug: "carhilo", name: "Carhilo", tagline: "", summary: "", categories: ["web"], status: "in-progress", year: "", role: "", stack: [], screens: [], links: [], cover: { hue: "#0ea5e9", motif: "grid" }, draft: true, missing: ["Tout le contenu"] },
  { slug: "vy", name: "VY", tagline: "", summary: "", categories: ["ecommerce"], status: "in-progress", year: "", role: "", stack: [], screens: [], links: [], cover: { hue: "#ec4899", motif: "orbit" }, draft: true, missing: ["Tout le contenu"] },
  { slug: "esge-services", name: "ESGE Services", tagline: "", summary: "", categories: ["professional"], status: "in-progress", year: "", role: "", stack: [], screens: [], links: [], cover: { hue: "#14b8a6", motif: "stack" }, draft: true, missing: ["Tout le contenu"] },
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  professional: "Missions pro",
  web: "Applications web",
  mobile: "Mobile",
  "ai-data": "IA & Data",
  education: "Éducation",
  ecommerce: "E-commerce",
  experiments: "Expérimentations",
};

export const STATUS_LABELS: Record<Project["status"], string> = {
  production: "En production",
  "in-progress": "En cours",
  confidential: "Confidentiel",
  demo: "Démo en ligne",
  archived: "Archivé",
};
