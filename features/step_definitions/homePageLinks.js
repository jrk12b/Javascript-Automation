const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

let driver;
const downloadPath = path.join(__dirname, '../../');

Given('I am on the homepage', { timeout: 20000 }, async function () {
	// Initialize the WebDriver
	const options = new chrome.Options();
	options.addArguments('headless');

	driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

	// Navigate to the homepage
	await driver.get('https://www.justinkurdila.com');
});

When('I click the pictures link', { timeout: 20000 }, async function () {
	// Locate the login button and click it
	const picturesLink = await driver.findElement(By.xpath("//p[contains(text(), 'PICTURES')]"));
	await driver.executeScript('arguments[0].scrollIntoView(true);', picturesLink);
	await driver.wait(until.elementIsVisible(picturesLink), 5000);
	await driver.wait(until.elementIsEnabled(picturesLink), 5000);
	await picturesLink.click();
});

Then('I should land on the pictures page', { timeout: 20000 }, async function () {
	const { expect } = await import('chai');

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.eq('https://www.justinkurdila.com/pictures');

	const slideShowGallery = await driver.findElement(By.css('[class="pro-gallery-parent-container"]'));
	await slideShowGallery.isDisplayed();
	await driver.quit();
});

When('I click the linkedin link', { timeout: 20000 }, async function () {
	const linkedinLink = await driver.findElement(By.css('[aria-label="LinkedIn"]'));
	await linkedinLink.click();
});

Then('I should land on my linkedin page', { timeout: 20000 }, async function () {
	const { expect } = await import('chai');

	await driver.sleep(3000);
	const tabs = await driver.getAllWindowHandles();
	await driver.switchTo().window(tabs[1]);

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.include('https://www.linkedin.com/');

	await driver.switchTo().window(tabs[0]);
	await driver.quit();
});

When('I click the Javascript Automation Github link', { timeout: 20000 }, async function () {
	const javascriptAutomationLink = await driver.findElement(
		By.css('[aria-label="Javascript Automation Git"]')
	);
	await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", javascriptAutomationLink);
	await driver.wait(until.elementIsVisible(javascriptAutomationLink), 5000);
	await driver.wait(until.elementIsEnabled(javascriptAutomationLink), 5000);
	await javascriptAutomationLink.click();
});

Then(
	'I should land on my Javascript Automation Github page',
	{ timeout: 20000 },
	async function () {
		const { expect } = await import('chai');

		const tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[1]);

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).to.eq('https://github.com/jrk12b/Javascript-Automation');

		await driver.switchTo().window(tabs[0]);
		await driver.quit();
	}
);

When('I click the Time of Day Github Link', { timeout: 20000 }, async function () {
	const timeOfDayLink = await driver.findElement(By.css('[aria-label="Time of Day Git"]'));
	await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", timeOfDayLink);
	await driver.wait(until.elementIsVisible(timeOfDayLink), 5000);
	await timeOfDayLink.click();
});

Then('I should land on my Time of Day Github page', { timeout: 20000 }, async function () {
	const { expect } = await import('chai');

	const tabs = await driver.getAllWindowHandles();
	await driver.switchTo().window(tabs[1]);

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.eq('https://github.com/jrk12b/Time-Of-Day');

	await driver.switchTo().window(tabs[0]);
	await driver.quit();
});
