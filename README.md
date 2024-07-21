# QA Automation

This repository holds the source code for the QA Automation used to test the website https://www.justinkurdila.com/

## Testing Framework

[QA Manifesto PDF](https://www.justinkurdila.com/_files/ugd/8fbca8_1d4d65417eb94e85a41e5016e15eb902.pdf)

* Jest - Unit/Component Testing
* Postman - Integration API Testing
* K6 - Performance Testing
* Cypress - UI System Testing

## Installation

1. Clone repo locally

* `git clone https://github.com/jrk12b/website_qa_automation.git`

2. Install Dependencies

* `npm i`

3. Install K6 locally

* https://k6.io/docs/get-started/installation/

## Usage

All tests run in Github Actions as defined in `node.js.yml`

* To run jest - `npm run jest`
* To run postman - `npm run postman`
* To run k6 - `npm run k6`
* To open cypress - `npm run cy:open`
* To run cypress in chrome - `npm run cy:run-chrome`
* To run cypress in firefox - `npm run cy:run-firefox`
* To run cypress in edge - `npm run cy:run-edge`
* To run cypress in electron - `npm run cy:run-electron`