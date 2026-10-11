import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="meta text-accent-fg">Erreur 404</p>
      <h1 className="display-l mt-5 max-w-3xl">Cette page n'existe pas (ou plus).</h1>
      <p className="mt-6 max-w-lg text-lg text-muted">Le site a été entièrement repensé ; certaines adresses ont changé.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <LinkButton href="/" icon={<ArrowRight className="size-4" />}>Retour à l'accueil</LinkButton>
        <LinkButton href="/projets" variant="ghost">Voir les projets</LinkButton>
      </div>
    </section>
  );
}
