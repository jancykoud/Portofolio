import type { Metadata } from "next";
import { CalendarCheck, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { SOCIAL_ICONS } from "@/components/ui/Icons";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une mission, une idée ou une question ? Contactez Jancy Koud Banga.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const info = [
    { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Localisation", value: SITE.location },
    { icon: CalendarCheck, label: "Disponibilité", value: SITE.availability },
  ];
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-40" aria-labelledby="contact-title">
      <div className="atmosphere absolute inset-0 -z-10" aria-hidden />
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 id="contact-title" className="display-l mt-5">
            Discutons de votre projet.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Une mission, une idée ou simplement une question ? Toutes les opportunités sont étudiées, et je réponds personnellement.
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
          <ul className="mt-10 flex gap-2" aria-label="Réseaux">
            {SITE.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label]!;
              return (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (nouvel onglet)`} className="inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-line-strong">
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
