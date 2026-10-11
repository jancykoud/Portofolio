"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { StaticGlobe } from "@/components/home/HeroVisual";
import { useRootFlags } from "@/lib/hooks";
import { useDict } from "@/lib/i18n/client";

const HeroScene = dynamic(() => import("@/components/home/HeroScene"), { ssr: false });

export function GlobeLab() {
  const { lite, reducedMotion } = useRootFlags();
  const t = useDict().lab;
  const [count, setCount] = useState(2600);
  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);
  const webgl = !lite && !reducedMotion && !unsupported;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-line bg-bg">
        <div className="tech-grid absolute inset-0 opacity-40" aria-hidden />
        {webgl ? <HeroScene count={count} onUnsupported={onUnsupported} /> : <StaticGlobe />}
      </div>
      <div className="flex flex-col justify-center">
        {webgl ? (
          <>
            <label htmlFor="density" className="text-sm font-medium">
              {t.density} <span className="font-mono">{count.toLocaleString()}</span> {t.points}
            </label>
            <input
              id="density"
              type="range"
              min={400}
              max={8000}
              step={200}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--accent)]"
            />
          </>
        ) : (
          <p className="rounded-[var(--radius)] border border-line p-4 text-sm text-muted">
            {unsupported ? t.staticNoGpu : t.staticPrefs}
          </p>
        )}
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
          {t.notes.map(([title, body]) => (
            <li key={title}>
              <strong className="font-medium text-fg">{title}</strong> — {body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
