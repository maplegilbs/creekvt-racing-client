//Compontents
import Loader from "./loader";
import ContactForm from "./contactForm";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
//Libraries
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./checkout.module.css"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function RegistrationNotice() {
    return (
        <div className={`${styles["registration-notice"]}`}>
            <Loader loader_text={"Saving Registration"} />
        </div>
    )
}

function Subtotal({ registrationData, raceInfo, setCheckoutStatus }) {
    let acaDiscount = Number(raceInfo.acaDiscount);
    let raceFee = Number(raceInfo.fee);
    let subTotal = 0;

    return (
        <div className={`${styles["subtotal__container"]}`}>
            <header>
                <h3>Checkout</h3>
                <button type="button" className={`button button--small`}>
                    <h5 onClick={() => setCheckoutStatus(null)}>Edit Details <FontAwesomeIcon icon={faPenToSquare} /></h5>
                </button>
            </header>
            <div className={`${styles["registration-details"]}`}>
                <h5>Registration Details:</h5>
                <div className={`${styles["detail-row"]}`}><p>Race:</p><p> {raceInfo.name}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Event Date:</p><p> {formatDateTime(new Date(raceInfo.date)).fullDate}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Participant Count:</p><p> {registrationData.racers.length}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Race Class:</p><p> {registrationData.category}</p></div>
            </div>
            <div className={`${styles["receipt-row"]} ${styles["receipt-row--header"]}`}>
                <h5>Racer</h5>
                <h5>Fee</h5>
                <h5>Discount</h5>
                <h5>Subtotal</h5>
            </div>
            {registrationData.racers.map(racer => {
                const racerDiscount = racer.acaNumber ? (acaDiscount * -1) : 0;
                const racerTotal = raceFee + racerDiscount;
                subTotal += racerTotal;
                return (
                    <div className={`${styles["receipt-row"]}`}>
                        <p>{`${racer.firstName + " " + racer.lastName}`}{racer.acaNumber && <><br /><span>ACA  #{racer.acaNumber}</span></>}</p>
                        <p>{`${raceInfo.fee}`}</p>
                        <p>{`${racerDiscount.toFixed(2)}`}</p>
                        <p>{`${racerTotal.toFixed(2)}`}</p>
                    </div>
                )
            })
            }
            <div className={`${styles["subtotal-row"]}`}>
                <p>Total</p>
                <p>${subTotal.toFixed(2)}</p>
            </div>
        </div>
    )
}


function CheckoutErrorNotice({ contactEmail, raceName, message }) {
    const [wasContactFormSubmitted, setWasContactFormSubmitted] = useState(false)
    return (
        <div className={`${styles["error-notice"]}`}>
            {!wasContactFormSubmitted &&
                <>
                    <h1>We're sorry, there was an error processing the order.</h1>
                    <p>Please contact the race organizers to resolve the issue and get registered.</p>
                </>
            }
            <ContactForm
                setWasContactFormSubmitted={setWasContactFormSubmitted}
                contactEmail={contactEmail}
                raceName={raceName}
                message={message} />
                {wasContactFormSubmitted &&
                <a className={`button button--medium`} href="/races">Back to Races</a>
            }
        </div>
    )
}





export default function Checkout({ registrationData, raceName, raceInfo, setCheckoutStatus, setReceiptInfo }) {
    const [isRegComplete, setIsRegComplete] = useState(false)
    const [isCheckoutError, setisCheckoutError] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    /*----Paypal-----*/
    //When payment button is clicked an order is created on the server and the order id is returned
    //Nothing added to DB
    async function createOrder(data) {
        try {
            let createdOrder = await fetch(`${process.env.REACT_APP_SERVER}/register/orders/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            })
            if (createdOrder.status >= 200 && createdOrder.status < 300) {
                let orderData = await createdOrder.json()
                return orderData.id
            }
            else {
                setisCheckoutError(true)
            }
        } catch (error) {
            setisCheckoutError(true)
        }
    };

    //When user completes paypal checkout (on popup or via CC submission)
    //Order is captured on the server and the response is returned to the browser
    //A new racer entity will be added to the DB along with associated racers
    async function onApprove(data) {
        try {
            let captureResponse = await fetch(`${process.env.REACT_APP_SERVER}/register/orders/capture/${data.orderID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    registrationData,
                    date: raceInfo.date
                })
            })
            //Payment is successfully captured, end of checkout process.
            if (captureResponse.status >= 200 && captureResponse.status < 300) {
                let captureData = await captureResponse.json();
                setIsRegComplete(true)
                setReceiptInfo(captureData)
                setTimeout(() => setCheckoutStatus('complete'), 3000)
            }
            else {
                setisCheckoutError(true)
            }
        } catch (error) {
            setisCheckoutError(true)
        }
    };

    return (
        !isCheckoutError ?
            <>
                {
                    isRegComplete &&
                    <RegistrationNotice raceName={raceName} />
                }
                < Subtotal registrationData={registrationData} raceInfo={raceInfo} setCheckoutStatus={setCheckoutStatus} />
                <PayPalButton
                    createOrder={(data) => createOrder(data)}
                    onApprove={(data) => onApprove(data)}
                    style={{
                        layout: 'vertical',
                        color: 'black',
                        shape: 'rect',
                        label: 'paypal',
                    }
                    }
                />
            </>
            :
            <CheckoutErrorNotice contactEmail={raceInfo.contactEmail} raceName={raceName} />
    )
}