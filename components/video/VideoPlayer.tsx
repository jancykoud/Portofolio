"use client";

import { useRef, useState } from "react";
import { Clapperboard } from "lucide-react";
import type { VideoSource } from "@/content/video";
import { cn } from "@/lib/utils";

type Chapter = { time: string; title: string };

const toSeconds = (t: string) => t.split(":").reduce((acc, n) => acc * 60 + Number(n), 0);

/**
 * Accessible player: native controls, captions (FR/EN), no autoplay, lazy
 * loading (preload="none"). Without a source it renders an explicit
 * "in production" state instead of a fake player.
 */
export function VideoPlayer({ source, chapters }: { source: VideoSource | null; chapters: readonly Chapter[] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);

  if (!source) {
    return (
      <div className="relative isolate flex aspect-video flex-col items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface p-6 text-center">
        <div className="atmosphere absolute inset-0 -z-10" aria-hidden />
        <div className="tech-grid absolute inset-0 -z-10 opacity-40" aria-hidden />
        <Clapperboard className="size-8 text-accent-fg" aria-hidden />
        <p className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">Vidéo en préparation</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Le tournage n'a pas encore eu lieu. Le lecteur est prêt (sous-titres FR/EN, chapitres, chargement différé) ; le storyboard ci-dessous décrit le film prévu.
        </p>
      </div>
    );
  }

  return (
    <div>
      <video
        ref={ref}
        controls
        preload="none"
        playsInline
        poster={source.poster}
        className="aspect-video w-full rounded-[var(--radius-lg)] border border-line bg-black"
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          const idx = chapters.findLastIndex((c) => toSeconds(c.time) <= t);
          if (idx !== current) setCurrent(Math.max(0, idx));
        }}
      >
        {source.webm && <source src={source.webm} type="video/webm" />}
        <source src={source.mp4} type="video/mp4" />
        {source.captions.map((c, i) => (
          <track key={c.lang} kind="subtitles" srcLang={c.lang} label={c.label} src={c.src} default={i === 0} />
        ))}
        Votre navigateur ne lit pas la vidéo. <a href={source.mp4}>Télécharger la vidéo</a>.
      </video>
      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" aria-label="Chapitres">
        {chapters.map((c, i) => (
          <li key={c.time}>
            <button
              onClick={() => {
                const v = ref.current;
                if (!v) return;
                v.currentTime = toSeconds(c.time);
                void v.play();
              }}
              aria-current={current === i}
              className={cn(
                "w-full rounded-[var(--radius)] border p-3 text-left text-sm transition-colors",
                current === i ? "border-accent" : "border-line hover:border-line-strong",
              )}
            >
              <span className="block font-mono text-xs text-muted">{c.time}</span>
              {c.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
