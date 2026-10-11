import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Minimal browser chrome: three dots and, when public, the site's host. */
export function BrowserBar({ host, size = "md" }: { host?: string; size?: "sm" | "md" }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1.5 border-b border-line bg-surface",
        size === "sm" ? "h-6 px-2.5" : "h-9 px-4",
      )}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className={cn("rounded-full bg-line-strong", size === "sm" ? "size-1.5" : "size-2.5")} />
      ))}
      {host && size === "md" && (
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-surface-2 px-4 py-1 font-mono text-[0.7rem] text-muted">{host}</span>
      )}
    </div>
  );
}

/** Phone bezel; children fill the screen area. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] border-[5px] border-[color-mix(in_srgb,var(--fg)_85%,var(--bg))] bg-black shadow-[var(--shadow)]",
        className,
      )}
    >
      <span className="absolute top-1.5 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
      {children}
    </div>
  );
}

export function hostOf(project: { links: { href: string; kind: string }[] }) {
  const live = project.links.find((l) => l.kind === "live" || l.kind === "demo");
  if (!live) return undefined;
  try {
    return new URL(live.href).host;
  } catch {
    return undefined;
  }
}
