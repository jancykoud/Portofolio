import { SITE } from "@/content/site";
import { EXPERIENCE, SKILL_GROUPS } from "@/content/experience";
import { href, type Locale } from "@/lib/i18n/routing";

const base = SITE.url.replace(/\/$/, "");

/** schema.org Person + WebSite, built only from published, sourced content. */
export function personJsonLd(locale: Locale) {
  const schools = EXPERIENCE.filter((e) => e.kind === "education").map((e) => e.org.split(" — ").at(-1)!.trim());
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: SITE.person,
        jobTitle: SITE.role,
        url: `${base}${href(locale, "/")}`,
        image: `${base}${SITE.portrait.src}`,
        email: `mailto:${SITE.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Clermont-Ferrand", addressCountry: "FR" },
        sameAs: SITE.socials.map((s) => s.href),
        alumniOf: [...new Set(schools)].map((name) => ({ "@type": "EducationalOrganization", name })),
        knowsAbout: SKILL_GROUPS.flatMap((g) => g.items),
        knowsLanguage: ["fr", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: `${SITE.name} — ${SITE.person}`,
        inLanguage: ["fr", "en"],
        author: { "@id": `${base}/#person` },
      },
    ],
  };
}
