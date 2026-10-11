import { expect, test } from "./fixtures";

test.describe("KOUD AI — API (no key configured in tests)", () => {
  test("GET reports configuration status honestly", async ({ request }) => {
    const res = await request.get("/api/chat");
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ configured: false, model: null });
  });

  test("POST without a key returns 503, never a canned answer", async ({ request }) => {
    const res = await request.post("/api/chat", { data: { messages: [{ role: "user", content: "Bonjour" }] } });
    expect(res.status()).toBe(503);
    expect(await res.json()).toEqual({ error: "not_configured" });
  });

  test("cross-origin browser requests are rejected", async ({ request }) => {
    const res = await request.post("/api/chat", {
      headers: { Origin: "https://evil.example" },
      data: { messages: [{ role: "user", content: "Bonjour" }] },
    });
    expect(res.status()).toBe(403);
  });
});

test.describe("KOUD AI — widget", () => {
  test("unconfigured state is explicit and input is disabled @mobile", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Ouvrir KOUD AI/ }).click();
    const dialog = page.getByRole("dialog", { name: "KOUD AI" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Non activé")).toBeVisible();
    await expect(dialog.getByText(/pas encore activé/)).toBeVisible();
    await expect(dialog.getByLabel("Votre question")).toBeDisabled();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  // UI plumbing test: the endpoint is mocked, so this checks streaming display,
  // link rendering and session history — not the model's answers.
  test("streams a reply, renders safe links, keeps session history (mocked endpoint)", async ({ page }) => {
    await page.route("/api/chat", async (route) => {
      if (route.request().method() === "GET") return route.fulfill({ json: { configured: true, model: "test" } });
      const body = route.request().postDataJSON() as { messages: { role: string; content: string }[] };
      expect(body.messages.at(-1)?.content).toBe("Parle-moi de DECLIC");
      return route.fulfill({
        contentType: "text/plain; charset=utf-8",
        body: "DECLIC est une **application métier** confidentielle. [Voir DECLIC](/projets/declic) [piège](javascript:alert(1))",
      });
    });
    await page.goto("/");
    await page.getByRole("button", { name: /Ouvrir KOUD AI/ }).click();
    const dialog = page.getByRole("dialog", { name: "KOUD AI" });
    await expect(dialog.getByText("En ligne")).toBeVisible();
    await dialog.getByRole("button", { name: "Parle-moi de DECLIC" }).click();
    await expect(dialog.getByText("application métier")).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Voir DECLIC" })).toHaveAttribute("href", "/projets/declic");
    await expect(dialog.getByRole("link", { name: "piège" })).toHaveCount(0);

    await page.reload();
    await page.getByRole("button", { name: /Ouvrir KOUD AI/ }).click();
    await expect(page.getByRole("dialog").getByText("application métier")).toBeVisible();
    await page.getByRole("button", { name: "Réinitialiser" }).click();
    await expect(page.getByRole("dialog").getByText("Bonjour, je suis KOUD AI")).toBeVisible();
  });

  test("rate-limit errors are surfaced to the user (mocked endpoint)", async ({ page }) => {
    await page.route("/api/chat", (route) =>
      route.request().method() === "GET"
        ? route.fulfill({ json: { configured: true } })
        : route.fulfill({ status: 429, json: { error: "rate_limited", retryAfter: 42 } }),
    );
    await page.goto("/");
    await page.getByRole("button", { name: /Ouvrir KOUD AI/ }).click();
    const input = page.getByLabel("Votre question");
    await input.fill("Bonjour");
    await input.press("Enter");
    await expect(page.getByRole("dialog").getByRole("alert")).toContainText("42 s");
  });

  test("site CTAs can open the assistant with a question", async ({ page }) => {
    await page.goto("/projets/wmbia");
    await page.getByRole("button", { name: "Demander à KOUD AI" }).click();
    await expect(page.getByRole("dialog", { name: "KOUD AI" })).toBeVisible();
  });
});
