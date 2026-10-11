import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Play } from "lucide-react";
import { Timeline } from "@/components/about/Timeline";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import { AskKoud } from "@/components/chat/AskKoud";
import { SITE } from "@/content/site";
import { SITE_EN } from "@/content/en/other";
import { getCourses, getExperience, getSkillGroups } from "@/lib/content";
import { href } from "@/lib/i18n/routing";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.about.metaTitle, description: t.about.metaDescription, alternates: alternates(locale, "/a-propos") };
}

export default async function AboutPage({ params }: LangParams) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.about;
  const portraitAlt = locale === "en" ? SITE_EN.portraitAlt : SITE.portrait.alt;
  return (
    <>
      {/* ── Intro ───────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-28 sm:pt-36" aria-labelledby="about-title">
        <div className="atmosphere absolute inset-0 -z-10" aria-hidden />
        <div className="container-page grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="pb-4">
            <Eyebrow className="hero-in">{t.eyebrow}</Eyebrow>
            <h1 id="about-title" className="display-xl mt-5">
              <span className="block overflow-hidden"><span className="hero-line block" style={{ "--i": 1 } as React.CSSProperties}>{t.title[0]}</span></span>
              <span className="block overflow-hidden"><span className="hero-line block" style={{ "--i": 2 } as React.CSSProperties}>{t.title[1]}</span></span>
            </h1>
            <div className="hero-in mt-8 max-w-[60ch] space-y-4 text-lg leading-relaxed text-muted" style={{ "--i": 4 } as React.CSSProperties}>
              <p>
                {t.introName} <strong className="font-medium text-fg">Jancy Koud Banga</strong>. {t.intro1}
              </p>
              <p>
                {t.intro2}
              </p>
            </div>
            <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ "--i": 5 } as React.CSSProperties}>
              {SITE.resumes.map((r, i) => (
                <a
                  key={r.href}
                  href={r.href}
                  download
                  hrefLang="fr"
                  className={
                    i === 0
                      ? "inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-[0.95rem] font-medium text-accent-ink"
                      : "inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-[0.95rem] font-medium hover:border-fg"
                  }
                >
                  <Download className="size-4" aria-hidden /> {locale === "en" ? SITE_EN.resumes[i] : r.label} <span className="font-mono text-xs">{dict.common.pdf}</span>
                </a>
              ))}
            </div>
            <ul className="mt-6 flex gap-1" aria-label={t.profiles}>
              {SITE.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]!;
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${dict.nav.newTab}`} className="inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-line-strong">
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="hero-in relative mx-auto aspect-[4/5] w-full max-w-[460px]" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="absolute inset-x-0 bottom-0 h-[78%] rounded-t-[200px] border border-line bg-surface" aria-hidden />
            <div className="absolute inset-x-[10%] bottom-[30%] h-[45%] rounded-full blur-3xl" style={{ background: "color-mix(in srgb, var(--atmo-1) 40%, transparent)" }} aria-hidden />
            <Image
              src="/images/portrait-cutout.png"
              alt={portraitAlt}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />
          </div>
        </div>
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
            {t.facts.map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{v}</dd>
                <dd className="mt-1 text-xs text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Timeline ───────────────────────── */}
      <section className="container-page pt-24 sm:pt-32" aria-labelledby="parcours-title">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={t.timelineEyebrow} title={<span id="parcours-title">{t.timelineTitle}</span>} lead={t.timelineLead} />
          </div>
          <Timeline items={getExperience(locale)} />
        </div>
      </section>

      {/* ── Expertise ──────────────────────── */}
      <section className="container-page pt-24 sm:pt-32" aria-labelledby="expertise-title">
        <SectionHeading
          eyebrow={t.expertiseEyebrow}
          title={<span id="expertise-title">{t.expertiseTitle}</span>}
          lead={t.expertiseLead}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {getSkillGroups(locale).map((g, i) => (
            <Reveal key={g.label} delay={i * 50} className="bg-bg p-6">
              <h3 className="meta text-accent-fg">{g.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Method ─────────────────────────── */}
      <section className="container-page pt-24 sm:pt-32" aria-labelledby="method-title">
        <SectionHeading eyebrow={t.methodEyebrow} title={<span id="method-title">{t.methodTitle}</span>} />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {t.method.map((m, i) => (
            <Reveal as="li" key={m.step} delay={i * 70} className="relative border-t-2 border-accent pt-6">
              <span className="meta text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{m.step}</h3>
              <p className="mt-3 leading-relaxed text-muted">{m.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Collaborations + continuing education ── */}
      <section className="container-page grid gap-16 pt-24 sm:pt-32 lg:grid-cols-2" aria-label={t.collabSection}>
        <div>
          <SectionHeading eyebrow={t.collabEyebrow} title={t.collabTitle} />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {t.collabs.map((c) => (
              <li key={c.org} className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="font-medium">{c.org}</p>
                  <p className="mt-1 text-sm text-muted">{c.context}</p>
                </div>
                {c.href && (
                  <Link href={href(locale, c.href)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line hover:border-fg" aria-label={t.see(c.context)}>
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div id="formation" className="scroll-mt-28">
          <SectionHeading eyebrow={t.coursesEyebrow} title={t.coursesTitle} />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {getCourses(locale).map((c) => (
              <li key={c.title} className="rounded-[var(--radius)] border border-line p-4">
                <p className="meta text-[0.65rem] text-muted">{c.category} · {c.platform}</p>
                <p className="mt-2 text-sm leading-snug font-medium">{c.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Video + CTA ────────────────────── */}
      <section className="container-page pt-24 sm:pt-32">
        <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="heading-2">{t.moreTitle}</h2>
            <p className="mt-3 max-w-lg text-muted">{t.moreLead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={href(locale, "/video")} variant="ghost" size="lg" icon={<Play className="size-4" />}>
              {t.video}
            </LinkButton>
            <AskKoud question={t.askBackground} />
          </div>
        </div>
      </section>
    </>
  );
}
