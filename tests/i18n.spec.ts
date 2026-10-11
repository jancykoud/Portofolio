import { expect, test } from "./fixtures";

const PAIRS: [string, string][] = [
  ["/", "/en"],
  ["/projets", "/en/projects"],
  ["/projets/declic", "/en/projects/declic"],
  ["/a-propos", "/en/about"],
  ["/services", "/en/services"],
  ["/blog", "/en/blog"],
  ["/lab", "/en/lab"],
  ["/video", "/en/video"],
  ["/contact", "/en/contact"],
];

test.describe("internationalisation", () => {
  for (const [fr, en] of PAIRS) {
    test(`${fr} ⇄ ${en}: lang, hreflang and switcher @mobile`, async ({ page }) => {
      await page.goto(fr);
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", new RegExp(`${en}$`));

      await page.getByRole("link", { name: "Read this page in English" }).click();
      await expect(page).toHaveURL(new RegExp(`${en}$`));
      await page.waitForSelector("html[data-hydrated]", { state: "attached" });
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
        "href",
        fr === "/" ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${fr}$`),
      );

      await page.getByRole("link", { name: "Lire cette page en français" }).click();
      await expect(page).toHaveURL(fr === "/" ? /^https?:\/\/[^/]+\/$/ : new RegExp(`${fr}$`));
    });
  }

  test("English pages show translated content and localized links", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("I build");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/en/projects");
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "/en/about");

    await page.goto("/en/projects/declic");
    await expect(page.getByText("A platform for declaring and managing scientific instruments")).toBeVisible();
    await expect(page.getByRole("button", { name: "Researchers" })).toBeVisible();
  });

  test("English showroom filters use English labels", async ({ page }) => {
    await page.goto("/en/projects");
    await page.getByRole("button", { name: /^AI & Data/ }).click();
    await expect(page).toHaveURL(/filtre=ai-data/);
    await expect(page.getByRole("heading", { name: "Wmbia" })).toBeVisible();
  });

  test("French blog articles are marked as French on English pages", async ({ page }) => {
    await page.goto("/en/blog/ogc-sensorthings-guide");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByText("Articles are currently written in French.")).toBeVisible();
    await expect(page.locator(".prose-koud")).toHaveAttribute("lang", "fr");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/blog\/ogc-sensorthings-guide$/);
  });

  test("English contact form validates in English", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: /Send message/ }).click();
    await expect(page.getByText("Invalid email address.")).toBeVisible();
  });

  test("KOUD AI speaks the page language", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /Open KOUD AI/ }).click();
    await expect(page.getByRole("dialog", { name: "KOUD AI" }).getByText("Hi, I'm KOUD AI")).toBeVisible();
  });

  test("internal URLs redirect to their public form", async ({ request }) => {
    for (const [from, to] of [
      ["/fr", "/"],
      ["/fr/projets", "/projets"],
      ["/en/projets", "/en/projects"],
      ["/en/a-propos", "/en/about"],
    ]) {
      const res = await request.get(from!, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(new URL(res.headers()["location"]!, "http://x").pathname, from).toBe(to);
    }
  });

  test("English 404 is localized", async ({ page }) => {
    const res = await page.goto("/en/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn't exist");
  });

  test("Open Graph images exist for both languages", async ({ request }) => {
    for (const p of ["/fr/opengraph-image", "/en/opengraph-image"]) {
      const res = await request.get(p);
      expect(res.status(), p).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });

  test("sitemap lists both languages with alternates", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/en/projects/declic");
    expect(xml).toContain('hreflang="en"');
  });
});
