// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('receives an email', () => {
    // the destination email
    const email = 'cy-user@startup.io'
    // call the API endpoint ourselves, which sends an email
    cy.request({
      url: '/api/register',
      method: 'POST',
      body: {
        name: 'Test User',
        email,
        companySize: '3',
      },
    })

    recurse(() => cy.task('getLastEmail', email), Cypress._.isObject, {
      log: false,
      delay: 1000,
      timeout: 20000,
    })
      .should('have.keys', ['body', 'html'])
      .its('html')
      .then((html) => {
        cy.log('**HTML email**')
        const doNotLog = { log: false }
        cy.document(doNotLog).invoke(doNotLog, 'write', html)
      })

    cy.screenshot('the email')
    cy.contains('a', 'Confirm registration').should('be.visible')
    cy.contains('the confirmation code').should('be.visible')
  })
})
