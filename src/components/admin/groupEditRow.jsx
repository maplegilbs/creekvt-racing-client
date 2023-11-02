//Components
import { AthleteRow } from "./athletes.jsx";
import EditAthleteRow from "./editAthleteRow.jsx";
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

//Component for editing individual racer entity information
export default function EditGroupRow({ itemID, itemData, categoryOpts, handleRacerChange, cancelAction }) {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const selectedRaceYear = useContext(SelectedRaceContext)[2] //Year of race as a string
    const userInfo = useContext(UserInfoContext) //Logged in user info contianed in token
    const [selectedRacer, setSelectedRacer] = useState(null)
    const [currentGroupInfo, setCurrentGroupInfo] = useState(itemData)

    console.log("Edit group row: ", itemID, currentGroupInfo, selectedRacer)

    //Add a teammate.  If the group ID is not 0 we can set our teammate ID to 0
    async function addTeammate() {
        //create new blank teammate
        let token = localStorage.getItem('token')
        let tableFieldsResponse = await fetch("http://localhost:3000/racers/tableInfo/racers", {
            headers: { authorization: `Bearer ${token}` }
        })
        let tableFields = await tableFieldsResponse.json()
        let blankRacer = {};
        for (let field of tableFields) { blankRacer[field.Field] = null }
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
    }



    return (
        <div className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["racers-row"]} ${selectedRacer ? styles["disable-overlay"] : ""}`}>
            <div className={`${styles["racer-rows"]} ${styles["expanded-racer-rows"]}`}>
                {currentGroupInfo.racers.map(item => {
                    return (selectedRacer && item.id === selectedRacer.id) ?
                        <EditAthleteRow key={selectedRacer.id} itemData={item} currentGroupInfo={currentGroupInfo} setCurrentGroupInfo={setCurrentGroupInfo} setSelectedRacer={setSelectedRacer} />
                        :
                        <>{!selectedRacer &&
                            <div className={`${adminStyles["row-icons"]} ${styles["id-column"]}`} style={!selectedRacer ? { justifyContent: "flex-end" } : {}}>
                                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faPenToSquare} style={{ color: "#000000", }} onClick={() => setSelectedRacer(item)} />
                                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleMinus} style={{ color: "#af2323", }} />
                            </div>
                        }
                            <AthleteRow key={item.id} itemData={item} />
                        </>
                })
                }
            </div>
            <div className={`input-group ${styles["select-group"]} `}>
                <label htmlFor={`category-${itemID}`}>Category</label>
                <select name="category" disabled={selectedRacer ? true : false} id={`category-${itemID}`} value={currentGroupInfo.category} >
                    <option> -- </option>
                    {categoryOpts &&
                        categoryOpts.split(", ").map(category => <option value={category}>{category}</option>)
                    }
                </select>
            </div>
            {!selectedRacer &&
                <>
                    <div className={`${adminStyles["button-row"]} ${styles["add-racer__button-row"]} `}>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={addTeammate}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Teammate
                        </button>
                    </div>
                    <div className={`${adminStyles["button-row"]} ${styles["edit-racer-group__button-row"]} `}>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`}>
                            <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                        </button>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={cancelAction}>
                            <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

