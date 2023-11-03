//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard"
//Hooks
import { useState, useContext } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../../utils/formatDateTime.js";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"


export default function EditAthleteRow({ itemData, setSelectedRacer, setErrorState, setCurrentGroupInfo }) {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [racerData, setRacerData] = useState(itemData)


    function handleRacerChange(e) {
        let updatedValue = e.target.type === 'date' ? formatDateTime(new Date(`${e.target.value}T00:00`)).htmlDate : e.target.value;
        console.log(updatedValue)
        setRacerData(prev => {
            let updatedRacerData = {
                ...prev,
                [e.target.name]: updatedValue
            }
            return updatedRacerData
        })
    }

    //Send the racer data to the database
    async function saveRacer() {
        try {
            const token = localStorage.getItem("token")
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let wasSaveSuccess = false;
            let savedRacerID = racerData.id;
            //If this is a new racer being added
            if (Number(racerData.id) == 0) {
                let savedRacerResponse = await fetch(`http://localhost:3000/racers/admin/addRacer/${raceToFetch}`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        ...racerData
                    })
                })
                let savedRacer = await savedRacerResponse.json()
                if (savedRacerResponse.status === 200) wasSaveSuccess = true;
                else { throw new Error(saveRacer.message) }
                savedRacerID = savedRacer.insertId
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
                let editedRacerResponse = await fetch(`http://localhost:3000/racers/admin/editRacer/${raceToFetch}/${racerData.id}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(filteredRacerData)
                })
                let editedRacer = await editedRacerResponse.json()
                if (editedRacerResponse.status === 200) wasSaveSuccess = true;
                else { throw new Error(editedRacer.message) }
            }
            if (wasSaveSuccess) {
                setCurrentGroupInfo(prev => {
                    let updatedRacers = prev.racers.map(racer => {
                        if (Number(racer.id) === Number(racerData.id)) return racerData
                        else return racer
                    })
                    let foundIndex = updatedRacers.findIndex(racer => Number(racer.id) === 0)
                    console.log(foundIndex)
                    if (foundIndex >= 0) updatedRacers[foundIndex].id = savedRacerID;
                    console.log(updatedRacers)
                    let updatedGroup = {
                        ...prev,
                        racers: updatedRacers
                    }
                    return updatedGroup
                })
                setSelectedRacer(null)
            }
        } catch (error) {
            setErrorState({ isInErrorState: true, message: `${error}` })
        }
    }

    function handleChecked() {
        setRacerData(prev => {
            return {
                ...prev,
                isPaid: Number(prev.isPaid) === 0? 1 : 0
            }
        })
    }

    function cancel() {
        if (Number(itemData.id) === 0) {
            setCurrentGroupInfo(prev => {
                let updatedRacers = prev.racers.filter(racer => Number(racer.id) !== Number(itemData.id))
                let updatedGroup = {
                    ...prev,
                    racers: updatedRacers
                }
                return updatedGroup
            })
        }
        setSelectedRacer(null)
    }

    return (
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
                <input type="date" name="birthdate" id="birthdate" onChange={(e) => handleRacerChange(e, racerData.id)} value={racerData.birthdate} />
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
                <input type="checkbox" name="isPaid" id="isPaid" onClick={handleChecked} checked={Number(racerData.isPaid) === 1 ? true : false} />
            </div>
            <div className={`${adminStyles["button-row"]} ${styles["edit-racer__button-row"]} `}>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={saveRacer}>
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                </button>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => cancel()} >
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                </button>
            </div>
        </div>
    )
}