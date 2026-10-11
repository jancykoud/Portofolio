"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { CONTRAST_PAIRS, contrastRatio, parseColor } from "@/lib/contrast";
import { useRootFlags } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Row = { label: string; fg: string; bg: string; ratio: number; min: number };

export function ContrastInspector() {
  const { theme, contrast: contrastFlag } = useRootFlags();
  const [rows, setRows] = useState<Row[]>([]);
  const [contrast, setContrast] = useState("standard");

  useEffect(() => {
    // Wait a frame so freshly-applied theme variables are computed.
    const id = requestAnimationFrame(() => {
      const cs = getComputedStyle(document.documentElement);
      setContrast(document.documentElement.dataset.contrast ?? "standard");
      setRows(
        CONTRAST_PAIRS.map((p) => {
          const fg = cs.getPropertyValue(p.fg).trim();
          const bg = cs.getPropertyValue(p.bg).trim();
          const a = parseColor(fg);
          const b = parseColor(bg);
          return { label: p.label, fg, bg, min: p.min, ratio: a && b ? contrastRatio(a, b) : 0 };
        }),
      );
    });
    return () => cancelAnimationFrame(id);
  }, [theme, contrastFlag]);

  const passing = rows.filter((r) => r.ratio >= r.min).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Thème actif : <strong className="font-medium text-fg capitalize">{theme}</strong>
          {contrast === "high" && " (contraste élevé)"} — changez-le dans le Theme Studio, le tableau se recalcule.
        </p>
        <p className="font-mono text-sm" aria-live="polite">
          {passing}/{rows.length} paires conformes WCAG AA
        </p>
      </div>
      <div className="mt-5 overflow-x-auto rounded-[var(--radius)] border border-line">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">Ratios de contraste des tokens du thème actif</caption>
          <thead className="bg-surface-2 text-left text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Paire</th>
              <th scope="col" className="px-4 py-3 font-medium">Aperçu</th>
              <th scope="col" className="px-4 py-3 font-medium">Ratio</th>
              <th scope="col" className="px-4 py-3 font-medium">Seuil</th>
              <th scope="col" className="px-4 py-3 font-medium">Résultat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => {
              const ok = r.ratio >= r.min;
              return (
                <tr key={r.label}>
                  <th scope="row" className="px-4 py-3 text-left font-normal">{r.label}</th>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-md border border-line px-2.5 py-1 font-medium" style={{ color: r.fg, background: r.bg }}>
                      Aa
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">{r.ratio.toFixed(2)}:1</td>
                  <td className="px-4 py-3 font-mono text-muted">{r.min}:1</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1.5", ok ? "text-success" : "text-danger")}>
                      {ok ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
                      {ok ? "Conforme" : "Insuffisant"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
