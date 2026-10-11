import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { KoudAILauncher } from "@/components/chat/KoudAILauncher";
import { HydrationMark } from "@/components/layout/HydrationMark";
import { SITE } from "@/content/site";
import { themeBootstrapScript } from "@/lib/theme";
import { LOCALES } from "@/lib/i18n/routing";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.title, template: `%s — ${SITE.name}` },
    description: t.meta.description,
    authors: [{ name: SITE.person, url: SITE.url }],
    creator: SITE.person,
    openGraph: { type: "website", locale: t.meta.ogLocale, siteName: `${SITE.name} — ${SITE.person}`, url: SITE.url },
    twitter: { card: "summary_large_image" },
    alternates: alternates(locale, "/"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fa" },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({ children, params }: LangParams & { children: React.ReactNode }) {
  const { locale, t } = await resolveLocale(params);
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t.nav.skip}
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <KoudAILauncher />
        <HydrationMark />
      </body>
    </html>
  );
}
