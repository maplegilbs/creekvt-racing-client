//Compontents
import Loader from "./loader";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
//Libraries
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./checkout.module.css"
import { useNavigate } from "react-router";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function RegistrationNotice({ raceName }) {
    return (
        <div className={`${styles["registration-notice"]}`}>
            <Loader loader_text={"Saving Registration"}/>
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

export default function Checkout({ registrationData, raceName, raceInfo, setCheckoutStatus }) {
    const navigate = useNavigate()
    const [isRegComplete, setIsRegComplete] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    console.log(registrationData)

    /*----Paypal-----*/
    async function createOrder(data) {
        // Order is created on the server and the order id is returned
        //Nothing added to DB
        let createdOrder = await fetch("http://localhost:3000/register/orders/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify(registrationData),
        })
        let orderData = await createdOrder.json()
        console.log(orderData)
        return orderData.id
    };


    async function onApprove(data) {
        // Order is captured on the server and the response is returned to the browser
        try {
            let captureResponse = await fetch(`http://localhost:3000/register/orders/capture/${data.orderID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    registrationData
                })
            })
            console.log(captureResponse)
            let captureData = await captureResponse.json();
            console.log(captureData)
            if (captureResponse.status === 201) {
                setIsRegComplete(true)
                console.log(captureData)
                setTimeout(() => setCheckoutStatus('complete'), 3000)
            }

        } catch (error) {

        }
    };

    return (
        <>{!isRegComplete &&
            <RegistrationNotice raceName={raceName} />
        }
            <Subtotal registrationData={registrationData} raceInfo={raceInfo} setCheckoutStatus={setCheckoutStatus} />
            <PayPalButton
                createOrder={(data) => createOrder(data)}
                onApprove={(data) => onApprove(data)}
                style={{
                    layout: 'vertical',
                    color: 'black',
                    shape: 'rect',
                    label: 'paypal'
                }
                }
            />
        </>
    )
}