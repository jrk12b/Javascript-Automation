const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const config = require('../selenium_config');

const chromeOptions = new chrome.Options();

if (process.env.HEADLESS === 'true') {
	chromeOptions.addArguments('--headless');
}

describe('Text Box Tests', function () {
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
		await driver.get(`${config.baseUrl}text-box`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await driver.quit();
	});

	it('Validate Text Box Fields are visible', async function () {
		const userForm = await driver.findElement(By.id('userForm'));
		await userForm.isDisplayed();

		const elements = ['userName', 'userEmail', 'currentAddress', 'permanentAddress'];
		for (const element of elements) {
			let label = await driver.findElement(By.id(`${element}-label`));
			await label.isDisplayed();

			let field = await driver.findElement(By.id(`${element}`));
			await field.isDisplayed();
		}

		const submitButton = await driver.findElement(By.id('submit'));
		await submitButton.isDisplayed();
	});

	it('Validate full name field submits', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const userName = await driver.findElement(By.id('userName'));
		await userName.sendKeys('JustinTest');

		const submitButton = await driver.findElement(By.id('submit'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
		await submitButton.click();

		const output = await driver.findElement(By.id('output'));

		await driver.executeScript('arguments[0].scrollIntoView(true);', output);

		const outputName = await output.findElement(By.id('name'));

		await outputName.isDisplayed();

		const outputText = await outputName.getText();

		expect(outputText).to.include('JustinTest');
	});

	it('Validate email field submits', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const userEmail = await driver.findElement(By.id('userEmail'));
		await userEmail.sendKeys('justin@test.com');

		const submitButton = await driver.findElement(By.id('submit'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
		await submitButton.click();

		const output = await driver.findElement(By.id('output'));

		await driver.executeScript('arguments[0].scrollIntoView(true);', output);

		const outputName = await output.findElement(By.id('email'));

		await outputName.isDisplayed();

		const outputText = await outputName.getText();

		expect(outputText).to.include('justin@test.com');
	});

	it('Validate current address field submits', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const currentAddress = await driver.findElement(By.id('currentAddress'));
		await currentAddress.sendKeys('123 Current Drive');

		const submitButton = await driver.findElement(By.id('submit'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
		await submitButton.click();

		const output = await driver.findElement(By.id('output'));

		await driver.executeScript('arguments[0].scrollIntoView(true);', output);

		const outputName = await output.findElement(By.id('currentAddress'));

		await outputName.isDisplayed();

		const outputText = await outputName.getText();

		expect(outputText).to.include('123 Current Drive');
	});

	it('Validate permanent address field submits', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const permanentAddress = await driver.findElement(By.id('permanentAddress'));
		await permanentAddress.sendKeys('123 Permanent Drive');

		const submitButton = await driver.findElement(By.id('submit'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
		await submitButton.click();

		const output = await driver.findElement(By.id('output'));

		await driver.executeScript('arguments[0].scrollIntoView(true);', output);

		const outputName = await output.findElement(By.id('permanentAddress'));

		await outputName.isDisplayed();

		const outputText = await outputName.getText();

		expect(outputText).to.include('123 Permanent Drive');
	});
});
