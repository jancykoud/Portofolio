import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

function parse(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    date: String(data.date),
    category: String(data.category ?? "Article"),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parse(f).meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  const file = `${slug}.mdx`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(BLOG_DIR, file))) return null;
  const { meta, content } = parse(file);
  // Same slug algorithm as rehype-slug, so TOC anchors match rendered ids.
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    const m = !inFence && /^(##|###)\s+(.+)$/.exec(line);
    if (m) {
      const text = m[2]!.replace(/[*`_]/g, "").trim();
      headings.push({ id: slugger.slug(text), text, depth: m[1] === "##" ? 2 : 3 });
    }
  }
  return { meta, content, headings };
}
