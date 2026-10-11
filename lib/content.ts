import { PROJECTS } from "@/content/projects";
import { EXPERIENCE, COURSES, SKILL_GROUPS, PRINCIPLES } from "@/content/experience";
import { SERVICES } from "@/content/services";
import { STORYBOARD } from "@/content/video";
import { PROJECTS_EN } from "@/content/en/projects";
import { COURSE_CATEGORIES_EN, EXPERIENCE_EN, PRINCIPLES_EN, SERVICES_EN, SKILL_LABELS_EN, STORYBOARD_EN } from "@/content/en/other";
import type { Experience, Project, ProjectCategory, Service } from "@/content/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/routing";

const published = PROJECTS.filter((p) => !p.draft);

/** Overlays the English wording onto the French source; facts, stack and links stay shared. */
function translateProject(p: Project): Project {
  const t = PROJECTS_EN[p.slug];
  if (!t) return p;
  const { facts, screens, architecture, ...text } = t;
  return {
    ...p,
    ...text,
    facts: p.facts?.map((f, i) => ({ ...f, label: facts?.[i] ?? f.label })),
    screens: p.screens.map((s, i) => ({ ...s, ...(screens?.[i] ?? {}) })),
    architecture: p.architecture && {
      note: architecture?.note ?? p.architecture.note,
      nodes: p.architecture.nodes.map((n) => ({ ...n, ...(architecture?.nodes[n.id] ?? {}) })),
      edges: p.architecture.edges.map((e, i) => ({ ...e, label: architecture?.edges?.[i] ?? e.label })),
    },
  };
}

export function getProjects(locale: Locale): Project[] {
  return locale === "en" ? published.map(translateProject) : published;
}

export function getProject(locale: Locale, slug: string) {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getAdjacentProject(locale: Locale, slug: string) {
  const list = getProjects(locale);
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length]!;
}

/** Showroom filters: only categories that have at least one project. */
export function getProjectFilters(locale: Locale) {
  const labels = getDictionary(locale).projects.categories;
  const counts = new Map<ProjectCategory, number>();
  for (const p of published) for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return (Object.keys(labels) as ProjectCategory[])
    .filter((c) => counts.has(c))
    .map((c) => ({ id: c, label: labels[c], count: counts.get(c)! }));
}

export function getExperience(locale: Locale): Experience[] {
  if (locale === "fr") return EXPERIENCE;
  return EXPERIENCE.map((e) => {
    const t = EXPERIENCE_EN[e.start];
    return t ? { ...e, ...t, period: t.period ?? e.period, org: t.org ?? e.org } : e;
  });
}

export function getPrinciples(locale: Locale) {
  return locale === "en" ? PRINCIPLES_EN : PRINCIPLES;
}

export function getSkillGroups(locale: Locale) {
  return SKILL_GROUPS.map((g) => ({ ...g, label: locale === "en" ? (SKILL_LABELS_EN[g.label] ?? g.label) : g.label }));
}

export function getCourses(locale: Locale) {
  return COURSES.map((c) => ({ ...c, category: locale === "en" ? (COURSE_CATEGORIES_EN[c.category] ?? c.category) : c.category }));
}

export function getServices(locale: Locale): Service[] {
  if (locale === "fr") return SERVICES;
  return SERVICES.map((s) => {
    const t = SERVICES_EN[s.id];
    if (!t) return s;
    return {
      ...s,
      title: t.title,
      problem: t.problem,
      deliverables: t.deliverables,
      approach: t.approach,
      stack: t.stack ?? s.stack,
      proof: s.proof.map((p, i) => ({ ...p, label: t.proof?.[i] ?? p.label })),
    };
  });
}

export function getStoryboard(locale: Locale) {
  return STORYBOARD.map((s, i) => (locale === "en" ? { ...s, ...STORYBOARD_EN[i]! } : s));
}
