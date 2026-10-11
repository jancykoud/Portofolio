"use client";

import { useMode } from "./ModeContext";

export default function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div
      className="flex items-center rounded-full p-0.5 gap-0.5"
      style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)" }}
    >
      <button
        onClick={() => setMode("recruiter")}
        className="font-inter text-[10px] px-3 py-1 rounded-full transition-all duration-200"
        style={
          mode === "recruiter"
            ? { background: "#ffffff", color: "#0a0a0a" }
            : { background: "transparent", color: "rgba(255,255,255,0.4)" }
        }
      >
        👔 Recruteur
      </button>
      <button
        onClick={() => setMode("freelance")}
        className="font-inter text-[10px] px-3 py-1 rounded-full transition-all duration-200"
        style={
          mode === "freelance"
            ? { background: "#8b5cf6", color: "#fff" }
            : { background: "transparent", color: "rgba(255,255,255,0.4)" }
        }
      >
        💼 Freelance
      </button>
    </div>
  );
}
