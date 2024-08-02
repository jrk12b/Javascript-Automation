const { testIds } = require('../helpers/selectors');
const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../helpers/seleniumSetup');

const isFirefox = process.env.SELENIUM_BROWSER === 'firefox';

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
		const linksHeader = await driver.findElement(By.className(testIds.textCenterClass));
		await linksHeader.isDisplayed();

		const homeLink = await driver.findElement(By.id(testIds.simpleLinkId));
		await homeLink.isDisplayed();

		const dynamicLink = await driver.findElement(By.id(testIds.dynamicLinkId));
		await dynamicLink.isDisplayed();

		const noContentLink = await driver.findElement(By.id(testIds.noContentId));
		await noContentLink.isDisplayed();

		const movedLink = await driver.findElement(By.id(testIds.movedId));
		await movedLink.isDisplayed();

		const badRequestLink = await driver.findElement(By.id(testIds.badRequestId));
		await badRequestLink.isDisplayed();

		const unauthorizedLink = await driver.findElement(By.id(testIds.unauthorizedId));
		await unauthorizedLink.isDisplayed();

		const forbiddenLink = await driver.findElement(By.id(testIds.forbiddenId));
		await forbiddenLink.isDisplayed();

		const invalidLink = await driver.findElement(By.id(testIds.invalidUrlId));
		await invalidLink.isDisplayed();
	});

	it('Validate Home link ', async function () {
		if (isFirefox) this.skip();
		const chai = await import('chai');
		const expect = chai.expect;

		const homeLink = await driver.findElement(By.id(testIds.simpleLinkId));
		const homeLinkHref = await homeLink.getAttribute('href');
		expect(homeLinkHref).includes('https://demoqa.com');

		await driver.executeScript('arguments[0].scrollIntoView(true);', homeLink);
		await homeLink.click();

		const tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[1]);

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://demoqa.com/');

		await driver.switchTo().window(tabs[0]);
	});

	it('Validate dynamic link ', async function () {
		if (isFirefox) this.skip();
		const chai = await import('chai');
		const expect = chai.expect;

		const homeLink = await driver.findElement(By.id(testIds.simpleLinkId));
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
