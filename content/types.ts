export type ProjectCategory =
  | "professional"
  | "web"
  | "mobile"
  | "ai-data"
  | "education"
  | "ecommerce"
  | "experiments";

export type ProjectStatus = "production" | "in-progress" | "confidential" | "demo" | "archived";

/** A published number/claim must say where it comes from. */
export type Fact = { value: string; label: string; source: string };

export type Screen = {
  src: string;
  alt: string;
  caption: string;
  device: "desktop" | "tablet" | "mobile";
  width: number;
  height: number;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  kind: "actor" | "app" | "service" | "data" | "standard" | "device";
  detail: string;
  /** Grid placement for the diagram (column 1-4, row 1-3). */
  col: number;
  row: number;
};

export type ArchitectureEdge = { from: string; to: string; label: string };

export type ProjectLink = { label: string; href: string; kind: "live" | "demo" | "repo" | "video" };

export type Project = {
  slug: string;
  name: string;
  formerName?: string;
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  statusNote?: string;
  year: string;
  role: string;
  context?: string;
  stack: string[];
  problem?: string;
  solution?: string[];
  architecture?: { nodes: ArchitectureNode[]; edges: ArchitectureEdge[]; note?: string };
  challenges?: { title: string; body: string }[];
  outcomes?: string[];
  learnings?: string[];
  facts?: Fact[];
  screens: Screen[];
  links: ProjectLink[];
  /** Typographic cover colours when no real screenshot exists. */
  cover: { hue: string; motif: "grid" | "orbit" | "wave" | "stack" | "nodes" };
  featured?: boolean;
  /** Drafts are excluded from pages, sitemap and KOUD AI. */
  draft?: boolean;
  /** Content still expected from the owner (internal, never rendered). */
  missing?: string[];
  relatedPost?: string;
};

export type Experience = {
  period: string;
  start: string;
  title: string;
  org: string;
  place?: string;
  kind: "work" | "education";
  points: string[];
  stack?: string[];
};

export type Service = {
  id: string;
  title: string;
  problem: string;
  deliverables: string[];
  approach: string[];
  stack: string[];
  proof: { label: string; href: string }[];
};
