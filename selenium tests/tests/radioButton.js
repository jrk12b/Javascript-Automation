const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../seleniumSetup');

describe('Radio button Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}radio-button`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
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

		await driver.sleep(3000);

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

		await driver.sleep(3000);

		const textSuccess = await driver.findElement(By.className('text-success'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', textSuccess);
		await textSuccess.isDisplayed();
		const textContent = await textSuccess.getText();
		expect(textContent).to.includes('Impressive');
	});
});
