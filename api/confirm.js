import { verify } from './_utils/hcaptcha'
import { generateHmac } from './_utils/hmac'

const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
    const { email, token } = req.body

    if (!await verify(token)) return res.status(400).send('Please fill captcha 👀')

    const time = new Date(Date.now())
    time.setSeconds(0, 0)
    const hash = generateHmac(time, email)
    const link = `https://rendezvous.now.sh?code=${hash}` + (email && `&email=${email}`)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const content = {
        to: email,
        from: email,
        subject: `Rendezvous Verification Code 👋`,
        text: `Here's your verification link:\n\n${link}`,
        html: `<p>Here's your verification link:<br/><br/><a href='${link}'>${link}</a></p>`
    }

    try {
        await sgMail.send(content)
        return res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        return res.status(400).send('Ops, there was an error.')
    }
}
