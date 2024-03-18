//Components
import RacerRow from "../components/registerRacerRow";
import Checkout from "../components/checkout";
import RegistrationReceipt from "../components/registrationReceipt";
import Loader from "../components/loader";
//Hooks
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./register.module.css"

export async function loader({ params }) {
    const raceData = await fetch(`${process.env.REACT_APP_SERVER}/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    let currentRaceYear = new Date(raceJSON[0].date).getFullYear();
    return ({ raceInfo: raceJSON[0], currentRaceYear })
}


const canAddPartners = {
    "newhavenrace": false,
    "peavinerace": true,
    "testrace": true
}

//!update dynamically, or populate based on provided data from race organizers?
const craftWithMultipleRacers = ["Tandem Kayak", "Tandem Canoe Male", "Tandem Canoe Female", "Tandem Canoe Mixed", "Tandem Canoe Adult/Youth", "Inflatable Team"]

export default function Register() {
    const { raceInfo, currentRaceYear } = useLoaderData();
    const [registrationFormData, setRegistrationFormData] = useState({});
    // const [registrationFormData, setRegistrationFormData] = useState(sampleRegistration); // testing purposes
    const { raceName } = useParams()
    const [checkoutStatus, setCheckoutStatus] = useState(raceInfo.isRegOpen && new Date(raceInfo.date) > new Date() ? null : 'closed')
    // const [checkoutStatus, setCheckoutStatus] = useState('pending') //testing purposes
    // const [checkoutStatus, setCheckoutStatus] = useState('complete') //testing purposes
    const [receiptInfo, setReceiptInfo] = useState(null)
    const navigate = useNavigate()

    let racerCategoryOptions =
        raceInfo.categoryOptions ?
            raceInfo.categoryOptions.split(", ").map(category => <option value={category}>{category}</option>)
            :
            null;

    useEffect(() => {
        if (checkoutStatus === 'closed' || !raceInfo.isPublished) { setTimeout(() => navigate(`/races/${raceName}`), 3500) }
    }, [checkoutStatus])

    useEffect(() => {
        setRegistrationFormData(
            {
                year: currentRaceYear,
                raceName: raceInfo.name,
                racers: [
                    {
                        firstName: null,
                        lastName: null,
                        email: null,
                        acaNumber: null,
                        birthdate: null,
                        gender: null
                    }
                ]
            })
    }, [])



    async function handleSubmit(e) {
        e.preventDefault();
        setCheckoutStatus('pending')
    }

    function addPartner() {
        setRegistrationFormData(prev => {
            let updatedRacers = prev.racers
            updatedRacers.push({
                firstName: null,
                lastName: null,
                email: null,
                acaNumber: null,
                birthdate: null,
                gender: null
            })
            let updatedRegistrationFormData = {
                ...prev,
                racers: updatedRacers
            }
            return updatedRegistrationFormData
        })
    }

    if (checkoutStatus === 'closed' || !raceInfo.isPublished) {
        return (
            <Loader
                loader_text={`Registration is not currently open for the ${raceInfo.name}.`}
                bottom_text={`Redirecting to ${raceInfo.name} page.`} />
        )
    }
    else {
        return (
            <>
            {checkoutStatus === null &&
                <div className={`${styles["registration-form__container"]}`}>
                    <h4 className={`section-heading`}>Register for the {`${currentRaceYear} ${raceInfo.name}`}</h4>
                    <br />
                    <div className={`${styles["header-info"]}`}>
                        <p className={`${styles["race-details"]}`}><strong>Race Date:</strong></p><p>{`${formatDateTime(new Date(raceInfo.date)).fullDate}`}</p>
                    </div>
                    <div className={`${styles["header-info"]}`}>
                        <p className={`${styles["race-details"]}`}><strong>Fee:</strong> </p><p>{`$${raceInfo.fee} per racer`}</p>
                    </div>
                    {raceInfo.acaDiscount > 0 &&
                        <div className={`${styles["header-info"]}`}>
                            <p className={`${styles["race-details"]}`}><strong>ACA Member Discount:</strong> </p><p>{`$${raceInfo.acaDiscount}`}</p>
                        </div>
                    }
                    <br />
                    <p className={`${styles["required-notice"]}`}>Required fields are denoted with an astrisk *</p>
                    <form onSubmit={handleSubmit}>
                        {racerCategoryOptions &&
                            <div className={`input-row ${styles["registration-row"]}`}>
                                <div className={`input-group ${styles["registration-group"]}`}>
                                    <div><label htmlFor="category">Category&nbsp;</label><span className="required__span">*</span></div>
                                    <select required value={registrationFormData.category} onChange={(e) => setRegistrationFormData(prev => { return { ...prev, category: e.target.value } })} name="category" id="category">
                                        <option value=""></option>
                                        {racerCategoryOptions}
                                    </select>
                                </div>
                            </div>
                        }
                        {(canAddPartners[raceName] && craftWithMultipleRacers.includes(registrationFormData.category)) &&
                            <p>Register once per boat.  Be sure to include all racing partners who will be in the boat below.</p>
                        }
                        <hr />
                        {(registrationFormData.racers && registrationFormData.racers.length > 0) &&
                            registrationFormData.racers.map((racer, racerIndex) => {
                                return (
                                    <RacerRow key={racerIndex} raceInfo={raceInfo} setRegistrationFormData={setRegistrationFormData} registrationFormData={registrationFormData} raceName={raceName} racerIndex={racerIndex} />

                                )
                            })
                        }
                        {(canAddPartners[raceName] && craftWithMultipleRacers.includes(registrationFormData.category)) &&
                            <button className={`${styles["add-partner__button"]}`} type="button" onClick={addPartner}><FontAwesomeIcon icon={faCirclePlus} />&nbsp;Add Partner</button>
                        }
                        <button className={`button button--medium`} type="submit">Continue to Payment</button>
                    </form>
                </div>
                }
                {checkoutStatus === 'pending' &&
                    <Checkout registrationData={registrationFormData} raceName={raceName} raceInfo={raceInfo} setCheckoutStatus={setCheckoutStatus} setReceiptInfo={setReceiptInfo} />
                }
                {checkoutStatus === 'complete' &&
                    <RegistrationReceipt registrationData={registrationFormData} raceInfo={raceInfo} raceName={raceName} receiptInfo={receiptInfo} />
                }
            </>
        )
    }
}