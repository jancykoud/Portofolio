"use client";

// ── Données ───────────────────────────────────────────────────────────────
const ROW_1 = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "OGC SensorThings",
  "Prisma",
  "Tailwind",
  "Framer Motion",
];

const ROW_2 = [
  "Python",
  "FastAPI",
  "Qdrant",
  "LoRaWAN",
  "INSPIRE",
  "NestJS",
  "Supabase",
  "Redis",
  "GitLab CI/CD",
  "WebSockets",
  "JWT",
  "Leaflet",
];

// ── Composant pill ─────────────────────────────────────────────────────────
const Pill = ({ label }) => (
  <>
    <span
      className="font-inter shrink-0 whitespace-nowrap"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 100,
        color: "rgba(255,255,255,0.6)",
        fontSize: 11,
        padding: "5px 14px",
      }}
    >
      {label}
    </span>
    {/* Séparateur violet */}
    <span
      className="shrink-0 select-none"
      style={{ color: "#8b5cf6", fontSize: 14, lineHeight: 1 }}
      aria-hidden="true"
    >
      ·
    </span>
  </>
);

// ── Rangée avec animation ──────────────────────────────────────────────────
const MarqueeRow = ({ items, direction }) => {
  // Doubler les items pour un défilement sans couture
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden marquee-wrapper">
      <div
        className={`marquee-track ${
          direction === "right" ? "marquee-track--right" : "marquee-track--left"
        }`}
        style={{ gap: 10 }}
      >
        {doubled.map((label, i) => (
          <Pill key={i} label={label} />
        ))}
      </div>
    </div>
  );
};

// ── Composant principal ────────────────────────────────────────────────────
const TechMarquee = () => {
  return (
    <div
      style={{
        background: "#0a0a0a",
        paddingTop: 14,
        paddingBottom: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        overflow: "hidden",
      }}
    >
      <MarqueeRow items={ROW_1} direction="left" />
      <MarqueeRow items={ROW_2} direction="right" />
    </div>
  );
};

export default TechMarquee;
