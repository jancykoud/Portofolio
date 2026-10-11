"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/content/site";
import { useDict, useLocale } from "@/lib/i18n/client";
import { href, parsePublicPath, switchLocaleHref } from "@/lib/i18n/routing";
import { Logo, SOCIAL_ICONS } from "@/components/ui/Icons";
import { ThemeStudio } from "./ThemeStudio";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Compares internal paths (French folders), whatever the locale of the public URL. */
function isActive(pathname: string, internalHref: string) {
  const { internal } = parsePublicPath(pathname);
  return internalHref === "/" ? internal === "/" : internal === internalHref || internal.startsWith(`${internalHref}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useDict();
  const other = locale === "fr" ? "en" : "fr";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 rounded-full border pr-1.5 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5",
          scrolled ? "glass border-line shadow-[var(--shadow)]" : "border-transparent",
        )}
      >
        <Link href={href(locale, "/")} className="inline-flex min-h-11 items-center rounded-full" aria-label={t.nav.homeLabel}>
          <Logo />
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.filter((n) => n.href !== "/contact").map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={href(locale, item.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {t.nav[item.key]}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 bottom-2 h-px origin-left bg-accent-fg transition-transform duration-300 ease-out-expo",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={switchLocaleHref(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.nav.switchLabel}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line font-mono text-xs font-medium tracking-wider transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            {t.nav.switchToShort}
          </a>
          <ThemeStudio />
          <Link href={href(locale, "/contact")} className={buttonClasses("ghost", "md", "hidden sm:inline-flex")}>
            {t.nav.contactCta} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-label={t.nav.openMenu}
            >
              <Menu className="size-5" aria-hidden />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg px-4 pt-3 pb-8 sm:px-5 sm:pt-4">
                <div className="flex h-14 items-center justify-between pl-4">
                  <Dialog.Title asChild>
                    <span><Logo /><span className="sr-only">{t.nav.menu}</span></span>
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">{t.nav.siteNav}</Dialog.Description>
                  <Dialog.Close className="mr-1.5 inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label={t.nav.closeMenu}>
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <nav aria-label={t.nav.mobile} className="mt-8 flex-1 px-2">
                  <ol className="divide-y divide-line border-y border-line">
                    {NAV.map((item, i) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={href(locale, item.href)}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-16 items-baseline gap-4 py-3"
                          >
                            <span className="meta w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                            <span className={cn("text-3xl font-semibold tracking-[-0.035em]", active ? "text-accent-fg" : "text-fg")}>
                              {t.nav[item.key]}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
                <div className="mt-10 flex items-center justify-between px-2">
                  <a href={`mailto:${SITE.email}`} className="text-sm text-muted underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                  <ul className="flex gap-1">
                    {SITE.socials.map((s) => {
                      const Icon = SOCIAL_ICONS[s.label]!;
                      return (
                        <li key={s.label}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-2" aria-label={`${s.label} ${t.nav.newTab}`}>
                            <Icon className="size-[18px]" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
