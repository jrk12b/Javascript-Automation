/* eslint-disable import/no-anonymous-default-export */
import { browser } from 'k6/browser';
import { check } from 'k6';
import selectors from '../../cypress/support/selectors.js';

const k6_thresholds = {
	browser_http_req_duration: ['p(95)<20000'], // total time for the request
	browser_http_req_failed: ['rate<0.005'], // the rate of failed requests
	browser_web_vital_lcp: ['p(95)<20000'], // Measures a page's loading performance, specifically Largest Contenful Paint - the render time of the largest image or text block visible in the viewport, relative to when the user first navigated to the page.
	browser_web_vital_fid: ['p(95)<1000'], // Measures a page's interactivity, specifically First Inout Delay - measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing.
	browser_web_vital_cls: ['p(95)<0.6'], // Measures a page's visual stability, specifically Cumulative Layout Shift - a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifecycle of a page
	browser_web_vital_ttfb: ['p(95)<1000'], // Measures the time it takes between the browser request and the start of the response from a server
	browser_web_vital_fcp: ['p(95)<20000'], // Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header.
	checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
};

export const options = {
	scenarios: {
		ui: {
			executor: 'constant-vus',
			vus: 5,
			duration: '30s',
			options: {
				browser: {
					type: 'chromium',
				},
			},
		},
	},
	thresholds: k6_thresholds,
};

export default async function () {
	const browserPage = await browser.newPage();
	const homePage = 'https://www.justinkurdila.com/';
	await browserPage.goto(homePage);

	const navMenu = browserPage.locator(selectors.wix_navigation_menu);
	const navMenuVisible = await navMenu.isVisible();

	const experienceSection = browserPage.locator(selectors.data_anchor_experience);
	const experienceSectionVisible = await experienceSection.isVisible();

	const educationSection = browserPage.locator(selectors.data_anchor_education);
	const educationSectionVisible = await educationSection.isVisible();

	const skillsSection = browserPage.locator(selectors.data_anchor_skills);
	const skillsSectionVisible = await skillsSection.isVisible();

	const certificationsSection = browserPage.locator(selectors.data_anchor_certifications);
	const certificationsSectionVisible = await certificationsSection.isVisible();

	const interestsSection = browserPage.locator(selectors.data_anchor_interests);
	const interestsSectionVisible = await interestsSection.isVisible();

	const slideShowGallery = browserPage.locator(selectors.slide_show_gallery);
	const slideShowGalleryVisible = await slideShowGallery.isVisible();

	const slideShowGalleryItems = browserPage.locator(selectors.slide_show_gallery_items);
	const slideShowGalleryItemsVisible = await slideShowGalleryItems.isVisible();

	const siteHeader = browserPage.locator(selectors.site_header);
	const siteHeaderVisible = await siteHeader.isVisible();

	const contactForm = browserPage.locator(selectors.contact_form);
	const contactFormVisible = await contactForm.isVisible();

	check(navMenuVisible, {
		'navMenu is Visible': (v) => v === true,
	});

	check(experienceSectionVisible, {
		'experienceSection is Visible': (v) => v === true,
	});

	check(educationSectionVisible, {
		'educationSection is Visible': (v) => v === true,
	});

	check(skillsSectionVisible, {
		'skillsSection is Visible': (v) => v === true,
	});

	check(certificationsSectionVisible, {
		'certificationsSection is Visible': (v) => v === true,
	});

	check(interestsSectionVisible, {
		'certificationsSection is Visible': (v) => v === true,
	});

	check(slideShowGalleryVisible, {
		'slideShowGallery is Visible': (v) => v === true,
	});

	check(slideShowGalleryItemsVisible, {
		'slideShowGalleryItems is Visible': (v) => v === true,
	});

	check(siteHeaderVisible, {
		'siteHeader is Visible': (v) => v === true,
	});

	check(contactFormVisible, {
		'contactForm is Visible': (v) => v === true,
	});

	browserPage.close();
}
