import { Page, expect } from '@playwright/test';

export class EmployeeListPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/web/index.php/pim/viewEmployeeList');
    }

    async clickAddEmployee() {
        await this.page.locator("button[type='button'] i.bi-plus").click({ force: true });
    }

    async expectEmployeeInformationHeader() {
        await expect(this.page.locator("h5.oxd-table-filter-title")).toHaveText(/Employee Information/);
    }

    async searchByLastName(lastName: string) {
        await this.page.locator("xpath=//label[text()='Employee Name']/../..//input").fill(lastName);
        await this.page.locator("button[type='submit']").click();
    }

    async searchById(id: string) {
        await this.page.goto('/web/index.php/pim/viewPimModule');
        await this.page.locator("xpath=//label[text()='Employee Id']/../..//input").fill(id);
        await this.page.locator("button[type='submit']").click();
    }

    async expectSearchResultsGreaterThanZero() {
        const count = await this.page.locator("div.orangehrm-employee-list div[role='row']").count();
        expect(count).toBeGreaterThan(0);
        return count;
    }

    async clickEditFirstEmployee() {
        const row = this.page.locator("div.orangehrm-employee-list div[role='row'] button i.bi-pencil-fill").first();
        await row.click();
    }

    async getFirstEmployeeIdInResults() {
        const employeeId = await this.page.locator("div.orangehrm-employee-list div[role='row']")
            .nth(1)
            .locator("div[role='cell']")
            .nth(1)
            .locator("div").textContent();
        return employeeId || '';
    }

    async deleteSelectedEmployee() {
        await this.page.locator("div.orangehrm-employee-list div[role='row'] span i.bi-check").nth(1).click();
        await this.page.getByText("Delete Selected").click();
        await this.page.getByText("Yes, Delete").click();
    }

    async expectEmptyEmployeeList() {
        await expect(this.page.locator("div.orangehrm-employee-list div[role='row']")).toHaveCount(0);
    }
}
