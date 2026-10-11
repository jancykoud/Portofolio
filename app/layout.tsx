import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { KoudAILauncher } from "@/components/chat/KoudAILauncher";
import { HydrationMark } from "@/components/layout/HydrationMark";
import { SITE } from "@/content/site";
import { themeBootstrapScript } from "@/lib/theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.person}, Software Engineer`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.person, url: SITE.url }],
  creator: SITE.person,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${SITE.name} — ${SITE.person}`,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fa" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <KoudAILauncher />
        <HydrationMark />
      </body>
    </html>
  );
}
