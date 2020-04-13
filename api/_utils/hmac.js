const crypto = require('crypto')

export const generateHmac = (time, email) => crypto
        .createHmac('sha256', process.env.RENDEZVOUS_APP_SECRET)
        .update(time.toISOString() + email)
        .digest('hex')

export const validateHmac = (hmac, email) => {
        const time = new Date(Date.now())
        time.setSeconds(0, 0)
        // Validate HMAC against previous 5 mins
        for (let i = 1; i <= 5; i++) {
                time.setMinutes(time.getMinutes() - i)
                if (hmac === generateHmac(time, email)) {
                        return true
                }
        }
        return false
}