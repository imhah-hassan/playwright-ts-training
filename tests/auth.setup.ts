import { request, test as setup, expect } from '@playwright/test';


const authFile = '.auth/storageState.json';

/*
setup('authenticate', async ({ page }) => {
    // 1 . Connexion à l’application
    // Login
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('Orangehrm$2026');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("header h6")).toHaveText(/Dashboard/);
    // 2. Sauvegarder l'état de connexion (cookies, etc.)
    await page.context().storageState({ path: authFile });
});

*/

setup('do login with API and save state', async ({ page }) => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('/web/index.php/auth/login');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();

    const tokenMatch = body.match(/:token="&quot;(.*)&quot;/);
    const token = tokenMatch ? tokenMatch[1] : null;
    expect(token).not.toBeNull();

    const loginResponse = await apiContext.post('/web/index.php/auth/validate', {
        form: {
            username: 'Admin',
            password: 'Orangehrm$2026',
            _token: token!,
        },
    });
    expect(loginResponse.ok()).toBeTruthy();
    await apiContext.storageState({ path: '.auth/storageState.json' });
});