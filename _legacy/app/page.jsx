"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Données projets ──────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "frost-forms",
    name: "FROST-FORMS",
    type: "Portail IoT environnemental",
    badge: { label: "Confidentiel", color: "#7c3aed", bg: "rgba(109,40,217,0.12)" },
    preview: { bg: "#13101f", text: "FROST-FORMS" },
    href: null,
  },
  {
    id: "wmbia",
    name: "Wmbia",
    type: "Recherche sémantique · Bible · IA",
    badge: { label: "En ligne", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
    preview: { bg: "#050e05", text: "Wmbia" },
    href: "https://wmbia.com",
  },
  {
    id: "akili",
    name: "Akili",
    type: "SaaS gestion scolaire · Afrique · PWA",
    badge: { label: "En cours", color: "#b45309", bg: "rgba(217,119,6,0.12)" },
    preview: { bg: "#1a0f00", text: "Akili" },
    href: null,
  },
  {
    id: "orient-ex",
    name: "Orient'Ex",
    type: "Mentorat éducatif · Nuxt.js · Docker",
    badge: { label: "En ligne", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
    preview: { bg: "#0a1f0f", text: "Orient'Ex" },
    href: "https://orient-ex.org",
  },
  {
    id: "tash-cash",
    name: "Tash-Cash Agency",
    type: "Site trilingue · Freelance · Yaoundé",
    badge: { label: "Freelance", color: "#92400e", bg: "rgba(202,138,4,0.12)" },
    preview: { bg: "#0d1b3e", text: "Tash-Cash" },
    href: null,
  },
];

const COLOR_BLOCKS = [
  {
    bg: "#6d28d9",
    label: "BLOG",
    title: "OGC · IoT · Qdrant · INSPIRE ↗",
    link: "Voir les articles",
    href: "/blog",
  },
  {
    bg: "#d97706",
    label: "APPRENTISSAGE",
    title: "Cisco NetAcad · 10 cours actifs ↗",
    link: "Voir la liste",
    href: "/learning",
  },
  {
    bg: "#15803d",
    label: "DÉTENTE",
    title: "Voyages · Découvertes · Moments ↗",
    link: "Explorer",
    href: "/fun",
  },
  {
    bg: "#0a0a0a",
    label: "CONTACT",
    title: "Parlons de votre projet. ✉ →",
    link: "Écrire",
    href: "/contact",
  },
];

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Home() {
  const { scrollY } = useScroll();
  const nameX = useTransform(scrollY, [0, 600], [0, -150]);

  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewY, setPreviewY] = useState(100);
  const projectsRef = useRef(null);

  const handleProjectsMouseMove = (e) => {
    if (projectsRef.current) {
      const rect = projectsRef.current.getBoundingClientRect();
      setPreviewY(e.clientY - rect.top);
    }
  };

  return (
    <main>

      {/* ══════════════════════════════════════════════════════════
          HERO — 100vh, fond crème + grille de points
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "#f2f0eb",
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Nom XXL avec parallax horizontal */}
        <motion.h1
          style={{
            x: nameX,
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(72px, 13vw, 156px)",
            fontWeight: 900,
            letterSpacing: "-4px",
            color: "#0a0a0a",
            lineHeight: 1,
            userSelect: "none",
            position: "relative",
            zIndex: 1,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          JANCY&nbsp;&nbsp;KOUD
        </motion.h1>

        {/* Photo — absolue, centrée, pill shape, devant le texte */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 0,
            width: 320,
            height: 420,
            borderRadius: "160px 160px 0 0",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <Image
            src="/images/profile.jpg"
            alt="Jancy KOUD BANGA"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>

        {/* Coin bas gauche — SCROLL DOWN */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#0a0a0a",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.55)",
            }}
          >
            DÉFILER
          </span>
        </div>

        {/* Coin bas droit — ©2026 */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            zIndex: 3,
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(0,0,0,0.35)",
          }}
        >
          ©2026
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT — fond noir, 2 colonnes
      ══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "#0a0a0a", padding: "96px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            À propos
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.68)",
              margin: 0,
            }}
          >
            Jancy est un ingénieur fullstack spécialisé dans les plateformes de
            données environnementales et scientifiques. Il conçoit des systèmes
            interopérables conformes aux standards OGC et INSPIRE, de l'IoT
            terrain jusqu'au portail web. Actuellement en poste sur le projet ANR
            TERRA FORMA (CNRS · INRAE · IRD · UCA) et ouvert aux missions
            freelance.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MARQUEE — fond noir, texte blanc défilant
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "#0a0a0a",
          borderTop: "0.5px solid rgba(255,255,255,0.05)",
          overflow: "hidden",
          padding: "18px 0",
        }}
      >
        <div className="marquee-track">
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 18,
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#ffffff",
                paddingRight: 48,
                whiteSpace: "nowrap",
              }}
            >
              SUPER FULLSTACK 🔥
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PROJETS — fond crème, liste avec hover preview
      ══════════════════════════════════════════════════════════ */}
      <section id="projects" style={{ background: "#f2f0eb", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* En-tête section */}
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 36,
              fontWeight: 800,
              color: "#0a0a0a",
              margin: 0,
            }}
          >
            ↳ Projets
          </h2>
          <div
            style={{
              height: 1,
              background: "rgba(0,0,0,0.12)",
              margin: "12px 0 32px",
            }}
          />

          {/* Métadonnées 4 colonnes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "10px 0",
              borderBottom: "0.5px solid rgba(0,0,0,0.1)",
            }}
          >
            {["Période", "Disciplines", "Stack", "Secteurs"].map((col) => (
              <span
                key={col}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 9,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(0,0,0,0.38)",
                }}
              >
                {col}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: "14px 0",
              borderBottom: "0.5px solid rgba(0,0,0,0.1)",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#0a0a0a",
              }}
            >
              2024 — présent
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#0a0a0a",
                lineHeight: 1.9,
              }}
            >
              Fullstack dev
              <br />
              SIG &amp; IoT
              <br />
              Architecture
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#0a0a0a",
                lineHeight: 1.9,
              }}
            >
              React · Node.js
              <br />
              PostgreSQL
              <br />
              Docker · CI/CD
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["#RECHERCHE", "#IOT", "#SAAS", "#ÉDUCATION"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "rgba(0,0,0,0.45)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Liste projets avec hover preview */}
          <div
            ref={projectsRef}
            style={{ position: "relative" }}
            onMouseMove={handleProjectsMouseMove}
          >
            {PROJECTS.map((project, idx) => (
              <ProjectRow
                key={project.id}
                project={project}
                isHovered={hoveredProject === idx}
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}

            {/* Preview flottant qui suit le curseur */}
            <AnimatePresence>
              {hoveredProject !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    right: 320,
                    top: previewY - 90,
                    width: 280,
                    height: 180,
                    borderRadius: 8,
                    overflow: "hidden",
                    zIndex: 10,
                    pointerEvents: "none",
                    background: PROJECTS[hoveredProject]?.preview.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.6)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {PROJECTS[hoveredProject]?.preview.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PREUVE SOCIALE — fond crème, logos texte
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#f2f0eb",
          padding: "72px 24px",
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(17px, 2.5vw, 26px)",
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            Projets réalisés avec des organisations de référence — Tout comme eux.
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "rgba(0,0,0,0.38)",
              marginBottom: 48,
            }}
          >
            Collaborations institutionnelles et industrielles
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px 52px",
            }}
          >
            {["CNRS", "INRAE", "IRD", "UCA", "Orange", "Cisco", "ANR"].map(
              (org) => (
                <span
                  key={org}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.28)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {org}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BLOCS COLORÉS — grille 2×2
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 8px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {COLOR_BLOCKS.map((block) => (
            <ColorBlock key={block.href} block={block} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER — heure locale + réseaux
      ══════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: "#f2f0eb",
          borderTop: "0.5px solid rgba(0,0,0,0.1)",
          padding: "28px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "#0a0a0a",
              margin: 0,
            }}
          >
            Fait avec ❤ depuis Clermont-Ferrand
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(0,0,0,0.38)",
              marginTop: 4,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {time
              ? time.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Europe/Paris",
                })
              : "—"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "GitHub", href: "https://github.com/jancykoud" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/jancykoudbanga",
            },
            { label: "GitLab", href: "https://gitlab.com/fridelinbanga" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(0,0,0,0.5)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.5)")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

// ─── Composant : ligne projet ─────────────────────────────────────────────────

function ProjectRow({ project, isHovered, onMouseEnter, onMouseLeave }) {
  const base = {
    fontFamily: "var(--font-inter)",
    textDecoration: "none",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 14px",
    borderRadius: 100,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  const btnStyle = {
    ...base,
    color: isHovered ? "#ffffff" : "#0a0a0a",
    border: `0.5px solid ${
      isHovered ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)"
    }`,
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 12px",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        background: isHovered ? "#0a0a0a" : "transparent",
        transition: "background 0.2s ease",
        gap: 16,
      }}
    >
      {/* Gauche */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: 14,
            color: isHovered ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
            transition: "color 0.2s ease",
            flexShrink: 0,
          }}
        >
          ◈
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 17,
              fontWeight: 700,
              color: isHovered ? "#ffffff" : "#0a0a0a",
              transition: "color 0.2s ease",
            }}
          >
            {project.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              color: isHovered ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)",
              transition: "color 0.2s ease",
            }}
          >
            — {project.type}
          </span>
        </div>
      </div>

      {/* Droite */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 9,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 100,
            background: project.badge.bg,
            color: project.badge.color,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: `0.5px solid ${project.badge.color}33`,
          }}
        >
          {project.badge.label}
        </span>

        {project.href ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer" style={btnStyle}>
            VOIR →
          </a>
        ) : (
          <Link href="/contact" style={btnStyle}>
            DEMANDER INFOS
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Composant : bloc coloré ──────────────────────────────────────────────────

function ColorBlock({ block }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={block.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: block.bg,
        minHeight: 148,
        padding: "20px 26px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 9,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {block.label}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(16px, 2vw, 22px)",
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.25,
          margin: "12px 0 10px",
        }}
      >
        {block.title}
      </h3>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.04em",
        }}
      >
        {block.link}
      </span>
    </Link>
  );
}
