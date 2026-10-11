import type { Project } from "../types";

/**
 * English translations of project text. Only wording is translated: facts,
 * stack, links and statuses come from the French source (content/projects.ts).
 */
export type ProjectTranslation = Partial<
  Pick<Project, "tagline" | "summary" | "statusNote" | "year" | "role" | "context" | "problem" | "solution" | "challenges" | "outcomes" | "learnings">
> & {
  facts?: string[]; // labels, same order as the source
  screens?: { alt: string; caption: string }[]; // same order as the source
  architecture?: { note?: string; nodes: Record<string, { label?: string; detail: string }>; edges?: string[] };
};

export const PROJECTS_EN: Record<string, ProjectTranslation> = {
  declic: {
    tagline: "A platform for declaring and managing scientific instruments in environmental research.",
    summary:
      "A business application built for the laboratories of the ANR TERRA FORMA project: researchers declare their IoT instruments through a guided flow, an administrator reviews them, and each declaration becomes an entity compliant with the OGC SensorThings standard.",
    statusNote: "Internal application — code, screenshots and data cannot be published.",
    year: "2025 → present",
    role: "GIS engineering & full-stack development — design and development of the portal",
    context: "ANR TERRA FORMA project (CNRS · INRAE · IRD · UCA)",
    problem:
      "The network's laboratories deploy LoRaWAN sensors across very different ecosystems, each with its own instruments, units and naming conventions. Without a shared reference, aggregating their data is constant manual work — and one cataloguing error can ruin months of measurements.",
    solution: [
      "A 4-step declaration wizard designed for ecologists, not developers: site on a map (WGS84), instrument type, LoRaWAN configuration, scientific metadata.",
      "An abstraction layer that turns field entries into valid SensorThings entities (Thing, Location, Sensor, ObservedProperty, Datastream) in FROST-Server.",
      "A “draft” status for old or poorly documented sensors, and a mandatory review workflow before publication.",
      "Generation of ISO 19139 metadata records compliant with INSPIRE / ISO 19115, so datasets can be discovered by other European systems.",
    ],
    architecture: {
      note: "Simplified functional view, rebuilt from information that is already public. No internal infrastructure detail is exposed.",
      nodes: {
        field: { label: "LoRaWAN sensors", detail: "Instruments deployed on observation sites. Low data rate, duty cycle < 1%, data sometimes received hours late." },
        researcher: { label: "Researchers", detail: "Declare their instruments through the 4-step wizard, with progressive validation and a draft status." },
        admin: { label: "Administrators", detail: "Review every declaration before publication: cataloguing errors are expensive once data has accumulated." },
        portal: { label: "DECLIC portal", detail: "React/Next.js interface and Node.js API: wizard, Leaflet map, instrument catalogue, review workflow." },
        db: { detail: "The portal's reference data: sites, instruments, declarations and their status, consistency checks (DevEUI, coordinates)." },
        frost: { detail: "Reference implementation of OGC SensorThings: stores Things, Datastreams and Observations with stable URLs." },
        sta: { detail: "Shared model Thing → Location → Datastream → Observation: any compliant client can query the data." },
        inspire: { label: "INSPIRE metadata", detail: "ISO 19139 records generated from the portal (ISO 19115), for dataset discovery across Europe." },
      },
      edges: ["declares", "reviews", "persists", "creates entities", "observations (asynchronous)", "exposes", "generates"],
    },
    challenges: [
      { title: "Sensor identity", body: "Several naming conventions across laboratories, undocumented DevEUIs, approximate coordinates: the “import” task became a problem of identity management for IoT objects." },
      { title: "UX versus compliance", body: "The form must stay intuitive for scientists while producing a strictly standard data model. Compliance is made invisible through an abstraction layer." },
      { title: "Coordinates are opinions", body: "Precision GPS, phone or online map: two declarations of the same site disagree. Added an estimated-accuracy field and an alert beyond a 50 m gap." },
      { title: "Asynchronous ingestion", body: "LoRaWAN means low throughput and delayed messages: the system is designed for missing and late data, not strict real time." },
    ],
    outcomes: [
      "A unified catalogue of 53 LoRaWAN instrument models.",
      "A declaration flow that structurally prevents the most expensive data-entry errors.",
      "Data published in an open standard: a new laboratory can join the network without negotiating formats.",
    ],
    learnings: [
      "Interoperability is technical debt avoided, not incurred.",
      "Validation can't be strict on day one: imperfect data needs a path.",
      "A review workflow isn't a lack of trust — it's insurance on data quality.",
    ],
    facts: ["instrument models catalogued", "guided declaration steps", "project start"],
  },
  wmbia: {
    tagline: "A semantic search assistant built exclusively on a corpus of religious texts.",
    summary:
      "A search engine that finds a passage from its meaning, not its exact words. Vector indexing, a Python API and a deliberately minimal React interface.",
    role: "Design and development — personal project",
    problem:
      "Keyword search fails when you only remember the general meaning of a passage. It needed reliable semantic search over a literal, multilingual corpus.",
    solution: [
      "text-embedding-3-small embeddings indexed in Qdrant, with the text stored directly in the vector payload (no join at read time).",
      "A FastAPI /search endpoint: query embedding, cosine similarity, metadata filters, top 10 with scores.",
      "Separate collections per language, as French and English embeddings aren't directly comparable on very literal texts.",
      "An interface that doesn't explain the technology: users look for a passage and find it.",
    ],
    challenges: [
      { title: "pgvector or Qdrant?", body: "Benchmark on a corpus of about 31,000 entries: p95 latency ~45 ms (pgvector) versus ~8 ms (Qdrant) on 10k vectors, native filtering and stored payload. Qdrant chosen." },
      { title: "The relevance threshold", body: "A cosine score doesn't mean the same thing for every corpus: an empirical threshold was calibrated and query-rewording suggestions were added." },
    ],
    learnings: ["Vector search impresses from the first POC; making it robust in production takes far longer."],
    facts: ["measured p95 latency (Qdrant, 10k vectors)"],
  },
  akili: {
    tagline: "Multi-school management designed for Africa.",
    summary:
      "A SaaS platform covering a school's full lifecycle: enrolment, grades, report cards, attendance, timetables, payments and official documents. Offline-first for intermittent connectivity.",
    statusNote: "Public demo online — launch date to be confirmed.",
    year: "2025 → present",
    role: "Full-stack design and development — personal project",
    problem:
      "Target schools juggle paper, spreadsheets and disconnected tools, with unreliable connectivity and mobile-money payments (XOF).",
    solution: [
      "Offline-first PWA: the app keeps working offline and syncs when the network returns.",
      "5 user roles with dedicated spaces, from principal to teacher.",
      "Push notifications (FCM) and real time (WebSockets), PDF document generation.",
      "JWT authentication with TOTP two-factor.",
      "Turborepo monorepo sharing types and business logic between front end and API.",
    ],
    facts: ["user roles"],
  },
  "orient-ex": {
    tagline: "Volunteer mentoring for students and young professionals.",
    summary: "A platform that connects young people with volunteer mentors to support their studies, careers and personal development.",
    role: "Web development",
    solution: ["Modular Nuxt.js architecture with a MySQL database.", "Docker containerisation and a GitLab CI/CD pipeline for reproducible deployments."],
  },
  "tash-cash-agency": {
    tagline: "A trilingual website for a pan-African agency based in Yaoundé.",
    summary: "Freelance engagement: a FR / EN / ES website with multilingual SEO and particular attention to Core Web Vitals.",
    role: "Full-stack development — freelance engagement",
  },
  "hslu-exam-assistant": {
    tagline: "A RAG study assistant grounded in course materials.",
    summary: "A question-answering system specific to university courses: answers cite the materials, and the tool generates revision guides and practice exercises.",
    role: "AI backend and front-end development",
    solution: [
      "FastAPI backend integrating Pinecone for embedding storage.",
      "LLM answer generation with citations of the source materials.",
      "Next.js / Tailwind CSS client, OpenAPI / Swagger UI documentation.",
    ],
    screens: [
      { alt: "Features section: AI assistant, study guides, practice questions, knowledge gaps", caption: "Features: assistant, study guides, practice questions, knowledge-gap detection." },
      { alt: "The application's four-step flow", caption: "Four-step user flow." },
      { alt: "HSLU Data Science Exam Preparation home page", caption: "Home — the counters shown are the interface's demo content." },
    ],
  },
  "let-us-connect": {
    tagline: "A student–alumni network: mentoring, events and job-application tracking.",
    summary: "A social platform connecting students and alumni for mentoring, projects and opportunities, with a job-search tracking tool.",
    role: "API and interface development",
    solution: [
      "RESTful API in Go Fiber for a scalable backend.",
      "Cloudinary for file management, Pusher for real-time notifications.",
      "NextUI / shadcn/ui interface, Zod validation, Zustand global state.",
    ],
    screens: [
      { alt: "Let's Connect home page", caption: "Home and main calls to action." },
      { alt: "Grid of the platform's key features", caption: "Key features: mentoring, networking, jobs, events." },
    ],
  },
  congostore: {
    tagline: "A native Android e-commerce app.",
    summary: "A complete online shopping app: catalogue, cart, authentication and real-time sync.",
    role: "Design and development",
    solution: [
      "Modular MVC architecture.",
      "Firebase for real-time sync and authentication.",
      "RecyclerView for dynamic lists, Glide for asynchronous image loading.",
    ],
    screens: [
      { alt: "CongoStore welcome screen", caption: "Onboarding." },
      { alt: "Product catalogue with ratings and prices", caption: "Product catalogue." },
      { alt: "Cart with quantities, promo code and total", caption: "Cart and summary." },
    ],
  },
};
