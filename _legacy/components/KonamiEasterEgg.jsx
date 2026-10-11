"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiEasterEgg() {
  const [show, setShow] = useState(false);
  const [seq, setSeq] = useState([]);

  useEffect(() => {
    const onKey = (e) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          fire();
          setShow(true);
          setTimeout(() => setShow(false), 4000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function fire() {
    const colors = ["#8b5cf6", "#0a0a0a", "#f7f5f1", "#c4b5fd", "#ddd6fe"];
    confetti({ particleCount: 120, spread: 80, colors, origin: { y: 0.5 } });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors }), 300);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors }), 400);
  }

  if (!show) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
      style={{ background: "#0a0a0a", border: "0.5px solid rgba(255,255,255,0.12)", maxWidth: 360 }}
    >
      <span style={{ fontSize: 20 }}>🎉</span>
      <div>
        <p className="font-syne font-bold text-white" style={{ fontSize: 13 }}>
          Tu connais le Konami Code —
        </p>
        <p className="font-inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
          t'as l'œil ! Jancy recrute des curieux.
        </p>
      </div>
    </div>
  );
}
