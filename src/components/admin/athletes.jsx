//Components
import Default from "./default.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./athletes.module.css"


//Component for informational row only.  Buttons to edit or delete racers.
function AthleteRow({ i, registeredRacers, askDeleteRacer, editRacer }) {
    return (
        <div className={`${styles["racer-row"]}`}>
            <div className={`${styles["row-icons"]}`}>
                <FontAwesomeIcon className={`${styles["action-icon"]}`} onClick={() => editRacer(registeredRacers[i].id)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${styles["action-icon"]}`} onClick={() => askDeleteRacer(registeredRacers[i].id)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{registeredRacers[i].id}</p>
            <p>{registeredRacers[i].firstName}</p>
            <p>{registeredRacers[i].lastName}</p>
            <p>{registeredRacers[i].email}</p>
            <p>{registeredRacers[i].category}</p>
            {
                JSON.parse(registeredRacers[i].partners) &&
                <div className={`${styles["partners-block"]}`}>
                    <div className={`${styles["partners-row"]}`}>
                        <p><strong>Partners:</strong> {JSON.parse(registeredRacers[i].partners).map(partner => `${partner.firstName} ${partner.lastName}`).join(', ')}</p>
                    </div>
                </div>
            }
        </div>
    )
}


//Component for editing individual racer information
function EditRow({ i, registeredRacers, selectedRaceInfo, saveRacer, handleChange, deletePartner, addPartner }) {
    return (
        <div className={`${styles["racer-row"]}`}>
            <div className={`${styles["row-icons"]}`}>
                <FontAwesomeIcon className={`${styles["action-icon"]}`} onClick={() => saveRacer(registeredRacers[i].id)} icon={faFloppyDisk} style={{ color: "#016014", }} />
            </div>
            <p>{registeredRacers[i].id}</p>
            <input type="text" name="firstName" id={`firstName-${i}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={registeredRacers[i].firstName} />
            <input type="text" name="lastName" id={`lastName-${i}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={registeredRacers[i].lastName} />
            <input type="text" name="email" id={`email-${i}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={registeredRacers[i].email} />
            <select name="category" id={`category-${i}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={registeredRacers[i].category} >
                <option> -- </option>
                {
                    JSON.parse(selectedRaceInfo.racerCategories).map(category => {
                        return <option value={category}>{category}</option>
                    })
                }
            </select>
            <div className={`${styles["edit-partners-block"]}`}>
                <p>Partners:</p>
                {JSON.parse(registeredRacers[i].partners) &&
                    JSON.parse(registeredRacers[i].partners).map((partner, partnerIndex) =>
                        <div className={`${styles["edit-partners-row"]}`}>
                            <input type="text" name="partner-firstName" id={`partner-firstName-${partnerIndex}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={partner.firstName} />
                            <input type="text" name="partner-lastName" id={`partner-lastName-${partnerIndex}`} onChange={(e) => handleChange(e, registeredRacers[i].id)} value={partner.lastName} />
                            <FontAwesomeIcon onClick={() => deletePartner(partnerIndex, registeredRacers[i].id)} className={`${styles["action-icon"]}`} icon={faCircleMinus} style={{ color: "#af2323", }} />
                        </div>
                    )
                }
                < FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} onClick={() => addPartner(registeredRacers[i].id)} />
            </div>
        </div>
    )
}

