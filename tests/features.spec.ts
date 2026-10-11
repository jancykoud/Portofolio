import { expect, test } from "./fixtures";

test.describe("unfinished features stay out of sight", () => {
  test("no video CTA, footer link or sitemap entry while the video doesn't exist @mobile", async ({ page, request }) => {
    for (const path of ["/", "/en", "/a-propos"]) {
      await page.goto(path);
      await expect(page.locator('a[href="/video"], a[href="/en/video"]')).toHaveCount(0);
    }
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("/video");
  });

  test("the video page stays reachable but is not indexed", async ({ page }) => {
    await page.goto("/video");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByText("Vidéo en préparation")).toBeVisible();
  });
});
