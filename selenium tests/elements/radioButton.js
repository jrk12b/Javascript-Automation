const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const config = require('../selenium_config');

const chromeOptions = new chrome.Options();

if (process.env.HEADLESS === 'true') {
	chromeOptions.addArguments('--headless');
}

describe('Radio button Tests', function () {
	this.timeout(config.timeout);
	let driver;
	const seleniumServerUrl = process.env.SELENIUM_SERVER_URL || '';

	before(async function () {
		driver = await new Builder()
			.usingServer(seleniumServerUrl)
			.forBrowser('chrome')
			.setChromeOptions(chromeOptions)
			.build();
		await driver.get(config.baseUrl);
		await driver.get(`${config.baseUrl}radio-button`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await driver.quit();
	});

	it('Validate Radio button Fields are visible', async function () {
		const chai = await import('chai');
		const expect = chai.expect;
		const yesRadio = await driver.findElement(By.id('yesRadio'));
		await yesRadio.isDisplayed();

		const impressiveRadio = await driver.findElement(By.id('impressiveRadio'));
		await impressiveRadio.isDisplayed();

		const noRadio = await driver.findElement(By.id('noRadio'));
		await noRadio.isDisplayed();

		let classAttribute = await noRadio.getAttribute('class');

		expect(classAttribute).includes('disabled');
	});

	it('Validate yes button radio', async function () {
		const chai = await import('chai');
		const expect = chai.expect;
		const yesRadio = await driver.findElement(By.css('label[for="yesRadio"]'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', yesRadio);
		await yesRadio.click();

		const textSuccess = await driver.findElement(By.className('text-success'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', textSuccess);
		await textSuccess.isDisplayed();
		const textContent = await textSuccess.getText();
		expect(textContent).to.includes('Yes');
	});

	it('Validate Impressive button radio', async function () {
		const chai = await import('chai');
		const expect = chai.expect;
		const impressiveRadio = await driver.findElement(By.css('label[for="impressiveRadio"]'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', impressiveRadio);
		await impressiveRadio.click();

		const textSuccess = await driver.findElement(By.className('text-success'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', textSuccess);
		await textSuccess.isDisplayed();
		const textContent = await textSuccess.getText();
		expect(textContent).to.includes('Impressive');
	});
});
