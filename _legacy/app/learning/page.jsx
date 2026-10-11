"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import data from "@/content/learning.json";

// ── Helpers ────────────────────────────────────────────────────────────────
function weeksUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  const weeks = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
  if (weeks <= 0) return "Bientôt";
  return `dans ${weeks} sem.`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatPlannedDate(str) {
  const [year, month] = str.split("-");
  const names = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  return `${names[parseInt(month, 10) - 1]} ${year}`;
}

// ── Catégories disponibles ──────────────────────────────────────────────────
const ALL_CATS = ["Tout", ...Array.from(new Set(data.courses.map((c) => c.category)))];

// ── Barre de progression animée ─────────────────────────────────────────────
function ProgressBar({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="w-full" style={{ background: "#f0f0f0", borderRadius: 100, height: 6 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ height: 6, borderRadius: 100, background: "#8b5cf6" }}
      />
    </div>
  );
}

// ── Badge statut ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 font-inter text-[10px] px-2.5 py-1 rounded-full" style={{ background: "#dcfce7", color: "#16a34a" }}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
        En cours
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 font-inter text-[10px] px-2.5 py-1 rounded-full" style={{ background: "#f3f0ff", color: "#7c3aed" }}>
        ✓ Terminé
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-inter text-[10px] px-2.5 py-1 rounded-full" style={{ background: "#fef3c7", color: "#d97706" }}>
      ⏸ En pause
    </span>
  );
}

// ── Card formation ──────────────────────────────────────────────────────────
function CourseCard({ course, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="p-5 rounded-xl flex flex-col gap-4"
      style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Plateforme */}
          <span
            className="inline-block font-inter text-[10px] uppercase tracking-[0.1em] px-2.5 py-0.5 rounded"
            style={{ background: course.color + "18", color: course.color, border: `0.5px solid ${course.color}40` }}
          >
            {course.platform}
          </span>
          {/* Catégorie */}
          <span
            className="inline-block font-inter text-[10px] uppercase tracking-[0.1em] px-2.5 py-0.5 rounded-full w-fit"
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}
          >
            {course.category}
          </span>
        </div>
        <StatusBadge status={course.status} />
      </div>

      {/* Titre */}
      <h3 className="font-syne font-bold leading-snug" style={{ fontSize: 14, color: "#ffffff" }}>
        {course.title}
      </h3>

      {/* Progression */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>Progression</span>
          <span className="font-inter text-[11px] font-medium" style={{ color: "#8b5cf6" }}>{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col gap-0.5">
          <span className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Fin prévue : {formatDate(course.endDate)}
          </span>
          <span className="font-inter text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            {weeksUntil(course.endDate)}
          </span>
        </div>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter text-[11px] underline underline-offset-2 transition-opacity hover:opacity-60"
          style={{ color: course.color }}
        >
          Voir →
        </a>
      </div>
    </motion.div>
  );
}

