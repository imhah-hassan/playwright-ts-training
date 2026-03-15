import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/web/index.php/auth/login');
    }

    async login(username: string, password: string) {
        await this.page.locator('input[name="username"]').fill(username);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }

    async expectInvalidCredentials() {
        await expect(this.page.locator("div.oxd-alert p.oxd-alert-content-text")).toHaveText('Invalid credentials');
    }

    async expectLoginUrl() {
        expect(this.page.url()).toContain('/auth/login');
    }
}
