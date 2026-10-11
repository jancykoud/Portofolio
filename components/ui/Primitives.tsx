import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("meta text-accent-fg", className)}>{children}</p>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-muted", className)}>
      {children}
    </span>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[var(--radius-lg)] border border-line bg-surface", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <As className={As === "h1" ? "display-l" : "heading-2"}>{title}</As>
      {lead && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

export function StatusDot({ tone = "accent" }: { tone?: "accent" | "muted" | "warn" }) {
  const color = tone === "accent" ? "bg-success" : tone === "warn" ? "bg-[#f59e0b]" : "bg-muted";
  return (
    <span className="relative inline-flex size-2" aria-hidden>
      {tone === "accent" && <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", color)} />}
      <span className={cn("relative size-2 rounded-full", color)} />
    </span>
  );
}
