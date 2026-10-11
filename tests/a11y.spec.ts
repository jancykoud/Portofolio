import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES, setPrefs } from "./helpers";

for (const theme of ["obsidian", "daylight"] as const) {
  test.describe(`axe — ${theme}`, () => {
    for (const path of PAGES) {
      test(`${path} has no serious or critical violations`, async ({ page }) => {
        await setPrefs(page, { theme, motion: "reduced" });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
      });
    }
  });
}
