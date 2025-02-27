/// <reference types="cypress" />
import selectors from '../support/selectors.js';
import data from '../support/data.js';

describe('Validating welcome card and navigation elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		cy.waitForPageLoad();
	});

	it('validate gallery of pictures is visible', () => {
		cy.get(selectors.slide_show_gallery_items, { timeout: 10000 }).should('be.visible');
	});

	it('validate header name is visible and is correct font size', () => {
		cy.get('h1', { timeout: 10000 })
			.contains('Justin Kurdila, MSIT')
			.then(($header_text) => {
				cy.get($header_text).should('be.visible');
				cy.get($header_text).should('have.css', 'font-size', '30px');
			});
	});

	it('validate job title is visible and correct css', () => {
		cy.get('p').contains('Senior QA Engineer').should('be.visible');
		cy.get('p')
			.contains('Senior QA Engineer')
			.should('have.css', 'font-size', '14px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate email and address values are visible', () => {
		cy.contains('Email:').should('be.visible');
		cy.contains('justinkurdila@gmail.com').should('be.visible');
		cy.contains('Address:').should('be.visible');
		cy.contains('Atlanta, GA').should('be.visible');
	});

	it('validate email and address values are visible', () => {
		cy.contains('Email:').should('be.visible');
		cy.contains('justinkurdila@gmail.com').should('be.visible');
		cy.contains('Address:').should('be.visible');
		cy.contains('Atlanta, GA').should('be.visible');
	});

	it('validate linkedin icon and link', () => {
		cy.get('img[alt="LinkedIn"]').should('be.visible');
		cy.get('img[alt="LinkedIn"]')
			.parents('a[data-testid="linkElement"]')
			.should('have.attr', 'href', 'https://www.linkedin.com/in/justin-kurdila-69bb42113/');
	});

	it('validate resume pdf download button', () => {
		cy.get('a[aria-label="Resume PDF"]')
			.should('be.visible')
			.and(
				'have.attr',
				'href',
				'https://www.justinkurdila.com/_files/ugd/8fbca8_8ddd4f39453643b4aedd4f2979f6081d.pdf'
			);
	});

	it('validate header in welcome card', () => {
		cy.get('h2').contains("Hello! I'm Justin").should('be.visible');
		cy.get('p').contains(data.header_content).should('be.visible');
	});
});
