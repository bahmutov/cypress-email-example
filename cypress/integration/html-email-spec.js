// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('sends an HTML email', () => {
    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type('joe@acme.io')
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()
    cy.location('pathname').should('equal', '/confirm')
    // by now the SMTP server has probably received the email
    cy.task('getLastEmail', 'joe@acme.io')
      .its('html') // check the HTML email text
      .then((html) => {
        // load the email in the current test browser
        cy.document().invoke('write', html)
      })
    cy.contains('#message', '654agc')
      .should('be.visible')
      // I have added small wait to make sure the video shows the email
      // otherwise it passes way too quickly!
      .wait(2000)
    cy.contains('Confirm registration').click()
    cy.location('pathname').should('equal', '/confirm')
    cy.get('#confirmation_code').type('654agc')
    cy.get('button[type=submit]').click()
    cy.get('[data-cy=incorrect-code]').should('not.exist')
    cy.get('[data-cy=confirmed-code]').should('be.visible')
  })
})
