export const THEMES = [
  { id: "system", label: "System", hint: "Suit l'appareil" },
  { id: "obsidian", label: "Obsidian", hint: "Noir premium, vert acide" },
  { id: "midnight", label: "Midnight", hint: "Noir profond, bleu électrique" },
  { id: "aurora", label: "Aurora", hint: "Bleu nuit, violet" },
  { id: "daylight", label: "Daylight", hint: "Clair et éditorial" },
  { id: "ivory", label: "Ivory", hint: "Blanc cassé et noir" },
] as const;

export type ThemeChoice = (typeof THEMES)[number]["id"];
export type ResolvedTheme = Exclude<ThemeChoice, "system">;

export type Prefs = {
  theme: ThemeChoice;
  contrast: "standard" | "high";
  motion: "auto" | "reduced";
  perf: "auto" | "full" | "lite";
};

/** Visitors get their OS preference until they pick a theme in the Theme Studio. */
export const DEFAULT_PREFS: Prefs = { theme: "system", contrast: "standard", motion: "auto", perf: "auto" };

export const PREFS_KEY = "koud:prefs";
export const LIGHT_THEMES: ResolvedTheme[] = ["daylight", "ivory"];

/** Swatches shown in the Theme Studio (mirror of tokens.css). */
export const THEME_SWATCHES: Record<ResolvedTheme, [string, string, string]> = {
  obsidian: ["#080b12", "#b9ff66", "#2563eb"],
  midnight: ["#070a14", "#2563eb", "#06b6d4"],
  aurora: ["#0a0b1e", "#7c3aed", "#8b5cf6"],
  daylight: ["#f6f7fa", "#1d4ed8", "#8b5cf6"],
  ivory: ["#f3f0e8", "#141414", "#a16207"],
};

/**
 * Runs inline in <head> before first paint, so the right theme is applied
 * during SSR hydration with no flash. Keep it dependency-free and ES5.
 * It also removes comments / whitespace text nodes the host may inject into
 * <head> (Netlify adds a "hosted on Netlify" comment on production domains),
 * which would otherwise break React hydration (error #418).
 */
export const themeBootstrapScript = `(function(){var d=document.documentElement,p={};d.classList.add('js');
for(var n=document.head&&document.head.firstChild;n;){var x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!/\\S/.test(n.nodeValue)))n.parentNode.removeChild(n);n=x}try{p=JSON.parse(localStorage.getItem('${PREFS_KEY}')||'{}')||{}}catch(e){}
var mm=function(q){return window.matchMedia&&window.matchMedia(q).matches};
var t=p.theme||'system';if(t==='system'){t=mm('(prefers-color-scheme: light)')?'daylight':'obsidian'}
if(['obsidian','midnight','aurora','daylight','ivory'].indexOf(t)<0){t='obsidian'}
d.setAttribute('data-theme',t);d.setAttribute('data-scheme',(t==='daylight'||t==='ivory')?'light':'dark');
d.setAttribute('data-contrast',p.contrast==='high'||mm('(prefers-contrast: more)')?'high':'standard');
d.setAttribute('data-motion',p.motion==='reduced'||mm('(prefers-reduced-motion: reduce)')?'reduced':'full');
var f=p.perf||'auto';if(f==='auto'){var c=navigator.connection;f=(c&&c.saveData)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)?'lite':'full'}
d.setAttribute('data-perf',f);})();`;

export function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "daylight" : "obsidian";
}

export function readPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<Prefs>) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function applyPrefs(prefs: Prefs, { animate = false } = {}) {
  const root = document.documentElement;
  const theme = resolveTheme(prefs.theme);
  const mm = (q: string) => window.matchMedia(q).matches;
  const reduced = prefs.motion === "reduced" || mm("(prefers-reduced-motion: reduce)");

  if (animate && !reduced) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 360);
  }
  root.dataset.theme = theme;
  root.dataset.scheme = LIGHT_THEMES.includes(theme) ? "light" : "dark";
  root.dataset.contrast = prefs.contrast === "high" || mm("(prefers-contrast: more)") ? "high" : "standard";
  root.dataset.motion = reduced ? "reduced" : "full";

  let perf = prefs.perf;
  if (perf === "auto") {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    perf = conn?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ? "lite" : "full";
  }
  root.dataset.perf = perf;
  window.dispatchEvent(new CustomEvent("koud:prefs"));
}

export function savePrefs(prefs: Prefs) {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* storage unavailable (private mode): preferences simply won't persist */
  }
}
