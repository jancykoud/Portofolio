import { expect, test } from "./fixtures";
import { trackErrors } from "./helpers";

// Netlify injects a comment + line break after <meta charset> on production
// domains only. Reproduce it here so hydration stays clean (React #418).
test("survives a host-injected comment in <head> @mobile", async ({ page }) => {
  await page.route(/\/(en\/about|a-propos)?$/, async (route) => {
    const res = await route.fetch();
    const html = (await res.text()).replace(
      '<meta charSet="utf-8"/>',
      '<meta charSet="utf-8"/>\n<!-- This site is hosted on Netlify. -->',
    );
    await route.fulfill({ response: res, body: html, headers: { ...res.headers(), "content-length": String(Buffer.byteLength(html)) } });
  });
  const errors = trackErrors(page);
  for (const path of ["/", "/en/about"]) {
    await page.goto(path);
    await page.waitForTimeout(500);
  }
  expect(errors).toEqual([]);
});
