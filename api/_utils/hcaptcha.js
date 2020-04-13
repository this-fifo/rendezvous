const fetch = require('node-fetch')

export const verify = async (token) => {
    const url = 'https://hcaptcha.com/siteverify'
    const params = `?secret=${process.env.RENDEZVOUS_HCAPTCHA_SECRET}&response=${token}`
    const challenge = await fetch(`${url}${params}`)
    const response = await challenge.json()
    return response.success
}