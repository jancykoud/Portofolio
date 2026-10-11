import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href, type Locale } from "@/lib/i18n/routing";


export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36" aria-labelledby="hero-title">
      <div className="atmosphere pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" aria-hidden />

      <div className="container-page grid items-center gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-4">
        <div className="relative z-10">
          <Link
            href={href(locale, "/projets/declic")}
            className="hero-in group mb-8 inline-flex min-h-9 items-center gap-3 rounded-full border border-line-strong bg-surface/50 py-1 pr-3 pl-1 text-xs"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[0.68rem] font-semibold tracking-wider text-accent-ink uppercase">
              {t.featured}
            </span>
            <span className="whitespace-nowrap text-muted transition-colors group-hover:text-fg">
              DECLIC<span className="hidden sm:inline">{t.featuredText}</span>
            </span>
            <ArrowRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          <p className="hero-in meta text-accent-fg" style={{ "--i": 1 } as React.CSSProperties}>
            Software Engineer
            <span className="mx-2 text-muted" aria-hidden>/</span>
            Digital Product Builder
          </p>

          <h1 id="hero-title" className="display-xl mt-5">
            {t.title.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block whitespace-nowrap" style={{ "--i": i + 2 } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-in mt-7 max-w-[52ch] text-lg leading-relaxed text-muted" style={{ "--i": 6 } as React.CSSProperties}>
            {t.lead}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ "--i": 7 } as React.CSSProperties}>
            <LinkButton href={href(locale, "/projets")} size="lg" icon={<ArrowRight className="size-4" />}>
              {t.ctaProjects}
            </LinkButton>
            <LinkButton href={href(locale, "/services")} variant="ghost" size="lg">
              {t.ctaServices}
            </LinkButton>
            <Link href={href(locale, "/video")} className="group inline-flex min-h-12 items-center gap-3 px-2 text-sm font-medium">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-fg">
                <Play className="size-3.5 fill-current" aria-hidden />
              </span>
              {t.ctaVideo}
            </Link>
          </div>
        </div>

        <div className="hero-in relative -mx-4 sm:mx-0" style={{ "--i": 3 } as React.CSSProperties}>
          <HeroVisual alt={locale === "en" ? "Portrait of Jancy Koud Banga" : "Portrait de Jancy Koud Banga"} />
        </div>
      </div>

      <div className="container-page relative z-10 mt-10 pb-10 lg:mt-0">
        <div className="flex items-end gap-6 border-t border-line pt-6">
          <a
            href="#selection"
            className="hidden h-14 w-9 shrink-0 items-start justify-center overflow-hidden rounded-full border border-line-strong pt-2 sm:flex"
            aria-label={t.scroll}
          >
            <span className="block h-3 w-px bg-fg" style={{ animation: "scroll-cue 2.2s var(--ease-out-expo) infinite" }} aria-hidden />
          </a>
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
