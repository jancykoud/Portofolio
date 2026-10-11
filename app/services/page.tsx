import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { AskKoud } from "@/components/chat/AskKoud";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Applications web sur mesure, applications métier et plateformes de données, intégration d'IA, architecture backend, modernisation et conseil technique.",
  alternates: { canonical: "/services" },
};

const PROCESS = [
  { t: "Premier échange", d: "Vous décrivez le besoin ; je pose les questions qui fâchent tôt." },
  { t: "Cadrage", d: "Périmètre, risques, livrables et planning proposés par écrit." },
  { t: "Construction", d: "Livraisons incrémentales, démonstrations régulières, code versionné." },
  { t: "Mise en production", d: "Déploiement, documentation et transmission à votre équipe." },
];

export default function ServicesPage() {
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow="Travailler avec moi"
        title="Des plateformes fiables, pensées pour durer."
        lead="Pour les organisations, startups et équipes qui ont besoin d'un profil d'ingénierie capable d'aller du besoin métier à la production. Chaque prestation s'appuie sur des projets réels."
      />

      <nav aria-label="Prestations" className="mt-10 flex flex-wrap gap-2">
        {SERVICES.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-muted hover:border-line-strong hover:text-fg">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-16 space-y-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id}>
            <section id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-28 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className="meta text-accent-fg">{String(i + 1).padStart(2, "0")}</p>
                  <h2 id={`${s.id}-t`} className="heading-2 mt-3">{s.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed">
                    <span className="text-muted">Le problème — </span>
                    {s.problem}
                  </p>
                  <div className="mt-6">
                    <p className="meta text-muted">Preuves</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.proof.map((p) => (
                        <li key={p.href}>
                          <Link href={p.href} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm hover:border-fg">
                            {p.label} <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="meta text-muted">Livrables</h3>
                    <ul className="mt-3 space-y-2.5">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-3 leading-snug">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="meta text-muted">Démarche</h3>
                    <ol className="mt-3 space-y-2.5">
                      {s.approach.map((a, j) => (
                        <li key={a} className="flex gap-3 leading-snug">
                          <span className="font-mono text-xs text-muted">{j + 1}.</span>
                          {a}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="meta text-muted">Technologies pertinentes</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {s.stack.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <section className="mt-24 sm:mt-32" aria-labelledby="process-title">
        <SectionHeading eyebrow="Modalités" title={<span id="process-title">Comment se passe une collaboration.</span>} lead="Mission freelance, CDI ou collaboration ponctuelle : le format, le budget et les délais sont définis ensemble lors du cadrage. Je ne publie pas de tarif standard." />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <li key={p.t} className="border-t border-line-strong pt-5">
              <span className="meta text-accent-fg">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3">
          <LinkButton href="/contact?sujet=mission" size="lg" icon={<ArrowRight className="size-4" />}>
            Décrire mon projet
          </LinkButton>
          <AskKoud question="Quelle prestation correspond à mon besoin ?" label="Trouver la bonne prestation" />
        </div>
      </section>
    </div>
  );
}
