//Components
import Map from "../components/map";
import RegisteredRacers from "../components/registeredRacers";
//Hooks
import { useLoaderData, useParams } from "react-router-dom";
//Libs
import { formatDateTime, convertTime } from "../utils/formatDateTime";
//Styles
import styles from "./race.module.css"
import { useEffect, useState } from "react";

export async function loader({ params }) {
    // Get data via api call to populate page here
    const scheduleData = await fetch(`http://localhost:3000/schedule/${params.raceName}`);
    const scheduleJSON = await scheduleData.json()
    const raceData = await fetch(`http://localhost:3000/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    const locationsData = await fetch(`http://localhost:3000/geoInfo/${params.raceName}`);
    const locationsJSON = await locationsData.json();
    //! need to dynamically populate the year
    const racersData = await fetch(`http://localhost:3000/racers/${params.raceName}/2024`);
    const racersJSON = await racersData.json();
    let groupedRacers = racersJSON.reduce((accum, curRacer) => {
        //if the accumulator has a racer in an array that shares the id of the current racer, add it to that array, otherwise make a new array
        // [{id: category: racers: []}]
        console.log(accum)
        let foundGroup = accum.find(group => Number(group.id) === Number(curRacer.entityID));
        if (!foundGroup) {
            accum.push({ id: curRacer.entityID, category: curRacer.category, racers: [`${curRacer.firstName} ${curRacer.lastName}`] })
        }
        else {
            foundGroup.racers.push(`${curRacer.firstName} ${curRacer.lastName}`)
        }
        return accum
    }, [])
    console.log(groupedRacers)
    return { raceJSON, scheduleJSON, locationsJSON, groupedRacers }
}

function LocationContainer({ location, setSelectedMapLocation }) {

    return (
        <div className={`${styles["location-container"]}`}>
            <div className={`${styles["location-header"]}`}>
                <div className={`${styles["location-name"]}`}
                    onClick={() => {
                        setSelectedMapLocation([Number(location.lat), Number(location.lng)])
                    }}>
                    <h6>{location.name}</h6>
                    <img src={location.iconUrl} />
                </div>
                <div className={`${styles["location-buttons"]}`}>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`} className={`${styles["location-link"]}`}>Directions</a>
                </div>
            </div>
            {(location.description && location.description !== 'null') &&
                <div className={`${styles["location-details"]}`}>
                    {location.description}
                </div>
            }
        </div >
    )
}

function ScheduleItem({ eventDetails }) {
    return (
        <>
            {
                eventDetails.startTime &&
                <li className={`${styles["events-listItem"]}`}>
                    <strong>{convertTime(eventDetails.startTime)} {eventDetails.endTime && eventDetails.endTime !== '00:00:00' ? `- ${convertTime(eventDetails.endTime)}` : ""}</strong> {eventDetails.name}
                    <br />
                    Location: <a href="#directions-section" className={`link-std`}>{eventDetails.location}</a>
                </li>

            }
        </>
    )
}

export default function Race() {
    const raceData = useLoaderData().raceJSON[0];
    const scheduleData = useLoaderData().scheduleJSON;
    const locations = useLoaderData().locationsJSON;
    const racers = useLoaderData().groupedRacers;
    const [selectedMapLocation, setSelectedMapLocation] = useState(null);
    const [mapMarkerData, setMapMarkerData] = useState(locations.map(location => [Number(location.lat), Number(location.lng), location.iconUrl]));
    const { raceName } = useParams()

    const formattedTime = raceData.date ? formatDateTime(raceData.date) : null;
    const locationContainers = locations.map(location => <LocationContainer location={location} setSelectedMapLocation={setSelectedMapLocation} />)
    const scheduleItems = scheduleData ? scheduleData.map(eventDetails => <ScheduleItem eventDetails={eventDetails} />) : null;


    console.log(raceData)
    return (
        <>
            {
                (raceData.notification && raceData.notification !== 'null') &&
                <div className={`${styles["notification-banner"]}`}>{
                    raceData.notification
                }</div>
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
                            <a href={`./${raceName}/register`} className={`button button--large ${raceData.isRegOpen === 0 ? "disabled" : ""} ${styles['registration-button']}`}>
                                Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                            </a>
                        </div>
                        <nav className={`${styles['race-nav']}`}>
                            <a href="#schedule-section" className={`link-std link-bold`}>Schedule</a>
                            <a href="#athletes-section" className={`link-std link-bold`}>Athletes</a>
                            <a href="#directions-section" className={`link-std link-bold`}>Directions</a>
                            <a href="#course-section" className={`link-std link-bold`}>Course</a>
                            <a href="#results-section" className={`link-std link-bold`}>Results</a>
                            <a href="#faqcontact-section" className={`link-std link-bold`}>FAQ</a>
                        </nav>
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
                    <RegisteredRacers raceData={raceData} racers={racers} />
                </section>
                <section className={`section-container`} id={`directions-section`}>
                    <h2 className={`section-heading`}>Directions</h2>
                    <hr />
                    <div className={`${styles["directions-section"]}`}>
                        <div className={`${styles["location-section"]}`}>
                            {locationContainers}
                        </div>
                        < Map mapMarkerData={mapMarkerData} selectedMapLocation={selectedMapLocation} />
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