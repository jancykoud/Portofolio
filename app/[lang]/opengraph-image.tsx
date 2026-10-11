import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, LOCALES } from "@/lib/i18n/routing";

export const alt = "KOUD — Jancy Koud Banga, Software Engineer & Digital Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "fr");
  const title = t.hero.title.join(" ");
  const subtitle = isLocale(lang) && lang === "en" ? "Jancy Koud Banga — business applications, scientific data, applied AI" : "Jancy Koud Banga — applications métier, données scientifiques, IA appliquée";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#080b12",
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.45), rgba(8,11,18,0) 60%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#b9ff66" }} />
          KOUD
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#b9ff66", letterSpacing: 4, textTransform: "uppercase" }}>Software Engineer · Digital Product Builder</div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, marginTop: 20, maxWidth: 980 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9aa8bc" }}>{subtitle}</div>
      </div>
    ),
    size,
  );
}
