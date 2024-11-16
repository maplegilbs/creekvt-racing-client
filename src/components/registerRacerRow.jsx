//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
//Constants
import { flagLookup } from "../constants";
//Styles
import styles from "./registerRacerRow.module.css"

const canadaLocs = Object.keys(flagLookup.canada).map(prov => <option value={prov}>{prov}</option>)
const usaLocs = Object.keys(flagLookup.unitedStates).map(state => <option value={state}>{state}</option>)

export default function RacerRow({ raceInfo, registrationFormData, setRegistrationFormData, raceName, racerIndex }) {
    const displayFields = {
        newhavenrace: ['firstName', 'lastName', 'category', 'email', 'acaNumber'],
        peavinerace: ['firstName', 'lastName', 'category', 'email', 'acaNumber', 'birthDate'],
        wellsriverrumble: ['firstName', 'lastName', 'category', 'email', 'acaNumber'],
        testrace: ['firstName', 'lastName', 'category', 'email', 'acaNumber', 'birthDate', 'gender'],
    }

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
        <div className={`${styles["register-racer-row"]}`}>
            <div className={`${styles["racer-heading-row"]}`} >
                <p className={`${styles["racer-heading"]}`}>Racer {racerIndex + 1}</p>

                {(registrationFormData.racers && registrationFormData.racers.length > 1) &&
                    <button type="button" onClick={removeRacer} className={`${styles["racer-heading"]} ${styles["racer-delete"]}`}> Remove Racer {racerIndex + 1}&nbsp; <FontAwesomeIcon icon={faCircleMinus} color={'#990000'} /></button>
                }
            </div >
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <div><label htmlFor="firstName">First Name&nbsp;</label><span className="required__span">*</span></div>
                    <input onChange={handleChange} required type="text" name="firstName" id="firstName" value={registrationFormData.racers[racerIndex].firstName} />
                </div>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <div><label htmlFor="lastName">Last Name&nbsp;</label><span className="required__span">*</span></div>
                    <input onChange={handleChange} required type="text" name="lastName" id="lastName" value={registrationFormData.racers[racerIndex].lastName} />
                </div>
            </div>
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <div><label htmlFor="location">Location&nbsp;</label>{racerIndex === 0 && <span className="required__span">*</span>}</div>
                    <select onChange={handleChange} required name="location" id="location" value={registrationFormData.racers[racerIndex].location} >
                        <option value=""></option>
                        <optgroup label="United States">
                            {usaLocs}
                        </optgroup>
                        <optgroup label="Canada">
                            {canadaLocs}
                        </optgroup>
                    </select>
                </div>
            </div>
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <div><label htmlFor="email">Email&nbsp;</label>{racerIndex === 0 && <span className="required__span">*</span>}</div>
                    <input onChange={handleChange} required={racerIndex === 0 ? true : false} type="email" name="email" id="email" value={registrationFormData.racers[racerIndex].email} />
                </div>
            </div>
            <div className={`input-row ${styles["registration-row"]}`}>
                <div className={`input-group ${styles["registration-group"]}`}>
                    <div><label htmlFor="acaNumber">ACA Number</label>
                        {raceInfo.acaDiscount > 0 &&
                            <span className={`${styles["label-subtext__span"]}`}>&nbsp;&nbsp;members receive a ${raceInfo.acaDiscount} discount.</span>
                        }
                    </div>
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
        </div>
    )
}
