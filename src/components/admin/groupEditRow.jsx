//Components
import { AthleteRow } from "./athletes.jsx";
//Hooks
import { useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../../utils/formatDateTime.js";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"

//Component for editing individual racer entity information
export default function EditGroupRow({ itemID, itemData, handleRacerChange, handleCategoryChange, cancelAction }) {
    const [selectedRacer, setSelectedRacer] = useState(null)

    //Update a racer-entity
    async function saveGroup(){

    }

    return (
        <div className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["racers-row"]} ${selectedRacer ? styles["disable-overlay"] : ""}`}>
            <div className={`${styles["racer-rows"]} ${styles["expanded-racer-rows"]}`}>
                {itemData[1].map(item => {
                    return (selectedRacer && item.id === selectedRacer.id) ?
                        <EditAthleteRow key={selectedRacer.id} itemData={item} handleRacerChange={handleRacerChange} setSelectedRacer={setSelectedRacer} />
                        :
                        <>{!selectedRacer &&
                            <div className={`${adminStyles["row-icons"]} ${styles["id-column"]}`} style={!selectedRacer? {justifyContent: "flex-end"} : {}}>
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
                <select name="category" disabled={selectedRacer ? true : false} id={`category-${itemID}`} onChange={(e) => handleCategoryChange(e, itemID)} value={itemData[1][0].category} >
                    <option> -- </option>
                    {itemData[1][0].categoryOpts &&
                        itemData[1][0].categoryOpts.split(", ").map(category => <option value={category}>{category}</option>)
                    }
                </select>
            </div>
            {!selectedRacer &&
                <div className={`${adminStyles["button-row"]} ${styles["final-row"]} `}>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                    </button>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={cancelAction}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                    </button>
                </div>
            }
        </div>
    )
}

function EditAthleteRow({ itemData, handleRacerChange, setSelectedRacer }) {

    return (
        // <div className={`${styles["edit-racer__row"]}`}>
        <div className={`${styles["edit-racer-inputs__container"]}`}>
            <div className={`input-group`}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={(e) => handleRacerChange(e, itemData.id)} value={itemData.firstName} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={(e) => handleRacerChange(e, itemData.id)} value={itemData.lastName} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={(e) => handleRacerChange(e, itemData.id)} value={itemData.email} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="acaNumber">ACA #</label>
                <input type="text" name="acaNumber" id="acaNumber" onChange={(e) => handleRacerChange(e, itemData.id)} value={itemData.acaNumber} />
            </div>
            <div className={`input-group`}>
                <label htmlFor="birthdate">Birthdate</label>
                <input type="date" name="birthdate" id="birthdate" onChange={(e) => handleRacerChange(e, itemData.id)} value={formatDateTime(new Date(itemData.birthdate)).htmlDate} />
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
                <input type="checkbox" name="isPaid" id="isPaid" value={itemData.firstName} />
            </div>

            <div className={`${adminStyles["button-row"]} ${styles["edit-racer__button-row"]} `}>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`}>
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