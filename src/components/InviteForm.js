import React, { useState, useEffect } from 'react'
import './EmailList.css'

const state = {
    subject: '',
    message: '',
    password: '',
    recipients: {
        items: [],
        value: '',
        error: null
    }
}

const InviteForm = ({ code, email }) => {
    const [inputs, setInputs] = useState(state)
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    })

    const handleResponse = (status, msg) => {
        if (status === 200) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: msg }
            })
            setInputs(state)
        } else {
            setStatus({
                info: { error: true, msg: msg }
            })
        }
    }

    const handleSingleInputChanges = event => {
        event.persist()
        setInputs(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }))
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        })
    }

    const handleListInputChanges = event => {
        const { value } = event.target
        setInputs(prevState => ({
            ...prevState,
            recipients: {
                items: prevState.recipients.items,
                value,
                error: null
            }
        }))
    }

    const handleKeyDownForEmailsInput = event => {
        if (['Enter', 'Tab', ','].includes(event.key)) {
            event.preventDefault()

            let value = inputs.recipients.value.trim()

            if (value && isValidEmail(value)) {
                setInputs(prevState => ({...prevState, ...{
                    recipients: {
                        items: [...prevState.recipients.items, value],
                        value: ''
                    }
                }}))
            }
        }
    }

    const handlePasteForEmailsInput = event => {
        event.preventDefault()

        let paste = event.clipboardData.getData('text')
        let emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)

        if (emails) {
            let toBeAdded = emails.filter(email => !isInList(email))
            setInputs(prevState => ({
                ...prevState,
                recipients: {
                    items: [...prevState.recipients.items, ...toBeAdded]
                }
            }))
        }
    }

    const handleDeleteForEmailItems = item => {
        setInputs(prevState => ({
            ...prevState,
            recipients: {
                items: prevState.recipients.items.filter(i => i !== item)
            }
        }))
    }

    const handleOnSubmit = async event => {
        event.preventDefault()
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }))

        const recipients = inputs.recipients.items
        if (!recipients.length) return handleResponse(400, 'Please enter at least one email')

        const { subject, message, password } = inputs
        const body = {
            subject, email, message, password, recipients, code, token: window.hcaptcha.getResponse()
        }
        const res = await fetch('/api/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const text = await res.text()

        handleResponse(res.status, text)
    }

    const isValidEmail = (email) => {
        let error = null

        if (isInList(email)) {
            error = `${email} has already been added.`
        }

        if (!isEmail(email)) {
            error = `${email} is not a valid email address.`
        }

        if (error) {
            setInputs(prevState => ({
                ...prevState,
                recipients: {
                    items: prevState.recipients.items,
                    value: prevState.recipients.value,
                    error
                }
            }))

            return false
        }
        return true
    }

    const isInList = (email) => inputs.recipients.items.includes(email)

    const isEmail = (email) => /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email)

    const placeholder = `Hi everyone!\n\nLet's celebrate together 🥳\n\nJoin the virtual party\n01/01 at 1pm`

    useEffect(() => {
        if (window.hcaptcha.render) window.hcaptcha.render('hcaptcha')
        return () => window.hcaptcha.remove && window.hcaptcha.remove()
    }, [])

    return (
        <>
            <main>
                <h1>Invite your friends</h1>
                <section>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor='subject'>Subject:</label>
                        <input
                            id='subject'
                            type='text'
                            value={inputs.subject}
                            onChange={handleSingleInputChanges}
                            placeholder='birthday cake'
                            required
                        />
                        <label htmlFor='email-list'>Friends:</label>
                        <small>Type or paste email addresses and press `Enter`...</small>
                        <br />
                        {inputs.recipients.items.map(item => (
                            <div className='tag-item' key={item} id={item}>
                                {item}
                                <button
                                    type='button'
                                    className='button'
                                    onClick={() => handleDeleteForEmailItems(item)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <input
                            id='email-list'
                            value={inputs.recipients.value}
                            className={'input ' + (inputs.recipients.error && ' has-error')}
                            placeholder='john@example.com, jane@example.com'
                            onKeyDown={handleKeyDownForEmailsInput}
                            onChange={handleListInputChanges}
                            onPaste={handlePasteForEmailsInput}
                        />
                        {inputs.recipients.error && <p className='error'>{inputs.recipients.error}</p>}
                        <label htmlFor='message'>Message</label>
                        <small>optional</small>
                        <textarea
                            id='message'
                            rows='7'
                            value={inputs.message}
                            onChange={handleSingleInputChanges}
                            placeholder={placeholder}
                        />
                        <label htmlFor='password'>Room Password:</label>
                        <small>optional</small>
                        <input
                            id='password'
                            type='password'
                            value={inputs.password}
                            onChange={handleSingleInputChanges}
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

export default InviteForm
