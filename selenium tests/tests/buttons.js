const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By, Actions } = require('../seleniumSetup');

describe('Button Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}buttons`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
	});

	it('Validate Button elements are visible', async function () {
		const doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
		await doubleClickButton.isDisplayed();

		const rightClickButtom = await driver.findElement(By.id('rightClickBtn'));
		await rightClickButtom.isDisplayed();

		const clickButton = await driver.findElement(
			By.xpath("//button[contains(@class, 'btn-primary') and contains(text(), 'Click Me')]")
		);
		await clickButton.isDisplayed();
	});

	it('Validate Double Click Button', async function () {
		await driver.sleep(4000);

		const doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', doubleClickButton);
		let actions = driver.actions({ async: true });
		await actions.doubleClick(doubleClickButton).perform();

		await driver.sleep(4000);

		const doubleClickMessage = await driver.findElement(By.id('doubleClickMessage'));
		await doubleClickMessage.isDisplayed();
	});

	it('Validate single clicking Double Click Button', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', doubleClickButton);
		await doubleClickButton.click();

		const doubleClickMessageNotVisible = await driver.findElements(By.id('doubleClickMessage'));
		expect(doubleClickMessageNotVisible.length).to.eq(0);
	});

	it('Validate right clicking Double Click Button', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
		let actions = driver.actions({ async: true });
		await actions.contextClick(doubleClickButton).perform();

		const doubleClickMessageNotVisible = await driver.findElements(By.id('doubleClickMessage'));
		expect(doubleClickMessageNotVisible.length).to.eq(0);
	});

	it('Validate clicking Right Click Button', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const rightClickButton = await driver.findElement(By.id('rightClickBtn'));
		await rightClickButton.click();

		const rightClickMessageNotVisible = await driver.findElements(By.id('rightClickMessage'));
		expect(rightClickMessageNotVisible.length).to.eq(0);
	});

	it('Validate double clicking Right Click Button', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const rightClickButton = await driver.findElement(By.id('rightClickBtn'));
		let actions = driver.actions({ async: true });
		await actions.doubleClick(rightClickButton).perform();

		const rightClickMessageNotVisible = await driver.findElements(By.id('rightClickMessage'));
		expect(rightClickMessageNotVisible.length).to.eq(0);
	});

	it('Validate Click Button', async function () {
		const clickButton = await driver.findElement(
			By.xpath("//button[contains(@class, 'btn-primary') and text()='Click Me']")
		);
		await driver.executeScript('arguments[0].scrollIntoView(true);', clickButton);
		await clickButton.click();

		const clickbuttonMessage = await driver.findElement(By.id('dynamicClickMessage'));
		await clickbuttonMessage.isDisplayed();
	});

	it('Validate right clicking Click Button', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const clickButton = await driver.findElement(
			By.xpath("//button[contains(@class, 'btn-primary') and text()='Click Me']")
		);
		let actions = driver.actions({ async: true });
		await actions.contextClick(clickButton).perform();

		const clickbuttonMessage = await driver.findElements(By.id('dynamicClickMessage'));
		expect(clickbuttonMessage.length).to.eq(0);
	});
});
