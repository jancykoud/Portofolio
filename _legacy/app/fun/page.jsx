"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import photos from "@/content/fun.json";

// ── Config masonry ──────────────────────────────────────────────────────────
const BREAKPOINTS = {
  default: 3,
  1024: 2,
  640: 1,
};

// ── Catégories ──────────────────────────────────────────────────────────────
const CATEGORIES = ["Tout", "Voyages", "Nature", "Rencontres", "Découvertes"];

// ── Animation ───────────────────────────────────────────────────────────────
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.07 },
  }),
};

// ── Composant photo ─────────────────────────────────────────────────────────
const PhotoCard = ({ photo, index, onClick }) => (
  <motion.div
    custom={index}
    variants={cardVariant}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
    onClick={onClick}
    className="relative group cursor-pointer overflow-hidden"
    style={{ borderRadius: 10 }}
  >
    <div className="relative w-full" style={{ aspectRatio: "auto" }}>
      <Image
        src={photo.src}
        alt={photo.caption}
        width={800}
        height={600}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        unoptimized={photo.src.endsWith(".svg")}
      />
    </div>

    {/* Overlay au hover */}
    <div
      className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
    >
      <p className="font-syne font-bold text-white text-sm leading-tight">
        {photo.caption}
      </p>
      <p className="font-inter text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
        {photo.location}
      </p>
    </div>

    {/* Badge catégorie */}
    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span
        className="font-inter text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(139,92,246,0.85)",
          color: "#fff",
        }}
      >
        {photo.category}
      </span>
    </div>
  </motion.div>
);

// ── Page principale ─────────────────────────────────────────────────────────
export default function Fun() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    activeCategory === "Tout"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const slides = photos.map((p) => ({
    src: p.src,
    alt: p.caption,
    title: p.caption,
    description: p.location,
  }));

  const openLightbox = useCallback(
    (photo) => {
      const globalIndex = photos.findIndex((p) => p.src === photo.src);
      setLightboxIndex(globalIndex);
    },
    []
  );

  return (
    <section
      className="min-h-screen"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Header ── */}
      <div className="container mx-auto pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-inter text-[9px] uppercase tracking-[0.22em] mb-4"
             style={{ color: "rgba(255,255,255,0.3)" }}>
            — Hors clavier
          </p>
          <h1
            className="font-syne font-black text-white leading-tight mb-2"
            style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.025em" }}
          >
            Hors du code.
          </h1>
          <p className="font-inter" style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
            Voyages · Découvertes · Moments
          </p>
        </motion.div>

        {/* ── Filtres ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-inter text-[12px] font-medium px-4 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: isActive ? "#8b5cf6" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                  border: isActive
                    ? "0.5px solid #8b5cf6"
                    : "0.5px solid rgba(255,255,255,0.15)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Galerie masonry ── */}
      <div className="container mx-auto pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-inter" style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
              Aucune photo dans cette catégorie pour l&apos;instant.
            </p>
          </div>
        ) : (
          <Masonry
            breakpointCols={BREAKPOINTS}
            className="masonry-grid"
            columnClassName="masonry-grid-col"
          >
            {filtered.map((photo, i) => (
              <PhotoCard
                key={photo.src}
                photo={photo}
                index={i}
                onClick={() => openLightbox(photo)}
              />
            ))}
          </Masonry>
        )}
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        slides={slides}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </section>
  );
}
