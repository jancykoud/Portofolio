import { Playfair_Display, Inter, Syne } from "next/font/google";
import "./globals.css";
import NavTop from "@/components/NavTop";
import FloatingNav from "@/components/FloatingNav";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

/* Kept for blog / work pages that still use font-syne class */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Jancy KOUD BANGA — Ingénieur Fullstack & SIG",
  description:
    "Ingénieur fullstack spécialisé dans les plateformes de données environnementales et scientifiques. React, Node.js, OGC/INSPIRE, IoT, ANR TERRA FORMA.",
  keywords: [
    "ingénieur fullstack",
    "SIG",
    "OGC",
    "INSPIRE",
    "IoT",
    "React",
    "Node.js",
    "CNRS",
    "TERRA FORMA",
  ],
  authors: [{ name: "Jancy KOUD BANGA" }],
  openGraph: {
    title: "Jancy KOUD BANGA — Ingénieur Fullstack & SIG",
    description:
      "Ingénieur fullstack spécialisé dans les plateformes de données environnementales et scientifiques.",
    type: "website",
    locale: "fr_FR",
    url: "https://jancy.dev",
    siteName: "Jancy KOUD BANGA — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jancy KOUD BANGA — Ingénieur Fullstack & SIG",
    description:
      "Ingénieur fullstack spécialisé dans les plateformes de données environnementales et scientifiques.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${syne.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <NavTop />
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
