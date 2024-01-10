//Components
import Default from "./default";
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
import { UserInfoContext } from "../../pages/layout.jsx";

//Hooks
import { useContext, useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
//Libs
import { convertTime } from "../../utils/formatDateTime";
//Styles
import styles from "./schedule.module.css"
import adminStyles from "./adminGlobalStyles.module.css"


// Component for informational row only.  Buttons to edit or delete items.
function ScheduleItemRow({ itemID, itemData, askDeleteItem, editItem }) {
    return (
        <div className={`${adminStyles["info-row"]} ${styles["schedule-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemData.startTime ? convertTime(itemData.startTime) : ""}</p>
            <p>{itemData.endTime ? convertTime(itemData.endTime) : ""}</p>
            <p>{itemData.name ? itemData.name : ""}</p>
            <p>{itemData.location ? itemData.location : ""}</p>
        </div>
    )
}

//Component with input elements to update selected schedule item.  Button to save or cancel edited data.
function EditScheduleItemRow({ itemID, itemData, handleChange, saveItem, cancelAction }) {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [locationsOpts, setLocationsOpts] = useState([])

    console.log(locationsOpts)

    useEffect(() => {
        async function getLocations() {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let locationResponse = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/locationNames/${raceToFetch}`)
                let locationsData = await locationResponse.json();
                if (locationResponse.status === 200) {
                    setLocationsOpts(locationsData)
                }
                else throw new Error(locationsData.message)
            } catch (error) {
                console.log(error)
            }
        }
        getLocations()
    }, [])

    return (
        <>
            <div className={`${adminStyles["info-row"]} ${styles["edit-row"]} ${adminStyles["edit-row"]}`}>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`schedule-startTime-${itemID}`}>Start Time</label>
                        <input type="time" name="startTime" id={`schedule-startTime-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.startTime} />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor={`schedule-endTime-${itemID}`}>End Time</label>
                        <input type="time" name="endTime" id={`schedule-endTime-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.endTime} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`schedule-name-${itemID}`}>Name</label>
                        <input type="text" name="name" id={`schedule-name-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.name} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-${itemID}`}>Location</label>
                        <select name="location" id={`location-${itemID}`} onChange={(e) => handleChange(e, itemID)}>
                            <option> -- </option>
                            {locationsOpts &&
                                locationsOpts.map(location => <option value={location.name} selected = {`${location.name === itemData.location? "selected":""}`}>{location.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className={`${adminStyles["button-row"]} ${adminStyles["final-row"]} `}>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => saveItem(itemID)}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                    </button>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={cancelAction}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                    </button>
                </div>
            </div>
        </>
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



export default function Schedule() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const userInfo = useContext(UserInfoContext)[0] //Logged in user info contianed in token
    const [scheduleData, setScheduleData] = useState(null);  //Array of objectes each containing data about specific schedule item
    const [selectedItemID, setSelectedItemID] = useState(null);  //The ID of a selected schedule item  
    const [selectedAction, setSelectedAction] = useState(null);  //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getScheduleData()
    }, [selectedRace])

    console.log(scheduleData)

    //Basic fetch of schedule data
    async function getScheduleData() {
        try {
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let response = await fetch(`${process.env.REACT_APP_SERVER}/schedule/${raceToFetch}`)
            let responseJSON = await response.json();
            let cleanedResponseJSON = responseJSON.map(item => {
                for (let propertyName of Object.keys(item)) {
                    if (item[propertyName] === 'null' || item[propertyName] === "00:00:00") item[propertyName] = null
                }
                return item;
            })
            setScheduleData(cleanedResponseJSON)
        }
        catch (err) {
            console.error(err)
            setScheduleData([])
        }
    }

    //Add a blank item with corresponding race name and id to the DB and repopulate the scheduleData state
    async function addItem() {
        const token = localStorage.getItem('token')
        let tableInfoResponse = await fetch(`${process.env.REACT_APP_SERVER}/schedule/tableInfo`, {
            headers: { authorization: `Bearer ${token}` }
        })
        let tableInfo = await tableInfoResponse.json()
        const blankItem = { raceName: selectedRace };
        tableInfo.forEach(column => {
            if (column.Field !== 'id' && column.Field !== 'raceName') blankItem[column.Field] = null
        })
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let addedItem = await fetch(`${process.env.REACT_APP_SERVER}/schedule/${raceToFetch}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blankItem)
        })
        let addedItemJSON = await addedItem.json()
        setScheduleData(prev => {
            let updatedSchedule = prev.concat({ ...blankItem, id: addedItemJSON.insertId })
            return updatedSchedule
        })
        setSelectedItemID(addedItemJSON.insertId)
        setSelectedAction('edit')
    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }

    //Action for when cancel button is selected
    function cancelAction() {
        setSelectedItemID(null);
        setSelectedAction(null);
    }

    //Update the selected item in the database by way of its ID
    async function saveItem(itemID) {
        let itemDataToSave = scheduleData.find(item => item.id === itemID);
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let updatedScheduleResponse = await fetch(`${process.env.REACT_APP_SERVER}/schedule/${raceToFetch}/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemDataToSave)
        })
        const updatedScheduleJSON = await updatedScheduleResponse.json();
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    //Set the selected action state to delete and the selected item id to the id of the item selected -- this will render the delete confirmation component with the ability to confirm or cancel deletion
    function askDeleteItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('delete')
    }

    //Display a modal to ask user to confirm deleting the item - if confirmed delete item from the database
    async function confirmDeleteItem(itemID) {
        try {
            const token = localStorage.getItem("token");
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            const deletedItem = await fetch(`${process.env.REACT_APP_SERVER}/schedule/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            const deletedItemInfo = await deletedItem.json();
            getScheduleData();
        }
        catch (err) {
            console.log(err)
        }
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    //Update the schedule data when an input value field is being changed
    function handleChange(e, itemID) {
        setScheduleData(prev => {
            let updatedSchedule = prev.map(scheduleItem => {
                if (scheduleItem.id !== itemID) return scheduleItem
                else {
                    let updatedScheduleItem = {
                        ...scheduleItem,
                        [e.target.name]: e.target.value
                    }
                    return updatedScheduleItem
                }
            })
            return updatedSchedule
        })
    }


    if (selectedRace && scheduleData) {
        return (
            <div className={`${adminStyles["info__container"]}`}>
                <h2 className="section-heading">{selectedRace ? `${selectedRace} Schedule` : `Select a race to edit`}</h2>
                <div className={`${adminStyles["info-headers"]} ${styles['schedule-headers']}`}>
                    <h6></h6><h6>Start</h6><h6>End</h6><h6>What</h6><h6>Where</h6>
                </div>
                {selectedAction === 'delete' &&
                    <>
                        {scheduleData.map(scheduleItem => <ScheduleItemRow key={scheduleItem.id} itemID={scheduleItem.id} itemData={scheduleItem} editItem={editItem} askDeleteItem={askDeleteItem} />)}
                        <DeleteConfirmation
                            itemID={selectedItemID}
                            setSelectedItemID={setSelectedItemID}
                            setSelectedAction={setSelectedAction}
                            confirmDeleteItem={confirmDeleteItem}
                            cancelAction={cancelAction}
                        />
                    </>
                }
                {!selectedAction &&
                    scheduleData.map(scheduleItem => <ScheduleItemRow key={scheduleItem.id} itemID={scheduleItem.id} itemData={scheduleItem} editItem={editItem} askDeleteItem={askDeleteItem} />)
                }
                {selectedAction === 'edit' &&
                    scheduleData.map(scheduleItem => {
                        return selectedItemID === scheduleItem.id ?
                            <EditScheduleItemRow key={scheduleItem.id} itemID={scheduleItem.id} itemData={scheduleItem} handleChange={handleChange} saveItem={saveItem} cancelAction={cancelAction} />
                            :
                            <ScheduleItemRow key={scheduleItem.id} itemID={scheduleItem.id} itemData={scheduleItem} askDeleteItem={askDeleteItem} editItem={editItem} />
                    })
                }
                {selectedAction !== 'edit' &&
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => addItem()}>
                        <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Schedule Item
                    </button>
                }
            </div>
        )
    }
    else return <Default userInfo={userInfo} />
}