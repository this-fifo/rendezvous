import { verify } from './_utils/hcaptcha'
import { validateHmac } from './_utils/hmac'

const { nanoid } = require('nanoid')
const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
    const { code, subject, email: from, message, password, recipients, token } = req.body

    if (!await verify(token)) return res.status(400).send('Please fill captcha 👀')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const room = nanoid()
    const link = `https://rendezvous.now.sh?room=${room}&subject=${subject}` + (password && `&password=${password}`)
    const html = (message && `<p>${message}<p><br/>`) + `<p>Join the rendezvous at <a href='${link}'>${link}</a></p>`
    const text = (message && `${message}\n\n`) + `Join the rendezvous at ${link}`
    const emailSubject = `Join the rendezvous @${subject} 🥳`

    if (!validateHmac(code, from)) return res.status(401).send('Invalid code')

    recipients.push(from)
    const to = recipients
    try {
        await sgMail.sendMultiple({ to, from, subject: emailSubject, text, html })
        return res.status(200).send('Invite sent successfully. 🎉')
    } catch (error) {
        console.error(`[ERROR] - Could not send emails: `, error)
        return res.status(400).send('Ops, there was an error. 😭')
    }
}
