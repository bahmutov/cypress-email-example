// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

describe('Email confirmation', () => {
  beforeEach(() => {
    cy.task('resetEmails')
  })

  it('receives an email', () => {
    recurse(
      () => cy.task('getLastEmail', 'cy-user@startup.io'),
      Cypress._.isString,
      {
        log: false,
        delay: 1000,
        timeout: 20000,
      },
    ).then((html) => {
      cy.document().invoke({ log: false }, 'write', html)
    })
  })
})
