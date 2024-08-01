const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../seleniumSetup');

describe('Links Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}links`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
	});

	it('Validate all links are visible', async function () {
		const linksHeader = await driver.findElement(By.className('text-center'));
		await linksHeader.isDisplayed();

		const homeLink = await driver.findElement(By.id('simpleLink'));
		await homeLink.isDisplayed();

		const dynamicLink = await driver.findElement(By.id('dynamicLink'));
		await dynamicLink.isDisplayed();

		const noContentLink = await driver.findElement(By.id('no-content'));
		await noContentLink.isDisplayed();

		const movedLink = await driver.findElement(By.id('moved'));
		await movedLink.isDisplayed();

		const badRequestLink = await driver.findElement(By.id('bad-request'));
		await badRequestLink.isDisplayed();

		const unauthorizedLink = await driver.findElement(By.id('unauthorized'));
		await unauthorizedLink.isDisplayed();

		const forbiddenLink = await driver.findElement(By.id('forbidden'));
		await forbiddenLink.isDisplayed();

		const invalidLink = await driver.findElement(By.id('invalid-url'));
		await invalidLink.isDisplayed();
	});

	it('Validate Home link ', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const homeLink = await driver.findElement(By.id('simpleLink'));
		const homeLinkHref = await homeLink.getAttribute('href');
		expect(homeLinkHref).includes('https://demoqa.com');

		await driver.executeScript('arguments[0].scrollIntoView(true);', homeLink);
		await homeLink.click();

		const tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[1]);

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://demoqa.com/');
	});

	it('Validate dynamic link ', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const homeLink = await driver.findElement(By.id('simpleLink'));
		const homeLinkHref = await homeLink.getAttribute('href');
		expect(homeLinkHref).includes('https://demoqa.com');

		await driver.executeScript('arguments[0].scrollIntoView(true);', homeLink);
		await homeLink.click();

		const tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[1]);

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://demoqa.com/');
	});
});
