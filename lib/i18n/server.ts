import { notFound } from "next/navigation";
import { getDictionary } from "./dictionaries";
import { href, isLocale, type Locale } from "./routing";

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolves and validates the [lang] param in server components. */
export async function resolveLocale(params: Promise<{ lang: string }>): Promise<{ locale: Locale; t: ReturnType<typeof getDictionary> }> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return { locale: lang, t: getDictionary(lang) };
}

/** Canonical + hreflang alternates for an internal path. */
export function alternates(locale: Locale, internalPath: string) {
  return {
    canonical: href(locale, internalPath),
    languages: { fr: href("fr", internalPath), en: href("en", internalPath), "x-default": href("fr", internalPath) },
  };
}
