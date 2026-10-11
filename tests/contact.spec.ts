import { expect, test } from "@playwright/test";

const valid = { name: "Test", email: "test@example.com", subject: "question", message: "Bonjour, ceci est un test.", website: "" };

test.describe("contact API", () => {
  test("rejects invalid payloads with field errors", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, email: "pas-un-email", startedAt: Date.now() - 10_000 } });
    expect(res.status()).toBe(400);
    expect((await res.json()).fields.email).toBeTruthy();
  });

  test("silently accepts honeypot submissions without sending", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, website: "spam", startedAt: Date.now() - 10_000 } });
    expect(res.status()).toBe(200);
  });

  test("without a Resend key it says so and gives the e-mail address", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, startedAt: Date.now() - 10_000 } });
    expect(res.status()).toBe(503);
    expect((await res.json()).message).toContain("fridelinbanga@gmail.com");
  });
});

test.describe("contact form", () => {
  test("client validation shows errors and focuses the first invalid field @mobile", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Envoyer le message/ }).click();
    await expect(page.getByLabel(/^Nom/)).toBeFocused();
    await expect(page.getByLabel(/^Nom/)).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Adresse e-mail invalide.")).toBeVisible();
  });

  test("subject can be preselected from the URL", async ({ page }) => {
    await page.goto("/contact?sujet=emploi");
    await expect(page.getByLabel("Sujet")).toHaveValue("emploi");
  });

  test("shows the server's not-configured message (real API, no key)", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/^Nom/).fill("Ada Lovelace");
    await page.getByLabel(/^E-mail/).fill("ada@example.com");
    await page.getByLabel(/^Message/).fill("Un message de test suffisamment long.");
    await page.waitForTimeout(2600); // the API ignores forms filled in < 2.5 s (anti-bot)
    await page.getByRole("button", { name: /Envoyer le message/ }).click();
    await expect(page.locator("#form-error")).toContainText("pas encore activé");
  });

  test("success state with a mocked delivery", async ({ page }) => {
    await page.route("/api/contact", (route) => route.fulfill({ json: { ok: true } }));
    await page.goto("/contact");
    await page.getByLabel(/^Nom/).fill("Ada Lovelace");
    await page.getByLabel(/^E-mail/).fill("ada@example.com");
    await page.getByLabel(/^Message/).fill("Un message de test suffisamment long.");
    await page.getByRole("button", { name: /Envoyer le message/ }).click();
    await expect(page.getByRole("status")).toContainText("Message envoyé");
  });
});
