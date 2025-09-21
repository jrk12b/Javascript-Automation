/// <reference types="cypress" />
import selectors from '../support/selectors.js';
import data from '../support/data.js';

describe('Validating welcome card and navigation elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		cy.waitForPageLoad();
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
		cy.get('p').contains('Senior QA/DevOps Engineer').should('be.visible');
		cy.get('p')
			.contains('Senior QA/DevOps Engineer')
			.should('have.css', 'font-size', '14px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate email and address values are visible', () => {
		cy.contains('Email:').should('be.visible');
		cy.contains('justinkurdila@gmail.com').should('be.visible');
		cy.contains('Address:').should('be.visible');
		cy.contains('Charlotte, NC').should('be.visible');
	});

	it('validate email and address values are visible', () => {
		cy.contains('Email:').should('be.visible');
		cy.contains('justinkurdila@gmail.com').should('be.visible');
		cy.contains('Address:').should('be.visible');
		cy.contains('Charlotte, NC').should('be.visible');
	});

	it('validate header in welcome card', () => {
		cy.get('h2').contains("Hello! I'm Justin").should('be.visible');
	});
});
