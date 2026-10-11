import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getArticles() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return { slug: filename.replace(".mdx", ""), ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function BlogPage() {
  const articles = getArticles();

  return (
    <section className="min-h-[calc(100vh-80px)]" style={{ background: "#0a0a0a" }}>
      <div className="container mx-auto px-4 pt-16 pb-24">

        {/* En-tête éditorial */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div style={{ height: "0.5px", width: 28, background: "rgba(255,255,255,0.25)" }} />
            <span className="font-inter uppercase tracking-[0.18em] text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Réflexions · Techniques · Retours terrain
            </span>
          </div>
          <h1
            className="font-syne font-black leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 64px)", color: "#ffffff", letterSpacing: "-0.025em" }}
          >
            — Écrits
            <br />
            <span style={{ color: "#8b5cf6" }}>techniques</span>
          </h1>
        </div>

        {/* Grille articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <article className="blog-card relative p-8 rounded-xl h-full" style={{ background: "#111111", border: "0.5px solid rgba(255,255,255,0.08)" }}>

                {/* Numéro décoratif */}
                <span
                  className="font-syne font-black absolute top-6 right-8 select-none"
                  style={{ fontSize: "clamp(40px, 5vw, 56px)", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Catégorie pill */}
                <span
                  className="inline-block font-inter text-[10px] uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-4"
                  style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}
                >
                  {article.category}
                </span>

                {/* Titre */}
                <h2
                  className="font-syne font-bold leading-snug mb-3 pr-12"
                  style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#ffffff" }}
                >
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="font-inter leading-relaxed mb-6 line-clamp-2"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}
                >
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-4">
                  <span className="font-inter text-[11px] text-muted">
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)" }} />
                  <span className="font-inter text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{article.readingTime}</span>
                </div>

                {/* Tags */}
                {article.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-inter text-[10px] px-2 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "0.5px solid rgba(255,255,255,0.08)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
