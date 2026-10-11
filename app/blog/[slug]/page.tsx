import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReadingProgress } from "@/components/mdx/ReadingProgress";
import { Toc } from "@/components/mdx/Toc";
import { AskKoud } from "@/components/chat/AskKoud";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE } from "@/content/site";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: { type: "article", publishedTime: post.meta.date, title: post.meta.title, description: post.meta.excerpt, authors: [SITE.person] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, content, headings } = post;
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === meta.slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: { "@type": "Person", name: SITE.person, url: SITE.url },
    keywords: meta.tags.join(", "),
    mainEntityOfPage: `${SITE.url}/blog/${meta.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <article className="container-page pt-28 sm:pt-36">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> Tous les articles
        </Link>
        <header className="mt-6 max-w-4xl">
          <p className="meta text-accent-fg">{meta.category}</p>
          <h1 className="display-l mt-5">{meta.title}</h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{meta.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4 font-mono text-xs text-muted">
            <span>{SITE.person}</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span>{meta.readingMinutes} min de lecture</span>
            <ul className="flex flex-wrap gap-1.5" aria-label="Mots-clés">
              {meta.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
          <div className="prose-koud min-w-0">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: { dark: "github-dark-dimmed", light: "github-light" }, keepBackground: false }]],
                },
              }}
            />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <Toc headings={headings} />
              <div className="rounded-[var(--radius)] border border-line p-4">
                <p className="text-sm text-muted">Une question sur cet article ?</p>
                <div className="mt-3">
                  <AskKoud question={`Résume l'article « ${meta.title} »`} label="Demander à KOUD AI" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <nav aria-label="Articles" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group rounded-[var(--radius-lg)] border border-line p-6 hover:border-line-strong">
              <span className="meta flex items-center gap-2 text-muted">
                <ArrowLeft className="size-3.5" aria-hidden /> Article précédent
              </span>
              <span className="mt-3 block font-semibold tracking-[-0.015em] group-hover:text-accent-fg">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group rounded-[var(--radius-lg)] border border-line p-6 text-right hover:border-line-strong">
              <span className="meta flex items-center justify-end gap-2 text-muted">
                Article suivant <ArrowRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-3 block font-semibold tracking-[-0.015em] group-hover:text-accent-fg">{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
