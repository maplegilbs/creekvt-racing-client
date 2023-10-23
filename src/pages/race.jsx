//Components
import Map from "../components/map";
import RegisteredRacers from "../components/registeredRacers";
//Hooks
import { useLoaderData, useParams } from "react-router-dom";
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

function ScheduleItem({ eventDetails }) {
    return (
        <li>
            <strong>{eventDetails.startTime} {eventDetails.endTime ? `- ${eventDetails.endTime}` : ""}</strong> {eventDetails.name}
            <br />
            Location: <a href="#directions-section" className={`link-std`}>{eventDetails.location}</a>
        </li>
    )
}

export default function Race() {
    const raceData = useLoaderData()[0];
    const [mapMarkerData, setMapMarkerData] = useState([]);
    const { raceName } = useParams()
    const formattedTime = raceData.date ? formatDateTime(raceData.date) : null;
    const locations = JSON.parse(raceData.locations);
    const locationContainers = locations.map(location => <LocationContainer location={location} handleShowHideToggle={handleShowHideToggle} />)
    const schedule = JSON.parse(raceData.schedule)
    const scheduleItems = schedule ? schedule.map(eventDetails => <ScheduleItem eventDetails={eventDetails} />) : null;

    console.log(raceData)
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

    console.log(new Date(raceData.date) > new Date())

    return (
        <>
            {
                raceData.notification &&
                <div className={`${styles["notification-banner"]}`}>{raceData.notification}</div>
            }
            <main className={`${styles["racepage-container"]}`}>
                <section className={`section-container`}>
                    <div className={`${styles["heading-container"]}`}>
                        <h2 className={`primary-heading`}>{raceData.name}</h2>
                        {formattedTime ?
                            <>
                                <h4>{`${formattedTime.dow} ${formattedTime.monthString} ${formattedTime.day}, ${formattedTime.year}`}</h4>
                                <h4>{`${formattedTime.time} ${formattedTime.amPm}`}</h4>
                            </> : <h4>CHECK BACK SOON FOR 2024 SCHEDULED RACE DATE</h4>
                        }
                        <div className={`${styles["registration-button__container"]}`}>
                            {new Date(raceData.date) < new Date() ?
                                <h5 className={`${styles["registration-notice__heading"]}`}>
                                    Registration For This Event Is Closed
                                </h5>
                                :
                                !raceData.isRegOpen &&
                                <h5 className={`${styles["registration-notice__heading"]}`}>
                                    Registration Currently Closed - Check Back Soon To Register
                                </h5>
                            }
                            <a href={`./${raceName}/register`} className={`button button--large ${raceData.isRegOpen === 0? "disabled": ""} ${styles['registration-button']}`}>
                                Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                            </a>
                        </div>
                        <nav className={`${styles['race-nav']}`}>
                            <a href="#schedule-section" className={`link-std link-bold`}>Schedule</a>
                            <a href="#athletes-section" className={`link-std link-bold`}>Registered Athletes</a>
                            <a href="#directions-section" className={`link-std link-bold`}>Directions</a>
                            <a href="#course-section" className={`link-std link-bold`}>Course Description</a>
                            <a href="#results-section" className={`link-std link-bold`}>Results</a>
                            <a href="#faqcontact-section" className={`link-std link-bold`}>FAQ / Contact</a>
                        </nav>
                        {/* {
                            new Date(raceData.date).valueOf() + (1000 * 60 * 60 * 24) < new Date().valueOf() ?
                                <div className={`${styles["disclaimer-container"]}`}>
                                    <h6>{`**The details on this page are for a race that has already occurred.  Be sure to check back for details on the ${formattedTime.year + 1} race as the date approaches.**`}</h6>
                                </div> :
                                <></>
                        } */}
                    </div>
                </section>
                <section className={`section-container`} id={`schedule-section`}>
                    <h2 className={`section-heading`}>Schedule</h2>
                    <hr />
                    {
                        scheduleItems ?
                            <ul>
                                {scheduleItems}
                            </ul>
                            :
                            <h4>Check back for race schedule</h4>
                    }
                </section>
                <section className={`section-container`} id={`athletes-section`}>
                    <h2 className={`section-heading`}>Registered Athletes</h2>
                    <hr />
                    <RegisteredRacers raceData={raceData}/>

                </section>
                <section className={`section-container`} id={`directions-section`}>
                    <h2 className={`section-heading`}>Directions</h2>
                    <hr />
                    <div className={`${styles["directions-section"]}`}>
                        <div className={`${styles["location-section"]}`}>
                            {locationContainers}
                        </div>
                        < Map mapMarkerData={mapMarkerData} />
                    </div>
                </section >
                <section className={`section-container`} id={`course-section`}>
                    <h2 className={`section-heading`}>Course Details</h2>
                    <hr />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate aliquid tenetur minus iusto facilis quidem rem officia cumque? Eligendi sint, reprehenderit asperiores eius harum excepturi laboriosam labore ipsum in quod fuga. Quos sit maiores atque soluta ut quae delectus commodi, quasi deserunt id repellendus labore ratione, dolore voluptatem recusandae impedit saepe vero hic harum perferendis, iusto excepturi inventore? Eveniet mollitia aut enim animi dignissimos inventore consequatur possimus ducimus provident excepturi illum nam quasi eligendi quaerat ullam fuga perspiciatis commodi sequi neque autem voluptatem, voluptatum maxime impedit. Recusandae dolore quis reprehenderit a aliquam magni, perferendis aspernatur odit! Enim, mollitia dicta.
                </section>
                <section className={`section-container`} id={`results-section`}>
                    <h2 className={`section-heading`}>Results</h2>
                    <hr />
                    <form>

                    </form>

                </section>
                <section className={`section-container`} id={`faqcontact-section`}>
                    <h2 className={`section-heading`}>FAQ / Contact</h2>
                    <hr />

                </section>
            </main>
        </>
    )
}