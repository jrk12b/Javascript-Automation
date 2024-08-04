const { test, expect } = require('@playwright/test');

test('should have the correct title', async ({ page }) => {
	await page.goto('https://www.justinkurdila.com');

	const title = await page.title();
	expect(title).toBe('HOME | Justin Kurdila');
});
