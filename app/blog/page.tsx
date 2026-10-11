import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Écrits techniques",
  description: "Retours d'expérience sur l'architecture, l'IoT environnemental, les standards OGC et la recherche vectorielle.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [first, ...rest] = posts;

  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Writing"
        title="Articles et retours d'expérience."
        lead="Mes réflexions sur le développement, les données, l'IA et les produits numériques — écrites depuis le terrain."
      />

      {first && (
        <Reveal className="mt-14">
          <article className="group relative grid gap-8 rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="meta text-accent-fg">À la une · {first.category}</p>
              <h2 className="heading-2 mt-4">
                <Link href={`/blog/${first.slug}`} className="after:absolute after:inset-0">
                  {first.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-[60ch] leading-relaxed text-muted">{first.excerpt}</p>
            </div>
            <div className="flex flex-col justify-between gap-6 lg:items-end lg:text-right">
              <ul className="flex flex-wrap gap-1.5 lg:justify-end">
                {first.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-3 font-mono text-xs text-muted">
                <time dateTime={first.date}>{formatDate(first.date)}</time> · {first.readingMinutes} min de lecture
                <ArrowUpRight className="size-5 text-fg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </p>
            </div>
          </article>
        </Reveal>
      )}

      <ol className="mt-6 divide-y divide-line border-y border-line">
        {rest.map((p) => (
          <li key={p.slug}>
            <article className="group relative grid gap-3 py-8 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
              <p className="font-mono text-xs text-muted">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
              <div>
                <p className="meta text-[0.68rem] text-accent-fg">{p.category}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-fg sm:text-2xl">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <p className="font-mono text-xs text-muted">{p.readingMinutes} min</p>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-sm text-muted">
        Envie d'expérimentations interactives ? Voir le <Link href="/lab" className="text-accent-fg underline-offset-4 hover:underline">Lab</Link>.
      </p>
    </div>
  );
}
