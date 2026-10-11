import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { INTRO_VIDEO, STORYBOARD } from "@/content/video";

export const metadata: Metadata = {
  title: "Vidéo de présentation",
  description: "La vidéo de présentation de Jancy Koud Banga : parcours, approche de l'ingénierie, projets et vision — storyboard et lecteur.",
  alternates: { canonical: "/video" },
};

export default function VideoPage() {
  return (
    <div className="container-page pt-32 sm:pt-40">
      <SectionHeading
        as="h1"
        eyebrow="À propos · Vidéo"
        title="Ma vidéo de présentation."
        lead="Soixante secondes pour comprendre qui je suis, comment je travaille et ce que je construis."
      />

      <div className="mt-12">
        <VideoPlayer source={INTRO_VIDEO} chapters={STORYBOARD} />
      </div>

      <section className="mt-24" aria-labelledby="storyboard-title">
        <SectionHeading
          eyebrow="Storyboard"
          title={<span id="storyboard-title">Structure éditoriale — 60 secondes.</span>}
          lead="Plans réels uniquement : aucune image générée ne me représente, et les captures de projets seront celles autorisées."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STORYBOARD.map((s, i) => (
            <Reveal as="li" key={s.time} delay={i * 50} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-xs text-muted">
                  {s.time} → {s.end}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="meta mr-2 text-[0.65rem] text-accent-fg">Image</span>
                {s.shot}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <span className="meta mr-2 text-[0.65rem] text-accent-fg">Voix</span>
                {s.voice}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <LinkButton href="/a-propos" variant="ghost" icon={<ArrowRight className="size-4" />}>
          Lire mon parcours
        </LinkButton>
        <LinkButton href="/contact" icon={<ArrowRight className="size-4" />}>
          Me contacter
        </LinkButton>
      </div>
    </div>
  );
}
