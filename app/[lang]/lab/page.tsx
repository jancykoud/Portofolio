import type { Metadata } from "next";
import { ContrastInspector } from "@/components/lab/ContrastInspector";
import { GlobeLab } from "@/components/lab/GlobeLab";
import { SectionHeading } from "@/components/ui/Primitives";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.lab.metaTitle, description: t.lab.metaDescription, alternates: alternates(locale, "/lab") };
}

export default async function LabPage({ params }: LangParams) {
  const { t: dict } = await resolveLocale(params);
  const t = dict.lab;
  const experiments = [
    { id: "contrast", n: "01", title: t.contrastTitle, lead: t.contrastLead, Component: ContrastInspector },
    { id: "globe", n: "02", title: t.globeTitle, lead: t.globeLead, Component: GlobeLab },
  ];
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading as="h1" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="mt-16 space-y-24">
        {experiments.map(({ id, n, title, lead, Component }) => (
          <section key={id} id={id} aria-labelledby={`${id}-t`} className="scroll-mt-28 border-t border-line pt-10">
            <div className="max-w-3xl">
              <p className="meta text-accent-fg">{t.experiment(n)}</p>
              <h2 id={`${id}-t`} className="heading-2 mt-3">
                {title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{lead}</p>
            </div>
            <div className="mt-10">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
