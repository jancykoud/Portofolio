import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { href } from "@/lib/i18n/routing";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.blog.metaTitle, description: t.blog.metaDescription, alternates: alternates(locale, "/blog") };
}

export default async function BlogPage({ params }: LangParams) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.blog;
  const posts = getAllPosts();
  const [first, ...rest] = posts;

  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      />
      {t.languageNote && <p className="mt-6 inline-flex rounded-full border border-line px-4 py-2 text-sm text-muted">{t.languageNote}</p>}

      {first && (
        <Reveal className="mt-14">
          <article lang="fr" className="group relative grid gap-8 rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="meta text-accent-fg"><span lang={locale}>{t.featured}</span> · {first.category}</p>
              <h2 className="heading-2 mt-4">
                <Link href={href(locale, `/blog/${first.slug}`)} className="after:absolute after:inset-0">
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
                <time dateTime={first.date} lang={locale}>{formatDate(first.date, locale)}</time> · <span lang={locale}>{t.minutes(first.readingMinutes)}</span>
                <ArrowUpRight className="size-5 text-fg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </p>
            </div>
          </article>
        </Reveal>
      )}

      <ol className="mt-6 divide-y divide-line border-y border-line">
        {rest.map((p) => (
          <li key={p.slug}>
            <article lang="fr" className="group relative grid gap-3 py-8 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
              <p className="font-mono text-xs text-muted">
                <time dateTime={p.date} lang={locale}>{formatDate(p.date, locale)}</time>
              </p>
              <div>
                <p className="meta text-[0.68rem] text-accent-fg">{p.category}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-fg sm:text-2xl">
                  <Link href={href(locale, `/blog/${p.slug}`)} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <p className="font-mono text-xs text-muted">{t.minShort(p.readingMinutes)}</p>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-sm text-muted">
        {t.labPrompt}{" "}
        <Link href={href(locale, "/lab")} className="text-accent-fg underline underline-offset-4">
          Lab
        </Link>
        .
      </p>
    </div>
  );
}
