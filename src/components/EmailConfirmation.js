import React, { useState, useEffect } from 'react'

const EmailConfirmation = ({ code }) => {
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })

    const [email, setEmail] = useState('')

    const handleResponse = (status, msg) => {
        if (status === 200) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: msg }
            })
            setEmail('')
        } else {
            setStatus({
                info: { error: true, msg: msg }
            })
        }
    }

    const handleOnChange = e => {
        e.persist()
        setEmail(e.target.value)
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
        const res = await fetch('/api/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, token: window.hcaptcha.getResponse() })
        })
        const text = await res.text()
        handleResponse(res.status, text)
    }

    useEffect(() => {
        if (window.hcaptcha.render) window.hcaptcha.render('hcaptcha')
        return () => window.hcaptcha.remove && window.hcaptcha.remove()
    }, [])

    return (
        <>
            <main>
                <h1>Confirm your email</h1>
                <section>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor='email'>Email:</label>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            onChange={handleOnChange}
                            placeholder='myself@example.com'
                            required
                        />
                        <div id='hcaptcha' className='h-captcha' data-sitekey='5b3e18d1-81b2-4e32-85b4-39e398cd481e'></div>
                        <button type='submit' disabled={status.submitting}>Submit</button>
                        <p>
                            {status.info.error && (
                                <b>{status.info.msg}</b>
                            )}
                            {!status.info.error && status.info.msg && (
                                <mark>{status.info.msg}</mark>
                            )}
                        </p>
                    </form>
                </section>
            </main>
        </>
    )
}

export default EmailConfirmation
