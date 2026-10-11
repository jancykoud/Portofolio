/** WCAG 2.x relative luminance & contrast ratio (shared by the Lab and tests). */
export function parseColor(input: string): [number, number, number] | null {
  const s = input.trim().toLowerCase();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(s);
  if (hex) {
    const h = hex[1]!.length === 3 ? [...hex[1]!].map((c) => c + c).join("") : hex[1]!;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(s);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
}

function channel(c: number) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance([r, g, b]: [number, number, number]) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: [number, number, number], b: [number, number, number]) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Text/background pairs every theme must satisfy (AA: 4.5 for text, 3 for UI). */
export const CONTRAST_PAIRS = [
  { fg: "--fg", bg: "--bg", min: 4.5, label: "Texte principal / fond" },
  { fg: "--muted", bg: "--bg", min: 4.5, label: "Texte secondaire / fond" },
  { fg: "--fg", bg: "--surface", min: 4.5, label: "Texte / surface" },
  { fg: "--muted", bg: "--surface", min: 4.5, label: "Texte secondaire / surface" },
  { fg: "--accent-ink", bg: "--accent", min: 4.5, label: "Texte sur accent (boutons)" },
  { fg: "--accent-fg", bg: "--bg", min: 4.5, label: "Accent en texte / fond" },
  { fg: "--accent-fg", bg: "--surface", min: 4.5, label: "Accent en texte / surface" },
  { fg: "--focus", bg: "--bg", min: 3, label: "Anneau de focus / fond" },
] as const;
