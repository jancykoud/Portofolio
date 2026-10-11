import { expect, test } from "@playwright/test";
import { CONTRAST_PAIRS, contrastRatio, parseColor } from "../lib/contrast";
import { setPrefs } from "./helpers";

const THEMES = ["obsidian", "midnight", "aurora", "daylight", "ivory"] as const;

test.describe("theme system", () => {
  for (const theme of THEMES) {
    for (const contrast of ["standard", "high"] as const) {
      test(`${theme} (${contrast}) meets WCAG AA for every token pair`, async ({ page }) => {
        await setPrefs(page, { theme, contrast });
        await page.goto("/lab");
        const values = await page.evaluate((pairs) => {
          const cs = getComputedStyle(document.documentElement);
          return pairs.map((p) => [cs.getPropertyValue(p.fg).trim(), cs.getPropertyValue(p.bg).trim()]);
        }, CONTRAST_PAIRS.map((p) => ({ fg: p.fg, bg: p.bg })));
        CONTRAST_PAIRS.forEach((pair, i) => {
          const [fg, bg] = values[i]!;
          const ratio = contrastRatio(parseColor(fg!)!, parseColor(bg!)!);
          expect.soft(ratio, `${theme}/${contrast} — ${pair.label} (${fg} on ${bg})`).toBeGreaterThanOrEqual(pair.min);
        });
      });
    }
  }

  test("theme is applied before hydration (no flash) and persists", async ({ page }) => {
    await setPrefs(page, { theme: "ivory" });
    // Read the attribute at the earliest point we can observe: DOMContentLoaded.
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        (window as unknown as { __early: string | undefined }).__early = document.documentElement.dataset.theme;
      });
    });
    await page.goto("/");
    expect(await page.evaluate(() => (window as unknown as { __early: string }).__early)).toBe("ivory");
  });

  test("System follows the OS colour scheme", async ({ browser }) => {
    for (const [scheme, expected] of [
      ["light", "daylight"],
      ["dark", "obsidian"],
    ] as const) {
      const ctx = await browser.newContext({ colorScheme: scheme });
      const page = await ctx.newPage();
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
      await ctx.close();
    }
  });

  test("Theme Studio switches theme, contrast and performance, and persists", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Theme Studio/ }).click();
    const dialog = page.getByRole("dialog", { name: "Theme Studio" });
    await dialog.getByText("Aurora", { exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");
    await dialog.getByText("Élevé", { exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    await dialog.getByText("Allégé", { exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-perf", "lite");
    await page.keyboard.press("Escape");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");
    await expect(page.locator("html")).toHaveAttribute("data-perf", "lite");
  });

  test("theme radios are keyboard operable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Theme Studio/ }).click();
    await page.getByRole("radio", { name: /Midnight/ }).focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");
  });
});

test.describe("motion & performance", () => {
  // Headless Chromium has no GPU: WebGL would run on the CPU (SwiftShader), so the
  // scene must refuse it and keep the static globe. On real GPUs data-scene is "webgl".
  test("software-only WebGL falls back to the static globe", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene", "static");
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator("[data-scene] svg circle").first()).toBeAttached();
  });

  test("WebGL scene renders when a hardware GPU is available", async ({ page, browserName }) => {
    test.skip(!process.env.GPU_TESTS, "requires a GPU-backed browser (set GPU_TESTS=1 and run headed)");
    void browserName;
    await page.goto("/");
    await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene", "webgl", { timeout: 10_000 });
    await expect(page.locator("canvas")).toHaveCount(1);
  });

  test("reduced motion: no WebGL, static globe instead", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await page.waitForTimeout(1500);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator("svg circle").first()).toBeAttached();
    await ctx.close();
  });

  test("lite mode disables WebGL", async ({ page }) => {
    await setPrefs(page, { perf: "lite" });
    await page.goto("/");
    await page.waitForTimeout(1500);
    await expect(page.locator("canvas")).toHaveCount(0);
  });

  test("no WebGL on phones @mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.waitForTimeout(1500);
    await expect(page.locator("canvas")).toHaveCount(0);
  });
});
