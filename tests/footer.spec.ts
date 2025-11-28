import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct logo in light mode', async ({ page }) => {
    await page.evaluate(() => {
      window.localStorage.setItem('theme', 'light');
    });
    await page.reload();
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot('footer_light.png');
  });

  test('should have the correct logo in dark mode', async ({ page }) => {
    await page.evaluate(() => {
      window.localStorage.setItem('theme', 'dark');
    });
    await page.reload();
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot('footer_dark.png');
  });
});
