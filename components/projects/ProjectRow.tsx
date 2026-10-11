import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { ProjectCover } from "./ProjectCover";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href, type Locale } from "@/lib/i18n/routing";

/** Compact entry for secondary projects: thumbnail, name, one line, status. */
export function ProjectRow({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDictionary(locale).projects;
  return (
    <article className="group relative grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 border-b border-line py-4 sm:grid-cols-[8rem_1fr_auto_auto] sm:gap-6">
      <div className="overflow-hidden rounded-[var(--radius-sm)] border border-line">
        <ProjectCover project={project} compact className="aspect-[16/10]" sizes="128px" />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-fg sm:text-xl">
          <Link href={href(locale, `/projets/${project.slug}`)} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <p className="hidden text-right font-mono text-xs leading-relaxed text-muted sm:block">
        {t.status[project.status]}
        {project.year && (
          <>
            <br />
            {project.year}
          </>
        )}
      </p>
      <span
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-ink"
        aria-hidden
      >
        <ArrowUpRight className="size-4" />
      </span>
    </article>
  );
}
