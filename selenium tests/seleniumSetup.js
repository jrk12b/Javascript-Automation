const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

// Constants
const BASE_URL = 'https://demoqa.com/';
const TIMEOUT = 30000;
const SELENIUM_SERVER_URL = process.env.SELENIUM_SERVER_URL || '';
const HEADLESS = process.env.HEADLESS === 'true';

// Chrome Options
const chromeOptions = new chrome.Options();
if (HEADLESS) {
	chromeOptions.addArguments('--headless');
}

// Setup function to initialize the driver
async function setupDriver() {
	let driver = await new Builder()
		.usingServer(SELENIUM_SERVER_URL)
		.forBrowser('chrome')
		.setChromeOptions(chromeOptions)
		.build();
	await driver.get(BASE_URL);
	return driver;
}

// Teardown function to quit the driver
async function teardownDriver(driver) {
	await driver.quit();
}

module.exports = {
	BASE_URL,
	TIMEOUT,
	setupDriver,
	teardownDriver,
	By,
};
