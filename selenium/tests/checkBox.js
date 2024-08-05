const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../helpers/seleniumSetup');
const { testIds } = require('../helpers/selectors');

describe('Check Box Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}checkbox`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
	});

	it('Validate Check Box Fields are visible', async function () {
		const label = await driver.findElement(By.xpath("//h1[contains(text(), 'Check Box')]"));
		await label.isDisplayed();

		const menuToggle = await driver.findElement(By.className(testIds.collapseButtonClass));
		await menuToggle.isDisplayed();

		const homeTitle = await driver.findElement(By.className(testIds.titleClass));
		await homeTitle.isDisplayed();

		const expandtoggle = await driver.findElement(By.className(testIds.expandAllClass));
		await expandtoggle.isDisplayed();

		const collapseToggle = await driver.findElement(By.className(testIds.collapseAllClass));
		await collapseToggle.isDisplayed();
	});

	it('Validate Expand All Toggle', async function () {
		const expandtoggle = await driver.findElement(By.className(testIds.expandAllClass));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const expandedTree = await driver.findElement(By.css(testIds.nodeExpandedClasses));
		await expandedTree.isDisplayed();

		const desktopTree = await driver.findElement(
			By.xpath(`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Desktop')]`)
		);
		await desktopTree.isDisplayed();

		const documentTree = await driver.findElement(
			By.xpath(
				`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Documents')]`
			)
		);
		await documentTree.isDisplayed();
	});

	it('Validate Collapse All Toggle', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className(testIds.expandAllClass));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const expandedTree = await driver.findElement(By.css(testIds.nodeExpandedClasses));
		await expandedTree.isDisplayed();

		const desktopTree = await driver.findElement(
			By.xpath(`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Desktop')]`)
		);
		await desktopTree.isDisplayed();

		const documentTree = await driver.findElement(
			By.xpath(
				`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Documents')]`
			)
		);
		await documentTree.isDisplayed();

		const collapseToggle = await driver.findElement(By.className(testIds.collapseAllClass));
		await driver.executeScript('arguments[0].scrollIntoView(true);', collapseToggle);
		await collapseToggle.click();

		const desktopTreeNotVisible = await driver.findElements(
			By.xpath(`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Desktop')]`)
		);
		const documentsTreeNotVisible = await driver.findElements(
			By.xpath(
				`//span[contains(@class, '${testIds.titleClass}') and contains(text(), 'Documents')]`
			)
		);
		expect(desktopTreeNotVisible.length).to.eq(0);
		expect(documentsTreeNotVisible.length).to.eq(0);
	});

	it('Validate checking individual file works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className(testIds.expandAllClass));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const notesFileTree = await driver.findElement(By.css('label[for="tree-node-notes"]'));
		const notesCheckbox = await notesFileTree.findElement(By.className(testIds.rctCheckboxClass));
		await notesCheckbox.click();

		const result = await driver.findElement(By.id(testIds.resultId));
		await result.isDisplayed();

		const textSuccess = await driver.findElement(By.className(testIds.textSuccessClass));
		await textSuccess.isDisplayed();

		const textContent = await textSuccess.getText();
		expect(textContent).to.eq('notes');
	});

	it('Validate checking individual directory works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const expandtoggle = await driver.findElement(By.className(testIds.expandAllClass));
		await driver.executeScript('arguments[0].scrollIntoView(true);', expandtoggle);
		await expandtoggle.click();

		const desktopFileTree = await driver.findElement(By.css('label[for="tree-node-desktop"]'));
		const desktopCheckbox = await desktopFileTree.findElement(
			By.className(testIds.rctCheckboxClass)
		);
		await desktopCheckbox.click();

		const result = await driver.findElement(By.id(testIds.resultId));
		await result.isDisplayed();
		const textContent = await result.getText();

		expect(textContent).to.includes('desktop', 'notes', 'commands');
	});

	it('Validate checking root home directory works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const homeElement = await driver.findElement(By.css(testIds.uncheckIconClasses));
		await driver.executeScript('arguments[0].scrollIntoView(true);', homeElement);
		await homeElement.click();

		const result = await driver.findElement(By.id(testIds.resultId));
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
