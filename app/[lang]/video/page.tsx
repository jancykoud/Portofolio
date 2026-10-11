import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { INTRO_VIDEO } from "@/content/video";
import { getStoryboard } from "@/lib/content";
import { href } from "@/lib/i18n/routing";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.video.metaTitle, description: t.video.metaDescription, alternates: alternates(locale, "/video") };
}

export default async function VideoPage({ params }: LangParams) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.video;
  const storyboard = getStoryboard(locale);
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      />

      <div className="mt-12">
        <VideoPlayer source={INTRO_VIDEO} chapters={storyboard} />
      </div>

      <section className="mt-24" aria-labelledby="storyboard-title">
        <SectionHeading
          eyebrow={t.storyboardEyebrow}
          title={<span id="storyboard-title">{t.storyboardTitle}</span>}
          lead={t.storyboardLead}
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {storyboard.map((s, i) => (
            <Reveal as="li" key={s.time} delay={i * 50} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-xs text-muted">
                  {s.time} → {s.end}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="meta mr-2 text-[0.65rem] text-accent-fg">{t.image}</span>
                {s.shot}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <span className="meta mr-2 text-[0.65rem] text-accent-fg">{t.voice}</span>
                {s.voice}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <LinkButton href={href(locale, "/a-propos")} variant="ghost" icon={<ArrowRight className="size-4" />}>
          {t.readBackground}
        </LinkButton>
        <LinkButton href={href(locale, "/contact")} icon={<ArrowRight className="size-4" />}>
          {dict.nav.contactCta}
        </LinkButton>
      </div>
    </div>
  );
}
