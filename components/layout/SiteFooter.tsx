import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/content/site";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href, type Locale } from "@/lib/i18n/routing";
import { SITE_EN } from "@/content/en/other";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const availability = locale === "en" ? SITE_EN.availability : SITE.availability;
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="container-page pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="meta text-muted">{t.footer.ask}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="group mt-4 inline-flex items-center gap-2 text-2xl font-semibold tracking-[-0.03em] break-all sm:text-3xl"
            >
              {SITE.email}
              <ArrowUpRight className="size-6 shrink-0 text-accent-fg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted">{availability}. {SITE.location}.</p>
          </div>

          <nav aria-label={t.footer.footerNav}>
            <p className="meta text-muted">{t.footer.sitemap}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={href(locale, n.href)} className="inline-flex min-h-10 items-center text-sm hover:text-accent-fg">
                    {t.nav[n.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href(locale, "/video")} className="inline-flex min-h-10 items-center text-sm hover:text-accent-fg">
                  {t.nav.video}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="meta text-muted">{t.footer.elsewhere}</p>
            <ul className="mt-4 space-y-1">
              {SITE.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]!;
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-3 text-sm hover:text-accent-fg">
                      <Icon className="size-4" />
                      {s.label}
                      <span className="sr-only">{t.nav.newTab}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-16 text-[clamp(5rem,24vw,22rem)] leading-[0.78] font-semibold tracking-[-0.07em] text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
        >
          KOUD
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.person}. {t.footer.rights}</p>
          <p>{t.footer.stack}</p>
        </div>
      </div>
    </footer>
  );
}
