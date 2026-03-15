import { test, expect, Page } from '@playwright/test';
import employees from '../data/employees.json';


test.describe.configure({ mode: 'serial' });  // Stop on first failure

test.use({ storageState: '.auth/storageState.json' });

for (const employee of employees) {

    test(`Should add employee ${employee.firstName} ${employee.lastName} and save details`, async ({ page }) => {
        await page.goto('/web/index.php/dashboard/index');
        await expect(page.locator("header h6")).toHaveText(/Dashboard/);
        // Add employee
        await page.goto('/web/index.php/pim/viewEmployeeList');
        // await page.pause(); // visually confirm you're logged in

        await page.locator("button[type='button'] i.bi-plus").click({ force: true });
        await page.locator("input[name='firstName']").fill(employee.firstName);
        await page.locator("input[name='lastName']").fill(employee.lastName);
        await page.locator("xpath=//label[text()='Employee Id']/../..//input").fill(employee.employeeId);
        await page.locator('button[type="submit"]').click();

        // Add personal details
        await page.locator("xpath=//label[text()='Nationality']/../..//i").click();
        await page.getByRole('option', { name: 'French' }).click();

        await page.locator("xpath=//label[text()='Marital Status']/../..//i").click();
        await page.getByRole('option', { name: 'Single' }).click();

        await page.locator("xpath=//label[text()='Date of Birth']/../..//input").fill(employee.dateOfBirth);
        await page.locator("xpath=//label[text()='Male']").click({ force: true });

        await page.locator("button[type='submit']").first().click();
    });
};
