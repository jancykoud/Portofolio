"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/content/site";
import { Logo, SOCIAL_ICONS } from "@/components/ui/Icons";
import { ThemeStudio } from "./ThemeStudio";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
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
        <Link href="/" className="inline-flex min-h-11 items-center rounded-full" aria-label={`${SITE.name} — accueil`}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.filter((n) => n.href !== "/contact").map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
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
          <ThemeStudio />
          <Link href="/contact" className={buttonClasses("ghost", "md", "hidden sm:inline-flex")}>
            Me contacter <ArrowRight className="size-4" aria-hidden />
          </Link>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" aria-hidden />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg px-4 pt-3 pb-8 sm:px-5 sm:pt-4">
                <div className="flex h-14 items-center justify-between pl-4">
                  <Dialog.Title asChild>
                    <span><Logo /><span className="sr-only">Menu</span></span>
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">Navigation du site</Dialog.Description>
                  <Dialog.Close className="mr-1.5 inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Fermer le menu">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <nav aria-label="Navigation mobile" className="mt-8 flex-1 px-2">
                  <ol className="divide-y divide-line border-y border-line">
                    {NAV.map((item, i) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-16 items-baseline gap-4 py-3"
                          >
                            <span className="meta w-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                            <span className={cn("text-3xl font-semibold tracking-[-0.035em]", active ? "text-accent-fg" : "text-fg")}>
                              {item.label}
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
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-2" aria-label={`${s.label} (nouvel onglet)`}>
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
