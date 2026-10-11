import { expect, test } from "./fixtures";

test.describe("showroom hierarchy", () => {
  test("flagship projects first, others in a compact list @mobile", async ({ page }) => {
    await page.goto("/projets");
    const flagships = page.locator("section[aria-labelledby='flagships-title'] article h3");
    await expect(flagships).toHaveText(["DECLIC", "ESGE Services", "Akili", "Nzoto", "Wmbia"]);
    const others = page.locator("section[aria-labelledby='others-title'] article");
    expect(await others.count()).toBeGreaterThanOrEqual(5);
  });

  test("a filter applies to both sections and hides empty ones", async ({ page }) => {
    await page.goto("/projets?filtre=ecommerce");
    await expect(page.locator("#flagships-title")).toHaveCount(0);
    await expect(page.locator("section[aria-labelledby='others-title'] article h3")).toHaveText(["VY", "CongoStore"]);
  });
});

test.describe("device frames", () => {
  test("desktop screens get a browser bar with the public host, mobile screens a phone frame", async ({ page }) => {
    await page.goto("/projets/akili");
    const region = page.getByRole("region", { name: /Interfaces de Akili/ });
    await expect(region.getByText("edu-connect-web.vercel.app")).toBeVisible();
    await page.getByRole("button", { name: "Mobile", exact: true }).click();
    await expect(region.locator(".rounded-\\[1\\.6rem\\]")).toHaveCount(1);
  });
});

test.describe("sharing and search", () => {
  test("each project has its own Open Graph image, per language", async ({ page, request }) => {
    for (const path of ["/projets/declic", "/en/projects/nzoto"]) {
      await page.goto(path);
      const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(og, path).toMatch(/\/projets\/(declic|nzoto)\/opengraph-image/);
      const res = await request.get(new URL(og!).pathname);
      expect(res.status(), og!).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });

  test("Person and WebSite structured data are present and sourced", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    const person = data["@graph"].find((n: { "@type": string }) => n["@type"] === "Person");
    expect(person.name).toBe("Jancy Koud Banga");
    expect(person.sameAs).toContain("https://github.com/jancykoud");
    expect(person.alumniOf.map((o: { name: string }) => o.name)).toContain("Université de Montpellier");
  });
});
