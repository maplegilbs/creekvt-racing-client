//Components
import Map from "../components/map";
//Hooks
import { useLoaderData } from "react-router-dom";
//Libs
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./race.module.css"
import { useEffect, useState } from "react";

export async function loader({ params }) {
    // Get data via api call to populate page here
    const raceData = await fetch(`http://localhost:3000/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    return raceJSON
}

function LocationContainer({ location, handleShowHideToggle }) {
    const [areDetailsVisible, setAreDetailsVisible] = useState(false)

    return (
        <div className={`${styles["location-container"]}`}>
            <div className={`${styles["location-header"]}`}>
                <h6>{location.name}</h6>
                <div className={`${styles["location-buttons"]}`}>
                    <a onClick={e => {
                        setAreDetailsVisible(prev => !prev);
                        handleShowHideToggle(e, Number(location.lat), Number(location.lng));
                    }} className={`${styles["location-link"]}`}>SHOW</a>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`} className={`${styles["location-link"]}`}>Directions</a>
                </div>
            </div>
            {areDetailsVisible &&
                <div className={`${styles["location-details"]}`}>
                    {location.description}
                </div>
            }
        </div >
    )
}

export default function Race() {
    const raceData = useLoaderData()[0];
    const [mapMarkerData, setMapMarkerData] = useState([]);
    const formattedTime = formatDateTime(raceData.date);
    const locations = JSON.parse(raceData.locations);
    const mapOptions = JSON.parse(raceData.mapOptions)[0];
    let locationContainers = locations.map(location => <LocationContainer location={location} handleShowHideToggle={handleShowHideToggle}/>)

    function updateMarkers(lat, lng) {
        let tempArray = [];
        //go through mapMarkerData.  If passed lat/lng match one already in the array, set our flag isMarkerInArray to note it already exists in the array
        //for any lat/lng in mapMarkerData that do not match the passed in lat/lng push them into our temp array
        //once loop is finsihed, if our flag isMarkerInArray is still false also push the passed in lat/lng into the array
        let isMarkerInArray = false;
        for (let i in mapMarkerData) {
            if (mapMarkerData[i][0] === lat || mapMarkerData[i][1] === lng) {
                isMarkerInArray = true;
            }
            else {
                tempArray.push([mapMarkerData[i][0], mapMarkerData[i][1]])
            }
        }
        if (!isMarkerInArray) tempArray.push([lat, lng])
        setMapMarkerData(tempArray)
    }

    function handleShowHideToggle(e, lat, lng) {
        e.target.innerText = e.target.innerText === "SHOW" ? "HIDE" : "SHOW";
        updateMarkers(lat, lng)
    }



    return (
        <>
            <div className={`${styles["section-container"]}`}>
                <div className={`${styles["heading-container"]}`}>
                    <h2>
                        {raceData.name}
                    </h2>
                    <h4>
                        {`${formattedTime.dow} ${formattedTime.monthString} ${formattedTime.day}, ${formattedTime.year}`}
                    </h4>
                    <h4>
                        {`${formattedTime.time} ${formattedTime.amPm}`}
                    </h4>
                    <a href="#" className={`button button--large disabled`}>
                        Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                    </a>
                    <a href="#" className={`link-std link-bold`}>View Registered Athletes</a>
                </div>
                <p>
                    {raceData.shortDescription}
                </p>
            </div>
            <div className={`${styles["section-container"]}`} id={`${styles["map-section"]}`}>
                <div className={`${styles["location-section"]}`}>
                    {locationContainers}
                </div>
                < Map 
                mapMarkerData={mapMarkerData} 
                mapOptions = {mapOptions}/>
            </div >
            <div className={`${styles["section-container"]}`}>
                {/* Full Description */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate aliquid tenetur minus iusto facilis quidem rem officia cumque? Eligendi sint, reprehenderit asperiores eius harum excepturi laboriosam labore ipsum in quod fuga. Quos sit maiores atque soluta ut quae delectus commodi, quasi deserunt id repellendus labore ratione, dolore voluptatem recusandae impedit saepe vero hic harum perferendis, iusto excepturi inventore? Eveniet mollitia aut enim animi dignissimos inventore consequatur possimus ducimus provident excepturi illum nam quasi eligendi quaerat ullam fuga perspiciatis commodi sequi neque autem voluptatem, voluptatum maxime impedit. Recusandae dolore quis reprehenderit a aliquam magni, perferendis aspernatur odit! Enim, mollitia dicta.
            </div>
            <div className={`${styles["section-container"]}`}>
                {/* Contact */}

            </div>
            <div className={`${styles["section-container"]}`}>
                {/* FAQ */}

            </div>
        </>
    )
}