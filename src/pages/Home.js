import React from 'react'
import { Jutsu } from 'react-jutsu'
import { Link, useLocation } from 'react-router-dom'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'

import EmailConfirmation from '../components/EmailConfirmation'
import InviteForm from '../components/InviteForm'
import Mobile from '../components/Mobile'
import Footer from '../components/Footer'

const Home = () => {
    const query = new URLSearchParams(useLocation().search)
    return (
        <>
            <header>
                <nav style={{ marginBottom: 0 }}>
                    <h1>
                        <Link to='/' style={{ color: 'var(--color-text)' }}>rendezvous</Link>
                        {query.get('subject') && !isMobile && (<sup>{'@' + query.get('subject')}</sup>)}
                    </h1>
                    <ul>
                        <li><Link to='/about'>About</Link></li>
                        <li><a href='https://github.com/this-fifo/rendezvous' rel='noopener noreferrer' target='_blank'>GitHub</a></li>
                    </ul>
                </nav>
                <BrowserView>
                    {query.get('code') && query.get('email')
                        ? <InviteForm code={query.get('code')} email={query.get('email')}/>
                        : !query.get('room') && <EmailConfirmation />}
                    {query.get('room') &&
                        <Jutsu
                            containerStyles={{ width: '1080px', height: '600px' }}
                            subject={query.get('subject')}
                            roomName={query.get('room')}
                            password={query.get('password')}
                            displayName={query.get('name')} />}
                </BrowserView>
                <MobileView>
                    <Mobile room={query.get('room')} password={query.get('password')} />
                </MobileView>
            </header>
            <Footer />
        </>
    )
}

export default Home
