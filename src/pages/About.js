import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

const About = () => (
    <>
        <header>
            <nav>
                <h1><Link to='/' style={{ color: 'var(--color-text)' }}>rendezvous</Link></h1>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><a href='https://github.com/this-fifo/rendezvous' rel='noopener noreferrer' target='_blank'>GitHub</a></li>
                </ul>
            </nav>
            <h1><span role='img' aria-label='wave'>👋</span> <u>rendezvous</u> with friends</h1>
            <p><b>This app was created as part of the</b> twilio + DEV <mark>hackathon</mark> 🥳</p>
            <p><a href='https://www.twilio.com/blog/introducing-code-exchange-community-and-hackathon' rel='noopener noreferrer' target='_blank'><i>Twilio</i></a><a
                href='https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8' rel='noopener noreferrer' target='_blank'><b>DEV</b></a></p>
        </header>
        <main>
            <article>
                <aside>
                    <h1>How does it work? <span role='img' aria-label='wondering'>🤔</span></h1>
                </aside>
                <h3>Three steps</h3>
                <ol>
                    <li>You get a confirmation email</li>
                    <li>You click or paste the link that was sent to you</li>
                    <li>You fill the next form inviting your friends with details about your rendezvous</li>
                </ol>
                <p><small>The confirmation step is because your friends will receive the invite using your email address</small></p>
                <p><small><a href='https://sendgrid.com/' rel='noopener noreferrer' target='_blank'>SendGrid</a> is used to send emails</small></p>
            </article>
        </main>
        <Footer />
    </>
)

export default About
