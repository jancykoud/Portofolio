import { expect, test } from "./fixtures";
import { PAGES, trackErrors } from "./helpers";

test.describe("navigation & pages", () => {
  for (const path of PAGES) {
    test(`${path} renders with one h1 and no console error @mobile`, async ({ page }) => {
      const errors = trackErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#contenu")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test("legacy URLs redirect permanently", async ({ request }) => {
    for (const [from, to] of [
      ["/work", "/projets"],
      ["/resume", "/a-propos"],
      ["/fun", "/a-propos"],
    ]) {
      const res = await request.get(from!, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()["location"]).toBe(to);
    }
  });

  test("unknown route shows the 404 page", async ({ page }) => {
    const res = await page.goto("/nexiste-pas");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("n'existe pas");
  });

  test("draft projects are not published", async ({ request }) => {
    for (const slug of ["carhilo", "esge-services"]) {
      expect((await request.get(`/projets/${slug}`)).status()).toBe(404);
    }
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/projets/declic");
    expect(sitemap).not.toContain("/projets/carhilo");
  });

  test("desktop nav marks the current page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "Projets" }).click();
    await expect(page).toHaveURL(/\/projets$/);
    await expect(page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "Projets" })).toHaveAttribute("aria-current", "page");
  });

  test("mobile menu opens, navigates and closes with Escape @mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page.getByRole("navigation", { name: "Navigation mobile" }).getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("skip link moves focus to main content", async ({ page, browserName }) => {
    await page.goto("/");
    // Safari only tabs to links with Option+Tab (macOS default).
    await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
    const skip = page.getByRole("link", { name: "Aller au contenu" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#contenu$/);
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});