// ── Roadmap item ────────────────────────────────────────────────────────────
function RoadmapItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const dotColor = item.status === "planned" ? "#8b5cf6" : item.status === "in-progress" ? "#22c55e" : "#ccc";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 items-start"
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 2 }}>
        <div className="w-3 h-3 rounded-full ring-4 ring-[#0a0a0a] z-10" style={{ background: dotColor }} />
        {index < data.roadmap.length - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 40, background: "rgba(255,255,255,0.08)", marginTop: 4 }} />
        )}
      </div>

      {/* Contenu */}
      <div className="pb-8 flex flex-col gap-2">
        <span
          className="inline-block font-inter text-[10px] px-2.5 py-0.5 rounded-full w-fit"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
        >
          {formatPlannedDate(item.plannedDate)}
        </span>
        <h4 className="font-syne font-bold" style={{ fontSize: 15, color: "#ffffff" }}>{item.title}</h4>
        <div className="flex items-center gap-2">
          <span
            className="inline-block font-inter text-[10px] px-2.5 py-0.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}
          >
            {item.category}
          </span>
          <span className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {item.status === "planned" ? "Prévu" : "En préparation"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page principale ─────────────────────────────────────────────────────────
export default function LearningPage() {
  const [activeFilter, setActiveFilter] = useState("Tout");

  const filtered = activeFilter === "Tout"
    ? data.courses
    : data.courses.filter((c) => c.category === activeFilter);

  const activeCourses = data.courses.filter((c) => c.status === "in-progress");

  return (
    <section className="min-h-[calc(100vh-80px)]" style={{ background: "#0a0a0a" }}>
      <div className="container mx-auto px-4 pt-16 pb-24">

        {/* ── Header éditorial ── */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div style={{ height: "0.5px", width: 28, background: "rgba(255,255,255,0.25)" }} />
            <span className="font-inter uppercase tracking-[0.18em] text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Formation continue · Auto-apprentissage
            </span>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
            <h1
              className="font-syne font-black leading-none"
              style={{ fontSize: "clamp(32px, 6vw, 60px)", color: "#ffffff", letterSpacing: "-0.025em" }}
            >
              En formation
              <br />
              <span style={{ color: "#8b5cf6" }}>continue.</span>
            </h1>
            {/* Badge actifs */}
            <div className="flex items-center gap-2 self-start xl:self-end pb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#8b5cf6" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#8b5cf6" }} />
              </span>
              <span className="font-inter text-[12px]" style={{ color: "#8b5cf6" }}>
                {activeCourses.length} cours actifs
              </span>
            </div>
          </div>
          <p className="font-inter mt-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Formations en cours · Certifications · Roadmap
          </p>
        </div>

        {/* ── Filtres ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="font-inter text-[11px] px-4 py-1.5 rounded-full transition-all duration-200"
              style={
                activeFilter === cat
                  ? { background: "#8b5cf6", color: "#fff", border: "0.5px solid #8b5cf6" }
                  : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "0.5px solid rgba(255,255,255,0.1)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Section 1 : Formations en cours ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-syne font-bold" style={{ fontSize: 18, color: "#ffffff" }}>
              En cours
            </h2>
            <span
              className="font-inter text-[11px] px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}
            >
              {filtered.length}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="font-inter text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Aucune formation dans cette catégorie.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((course, i) => (
                <CourseCard key={course.title} course={course} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* ── Section 2 : Certifications ── */}
        <div className="mb-16">
          <h2 className="font-syne font-bold mb-6" style={{ fontSize: 18, color: "#0a0a0a" }}>
            Certifications obtenues
          </h2>

          {data.certifications.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-xl py-16"
              style={{ border: "0.5px dashed rgba(255,255,255,0.1)", background: "#111111" }}
            >
              {/* Icône certificat SVG */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              <p className="font-syne font-bold" style={{ fontSize: 15, color: "#ffffff" }}>
                Bientôt — certifications en cours d'obtention
              </p>
              <p className="font-inter text-center max-w-xs" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                Cette section se remplira automatiquement dès l'obtention de ta première certification
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="cert-card p-6 rounded-xl flex flex-col gap-3"
                  style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-syne font-black text-sm" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
                    {cert.title.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-syne font-bold" style={{ fontSize: 14, color: "#ffffff" }}>{cert.title}</h3>
                  <p className="font-inter text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>{cert.issuer}</p>
                  <p className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{cert.date}</p>
                  {cert.credlyUrl && (
                    <a href={cert.credlyUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-[11px] underline underline-offset-2" style={{ color: "#8b5cf6" }}>
                      Vérifier →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Section 3 : Roadmap ── */}
        <div>
          <h2 className="font-syne font-bold mb-8" style={{ fontSize: 18, color: "#0a0a0a" }}>
            Ce que je prépare
          </h2>
          <div className="max-w-lg">
            {data.roadmap.map((item, i) => (
              <RoadmapItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
