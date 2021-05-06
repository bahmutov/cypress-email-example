# cypress-email-example
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url] [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-7.2.0-brightgreen) [![cypress-email-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/9gzopg/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/9gzopg/runs)

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

[ci image]: https://github.com/bahmutov/cypress-email-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-email-example/actions
[badges image]: https://github.com/bahmutov/cypress-email-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-email-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
