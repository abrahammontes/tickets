import { test, expect } from '@playwright/test';

test.describe('Frontend E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the frontend page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Frontend');
  });

  test('should show frontend status', async ({ page }) => {
    await expect(page.locator('text=Status: Running')).toBeVisible();
  });

  test('should display backend connection status', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Backend Connection');
  });

  test('should connect to backend API', async ({ page }) => {
    await expect(page.locator('text=Connected')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Backend API Tests', () => {
  test('should return health status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe('ok');
  });

  test('should return API info', async ({ request }) => {
    const response = await request.get('/api');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.message).toBe('Welcome to the API');
  });
});
