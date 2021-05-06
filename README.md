# cypress-email-example ![cypress version](https://img.shields.io/badge/cypress-7.2.0-brightgreen)

Sending emails using [nodemailer](https://nodemailer.com/about/), receive the using [smtp-tester](https://github.com/deitch/smtp-tester) and testing the received email using [Cypress](https://github.com/cypress-io/cypress).

![The HTML email test](./images/html-email.gif)

See [cypress/integration/spec.js](./cypress/integration/spec.js)

## Install and run

```shell
$ npm install
$ npm start
# from another terminal
$ npx cypress open
# click the spec.js
```
