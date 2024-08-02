const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
require('chromedriver');

// Constants
const BASE_URL = 'https://demoqa.com/';
const TIMEOUT = 30000;
const SELENIUM_SERVER_URL = process.env.SELENIUM_SERVER_URL || '';
const HEADLESS = process.env.HEADLESS === 'true';
const BROWSER = process.env.SELENIUM_BROWSER || 'chrome';

// Browser Options
const chromeOptions = new chrome.Options();
if (HEADLESS) {
	chromeOptions.addArguments('--headless');
}

const firefoxOptions = new firefox.Options();
if (HEADLESS) {
	firefoxOptions.addArguments('--headless');
}

const edgeOptions = new edge.Options();
if (HEADLESS) {
	edgeOptions.addArguments('--headless');
}

// Setup function to initialize the driver
async function setupDriver() {
	let builder = new Builder().usingServer(SELENIUM_SERVER_URL);

	switch (BROWSER) {
		case 'firefox':
			builder = builder.forBrowser('firefox').setFirefoxOptions(firefoxOptions);
			break;
		case 'edge':
			builder = builder.forBrowser('MicrosoftEdge').setEdgeOptions(edgeOptions);
			break;
		case 'safari':
			builder = builder.forBrowser('safari');
			break;
		case 'chrome':
		default:
			builder = builder.forBrowser('chrome').setChromeOptions(chromeOptions);
			break;
	}

	let driver = await builder.build();
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
