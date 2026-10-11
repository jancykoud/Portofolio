"use client";

import { useState } from "react";
import { Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import type { Experience } from "@/content/types";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n/client";

type Filter = "all" | "work" | "education";

export function Timeline({ items }: { items: Experience[] }) {
  const t = useDict().about;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(items[0]?.title ?? null);
  const visible = items.filter((i) => filter === "all" || i.kind === filter);

  return (
    <div>
      <div role="group" aria-label={t.filterTimeline} className="inline-flex rounded-full border border-line bg-surface p-1">
        {(
          [
            ["all", t.all],
            ["work", t.work],
            ["education", t.education],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={cn("min-h-10 rounded-full px-4 text-sm transition-colors", filter === id ? "bg-fg text-bg" : "text-muted hover:text-fg")}
          >
            {label}
          </button>
        ))}
      </div>

      <ol className="relative mt-10 border-l border-line pl-6 sm:pl-0 sm:border-l-0">
        {visible.map((item) => {
          const isOpen = open === item.title;
          const Icon = item.kind === "work" ? Briefcase : GraduationCap;
          const panelId = `tl-${item.start}`;
          return (
            <li key={item.title} className="relative grid gap-2 border-b border-line py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <span
                className={cn(
                  "absolute top-8 -left-[31px] size-2.5 rounded-full border-2 border-bg sm:hidden",
                  item.kind === "work" ? "bg-accent" : "bg-atmo-2",
                )}
                aria-hidden
              />
              <p className="meta pt-1 text-muted">{item.period}</p>
              <div>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.title)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-start justify-between gap-4 text-left"
                >
                  <span>
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <Icon className={cn("size-3.5", item.kind === "work" ? "text-accent-fg" : "text-muted")} aria-hidden />
                      {item.kind === "work" ? t.work : t.education}
                    </span>
                    <span className="mt-2 block text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-fg sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-muted">
                      {item.org}
                      {item.place && ` · ${item.place}`}
                    </span>
                  </span>
                  <ChevronDown className={cn("mt-8 size-5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")} aria-hidden />
                </button>
                <div id={panelId} hidden={!isOpen} className="mt-4">
                  <ul className="space-y-2">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-accent-fg" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {item.stack && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {item.stack.map((s) => (
                        <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
