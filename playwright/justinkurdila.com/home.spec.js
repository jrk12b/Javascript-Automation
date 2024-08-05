const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.justinkurdila.com');
	});

	test('Validate website has the correct title', async ({ page }) => {
		const title = await page.title();
		expect(title).toBe('HOME | Justin Kurdila');
	});

	test('Validate Header text is visible', async ({ page }) => {});

	test('Validate HeaderNav is visible and links', async ({ page }) => {});

	test('Validate Welcome Card is visible', async ({ page }) => {});

	test('Validate Intro Card is visible', async ({ page }) => {});

	test('Validate Online Portfolio Card is visible', async ({ page }) => {});

	test('Validate Professional Experience Card is visible', async ({ page }) => {});

	test('Validate Education Card is visible', async ({ page }) => {});

	test('Validate Skills Card is visible', async ({ page }) => {});

	test('Validate Certifications Card is visible', async ({ page }) => {});

	test('Validate Interests Card is visible', async ({ page }) => {});

	test('Validate Contact Card is visible', async ({ page }) => {});
});
