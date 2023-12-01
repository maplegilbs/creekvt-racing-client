//Hooks
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
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

const displayFields = {
    newhavenrace: ['firstName', 'lastName', 'category', 'email', 'acaNumber'],
    peavinerace: ['firstName', 'lastName', 'category', 'email', 'acaNumber', 'birthDate', 'gender'],
    testrace: ['firstName', 'lastName', 'category', 'email', 'acaNumber', 'birthDate', 'gender'],
}

function RacerRow({ registrationFormData, setRegistrationFormData, raceName, racerIndex }) {

    function handleChange(e) {
        setRegistrationFormData(prev => {
            let updatedRacers = prev.racers
            let updatedRacer = {
                ...prev.racers[racerIndex],
                [e.target.name]: e.target.value
            }
            updatedRacers[racerIndex] = updatedRacer
            let updatedRegistrationFormData = {
                ...prev,
                racers: updatedRacers
            }
            return updatedRegistrationFormData
        })
    }

    function removeRacer() {
        setRegistrationFormData(prev => {
            let updatedRacers = prev.racers.toSpliced(racerIndex, 1)
            let updatedRegistrationFormData = {
                ...prev,
                racers: updatedRacers
            }
            return updatedRegistrationFormData
        })
    }

    return (
        <>
            <div className={`${styles["racer-heading-row"]}`} >
                <p className={`${styles["racer-heading"]}`}>Racer {racerIndex + 1}</p>

                {(registrationFormData.racers && registrationFormData.racers.length > 1) &&
                    <button type="button" onClick={removeRacer} className={`${styles["racer-heading"]} ${styles["racer-delete"]}`}> Remove Racer {racerIndex + 1}&nbsp; <FontAwesomeIcon icon={faCircleMinus} color={'#990000'} /></button>
                }
            </div >
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <label htmlFor="firstName">First Name *</label>
                    <input onChange={handleChange} required type="text" name="firstName" id="firstName" value={registrationFormData.racers[racerIndex].firstName} />
                </div>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <label htmlFor="lastName">Last Name *</label>
                    <input onChange={handleChange} required type="text" name="lastName" id="lastName" value={registrationFormData.racers[racerIndex].lastName} />
                </div>
            </div>
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <label htmlFor="email">Email *</label>
                    <input onChange={handleChange} required type="email" name="email" id="email" value={registrationFormData.racers[racerIndex].email} />
                </div>
            </div>
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <label htmlFor="acaNumber">ACA Number</label>
                    <input onChange={handleChange} type="text" name="acaNumber" id="acaNumber" value={registrationFormData.racers[racerIndex].acaNumber} />
                </div>
            </div>
            {
                displayFields[raceName].includes('birthDate') &&
                <div className={`input-row ${styles["registration-row"]}`}>
                    <div className={`input-group ${styles["registration-group"]}`}>
                        <label htmlFor="birthdate">Birthdate</label>
                        <input onChange={handleChange} type="date" name="birthdate" id="birthdate" value={registrationFormData.racers[racerIndex].birthdate} />
                    </div>
                </div>
            }
            {
                displayFields[raceName].includes('gender') &&
                <div className={`input-row ${styles["registration-row"]}`}>
                    <div className={`input-group ${styles["registration-group"]}`}>
                        <label htmlFor="gender">Gender</label>
                        <select value={registrationFormData.racers[racerIndex].gender} onChange={handleChange} name="gender" id="gender">
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer Not To Respond</option>
                        </select>
                    </div>
                </div>
            }
            <hr />
        </>
    )
}


export default function Register() {
    const registrationInfo = useLoaderData();
    const [registrationFormData, setRegistrationFormData] = useState({});
    const { raceName } = useParams()
    let racerCategoryOptions =
        registrationInfo.raceInfo.categoryOptions ?
            registrationInfo.raceInfo.categoryOptions.split(", ").map(category => <option value={category}>{category}</option>)
            :
            null;


    console.log(registrationInfo, registrationFormData)

    useEffect(() => {
        setRegistrationFormData(
            {
                year: registrationInfo.currentRaceYear,
                raceName: registrationInfo.raceInfo.name,
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


    function handleChange(e) {

    }

    async function handleSubmit(e) {
        //submit the data
        //create a racer entity
        //take the created racer entity id and apply it to the registered racers
        //create the registered racers in the database
        e.preventDefault();
        let registerResponse = await fetch(`http://localhost:3000/racers/${raceName}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(registrationFormData)
        })
        let registerResponseJSON = await registerResponse.json();
        console.log(registerResponseJSON)

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
            <div className={`${styles["registration-form__container"]}`}>
                <h4 className={`section-heading`}>Register for the {`${registrationInfo.currentRaceYear} ${registrationInfo.raceInfo.name}`}</h4>
                <p>Register once per craft.  Be sure to include all partners in craft below.</p>
                <form onSubmit={handleSubmit}>
                    {racerCategoryOptions &&
                        <div className={`input-row ${styles["registration-row"]}`}>
                            <div className={`input-group ${styles["registration-group"]}`}>
                                <label htmlFor="category">Category *</label>
                                <select required onChange={(e) => setRegistrationFormData(prev => { return { ...prev, category: e.target.value } })} name="category" id="category">
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
                    {/* <RacerRow handleChange={handleChange} registrationFormData={registrationFormData} raceName={raceName} racerIndex={0} /> */}

                    <button className={`${styles["add-partner__button"]}`} type="button" onClick={addPartner}><FontAwesomeIcon icon={faCirclePlus} />&nbsp;Add Partner</button>
                    <button className={`button button--medium`} type="submit">Continue to Payment</button>
                </form>
            </div>

        </>
    )
}