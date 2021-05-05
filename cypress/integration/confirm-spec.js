/// <reference types="cypress" />

describe('Confirmation page', () => {
  it('rejects invalid code', () => {
    cy.visit('/confirm')
    cy.get('#confirmation_code').type('wrongcode')
    cy.get('button[type=submit]').click()
    cy.get('[data-cy=incorrect-code]').should('be.visible')
    cy.get('[data-cy=confirmed-code]').should('not.exist')

    cy.log('**enter the right code**')
    cy.get('#confirmation_code').clear().type('654agc')
    cy.get('button[type=submit]').click()
    cy.get('[data-cy=incorrect-code]').should('not.exist')
    cy.get('[data-cy=confirmed-code]').should('be.visible')
  })
})
