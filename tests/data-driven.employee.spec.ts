import { test, expect } from '@playwright/test';
import employees from '../data/employees.json';

import { DashboardPage } from './pages/dashboard.page';
import { EmployeeListPage } from './pages/employee-list.page';
import { AddEmployeePage } from './pages/add-employee.page';
import { EmployeeDetailsPage } from './pages/employee-details.page';

test.describe.configure({ mode: 'serial' });  // Stop on first failure

test.use({ storageState: '.auth/storageState.json' });

for (const employee of employees) {

    test(`Should add employee ${employee.firstName} ${employee.lastName} and save details`, async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailsPage = new EmployeeDetailsPage(page);

        await dashboardPage.goto();
        await dashboardPage.expectDashboardHeader();

        // Add employee
        await employeeListPage.goto();
        // await page.pause(); // visually confirm you're logged in

        await employeeListPage.clickAddEmployee();
        await addEmployeePage.fillEmployeeDetails(employee.firstName, employee.lastName, employee.employeeId);
        await addEmployeePage.submit();

        // Add personal details
        await employeeDetailsPage.fillPersonalDetails('French', 'Single', employee.dateOfBirth, 'Male');

        await employeeDetailsPage.savePersonalDetails();
    });
}
