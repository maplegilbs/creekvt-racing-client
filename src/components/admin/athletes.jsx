//Components
import Default from "./default.jsx";
import EditGroupRow from "./groupEditRow.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../../utils/formatDateTime.js";
import { v4 as uuidv4 } from "uuid"
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"


//Component for informational row only.  Buttons to edit or delete racers.
function GroupRow({ itemID, itemData, askDeleteItem, editItem }) {
    return (
        <div className={`${adminStyles["info-row"]} ${styles["group-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemID ? itemID : ""}</p>
            <div className={`${styles["racer-rows"]}`}>
                {itemData.racers.map(item => <AthleteRow key={item.id} itemData={item} />)}
            </div>
            <p>{itemData.category ? itemData.category : ""}</p>
        </div>
    )
}

export function AthleteRow({ itemData }) {
    return (
        <div className={`${styles["racer-row"]}`}>
            <p>{itemData.firstName ? itemData.firstName : ""}</p>
            <p>{itemData.lastName ? itemData.lastName : ""}</p>
            <p>{itemData.email ? itemData.email : ""}</p>
        </div>
    )
}



function DeleteConfirmation({ itemID, confirmDeleteItem, cancelAction }) {
    return (
        <div className={`${adminStyles["delete-confirm__container"]}`}>
            <div>
                {`Are you sure you want to delete this item?`}<br />
                This action cannot be undone.
                <div className={`${adminStyles["button-row"]} ${adminStyles["button-row--even-space"]}`}>
                    <button type="button" className="button button--medium" onClick={() => confirmDeleteItem(itemID)}>
                        Confirm
                    </button>
                    <button type="button" className="button button--medium" onClick={cancelAction}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Athletes() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const selectedRaceYear = useContext(SelectedRaceContext)[2] //Year of race as a string
    const userInfo = useContext(UserInfoContext) //Logged in user info contianed in token
    const [registeredRacerData, setRegisteredRacerData] = useState(null) //Array of objectes each containing data about specific racer
    const [selectedAction, setSelectedAction] = useState(null);  //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not
    const [selectedItemID, setSelectedItemID] = useState(null);  //The ID of a selected racer  
    const [categoryOpts, setCategoryOpts] = useState(null)

    console.log(registeredRacerData, selectedAction, selectedItemID)

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getRacerData()
    }, [selectedRace, selectedRaceYear])


    //Fetching and fomatting racer data
    async function getRacerData() {
        try {
            const token = localStorage.getItem("token")
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let response = await fetch(`http://localhost:3000/racers/admin/${raceToFetch}/${selectedRaceYear}`, {
                headers: { authorization: `Bearer ${token}` }
            })
            let responseJSON = await response.json();
            let cleanedResponseJSON = responseJSON.map(item => {
                for (let propertyName of Object.keys(item)) {
                    if (item[propertyName] === 'null') item[propertyName] = null
                }
                return item;
            })
            //cycle through the response json.  if selected racer has an id that matches any other entity ids, add those to the current racers "group" (array)
            //end with an object {id: [racer1Obj, racer2Obj], id: [racer1Obj]}
            let groupedRacers = cleanedResponseJSON.reduce((accum, racer) => {
                let updatedRacerEntity = accum[racer.racerEntityID] ? accum[racer.racerEntityID].concat(racer) : [racer]
                accum[racer.racerEntityID] = updatedRacerEntity
                return accum
            }, {})
            //take the above formatted object and turn it into an array [ [id, [racer1Obj, racer2Obj]], [id, [racer1Obj]] ] that will be easier to map through later
            let groupedRacersArray = []
            Object.keys(groupedRacers).forEach(racerEntityID => {
                groupedRacersArray.push({
                    racerEntityID: racerEntityID,
                    category: groupedRacers[racerEntityID][0].category,
                    racers: groupedRacers[racerEntityID],
                })
            })
            setRegisteredRacerData(groupedRacersArray)
            setCategoryOpts(groupedRacers[Object.keys(groupedRacers)[1]][0].categoryOpts)
        }
        catch (err) {
            console.error(err)
            setRegisteredRacerData([])
        }
    }

    function handleRacerChange(e, itemID) {
        console.log(e.target, itemID)
        setRegisteredRacerData(prev => {
            let updatedRacerEntities = prev.map(racerEntity => {
                let updatedRacerEntity = racerEntity[1].map(racer => {
                    if (Number(racer.id) === Number(itemID)) {
                        return {
                            ...racer,
                            [e.target.name]: e.target.value
                        }
                    }
                    else return racer
                })
                return [racerEntity[0], updatedRacerEntity]
            })
            return updatedRacerEntities
        })
    }


    //Action for when add racer (racer entity) button is selected
    function addRacer() {
        let newRacer = {
            category: null,
            racerEntityID: 0,
            racers: []
        }
        console.log(newRacer)
        console.log(categoryOpts)
        setRegisteredRacerData(prev=>{
            let updatedRacerData = prev.concat(newRacer)
            return updatedRacerData
        })
        editItem(newRacer.racerEntityID)

    }

    //Action for when cancel button is selected
    function cancelAction() {
        setSelectedItemID(null);
        setSelectedAction(null);
    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }

    //Set the selected action state to delete and the selected item id to the id of the item selected -- this will render the delete confirmation component with the ability to confirm or cancel deletion
    function askDeleteItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('delete')
    }


    if (selectedRace) {
        return (
            <>
                <div className={`${adminStyles["info__container"]}`}>
                    <div className={`${adminStyles["info-headers"]} ${styles["racer-headers"]}`}>
                        <h6></h6><h6>ID</h6><h6>First Name</h6><h6>Last Name</h6><h6>Email</h6><h6>Category</h6>
                    </div>
                    {selectedAction === 'delete' &&
                        <>
                            {registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data'}
                            <DeleteConfirmation
                                itemID={selectedItemID}
                                setSelectedItemID={setSelectedItemID}
                                setSelectedAction={setSelectedAction}
                                cancelAction={cancelAction}
                            />
                        </>
                    }
                    <div>
                        {!selectedAction &&
                            (registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data')
                        }
                        {selectedAction === 'edit' &&
                            (registeredRacerData ? registeredRacerData.map(racerEntity => {
                                return Number(racerEntity.racerEntityID) === Number(selectedItemID) ?
                                    <EditGroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} categoryOpts={categoryOpts} handleRacerChange={handleRacerChange} cancelAction={cancelAction} />
                                    :
                                    <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />
                            })
                                : 'No edit')
                        }
                    </div>
                    <br />
                    {selectedAction !== 'edit' &&
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={addRacer}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Racer
                        </button>
                    }
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}