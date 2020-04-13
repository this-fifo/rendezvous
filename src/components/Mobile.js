/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

const Mobile = ({ room, password }) => (
    <>
        <main>
            <h3>ʕ •ᴥ•ʔ</h3>
            <p>Hey, <u>rendezvous</u> runs on <em>jitsi</em>, currently there's no support for mobile browsers</p>
            <p>But you can <b>download</b> their app and join the meeting room on your phone</p>
            <br></br>
            <a
                href='https://apps.apple.com/us/app/jitsi-meet/id1165103905?mt=8'
                style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    background: 'url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-01-06&kind=iossoftware&bubble=ios_apps) no-repeat',
                    width: '135px',
                    height: '40px'
                }}
            ></a>
            <a
                href='https://play.google.com/store/apps/details?id=org.jitsi.meet&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    background: 'url(https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg) no-repeat',
                    width: '135px',
                    height: '40px'
                }}
            ></a>
            {room && <p>Enter <b><mark>{room}</mark></b> as the room name on the app</p>}
            {password && <p>and <b><mark>{password}</mark></b> as the room password</p>}
        </main>
    </>
)

export default Mobile