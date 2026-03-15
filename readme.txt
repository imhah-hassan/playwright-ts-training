npm init playwright@latest

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test employee
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

to show report
    npx playwright show-report

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\playwright.config.ts - Playwright Test configuration

npx playwright test tests\employee.spec.ts 