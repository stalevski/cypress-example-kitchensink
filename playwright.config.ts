import { defineConfig, devices } from '@playwright/test';

// Base URL of the app under test. Override with BASE_URL for Docker/CI.
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8080';

// Page objects are in src/, specs are in tests/. Allure is added as a reporter,
// and webServer runs `npm start` so the app starts automatically before the run.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 7_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Start the app before the run. If REUSE_SERVER is set, the app is already
  // running (for example inside the Docker image), so we skip starting it.
  webServer: process.env.REUSE_SERVER
    ? undefined
    : {
        command: 'npm start',
        url: 'http://localhost:8080/todo',
        timeout: 60_000,
        reuseExistingServer: !process.env.CI,
      },
  outputDir: 'test-results',
});
