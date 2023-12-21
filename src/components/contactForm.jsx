//Components
import Loader from "./loader"
import ReCAPTCHA from "react-google-recaptcha"
//Styles
import { useState } from "react"
import styles from "./contactForm.module.css"

function ContactSubmittedMessage({ messageInfo }) {
    return (
        <>
            <p>Thanks for the message {messageInfo.name.split(" ")[0]}.</p>
            <p>We will get back to you as soon as possible.</p>
        </>
    )
}

export default function ContactForm({ contactEmail, raceName, message }) {
    const [formData, setFormData] = useState({ raceName: raceName ? raceName : null })
    const [submissionStatus, setSubmissionStatus] = useState(null)

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
        console.log(formData)
        let contactResponse = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (contactResponse.status >= 200 && contactResponse.status < 300) {
            setSubmissionStatus('submitted')
        }
    }

    if (submissionStatus === 'submitted') {
        return <ContactSubmittedMessage messageInfo={formData} />
    }
    else if (submissionStatus === 'pending'){
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
                        <ReCAPTCHA sitekey="6LdWQP8UAAAAACrKR5wiGxHVjKcY47IGw07ppbhA" />
                        <button className={`button button--medium`}>Send Message</button>
                    </form>
                </div>
            </>
        )
    }
}