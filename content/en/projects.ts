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
    screens: [
      { alt: "WMBai home page: assistant overview and sign-in form", caption: "Home and sign-in — the product is live under the name WMBai. The assistant itself requires an account." },
      { alt: "WMBai sign-in screen on mobile", caption: "Sign-in on mobile." },
    ],
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
    screens: [
      { alt: "Akili sign-in screen: “Intelligence serving African education”", caption: "Sign-in — email or student code, bilingual FR/EN interface." },
      { alt: "Akili sign-up, step 1 of 4: choosing a student, parent or teacher profile", caption: "4-step sign-up with one profile per role (student, parent, teacher)." },
      { alt: "School creation wizard: access-code step", caption: "Creating a school: 5-step wizard (access code, school, levels, subjects, principal)." },
      { alt: "Akili sign-in screen on mobile", caption: "Sign-in on mobile (PWA)." },
      { alt: "Akili school creation on mobile", caption: "School creation on mobile." },
    ],
  },
  "akili-universite": {
    tagline: "Akili's edition for higher education.",
    summary:
      "A version of Akili for universities and higher-education institutions (bachelor's, master's, doctorate): guided institution setup, choice of country and currency, role-based spaces.",
    statusNote: "Live site — status to be confirmed.",
    role: "Design and development",
    solution: [
      "3-step institution setup wizard, with the “University” type (bachelor's, master's, doctorate).",
      "Regional settings: French-speaking African countries and XOF, XAF, EUR, USD, GNF, MAD currencies.",
      "4-step, role-based sign-up (student, parent, teacher), bilingual FR/EN interface.",
    ],
    screens: [
      { alt: "Creating a University-type institution, step 1 of 3", caption: "Setting up a higher-education institution: step 1 of 3." },
      { alt: "Akili Université institution setup on mobile", caption: "The same flow on mobile." },
    ],
  },
  nzoto: {
    tagline: "Find a verified doctor in Congo-Brazzaville, and keep your health record with you.",
    summary:
      "A health platform: a directory of practitioners whose credentials are checked, a personal medical record and a QR emergency card. Book a consultation and pay by mobile money or at the practice, from any browser.",
    statusNote: "Live site — launch status to be confirmed.",
    role: "Design and development",
    problem:
      "Knowing whether a practitioner is licensed, retelling your medical history at every visit, being treated in an emergency with nobody knowing your blood type or allergies: three everyday obstacles.",
    solution: [
      "A verified directory: medical council number, credentials and affiliated facility checked before anything is shown; fees displayed.",
      "A health record (blood type, sickle-cell status, allergies, treatments, documents) visible to the patient only, shareable practitioner by practitioner and revocable.",
      "A two-level QR emergency card: the public sees only vital information; full access requires a caregiver account and is logged. Printable and readable in black and white.",
      "A three-step journey with nothing to install: find, book (mobile money or at the practice), keep your record.",
    ],
    screens: [
      { alt: "Nzoto home page: “All your health in one place — anywhere in Congo”", caption: "Home — the counters (cities, practitioners, specialties) are read from the database, not typed in by hand." },
      { alt: "Section presenting the three obstacles and what Nzoto changes", caption: "The three problems addressed and the product's answer." },
      { alt: "“Three steps, nothing to install” section", caption: "Three-step journey: find, book, keep." },
      { alt: "“What protects your record” section", caption: "Record protection: verification at the source, encrypted documents, logged access." },
      { alt: "Nzoto home page on mobile", caption: "Home on mobile." },
    ],
  },
  vy: {
    tagline: "Online shop for a print-on-demand clothing brand.",
    summary:
      "E-commerce site for the VY brand: heavyweight cotton t-shirts, sweatshirts, caps and beanies, printed on demand and shipped in France. Collections, outfits by time of day, detailed product pages, cart and favourites.",
    statusNote: "Live site — commercial status to be confirmed.",
    role: "Design and development",
    solution: [
      "Catalogue by audience (men, women, kids) with filters by colour, size and category.",
      "Editorial outfits “A day in VY” (training, work, commute, going out) linking to the pieces.",
      "Product pages with colours, size guide, real measurements and fibre composition.",
      "Trust pages: delivery and returns, FAQ, size guide; cookie consent with one-click refusal.",
    ],
    screens: [
      { alt: "VY home page: Collection 01, VY t-shirt", caption: "Home — Collection 01." },
      { alt: "“A day in VY” section", caption: "Editorial outfits “A day in VY”." },
      { alt: "VY shop with colour and size filters", caption: "Shop: filters by category, colour and size." },
      { alt: "VY hoodie product page", caption: "Product page: colours, sizes, description." },
      { alt: "“Training” outfit and its pieces", caption: "An outfit and its pieces." },
      { alt: "VY home page on mobile", caption: "Home on mobile." },
      { alt: "VY product page on mobile", caption: "Product page on mobile." },
    ],
  },
  "esge-services": {
    tagline: "A home-services platform: from quote request to invoice, every step tracked online.",
    summary:
      "Client engagement for ESGE GLOBAL COMMERCE: a platform organising seven families of home services (cleaning, gardening, small repairs, meals, grocery delivery, laundry, home watch). Customers describe their need, receive a quote, accept it, follow the service live and find their documents; the team and the service staff each have their own space.",
    statusNote: "Features delivered; go-live awaiting information from the client.",
    role: "Full-stack design and development — client engagement",
    problem:
      "A home-services provider has to handle requests, quotes, staff schedules, visit reports and invoices, often by phone and on paper. Customers, meanwhile, don't know where their request stands or when someone will arrive.",
    solution: [
      "A 4-step request flow (service, preferred slot with an accessible calendar, contact details, summary), with service-area checks.",
      "Versioned quotes made immutable once sent (database triggers), then online acceptance and step-by-step request tracking.",
      "Live visit tracking (scheduled, on the way, at your home, done) based on times entered by the staff member — no location is ever shared.",
      "A “house journal” (report and photos after each visit) and a “house notebook” (customer instructions reviewed at every visit).",
      "Three separate spaces: customer, service staff (schedule, assignments, reports, documents) and ESGE team (back office); no role can be obtained by signing up.",
    ],
    challenges: [
      { title: "Security in the database", body: "Row Level Security rules on the data, tested against a real PostgreSQL database: customers only see their own requests, issued invoices are immutable, attachments go through short-lived signed URLs." },
      { title: "A rule of truth", body: "No price, review, service area or promise is shown without a decision validated by the client: the app runs with honest fallbacks (“on quote”) while information is missing." },
      { title: "Tracking without surveillance", body: "Customers know where the visit stands without the staff member being geolocated: only declared times are shared." },
    ],
    facts: ["families of home services", "spaces: customer, staff, team", "Playwright tests (journeys, accessibility, 4 widths)"],
    screens: [
      { alt: "Home cleaning service page", caption: "Service page — seven services on a single template, distinct content." },
      { alt: "Customer space: live tracking and request progress", caption: "Customer space: live visit tracking and request progress (demo data)." },
      { alt: "House journal: visit report with completed tasks and photos", caption: "House journal: report and photos after each visit." },
      { alt: "House notebook: customer instructions for service staff", caption: "House notebook: the customer's instructions, reviewed at every visit." },
      { alt: "House journal on mobile", caption: "House journal on mobile." },
      { alt: "Tracking card “Camille is on the way”", caption: "Live tracking: the staff member is on the way." },
    ],
  },
  "orient-ex": {
    tagline: "Volunteer mentoring for students and young professionals.",
    summary: "A platform that connects young people with volunteer mentors to support their studies, careers and personal development.",
    role: "Web development",
    solution: ["Modular Nuxt.js architecture with a MySQL database.", "Docker containerisation and a GitLab CI/CD pipeline for reproducible deployments."],
    screens: [
      { alt: "Orient'Ex home page: “Find the perfect mentor for your success”", caption: "Home: value proposition and a mentor profile preview." },
      { alt: "“Why choose Orient'Ex” section with three arguments", caption: "Key arguments: expert mentors, personalised learning, flexibility." },
      { alt: "“How it works” page: a three-step process", caption: "3-step journey: profile, choice of mentor, support." },
      { alt: "“Our programmes” section listing six support programmes", caption: "Programmes: CV, study methods, guidance, school results, studying abroad, employability." },
      { alt: "Orient'Ex home page on mobile", caption: "Home on mobile." },
    ],
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
