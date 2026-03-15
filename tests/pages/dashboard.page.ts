import { Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/web/index.php/dashboard/index');
    }

    async expectDashboardHeader() {
        await expect(this.page.locator("header h6")).toHaveText(/Dashboard/);
    }

    async logout() {
        await this.page.locator('li.oxd-userdropdown').click();
        await this.page.locator("a[href*='/auth/logout']").click();
    }

    async expectPimModuleVisible() {
        await expect(this.page.locator("nav[role='navigation'] a[href*='pim/viewPimModule']")).toBeVisible();
    }
}
