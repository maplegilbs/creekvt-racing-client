//Components
import Loader from "./loader"
import ReCAPTCHA from "react-google-recaptcha"
//Styles
import { useState, useRef } from "react"
import styles from "./contactForm.module.css"

function ContactSubmittedMessage({ messageInfo }) {
    return (
        <>
            <p>Thanks for the message {messageInfo.name.split(" ")[0]}.</p>
            <p>We will get back to you as soon as possible.</p>
        </>
    )
}

function ContactFailedMessage({ contactEmail }) {
    return (
        <>
            <p>We apologize but the message failed to be submitted.</p>
            <p>Please try and contact us directly at {contactEmail}.</p>
        </>
    )
}

export default function ContactForm({ contactEmail, raceName, message, setWasContactFormSubmitted }) {
    const [formData, setFormData] = useState({ raceName: raceName ? raceName : null })
    const [submissionStatus, setSubmissionStatus] = useState(null)
    const recaptcha = useRef();

    function handleChange(e) {
        setFormData(prev => {
            let updatedFormData = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return updatedFormData
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmissionStatus('pending')
        console.log(recaptcha.current)
        const recaptchaValue = recaptcha.current.getValue();
        if (!recaptchaValue) {
            alert("ReCaptcha not verified.");
            setSubmissionStatus(null)
        } else {
            let submittedFormData = {
                ...formData,
                recaptchaValue: recaptchaValue
            }
            console.log(submittedFormData, recaptchaValue)
            let contactResponse = await fetch(`${process.env.REACT_APP_SERVER}/contact`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submittedFormData)
            })
            if (contactResponse.status >= 200 && contactResponse.status < 300) {
                setSubmissionStatus('submitted')
                if(setWasContactFormSubmitted) setWasContactFormSubmitted(true)
            }
            else {
                setSubmissionStatus('failed')
            }
        }
    }

    if (submissionStatus === 'submitted') {
        return <ContactSubmittedMessage messageInfo={formData} />
    }
    else if (submissionStatus === 'failed') {
        return <ContactFailedMessage contactEmail={contactEmail} />
    }
    else if (submissionStatus === 'pending') {
        return <Loader />
    }
    else {
        return (
            <>
                {message &&
                    <p>{message}</p>
                }
                {contactEmail &&
                    <p>Contact us using the form below, or reach us via email at <a className={`link-std`} href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
                }
                <div className={`${styles["form-container"]}`}>
                    <form onSubmit={handleSubmit}>
                        <div className={`input-group`}>
                            <div><label htmlFor="name">Name&nbsp;</label><span className="required__span">*</span></div>
                            <input type="text" name="name" id="name" required onChange={(e) => handleChange(e)} value={formData.name} />
                        </div>
                        <div className={`input-group`}>
                            <div><label htmlFor="email">Email&nbsp;</label><span className="required__span">*</span></div>
                            <input type="email" name="email" id="email" required onChange={(e) => handleChange(e)} value={formData.email} />
                        </div>
                        <div className={`input-group`}>
                            <div><label htmlFor="message">Message&nbsp;</label><span className="required__span">*</span></div>
                            <textarea rows="8" name="message" id="message" required onChange={(e) => handleChange(e)} value={formData.message} />
                        </div>
                        <ReCAPTCHA sitekey="6LdWQP8UAAAAACrKR5wiGxHVjKcY47IGw07ppbhA" ref={recaptcha} />
                        <button className={`button button--medium`}>Send Message</button>
                    </form>
                </div>
            </>
        )
    }
}