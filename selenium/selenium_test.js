const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function example() {
	// Create a new instance of the Chrome driver
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		// Navigate to a web page
		await driver.get('http://www.google.com');

		// Find the search box using its name attribute
		let searchBox = await driver.findElement(By.name('q'));

		// Type 'Selenium' into the search box
		await searchBox.sendKeys('Selenium');

		// Submit the search form
		await searchBox.submit();

		// Wait until the search results are loaded
		await driver.wait(until.titleContains('Selenium'), 10000);

		// Print the page title
		console.log(await driver.getTitle());
	} finally {
		// Quit the driver
		await driver.quit();
	}
})();
