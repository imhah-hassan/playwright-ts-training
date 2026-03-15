import { Page, expect } from '@playwright/test';

export class EmployeeDetailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async expectEmployeeName(firstName: string, lastName: string) {
        await expect(this.page.locator("div.orangehrm-edit-employee-name h6")).toHaveText(`${firstName} ${lastName}`);
    }

    async fillPersonalDetails(nationality: string, maritalStatus: string, dateOfBirth: string, gender: string) {
        await this.page.locator("xpath=//label[text()='Nationality']/../..//i").click();
        await this.page.getByRole('option', { name: nationality }).click();

        await this.page.locator("xpath=//label[text()='Marital Status']/../..//i").click();
        await this.page.getByRole('option', { name: maritalStatus }).click();

        await this.page.locator("xpath=//label[text()='Date of Birth']/../..//input").fill(dateOfBirth);
        await this.page.locator(`xpath=//label[text()='${gender}']`).click({ force: true });
    }

    async savePersonalDetails() {
        await this.page.locator("button[type='submit']").first().click();
    }

    async expectDateOfBirth(dateStr: string) {
        await expect(this.page.locator("xpath=//label[text()='Date of Birth']/../..//input")).toHaveValue(dateStr);
    }

    async expectPersonalDetailsVisible() {
        await expect(this.page.getByText('Personal Details').first()).toBeVisible();
    }

    async expectUrlContains(path: string) {
        expect(this.page.url()).toContain(path);
    }

    async gotoContactDetails() {
        await this.page.getByRole('link', { name: 'Contact Details' }).click();
    }

    getEmpIdFromUrl(): string {
        return this.page.url();
    }
}
