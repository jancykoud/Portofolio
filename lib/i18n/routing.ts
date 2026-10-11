/**
 * Locale routing. French keeps the historical, unprefixed URLs (/projets…);
 * English lives under /en with English slugs (/en/projects…).
 * Internally every page lives in app/[lang]/<french-folder>; next.config.ts
 * rewrites public URLs onto that tree using this table.
 */
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Internal (French folder) segment → public English segment. */
export const EN_SEGMENTS: Record<string, string> = {
  projets: "projects",
  "a-propos": "about",
  services: "services",
  blog: "blog",
  lab: "lab",
  video: "video",
  contact: "contact",
};

const FR_FROM_EN = Object.fromEntries(Object.entries(EN_SEGMENTS).map(([fr, en]) => [en, fr]));

/**
 * Public URL for an internal path, e.g. href("en", "/projets/declic") → "/en/projects/declic".
 * Internal paths are always written with French folder names.
 */
export function href(locale: Locale, internalPath: string): string {
  const [pathname, hash = ""] = internalPath.split("#");
  const clean = pathname === "/" ? "" : pathname!.replace(/\/$/, "");
  const suffix = hash ? `#${hash}` : "";
  if (locale === "fr") return `${clean || "/"}${suffix}`;
  const [first, ...rest] = clean.split("/").filter(Boolean);
  const translated = first ? [EN_SEGMENTS[first] ?? first, ...rest] : [];
  return `/en${translated.length ? `/${translated.join("/")}` : ""}${suffix}`;
}

/**
 * URL → internal path (French folders) and locale. Accepts public URLs
 * (/projets, /en/projects) as well as internal ones (/fr/projets, /en/projets),
 * since usePathname() reports the rewritten path.
 */
export function parsePublicPath(publicPath: string): { locale: Locale; internal: string } {
  let parts = publicPath.split("?")[0]!.split("/").filter(Boolean);
  if (parts[0] === "fr") parts = parts.slice(1);
  else if (parts[0] === "en") {
    const [, first, ...rest] = parts;
    const segs = first ? [FR_FROM_EN[first] ?? first, ...rest] : [];
    return { locale: "en", internal: `/${segs.join("/")}` };
  }
  return { locale: "fr", internal: `/${parts.join("/")}` };
}

/** Same page in the other language. */
export function switchLocaleHref(publicPath: string, target: Locale) {
  return href(target, parsePublicPath(publicPath).internal);
}
