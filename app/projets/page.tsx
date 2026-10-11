import type { Metadata } from "next";
import { Showroom } from "@/components/projects/Showroom";
import { SectionHeading } from "@/components/ui/Primitives";
import { getProjectFilters, publishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets",
  description: "Applications métier, plateformes de données, IA et produits web : les projets de Jancy Koud Banga, avec leur contexte, leur architecture et leur statut réel.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsPage() {
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Mes réalisations"
        title={<>Des projets concrets,<br className="hidden sm:block" /> des problèmes réels.</>}
        lead="Chaque projet indique son statut réel — en production, en démo, en cours ou confidentiel — et uniquement des informations vérifiables."
      />
      <div className="mt-12">
        <Showroom projects={publishedProjects} filters={getProjectFilters()} />
      </div>
    </div>
  );
}
