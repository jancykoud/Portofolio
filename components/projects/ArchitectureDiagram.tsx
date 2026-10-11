"use client";

import { useId, useState } from "react";
import { Boxes, Cpu, Database, FileCheck2, Server, Users } from "lucide-react";
import type { ArchitectureNode, Project } from "@/content/types";
import { cn } from "@/lib/utils";

const KIND = {
  actor: { icon: Users, label: "Acteur" },
  app: { icon: Boxes, label: "Application" },
  service: { icon: Server, label: "Service" },
  data: { icon: Database, label: "Données" },
  standard: { icon: FileCheck2, label: "Standard" },
  device: { icon: Cpu, label: "Terrain" },
} as const;

const COLS = 4;
const ROWS = 3;
const pos = (n: ArchitectureNode) => ({ x: ((n.col - 0.5) / COLS) * 400, y: ((n.row - 0.5) / ROWS) * 300 });

export function ArchitectureDiagram({
  architecture,
  compact,
}: {
  architecture: NonNullable<Project["architecture"]>;
  compact?: boolean;
}) {
  const { nodes, edges, note } = architecture;
  const [selected, setSelected] = useState<string>(nodes.find((n) => n.kind === "app")?.id ?? nodes[0]!.id);
  const detailId = useId();
  const current = nodes.find((n) => n.id === selected)!;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const connected = new Set(edges.flatMap((e) => (e.from === selected || e.to === selected ? [e.from, e.to] : [])));

  return (
    <figure className="h-full">
      <div className="relative hidden rounded-[var(--radius-lg)] border border-line bg-bg/60 sm:block">
        <div className="tech-grid absolute inset-0 rounded-[var(--radius-lg)] opacity-50" aria-hidden />
        <div className={cn("relative", compact ? "aspect-[4/3.1]" : "aspect-[4/2.6]")}>
          <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
            {edges.map((e) => {
              const a = pos(byId[e.from]!);
              const b = pos(byId[e.to]!);
              const active = e.from === selected || e.to === selected;
              return (
                <line
                  key={`${e.from}-${e.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  vectorEffect="non-scaling-stroke"
                  stroke={active ? "var(--accent-fg)" : "var(--line-strong)"}
                  strokeWidth={active ? 1.6 : 1}
                  strokeDasharray={active ? "6 6" : undefined}
                  className={active ? "[animation:dash-flow_1.2s_linear_infinite]" : undefined}
                />
              );
            })}
          </svg>
          {nodes.map((n) => {
            const { icon: Icon } = KIND[n.kind];
            const p = pos(n);
            const isSel = n.id === selected;
            const isLinked = connected.has(n.id);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelected(n.id)}
                aria-pressed={isSel}
                aria-controls={detailId}
                className={cn(
                  "absolute flex max-w-[24%] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-2.5 py-2 text-left text-[0.72rem] leading-tight font-medium transition-[background-color,border-color,color,box-shadow] duration-300 lg:px-3 lg:text-xs",
                  isSel
                    ? "border-accent bg-accent text-accent-ink shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)]"
                    : isLinked
                      ? "border-accent-fg bg-surface text-fg"
                      : "border-line-strong bg-surface text-muted hover:text-fg",
                )}
                style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 300) * 100}%` }}
              >
                <Icon className="size-3.5 shrink-0" aria-hidden />
                <span>{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: the same information as an accessible list */}
      <ol className="space-y-2 sm:hidden">
        {nodes.map((n) => {
          const { icon: Icon, label } = KIND[n.kind];
          const outgoing = edges.filter((e) => e.from === n.id);
          return (
            <li key={n.id} className="rounded-[var(--radius)] border border-line bg-surface p-4">
              <p className="flex items-center gap-2 font-medium">
                <Icon className="size-4 text-accent-fg" aria-hidden /> {n.label}
                <span className="meta ml-auto text-[0.62rem] text-muted">{label}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{n.detail}</p>
              {outgoing.length > 0 && (
                <p className="mt-2 font-mono text-xs text-accent-fg">
                  {outgoing.map((e) => `→ ${e.label} : ${byId[e.to]!.label}`).join(" · ")}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div id={detailId} aria-live="polite" className="mt-4 hidden min-h-28 rounded-[var(--radius)] border border-line bg-surface-2/60 p-4 sm:block">
        <p className="meta text-accent-fg">{KIND[current.kind].label}</p>
        <p className="mt-1.5 font-semibold">{current.label}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{current.detail}</p>
        <p className="mt-2 font-mono text-xs text-muted">
          {edges
            .filter((e) => e.from === selected || e.to === selected)
            .map((e) => (e.from === selected ? `→ ${e.label} : ${byId[e.to]!.label}` : `← ${byId[e.from]!.label} ${e.label}`))
            .join("   ")}
        </p>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        <span className="hidden sm:inline">Sélectionnez un élément pour afficher son rôle. </span>
        {note}
      </figcaption>
    </figure>
  );
}
