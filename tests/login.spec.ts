import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('Should login and logout with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login 
    await loginPage.goto();
    console.log('Viewport:', await page.viewportSize());
    await loginPage.login('Admin', 'admin123');

    // Verify login
    await dashboardPage.expectPimModuleVisible();

    await dashboardPage.logout();
    await loginPage.expectLoginUrl();
});

test('Should fail login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login 
    await loginPage.goto();
    console.log('Viewport:', await page.viewportSize());
    await loginPage.login('Admin', '123654');

    await loginPage.expectInvalidCredentials();
    await page.pause();
});

test('Should fail login with unkown login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Login 
    await loginPage.goto();
    console.log('Viewport:', await page.viewportSize());
    await loginPage.login('unkown', 'admin123');

    await loginPage.expectInvalidCredentials();
    await page.pause();
});
