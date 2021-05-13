const { readFileSync } = require('fs')
const { join } = require('path')
const emailer = require('../../emailer')

const confirmationEmailPath = join(
  process.cwd(), // should be the root folder of the project
  'emails',
  'confirmation-code.html',
)
const confirmationEmailHTML = readFileSync(confirmationEmailPath, 'utf-8')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, companySize } = req.body
    // return to the caller right away
    res.status(200).json({ name, email })

    // and then send an email
    try {
      const info = await emailer.sendMail({
        from: '"Registration system" <reg@company.co>',
        to: email,
        subject: 'Confirmation code 1️⃣2️⃣3️⃣',
        text: 'Your confirmation code is 654agc',
        html: confirmationEmailHTML,
      })
      console.log('sent a confirmation email to %s', email)
    } catch (e) {
      console.error('Problem sending an email to %s', email)
      console.error(e)
    }

    return
  }

  return res.status(404)
}