function DeleteConfirmation({ selectedRacer, setSelectedRacer, setSelectedAction, confirmDeleteRacer }) {
    return (
        <div className={`${styles["delete-confirm__container"]}`}>
            <div>
                Are you sure you want to delete {selectedRacer.firstName} {selectedRacer.lastName}?<br />
                This action cannot be undone.
                <div className={`${styles["button__row"]}`}>
                    <button type="button" className="button button--medium"
                        onClick={() => {
                            confirmDeleteRacer(selectedRacer.id)
                        }}>Confirm</button>
                    <button type="button" className="button button--medium" onClick={() => {
                        setSelectedRacer(null);
                        setSelectedAction(null);
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default function Athletes() {
    const selectedRace = useContext(SelectedRaceContext)[0];
    const [selectedRaceInfo, setSelectedRaceInfo] = useState()
    const userInfo = useContext(UserInfoContext)
    const [registeredRacers, setRegisteredRacers] = useState(null)
    const [selectedAction, setSelectedAction] = useState(null)
    const [selectedRacer, setSelectedRacer] = useState(null)
    const [addedRacerID, setAddedRacerID] = useState(null)

    console.log(`Selected racer: `, selectedRacer, 'Selected race info: ', selectedRaceInfo, ` All Racers `, registeredRacers)

    useEffect(() => {
        const getRacerData = async () => {
            try {
                const token = localStorage.getItem("token")
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let fetchedRacerData = await fetch(`http://localhost:3000/racers/admin/${raceToFetch}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                let fetchedRacerJSON = await fetchedRacerData.json();
                setRegisteredRacers(fetchedRacerJSON[0])
            } catch (error) {
                console.error(error);
            }
        }
        getRacerData()
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let fetchedRaceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let fetchedRaceJSON = await fetchedRaceData.json();
                setSelectedRaceInfo(fetchedRaceJSON[0])
            } catch (error) {
                console.error(error);
            }
        }
        getRaceData()
    }, [selectedRace])

    useEffect(() => {
        if (addedRacerID) { editRacer(addedRacerID) }
    }, [addedRacerID])

    function editRacer(racerId) {
        setSelectedRacer(registeredRacers.find(racer => Number(racer.id) === Number(racerId)))
        setSelectedAction('edit')
    }

    function handleChange(e, racerId) {
        console.log(racerId)
        //If editing a partner field
        if (e.target.id.split('-')[0] === "partner") {
            //Find the index of the partner - stored in the inputs id field(from within the selected users partners array)
            let partnerIndex = Number(e.target.id.split('-')[2])
            //update registred racers
            setRegisteredRacers(prev => {
                //Find the racer to edit based on the passed in racer id
                let racerToEdit = prev.find(racer => Number(racer.id) === Number(racerId))
                //Update the selected racer's selected partner's selected field - i.e racer #1s 2nd partner's first name
                let updatedPartners = JSON.parse(racerToEdit.partners).map((partner, i) => {
                    return i !== partnerIndex ? partner : { ...partner, [e.target.name.split('-')[1]]: e.target.value }
                })
                //Update the racers by mapping through them and on the selected racer, update the parnters list with the updated list from above
                let updatedRacers = prev.map(racer => {
                    if (Number(racer.id) === Number(racerId)) {
                        return {
                            ...racer,
                            partners: JSON.stringify(updatedPartners)
                        }
                    }
                    else return racer;
                })
                return updatedRacers
            })
        }
        //If not editing a partner field, map through the registered racers and aon the select racer update the selected field.
        else {
            setRegisteredRacers(prev => {
                let updatedRacers = prev.map(racer => {
                    if (Number(racer.id) === Number(racerId)) {
                        return {
                            ...racer,
                            [e.target.name]: e.target.value
                        }
                    }
                    else return racer
                })
                return updatedRacers
            })
        }
    }


    //CREATE FUNCTIONS
    async function addRacer() {
        const blankRacer = {};
        const token = localStorage.getItem('token')
        for (let propertyName in registeredRacers[0]) {
            if (['year', 'raceName', 'category'].includes(propertyName)) blankRacer[propertyName] = registeredRacers[0][propertyName]
            else blankRacer[propertyName] = null;
        }
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let addedRacer = await fetch(`http://localhost:3000/racers/${raceToFetch}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blankRacer)
        })
        let addedRacerJSON = await addedRacer.json()
        setRegisteredRacers(prev => {
            let updatedRacers = prev.concat({ ...blankRacer, id: addedRacerJSON.insertId })
            return updatedRacers
        })
        setAddedRacerID(addedRacerJSON.insertId)
    }

    function addPartner(racerId) {
        setRegisteredRacers(prev => {
            let updatedRacers = prev.map(racer => {
                if (Number(racer.id) === Number(racerId)) {
                    let updatedPartners = JSON.parse(racer.partners)? JSON.parse(racer.partners).concat({ firstName: null, lastName: null }) : [{ firstName: null, lastName: null }] 
                    return {
                        ...racer,
                        partners: JSON.stringify(updatedPartners)
                    }
                }
                else {
                    return racer
                }
            })
            return updatedRacers
        })
    }

    //UPDATE FUNCTIONS
    async function saveRacer(racerId) {
        let racerInfoToSave = registeredRacers.find(racer => Number(racer.id) === Number(racerId))
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let updateRacerResponse = await fetch(`http://localhost:3000/racers/${raceToFetch}/${racerId}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(racerInfoToSave)
        })
        const updateRacerJSON = await updateRacerResponse.json();
        console.log(updateRacerJSON)
        setSelectedRacer(null)
        setSelectedAction(null)
    }


    //DELETE FUNCTIONS
    function deletePartner(partnerIndex, racerId) {
        setRegisteredRacers(prev => {
            let updatedRacers = prev.map(racer => {
                if (Number(racer.id) === Number(racerId)) {
                    let updatedPartners = JSON.parse(racer.partners).toSpliced(partnerIndex, 1)
                    return {
                        ...racer,
                        partners: JSON.stringify(updatedPartners)
                    }
                }
                else return racer
            })
            return updatedRacers
        })
    }

    function askDeleteRacer(racerId) {
        setSelectedRacer(registeredRacers.find(racer => Number(racer.id) === Number(racerId)))
        setSelectedAction('delete')
    }

    async function confirmDeleteRacer(racerId) {
        const token = localStorage.getItem("token")
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let deletedRacerResponse = await fetch(`http://localhost:3000/racers/${raceToFetch}/${racerId}`, {
            method: "Delete",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const getRacerData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let fetchedRacerData = await fetch(`http://localhost:3000/racers/${raceToFetch}`)
                let fetchedRacerJSON = await fetchedRacerData.json();
                setRegisteredRacers(fetchedRacerJSON[0])
            } catch (error) {
                console.error(error);
            }
        }
        getRacerData()
        setSelectedAction(null)
    }











    if (selectedRace) {
        return (
            <>
                <div className={`${styles["registered-racers__container"]}`}>

                    <div className={`${styles["racer-headers"]}`}>
                        <h6></h6><h6>ID</h6><h6>First Name</h6><h6>Last Name</h6><h6>Email</h6><h6>Category</h6>
                    </div>
                    {selectedAction === 'delete' &&
                        <>
                            {registeredRacers ? registeredRacers.map((racer, i) => <AthleteRow i={i} registeredRacers={registeredRacers} askDeleteRacer={askDeleteRacer} editRacer={editRacer} />) : 'No data'}
                            <DeleteConfirmation
                                selectedRacer={selectedRacer}
                                setSelectedRacer={setSelectedRacer}
                                setSelectedAction={setSelectedAction}
                                confirmDeleteRacer={confirmDeleteRacer}
                            />
                        </>

                    }
                    <div>
                        {!selectedAction &&
                            (registeredRacers ? registeredRacers.map((racer, i) => <AthleteRow i={i} registeredRacers={registeredRacers} askDeleteRacer={askDeleteRacer} editRacer={editRacer} />) : 'No data')
                        }
                        {selectedAction === 'edit' &&
                            (registeredRacers ? registeredRacers.map((racer, i) => {
                                return Number(racer.id) === Number(selectedRacer.id) ?
                                    <EditRow i={i} registeredRacers={registeredRacers} selectedRaceInfo={selectedRaceInfo} saveRacer={saveRacer} handleChange={handleChange} deletePartner={deletePartner} addPartner={addPartner} />
                                    :
                                    <AthleteRow i={i} registeredRacers={registeredRacers} askDeleteRacer={askDeleteRacer} editRacer={editRacer} />
                            })
                                : 'No edit')
                        }

                    </div>
                    <br />
                    <button className="button button--medium" onClick={() => addRacer()}>
                        <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Racer
                    </button>
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}