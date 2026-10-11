import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/content/site";
import { FEATURES } from "@/lib/features";
import { href, LOCALES } from "@/lib/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const abs = (path: string) => `${base}${path === "/" ? "" : path}` || base;

  const entry = (internal: string, priority: number, lastModified?: Date): MetadataRoute.Sitemap =>
    LOCALES.map((locale) => ({
      url: abs(href(locale, internal)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, abs(href(l, internal))])) },
    }));

  const pages = ["/", "/projets", "/a-propos", "/services", "/blog", "/lab", ...(FEATURES.video ? ["/video"] : []), "/contact"].flatMap((p) => entry(p, p === "/" ? 1 : 0.7));
  const projects = getProjects("fr").flatMap((p) => entry(`/projets/${p.slug}`, p.featured ? 0.9 : 0.6));
  // Articles exist in French only: list the French URL.
  const posts = getAllPosts().map((p) => ({ url: abs(`/blog/${p.slug}`), lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...projects, ...posts];
}
