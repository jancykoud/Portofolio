import { ImageResponse } from "next/og";
import { getProject, getProjects } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, LOCALES } from "@/lib/i18n/routing";

export const alt = "KOUD — étude de cas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getProjects(lang).map((p) => ({ lang, slug: p.slug })));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "fr";
  const t = getDictionary(locale);
  const project = getProject(locale, slug);
  const name = project?.name ?? "KOUD";
  const tagline = project?.tagline ?? "";
  const status = project ? t.projects.status[project.status] : "";
  const stack = project?.stack.slice(0, 4) ?? [];
  const accent = project?.cover.hue ?? "#2563eb";

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
          backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}66, rgba(8,11,18,0) 55%)`,
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: "#b9ff66" }} />
            KOUD
          </div>
          {status && (
            <div style={{ display: "flex", fontSize: 22, color: "#0a0f05", background: "#b9ff66", padding: "8px 18px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 2 }}>
              {status}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#b9ff66", letterSpacing: 4, textTransform: "uppercase" }}>
            {locale === "en" ? "Case study" : "Étude de cas"}
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginTop: 16 }}>{name}</div>
          <div style={{ fontSize: 34, color: "#cbd5e1", marginTop: 24, maxWidth: 1000, lineHeight: 1.25 }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {stack.map((s) => (
              <div key={s} style={{ display: "flex", fontSize: 22, color: "#9aa8bc", border: "2px solid #334155", padding: "6px 16px", borderRadius: 999 }}>
                {s}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#9aa8bc" }}>Jancy Koud Banga</div>
        </div>
      </div>
    ),
    size,
  );
}
