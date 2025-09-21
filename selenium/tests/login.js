const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../helpers/seleniumSetup');
const { testIds } = require('../helpers/selectors');

const isSafari = process.env.SELENIUM_BROWSER === 'safari';

describe('Login Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}login`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
	});

	it('Validate login elements are visible', async function () {
		const welcomeHeader = await driver.findElement(By.xpath('//h2[text()="Welcome,"]'));
		await welcomeHeader.isDisplayed();

		const loginHeader = await driver.findElement(By.xpath('//h5[text()="Login in Book Store"]'));
		await loginHeader.isDisplayed();

		const loginButton = await driver.findElement(By.id(testIds.loginId));
		await loginButton.isDisplayed();

		const newUser = await driver.findElement(By.id(testIds.newUserId));
		await newUser.isDisplayed();
	});

	it('Validate back to login', async function () {
		if (isSafari) this.skip();

		const chai = await import('chai');
		const expect = chai.expect;

		const newUser = await driver.findElement(By.id(testIds.newUserId));
		await driver.executeScript('arguments[0].scrollIntoView(true);', newUser);
		await newUser.click();

		const gotologin = await driver.findElement(By.id('gotologin'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', gotologin);
		await gotologin.click();

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://demoqa.com/login');
	});
});
