//Components
import Default from "./default.jsx";
import GroupRow from "./groupRow.jsx";
import DeleteConfirmation from "./deleteConfirmation.jsx";
import EditGroupRow from "./groupEditRow.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"


export default function Athletes() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const selectedRaceYear = useContext(SelectedRaceContext)[2] //Year of race as a string
    const userInfo = useContext(UserInfoContext) //Logged in user info contianed in token
    const [registeredRacerData, setRegisteredRacerData] = useState(null) //Array of objectes each containing data about specific racer
    const [selectedAction, setSelectedAction] = useState("");  //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not
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
                for (let propertyName of Object.keys(item)) { if (item[propertyName] === 'null') item[propertyName] = null }
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

    //Action for when add racer (racer entity) button is selected
    async function addBoat() {
        const token = localStorage.getItem("token")
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let wasAddSuccess = false;
        //Add a boat with the current year and racename fields to the DB
        let addedBoatResponse = await fetch(`http://localhost:3000/racers/addRaceEntity/${raceToFetch}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raceName: selectedRace,
                year: selectedRaceYear,
            })
        })
        let addedBoatInfo = await addedBoatResponse.json()
        //Format a blank racer object and push it into the registered racer data state
        let newRacer = {
            racerEntityID: addedBoatInfo.insertId,
            category: null,
            racers: []
        }
        setRegisteredRacerData(prev => {
            let updatedRacerData = prev.concat(newRacer)
            return updatedRacerData
        })
        //Put the component into the edit state with the new racer's ID as the selected Item ID
        editItem(newRacer.racerEntityID)
    }

    //Action for when cancel button is selected
    function cancelAction() {
        setSelectedItemID(null);
        setSelectedAction("");
    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }

    //Set the selected action state to delete and the selected item id to the id of the item selected -- this will render the delete confirmation component with the ability to confirm or cancel deletion
    function askDeleteItem(itemID, itemType) {
        setSelectedItemID(itemID)
        setSelectedAction(`delete-${itemType}`)
    }

    //Action to take if user clicks confirm delete on the modal
    async function confirmDeleteItem(itemID) {
        let token = localStorage.getItem('token')
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let wasDeleteSuccess = false;
        //If we are deleting an entity, remove the entity and all associated racers and updated the registered racers state
        if (selectedAction.split("-")[1] === 'racerEntity') {
            let deleteResponse = await fetch(`http://localhost:3000/racers/deleteRacerEntity/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            wasDeleteSuccess = deleteResponse.status === 200;
            if (wasDeleteSuccess) {
                setRegisteredRacerData(prev => {
                    let updatedRegisteredRacerData = prev.filter(racerEntity => Number(racerEntity.racerEntityID) !== Number(itemID))
                    return updatedRegisteredRacerData;
                })
            }
            setSelectedAction("")
        }
        //If we are deleting just a racer delete the racer based on ID and update the registered racers state
        else if (selectedAction.split("-")[1] === 'racer') {
            let deleteResponse = await fetch(`http://localhost:3000/racers/deleteRacer/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            wasDeleteSuccess = deleteResponse.status === 200;
            if (wasDeleteSuccess) {
                setRegisteredRacerData(prev => {
                    //cycle through the registered racer entities.  find the racer that was just deleted within one of those entities
                    let updatedRegisteredRacerData = prev.map(racerEntity => {
                        let foundIndex = racerEntity.racers.findIndex(racer => Number(racer.id) === Number(itemID))
                        //if that racer is found update the racers array for the corresponding entity with the deleted racer removed, then return the updated racerEntity to the registeredRacerData state
                        if (foundIndex >= 0) {
                            //also set the selectedItemID to now be that of our entity rather than the individual racer
                            setSelectedItemID(racerEntity.racerEntityID)
                            let updatedRacers = racerEntity.racers.toSpliced(foundIndex, 1)
                            return {
                                ...racerEntity,
                                racers: updatedRacers
                            }
                        }
                        //if the racer is not found in the racer entity, simply return the unchanged racer entity to the registered racer data state
                        else return racerEntity
                    })
                    return updatedRegisteredRacerData;
                })
            }
            setSelectedAction("edit")
        }
    }


    if (selectedRace) {
        return (
            <>
                <div className={`${adminStyles["info__container"]}`}>
                    <div className={`${adminStyles["info-headers"]} ${styles["racer-headers"]}`}>
                        <h6></h6><h6>ID</h6><h6>First Name</h6><h6>Last Name</h6><h6>Email</h6><h6>Category</h6>
                    </div>
                    {selectedAction.includes('delete') &&
                        <>
                            {registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data'}
                            <DeleteConfirmation
                                itemID={selectedItemID}
                                confirmDeleteItem={confirmDeleteItem}
                                cancelAction={cancelAction}
                            />
                        </>
                    }
                    <div>
                        {selectedAction === "" &&
                            (registeredRacerData ? registeredRacerData.map(racerEntity => <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />) : 'No data')
                        }
                        {(selectedAction === 'edit' && registeredRacerData) &&
                            registeredRacerData.map(racerEntity => {
                                return Number(racerEntity.racerEntityID) === Number(selectedItemID) ?
                                    <EditGroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} categoryOpts={categoryOpts} setRegisteredRacerData={setRegisteredRacerData} cancelAction={cancelAction} askDeleteItem={askDeleteItem} />
                                    :
                                    <GroupRow key={racerEntity.racerEntityID} itemID={racerEntity.racerEntityID} itemData={racerEntity} askDeleteItem={askDeleteItem} editItem={editItem} />
                            })
                        }
                    </div>
                    <br />
                    {selectedAction !== 'edit' &&
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={addBoat}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Boat
                        </button>
                    }
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}