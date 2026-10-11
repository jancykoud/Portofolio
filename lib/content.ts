import { PROJECTS, CATEGORY_LABELS } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";

export const publishedProjects: Project[] = PROJECTS.filter((p) => !p.draft);

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  return publishedProjects[(i + 1) % publishedProjects.length]!;
}

/** Filters shown in the showroom: only categories that have at least one project. */
export function getProjectFilters() {
  const counts = new Map<ProjectCategory, number>();
  for (const p of publishedProjects) for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return (Object.keys(CATEGORY_LABELS) as ProjectCategory[])
    .filter((c) => counts.has(c))
    .map((c) => ({ id: c, label: CATEGORY_LABELS[c], count: counts.get(c)! }));
}
