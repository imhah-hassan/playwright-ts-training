import { Page, expect } from '@playwright/test';

export class AddEmployeePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForURL(/pim\/addEmployee/);
    }

    async fillEmployeeDetails(firstName: string, lastName: string, employeeId: string) {
        await this.page.locator("input[name='firstName']").fill(firstName);
        await this.page.locator("input[name='lastName']").fill(lastName);
        await this.page.locator("xpath=//label[text()='Employee Id']/../..//input").fill(employeeId);
    }

    async submit() {
        await this.page.locator('button[type="submit"]').click();
    }
}
