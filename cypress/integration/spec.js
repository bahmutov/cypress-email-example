// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('sends an email', () => {
    cy.visit('/')
    cy.get('#name').type('Joe Bravo')
    cy.get('#email').type('joe@acme.io')
    cy.get('#company_size').select('3')

    cy.intercept('POST', '/api/register').as('register')
    cy.get('button[type=submit]').click()

    cy.log('**redirects to /confirm**')
    cy.location('pathname').should('equal', '/confirm')

    cy.log('**register API call**')
    cy.wait('@register').its('request.body').should('deep.equal', {
      name: 'Joe Bravo',
      email: 'joe@acme.io',
      companySize: '3',
    })
    // once we have waited for the ajax call once,
    // we can immediately get it again using cy.get(<alias>)
    cy.get('@register').its('response.body').should('deep.equal', {
      // the response from the API should only
      // include name and email
      name: 'Joe Bravo',
      email: 'joe@acme.io',
    })

    // by now the SMTP server has probably received the email
    cy.task('getLastEmail', 'joe@acme.io')
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
