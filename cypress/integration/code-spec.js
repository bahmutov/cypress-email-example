// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('sends an email with code', () => {
    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type('joe@acme.io')
    cy.get('#company_size').select('3')
    cy.get('button[type=submit]').click()
    cy.location('pathname').should('equal', '/confirm')
    // by now the SMTP server has probably received the email
    cy.task('getLastEmail', 'joe@acme.io')
      .its('body') // check the plain email text
      .then(cy.wrap)
      // Tip: modern browsers supports named groups
      .invoke('match', /code is (?<code>\w+)/)
      // the confirmation code
      .its('groups.code')
      .should('be.a', 'string')
      .then((code) => {
        cy.get('#confirmation_code').type(code)
        cy.get('button[type=submit]').click()
        cy.get('[data-cy=incorrect-code]').should('not.exist')
        cy.get('[data-cy=confirmed-code]').should('be.visible')
      })
  })
})
