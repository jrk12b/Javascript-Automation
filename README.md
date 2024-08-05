# Javascript QA Automation

This repository holds the QA Automation to test the website https://www.justinkurdila.com/ and https://demoqa.com/

## Testing Framework

[QA Manifesto PDF](https://www.justinkurdila.com/_files/ugd/8fbca8_1d4d65417eb94e85a41e5016e15eb902.pdf)

- Jest - Unit/Component Testing
- Postman - Integration API Testing
- Cucumber/Gherkin - BDD Given/When/Then Functional Testing
- Playwright - Integration/System Testing
- K6 - Performance Testing
- Cypress - UI System Testing
- Selenium - UI System Testing
- Chai - Test assertion Library
- Mocha - Test framework for running/organizing tests

## Browser Coverage

- Cypress, Playwright, and Selenium tests are configured to run against the following browsers:
  - Chrome
  - Firefox
  - Edge
  - Electron
  - Safari (Webkit)

## Installation

1. Clone repo locally

- `git clone https://github.com/jrk12b/Javascript-Automation.git`

2. Install Dependencies

- `npm i`

3. Install K6 locally

- https://k6.io/docs/get-started/installation/

## Usage

All tests run in Github Actions as defined in `node.js.yml`

- To run jest - `npm run jest`
- To run postman - `npm run postman`
- To run k6 - `npm run k6`
- To open cypress - `npm run cy:open`
- To run cypress in chrome - `npm run cy:run-chrome`
- To run cypress in firefox - `npm run cy:run-firefox`
- To run cypress in edge - `npm run cy:run-edge`
- To run cypress in electron - `npm run cy:run-electron`
- To run cucumber: `npm run cucumber`
- To run playwright: `npm run playwright`
- To run playwright in chrome: `npm run playwright:chrome`
- To run playwright in firefox: `npm run playwright:firefox`
- To run playwright in webkit: `npm run playwright:webkit`
- To run selenium: `npm run selenium`
