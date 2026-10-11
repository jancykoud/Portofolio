import type { Metadata } from "next";
import { Showroom } from "@/components/projects/Showroom";
import { SectionHeading } from "@/components/ui/Primitives";
import { getProjectFilters, getProjects } from "@/lib/content";
import { alternates, resolveLocale, type LangParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { title: t.projects.metaTitle, description: t.projects.metaDescription, alternates: alternates(locale, "/projets") };
}

export default async function ProjectsPage({ params }: LangParams) {
  const { locale, t } = await resolveLocale(params);
  const [line1, line2] = t.projects.title;
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow={t.projects.eyebrow}
        title={
          <>
            {line1}
            <br className="hidden sm:block" /> {line2}
          </>
        }
        lead={t.projects.lead}
      />
      <div className="mt-12">
        <Showroom projects={getProjects(locale)} filters={getProjectFilters(locale)} />
      </div>
    </div>
  );
}
