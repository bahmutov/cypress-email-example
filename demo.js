const ms = require('smtp-tester')
const port = 7777
const mailServer = ms.init(port)
console.log('mail server at port %d', port)

// mailServer.bind('cy-user@startup.io', (addr, id, email) => {
//   console.log('--- email ---')
//   console.log(addr, id, email)
// })

// process all emails
mailServer.bind((addr, id, email) => {
  console.log('--- email ---')
  console.log(addr, id, email)
})
