"use client";

import { cn } from "@/lib/utils";

export function Orb({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex shrink-0 items-center justify-center rounded-full", className)}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 32% 28%, color-mix(in srgb, var(--atmo-2) 70%, white) 0%, var(--atmo-1) 45%, color-mix(in srgb, var(--atmo-1) 35%, black) 100%)",
        boxShadow: "0 0 0 1px color-mix(in srgb, var(--atmo-1) 50%, transparent), 0 0 40px -6px var(--atmo-1)",
        animation: "orb-breathe 5s ease-in-out infinite",
      }}
    >
      <span className="flex gap-[18%]" style={{ width: "40%" }}>
        <span className="aspect-[1/1.4] flex-1 rounded-full bg-white/90" />
        <span className="aspect-[1/1.4] flex-1 rounded-full bg-white/90" />
      </span>
    </span>
  );
}

/** Other components can open the assistant with an optional question. */
export function openKoudAI(question?: string) {
  window.dispatchEvent(new CustomEvent("koud-ai:open", { detail: { question } }));
}

