const { test, expect } = require('@playwright/test');

test.describe('HeaderNav Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.justinkurdila.com');
	});

	test('Validate home headerNav is visible', async ({ page }) => {
		const headerNav = await page.locator('.wixui-dropdown-menu');
		await expect(headerNav).toBeVisible();
	});

	test('Validate pictures headerNav is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');
		const headerNav = await page.locator('.wixui-dropdown-menu');
		await expect(headerNav).toBeVisible();
	});

	test('Validate Home link element is visible', async ({ page }) => {
		const homeNav = await page.locator('[data-testid="linkElement"]', { hasText: 'HOME' });
		await expect(homeNav).toBeVisible();

		const homeLink = await homeNav.getAttribute('href');
		expect(homeLink).toBe('https://www.justinkurdila.com');
	});

	test('Validate Pictures link element is visible', async ({ page }) => {
		const picutresNav = await page.locator('[data-testid="linkElement"]', { hasText: 'PICTURES' });
		await expect(picutresNav).toBeVisible();

		const picturesLink = await picutresNav.getAttribute('href');
		expect(picturesLink).toBe('https://www.justinkurdila.com/pictures');
	});

	test('Validate Experience link element is visible', async ({ page }) => {
		const experienceNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'EXPERIENCE',
		});
		await expect(experienceNav).toBeVisible();
	});

	test('Validate Education link element is visible', async ({ page }) => {
		const educationNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'EDUCATION',
		});
		await expect(educationNav).toBeVisible();
	});

	test('Validate Skills link element is visible', async ({ page }) => {
		const skillsNav = await page.locator('[data-testid="linkElement"]', { hasText: 'SKILLS' });
		await expect(skillsNav).toBeVisible();
	});

	test('Validate Certifications link element is visible', async ({ page }) => {
		const certificationNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'CERTIFICATIONS',
		});
		await expect(certificationNav).toBeVisible();
	});

	test('Validate Interests link element is visible', async ({ page }) => {
		const interestsNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'INTERESTS AND HOBBIES',
		});
		await expect(interestsNav).toBeVisible();
	});

	test('Validate Pictures Page: Home link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');
		const homeNav = await page.locator('[data-testid="linkElement"]', { hasText: 'HOME' });
		await expect(homeNav).toBeVisible();

		const homeLink = await homeNav.getAttribute('href');
		expect(homeLink).toBe('https://www.justinkurdila.com');
	});

	test('Validate Pictures Page: Pictures link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');
		const picutresNav = await page.locator('[data-testid="linkElement"]', { hasText: 'PICTURES' });
		await expect(picutresNav).toBeVisible();

		const picturesLink = await picutresNav.getAttribute('href');
		expect(picturesLink).toBe('https://www.justinkurdila.com/pictures');
	});

	test('Validate Pictures Page: Experience link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');
		const experienceNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'EXPERIENCE',
		});
		await expect(experienceNav).toBeVisible();
	});

	test('Validate Pictures Page: Education link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');

		const educationNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'EDUCATION',
		});
		await expect(educationNav).toBeVisible();
	});

	test('Validate Pictures Page: Skills link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');

		const skillsNav = await page.locator('[data-testid="linkElement"]', { hasText: 'SKILLS' });
		await expect(skillsNav).toBeVisible();
	});

	test('Validate Pictures Page: Certifications link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');

		const certificationNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'CERTIFICATIONS',
		});
		await expect(certificationNav).toBeVisible();
	});

	test('Validate Pictures Page: Interests link element is visible', async ({ page }) => {
		await page.goto('https://www.justinkurdila.com/pictures');

		const interestsNav = await page.locator('[data-testid="linkElement"]', {
			hasText: 'INTERESTS AND HOBBIES',
		});
		await expect(interestsNav).toBeVisible();
	});
});
