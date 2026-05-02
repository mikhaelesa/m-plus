import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    // --- SETUP PROJECTS ---
    {
      name: "setup:admin",
      testMatch: /auth\/admin\.setup\.ts/,
    },
    {
      name: "setup:user",
      testMatch: /auth\/user\.setup\.ts/,
    },

    // --- TEST PROJECT (Hanya menggunakan WebKit) ---
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] }, // Menggunakan profile Safari/WebKit
      dependencies: ["setup:admin", "setup:user"],
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
