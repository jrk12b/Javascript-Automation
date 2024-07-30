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
		await driver.get(`${config.baseUrl}checkbox`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await driver.quit();
	});

	it('Validate Check Box Fields are visible', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const label = await driver.findElement(By.xpath("//h1[contains(text(), 'Check Box')]"));
		expect(await label.isDisplayed()).to.be.true;

		const menuToggle = await driver.findElement(By.className('rct-collapse-btn'));
		expect(await menuToggle.isDisplayed()).to.be.true;

		const homeTitle = await driver.findElement(By.className('rct-title'));
		expect(await homeTitle.isDisplayed()).to.be.true;

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		expect(await expandtoggle.isDisplayed()).to.be.true;

		const collapseToggle = await driver.findElement(By.className('rct-option-collapse-all'));
		expect(await collapseToggle.isDisplayed()).to.be.true;
	});

	it('Validate Expand All Toggle', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const expandedTree = await driver.findElement(
			By.css('.rct-node.rct-node-parent.rct-node-expanded')
		);
		expect(await expandedTree.isDisplayed()).to.be.true;

		const desktopTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Desktop')]")
		);
		expect(await desktopTree.isDisplayed()).to.be.true;

		const documentTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Documents')]")
		);
		expect(await documentTree.isDisplayed()).to.be.true;
	});

	it('Validate Collapse All Toggle', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const expandedTree = await driver.findElement(
			By.css('.rct-node.rct-node-parent.rct-node-expanded')
		);
		expect(await expandedTree.isDisplayed()).to.be.true;

		const desktopTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Desktop')]")
		);
		expect(await desktopTree.isDisplayed()).to.be.true;

		const documentTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Documents')]")
		);
		expect(await documentTree.isDisplayed()).to.be.true;

		const collapseToggle = await driver.findElement(By.className('rct-icon-collapse-all'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', collapseToggle);
		await collapseToggle.click();

		const desktopTreeNotVisible = await driver.findElements(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Desktop')]")
		);
		const documentsTreeNotVisible = await driver.findElements(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Documents')]")
		);
		expect(desktopTreeNotVisible.length).to.eq(0);
		expect(documentsTreeNotVisible.length).to.eq(0);
	});

	it('Validate Checking all works', async function () {});
});
