const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const config = require('../selenium_config');

describe('Text Box Tests', function () {
	this.timeout(config.timeout);
	let driver;
	const seleniumServerUrl = process.env.SELENIUM_SERVER_URL || '';

	beforeEach(async function () {
		driver = await new Builder().usingServer(seleniumServerUrl).forBrowser('chrome').build();
		await driver.get(config.baseUrl);
		const elementsLink = await driver.findElement(By.xpath("//h5[contains(text(), 'Elements')]"));
		await elementsLink.click();
		const textBoxLink = await driver.findElement(By.xpath("//span[contains(text(), 'Text Box')]"));
		await textBoxLink.click();
	});

	afterEach(async function () {
		await driver.quit();
	});

	it('Validate Text Box Fields are visible', async function () {
		const userForm = await driver.findElement(By.id('userForm'));
		await userForm.isDisplayed();

		const userNameLabel = await driver.findElement(By.id('userName-label'));
		await userNameLabel.isDisplayed();

		const userName = await driver.findElement(By.id('userName'));
		await userName.isDisplayed();

		const userEmailLabel = await driver.findElement(By.id('userEmail-label'));
		await userEmailLabel.isDisplayed();

		const userEmail = await driver.findElement(By.id('userEmail'));
		await userEmail.isDisplayed();

		const currentAddressLabel = await driver.findElement(By.id('currentAddress-label'));
		await currentAddressLabel.isDisplayed();

		const currentAddress = await driver.findElement(By.id('currentAddress'));
		await currentAddress.isDisplayed();

		const permanentAddressLabel = await driver.findElement(By.id('permanentAddress-label'));
		await permanentAddressLabel.isDisplayed();

		const permanentAddress = await driver.findElement(By.id('permanentAddress'));
		await permanentAddress.isDisplayed();

		const submitButton = await driver.findElement(By.id('submit'));
		await submitButton.isDisplayed();

		// await driver.sleep(95000);
	});
});
