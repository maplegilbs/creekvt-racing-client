//Components
import AdminMap from './adminMap'
import Default from "./default";
import DeleteConfirmation from './deleteConfirmation.jsx';
//Contexts
import { SelectedRaceContext} from "../../pages/adminDashboard";
import { UserInfoContext } from "../../pages/layout.jsx";

//Hooks
import { useContext, useEffect, useState, useRef } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faCircleXmark, faFloppyDisk, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./directions.module.css"
import adminStyles from "./adminGlobalStyles.module.css"
//Icon Urls
const iconUrls = [
    "https://creekvt.com/races/map_icons/01register.png",
    "https://creekvt.com/races/map_icons/02startFlag.png",
    "https://creekvt.com/races/map_icons/03finishFlag.png",
    "https://creekvt.com/races/map_icons/04parking.png",
    "https://creekvt.com/races/map_icons/05putInDown.png",
    "https://creekvt.com/races/map_icons/05putInUp.png",
    "https://creekvt.com/races/map_icons/06takeOutDown.png",
    "https://creekvt.com/races/map_icons/06takeOutUp.png",
]

// Component for informational row only.  Buttons to edit or delete racers.
function LocationRow({ itemID, itemData, askDeleteItem, editItem }) {
    return (
        <div className={`${adminStyles["info-row"]} ${styles["location-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemData.name ? itemData.name : ""}</p>
            <p>{itemData.description ? itemData.description : ""}</p>
            <p className={`${styles['latlng-col']}`}>{Number(itemData.lat).toFixed(3)}</p>
            <p className={`${styles['latlng-col']}`}>{Number(itemData.lng).toFixed(3)}</p>
        </div>
    )
}


//Component for editing individual racer information
function EditLocationRow({ editRowRef, itemID, itemData, handleChange, selectLocation, saveItem, cancelAction }) {
    return (
        <>
            <div ref={editRowRef} className={`${adminStyles["info-row"]} ${adminStyles["edit-row"]} ${styles["edit-row"]}`}>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-name-${itemID}`}>Name</label>
                        <input type="text" name="name" id={`location-name-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.name} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-lat-${itemID}`}>Latitude</label>
                        <input type="num" name="lat" id={`location-lat-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.lat} />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor={`location-lng-${itemID}`}>Longitude</label>
                        <input type="num" name="lng" id={`location-lng-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.lng} />
                    </div>
                </div>
                <div className={`input-row ${styles["second-row"]}`}>
                    <div className={`input-group`}>
                        <label htmlFor={`location-description-${itemID}`}>Description</label>
                        <textarea rows={8} name="description" id={`location-description-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.description ? itemData.description : ""} />
                    </div>
                </div>
                <div className={`input-row ${styles["second-row"]} ${styles["marker-select__container"]}`}>
                    <div className={`${adminStyles["button-row--even-space"]}`}>
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => selectLocation()}>
                            <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faLocationCrosshairs} style={{ color: "#016014", }} /> &nbsp;&nbsp;Select Location On Map
                        </button>
                    </div>
                    <div className={`${styles["marker-icons__container"]}`}>
                        <h5>Select An Icon</h5>
                        <div className={`${styles["marker-icons"]}`}>
                            {iconUrls.map(iconUrl => <input type="button" name="iconUrl" onClick={(e) => handleChange(e, itemID)} value={iconUrl} style={{ background: `no-repeat center/cover url(${iconUrl})`, opacity: `${itemData.iconUrl === iconUrl ? 1 : .25}`}} />)}
                        </div>
                    </div>
                </div>
                <div className={`${adminStyles["button-row"]} ${styles["save-icon-row"]}`}>
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

export default function Directions() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const userInfo = useContext(UserInfoContext)[0];  //Logged in user info contianed in token
    const [locations, setLocations] = useState(null);  //Object of all location information being used on the page
    const [selectedItemID, setSelectedItemID] = useState(null);  //The ID of a selected location  
    const [selectedAction, setSelectedAction] = useState(null); //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not
    const [mapClickAction, setMapClickAction] = useState(null);  //Null, or 'setPosition' - deteremines what action happens when a map click occurs
    const mapRef = useRef(null)
    const editRowRef = useRef(null)

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getLocationsData()
    }, [selectedRace])

    //Scroll the currently selected edit row into view
    useEffect(() => {
        if (editRowRef.current) editRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [selectedAction, selectedItemID])

    //Basic fetch of locations data
    async function getLocationsData() {
        try {
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let response = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/${raceToFetch}`)
            let responseJSON = await response.json();
            let cleanedResponseJSON = responseJSON.map(item => {
                for (let propertyName of Object.keys(item)) {
                    if (item[propertyName] === 'null' || item[propertyName] === "00:00:00") item[propertyName] = null
                }
                return item;
            })
            setLocations(cleanedResponseJSON)
        }
        catch (err) {
            console.log(err)
        }
    }

    //Add a blank item with corresponding race name and id to the DB and repopulate the scheduleData state
    async function addItem() {
        const token = localStorage.getItem('token')
        let tableInfoResponse = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/tableInfo`, {
            headers: { authorization: `Bearer ${token}` }
        })
        let tableInfo = await tableInfoResponse.json()
        const blankItem = { raceName: selectedRace };
        tableInfo.forEach(column => {
            if (column.Field !== 'id' && column.Field !== 'raceName') blankItem[column.Field] = null
        })
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let addedItem = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/${raceToFetch}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blankItem)
        })
        let addedItemJSON = await addedItem.json()
        console.log(addedItemJSON)
        setLocations(prev => {
            let updatedLocations = prev.concat({ ...blankItem, id: addedItemJSON.insertId })
            return updatedLocations
        })
        setSelectedItemID(addedItemJSON.insertId)
        setSelectedAction('edit')
    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }


    function selectLocation() {
        mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setMapClickAction('setPostion')
    }

    //Update the current item's lat/lng based on a map click
    function updateLocationFromMapClick(e, itemID) {
        console.log(itemID, mapClickAction)
        setLocations(prev => {
            let updatedLocations = prev.map(location => {
                if (location.id !== itemID) return location
                else {
                    let updatedLocation = {
                        ...location,
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                    }
                    return updatedLocation
                }
            })
            return updatedLocations
        })
        // setMapClickAction(null)
    }

    //Action for when cancel button is selected
    function cancelAction() {
        setMapClickAction(null)
        setSelectedItemID(null);
        setSelectedAction(null);
    }

    //Update the selected item in the database by way of its ID
    async function saveItem(itemID) {
        let itemDataToSave = locations.find(item => item.id === itemID);
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let updatedLocationResponse = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/${raceToFetch}/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemDataToSave)
        })
        const updatedLocationJSON = await updatedLocationResponse.json();
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
            const deletedItem = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            const deletedItemInfo = await deletedItem.json();
            console.log(deletedItemInfo)
            getLocationsData();
        }
        catch (err) {
            console.log(err)
        }
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    console.log(locations)
    //Update the location data when an input value field is being changed
    function handleChange(e, itemID) {
        setLocations(prev => {
            let updatedLocations = prev.map(location => {
                if (location.id !== itemID) return location
                else {
                    let updatedLocation = {
                        ...location,
                        [e.target.name]: e.target.value
                    }
                    return updatedLocation
                }
            })
            return updatedLocations
        })
    }


    if (selectedRace && locations) {
        return (
            <>
                <div className={`${adminStyles["info__container"]}`}>
                    <h2 className="section-heading">{selectedRace ? `${selectedRace} Event Locations` : `Select a race to edit`}</h2>
                    <div className={`${adminStyles["info-headers"]} ${styles["location-headers"]}`}>
                        <h6></h6><h6>Name</h6><h6>Description</h6><h6>Lat</h6><h6>Lng</h6>
                    </div>
                    {selectedAction === 'delete' &&
                        <>
                            {locations.map(location => <LocationRow key={location.id} itemID={location.id} itemData={location} editItem={editItem} askDeleteItem={askDeleteItem} />)}
                            <DeleteConfirmation
                                itemID={selectedItemID}
                                confirmDeleteItem={confirmDeleteItem}
                                cancelAction={cancelAction}
                            />
                        </>
                    }
                    {selectedAction === 'edit' &&
                        locations.map(location =>
                            selectedItemID === location.id ?
                                <EditLocationRow editRowRef={editRowRef} key={location.id} itemID={location.id} itemData={location} handleChange={handleChange} selectLocation={selectLocation} saveItem={saveItem} cancelAction={cancelAction} />
                                :
                                <LocationRow key={location.id} itemID={location.id} itemData={location} editItem={editItem} askDeleteItem={askDeleteItem} />
                        )}
                    {!selectedAction &&
                        locations.map(location => <LocationRow key={location.id} itemID={location.id} itemData={location} editItem={editItem} askDeleteItem={askDeleteItem} />)
                    }
                    {selectedAction !== 'edit' &&
                        <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => addItem()}>
                            <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Location
                        </button>
                    }
                </div>
                <div ref={mapRef} className={`${styles["map-container"]}`}>
                    <AdminMap mapMarkerData={locations} selectedItemID={selectedItemID} updateLocationFromMapClick={updateLocationFromMapClick} editRowRef={editRowRef} />
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}