const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

Given('I am on the homepage', async function () {
	// Initialize the WebDriver
	const options = new chrome.Options();
	options.addArguments('headless');

	driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

	// Navigate to the homepage
	await driver.get('https://justinkurdila.com');
});

When('I click the pictures link', async function () {
	// Locate the login button and click it
	const picturesLink = await driver.findElement(By.xpath("//p[contains(text(), 'PICTURES')]"));
	await picturesLink.click();
});

Then('I should land on the pictures page', async function () {
	const { expect } = await import('chai');

	const currentUrl = await driver.getCurrentUrl();
	expect(currentUrl).to.eq('https://www.justinkurdila.com/pictures');

	const slideShowGallery = await driver.findElement(By.css('[data-testid="slide-show-gallery"]'));
	await slideShowGallery.isDisplayed();
	await driver.quit();
});
