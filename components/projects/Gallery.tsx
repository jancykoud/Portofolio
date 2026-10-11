"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Screen } from "@/content/types";
import { cn } from "@/lib/utils";

const DEVICE_LABEL: Record<Screen["device"], string> = { desktop: "Desktop", tablet: "Tablette", mobile: "Mobile" };

export function Gallery({ screens, projectName }: { screens: Screen[]; projectName: string }) {
  const devices = useMemo(() => (["desktop", "tablet", "mobile"] as const).filter((d) => screens.some((s) => s.device === d)), [screens]);
  const [device, setDevice] = useState<Screen["device"]>(devices[0] ?? "desktop");
  const list = screens.filter((s) => s.device === device);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const current = list[Math.min(index, list.length - 1)]!;
  const stripRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    setZoom(false);
    setIndex((i) => (i + dir + list.length) % list.length);
  }, [list.length]);

  useEffect(() => setIndex(0), [device]);

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (strip && thumb) strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  const isMobile = current.device === "mobile";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {devices.length > 1 ? (
          <div role="group" aria-label="Type d'écran" className="inline-flex rounded-full border border-line bg-surface p-1">
            {devices.map((d) => (
              <button
                key={d}
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
                className={cn("min-h-10 rounded-full px-4 text-sm transition-colors", device === d ? "bg-fg text-bg" : "text-muted hover:text-fg")}
              >
                {DEVICE_LABEL[d]}
              </button>
            ))}
          </div>
        ) : (
          <p className="meta text-muted">{DEVICE_LABEL[device]}</p>
        )}
        <p className="font-mono text-sm text-muted" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
        </p>
      </div>

      <div
        className="group relative mt-5 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 focus-within:outline-none"
        role="region"
        aria-roledescription="carrousel"
        aria-label={`Interfaces de ${projectName}`}
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div className={cn("relative", isMobile ? "aspect-[3/4] sm:aspect-[4/3]" : "aspect-[16/9]")}>
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className={cn("animate-[rise-in_500ms_var(--ease-out-expo)]", isMobile ? "object-contain p-4" : "object-cover object-top")}
          />
        </div>
        {list.length > 1 && (
          <>
            <button onClick={() => go(-1)} className="glass absolute top-1/2 left-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong" aria-label="Écran précédent">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button onClick={() => go(1)} className="glass absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong" aria-label="Écran suivant">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}
        <button
          onClick={() => setOpen(true)}
          className="glass absolute right-3 bottom-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm"
        >
          <Expand className="size-4" aria-hidden /> Plein écran
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">{current.caption}</p>

      {list.length > 1 && (
        <div ref={stripRef} className="relative mt-5 flex gap-3 overflow-x-auto pb-2" aria-label="Miniatures">
          {list.map((s, i) => (
            <button
              key={s.src}
              data-i={i}
              onClick={() => setIndex(i)}
              aria-label={`Afficher : ${s.caption}`}
              aria-current={i === index}
              className={cn(
                "relative h-20 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border transition-[border-color,opacity]",
                s.device === "mobile" ? "w-12" : "w-32",
                i === index ? "border-accent opacity-100" : "border-line opacity-60 hover:opacity-100",
              )}
            >
              <Image src={s.src} alt="" fill sizes="128px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <Dialog.Root open={open} onOpenChange={(o) => { setOpen(o); setZoom(false); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/90" />
          <Dialog.Content className="fixed inset-0 z-[95] flex flex-col text-white outline-none" onKeyDown={onKey}>
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
              <Dialog.Title className="truncate text-sm">
                {projectName} — {String(index + 1).padStart(2, "0")}/{String(list.length).padStart(2, "0")}
              </Dialog.Title>
              <div className="flex gap-2">
                <button onClick={() => setZoom((z) => !z)} className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label={zoom ? "Dézoomer" : "Zoomer"} aria-pressed={zoom}>
                  {zoom ? <ZoomOut className="size-5" aria-hidden /> : <ZoomIn className="size-5" aria-hidden />}
                </button>
                <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Fermer">
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </div>
            </div>
            <div className={cn("relative flex-1", zoom ? "overflow-auto" : "overflow-hidden")}>
              {zoom ? (
                // Native size for real zoom; the container scrolls to pan.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.alt} width={current.width} height={current.height} className="max-w-none" />
              ) : (
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain p-2 sm:p-8" />
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
              <button onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Écran précédent" disabled={list.length < 2}>
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <Dialog.Description className="text-center text-sm text-white/80">{current.caption}</Dialog.Description>
              <button onClick={() => go(1)} className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Écran suivant" disabled={list.length < 2}>
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
