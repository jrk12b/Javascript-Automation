const { setupDriver, teardownDriver, BASE_URL, TIMEOUT, By } = require('../helpers/seleniumSetup');
const { testIds } = require('../helpers/selectors');

const isSafari = process.env.SELENIUM_BROWSER === 'safari';

describe('Web Tables Tests', function () {
	this.timeout(TIMEOUT);
	let driver;

	before(async function () {
		driver = await setupDriver();
		await driver.get(`${BASE_URL}webtables`);
	});

	beforeEach(async function () {
		await driver.navigate().refresh();
	});

	after(async function () {
		await teardownDriver(driver);
	});

	it('Validate web table Fields are visible', async function () {
		const webTablesWrapper = await driver.findElement(By.className(testIds.webTablesWrapperClass));
		await webTablesWrapper.isDisplayed();

		const addButton = await driver.findElement(By.id(testIds.addNewRecordButtonId));
		await addButton.isDisplayed();

		const searchBox = await driver.findElement(By.id(testIds.searchBoxId));
		await searchBox.isDisplayed();

		const table = await driver.findElement(By.className(testIds.reactTableClass));
		await table.isDisplayed();

		const editItem = await driver.findElement(By.id(testIds.editRecord1Class));
		await editItem.isDisplayed();

		const deleteItem = await driver.findElement(By.id(testIds.deleteRecord1Class));
		await deleteItem.isDisplayed();
	});

	it('Validate adding an entry to the table', async function () {
		const addButton = await driver.findElement(By.id(testIds.addNewRecordButtonId));
		await driver.executeScript('arguments[0].scrollIntoView(true);', addButton);

		await addButton.click();

		const addFrom = await driver.findElement(By.className(testIds.modalContentClass));
		await addFrom.isDisplayed();

		const firstName = await driver.findElement(By.id(testIds.firstNameId));
		await firstName.sendKeys('JustinTest');

		const lastName = await driver.findElement(By.id(testIds.lastNameId));
		await lastName.sendKeys('LastTest');

		const userEmail = await driver.findElement(By.id(testIds.userEmailId));
		await userEmail.sendKeys('email@test.com');

		const age = await driver.findElement(By.id(testIds.ageId));
		await age.sendKeys('30');

		const salary = await driver.findElement(By.id(testIds.salaryId));
		await salary.sendKeys('100');

		const department = await driver.findElement(By.id(testIds.departmentId));
		await department.sendKeys('Test Department');

		const submit = await driver.findElement(By.id(testIds.submitId));
		await submit.click();

		const firstNameResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'JustinTest')]")
		);
		await firstNameResult.isDisplayed();

		const lastNameResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'LastTest')]")
		);
		await lastNameResult.isDisplayed();

		const emailResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'email@test.com')]")
		);
		await emailResult.isDisplayed();

		const ageResult = await driver.findElement(By.xpath("//div[contains(text(), '30')]"));
		await ageResult.isDisplayed();

		const salaryResult = await driver.findElement(By.xpath("//div[contains(text(), '100')]"));
		await salaryResult.isDisplayed();

		const departmentResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'Test Department')]")
		);
		await departmentResult.isDisplayed();
	});

	it('Validate editing an entry in the table', async function () {
		const editItem = await driver.findElement(By.id(testIds.editRecord1Class));
		await driver.executeScript('arguments[0].scrollIntoView(true);', editItem);
		await editItem.click();

		const firstName = await driver.findElement(By.id(testIds.firstNameId));
		await firstName.clear();
		await firstName.sendKeys('UpdatedFirst');

		const lastName = await driver.findElement(By.id(testIds.lastNameId));
		await lastName.clear();
		await lastName.sendKeys('UpdatedLast');

		const userEmail = await driver.findElement(By.id(testIds.userEmailId));
		await userEmail.clear();
		await userEmail.sendKeys('updated@test.com');

		const age = await driver.findElement(By.id(testIds.ageId));
		await age.clear();
		await age.sendKeys('31');

		const salary = await driver.findElement(By.id(testIds.salaryId));
		await salary.clear();
		await salary.sendKeys('101');

		const department = await driver.findElement(By.id(testIds.departmentId));
		await department.clear();
		await department.sendKeys('Updated Department');

		const submit = await driver.findElement(By.id(testIds.submitId));
		await driver.executeScript('arguments[0].scrollIntoView(true);', submit);
		await submit.click();

		const firstNameUpdated = await driver.findElement(
			By.xpath("//div[contains(text(), 'UpdatedFirst')]")
		);
		await firstNameUpdated.isDisplayed();

		const lastNameUpdated = await driver.findElement(
			By.xpath("//div[contains(text(), 'UpdatedLast')]")
		);
		await lastNameUpdated.isDisplayed();

		const emailUpdated = await driver.findElement(
			By.xpath("//div[contains(text(), 'updated@test.com')]")
		);
		await emailUpdated.isDisplayed();

		const ageUpdated = await driver.findElement(By.xpath("//div[contains(text(), '31')]"));
		await ageUpdated.isDisplayed();

		const salaryUpdated = await driver.findElement(By.xpath("//div[contains(text(), '101')]"));
		await salaryUpdated.isDisplayed();

		const departmentUpdated = await driver.findElement(
			By.xpath("//div[contains(text(), 'Updated Department')]")
		);
		await departmentUpdated.isDisplayed();
	});

	it('Validate deleting an entry in the table', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const deleteItem = await driver.findElement(By.id(testIds.deleteRecord1Class));
		await driver.executeScript('arguments[0].scrollIntoView(true);', deleteItem);
		await deleteItem.click();

		const firstNameDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'Cierra')]")
		);
		expect(firstNameDeleted.length).to.eq(0);

		const lastNameDeleted = await driver.findElements(By.xpath("//div[contains(text(), 'Vega')]"));
		expect(lastNameDeleted.length).to.eq(0);

		const ageDeleted = await driver.findElements(By.xpath("//div[contains(text(), '39')]"));
		expect(ageDeleted.length).to.eq(0);

		const emailDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'cierra@example.com')]")
		);
		expect(emailDeleted.length).to.eq(0);

		const salaryDeleted = await driver.findElements(By.xpath("//div[contains(text(), '10000')]"));
		expect(salaryDeleted.length).to.eq(0);

		const departmentDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'Insurance')]")
		);
		expect(departmentDeleted.length).to.eq(0);
	});

	it('Validate search box works', async function () {
		const chai = await import('chai');
		const expect = chai.expect;

		const searchBox = await driver.findElement(By.id(testIds.searchBoxId));
		await searchBox.sendKeys('Cierra');

		const firstNameResult = await driver.findElement(By.xpath("//div[contains(text(), 'Cierra')]"));
		await firstNameResult.isDisplayed();

		const lastNameResult = await driver.findElement(By.xpath("//div[contains(text(), 'Vega')]"));
		await lastNameResult.isDisplayed();

		const emailResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'cierra@example.com')]")
		);
		await emailResult.isDisplayed();

		const ageResult = await driver.findElement(By.xpath("//div[contains(text(), '39')]"));
		await ageResult.isDisplayed();

		const salaryResult = await driver.findElement(By.xpath("//div[contains(text(), '10000')]"));
		await salaryResult.isDisplayed();

		const departmentResult = await driver.findElement(
			By.xpath("//div[contains(text(), 'Insurance')]")
		);
		await departmentResult.isDisplayed();

		const firstNameDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'Alden')]")
		);
		expect(firstNameDeleted.length).to.eq(0);

		const lastNameDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'Cantrell')]")
		);
		expect(lastNameDeleted.length).to.eq(0);

		const ageDeleted = await driver.findElements(By.xpath("//div[contains(text(), '45')]"));
		expect(ageDeleted.length).to.eq(0);

		const emailDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'alden@example.com')]")
		);
		expect(emailDeleted.length).to.eq(0);

		const salaryDeleted = await driver.findElements(By.xpath("//div[contains(text(), '12000')]"));
		expect(salaryDeleted.length).to.eq(0);

		const departmentDeleted = await driver.findElements(
			By.xpath("//div[contains(text(), 'Compliance')]")
		);
		expect(departmentDeleted.length).to.eq(0);
	});
});
