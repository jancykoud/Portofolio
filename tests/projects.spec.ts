import { expect, test } from "./fixtures";

test.describe("showroom", () => {
  test("filters narrow the list and update the URL", async ({ page }) => {
    await page.goto("/projets");
    const cards = page.locator("main article");
    const total = await cards.count();
    expect(total).toBeGreaterThanOrEqual(8);

    const mobile = page.getByRole("button", { name: /^Mobile/ });
    await mobile.click();
    await expect(mobile).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/filtre=mobile/);
    await expect(cards).toHaveCount(2);
    await expect(page.getByRole("heading", { name: "CongoStore" })).toBeVisible();

    await page.getByRole("button", { name: /^Tous/ }).click();
    await expect(cards).toHaveCount(total);
  });

  test("filter state is restored from the URL", async ({ page }) => {
    await page.goto("/projets?filtre=ai-data");
    await expect(page.getByRole("button", { name: /^IA & Data/ })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("heading", { name: "Wmbia" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "CongoStore" })).toHaveCount(0);
  });

  test("a card opens its case study", async ({ page }) => {
    await page.goto("/projets");
    await page.getByRole("link", { name: "Wmbia", exact: true }).click();
    await expect(page).toHaveURL(/\/projets\/wmbia$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wmbia");
  });
});

test.describe("case study", () => {
  test("DECLIC is confidential: no gallery, interactive architecture diagram", async ({ page }) => {
    await page.goto("/projets/declic");
    await expect(page.getByText("Captures non publiées")).toBeVisible();
    const node = page.getByRole("button", { name: "FROST-Server" });
    await node.click();
    await expect(node).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[aria-live=polite]").filter({ hasText: "SensorThings" }).first()).toBeVisible();
  });

  test("section nav links scroll to their sections", async ({ page }) => {
    await page.goto("/projets/declic");
    await page.getByRole("navigation", { name: "Sections de l'étude de cas" }).getByRole("link", { name: "Défis" }).click();
    await expect(page).toHaveURL(/#defis$/);
    await expect(page.locator("#defis")).toBeInViewport();
  });

  test("next-project link points to another published project", async ({ page }) => {
    await page.goto("/projets/declic");
    const next = page.getByRole("navigation", { name: "Projet suivant" }).getByRole("link");
    await expect(next).toHaveAttribute("href", "/projets/wmbia");
  });
});

test.describe("gallery", () => {
  test("arrows, keyboard and thumbnails navigate; lightbox opens and closes @mobile", async ({ page }) => {
    await page.goto("/projets/congostore");
    const counter = page.getByText(/^0\d \/ 03$/);
    await expect(counter).toHaveText("01 / 03");
    await page.getByRole("button", { name: "Écran suivant" }).first().click();
    await expect(counter).toHaveText("02 / 03");

    const region = page.getByRole("region", { name: /Interfaces de CongoStore/ });
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await expect(counter).toHaveText("03 / 03");
    await page.keyboard.press("ArrowRight");
    await expect(counter).toHaveText("01 / 03");

    await page.getByRole("button", { name: /Afficher : Panier/ }).click();
    await expect(counter).toHaveText("03 / 03");

    await page.getByRole("button", { name: "Plein écran" }).click();
    const lightbox = page.getByRole("dialog");
    await expect(lightbox).toBeVisible();
    await expect(lightbox).toContainText("Panier et récapitulatif");
    await lightbox.getByRole("button", { name: "Zoomer" }).click();
    await expect(lightbox.getByRole("button", { name: "Dézoomer" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("broken external link was removed (CongoStore repo 404)", async ({ page }) => {
    await page.goto("/projets/congostore");
    await expect(page.locator('a[href*="CongoStore---E-commerce"]')).toHaveCount(0);
  });
});
