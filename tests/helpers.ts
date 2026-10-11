import type { Page } from "@playwright/test";

export const PAGES = ["/", "/projets", "/projets/declic", "/projets/congostore", "/a-propos", "/services", "/blog", "/blog/ogc-sensorthings-guide", "/lab", "/video", "/contact"];

export async function setPrefs(page: Page, prefs: Record<string, string>) {
  await page.addInitScript((p) => window.localStorage.setItem("koud:prefs", JSON.stringify(p)), prefs);
}

/** Collects console errors and uncaught exceptions for a page. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}
