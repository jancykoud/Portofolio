import { test as base, expect } from "@playwright/test";

/**
 * `page.goto` waits for React hydration, so interactions never hit server-rendered
 * markup that has no event handlers yet (flaky under CPU load otherwise).
 */
export const test = base.extend({
  page: async ({ page }, provide) => {
    const goto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const res = await goto(url, options);
      if (res && res.status() < 400) await page.waitForSelector("html[data-hydrated]", { state: "attached", timeout: 30_000 });
      return res;
    };
    const reload = page.reload.bind(page);
    page.reload = async (options) => {
      const res = await reload(options);
      await page.waitForSelector("html[data-hydrated]", { state: "attached", timeout: 30_000 });
      return res;
    };
    await provide(page);
  },
});

export { expect };
