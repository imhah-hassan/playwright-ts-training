import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { EmployeeListPage } from './pages/employee-list.page';
import { AddEmployeePage } from './pages/add-employee.page';
import { EmployeeDetailsPage } from './pages/employee-details.page';
import { EmployeeContactPage } from './pages/employee-contact.page';

function formatDateToYYYYDDMM(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${day}-${month}`;
}

const employee = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(6),
    dateOfBirth: faker.date.birthdate({ mode: 'age', min: 18, max: 65 }).toISOString().split('T')[0],
    empId: ""
};

test('Should create employee and add details ', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);
    const addEmployeePage = new AddEmployeePage(page);
    const employeeDetailsPage = new EmployeeDetailsPage(page);

    // Create employee
    await dashboardPage.goto();
    await dashboardPage.expectDashboardHeader();

    // Add employee
    await employeeListPage.goto();
    // await page.pause(); // visually confirm you're logged in

    await employeeListPage.clickAddEmployee();
    await addEmployeePage.waitForPageLoad();
    await addEmployeePage.fillEmployeeDetails(employee.firstName, employee.lastName, employee.employeeId);
    await addEmployeePage.submit();

    await employeeDetailsPage.expectEmployeeName(employee.firstName, employee.lastName);

    // Add personal details
    await employeeDetailsPage.fillPersonalDetails('French', 'Single', employee.dateOfBirth, 'Male');
    await employeeDetailsPage.savePersonalDetails();
    await employeeDetailsPage.expectDateOfBirth(formatDateToYYYYDDMM(employee.dateOfBirth));

});
test('Sould search for employee by last name and add contact details ', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);
    const employeeDetailsPage = new EmployeeDetailsPage(page);
    const employeeContactPage = new EmployeeContactPage(page);

    // Search for employee by last name and view details
    await employeeListPage.goto();
    await employeeListPage.expectEmployeeInformationHeader();

    await employeeListPage.searchByLastName(employee.lastName);

    await employeeListPage.expectSearchResultsGreaterThanZero();

    await employeeListPage.clickEditFirstEmployee();
    await page.pause(); // visually confirm you're logged in

    await employeeDetailsPage.expectPersonalDetailsVisible();
    await employeeDetailsPage.expectUrlContains('/pim/viewPersonalDetails/empNumber/');
    employee.empId = employeeDetailsPage.getEmpIdFromUrl();
    console.log(employee);


    // Add contact details
    console.log(employee.empId)
    await employeeDetailsPage.goto(employee.empId);
    // await page.pause(); // visually confirm you're logged in

    await employeeDetailsPage.gotoContactDetails();
    await employeeContactPage.expectContactDetailsTitle();

    await employeeContactPage.fillAddress('29', 'Rue des sablons', 'Paris', '75008', 'Paris', 'France');

    await employeeContactPage.fillPhonesAndEmail('0144556677', '0611223344', 'plw.training@demo.plw');

    await employeeContactPage.save();
    await employeeContactPage.expectHomePhone('0144556677');

});
test('Should search for employee by id and delete ', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);

    // Search for employee by last name 
    await employeeListPage.goto();
    await employeeListPage.expectEmployeeInformationHeader();

    await employeeListPage.searchByLastName(employee.lastName);
    await employeeListPage.expectSearchResultsGreaterThanZero();

    const employeeId = await employeeListPage.getFirstEmployeeIdInResults();
    console.log(employeeId);

    // Search for employee by id and delete
    await employeeListPage.searchById(employeeId);
    await employeeListPage.deleteSelectedEmployee();
    await employeeListPage.expectEmptyEmployeeList();

});

test('Should logout ', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);

    // Logout
    await dashboardPage.goto();
    await dashboardPage.logout();
    await loginPage.expectLoginUrl();
});