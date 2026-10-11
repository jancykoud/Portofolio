import type { Service } from "./types";

/**
 * Services derived from shipped work. No prices, durations or promised results:
 * scope and timeline are agreed per project. (To be confirmed by Jancy.)
 */
export const SERVICES: Service[] = [
  {
    id: "web-apps",
    title: "Applications web sur mesure",
    problem: "Un processus métier vit dans des tableurs, des e-mails et des outils qui ne se parlent pas.",
    deliverables: ["Application web responsive en production", "Code source documenté et versionné", "Pipeline de déploiement"],
    approach: ["Atelier de cadrage avec les futurs utilisateurs", "Prototype cliquable avant développement", "Livraisons incrémentales et démonstrations régulières"],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    proof: [{ label: "Akili", href: "/projets/akili" }, { label: "Orient'Ex", href: "/projets/orient-ex" }],
  },
  {
    id: "business-data",
    title: "Applications métier & plateformes de données",
    problem: "Des données critiques sont saisies de façon hétérogène et deviennent inexploitables ou non conformes.",
    deliverables: ["Modèle de données et parcours de saisie guidés", "Workflow de validation / modération", "Exposition des données via des standards ouverts"],
    approach: ["Cartographie des acteurs et des données", "Conception du modèle avec le métier", "Validation progressive plutôt que blocage"],
    stack: ["PostgreSQL", "OGC SensorThings", "INSPIRE / ISO 19115", "Leaflet", "Docker"],
    proof: [{ label: "DECLIC", href: "/projets/declic" }],
  },
  {
    id: "ai",
    title: "Intégration d'IA",
    problem: "Une base documentaire riche reste inaccessible parce que la recherche par mots-clés ne suffit pas.",
    deliverables: ["Recherche sémantique ou assistant RAG sur vos contenus", "API documentée", "Évaluation de la pertinence sur des cas réels"],
    approach: ["Constitution d'un jeu de questions de référence", "Choix argumenté du stockage vectoriel", "Garde-fous : sources citées, réponses bornées au corpus"],
    stack: ["Python", "FastAPI", "Qdrant", "Pinecone", "API Claude / OpenAI"],
    proof: [{ label: "Wmbia", href: "/projets/wmbia" }, { label: "HSLU Exam Assistant", href: "/projets/hslu-exam-assistant" }],
  },
  {
    id: "backend",
    title: "Architecture backend & API",
    problem: "Une API grossit sans structure : couplage fort, temps réel bricolé, déploiements risqués.",
    deliverables: ["Architecture cible et plan de migration", "API REST typée et testée", "Notifications temps réel, files, cache"],
    approach: ["Audit de l'existant", "Découpage par domaines", "Migration progressive, sans big bang"],
    stack: ["Node.js", "NestJS", "Go Fiber", "Redis", "WebSockets"],
    proof: [{ label: "Let Us Connect", href: "/projets/let-us-connect" }, { label: "Akili", href: "/projets/akili" }],
  },
  {
    id: "modernisation",
    title: "Modernisation & DevOps",
    problem: "Une application vieillissante est difficile à faire évoluer et à déployer sereinement.",
    deliverables: ["Conteneurisation", "Pipeline CI/CD", "Plan de modernisation priorisé"],
    approach: ["Mesurer avant de changer", "Automatiser les déploiements en premier", "Moderniser par étapes réversibles"],
    stack: ["Docker", "GitLab CI/CD", "GitHub Actions", "AWS / GCP"],
    proof: [{ label: "Orient'Ex", href: "/projets/orient-ex" }],
  },
  {
    id: "consulting",
    title: "Conseil technique",
    problem: "Un choix technique structurant doit être pris, sans expertise interne pour l'éclairer.",
    deliverables: ["Note de recommandation argumentée", "Preuve de concept ciblée", "Accompagnement de l'équipe"],
    approach: ["Clarifier le besoin réel", "Comparer des options sur des critères explicites", "Tester l'hypothèse la plus risquée d'abord"],
    stack: ["Selon le contexte"],
    proof: [{ label: "Article : pgvector vs Qdrant", href: "/blog/qdrant-recherche-vectorielle" }],
  },
];
