import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function Toc({ headings }: { headings: Heading[] }) {
  if (!headings.length) return null;
  return (
    <nav aria-label="Sommaire" className="text-sm">
      <p className="meta text-muted">Sommaire</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn("-ml-px block border-l border-transparent py-1.5 leading-snug text-muted hover:border-accent hover:text-fg", h.depth === 3 ? "pl-7" : "pl-4")}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
