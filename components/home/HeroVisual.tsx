"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery, useRootFlags } from "@/lib/hooks";
import { SITE } from "@/content/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Static, server-renderable twin of the WebGL globe (lite mode, mobile, reduced motion, no JS). */
export function StaticGlobe() {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const n = 520;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.35;
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rr = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * rr;
    const z = Math.sin(th) * rr;
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    if (z2 < -0.15) continue;
    dots.push({ x: 50 + x * 40, y: 50 + y2 * 40, r: i % 17 === 0 ? 0.55 : 0.32, o: 0.25 + ((z2 + 0.15) / 1.15) * 0.75 });
  }
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto size-full" aria-hidden>
      <ellipse cx="50" cy="50" rx="47" ry="14" fill="none" stroke="var(--atmo-1)" strokeOpacity="0.3" strokeWidth="0.15" transform="rotate(-18 50 50)" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r={d.r} fill={i % 17 === 0 ? "var(--accent-fg)" : "var(--atmo-1)"} opacity={d.o.toFixed(2)} />
      ))}
    </svg>
  );
}

export function HeroVisual() {
  const { lite, reducedMotion } = useRootFlags();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    // Start WebGL only once the page is interactive.
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const id = ric(() => setIdle(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);
  const webgl = idle && desktop && !lite && !reducedMotion && !unsupported;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      <div className="absolute inset-[-8%]" data-scene={webgl ? "webgl" : "static"}>
        {webgl ? <HeroScene onUnsupported={onUnsupported} /> : <StaticGlobe />}
      </div>

      {/* Portrait — background removed from the original photo, framed by the globe. */}
      <div className="absolute inset-x-[8%] bottom-0 top-[4%]">
        <div
          className="absolute inset-[6%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--atmo-1) 45%, transparent), transparent 70%)" }}
          aria-hidden
        />
        <Image
          src="/images/portrait-cutout.png"
          alt={SITE.portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 420px, 70vw"
          className="object-contain object-bottom [mask-image:radial-gradient(ellipse_48%_60%_at_50%_40%,black_62%,transparent_100%)]"
        />
      </div>
    </div>
  );
}
