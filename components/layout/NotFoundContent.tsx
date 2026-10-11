"use client";

import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useDict, useLocale } from "@/lib/i18n/client";
import { href } from "@/lib/i18n/routing";

/** not-found.tsx receives no params: the locale is read from the route on the client. */
export function NotFoundContent() {
  const locale = useLocale();
  const t = useDict().notFound;
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="meta text-accent-fg">{t.eyebrow}</p>
      <h1 className="display-l mt-5 max-w-3xl">{t.title}</h1>
      <p className="mt-6 max-w-lg text-lg text-muted">{t.body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <LinkButton href={href(locale, "/")} icon={<ArrowRight className="size-4" />}>
          {t.home}
        </LinkButton>
        <LinkButton href={href(locale, "/projets")} variant="ghost">
          {t.projects}
        </LinkButton>
      </div>
    </section>
  );
}
