import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { AskKoud } from "@/components/chat/AskKoud";
import { getPrinciples, getProject, getProjects, getServices } from "@/lib/content";
import { href } from "@/lib/i18n/routing";
import { resolveLocale, type LangParams } from "@/lib/i18n/server";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

const SELECTION = ["wmbia", "akili", "hslu-exam-assistant"];

export default async function HomePage({ params }: LangParams) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.home;
  const projects = getProjects(locale);
  const declic = getProject(locale, "declic")!;
  const selection = SELECTION.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const posts = getAllPosts().slice(0, 3);
  const principles = getPrinciples(locale);
  const services = getServices(locale);

  return (
    <>
      <Hero locale={locale} />

      {/* ── Featured: DECLIC ───────────────────────────────── */}
      <section id="selection" className="container-page pt-20 sm:pt-28" aria-labelledby="featured-title">
        <Reveal className="grid gap-10 rounded-[calc(var(--radius-lg)+6px)] border border-line bg-surface p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
          <div className="flex flex-col">
            <Eyebrow>{t.featuredEyebrow} · {declic.context}</Eyebrow>
            <h2 id="featured-title" className="display-l mt-5">
              DECLIC
            </h2>
            <p className="mt-2 text-sm text-muted">{t.formerly} {declic.formerName}</p>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">{declic.tagline}</p>
            <p className="mt-4 max-w-[56ch] leading-relaxed text-muted">{declic.summary}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {declic.facts!.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-2xl font-semibold tracking-[-0.03em]">{f.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <LinkButton href={href(locale, "/projets/declic")} icon={<ArrowRight className="size-4" />}>
                {t.readCase}
              </LinkButton>
              <span className="inline-flex items-center gap-2 text-xs text-muted">
                <Lock className="size-3.5" aria-hidden /> {t.confidentialNote}
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <ArchitectureDiagram architecture={declic.architecture!} compact />
          </div>
        </Reveal>
      </section>

      {/* ── Selection ─────────────────────────────────────── */}
      <section className="container-page pt-24 sm:pt-32" aria-labelledby="work-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.workEyebrow} title={<span id="work-title">{t.workTitle}</span>} />
          <LinkButton href={href(locale, "/projets")} variant="ghost" icon={<ArrowRight className="size-4" />}>
            {t.allProjects} ({projects.length})
          </LinkButton>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {selection.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard project={p} index={i} locale={locale} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Approach ──────────────────────────────────────── */}
      <section className="container-page pt-24 sm:pt-36" aria-labelledby="approach-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={t.approachEyebrow}
              title={<span id="approach-title">{t.approachTitle}</span>}
              lead={t.approachLead}
            />
            <div className="mt-8">
              <LinkButton href={href(locale, "/a-propos")} variant="ghost" icon={<ArrowRight className="size-4" />}>
                {t.myBackground}
              </LinkButton>
            </div>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60} className="grid gap-3 py-8 sm:grid-cols-[4rem_1fr]">
                <span className="meta pt-1.5 text-accent-fg">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{p.title}</h3>
                  <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className="container-page pt-24 sm:pt-36" aria-labelledby="services-title">
        <SectionHeading
          eyebrow={t.servicesEyebrow}
          title={<span id="services-title">{t.servicesTitle}</span>}
          lead={t.servicesLead}
        />
        <ul className="mt-12 border-t border-line">
          {services.map((s, i) => (
            <li key={s.id} className="border-b border-line">
              <Link
                href={href(locale, `/services#${s.id}`)}
                className="group grid items-center gap-2 py-6 transition-colors sm:grid-cols-[4rem_1fr_1.2fr_auto] sm:gap-6"
              >
                <span className="meta text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent-fg sm:text-2xl">
                  {s.title}
                </span>
                <span className="text-sm leading-relaxed text-muted">{s.problem}</span>
                <ArrowUpRight className="hidden size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg sm:block" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Writing ───────────────────────────────────────── */}
      <section className="container-page pt-24 sm:pt-36" aria-labelledby="writing-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.writingEyebrow} title={<span id="writing-title">{t.writingTitle}</span>} />
          <LinkButton href={href(locale, "/blog")} variant="ghost" icon={<ArrowRight className="size-4" />}>
            {t.allPosts}
          </LinkButton>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80} className="h-full">
              <article className="group relative flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors hover:border-line-strong">
                <p className="meta text-accent-fg">{post.category}</p>
                <h3 lang="fr" className="mt-4 text-lg leading-snug font-semibold tracking-[-0.015em]">
                  <Link href={href(locale, `/blog/${post.slug}`)} className="after:absolute after:inset-0" hrefLang="fr">
                    {post.title}
                  </Link>
                </h3>
                <p lang="fr" className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-auto pt-6 font-mono text-xs text-muted">
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {dict.blog.minShort(post.readingMinutes)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="container-page pt-24 sm:pt-36" aria-labelledby="cta-title">
        <Reveal className="relative isolate overflow-hidden rounded-[calc(var(--radius-lg)+6px)] border border-line px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="atmosphere absolute inset-0 -z-10" aria-hidden />
          <Eyebrow>{t.ctaEyebrow}</Eyebrow>
          <h2 id="cta-title" className="display-l mx-auto mt-5 max-w-3xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            {t.ctaLead}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LinkButton href={href(locale, "/contact")} size="lg" icon={<ArrowRight className="size-4" />}>
              {dict.nav.contactCta}
            </LinkButton>
            <AskKoud />
          </div>
        </Reveal>
      </section>
    </>
  );
}
