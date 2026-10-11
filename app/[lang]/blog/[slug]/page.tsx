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
import { href, LOCALES } from "@/lib/i18n/routing";
import { alternates, resolveLocale } from "@/lib/i18n/server";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getAllPosts().map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await resolveLocale(params);
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    // The article itself is French: the French URL is canonical for both versions.
    alternates: { ...alternates(locale, `/blog/${post.meta.slug}`), canonical: href("fr", `/blog/${post.meta.slug}`) },
    openGraph: { type: "article", publishedTime: post.meta.date, title: post.meta.title, description: post.meta.excerpt, authors: [SITE.person] },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.blog;
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
    inLanguage: "fr",
  };

  return (
    <>
      <ReadingProgress />
      <article className="container-page pt-28 sm:pt-36">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href={href(locale, "/blog")} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> {t.back}
        </Link>
        <header lang="fr" className="mt-6 max-w-4xl">
          <p className="meta text-accent-fg">{meta.category}</p>
          <h1 className="display-l mt-5">{meta.title}</h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{meta.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4 font-mono text-xs text-muted">
            <span>{SITE.person}</span>
            <time dateTime={meta.date} lang={locale}>{formatDate(meta.date, locale)}</time>
            <span lang={locale}>{t.minutes(meta.readingMinutes)}</span>
            <ul className="flex flex-wrap gap-1.5" aria-label={t.keywords}>
              {meta.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2 py-0.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
          <div lang="fr" className="prose-koud min-w-0">
            {t.languageNote && <p lang={locale} className="!mt-0 mb-8 rounded-[var(--radius)] border border-line px-4 py-3 text-sm text-muted">{t.languageNote}</p>}
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: { dark: "github-dark-dimmed", light: "github-light-high-contrast" }, keepBackground: false }]],
                },
              }}
            />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <Toc headings={headings} title={t.toc} />
              <div className="rounded-[var(--radius)] border border-line p-4">
                <p className="text-sm text-muted">{t.askQuestion}</p>
                <div className="mt-3">
                  <AskKoud question={t.askSummary(meta.title)} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <nav aria-label={t.articlesNav} className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={href(locale, `/blog/${older.slug}`)} className="group rounded-[var(--radius-lg)] border border-line p-6 hover:border-line-strong">
              <span className="meta flex items-center gap-2 text-muted">
                <ArrowLeft className="size-3.5" aria-hidden /> {t.previous}
              </span>
              <span lang="fr" className="mt-3 block font-semibold tracking-[-0.015em] group-hover:text-accent-fg">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={href(locale, `/blog/${newer.slug}`)} className="group rounded-[var(--radius-lg)] border border-line p-6 text-right hover:border-line-strong">
              <span className="meta flex items-center justify-end gap-2 text-muted">
                {t.next} <ArrowRight className="size-3.5" aria-hidden />
              </span>
              <span lang="fr" className="mt-3 block font-semibold tracking-[-0.015em] group-hover:text-accent-fg">{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
