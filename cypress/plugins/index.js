/// <reference types="cypress" />
const ms = require('smtp-tester')
const port = 7777

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const mailServer = ms.init(port)
  console.log('mail server at port %d', port)

  // [receiver email]: email HTML or plaintext
  let lastEmail = {}

  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log('--- email ---')
    console.log(addr, id, email)
    lastEmail[email.headers.to] = email.html || email.body
  })

  on('task', {
    resetEmails(email) {
      console.log('reset all emails')
      if (email) {
        delete lastEmail[email]
      } else {
        lastEmail = {}
      }
      return null
    },

    getLastEmail(email) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      return lastEmail[email] || null
    },
  })
}
