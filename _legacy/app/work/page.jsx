"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GitHubCard from "@/components/GitHubCard";
import ProjectCarousel from "@/components/ProjectCarousel";
import { BsArrowUpRight } from "react-icons/bs";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const Chip = ({ label, style }) => (
  <span
    className="font-inter text-[10px] font-medium px-2.5 py-1 rounded-full"
    style={{ border: "0.5px solid", ...style }}
  >
    {label}
  </span>
);

const StatusDot = ({ color, label }) => (
  <span className="flex items-center gap-1.5 font-inter text-[10px]" style={{ color }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
    {label}
  </span>
);

export default function Work() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-12 xl:py-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Portfolio
          </p>
          <h1
            className="font-syne font-black text-[38px] xl:text-[52px] leading-[1.05] text-white"
            style={{ letterSpacing: "-0.025em" }}
          >
            Projets <span style={{ color: "#8b5cf6" }}>sélectionnés.</span>
          </h1>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {/* CARTE 1 — FROST-FORMS */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-7 rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#0f0f1a", minHeight: 280 }}
          >
            <div className="flex items-start justify-between">
              <span
                className="font-inter text-[10px] font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "0.5px solid rgba(139,92,246,0.3)" }}
              >
                Confidentiel
              </span>
            </div>
            <div>
              <h2 className="font-syne font-black text-2xl text-white mb-1">FROST-FORMS</h2>
              <p className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                ANR TERRA FORMA · CNRS / INRAE / IRD / UCA · Budget 12M€
              </p>
            </div>
            <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Portail fullstack IoT environnemental développé en solo. Wizard multi-étapes,
              catalogue de 53 capteurs LoRaWAN, carte interactive, workflow de modération
              et conformité OGC SensorThings API.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Chip label="OGC SensorThings" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", borderColor: "rgba(139,92,246,0.3)" }} />
              <Chip label="INSPIRE" style={{ background: "rgba(139,92,246,0.08)", color: "#c4b5fd", borderColor: "rgba(139,92,246,0.2)" }} />
              <Chip label="React 18" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
              <Chip label="TypeScript" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
              <Chip label="PostgreSQL" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
              <Chip label="Docker" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
            </div>
          </motion.div>

          {/* CARTE 2 — Stat "5+" */}
          <motion.div
            variants={cardAnim}
            className="col-span-6 xl:col-span-2 rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "rgba(139,92,246,0.1)", border: "0.5px solid rgba(139,92,246,0.2)", minHeight: 140 }}
          >
            <p className="font-inter text-[10px] uppercase tracking-wider" style={{ color: "#a78bfa" }}>
              En production
            </p>
            <div>
              <p className="font-syne font-black text-4xl" style={{ color: "#c4b5fd" }}>5+</p>
              <p className="font-inter text-xs mt-1" style={{ color: "#a78bfa" }}>Projets livrés</p>
            </div>
          </motion.div>

          {/* CARTE 3 — Stat "53" */}
          <motion.div
            variants={cardAnim}
            className="col-span-6 xl:col-span-3 rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "rgba(251,191,36,0.1)", border: "0.5px solid rgba(251,191,36,0.2)", minHeight: 140 }}
          >
            <p className="font-inter text-[10px] uppercase tracking-wider" style={{ color: "#fbbf24" }}>
              TERRA FORMA
            </p>
            <div>
              <p className="font-syne font-black text-4xl" style={{ color: "#fde68a" }}>53</p>
              <p className="font-inter text-xs mt-1" style={{ color: "#fbbf24" }}>Capteurs IoT référencés</p>
            </div>
          </motion.div>

          {/* CARTE 4 — Wmbia */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-4 rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#111111", border: "0.5px solid rgba(255,255,255,0.08)", minHeight: 240 }}
          >
            <div>
              <span
                className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "0.5px solid rgba(251,191,36,0.3)" }}
              >
                IA · Recherche vectorielle
              </span>
            </div>
            <div>
              <h3 className="font-syne font-black text-xl text-white">Wmbia</h3>
              <p className="font-inter text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Moteur sémantique de citations religieuses. Indexation Qdrant, interface React, IA en production.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip label="React" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
              <Chip label="Python" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
              <Chip label="Qdrant" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)" }} />
            </div>
            <div className="flex items-center justify-between mt-auto">
              <StatusDot color="#22c55e" label="wmbia.com · En ligne" />
              <Link
                href="https://wmbia.com"
                target="_blank"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}
              >
                <BsArrowUpRight className="text-sm" />
              </Link>
            </div>
          </motion.div>

          {/* CARTE 5 — Orient'Ex → vert très sombre */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-4 rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#0a1f0f", minHeight: 240 }}
          >
            <div>
              <span
                className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "0.5px solid rgba(34,197,94,0.25)" }}
              >
                Mentorat éducatif
              </span>
            </div>
            <div>
              <h3 className="font-syne font-black text-xl text-white">Orient&#39;Ex</h3>
              <p className="font-inter text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Plateforme de mise en relation mentors / étudiants. CI/CD GitLab, Docker.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip label="Nuxt.js" style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", borderColor: "rgba(34,197,94,0.25)" }} />
              <Chip label="MySQL"  style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", borderColor: "rgba(34,197,94,0.25)" }} />
              <Chip label="Docker" style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", borderColor: "rgba(34,197,94,0.25)" }} />
            </div>
            <div className="flex items-center justify-between mt-auto">
              <StatusDot color="#22c55e" label="orient-ex.org · En ligne" />
              <Link
                href="https://orient-ex.org"
                target="_blank"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-green-500/20"
                style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80" }}
              >
                <BsArrowUpRight className="text-sm" />
              </Link>
            </div>
          </motion.div>

          {/* CARTE 6 — Akili → marron très sombre */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-4 rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#1a0f00", minHeight: 240 }}
          >
            <div>
              <span
                className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c", border: "0.5px solid rgba(251,146,60,0.25)" }}
              >
                SaaS · Marché africain
              </span>
            </div>
            <div>
              <h3 className="font-syne font-black text-xl text-white">Akili</h3>
              <p className="font-inter text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Gestion scolaire multi-établissements. PWA offline-first, Mobile Money XOF,
                push FCM, 5 rôles, WebSockets.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip label="React 18"   style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", borderColor: "rgba(251,146,60,0.25)" }} />
              <Chip label="TypeScript" style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", borderColor: "rgba(251,146,60,0.25)" }} />
              <Chip label="PWA"        style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", borderColor: "rgba(251,146,60,0.25)" }} />
            </div>
            <div className="mt-auto">
              <StatusDot color="#f59e0b" label="En cours · Lancement sept. 2026" />
            </div>
          </motion.div>

          {/* CARTE 7 — Tash-Cash Agency */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-5 rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#0d1b3e", minHeight: 240 }}
          >
            <div>
              <span
                className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "0.5px solid rgba(251,191,36,0.3)" }}
              >
                Freelance
              </span>
            </div>
            <div>
              <h3 className="font-syne font-black text-xl text-white">Tash-Cash Agency</h3>
              <p className="font-inter text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Yaoundé, Cameroun</p>
              <p className="font-inter text-xs mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                Site trilingue FR/EN/ES pour agence panafricaine. Architecture full-stack
                moderne, SEO multilingue, performances Core Web Vitals.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {["Next.js 15", "NestJS", "Supabase", "Prisma"].map((tech) => (
                <Chip key={tech} label={tech} style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", borderColor: "rgba(251,191,36,0.2)" }} />
              ))}
            </div>
          </motion.div>

          {/* CARTE 8 — GitHub Live */}
          <motion.div
            variants={cardAnim}
            className="col-span-12 xl:col-span-4 rounded-2xl overflow-hidden"
            style={{ background: "#111111", minHeight: 260 }}
          >
            <GitHubCard />
          </motion.div>

          {/* CARTES 9/10/11 — Spécialités */}
          {[
            { icon: "🗺️", title: "SIG & IoT terrain",  tags: ["OGC", "INSPIRE", "LoRaWAN", "GeoJSON", "WGS84"] },
            { icon: "🧠", title: "IA & Vectoriel",      tags: ["Qdrant", "OpenAI API", "Embeddings", "Sémantique"] },
            { icon: "📱", title: "PWA & Mobile",        tags: ["Offline-first", "FCM", "WebSockets", "Service Worker"] },
          ].map((spec, i) => (
            <motion.div
              key={i}
              variants={cardAnim}
              className="col-span-12 xl:col-span-4 rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)", minHeight: 180 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{spec.icon}</span>
                <h3 className="font-syne font-bold text-base text-white">{spec.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", borderColor: "rgba(139,92,246,0.25)" }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Carousel */}
      <ProjectCarousel />

      <div className="container mx-auto">
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://github.com/jancykoud"
            target="_blank"
            className="font-inter flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
          >
            Voir plus sur GitHub →
          </Link>
          <Link
            href="https://gitlab.com/fridelinbanga"
            target="_blank"
            className="font-inter flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
          >
            Voir plus sur GitLab
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
