//Components
import Default from "./default";
import AdminMap from './adminMap'
//Contexts
import { SelectedRaceContext, LastSavedContext, UserInfoContext } from "../../pages/adminDashboard";
//Hooks
import { useContext, useEffect, useState } from "react";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
//Styles
import styles from "./directions.module.css"

// Component for informational row only.  Buttons to edit or delete racers.
function LocationRow({ locationId, locationInfo, askDeleteLocation, editLocation }) {
    return (
        <div className={`${styles["location-row"]}`}>
            <div className={`${styles["row-icons"]}`}>
                <FontAwesomeIcon className={`${styles["action-icon"]}`} onClick={() => editLocation(locationId)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${styles["action-icon"]}`} onClick={() => askDeleteLocation(locationId)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{locationInfo.name}</p>
            <p>{locationInfo.description}</p>
            <p className={`${styles['latlng-col']}`}>{Number(locationInfo.lat).toFixed(3)}</p>
            <p className={`${styles['latlng-col']}`}>{Number(locationInfo.lng).toFixed(3)}</p>
        </div>
    )
}


// //Component for editing individual racer information
function EditLocationRow({ locationId, locationInfo, handleChange, saveLocation }) {
    return (
        <>
            <div className={`${styles["edit-row"]}`}>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-name-${locationId}`}>Name</label>
                        <input type="text" name="name" id={`location-name-${locationId}`} onChange={(e) => handleChange(e, locationId)} value={locationInfo.name} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-lat-${locationId}`}>Latitude</label>
                        <input type="num" name="lat" id={`location-lat-${locationId}`} onChange={(e) => handleChange(e, locationId)} value={locationInfo.lat} />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor={`location-lng-${locationId}`}>Longitude</label>
                        <input type="num" name="lng" id={`location-lng-${locationId}`} onChange={(e) => handleChange(e, locationId)} value={locationInfo.lng} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`location-description-${locationId}`}>Description</label>
                        <textarea rows={8} name="description" id={`location-description-${locationId}`} onChange={(e) => handleChange(e, locationId)} value={locationInfo.desciption} />
                    </div>
                </div>
            </div>
            {/* <div className={`${styles["save-icon-row"]}`}> */}
            <button className={`${"button button--medium"} ${styles["icon__button"]}`} onClick={() => saveLocation(locationId)}>
                <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save Location
            </button>
            {/* </div> */}
        </>
    )
}

function DeleteConfirmation({ selectedLocation, setSelectedLocation, setSelectedAction, confirmDeleteLocation }) {
    return (
        <div className={`${styles["delete-confirm__container"]}`}>
            <div>
                {`Are you sure you want to delete this ${selectedLocation} location?`}<br />
                This action cannot be undone.
                <div className={`${styles["button__row"]}`}>
                    <button type="button" className="button button--medium"
                        onClick={() => {
                            confirmDeleteLocation(selectedLocation)
                        }}>Confirm</button>
                    <button type="button" className="button button--medium" onClick={() => {
                        setSelectedLocation(null);
                        setSelectedAction(null);
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default function Directions() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [locations, setLocations] = useState({});  //Object of all location information being used on the page
    const [selectedAction, setSelectedAction] = useState(null); //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not
    const [selectedLocation, setSelectedLocation] = useState(null);  //The ID of a selected location  
    const userInfo = useContext(UserInfoContext);  //Logged in user info contianed in token

    console.log(userInfo)

    useEffect(() => {
        const getMapInfo = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let locationResponse = await fetch(`http://localhost:3000/geoInfo/${raceToFetch}`)
                let locationData = await locationResponse.json();
                locationData = locationData[0]
                setLocations(locationData)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMapInfo()
    }, [selectedRace])



    //Create Functions
    async function addLocation() {
        const blankLocation = {};
        const token = localStorage.getItem('token')
        for (let propertyName in locations[0]) {
            if (propertyName === 'raceName') blankLocation[propertyName] = locations[0][propertyName]
            else blankLocation[propertyName] = null;
        }
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let addedLocation = await fetch(`http://localhost:3000/geoInfo/${raceToFetch}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blankLocation)
        })
        let addedLocationJSON = await addedLocation.json()
        setLocations(prev => {
            let updatedLocations = prev.concat({ ...blankLocation, id: addedLocationJSON[0].insertId })
            return updatedLocations
        })
        setSelectedLocation(addedLocationJSON[0].insertId)
        setSelectedAction('edit')
    }

    //Update Functions
    function editLocation() {
        console.log('editing')
    }

    async function saveLocation(locationId) {
        let locationToSave = locations.find(location => location.id === locationId);
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let updatedLocationResponse = await fetch(`http://localhost:3000/geoInfo/${raceToFetch}/${locationId}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationToSave)
        })
        const updatedLocationJSON = await updatedLocationResponse.json();
        console.log(updatedLocationJSON)
        setSelectedLocation(null)
        setSelectedAction(null)
    }


    function handleChange(e, locationId) {
        setLocations(prev => {
            let updatedLocations = prev.map(location => {
                if (location.id !== locationId) return location
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


    //Delete Functions
    function askDeleteLocation(locationId) {
        console.log(locationId)
        setSelectedLocation(locationId)
        setSelectedAction('delete')
    }

    async function confirmDeleteLocation(locationId) {
        console.log(locationId)
        try {
            const token = localStorage.getItem("token");
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            const deletedLocation = await fetch(`http://localhost:3000/geoInfo/${raceToFetch}/${locationId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const deletedLocationInfo = await deletedLocation.json();
            const getMapInfo = async () => {
                try {
                    const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                    let locationResponse = await fetch(`http://localhost:3000/geoInfo/${raceToFetch}`)
                    let locationData = await locationResponse.json();
                    locationData = locationData[0]
                    setLocations(locationData)
                }
                catch (err) {
                    console.log(err)
                }
            }
            getMapInfo()
            setSelectedLocation(null);
            setSelectedAction(null);
        } catch (error) {
            console.log(error)
        }
    }







    if (selectedRace && locations.length > 0) {
        return (
            <div className="admin-edit__container">
                <h2 className="section-heading">{selectedRace ? `${selectedRace} Directions / Map Information` : `Select a race to edit`}</h2>
                <div className={`${styles["locations__container"]}`}>
                    <div className={`${styles["locations-headers"]}`}>
                        <h6></h6><h6>Name</h6><h6>Description</h6><h6>Lat</h6><h6>Lng</h6>
                    </div>
                    {selectedAction === 'delete' &&
                        <>
                            {locations.map(location => <LocationRow locationId={location.id} locationInfo={location} editLocation={editLocation} askDeleteLocation={askDeleteLocation} />)}
                            <DeleteConfirmation
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                                setSelectedAction={setSelectedAction}
                                confirmDeleteLocation={confirmDeleteLocation}
                            />
                        </>
                    }
                    {selectedAction === 'edit' &&
                        locations.map(location =>
                            selectedLocation === location.id ?
                                <EditLocationRow locationId={location.id} locationInfo={location} handleChange={handleChange} saveLocation={saveLocation} />
                                :
                                <LocationRow locationId={location.id} locationInfo={location} editLocation={editLocation} askDeleteLocation={askDeleteLocation} />
                        )}
                    {!selectedAction &&
                        locations.map(location => <LocationRow locationId={location.id} locationInfo={location} editLocation={editLocation} askDeleteLocation={askDeleteLocation} />)
                    }
                </div>
                {selectedAction !== 'edit' &&
                    <button className={`${"button button--medium"} ${styles["icon__button"]}`} onClick={() => addLocation()}>
                        <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Location
                    </button>
                }
                <AdminMap mapMarkerData={locations} />
            </div>
        )
    }
    else return <Default userInfo={userInfo} />
}