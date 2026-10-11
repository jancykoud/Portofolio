"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, Palette, X } from "lucide-react";
import { usePrefs } from "@/lib/hooks";
import { THEMES, THEME_SWATCHES, type Prefs, type ResolvedTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function Swatch({ theme }: { theme: ResolvedTheme | "system" }) {
  if (theme === "system") {
    return (
      <span className="relative flex size-9 shrink-0 overflow-hidden rounded-full border border-line-strong" aria-hidden>
        <span className="w-1/2" style={{ background: THEME_SWATCHES.daylight[0] }} />
        <span className="w-1/2" style={{ background: THEME_SWATCHES.obsidian[0] }} />
      </span>
    );
  }
  const [bg, a, b] = THEME_SWATCHES[theme];
  return (
    <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong" style={{ background: bg }} aria-hidden>
      <span className="size-3.5 rounded-full" style={{ background: a, boxShadow: `6px 4px 0 -2px ${b}` }} />
    </span>
  );
}

function Segmented<T extends string>({
  legend,
  hint,
  value,
  options,
  onChange,
}: {
  legend: string;
  hint: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
      <div className="mt-2.5 grid grid-flow-col auto-cols-fr gap-1 rounded-full border border-line bg-surface-2 p-1">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "relative flex min-h-9 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus",
              value === o.value ? "bg-fg text-bg" : "text-muted hover:text-fg",
            )}
          >
            <input
              type="radio"
              className="sr-only"
              name={legend}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ThemeStudio({ className }: { className?: string }) {
  const { prefs, update } = usePrefs();
  const p: Prefs = prefs ?? { theme: "system", contrast: "standard", motion: "auto", perf: "auto" };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-line-strong hover:bg-surface-2",
          className,
        )}
        aria-label="Ouvrir le Theme Studio (thème, contraste, animations)"
      >
        <Palette className="size-[18px]" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/40" />
        <Dialog.Content
          className="glass fixed top-3 right-3 left-3 z-[95] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[var(--radius-lg)] border border-line-strong p-5 shadow-[var(--shadow)] sm:left-auto sm:w-[380px] sm:top-20 sm:right-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight">Theme Studio</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                Vos préférences sont enregistrées sur cet appareil uniquement.
              </Dialog.Description>
            </div>
            <Dialog.Close className="inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-2" aria-label="Fermer">
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">Thème</legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {THEMES.map((t) => {
                const active = p.theme === t.id;
                return (
                  <label
                    key={t.id}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border p-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                      active ? "border-fg bg-surface-2" : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name="koud-theme"
                      value={t.id}
                      checked={active}
                      onChange={() => update({ theme: t.id })}
                      className="sr-only"
                    />
                    <Swatch theme={t.id} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{t.label}</span>
                      <span className="block truncate text-xs text-muted">{t.hint}</span>
                    </span>
                    {active && <Check className="absolute top-2 right-2 size-3.5 text-accent-fg" aria-hidden />}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5 space-y-4 border-t border-line pt-5">
            <Segmented
              legend="Contraste"
              hint="Renforce textes secondaires et bordures."
              value={p.contrast}
              onChange={(v) => update({ contrast: v })}
              options={[
                { value: "standard", label: "Standard" },
                { value: "high", label: "Élevé" },
              ]}
            />
            <Segmented
              legend="Animations"
              hint="« Auto » respecte le réglage de votre appareil."
              value={p.motion}
              onChange={(v) => update({ motion: v })}
              options={[
                { value: "auto", label: "Auto" },
                { value: "reduced", label: "Réduites" },
              ]}
            />
            <Segmented
              legend="Performance"
              hint="« Allégé » coupe la 3D, les flous et la parallaxe."
              value={p.perf}
              onChange={(v) => update({ perf: v })}
              options={[
                { value: "auto", label: "Auto" },
                { value: "full", label: "Complet" },
                { value: "lite", label: "Allégé" },
              ]}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
