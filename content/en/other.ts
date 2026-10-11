/** English translations for experience, principles, skills, services, storyboard and site copy. */

export const EXPERIENCE_EN: Record<string, { period?: string; title: string; org?: string; points: string[] }> = {
  "2025-10": {
    period: "10/2025 → present",
    title: "GIS engineering & full-stack development",
    org: "ANR TERRA FORMA project — CNRS · INRAE · IRD · UCA",
    points: [
      "Design and development of DECLIC (formerly FROST-FORMS), a portal for declaring IoT instruments.",
      "4-step wizard, catalogue of 53 LoRaWAN models, interactive map, review workflow.",
      "Compliance with OGC SensorThings (FROST-Server), INSPIRE and ISO 19115.",
    ],
  },
  "2025-02": {
    title: "Project manager / web developer internship",
    org: "Orange — Data/AI IT department",
    points: [
      "Led a digitalisation project in an agile setting (DataMesh model).",
      "Developed a web application for managing Data Products.",
      "GitLab and Docker CI/CD pipelines; sprint follow-up and cross-team coordination.",
    ],
  },
  "2024-06": {
    title: "Full-stack developer",
    points: ["Developed and optimised custom web applications.", "API integration, responsive design, cloud deployment."],
  },
  "2024-09": {
    title: "Master's degree in Technology and Information Systems Management (MTS)",
    points: ["Project management, IT governance, digital strategy, agile methods."],
  },
  "2023-09": {
    title: "Master's degree in Computer Science — Cloud Technologies",
    points: ["Full-stack development, cloud deployment, data engineering, DevOps."],
  },
  "2023-01": {
    title: "Advanced master's programme in mathematics",
    points: ["Advanced analysis, statistics, algorithms."],
  },
  "2020-09": {
    title: "Mathematics teacher",
    org: "Lycée de la Révolution",
    points: ["Secondary-school teaching, exam preparation, design of interactive materials."],
  },
  "2014-09": {
    title: "Master's degree in mathematics education",
    org: "École Normale Supérieure, Brazzaville",
    points: ["Applied mathematics, pedagogy, didactics."],
  },
};

export const PRINCIPLES_EN = [
  { title: "Understand before coding", body: "DECLIC's field form was born from a spreadsheet and conversations with ecologists. The right data model comes from the domain, not the other way round." },
  { title: "Standards are an investment", body: "A steep learning curve at first, then a new partner who connects without any negotiation. Interoperability is debt avoided." },
  { title: "Complexity should be invisible", body: "In Wmbia, users never see vector search: they find the passage they were looking for. Engineering serves the use." },
  { title: "Plan for imperfection", body: "Draft status, consistency alerts, offline mode: real systems must accept incomplete data and unstable networks." },
] as const;

export const SKILL_LABELS_EN: Record<string, string> = {
  Langages: "Languages",
  "Front-end": "Front-end",
  "Back-end & API": "Back-end & APIs",
  "Données & IA": "Data & AI",
  "Géospatial & IoT": "Geospatial & IoT",
  "Cloud & DevOps": "Cloud & DevOps",
};

export const COURSE_CATEGORIES_EN: Record<string, string> = {
  Programmation: "Programming",
  IoT: "IoT",
  Sécurité: "Security",
  Data: "Data",
  Réseau: "Networking",
  Business: "Business",
  Communication: "Communication",
  Hardware: "Hardware",
  "Outils digitaux": "Digital tools",
};

export const SERVICES_EN: Record<string, { title: string; problem: string; deliverables: string[]; approach: string[]; stack?: string[]; proof?: string[] }> = {
  "web-apps": {
    title: "Custom web applications",
    problem: "A business process lives in spreadsheets, emails and tools that don't talk to each other.",
    deliverables: ["Responsive web application in production", "Documented, versioned source code", "Deployment pipeline"],
    approach: ["Scoping workshop with future users", "Clickable prototype before development", "Incremental deliveries and regular demos"],
  },
  "business-data": {
    title: "Business applications & data platforms",
    problem: "Critical data is entered inconsistently and becomes unusable or non-compliant.",
    deliverables: ["Data model and guided entry flows", "Validation / review workflow", "Data exposed through open standards"],
    approach: ["Map stakeholders and data", "Design the model with domain experts", "Progressive validation rather than blocking"],
  },
  ai: {
    title: "AI integration",
    problem: "A rich document base stays out of reach because keyword search isn't enough.",
    deliverables: ["Semantic search or RAG assistant over your content", "Documented API", "Relevance evaluation on real cases"],
    approach: ["Build a reference question set", "Reasoned choice of vector store", "Guardrails: cited sources, answers limited to the corpus"],
    stack: ["Python", "FastAPI", "Qdrant", "Pinecone", "Claude / OpenAI APIs"],
  },
  backend: {
    title: "Backend architecture & APIs",
    problem: "An API grows without structure: tight coupling, improvised real time, risky deployments.",
    deliverables: ["Target architecture and migration plan", "Typed, tested REST API", "Real-time notifications, queues, caching"],
    approach: ["Audit the existing system", "Split by domain", "Progressive migration, no big bang"],
  },
  modernisation: {
    title: "Modernisation & DevOps",
    problem: "An ageing application is hard to evolve and to deploy with confidence.",
    deliverables: ["Containerisation", "CI/CD pipeline", "Prioritised modernisation plan"],
    approach: ["Measure before changing", "Automate deployments first", "Modernise in reversible steps"],
  },
  consulting: {
    title: "Technical consulting",
    problem: "A structural technical decision must be made without in-house expertise to inform it.",
    deliverables: ["Reasoned recommendation memo", "Targeted proof of concept", "Team support"],
    approach: ["Clarify the real need", "Compare options against explicit criteria", "Test the riskiest assumption first"],
    stack: ["Depends on the context"],
    proof: ["Article: pgvector vs Qdrant (in French)"],
  },
};

export const STORYBOARD_EN = [
  { title: "Introduction", shot: "Close-up, eye contact with the camera, cool side lighting. KOUD title overlaid.", voice: "“My name is Jancy Koud Banga. I build software that solves real problems.”" },
  { title: "My journey", shot: "Shots of hands at a blackboard, then at a keyboard: from mathematics to code.", voice: "Mathematics teacher in Congo, then two master's degrees in France: computer science and information systems management." },
  { title: "My approach", shot: "Workshop with users, sticky notes, an architecture sketch drawn by hand.", voice: "Understand the domain before writing code. Standards rather than quick fixes." },
  { title: "My projects", shot: "Approved real screenshots scrolling: DECLIC (diagram), Wmbia, Akili.", voice: "A data platform for environmental research, semantic search, offline-first school management." },
  { title: "My vision", shot: "Back to the face-to-camera shot, wider.", voice: "Restrained, reliable products that last." },
  { title: "Let's collaborate", shot: "End card: KOUD, the site address, a “Let's talk about your project” button.", voice: "“Let's talk about your project.”" },
] as const;

export const SITE_EN = {
  location: "Clermont-Ferrand, France",
  availability: "Available for projects and opportunities — open to relocation within France",
  portraitAlt: "Portrait of Jancy Koud Banga",
  resumes: ["CV — Full-stack development (in French)", "CV — IT project management (in French)"],
};
