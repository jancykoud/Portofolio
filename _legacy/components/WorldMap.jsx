"use client";

import dynamic from "next/dynamic";

// Leaflet must not render server-side
const MapInner = dynamic(() => import("./WorldMapInner"), { ssr: false, loading: () => null });

export default function WorldMap() {
  return (
    <section style={{ background: "#0a0a0a" }} className="py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div style={{ height: "0.5px", width: 28, background: "rgba(255,255,255,0.3)" }} />
            <span className="font-inter uppercase tracking-[0.18em] text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Impact géographique
            </span>
          </div>
          <h2
            className="font-syne font-black leading-none"
            style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", letterSpacing: "-0.02em" }}
          >
            — Projets actifs
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>à travers le monde</span>
          </h2>
        </div>

        {/* Carte */}
        <div className="rounded-xl overflow-hidden" style={{ height: 380, border: "0.5px solid rgba(255,255,255,0.08)" }}>
          <MapInner />
        </div>
      </div>
    </section>
  );
}
