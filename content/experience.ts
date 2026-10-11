import type { Experience } from "./types";
import learning from "./learning.json";

/** Source: CV PDFs (public/assets/resume) + former /resume page. */
export const EXPERIENCE: Experience[] = [
  {
    period: "10/2025 → aujourd'hui",
    start: "2025-10",
    title: "Ingénierie SIG & développement fullstack",
    org: "Projet ANR TERRA FORMA — CNRS · INRAE · IRD · UCA",
    kind: "work",
    points: [
      "Conception et développement de DECLIC (ex-FROST-FORMS), portail de déclaration d'instruments IoT.",
      "Wizard en 4 étapes, catalogue de 53 modèles LoRaWAN, carte interactive, workflow de modération.",
      "Conformité OGC SensorThings (FROST-Server), INSPIRE et ISO 19115.",
    ],
    stack: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    period: "02/2025 – 08/2025",
    start: "2025-02",
    title: "Stage chef de projet / développeur web",
    org: "Orange — DSI Data/IA",
    place: "Montigny-le-Bretonneux",
    kind: "work",
    points: [
      "Pilotage d'un projet de digitalisation en environnement agile (modèle DataMesh).",
      "Développement d'une application web de gestion des Data Products.",
      "Pipelines CI/CD GitLab et Docker ; suivi des sprints et coordination inter-équipes.",
    ],
    stack: ["Angular", "Node.js", "Firestore", "BigQuery", "GitLab", "Docker"],
  },
  {
    period: "06/2024 – 08/2024",
    start: "2024-06",
    title: "Développeur full-stack",
    org: "GSI Concept",
    place: "Nîmes",
    kind: "work",
    points: [
      "Développement et optimisation d'applications web sur mesure.",
      "Intégration d'API, responsive design, déploiement cloud.",
    ],
  },
  {
    period: "2024 – 2025",
    start: "2024-09",
    title: "Master 2 Management des Technologies et des SI (MTS)",
    org: "IAE Montpellier — Université de Montpellier",
    kind: "education",
    points: ["Gestion de projet, gouvernance IT, stratégie digitale, méthodes agiles."],
  },
  {
    period: "2023 – 2025",
    start: "2023-09",
    title: "Master 2 Informatique — Technologies Cloud",
    org: "Université de Montpellier",
    kind: "education",
    points: ["Développement full-stack, déploiement cloud, data engineering, DevOps."],
  },
  {
    period: "2023",
    start: "2023-01",
    title: "Master de perfectionnement en mathématiques",
    org: "Université de Bourgogne",
    place: "Dijon",
    kind: "education",
    points: ["Analyse avancée, statistiques, algorithmique."],
  },
  {
    period: "2020 – 2022",
    start: "2020-09",
    title: "Professeur de mathématiques",
    org: "Lycée de la Révolution",
    place: "Congo",
    kind: "work",
    points: ["Enseignement au secondaire, préparation aux examens, conception de supports interactifs."],
  },
  {
    period: "2014 – 2019",
    start: "2014-09",
    title: "Master d'enseignement des mathématiques",
    org: "École Normale Supérieure de Brazzaville",
    place: "Congo",
    kind: "education",
    points: ["Mathématiques appliquées, pédagogie, didactique."],
  },
];

type Course = { title: string; platform: string; category: string; url: string };

/** Ongoing courses — published without progress percentages on purpose. */
export const COURSES: Course[] = (learning.courses as Course[]).map(({ title, platform, category, url }) => ({
  title,
  platform,
  category,
  url,
}));

export const SKILL_GROUPS = [
  { label: "Langages", items: ["TypeScript", "JavaScript", "Python", "Java", "Go", "SQL"] },
  { label: "Front-end", items: ["React", "Next.js", "Angular", "Nuxt.js", "Tailwind CSS"] },
  { label: "Back-end & API", items: ["Node.js", "Express", "NestJS", "FastAPI", "Go Fiber", "Spring Boot", "Prisma"] },
  { label: "Données & IA", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Qdrant", "Pinecone", "Embeddings / RAG"] },
  { label: "Géospatial & IoT", items: ["OGC SensorThings", "INSPIRE", "ISO 19115", "LoRaWAN", "Leaflet"] },
  { label: "Cloud & DevOps", items: ["Docker", "GitLab CI/CD", "GitHub Actions", "AWS", "GCP", "Firebase"] },
] as const;

export const PRINCIPLES = [
  { title: "Comprendre avant de coder", body: "Le formulaire « terrain » de DECLIC est né d'une feuille Excel et de conversations avec des écologues. Le bon modèle de données vient du métier, pas l'inverse." },
  { title: "Les standards sont un investissement", body: "Une courbe d'apprentissage raide au départ, puis un nouveau partenaire qui se connecte sans négociation. L'interopérabilité, c'est de la dette évitée." },
  { title: "La complexité doit être invisible", body: "Dans Wmbia, l'utilisateur ne voit pas la recherche vectorielle : il trouve le passage qu'il cherchait. L'ingénierie sert l'usage." },
  { title: "Prévoir l'imparfait", body: "Statut brouillon, alertes de cohérence, mode hors ligne : les systèmes réels doivent accepter les données incomplètes et les réseaux instables." },
] as const;
