import type { MetadataRoute } from "next";
import { publishedProjects } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const pages = ["", "/projets", "/a-propos", "/services", "/blog", "/lab", "/video", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const projects = publishedProjects.map((p) => ({ url: `${base}/projets/${p.slug}`, changeFrequency: "monthly" as const, priority: p.featured ? 0.9 : 0.6 }));
  const posts = getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...projects, ...posts];
}
