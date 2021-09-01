/// <reference types="cypress" />
const ms = require('smtp-tester')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // starts the SMTP server at localhost:7777
  const port = 7777
  const mailServer = ms.init(port)
  console.log('mail server at port %d', port)

  // [receiver email]: email text
  let lastEmail = {}

  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log('--- email to %s ---', email.headers.to)
    console.log(email.body)
    console.log('--- end ---')
    // store the email by the receiver email
    lastEmail[email.headers.to] = {
      body: email.body,
      html: email.html,
    }
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

    getLastEmail(userEmail) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      return lastEmail[userEmail] || null
    },
  })
}
