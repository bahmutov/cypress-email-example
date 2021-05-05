const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
// the settings could come from .env file or environment variables
const host = process.env.SMTP_HOST || 'localhost'
const port = Number(process.env.SMTP_PORT || 7777)

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 456,
})

module.exports = transporter
