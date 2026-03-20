import { test as setup, expect } from '@playwright/test';


const authFile = '.auth/storageState.json';

setup('authenticate', async ({ page }) => {
    // 1 . Connexion à l’application
    // Login
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("header h6")).toHaveText(/Dashboard/);
    // 2. Sauvegarder l'état de connexion (cookies, etc.)
    await page.context().storageState({ path: authFile });
});


