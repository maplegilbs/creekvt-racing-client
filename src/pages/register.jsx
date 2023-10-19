//Hooks
import { useLoaderData, useParams } from "react-router-dom";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./register.module.css"
import { computeHeadingLevel } from "@testing-library/react";
import { useEffect, useState } from "react";

export async function loader({ params }) {
    const raceData = await fetch(`http://localhost:3000/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    const racerData = await fetch(`http://localhost:3000/racers/${params.raceName}`);
    const racerJSON = await racerData.json();
    return ({ raceInfo: raceJSON[0], racerInfo: racerJSON[0] })
}



export default function Register() {
    const registrationInfo = useLoaderData();
    const [registrationFormData, setRegistrationFormData] = useState({});
    const raceNameParam = useParams()
    console.log(registrationInfo)

    useEffect(() => {
        setRegistrationFormData(
            {
                year: formatDateTime(new Date(registrationInfo.raceInfo.date)).year,
                raceName: registrationInfo.raceInfo.name
            })
    }, [])

    let racerCategoryOptions =
        registrationInfo.raceInfo.racerCategories ? JSON.parse(registrationInfo.raceInfo.racerCategories).map(category => <option value={category}>{category}</option>)
            :
            null;

    function handleChange(e) {
        if (e.target.id.split('-')[0] === "partner") {
            let partnerId = Number(e.target.id.split('-')[2]);
            console.log(e.target.id)
            setRegistrationFormData(prev => {
                let updatedPartners = prev.partners.map((partner, i) => {
                    console.log(i, partnerId)
                    return i !== partnerId ? partner : { ...partner, [e.target.name.split('-')[1]]: e.target.value }
                })
                let updatedData = {
                    ...prev,
                    partners: updatedPartners
                }
                return updatedData
            })
        }
        else {
            setRegistrationFormData(prev => {
                let updatedData = {
                    ...prev,
                    [e.target.name]: e.target.value
                }
                return updatedData
            })
        }
    }

    function addPartner() {
        setRegistrationFormData(prev => {
            let updatedPartners = prev.partners ? prev.partners.map(partner => partner) : [];
            updatedPartners.push({ firstName: '', lastName: '' })
            return { ...prev, partners: updatedPartners }
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let registerResponse = await fetch(`http://localhost:3000/racers/${raceNameParam}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(registrationFormData)
        })
        let registerResponseJSON = await registerResponse.json();
        console.log(registerResponseJSON)

    }


    return (
        <>
            <div className={`${styles["registration-form__container"]}`}>
                <h4 className={`section-heading`}>Register for the {`${formatDateTime(new Date(registrationInfo.raceInfo.date)).year} ${registrationInfo.raceInfo.name}`}</h4>
                <p>Register once per craft.  Be sure to include all partners in craft below.</p>
                <form onSubmit={handleSubmit}>
                    <div className={"input-row"}>
                        <div className={`input-group`}>
                            <label htmlFor="firstName">First Name</label>
                            <input onChange={handleChange} required type="text" name="firstName" id="firstName" value={registrationFormData.firstName} />
                        </div>
                        <div className={`input-group`}>
                            <label htmlFor="lastName">Last Name</label>
                            <input onChange={handleChange} required type="text" name="lastName" id="lastName" value={registrationFormData.lastName} />
                        </div>
                    </div>
                    <div className={"input-row"}>
                        <div className={`input-group`}>
                            <label htmlFor="email">Email</label>
                            <input onChange={handleChange} required type="email" name="email" id="email" value={registrationFormData.email} />
                        </div>
                    </div>
                    {racerCategoryOptions &&
                        <div className={"input-row"}>
                            <div className={`input-group`}>
                                <label htmlFor="category">Category</label>
                                <select onChange={handleChange} name="category" id="category">
                                    {racerCategoryOptions}
                                </select>
                            </div>
                        </div>
                    }
                    {(
                        registrationFormData.category === "Canoe Tandem" ||
                        registrationFormData.category === "Kayak Tandem" ||
                        registrationFormData.category === "Raft"
                    ) &&

                        <div>
                            <h5>Partners</h5>
                            <button type="button" onClick={addPartner}>Add</button>
                            {registrationFormData.partners && registrationFormData.partners.map((partner, i) => {
                                return (
                                    <div className={"input-row"}>
                                        <div className={`input-group`}>
                                            <label htmlFor={`partner-firstName-${i}`}>First Name</label>
                                            <input onChange={handleChange} type="text" name="partner-firstName" id={`partner-firstName-${i}`} value={registrationFormData.partners[i].firstName} />
                                        </div>
                                        <div className={`input-group`}>
                                            <label htmlFor={`partner-lastName-${i}`}>Last Name</label>
                                            <input onChange={handleChange} type="text" name="partner-lastName" id={`partner-lastName-${i}`} value={registrationFormData.partners[i].lastName} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <button className={`button button--medium`} type="submit">Continue to Payment</button>
                </form>
            </div>

        </>
    )
}