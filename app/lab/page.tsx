import type { Metadata } from "next";
import { ContrastInspector } from "@/components/lab/ContrastInspector";
import { GlobeLab } from "@/components/lab/GlobeLab";
import { SectionHeading } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Lab — expérimentations",
  description: "Expérimentations interactives : inspection des contrastes du design system en direct et scène WebGL du portfolio.",
  alternates: { canonical: "/lab" },
};

const EXPERIMENTS = [
  {
    id: "contrast",
    n: "01",
    title: "Contrast Inspector",
    lead: "Les cinq thèmes du site reposent sur des tokens sémantiques. Cet outil lit les variables CSS du thème actif et calcule en direct leurs ratios de contraste WCAG 2.x — les mêmes paires sont vérifiées par les tests automatisés.",
    Component: ContrastInspector,
  },
  {
    id: "globe",
    n: "02",
    title: "Globe de données",
    lead: "La scène abstraite de la page d'accueil, isolée : un nuage de points Three.js rendu par un shader GLSL écrit à la main, sans bibliothèque 3D intermédiaire.",
    Component: GlobeLab,
  },
];

export default function LabPage() {
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Engineering Lab"
        title="Expérimentations et prototypes."
        lead="Des démonstrations interactives qui fonctionnent réellement — un terrain de jeu pour tester des idées de design system, de visualisation et de rendu."
      />
      <div className="mt-16 space-y-24">
        {EXPERIMENTS.map(({ id, n, title, lead, Component }) => (
          <section key={id} id={id} aria-labelledby={`${id}-t`} className="scroll-mt-28 border-t border-line pt-10">
            <div className="max-w-3xl">
              <p className="meta text-accent-fg">Expérience {n}</p>
              <h2 id={`${id}-t`} className="heading-2 mt-3">{title}</h2>
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
