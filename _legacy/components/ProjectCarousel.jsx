"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ── Données projets ────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "FROST-FORMS",
    tag: "Confidentiel · ANR TERRA FORMA",
    description:
      "Portail IoT environnemental solo — wizard multi-étapes, 53 capteurs LoRaWAN, conformité OGC SensorThings.",
    stack: ["React 18", "TypeScript", "PostgreSQL", "Docker"],
    footer: "CNRS · INRAE · IRD · UCA",
    link: null,
    style: {
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1035 100%)",
      tagBg: "rgba(139,92,246,0.2)",
      tagColor: "#a78bfa",
      tagBorder: "rgba(139,92,246,0.3)",
      chipBg: "rgba(139,92,246,0.12)",
      chipColor: "#c4b5fd",
      chipBorder: "rgba(139,92,246,0.25)",
      footerColor: "rgba(255,255,255,0.25)",
    },
  },
  {
    id: 2,
    title: "Wmbia",
    tag: "IA · Bible · Qdrant",
    description:
      "Moteur de recherche sémantique de citations religieuses. Indexation vectorielle Qdrant, interface React moderne.",
    stack: ["React", "Python", "Qdrant", "FastAPI"],
    footer: "wmbia.com · En ligne",
    link: "https://wmbia.com",
    cta: "Voir le projet →",
    style: {
      background: "#0a0a0a",
      patternOpacity: 0.03,
      tagBg: "rgba(251,191,36,0.15)",
      tagColor: "#fbbf24",
      tagBorder: "rgba(251,191,36,0.3)",
      chipBg: "rgba(251,191,36,0.08)",
      chipColor: "#fbbf24",
      chipBorder: "rgba(251,191,36,0.2)",
      ctaBg: "#c9982a",
      ctaColor: "#0a0a0a",
      footerColor: "#22c55e",
    },
  },
  {
    id: 3,
    title: "Orient'Ex",
    tag: "Mentorat éducatif",
    description:
      "Plateforme de mise en relation mentors / étudiants. CI/CD GitLab, Docker. Architecture modulaire, en production.",
    stack: ["Nuxt.js", "MySQL", "Docker", "GitLab CI/CD"],
    footer: "orient-ex.org · En ligne",
    link: "https://orient-ex.org",
    cta: "Voir le projet →",
    style: {
      background: "linear-gradient(135deg, #0a1f0f 0%, #0d2b15 100%)",
      tagBg: "rgba(34,197,94,0.15)",
      tagColor: "#4ade80",
      tagBorder: "rgba(34,197,94,0.3)",
      chipBg: "rgba(34,197,94,0.08)",
      chipColor: "#4ade80",
      chipBorder: "rgba(34,197,94,0.2)",
      ctaBg: "#16a34a",
      ctaColor: "#ffffff",
      footerColor: "#22c55e",
    },
  },
  {
    id: 4,
    title: "Akili",
    tag: "SaaS · Marché africain · PWA",
    description:
      "Gestion scolaire multi-établissements. Offline-first, Mobile Money XOF, push FCM, 5 rôles, WebSockets.",
    stack: ["React", "Node.js", "Redis", "Turborepo"],
    footer: "Lancement sept. 2026",
    link: null,
    badge: "En cours",
    style: {
      background: "#1a0f00",
      tagBg: "rgba(251,146,60,0.15)",
      tagColor: "#fb923c",
      tagBorder: "rgba(251,146,60,0.3)",
      chipBg: "rgba(251,146,60,0.08)",
      chipColor: "#fb923c",
      chipBorder: "rgba(251,146,60,0.2)",
      badgeBg: "rgba(251,191,36,0.15)",
      badgeColor: "#fbbf24",
      footerColor: "#f59e0b",
    },
  },
  {
    id: 5,
    title: "Tash-Cash Agency",
    tag: "Freelance · Yaoundé, Cameroun",
    description:
      "Site trilingue FR/EN/ES pour agence panafricaine. SEO multilingue, performances Core Web Vitals optimisées.",
    stack: ["Next.js 15", "NestJS", "Supabase"],
    footer: "Trilingue FR / EN / ES",
    link: null,
    extraBadge: "FR/EN/ES",
    style: {
      background: "#0d1b3e",
      tagBg: "rgba(201,152,42,0.15)",
      tagColor: "#c9982a",
      tagBorder: "rgba(201,152,42,0.3)",
      chipBg: "rgba(201,152,42,0.08)",
      chipColor: "#c9982a",
      chipBorder: "rgba(201,152,42,0.2)",
      footerColor: "#c9982a",
    },
  },
];

