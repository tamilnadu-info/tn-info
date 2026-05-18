import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Root-level config — runs ALL 3 apps sequentially, one test at a time.
 * Uses ports 4000/4001/4002 to avoid conflicts with local dev servers.
 *
 * Usage:
 *   pnpm test:all              → headless
 *   pnpm test:all --headed     → headed (watch every test in a browser)
 *   pnpm test:all --ui         → Playwright UI (interactive panel)
 */

const ROOT = path.resolve(__dirname);

export default defineConfig({
  testDir: ROOT,
  testMatch: [
    "apps/web/src/e2e/**/*.spec.ts",
    "apps/events/src/e2e/**/*.spec.ts",
    "apps/news/src/e2e/**/*.spec.ts",
  ],

  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    // ── Web app ─────────────────────────────────────────────────────────────
    {
      name: "web · Desktop Chrome",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4000" },
    },
    {
      name: "web · Desktop Firefox",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:4000" },
    },
    {
      name: "web · Pixel 5",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:4000" },
    },
    {
      name: "web · iPhone 14",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:4000" },
    },

    // ── Events app ──────────────────────────────────────────────────────────
    {
      name: "events · Desktop Chrome",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4001" },
    },
    {
      name: "events · Pixel 5",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:4001" },
    },
    {
      name: "events · iPhone 14",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:4001" },
    },

    // ── News app ────────────────────────────────────────────────────────────
    {
      name: "news · Desktop Chrome",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4002" },
    },
    {
      name: "news · Pixel 5",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:4002" },
    },
    {
      name: "news · iPhone 14",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:4002" },
    },
  ],

  webServer: [
    {
      name: "web",
      command: "PORT=4000 pnpm --filter @tn-info/web dev",
      url: "http://localhost:4000",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      name: "events",
      command: "pnpm --filter @tn-info/events exec next dev --turbopack --port 4001",
      url: "http://localhost:4001",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      name: "news",
      command: "pnpm --filter @tn-info/news exec next dev --turbopack --port 4002",
      url: "http://localhost:4002",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
});
