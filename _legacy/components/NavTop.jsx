"use client";

export default function NavTop() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        zIndex: 100,
        background: "#f2f0eb",
        borderBottom: "0.5px solid rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Logo + tagline */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 11,
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.05em",
            }}
          >
            JK
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 9,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(0,0,0,0.45)",
            lineHeight: 1.5,
            display: "none",
          }}
          className="sm:block"
        >
          INGÉNIEUR FULLSTACK &amp; SIG — DONNÉES ENVIRONNEMENTALES · IOT · OGC/INSPIRE
        </span>
      </div>

      {/* Liens */}
      <a
        href="https://github.com/jancykoud"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
          padding: "4px 10px",
          border: "0.5px solid rgba(0,0,0,0.15)",
          borderRadius: 100,
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "#0a0a0a" }}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "#0a0a0a",
            textTransform: "uppercase",
          }}
        >
          LIENS
        </span>
      </a>
    </header>
  );
}