// ── Chip ───────────────────────────────────────────────────────────────────
const Chip = ({ label, style }) => (
  <span
    className="font-inter whitespace-nowrap shrink-0"
    style={{
      fontSize: 10,
      padding: "3px 10px",
      borderRadius: 100,
      border: "0.5px solid",
      ...style,
    }}
  >
    {label}
  </span>
);

// ── Carte projet ───────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const s = project.style;

  return (
    <div
      className="relative flex-none flex flex-col overflow-hidden"
      style={{
        width: 340,
        height: 220,
        borderRadius: 12,
        background: s.background,
        flexShrink: 0,
      }}
    >
      {/* Motif de points pour Wmbia */}
      {s.patternOpacity && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            opacity: s.patternOpacity * 10,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full p-5 gap-3">
        {/* Tag */}
        <div className="flex items-center justify-between">
          <span
            className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: s.tagBg,
              color: s.tagColor,
              border: `0.5px solid ${s.tagBorder}`,
            }}
          >
            {project.tag}
          </span>
          {project.badge && (
            <span
              className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: s.badgeBg,
                color: s.badgeColor,
                border: `0.5px solid ${s.badgeBorder || s.badgeBg}`,
              }}
            >
              {project.badge}
            </span>
          )}
          {project.extraBadge && (
            <span
              className="font-inter text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: s.tagBg,
                color: s.tagColor,
                border: `0.5px solid ${s.tagBorder}`,
              }}
            >
              {project.extraBadge}
            </span>
          )}
        </div>

        {/* Titre */}
        <h3
          className="font-syne font-bold text-white leading-tight"
          style={{ fontSize: 18 }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="font-inter leading-snug flex-1"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", overflow: "hidden" }}
        >
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              style={{
                background: s.chipBg,
                color: s.chipColor,
                borderColor: s.chipBorder,
              }}
            />
          ))}
        </div>

        {/* Footer : status + CTA optionnel */}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          <span className="font-inter text-[10px]" style={{ color: s.footerColor }}>
            {project.footer}
          </span>
          {project.link && project.cta && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[10px] font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
              style={{
                background: s.ctaBg || "rgba(255,255,255,0.1)",
                color: s.ctaColor || "#ffffff",
              }}
            >
              {project.cta}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Bouton navigation ──────────────────────────────────────────────────────
const NavBtn = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center transition-all"
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: disabled ? "rgba(10,10,10,0.25)" : "#0a0a0a",
      color: "#ffffff",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      flexShrink: 0,
      opacity: disabled ? 0.35 : 1,
    }}
  >
    {children}
  </button>
);

// ── Icônes chevron ─────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Composant principal ────────────────────────────────────────────────────
const ProjectCarousel = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Autoplay plugin avec pause au hover
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Progression : index / (total - 1)
  const progress =
    scrollSnaps.length > 1 ? selectedIndex / (scrollSnaps.length - 1) : 0;

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-14"
    >
      {/* ── En-tête ── */}
      <div className="container mx-auto mb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-muted mb-2">
              — Aperçu des projets
            </p>
            <h2
              className="font-syne font-black text-[28px] xl:text-[36px] text-primary-dark leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tous les projets
            </h2>
          </div>

          {/* Flèches nav */}
          <div className="flex gap-2 shrink-0">
            <NavBtn onClick={scrollPrev} disabled={prevBtnDisabled}>
              <ChevronLeft />
            </NavBtn>
            <NavBtn onClick={scrollNext} disabled={nextBtnDisabled}>
              <ChevronRight />
            </NavBtn>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
        style={{ paddingLeft: "max(15px, calc((100vw - 1200px) / 2 + 15px))" }}
      >
        <div className="flex" style={{ gap: 12 }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* ── Barre de progression ── */}
      <div className="container mx-auto mt-6">
        <div
          className="relative rounded-full overflow-hidden"
          style={{ height: 2, background: "#e5e0d8" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: "#8b5cf6" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Compteur de slides */}
        <div className="flex justify-between mt-2">
          <span className="font-inter text-[10px] text-muted">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="font-inter text-[10px] text-muted">
            Glissez pour explorer →
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectCarousel;
