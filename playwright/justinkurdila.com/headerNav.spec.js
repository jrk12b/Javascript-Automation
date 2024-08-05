const { test, expect } = require('@playwright/test');

test.describe('HeaderNav Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.justinkurdila.com');
	});

	test('Validate website has the correct title', async ({ page }) => {
		const title = await page.title();
		expect(title).toBe('HOME | Justin Kurdila');
	});
});
