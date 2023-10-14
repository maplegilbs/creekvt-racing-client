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

export default function Race() {
    const raceData = useLoaderData()[0];
    const formattedTime = formatDateTime(raceData.date)
    const [mapMarkerData, setMapMarkerData] = useState([]);

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
        console.log(e.target.innerText)
        e.target.innerText = e.target.innerText === "SHOW ON MAP" ? "REMOVE FROM MAP" : "SHOW ON MAP";
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
                    {/* Registration Button */}
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
                    <div className={`${styles["location-container"]}`}>
                        <div className={`${styles["location-header"]}`}>
                            <h6>Parking</h6>
                            <div className={`${styles["location-buttons"]}`}>
                                <a onClick={e => handleShowHideToggle(e, 44.12329812997867, -73.03425648442942)} className={`${styles["location-link"]}`} >Show On Map</a>
                                <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=44.12336589880534,-73.03465347551882&waypoints=44.12938735908366,-73.05119217901516" className={`${styles["location-link"]}`}>Directions</a>
                            </div>
                        </div>
                        <div className={`${styles["location-details"]}`}>
                            Eagle Park is the normal Put-In for a full run of this stretch of river and has room for numerous cars.
                        </div>
                    </div >
                    <div className={`${styles["location-container"]}`}>
                        <div className={`${styles["location-header"]}`}>
                            <h6>Registration / Start / Put-In</h6>
                            <div className={`${styles["location-buttons"]}`}>
                                <a onClick={e => handleShowHideToggle(e, 44.12539878205473, -73.03968185766988)} className={`${styles["location-link"]}`} >Show On Map</a>
                                <a target="_blank" href="#" className={`${styles["location-link"]}`}>Directions</a>
                            </div>
                        </div>
                        <div className={`${styles["location-details"]}`}>
                            Just above the "Ledges" rapids there is a pull-off where you will find racer registration and the start line.  There will be minimal parking here, you may drop your boat here but then be sure to use Eagle Park or the pull off at the bottom of the hill to park.
                        </div>
                    </div >
                    <div className={`${styles["location-container"]}`}>
                        <div className={`${styles["location-header"]}`}>
                            <h6>Finish / Take-Out</h6>
                            <div className={`${styles["location-buttons"]}`}>
                                <a onClick={e => handleShowHideToggle(e, 44.127394808598325, -73.04712846168192)} className={`${styles["location-link"]}`} >Show On Map</a>
                                <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=44.12336589880534,-73.03465347551882&waypoints=44.12938735908366,-73.05119217901516" className={`${styles["location-link"]}`}>Directions</a>
                            </div>
                        </div>
                        <div className={`${styles["location-details"]}`}>
                            Use the pull off by the side to park for the finish.  Be sure to have your vehicle completely off the side of the road.  Finish line is in the pool below "Toaster".  Shuttle vehicle will be picking up racer's boats from here, so take out by walking your boat up the path just before entering the next rapid.
                        </div>
                    </div >
                </div>

                {/* Map */}
                < Map mapMarkerData={mapMarkerData} />
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