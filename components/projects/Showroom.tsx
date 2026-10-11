"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import type { Project, ProjectCategory } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import { useRootFlags } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useDict, useLocale } from "@/lib/i18n/client";

type Filter = { id: ProjectCategory; label: string; count: number };

const urlListeners = new Set<() => void>();
function subscribeUrl(cb: () => void) {
  urlListeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    urlListeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
}
const readFilterParam = () => new URLSearchParams(window.location.search).get("filtre");

export function Showroom({ projects, filters }: { projects: Project[]; filters: Filter[] }) {
  const { reducedMotion } = useRootFlags();
  const locale = useLocale();
  const t = useDict().projects;
  // The URL is the source of truth for the filter (shareable: /projets?filtre=ai-data).
  const param = useSyncExternalStore(subscribeUrl, readFilterParam, () => null);
  const active: ProjectCategory | "all" = param && filters.some((f) => f.id === param) ? (param as ProjectCategory) : "all";

  const choose = (id: ProjectCategory | "all") => {
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("filtre");
    else url.searchParams.set("filtre", id);
    window.history.replaceState(window.history.state, "", url);
    urlListeners.forEach((l) => l());
  };

  const visible = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div role="group" aria-label={t.filterLabel} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "all" as const, label: t.all, count: projects.length }, ...filters].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => choose(f.id)}
            aria-pressed={active === f.id}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
              active === f.id ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {f.label}
            <span className={cn("font-mono text-[0.7rem]", active === f.id ? "opacity-70" : "opacity-60")}>{f.count}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {t.shown(visible.length)}
      </p>

      <motion.ul layout={!reducedMotion} className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => {
            const large = active === "all" && p.featured;
            return (
              <motion.li
                key={p.slug}
                layout={!reducedMotion}
                initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={cn(large && "md:col-span-2")}
              >
                <ProjectCard project={p} index={i} large={large} headingLevel={2} locale={locale} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
