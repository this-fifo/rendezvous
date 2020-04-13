import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

const PageNotFound = () => (
    <>
        <header>
            <nav>
                <h1>rendezvous <sup>@404</sup></h1>
                <span role='img' aria-label='embarrassed'>🙈</span>
            </nav>
            <h1>（´＿ゝ｀）</h1>
            <p><b>Uhm... </b><em>was there a <mark>page</mark></em> <u>here</u>?</p>
            <p><Link to='/'><i>Home</i></Link><Link
                to='/about'><b>About</b></Link></p>
            <hr></hr>
        </header>
        <Footer />
    </>
)

export default PageNotFound
