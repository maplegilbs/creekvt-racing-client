//Components
import RacerRow from "../components/registerRacerRow";
import Checkout from "../components/checkout";
//Hooks
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./register.module.css"

export async function loader({ params }) {
    const raceData = await fetch(`http://localhost:3000/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    let currentRaceYear = new Date(raceJSON[0].date).getFullYear();
    return ({ raceInfo: raceJSON[0], currentRaceYear })
}

//!remove after testing
const sampleRegistration = {
    raceName: "Test Race",
    year: 2024,
    category: "Canoe Tandem",
    racers: [{
        acaNumber: null,
        birthdate: null,
        email: "test@example.com",
        firstName: "Bob",
        gender: null,
        lastName: "Loblob",
    },
    {
        acaNumber: "12758",
        birthdate: null,
        email: "mike@example.com",
        firstName: "Mike",
        gender: null,
        lastName: "Michaels",
    }]
}

export default function Register() {
    const { raceInfo, currentRaceYear } = useLoaderData();
    // const [registrationFormData, setRegistrationFormData] = useState({});
    const [registrationFormData, setRegistrationFormData] = useState(sampleRegistration);
    const { raceName } = useParams()
    // const [checkoutStatus, setCheckoutStatus] = useState(null)
    const [checkoutStatus, setCheckoutStatus] = useState('pending')

    let racerCategoryOptions =
        raceInfo.categoryOptions ?
            raceInfo.categoryOptions.split(", ").map(category => <option value={category}>{category}</option>)
            :
            null;


    console.log(raceInfo, registrationFormData)

    // useEffect(() => {
    //     setRegistrationFormData(
    //         {
    //             year: currentRaceYear,
    //             raceName: raceInfo.name,
    //             racers: [
    //                 {
    //                     firstName: null,
    //                     lastName: null,
    //                     email: null,
    //                     acaNumber: null,
    //                     birthdate: null,
    //                     gender: null
    //                 }
    //             ]
    //         })
    // }, [])



    async function handleSubmit(e) {
        //submit the data
        //create a racer entity
        //take the created racer entity id and apply it to the registered racers
        //create the registered racers in the database
        e.preventDefault();
        setCheckoutStatus('pending')
        // let registerResponse = await fetch(`http://localhost:3000/racers/${raceName}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': "application/json"
        //     },
        //     body: JSON.stringify(registrationFormData)
        // })
        // let registerResponseJSON = await registerResponse.json();
        // console.log(registerResponseJSON)
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

    return (
        <>
            {checkoutStatus === null &&
                <div className={`${styles["registration-form__container"]}`}>
                    <h4 className={`section-heading`}>Register for the {`${currentRaceYear} ${raceInfo.name}`}</h4>
                    <p>Register once per craft.  Be sure to include all partners in craft below.</p>
                    <form onSubmit={handleSubmit}>
                        {racerCategoryOptions &&
                            <div className={`input-row ${styles["registration-row"]}`}>
                                <div className={`input-group ${styles["registration-group"]}`}>
                                    <label htmlFor="category">Category *</label>
                                    <select required value={registrationFormData.category} onChange={(e) => setRegistrationFormData(prev => { return { ...prev, category: e.target.value } })} name="category" id="category">
                                        <option value=""></option>
                                        {racerCategoryOptions}
                                    </select>
                                </div>
                            </div>
                        }
                        <hr />
                        {(registrationFormData.racers && registrationFormData.racers.length > 0) &&
                            registrationFormData.racers.map((racer, racerIndex) => {
                                return (
                                    <RacerRow setRegistrationFormData={setRegistrationFormData} registrationFormData={registrationFormData} raceName={raceName} racerIndex={racerIndex} />

                                )
                            })
                        }
                        <button className={`${styles["add-partner__button"]}`} type="button" onClick={addPartner}><FontAwesomeIcon icon={faCirclePlus} />&nbsp;Add Partner</button>
                        <button className={`button button--medium`} type="submit">Continue to Payment</button>
                    </form>
                </div>
            }
            {checkoutStatus === 'pending' &&
                <Checkout registrationData={registrationFormData} raceInfo={raceInfo} setCheckoutStatus={setCheckoutStatus}/>
            }
        </>
    )
}