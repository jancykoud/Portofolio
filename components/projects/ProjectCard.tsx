import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index, large }: { project: Project; index?: number; large?: boolean }) {
  return (
    <article className={cn("group relative flex h-full flex-col", large && "md:col-span-2")}>
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line">
        <ProjectCover
          project={project}
          className={large ? "aspect-[16/9]" : "aspect-[16/11]"}
          sizes={large ? "(min-width: 768px) 66vw, 100vw" : undefined}
        />
        <span className="glass absolute top-3 left-3 rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] tracking-wider uppercase">
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <div className="mt-5 flex flex-1 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="meta text-muted">
            {index !== undefined && <span className="mr-2 text-accent-fg">{String(index + 1).padStart(2, "0")}</span>}
            {project.year || CATEGORY_LABELS[project.categories[0]!]}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
            <Link href={`/projets/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">{project.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.slice(0, large ? 6 : 3).map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <span
          className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-ink"
          aria-hidden
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
