import { Page, expect } from '@playwright/test';

export class EmployeeContactPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectContactDetailsTitle() {
        const text = await this.page.locator("div.orangehrm-edit-employee-content h6.orangehrm-main-title").first().textContent();
        expect(text).toContain('Contact Details');
    }

    async fillAddress(street1: string, street2: string, city: string, zip: string, state: string, country: string) {
        await this.page.locator("xpath=//label[text()='Street 1']/../..//input").fill(street1);
        await this.page.locator("xpath=//label[text()='Street 2']/../..//input").fill(street2);
        await this.page.locator("xpath=//label[text()='City']/../..//input").fill(city);
        await this.page.locator("xpath=//label[text()='Zip/Postal Code']/../..//input").fill(zip);
        await this.page.locator("xpath=//label[text()='State/Province']/../..//input").fill(state);

        await this.page.locator("xpath=//label[text()='Country']/../..//i").click();
        await this.page.getByRole('option', { name: country }).click();
    }

    async fillPhonesAndEmail(home: string, mobile: string, workEmail: string) {
        await this.page.locator("xpath=//label[text()='Home']/../..//input").fill(home);
        await this.page.locator("xpath=//label[text()='Mobile']/../..//input").fill(mobile);
        await this.page.locator("xpath=//label[text()='Work Email']/../..//input").fill(workEmail);
    }

    async save() {
        await this.page.locator("button[type='submit']").first().click();
    }

    async expectHomePhone(phone: string) {
        await expect(this.page.locator("xpath=//label[text()='Home']/../..//input")).toHaveValue(phone);
    }
}
