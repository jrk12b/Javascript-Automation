const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By, Actions } = require('../seleniumSetup');

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

		const loginButton = await driver.findElement(By.id('login'));
		await loginButton.isDisplayed();

		const newUser = await driver.findElement(By.id('newUser'));
		await newUser.isDisplayed();
	});

	it('Validate back to login', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const newUser = await driver.findElement(By.id('newUser'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', newUser);
		await newUser.click();

		const gotologin = await driver.findElement(By.id('gotologin'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', gotologin);
		await gotologin.click();

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://demoqa.com/login');
	});

	it('Validate create new user without recaptcha', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const newUser = await driver.findElement(By.id('newUser'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', newUser);
		await newUser.click();

		const registerHeader = await driver.findElement(By.className('text-center'));
		await registerHeader.isDisplayed();

		const welcomeHeader = await driver.findElement(
			By.xpath('//h4[text()="Register to Book Store"]')
		);
		await welcomeHeader.isDisplayed();

		const firstName = await driver.findElement(By.id('firstname'));
		await firstName.sendKeys('firstTest');

		const lastName = await driver.findElement(By.id('lastname'));
		await lastName.sendKeys('lastTest');

		const userName = await driver.findElement(By.id('userName'));
		await userName.sendKeys('userTest');

		const password = await driver.findElement(By.id('password'));
		await password.sendKeys('userPassword');

		const register = await driver.findElement(By.id('register'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', register);
		await register.click();

		const error = await driver.findElement(By.id('name'));
		const errorText = await error.getText();
		expect(errorText).to.eq('Please verify reCaptcha to register!');
	});
});
