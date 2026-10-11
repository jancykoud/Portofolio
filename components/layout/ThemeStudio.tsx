"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, Palette, X } from "lucide-react";
import { usePrefs } from "@/lib/hooks";
import { THEMES, THEME_SWATCHES, type Prefs, type ResolvedTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useDict } from "@/lib/i18n/client";

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
  const t = useDict().theme;
  const p: Prefs = prefs ?? { theme: "system", contrast: "standard", motion: "auto", perf: "auto" };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-line-strong hover:bg-surface-2",
          className,
        )}
        aria-label={t.open}
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
              <Dialog.Title className="text-lg font-semibold tracking-tight">{t.title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {t.description}
              </Dialog.Description>
            </div>
            <Dialog.Close className="inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-2" aria-label={t.close}>
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">{t.theme}</legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {THEMES.map((th) => {
                const active = p.theme === th.id;
                return (
                  <label
                    key={th.id}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border p-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                      active ? "border-fg bg-surface-2" : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name="koud-theme"
                      value={th.id}
                      checked={active}
                      onChange={() => update({ theme: th.id })}
                      className="sr-only"
                    />
                    <Swatch theme={th.id} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{th.label}</span>
                      <span className="block truncate text-xs text-muted">{t.hints[th.id]}</span>
                    </span>
                    {active && <Check className="absolute top-2 right-2 size-3.5 text-accent-fg" aria-hidden />}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5 space-y-4 border-t border-line pt-5">
            <Segmented
              legend={t.contrast}
              hint={t.contrastHint}
              value={p.contrast}
              onChange={(v) => update({ contrast: v })}
              options={[
                { value: "standard", label: t.standard },
                { value: "high", label: t.high },
              ]}
            />
            <Segmented
              legend={t.motion}
              hint={t.motionHint}
              value={p.motion}
              onChange={(v) => update({ motion: v })}
              options={[
                { value: "auto", label: t.auto },
                { value: "reduced", label: t.reduced },
              ]}
            />
            <Segmented
              legend={t.perf}
              hint={t.perfHint}
              value={p.perf}
              onChange={(v) => update({ perf: v })}
              options={[
                { value: "auto", label: t.auto },
                { value: "full", label: t.full },
                { value: "lite", label: t.lite },
              ]}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
