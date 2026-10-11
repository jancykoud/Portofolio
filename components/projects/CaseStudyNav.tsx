"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // Keep the active tab visible by scrolling the nav itself — scrollIntoView
  // would also scroll the window and cancel the page's anchor scroll.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!nav || !link) return;
    nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2 });
  }, [active]);

  return (
    <nav ref={navRef} aria-label="Sections de l'étude de cas" className="glass sticky top-[84px] z-30 -mx-4 overflow-x-auto border-y border-line px-4 sm:mx-0 sm:rounded-full sm:border sm:px-2">
      <ol className="flex min-w-max gap-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              data-id={s.id}
              aria-current={active === s.id ? "location" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center px-3.5 text-sm transition-colors",
                active === s.id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {s.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-out-expo",
                  active === s.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
