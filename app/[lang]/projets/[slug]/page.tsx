import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImageOff, Lock } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { Gallery } from "@/components/projects/Gallery";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { AskKoud } from "@/components/chat/AskKoud";
import { getAdjacentProject, getProject, getProjects } from "@/lib/content";
import { href, LOCALES } from "@/lib/i18n/routing";
import { alternates, resolveLocale } from "@/lib/i18n/server";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getProjects(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  const project = getProject(locale, (await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${t.caseStudy.caseStudy}`,
    description: `${project.tagline} ${project.summary}`.slice(0, 300),
    alternates: alternates(locale, `/projets/${project.slug}`),
    openGraph: { title: `${project.name} — ${SITE.name}`, description: project.tagline },
  };
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-40 border-t border-line pt-12 sm:pt-16">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="heading-2 mt-4">
            {title}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.caseStudy;
  const project = getProject(locale, (await params).slug);
  if (!project) notFound();
  const next = getAdjacentProject(locale, project.slug);
  const post = project.relatedPost ? getAllPosts().find((p) => p.slug === project.relatedPost) : undefined;

  const sections = [
    { id: "apercu", label: t.sections.apercu },
    project.problem && { id: "contexte", label: t.sections.contexte },
    { id: "role", label: t.sections.role },
    project.architecture && { id: "architecture", label: t.sections.architecture },
    { id: "interfaces", label: t.sections.interfaces },
    project.solution?.length && { id: "solutions", label: t.sections.solutions },
    project.challenges?.length && { id: "defis", label: t.sections.defis },
    project.outcomes?.length && { id: "resultats", label: t.sections.resultats },
    project.learnings?.length && { id: "enseignements", label: t.sections.enseignements },
  ].filter(Boolean) as { id: string; label: string }[];
  const num = (id: string) => String(sections.findIndex((s) => s.id === id)).padStart(2, "0");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    author: { "@type": "Person", name: SITE.person },
    keywords: project.stack.join(", "),
    url: `${SITE.url}${href(locale, `/projets/${project.slug}`)}`,
    inLanguage: locale,
  };

  return (
    <article className="container-page pt-28 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────── */}
      <header id="apercu" className="scroll-mt-40">
        <Link href={href(locale, "/projets")} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> {t.back}
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[0.68rem] font-semibold tracking-wider text-accent-ink uppercase">
                {dict.projects.status[project.status]}
              </span>
              {project.categories.map((c) => (
                <Tag key={c}>{dict.projects.categories[c]}</Tag>
              ))}
            </div>
            <h1 className="display-xl mt-6">{project.name}</h1>
            {project.formerName && <p className="mt-2 text-sm text-muted">{t.formerly} {project.formerName}</p>}
            <p className="mt-6 max-w-[48ch] text-xl leading-snug tracking-[-0.01em]">{project.tagline}</p>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.links.map((l, i) => (
                <LinkButton key={l.href} href={l.href} external variant={i === 0 ? "primary" : "ghost"} icon={<ArrowUpRight className="size-4" />}>
                  {l.label}
                </LinkButton>
              ))}
              {project.status === "confidential" && (
                <p className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted">
                  <Lock className="size-4" aria-hidden /> {project.statusNote}
                </p>
              )}
              {project.status !== "confidential" && project.statusNote && <p className="text-sm text-muted">{project.statusNote}</p>}
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
            <ProjectCover project={project} className="aspect-[16/10]" priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
          {(project.facts?.length
            ? project.facts.map((f) => ({ v: f.value, l: f.label }))
            : [
                { v: project.year || "—", l: t.period },
                { v: dict.projects.status[project.status], l: t.status },
                { v: String(project.stack.length), l: t.technologies },
              ]
          ).map((f) => (
            <div key={f.l}>
              <dt className="sr-only">{f.l}</dt>
              <dd className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{f.v}</dd>
              <dd className="mt-1 text-xs text-muted">{f.l}</dd>
            </div>
          ))}
          {project.context && (
            <div>
              <dt className="sr-only">{t.context}</dt>
              <dd className="text-sm leading-snug font-medium">{project.context}</dd>
              <dd className="mt-1 text-xs text-muted">{t.context}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="mt-12">
        <CaseStudyNav sections={sections} label={t.sectionsNav} />
      </div>

      <div className="mt-6 space-y-20 sm:space-y-28">
        {project.problem && (
          <Section id="contexte" eyebrow={`${num("contexte")} · ${t.sections.contexte}`} title={t.titles.contexte}>
            <Reveal>
              <p className="text-xl leading-relaxed tracking-[-0.01em] sm:text-2xl">{project.problem}</p>
            </Reveal>
          </Section>
        )}

        <Section id="role" eyebrow={`${num("role")} · ${t.sections.role}`} title={t.titles.role}>
          <p className="text-lg leading-relaxed">{project.role}{project.year && <span className="text-muted"> — {project.year}</span>}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.technologiesUsed}>
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line-strong bg-surface px-3.5 py-2 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {project.architecture && (
          <Section id="architecture" eyebrow={`${num("architecture")} · ${t.sections.architecture}`} title={t.titles.architecture}>
            <ArchitectureDiagram architecture={project.architecture} />
          </Section>
        )}

        <Section id="interfaces" eyebrow={`${num("interfaces")} · ${t.sections.interfaces}`} title={t.titles.interfaces}>
          {project.screens.length > 0 ? (
            <Gallery screens={project.screens} projectName={project.name} />
          ) : (
            <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-dashed border-line-strong p-6">
              <ImageOff className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden />
              <div>
                <p className="font-medium">
                  {project.status === "confidential" ? t.noScreensConfidential : t.noScreens}
                </p>
                <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-muted">
                  {project.status === "confidential" ? t.noScreensConfidentialBody : t.noScreensBody}
                </p>
                {project.links[0] && (
                  <a href={project.links[0].href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm text-accent-fg underline-offset-4 hover:underline">
                    {t.seeLive} <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}
        </Section>

        {project.solution?.length ? (
          <Section id="solutions" eyebrow={`${num("solutions")} · ${t.sections.solutions}`} title={t.titles.solutions}>
            <ol className="space-y-4">
              {project.solution.map((s, i) => (
                <Reveal as="li" key={i} delay={i * 50} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-[var(--radius)] border border-line bg-surface p-5">
                  <span className="font-mono text-sm text-accent-fg">{String(i + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed">{s.replace(/`/g, "")}</p>
                </Reveal>
              ))}
            </ol>
          </Section>
        ) : null}

        {project.challenges?.length ? (
          <Section id="defis" eyebrow={`${num("defis")} · ${t.sections.defis}`} title={t.titles.defis}>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.challenges.map((c, i) => (
                <Reveal key={c.title} delay={i * 60} className="rounded-[var(--radius-lg)] border border-line p-6">
                  <h3 className="text-lg font-semibold tracking-[-0.015em]">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </Section>
        ) : null}

        {project.outcomes?.length ? (
          <Section id="resultats" eyebrow={`${num("resultats")} · ${t.sections.resultats}`} title={t.titles.resultats}>
            <ul className="divide-y divide-line border-y border-line">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-4 py-5 text-lg leading-relaxed">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {project.learnings?.length ? (
          <Section id="enseignements" eyebrow={`${num("enseignements")} · ${t.sections.enseignements}`} title={t.titles.enseignements}>
            <div className="space-y-6">
              {project.learnings.map((l) => (
                <blockquote key={l} className="border-l-2 border-accent pl-5 text-xl leading-snug tracking-[-0.01em] sm:text-2xl">
                  {l}
                </blockquote>
              ))}
            </div>
            {post && (
              <Link href={href(locale, `/blog/${post.slug}`)} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-accent-fg underline-offset-4 hover:underline">
                {t.readPost} <span lang="fr">{post.title}</span> <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </Section>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <p className="mr-auto text-sm text-muted">{t.question(project.name)}</p>
          <AskKoud question={t.askAbout(project.name)} />
          <LinkButton href={href(locale, "/contact")} variant="ghost">
            {dict.nav.contactCta}
          </LinkButton>
        </div>
      </div>

      {/* ── Next project ─────────────────────── */}
      <nav aria-label={t.next} className="mt-24">
        <Link href={href(locale, `/projets/${next.slug}`)} className="group block border-t border-line pt-10">
          <span className="meta text-muted">{t.next}</span>
          <span className="mt-4 flex items-center justify-between gap-6">
            <span className="display-l transition-colors group-hover:text-accent-fg">{next.name}</span>
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,color] group-hover:bg-accent group-hover:text-accent-ink">
              <ArrowRight className="size-5" aria-hidden />
            </span>
          </span>
          <span className="mt-3 block max-w-[60ch] text-muted">{next.tagline}</span>
        </Link>
      </nav>
    </article>
  );
}
