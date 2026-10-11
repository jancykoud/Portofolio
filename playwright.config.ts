import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
// BASE_URL=https://… runs the suite against a deployed preview instead of a local server.
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: "tests",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL ?? `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] }, grep: /@mobile/ },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } } },
    { name: "webkit", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile-safari", use: { ...devices["iPhone 15"] }, grep: /@mobile/ },
  ],
  // Tests run against the production build. Keys are deliberately absent:
  // KOUD AI and the contact form are exercised in their "not configured" state,
  // and the streaming UI with a mocked endpoint — no paid API call is ever made.
  webServer: BASE_URL
    ? undefined
    : {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    env: { ANTHROPIC_API_KEY: "", RESEND_API_KEY: "", CONTACT_RATE_LIMIT: "1000" },
  },
});
