//Components
import AthleteRow from "./athleteRow.jsx";
import EditAthleteRow from "./editAthleteRow.jsx";
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard"
//Hooks
import { useState, useContext } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"

//Component for editing individual racer entity information
export default function EditGroupRow({ itemID, itemData, categoryOpts, setRegisteredRacerData, askDeleteItem, cancelAction, setErrorState }) {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [selectedRacer, setSelectedRacer] = useState(null)
    const [currentGroupInfo, setCurrentGroupInfo] = useState(itemData)
    const [isNoticeDisplayed, setIsNoticeDisplayed] = useState(false)


    console.log("Edit group row: ", itemID, currentGroupInfo, selectedRacer)

    //Add a racer to the boat.
    async function addRacer() {
        try {
            if (isNoticeDisplayed) setIsNoticeDisplayed(false)
            //create new blank racer
            let token = localStorage.getItem('token')
            //get the fields we will need to create a blank racer and generate an object with those keys and values set to null
            let tableFieldsResponse = await fetch("http://localhost:3000/racers/admin/tableInfo/racers", {
                headers: { authorization: `Bearer ${token}` }
            })
            let tableFields = await tableFieldsResponse.json()
            let blankRacer = {};
            for (let field of tableFields) { blankRacer[field.Field] = null }
            //set the racer's racerEntityID equal to the current group's id
            blankRacer.racerEntityID = itemID;
            blankRacer.id = 0;
            setCurrentGroupInfo(prev => {
                let updatedRacers = prev.racers.concat(blankRacer)
                let updatedGroupInfo = {
                    ...prev,
                    racers: updatedRacers
                }
                return updatedGroupInfo
            })
            setSelectedRacer(blankRacer)
        } catch (err) {
            setErrorState({ isInErrorState: true, message: `${err}` })
        }
    }

    //Updating the racer entity and saving to DB
    async function updateEntity(e) {
        try {
            let updatedValue = e.target.value;
            const token = localStorage.getItem("token")
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let wasUpdateSuccess = false;
            let updatedEntityResponse = await fetch(`http://localhost:3000/racers/admin/editRacerEntity/${raceToFetch}/${itemID}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [e.target.name]: e.target.value
                })
            })
            let updatedEntityData = await updatedEntityResponse.json()
            wasUpdateSuccess = updatedEntityResponse.status === 200
            if (!wasUpdateSuccess) throw new Error(updatedEntityData.message)
            else {
                setCurrentGroupInfo(prev => {
                    let updatedGroupInfo = {
                        ...prev,
                        [e.target.name]: updatedValue
                    }
                    return updatedGroupInfo
                })
            }
        } catch (err) {
            setErrorState({ isInErrorState: true, message: `${err}` })
        }
    }

    function handleDoneButtonClick() {
        if (currentGroupInfo && currentGroupInfo.racers.length > 0) {
            setRegisteredRacerData(prev => {
                let updatedRacerEntities = prev.map(racerEntity => Number(racerEntity.racerEntityID) !== Number(itemID) ? racerEntity : currentGroupInfo)
                return updatedRacerEntities
            })
            cancelAction()
        }
        else {
            setIsNoticeDisplayed(true)
        }

    }





    return (
        <div className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["racers-row"]} ${selectedRacer ? styles["disable-overlay"] : ""}`}>
            {isNoticeDisplayed &&
                <div className={`${styles["notice-modal"]}`}>
                    This boat must have at least one racer associated with it.  Please add a racer to continue.
                </div>
            }
            <div className={`${styles["racer-rows"]} ${styles["expanded-racer-rows"]}`}>
                {currentGroupInfo.racers.map(item => {
                    return (selectedRacer && item.id === selectedRacer.id) ?
                        <EditAthleteRow key={selectedRacer.id} itemData={item} setErrorState={setErrorState} setCurrentGroupInfo={setCurrentGroupInfo} setSelectedRacer={setSelectedRacer} />
                        :
                        <>
                            {!selectedRacer &&
                                <div className={`${adminStyles["row-icons"]} ${styles["id-column"]}`} style={!selectedRacer ? { justifyContent: "flex-end" } : {}}>
                                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faPenToSquare} style={{ color: "#000000", }} onClick={() => setSelectedRacer(item)} />
                                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleMinus} style={{ color: "#af2323", }} onClick={() => askDeleteItem(item.id, "racer")} />
                                </div>
                            }
                            <AthleteRow key={item.id} itemData={item} />
                        </>
                })
                }
            </div>
            <div className={`input-group ${styles["select-group"]} `}>
                <label htmlFor={`category-${itemID}`}>Category</label>
                <select name="category" onChange={updateEntity} disabled={selectedRacer ? true : false} id={`category-${itemID}`} value={currentGroupInfo.category} >
                    <option> -- </option>
                    {categoryOpts &&
                        categoryOpts.split(", ").map(category => <option value={category}>{category}</option>)
                    }
                </select>
            </div>
            {!selectedRacer &&
                <>
                    <div className={`${adminStyles["button-row"]} ${styles["add-racer__button-row"]} `}>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={addRacer}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faPlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Racer To Boat
                        </button>
                    </div>
                    <div className={`${adminStyles["button-row"]} ${styles["edit-racer-group__button-row"]} `}>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={handleDoneButtonClick}>
                            <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleCheck} style={{ color: "#016014", }} /> &nbsp;&nbsp;Done
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

