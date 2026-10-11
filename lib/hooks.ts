"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { applyPrefs, readPrefs, savePrefs, type Prefs } from "@/lib/theme";

function subscribeRoot(cb: () => void) {
  window.addEventListener("koud:prefs", cb);
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion", "data-perf", "data-theme", "data-contrast"] });
  return () => {
    window.removeEventListener("koud:prefs", cb);
    mo.disconnect();
  };
}

/** Effective (resolved) environment flags read from <html> data attributes. */
export function useRootFlags() {
  const motion = useSyncExternalStore(
    subscribeRoot,
    () => document.documentElement.dataset.motion ?? "full",
    () => "full",
  );
  const perf = useSyncExternalStore(
    subscribeRoot,
    () => document.documentElement.dataset.perf ?? "full",
    () => "full",
  );
  const theme = useSyncExternalStore(
    subscribeRoot,
    () => document.documentElement.dataset.theme ?? "obsidian",
    () => "obsidian",
  );
  const contrast = useSyncExternalStore(
    subscribeRoot,
    () => document.documentElement.dataset.contrast ?? "standard",
    () => "standard",
  );
  return { reducedMotion: motion === "reduced", lite: perf === "lite", theme, contrast };
}

/** Stored user preferences + setter that persists and applies them. */
export function usePrefs() {
  const [prefs, setPrefsState] = useState<Prefs | null>(() => (typeof window === "undefined" ? null : readPrefs()));

  useEffect(() => {
    // Re-apply when OS settings change while "system"/"auto" values are in use.
    const queries = ["(prefers-color-scheme: light)", "(prefers-reduced-motion: reduce)", "(prefers-contrast: more)"].map(
      (q) => window.matchMedia(q),
    );
    const onChange = () => applyPrefs(readPrefs(), { animate: true });
    queries.forEach((q) => q.addEventListener("change", onChange));
    return () => queries.forEach((q) => q.removeEventListener("change", onChange));
  }, []);

  const update = (patch: Partial<Prefs>) => {
    const next = { ...(prefs ?? readPrefs()), ...patch };
    setPrefsState(next);
    savePrefs(next);
    applyPrefs(next, { animate: "theme" in patch });
  };

  return { prefs, update };
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
