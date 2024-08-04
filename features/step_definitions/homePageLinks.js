const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

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
	await picturesLink.click();
});

Then('I should land on the pictures page', { timeout: 20000 }, async function () {
	const { expect } = await import('chai');

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.eq('https://www.justinkurdila.com/pictures');

	const slideShowGallery = await driver.findElement(By.css('[data-testid="slide-show-gallery"]'));
	await slideShowGallery.isDisplayed();
	await driver.quit();
});

When('I click the linkedin link', { timeout: 70000 }, async function () {
	const linkedinLink = await driver.findElement(By.css('[aria-label="LinkedIn"]'));
	await linkedinLink.click();
});

Then('I should land on my linkedin page', { timeout: 20000 }, async function () {
	const { expect } = await import('chai');

	const tabs = await driver.getAllWindowHandles();
	await driver.switchTo().window(tabs[1]);

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.eq('https://www.linkedin.com/in/justin-kurdila-69bb42113/');

	await driver.switchTo().window(tabs[0]);
	await driver.quit();
});
