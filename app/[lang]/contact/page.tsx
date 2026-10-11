import type { Metadata } from "next";
import { CalendarCheck, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import { SITE } from "@/content/site";
import { SITE_EN } from "@/content/en/other";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.contact.metaTitle, description: t.contact.metaDescription, alternates: alternates(locale, "/contact") };
}

export default async function ContactPage({ params }: LangParams) {
  const { locale, t: dict } = await resolveLocale(params);
  const t = dict.contact;
  const info = [
    { icon: Mail, label: t.email, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: t.location, value: SITE.location },
    { icon: CalendarCheck, label: t.availability, value: locale === "en" ? SITE_EN.availability : SITE.availability },
  ];
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-40" aria-labelledby="contact-title">
      <div className="atmosphere absolute inset-0 -z-10" aria-hidden />
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 id="contact-title" className="display-l mt-5">
            {t.title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t.lead}
          </p>
          <ul className="mt-10 space-y-5">
            {info.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="mt-0.5 inline-block break-all font-medium underline-offset-4 hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex gap-2" aria-label={t.networks}>
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
        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
