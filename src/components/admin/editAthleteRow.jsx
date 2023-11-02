//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useEffect, useState, useContext } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../../utils/formatDateTime.js";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"


export default function EditAthleteRow({ itemData, setSelectedRacer, currentGroupInfo, setCurrentGroupInfo }) {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [racerData, setRacerData] = useState(itemData)

    function handleRacerChange(e, itemID) {
        console.log(e.target, itemID)
        setRacerData(prev => {
            let updatedRacerData = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return updatedRacerData
        })
    }

    async function saveRacer() {
        console.log(`Saving, `, currentGroupInfo, racerData)
        const token = localStorage.getItem("token")
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let wasSaveSuccess = false;
        //If this is not a new group
        if (Number(currentGroupInfo.racerEntityID) !== 0) {
            //If this is a new racer being added
            if (Number(racerData.id) == 0) {
                let savedRacerResponse = await fetch(`http://localhost:3000/racers/addRacer/${raceToFetch}`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        ...racerData
                    })
                })
                if (savedRacerResponse.status === 200) wasSaveSuccess = true;
            }
            //If this is a racer being updated
            else {
                let token = localStorage.getItem('token')
                let tableFieldsResponse = await fetch("http://localhost:3000/racers/tableInfo/racers", {
                    headers: { authorization: `Bearer ${token}` }
                })
                let tableFields = await tableFieldsResponse.json()
                let filteredRacerData = tableFields.reduce((accum, field) => {
                    return {
                        ...accum,
                        [field.Field]: racerData[field.Field]
                    }
                }, {})
                let editedRacerResponse = await fetch(`http://localhost:3000/racers/editRacer/${raceToFetch}/${racerData.id}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(filteredRacerData)
                })
                if (editedRacerResponse.status === 200) wasSaveSuccess = true;
            }
        }
        if (wasSaveSuccess) {
            setCurrentGroupInfo(prev => {
                let updatedRacers = prev.racers.map(racer => {
                    if (Number(racer.id) === Number(racerData.id)) return racerData
                    else return racer
                })
                let updatedGroup = {
                    ...prev,
                    racers: updatedRacers
                }
                return updatedGroup
            })
            setSelectedRacer(null)
        }
    }

    console.log("Edit athlete row: ", racerData)
    return (
        // <div className={`${styles["edit-racer__row"]}`}>
        <div className={`${styles["edit-racer-inputs__container"]}`}>
            <div className={`input-group`}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={(e) => handleRacerChange(e, racerData.id)} value={racerData.firstName} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={(e) => handleRacerChange(e, racerData.id)} value={racerData.lastName} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={(e) => handleRacerChange(e, racerData.id)} value={racerData.email} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="acaNumber">ACA #</label>
                <input type="text" name="acaNumber" id="acaNumber" onChange={(e) => handleRacerChange(e, racerData.id)} value={racerData.acaNumber} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="birthdate">Birthdate</label>
                <input type="date" name="birthdate" id="birthdate" onChange={(e) => handleRacerChange(e, racerData.id)} value={formatDateTime(new Date(racerData.birthdate)).htmlDate} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender">
                    <option>---</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer Not To Respond</option>
                </select>
            </div>
            <div className={`input-group ${styles["checkbox-group"]}`}>
                <label htmlFor="isPaid">Paid?</label>
                <input type="checkbox" name="isPaid" id="isPaid" checked={racerData.isPaid ? true : false} />
            </div>
            <div className={`${adminStyles["button-row"]} ${styles["edit-racer__button-row"]} `}>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={saveRacer}>
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                </button>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => setSelectedRacer(null)} >
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                </button>
            </div>
        </div>
        // </div>
    )
}