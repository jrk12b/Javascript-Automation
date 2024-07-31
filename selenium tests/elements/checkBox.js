const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const config = require('../selenium_config');

const chromeOptions = new chrome.Options();

if (process.env.HEADLESS === 'true') {
	chromeOptions.addArguments('--headless');
}

describe('Check Box Tests', function () {
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
		await label.isDisplayed();

		const menuToggle = await driver.findElement(By.className('rct-collapse-btn'));
		await menuToggle.isDisplayed();

		const homeTitle = await driver.findElement(By.className('rct-title'));
		await homeTitle.isDisplayed();

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		await expandtoggle.isDisplayed();

		const collapseToggle = await driver.findElement(By.className('rct-option-collapse-all'));
		await collapseToggle.isDisplayed();
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
		await expandedTree.isDisplayed();

		const desktopTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Desktop')]")
		);
		await desktopTree.isDisplayed();

		const documentTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Documents')]")
		);
		await documentTree.isDisplayed();
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
		await expandedTree.isDisplayed();

		const desktopTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Desktop')]")
		);
		await desktopTree.isDisplayed();

		const documentTree = await driver.findElement(
			By.xpath("//span[contains(@class, 'rct-title') and contains(text(), 'Documents')]")
		);
		await documentTree.isDisplayed();

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

	it('Validate checking individual file works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const notesFileTree = await driver.findElement(By.css('label[for="tree-node-notes"]'));
		const notesCheckbox = await notesFileTree.findElement(By.className('rct-checkbox'));
		await notesCheckbox.click();

		const result = await driver.findElement(By.id('result'));
		await result.isDisplayed();

		const textSuccess = await driver.findElement(By.className('text-success'));
		await textSuccess.isDisplayed();

		const textContent = await textSuccess.getText();
		expect(textContent).to.eq('notes');
	});

	it('Validate checking individual directory works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className('rct-option-expand-all'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const desktopFileTree = await driver.findElement(By.css('label[for="tree-node-desktop"]'));
		const desktopCheckbox = await desktopFileTree.findElement(By.className('rct-checkbox'));
		await desktopCheckbox.click();

		const result = await driver.findElement(By.id('result'));
		await result.isDisplayed();
		const textContent = await result.getText();

		expect(textContent).to.includes('desktop', 'notes', 'commands');
	});

	it('Validate checking root home directory works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const homeElement = await driver.findElement(By.css('.rct-icon.rct-icon-uncheck'));
		await driver.executeScript('arguments[0].scrollIntoView(true);', homeElement);
		await homeElement.click();

		const result = await driver.findElement(By.id('result'));
		await result.isDisplayed();
		const textContent = await result.getText();

		const results = [
			'desktop',
			'notes',
			'commands',
			'home',
			'documents',
			'workspace',
			'react',
			'angular',
			'veu',
			'office',
			'public',
			'private',
			'classified',
			'general',
			'downloads',
			'wordFile',
			'excelFile',
		];
		results.forEach((result) => {
			expect(textContent).to.include(result);
		});
	});
});
