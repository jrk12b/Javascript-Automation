const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.justinkurdila.com');
	});

	test('Validate website has the correct title', async ({ page }) => {
		const title = await page.title();
		expect(title).toBe('HOME | Justin Kurdila');
	});

	test('Validate Header text is visible', async ({ page }) => {
		const headerText = await page.locator('h3', { hasText: 'Justin Kurdila' });
		await expect(headerText).toBeVisible();
	});
	test('Validate Welcome Card is visible', async ({ page }) => {
		await page.waitForTimeout(3000);

		const headerText = await page.locator('h1', { hasText: 'Justin Kurdila, MSIT' });
		await expect(headerText).toBeVisible();

		const linkedin = await page.locator('[aria-label="LinkedIn"]');
		await expect(linkedin).toBeVisible();

		const jobtitle = await page.locator('#comp-kl68vs56', { hasText: 'Senior QA Engineer' });
		await expect(jobtitle).toBeVisible();

		const emailTitle = await page.locator('#comp-kl695fo1', { hasText: 'justinkurdila@gmail.com' });
		await expect(emailTitle).toBeVisible();

		const addressTitle = await page.locator('#comp-kl696pxa', { hasText: 'Atlanta, GA' });
		await expect(addressTitle).toBeVisible();

		const resumeLink = await page.locator('[aria-label="Resume PDF"]');
		await expect(resumeLink).toBeVisible();

		const coverLetterLink = await page.locator('[aria-label="Cover Letter"]');
		await expect(coverLetterLink).toBeVisible();

		const quoteLink = await page.locator('#comp-kxdkuwi1');
		await expect(quoteLink).toBeVisible();
	});

	test('Validate Intro Card is visible', async ({ page }) => {
		const introCard = await page.locator('#bgLayers_comp-lcm9ng4u');
		await expect(introCard).toBeVisible();

		const helloTitle = await page.locator('#comp-irlsm0yx', { hasText: "Hello! I'm Justin" });
		await expect(helloTitle).toBeVisible();

		const helloParagraph = await page.locator('#comp-kl69ao4k', {
			hasText:
				'10+ years’ experience in high-quality technology and service businesses with 5+ years in software quality assurance. Exceptional level of teamwork and collaboration skills, automated/manual testing, technical support, and troubleshooting. Proven expertise in assuring software performance and reliability by executing manual and automated testing, including test case development and execution, implementation of test plans, and bug tracking.',
		});
		await expect(helloParagraph).toBeVisible();
	});

	test('Validate Online Portfolio Card is visible', async ({ page }) => {
		const headerText = await page.locator('h2', { hasText: 'Online Portfolio' });
		await expect(headerText).toBeVisible();

		const javascriptAutomationLink = await page.locator('[data-testid="stylablebutton-label"]', {
			hasText: 'Javascript Automation Github',
		});
		await expect(javascriptAutomationLink).toBeVisible();

		const qaManifestoLink = await page.locator('[data-testid="stylablebutton-label"]', {
			hasText: 'QA Manifesto PDF',
		});
		await expect(qaManifestoLink).toBeVisible();

		const timeOfDayLink = await page.locator('[data-testid="stylablebutton-label"]', {
			hasText: 'Time of Day Github',
		});
		await expect(timeOfDayLink).toBeVisible();
	});

	test('Validate Professional Experience Card is visible', async ({ page }) => {
		const professionalHeader = await page.locator('#comp-irltdfnr', {
			hasText: 'PROFESSIONAL EXPERIENCE',
		});
		await expect(professionalHeader).toBeVisible();

		const professionalSection = await page.locator('#bgLayers_comp-lcm9ng4u2');
		await expect(professionalSection).toBeVisible();
	});

	test('Validate Education Card is visible', async ({ page }) => {
		const educationHeader = await page.locator('#comp-irlsrue4', { hasText: 'EDUCATION' });
		await expect(educationHeader).toBeVisible();

		const educationSection = await page.locator('#bgLayers_mediairm34ucq19');
		await expect(educationSection).toBeVisible();
	});

	test('Validate Skills Card is visible', async ({ page }) => {
		const skillsHeader = await page.locator('#comp-irlus5zm', { hasText: 'SKILLS' });
		await expect(skillsHeader).toBeVisible();

		const skillsSection = await page.locator('#mediairm34ucr28');
		await expect(skillsSection).toBeVisible();
	});

	test('Validate Certifications Card is visible', async ({ page }) => {
		const certificationsHeader = await page.locator('#comp-ll8en3m81', {
			hasText: 'CERTIFICATIONS',
		});
		await expect(certificationsHeader).toBeVisible();

		const certificationsSection = await page.locator('#comp-lcnj8rsw1');
		await expect(certificationsSection).toBeVisible();
	});

	test('Validate Interests Card is visible', async ({ page }) => {
		const interestsHeader = await page.locator('#comp-irlxays8', {
			hasText: 'INTERESTS AND HOBBIES',
		});
		await expect(interestsHeader).toBeVisible();

		const interstsSection = await page.locator('#bgLayers_comp-kxdi94t7');
		await expect(interstsSection).toBeVisible();
	});

	test('Validate Contact Card is visible', async ({ page }) => {
		const contactHeader = await page.locator('#comp-it8mo0jm', { hasText: 'CONTACT ME' });
		await expect(contactHeader).toBeVisible();

		const contactFooterSection = await page.locator('#SITE_FOOTER');
		await expect(contactFooterSection).toBeVisible();
	});
});
