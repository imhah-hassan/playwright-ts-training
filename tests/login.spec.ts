import { test, expect, Page } from '@playwright/test';
// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });
test('Should login and logout with valid credentials', async ({ page }) => {
    // Login 
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // Verify login
    await expect(page.locator("nav[role='navigation'] a[href*='pim/viewPimModule']")).toBeVisible();

    await page.locator('li.oxd-userdropdown').click();
    await page.locator("a[href*='/auth/logout']").click();
    expect(await page.url()).toContain('/auth/login');

});

test('Should fail login with invalid password', async ({ page }) => {
    // Login 
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('123654');
    await page.locator('button[type="submit"]').click();
    expect(await page.locator("div.oxd-alert p.oxd-alert-content-text")).toHaveText('Invalid credentials');
    await page.pause();
});

test('Should fail login with unkown login', async ({ page }) => {
    // Login 
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('unkown');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();
    expect(await page.locator("div.oxd-alert p.oxd-alert-content-text")).toHaveText('Invalid credentials');
    await page.pause();
});
