<h1 align="center">
    <img alt='rendezvous' src="src/assets/cover.png" width="90%" />
</h1>

> This app was created to have fun, learn some stuff and take part in the [twilio](https://www.twilio.com/blog/introducing-code-exchange-community-and-hackathon) + [DEV](https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8) hackathon 🥳


## 📜 Summary

Visitors of the site can invite participants to video conference meetings answering a simple form that emails everyone on their behalf

The meeting room name is picked for you using a unique id to reduce collisions since meetings links are public

Participants click on the link in their email and join the video conference right on the website

> ℹ Emails are sent using sendgrid through serverless functions and the video conference runs on an embedded jitsi meet client

## 🏗 Building it

_**rendezvous**_ was bootstrapped with create-react-app

#### Requirements

- Node.js and yarn *(or npm)* for development
- Zeit CLI *(for testing the serverless Node.js runtime through zeit now)*

#### Required Environment Variables

Add the following to a **.env** file at the project root

```bash
RENDEZVOUS_HCAPTCHA_SECRET='your_hcaptcha_secret'
RENDEZVOUS_APP_SECRET='anything_you_want_here'
SENDGRID_API_KEY='your_sendgrid_api_key'
```

- `RENDEZVOUS_HCAPTCHA_SECRET` is used for setting up [https://www.hcaptcha.com/](https://www.hcaptcha.com/)
- `RENDEZVOUS_APP_SECRET` is used as the secret for the hmac messages in the serverless functions when generating the confirmation code
- `SENDGRID_API_KEY` is to configure [Twilio SendGrid](https://sendgrid.com/)

Then just run

```bash
yarn    # install dependencies
now dev # start development instance
```

If you don't require the serverless runtime you can just run

```bash
yarn start
```

## 🚀 Deploying

If you wish to deploy to zeit, just make sure to setup git integration and the create-react-app template

Then add the same secrets from your env file to now using their cli and configure a now.json file, for example:

```bash
# Adding sendgrid api key to now using the cli
now secrets add sendgrid_api_key your_sendgrid_api_key
```

and the **now.json** file

```json
{
  "env": {
    "SENDGRID_API_KEY": "@sendgrid_api_key",
    "RENDEZVOUS_APP_SECRET": "@rendezvous_app_secret",
    "RENDEZVOUS_HCAPTCHA_SECRET": "@rendezvous_hcaptcha_secret"
  }
}
```

*Alternatively, you could deploy a backend of your choice using the same convention for handling the client side requests that validates the email and send the form data to invite participants*

---

### 🤔 Wait, why not just use meet.jit.si ?

When using the public jitsi server you risk choosing a name that someone else is already using and could end up in some stranger's room

This risk is minimized by picking the name for you using the [nanoid](https://zelark.github.io/nano-id-cc/) library when sending the invites through _**rendezvous**_

> There is also no invite option on meet.jit.si without integrating with either a Google or Microsoft calendar, an email just makes things easier for a simple _**rendezvous**_

### ✅ Can I still join a meeting through meet.jit.si ?

Absolutely, this is just a sugar built on top of it, you will only need the meeting room and the password if there is one

> Additionally, the embedded client support for mobile browsers isn't as good as the jitsi app yet, so _**rendezvous**_ will show a download link when opened from a mobile a device

### Resources

- Video Conference through [Jitsi](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md) 
- Emails through [SendGrid](https://sendgrid.com/) 📧
- Base css from [MVP.css](https://github.com/andybrewer/mvp/) ✨ *(with a few modifications)*
- All potential [hCaptcha](https://www.hcaptcha.com/) earnings are donated to Wikimedia foundation 🤗

## License

MIT © [this-fifo](https://github.com/this-fifo)
