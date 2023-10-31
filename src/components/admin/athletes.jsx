//Components
import Default from "./default.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { formatDateTime } from "../../utils/formatDateTime.js";
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
                {itemData[1].map(item => <AthleteRow key={item.id} itemData={item} />)}
            </div>
            <p>{itemData[1][0].category ? itemData[1][0].category : ""}</p>
        </div>
    )
}

function AthleteRow({ itemData }) {
    return (
        <div className={`${styles["racer-row"]}`}>
            <p>{itemData.firstName ? itemData.firstName : ""}</p>
            <p>{itemData.lastName ? itemData.lastName : ""}</p>
            <p>{itemData.email ? itemData.email : ""}</p>
        </div>
    )
}


//Component for editing individual racer entity information
function EditGroupRow({ itemID, itemData, handleRacerChange, handleCategoryChange, saveItem, cancelAction }) {
    const [selectedRacer, setSelectedRacer] = useState(null)

    useEffect(() => {
        if (itemData[1].length === 1) {
            setSelectedRacer(itemData[1][0])
        }

    }, [])


    return (
        <div className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["racers-row"]}`}>
            <div className={`${styles["racer-rows"]} ${styles["expanded-racer-rows"]}`}>
                {itemData[1].map(item => {
                    return <>
                        {(selectedRacer && item.id === selectedRacer.id) ?
                            <EditAthleteRow key={selectedRacer.id} itemData={item} handleRacerChange={handleRacerChange} />
                            :
                            <>
                                <div className={`${adminStyles["row-icons"]} ${styles["id-column"]}`}>
                                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faPenToSquare} style={{ color: "#000000", }} onClick={() => setSelectedRacer(item)} />
                                    <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleMinus} style={{ color: "#af2323", }} />
                                </div>
                                <AthleteRow key={item.id} itemData={item} />
                            </>
                        }
                    </>
                })
                }
            </div>
            <div className={`input-group ${styles["select-group"]}`}>
                <label htmlFor={`category-${itemID}`}>Category</label>
                <select name="category" id={`category-${itemID}`} onChange={(e) => handleCategoryChange(e, itemID)} value={itemData[1][0].category} >
                    <option> -- </option>
                    {itemData[1][0].categoryOpts &&
                        itemData[1][0].categoryOpts.split(", ").map(category => <option value={category}>{category}</option>)
                    }
                </select>
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

function EditAthleteRow({ itemData, handleRacerChange }) {
    console.log(formatDateTime(new Date(itemData.birthdate)).htmlDate)
    return (
        <div className={`${styles["edit-racer-inputs__container"]}`}>
            <div className={`input-group`}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={(e) => handleRacerChange(e, itemData.id)} value={itemData.firstName}/>
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
                <input type="date" name="birthdate" id="birthdate"  onChange={(e) => handleRacerChange(e, itemData.id)} value={formatDateTime(new Date(itemData.birthdate)).htmlDate}/>
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
                groupedRacersArray.push([racerEntityID, groupedRacers[racerEntityID]])
            })
            setRegisteredRacerData(groupedRacersArray)
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
                return[racerEntity[0], updatedRacerEntity]
            })
            return updatedRacerEntities
        })
    }

    function handleCategoryChange(e, itemID) {
        console.log('category change')
    }



    //If Add partner button is clicked, find the racer with the selected ID, if they have partners, add another blank partner item to the array, else create a new array with a blank item
    function addPartner(racerID) {
        console.log('addPartner')
        // setRegisteredRacerData(prev => {
        //     let updatedRacers = prev.map(racer => {
        //         if (Number(racer.id) === Number(racerID)) {
        //             let updatedPartners = JSON.parse(racer.partners) ? JSON.parse(racer.partners).concat({ firstName: null, lastName: null }) : [{ firstName: null, lastName: null }]
        //             return {
        //                 ...racer,
        //                 partners: JSON.stringify(updatedPartners)
        //             }
        //         }
        //         else {
        //             return racer
        //         }
        //     })
        //     return updatedRacers
        // })
    }

    //Update the selected item in the database by way of its ID
    async function saveItem(itemID) {
        console.log('saving')
        // let itemDataToSave = registeredRacerData.find(item => item.id === itemID);
        // delete itemDataToSave.categoryOpts;
        // const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        // const token = localStorage.getItem("token")
        // let updatedRacerResponse = await fetch(`http://localhost:3000/racers/${raceToFetch}/${itemID}`, {
        //     method: 'PATCH',
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(itemDataToSave)
        // })
        // const updatedRacerJSON = await updatedRacerResponse.json();
        // setSelectedItemID(null)
        // setSelectedAction(null)
    }


    //Add a blank item with corresponding race name and id to the DB and repopulate the scheduleData state -- need to get race year
    async function addItem() {
        console.log('adding')
        // const token = localStorage.getItem('token')
        // const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        // let tableInfoResponse = await fetch(`http://localhost:3000/racers/tableInfo`, {
        //     headers: { authorization: `Bearer ${token}` }
        // })
        // let tableInfo = await tableInfoResponse.json()
        // const blankItem = { raceName: selectedRace, year: selectedRaceYear };
        // tableInfo.forEach(column => {
        //     if (column.Field !== 'id' && column.Field !== 'raceName' && column.Field !== 'year') blankItem[column.Field] = null
        // })
        // let addedItem = await fetch(`http://localhost:3000/racers/${raceToFetch}`, {
        //     method: "POST",
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(blankItem)
        // })
        // let addedItemJSON = await addedItem.json()
        // let categoryResponse = await fetch(`http://localhost:3000/races/categories/${raceToFetch}`)
        // let categoryJSON = await categoryResponse.json()
        // let categoryOpts = categoryJSON[0].categoryOpts;
        // setRegisteredRacerData(prev => {
        //     let updatedRacers = prev.concat({ ...blankItem, id: addedItemJSON.insertId, categoryOpts: categoryOpts })
        //     return updatedRacers
        // })
        // setSelectedItemID(addedItemJSON.insertId)
        // setSelectedAction('edit')
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
        console.log('confirm delete')
        // try {
        //     const token = localStorage.getItem("token");
        //     const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        //     const deletedItem = await fetch(`http://localhost:3000/racers/${raceToFetch}/${itemID}`, {
        //         method: 'DELETE',
        //         headers: { authorization: `Bearer ${token}` }
        //     })
        //     const deletedItemInfo = await deletedItem.json();
        //     console.log(deletedItemInfo)
        //     getRacerData();
        // }
        // catch (err) {
        //     console.log(err)
        // }
        // setSelectedItemID(null)
        // setSelectedAction(null)
    }

    //Cycle through the racers until the matched racer is found, then delete the partner at the specified index and return the new array of partners
    function deletePartner(partnerIndex, racerId) {
        console.log('delete partner')
        // setRegisteredRacerData(prev => {
        //     let updatedRacers = prev.map(racer => {
        //         if (Number(racer.id) === Number(racerId)) {
        //             let updatedPartners = JSON.parse(racer.partners).toSpliced(partnerIndex, 1)
        //             return {
        //                 ...racer,
        //                 partners: JSON.stringify(updatedPartners)
        //             }
        //         }
        //         else return racer
        //     })
        //     return updatedRacers
        // })
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
                            {registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity[0]} itemID={racerEntity[0]} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data'}
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
                            (registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity[0]} itemID={racerEntity[0]} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data')
                        }
                        {selectedAction === 'edit' &&
                            (registeredRacerData ? registeredRacerData.map(racerEntity => {
                                return Number(racerEntity[0]) === Number(selectedItemID) ?
                                    <EditGroupRow key={racerEntity[0]} itemID={racerEntity[0]} itemData={racerEntity} saveItem={saveItem} handleRacerChange={handleRacerChange} handleCategoryChange={handleCategoryChange} cancelAction={cancelAction} />
                                    :
                                    <GroupRow key={racerEntity[0]} itemID={racerEntity[0]} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />
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