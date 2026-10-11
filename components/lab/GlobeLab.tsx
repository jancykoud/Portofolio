"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { StaticGlobe } from "@/components/home/HeroVisual";
import { useRootFlags } from "@/lib/hooks";

const HeroScene = dynamic(() => import("@/components/home/HeroScene"), { ssr: false });

export function GlobeLab() {
  const { lite, reducedMotion } = useRootFlags();
  const [count, setCount] = useState(2600);
  const webgl = !lite && !reducedMotion;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-line bg-bg">
        <div className="tech-grid absolute inset-0 opacity-40" aria-hidden />
        {webgl ? <HeroScene count={count} /> : <StaticGlobe />}
      </div>
      <div className="flex flex-col justify-center">
        {webgl ? (
          <>
            <label htmlFor="density" className="text-sm font-medium">
              Densité : <span className="font-mono">{count.toLocaleString("fr-FR")}</span> points
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
            Version statique affichée : mode performance allégé ou animations réduites actifs. Modifiez-les dans le Theme Studio pour la version WebGL.
          </p>
        )}
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
          <li><strong className="font-medium text-fg">Distribution de Fibonacci</strong> — chaque point est placé sur la sphère par l'angle d'or : couverture homogène, sans pôles surchargés.</li>
          <li><strong className="font-medium text-fg">Shader sur mesure</strong> — taille, opacité selon la profondeur et pulsation des points « actifs » calculées sur le GPU.</li>
          <li><strong className="font-medium text-fg">Couleurs tokenisées</strong> — la scène lit les variables CSS du thème et se met à jour à chaque changement.</li>
          <li><strong className="font-medium text-fg">Sobriété</strong> — chargée à la demande, mise en pause hors écran et onglet masqué, désactivée en mode allégé.</li>
        </ul>
      </div>
    </div>
  );
}
