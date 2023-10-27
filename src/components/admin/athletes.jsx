//!Need to pull in categories, birthday, gender, and year

//Components
import Default from "./default.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./athletes.module.css"
import adminStyles from "./adminGlobalStyles.module.css"


//Component for informational row only.  Buttons to edit or delete racers.
function AthleteRow({ itemID, itemData, askDeleteItem, editItem }) {
    return (
        <div className={`${adminStyles["info-row"]} ${styles["racer-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemData.id ? itemData.id : ""}</p>
            <p>{itemData.firstName ? itemData.firstName : ""}</p>
            <p>{itemData.lastName ? itemData.lastName : ""}</p>
            <p>{itemData.email ? itemData.email : ""}</p>
            <p>{itemData.category ? itemData.category : ""}</p>
            {
                (JSON.parse(itemData.partners) && JSON.parse(itemData.partners).length > 0) &&
                <div className={`${styles["partners-block"]}`}>
                    <div className={`${styles["partners-row"]}`}>
                        <p><strong>Partners:</strong> {JSON.parse(itemData.partners).map(partner => `${partner.firstName} ${partner.lastName}`).join(', ')}</p>
                    </div>
                </div>
            }
        </div>
    )
}


//Component for editing individual racer information
// function EditScheduleItemRow({ itemID, itemData, handleChange, saveItem }) {
function EditAthleteRow({ itemID, itemData, handleChange, saveItem, deletePartner, addPartner, cancelAction }) {
    return (
        <div className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["racer-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
            </div>
            <p>{itemID}</p>
            <input type="text" name="firstName" id={`firstName-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.firstName} />
            <input type="text" name="lastName" id={`lastName-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.lastName} />
            <input type="text" name="email" id={`email-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.email} />
            <select name="category" id={`category-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.category} >
                <option> -- </option>
                {itemData.categoryOpts &&
                    itemData.categoryOpts.split(", ").map(category => {
                        return <option value={category}>{category}</option>
                    })
                }
            </select>
            <div className={`${styles["edit-partners-block"]}`}>
                <p>Partners:</p>
                {JSON.parse(itemData.partners) &&
                    JSON.parse(itemData.partners).map((partner, partnerIndex) =>
                        <div className={`${styles["edit-partners-row"]}`}>
                            <input type="text" name="partner-firstName" id={`partner-firstName-${partnerIndex}`} onChange={(e) => handleChange(e, itemID)} value={partner.firstName} />
                            <input type="text" name="partner-lastName" id={`partner-lastName-${partnerIndex}`} onChange={(e) => handleChange(e, itemID)} value={partner.lastName} />
                            <FontAwesomeIcon onClick={() => deletePartner(partnerIndex, itemID)} className={`${styles["action-icon"]}`} icon={faCircleMinus} style={{ color: "#af2323", }} />
                        </div>
                    )
                }
                < FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} onClick={() => addPartner(itemID)} />
            </div>
            <div className={`${adminStyles["button-row"]} ${styles["final-row"]} `}>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => saveItem(itemID)}>
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                </button>
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={cancelAction}>
                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                </button>
            </div>
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

console.log(registeredRacerData)

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getRacerData()
    }, [selectedRace])


    //Basic fetch of schedule data
    async function getRacerData() {
        try {
            const token = localStorage.getItem("token")
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let response = await fetch(`http://localhost:3000/racers/admin/${raceToFetch}/${selectedRaceYear}`, {
                headers: { authorization: `Bearer ${token}` }
            })
            let responseJSON = await response.json();
            console.log(responseJSON)
            let cleanedResponseJSON = responseJSON.map(item => {
                for (let propertyName of Object.keys(item)) {
                    if (item[propertyName] === 'null' || item[propertyName] === "00:00:00") item[propertyName] = null
                }
                return item;
            })
            setRegisteredRacerData(cleanedResponseJSON)
        }
        catch (err) {
            console.error(err)
            setRegisteredRacerData([])
        }
    }



    function handleChange(e, itemID) {
        //If editing a partner field
        if (e.target.id.split('-')[0] === "partner") {
            //Find the index of the partner - stored in the inputs id field(from within the selected users partners array)
            let partnerIndex = Number(e.target.id.split('-')[2])
            //update registred racers
            setRegisteredRacerData(prev => {
                //Find the racer to edit based on the passed in racer id
                let racerToEdit = prev.find(racer => Number(racer.id) === Number(itemID))
                //Update the selected racer's selected partner's selected field - i.e racer #1s 2nd partner's first name
                let updatedPartners = JSON.parse(racerToEdit.partners).map((partner, i) => {
                    return i !== partnerIndex ? partner : { ...partner, [e.target.name.split('-')[1]]: e.target.value }
                })
                //Update the racers by mapping through them and on the selected racer, update the parnters list with the updated list from above
                let updatedRacers = prev.map(racer => {
                    if (Number(racer.id) === Number(itemID)) {
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
        //If not editing a partner field, map through the registered racers and on the selected racer update the selected field.
        else {
            setRegisteredRacerData(prev => {
                let updatedRacers = prev.map(racer => {
                    if (Number(racer.id) === Number(itemID)) {
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


    //If Add partner button is clicked, find the racer with the selected ID, if they have partners, add another blank partner item to the array, else create a new array with a blank item
    function addPartner(racerID) {
        setRegisteredRacerData(prev => {
            let updatedRacers = prev.map(racer => {
                if (Number(racer.id) === Number(racerID)) {
                    let updatedPartners = JSON.parse(racer.partners) ? JSON.parse(racer.partners).concat({ firstName: null, lastName: null }) : [{ firstName: null, lastName: null }]
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

    //Update the selected item in the database by way of its ID
    async function saveItem(itemID) {
        let itemDataToSave = registeredRacerData.find(item => item.id === itemID);
        delete itemDataToSave.categoryOpts;
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let updatedRacerResponse = await fetch(`http://localhost:3000/racers/${raceToFetch}/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemDataToSave)
        })
        const updatedRacerJSON = await updatedRacerResponse.json();
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    console.log(registeredRacerData)
    //Add a blank item with corresponding race name and id to the DB and repopulate the scheduleData state -- need to get race year
    async function addItem() {
            const token = localStorage.getItem('token')
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let tableInfoResponse = await fetch(`http://localhost:3000/racers/tableInfo`, {
                headers: { authorization: `Bearer ${token}` }
            })
            let tableInfo = await tableInfoResponse.json()
            const blankItem = { raceName: selectedRace, year: selectedRaceYear};
            tableInfo.forEach(column => {
                if (column.Field !== 'id' && column.Field !== 'raceName' && column.Field !== 'year') blankItem[column.Field] = null
            })
            let addedItem = await fetch(`http://localhost:3000/racers/${raceToFetch}`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blankItem)
            })
            let addedItemJSON = await addedItem.json()
            let categoryResponse = await fetch(`http://localhost:3000/races/categories/${raceToFetch}`)
            let categoryJSON = await categoryResponse.json()
            let categoryOpts = categoryJSON[0].categoryOpts;
            setRegisteredRacerData(prev => {
                let updatedRacers = prev.concat({ ...blankItem, id: addedItemJSON.insertId, categoryOpts: categoryOpts })
                return updatedRacers
            })
            setSelectedItemID(addedItemJSON.insertId)
            setSelectedAction('edit')
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

    //Display a modal to ask user to confirm deleting the item - if confirmed delete item from the database
    async function confirmDeleteItem(itemID) {
        try {
            const token = localStorage.getItem("token");
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            const deletedItem = await fetch(`http://localhost:3000/racers/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            const deletedItemInfo = await deletedItem.json();
            console.log(deletedItemInfo)
            getRacerData();
        }
        catch (err) {
            console.log(err)
        }
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    //Cycle through the racers until the matched racer is found, then delete the partner at the specified index and return the new array of partners
    function deletePartner(partnerIndex, racerId) {
        setRegisteredRacerData(prev => {
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



    if (selectedRace) {
        return (
            <>
                <div className={`${adminStyles["info__container"]}`}>
                    <div className={`${adminStyles["info-headers"]} ${styles["racer-headers"]}`}>
                        <h6></h6><h6>ID</h6><h6>First Name</h6><h6>Last Name</h6><h6>Email</h6><h6>Category</h6>
                    </div>
                    {selectedAction === 'delete' &&
                        <>
                            {registeredRacerData ? registeredRacerData.map(racer => <AthleteRow key={racer.id} itemID={racer.id} itemData={racer} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data'}
                            <DeleteConfirmation
                                itemID={selectedItemID}
                                setSelectedItemID={setSelectedItemID}
                                setSelectedAction={setSelectedAction}
                                confirmDeleteItem={confirmDeleteItem}
                                cancelAction={cancelAction}
                            />
                        </>
                    }
                    <div>
                        {!selectedAction &&
                            (registeredRacerData ? registeredRacerData.map(racer => <AthleteRow key={racer.id} itemID={racer.id} itemData={racer} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data')
                        }
                        {selectedAction === 'edit' &&
                            (registeredRacerData ? registeredRacerData.map(racer => {
                                return Number(racer.id) === Number(selectedItemID) ?
                                    <EditAthleteRow key={racer.id} itemID={racer.id} itemData={racer} saveItem={saveItem} handleChange={handleChange} deletePartner={deletePartner} addPartner={addPartner} cancelAction={cancelAction} />
                                    :
                                    <AthleteRow key={racer.id} itemID={racer.id} itemData={racer} askDeleteItem={askDeleteItem} editItem={editItem} />
                            })
                                : 'No edit')
                        }
                    </div>
                    <br />
                    {selectedAction !== 'edit' &&
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => addItem()}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Racer
                        </button>
                    }
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}