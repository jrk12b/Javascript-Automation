/// <reference types="cypress" />
import data from '../support/data.js';

describe('Validating professional experience section elements', () => {
	beforeEach(() => {
		cy.visit('https://www.justinkurdila.com/');
		cy.waitForPageLoad();
	});

	it('validate professional experience header exists', () => {
		cy.contains('h2', 'PROFESSIONAL EXPERIENCE').scrollIntoView().should('be.visible');
		cy.contains('h2', 'PROFESSIONAL EXPERIENCE')
			.should('have.css', 'font-size', '20px')
			.and('have.css', 'color', 'rgb(24, 33, 83)');
	});

	it('validate saasoptics application specialist experience', () => {
		cy.contains('h3', 'January 2018 - June 2019').scrollIntoView().should('be.visible');
		cy.contains('p', 'Application Specialist').should('be.visible');
		cy.contains('p', 'SaaSOptics').scrollIntoView().should('be.visible');
	});

	it('validate sharpspring experience', () => {
		cy.contains('h3', 'July 2016 - May 2017').scrollIntoView().should('be.visible');
		cy.contains('p', 'HTML Subject Matter Expert | Technical Lead').should('be.visible');
		cy.contains('p', 'SharpSpring').scrollIntoView().should('be.visible');
		cy.contains('p', data.experience_sharpspring).scrollIntoView().should('be.visible');
	});

	it('validate florida state university experience', () => {
		cy.contains('h3', 'November 2014 - June 2016').scrollIntoView().should('be.visible');
		cy.contains('p', 'Computer Support Technician').should('be.visible');
		cy.contains('p', 'Florida State University').scrollIntoView().should('be.visible');
		cy.contains('p', data.experience_florida_state).scrollIntoView().should('be.visible');
	});
});
