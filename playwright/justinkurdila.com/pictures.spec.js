const { test, expect } = require('@playwright/test');

test.describe('Pictures Page Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');
	});

	test('Validate website has the correct title', async ({ page }) => {
		const title = await page.title();
		expect(title).toBe('PICTURES | Justin Kurdila');
	});
});
