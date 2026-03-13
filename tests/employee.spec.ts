import { test, expect } from '@playwright/test';

test('Should create an employee and logout', async ({ page }) => {
    // Login
    await page.goto('/web/index.php/auth/login');
    console.log('Viewport:', await page.viewportSize());
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // Create employee
    const employee = {
        firstName: "Playwright",
        lastName: "Training",
        employeeId: Math.floor(Math.random() * 1000000 + 1000000).toString(),
        dateOfBirth: "1995-02-15",
        empId: ""
    };
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

    // Search for employee by last name and view details
    await page.goto('/web/index.php/pim/viewPimModule');
    await page.locator("xpath=//label[text()='Employee Name']/../..//input").fill(employee.lastName);
    await page.locator("button[type='submit']").click();
    const row = page.locator("div.orangehrm-employee-list div[role='row'] button i.bi-pencil-fill").first();
    await row.click();
    await page.pause(); // visually confirm you're logged in

    await expect(page.getByText('Personal Details').first()).toBeVisible();
    expect(await page.url()).toContain('/pim/viewPersonalDetails/empNumber/');
    employee.empId = page.url();
    console.log(employee);


    // Add contact details
    console.log(employee.empId)
    await page.goto(employee.empId)
    // await page.pause(); // visually confirm you're logged in

    await page.getByRole('link', { name: 'Contact Details' }).click();
    expect(await page.locator("div.orangehrm-edit-employee-content h6.orangehrm-main-title").first().textContent()).toContain('Contact Details');


    await page.locator("xpath=//label[text()='Street 1']/../..//input").fill('29');
    await page.locator("xpath=//label[text()='Street 2']/../..//input").fill('Rue des sablons');
    await page.locator("xpath=//label[text()='City']/../..//input").fill('Paris');
    await page.locator("xpath=//label[text()='Zip/Postal Code']/../..//input").fill('75008');
    await page.locator("xpath=//label[text()='State/Province']/../..//input").fill('Paris');


    await page.locator("xpath=//label[text()='Country']/../..//i").click();
    await page.getByRole('option', { name: 'France' }).click();

    await page.locator("xpath=//label[text()='Home']/../..//input").fill('0144556677');
    await page.locator("xpath=//label[text()='Mobile']/../..//input").fill('0611223344');
    await page.locator("xpath=//label[text()='Work Email']/../..//input").fill('plw.training@demo.plw');

    await page.locator("button[type='submit']").first().click();

    // Search for employee by id and delete
    await page.goto('/web/index.php/pim/viewPimModule');
    await page.locator("xpath=//label[text()='Employee Id']/../..//input").fill(employee.employeeId);
    await page.locator("button[type='submit']").click();
    await page.locator("div.orangehrm-employee-list div[role='row'] span i.bi-check").nth(1).click();
    await page.getByText("Delete Selected").click();
    await page.getByText("Yes, Delete").click();
    expect(await page.locator("div.orangehrm-employee-list div[role='row']")).toHaveCount(0);

    // Logout
    await page.locator('li.oxd-userdropdown').click();
    await page.locator("a[href*='/auth/logout']").click();
    expect(await page.url()).toContain('/auth/login');


});