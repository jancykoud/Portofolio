"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const LINKS = [
  { label: "À propos", href: "/#about" },
  { label: "Projets",  href: "/#projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            x: "-50%",
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 100,
            padding: "8px 20px",
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            gap: 24,
            border: "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 14,
              fontWeight: 900,
              color: "#ffffff",
              textDecoration: "none",
              letterSpacing: "-0.5px",
            }}
          >
            JK
          </Link>

          <div
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,255,255,0.12)",
            }}
          />

          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
              }
            >
              {label}
            </Link>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
