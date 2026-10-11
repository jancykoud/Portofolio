"use client";

import nowData from "@/content/now.json";

const cards = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Je travaille sur",
    value: nowData.working,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.28L12 4.5A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.28L12 4.5A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
    label: "J'apprends",
    value: nowData.learning,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: "Je lis",
    value: nowData.reading,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    label: "J'écoute",
    value: nowData.listening,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Je suis à",
    value: nowData.location,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: "Mis à jour",
    value: nowData.updatedAt,
  },
];

export default function NowSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Badge Live */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#22c55e" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#22c55e" }}
            />
          </span>
          <span className="font-inter text-[10px] uppercase tracking-[0.12em]" style={{ color: "#22c55e" }}>
            Live
          </span>
        </div>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <span
            className="font-inter uppercase tracking-[0.18em] text-[9px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            — En ce moment
          </span>
        </div>

        {/* Grille 2x3 */}
        <div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="px-6 py-5 flex flex-col gap-2"
              style={{
                borderRight: (i % 3 !== 2) ? "0.5px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.35)" }}>{card.icon}</div>
              <span
                className="font-inter text-[9px] uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {card.label}
              </span>
              <span
                className="font-inter text-[13px] leading-snug"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {card.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
