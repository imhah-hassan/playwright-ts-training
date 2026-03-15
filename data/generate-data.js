// Script to generate 100 fake employees and save to data/employee.json
// Run with: node support/generate-data.js

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

function randomEmployee() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        employeeId: faker.string.numeric(5),
        dateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
    };
}

const count = 10;
const employees = Array.from({ length: count }, randomEmployee);

const outputDir = path.resolve(__dirname, '../data');
const outputFile = path.join(outputDir, 'employees.json');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(employees, null, 2), 'utf-8');
console.log(`✅ ${count} employés générés et sauvegardés dans : ${outputFile}`);
