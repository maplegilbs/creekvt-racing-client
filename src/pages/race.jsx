//Components
import CourseDetails from "../components/courseDetails";
import FAQ from "../components/faq";
import Map from "../components/map";
import RegisteredRacers from "../components/registeredRacers";
import Results from "../components/results";
//Hooks
import { useLoaderData, useParams } from "react-router-dom";
//Libs
import { formatDateTime, convertTime, convertTimeToCompare } from "../utils/formatDateTime";
import { adjEDTtoUTC } from "../utils/adjForUTCDate";
//Styles
import styles from "./race.module.css"
import { useState } from "react";
import ContactForm from "../components/contactForm";

export async function loader({ params }) {
    // Get data via api call to populate page here
    const scheduleData = await fetch(`${process.env.REACT_APP_SERVER}/schedule/${params.raceName}`);
    const scheduleJSON = await scheduleData.json()
    const raceData = await fetch(`${process.env.REACT_APP_SERVER}/races/${params.raceName}`);
    const raceJSON = await raceData.json();
    let currentRaceYear = new Date(raceJSON[0].date).getFullYear()
    const locationsData = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/${params.raceName}`);
    const locationsJSON = await locationsData.json();
    const racersData = await fetch(`${process.env.REACT_APP_SERVER}/racers/${params.raceName}/${currentRaceYear}`);
    const racersJSON = await racersData.json();
    let groupedRacers = racersJSON.reduce((accum, curRacer) => {
        //if the accumulator has a racer in an array that shares the id of the current racer, add it to that array, otherwise make a new array
        // [{id: category: racers: []}]
        let foundGroup = accum.find(group => Number(group.id) === Number(curRacer.entityID));
        if (!foundGroup) {
            accum.push({ id: curRacer.entityID, category: curRacer.category, racers: [`${curRacer.firstName} ${curRacer.lastName}`] })
        }
        else {
            foundGroup.racers.push(`${curRacer.firstName} ${curRacer.lastName}`)
        }
        return accum
    }, [])
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
                    <img src={location.iconUrl} />
                    <h6>{location.name}</h6>
                </div>
                <div className={`${styles["location-buttons"]}`}>
                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`} className={`${styles["location-link"]}`}>
                        Directions
                    </a>
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
                <tr className={`${styles["events-listItem"]}`}>
                    <td>
                        <strong>{convertTime(eventDetails.startTime)} {eventDetails.endTime && eventDetails.endTime !== '00:00:00' ? `- ${convertTime(eventDetails.endTime)}` : ""}</strong>
                    </td>
                    <td>{eventDetails.name}</td>
                    <td>
                        <a href="#directions-section" className={`link-std`}>{eventDetails.location}</a>
                    </td>
                </tr>

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

    const formattedTime = raceData.date ? formatDateTime(adjEDTtoUTC(new Date(raceData.date)) ) : null;
    const locationContainers = locations.sort((location1, location2) => {
        if (location1.iconUrl > location2.iconUrl) return 1
        if (location1.iconUrl < location2.iconUrl) return -1
        return 0
    })
        .map(location => <LocationContainer key={location.id} location={location} setSelectedMapLocation={setSelectedMapLocation} />)

    const scheduleItems = scheduleData ?
        scheduleData.sort((event1, event2) => convertTimeToCompare(event1.startTime) - convertTimeToCompare(event2.startTime))
            .map(eventDetails => <ScheduleItem key={eventDetails.id} eventDetails={eventDetails} />)
        :
        null;


    return (
        <>
            <main className={`${styles["racepage-container"]}`}>
                <section className={`section-container`} style={{ backgroundImage: "url('" + raceData.racePageImageURL + "')" }}>
                    {
                        (raceData.notification && raceData.notification !== 'null') &&
                        <div className={`${styles["notification-banner"]}`}>{
                            raceData.notification
                        }</div>
                    }
                    <div className={`${styles["heading-container"]}`}>
                        <h2 className={`primary-heading`}>{raceData.name}</h2>
                        {formattedTime ?
                            <>
                                <h4>{`${formattedTime.dow} ${formattedTime.monthString} ${formattedTime.day}, ${formattedTime.year}`}</h4>
                                <h4>{`${formattedTime.time} ${formattedTime.amPm}`}</h4>
                            </> : <h4>CHECK BACK SOON FOR NEXT SCHEDULED RACE DATE</h4>
                        }
                        <div className={`${styles["registration-button__container"]}`}>
                            {new Date(raceData.date) < new Date() ?
                                <h5 className={`${styles["registration-notice__heading"]}`}>
                                    Registration For This Event Is Closed
                                </h5>
                                :
                                !raceData.isRegOpen &&
                                <h5 className={`${styles["registration-notice__heading"]}`}>
                                    Registration Currently Closed - Check Back Soon To Sign Up
                                </h5>
                            }
                            <a href={`./${raceName}/register`} className={`button button--large ${raceData.isRegOpen === 0 || new Date(raceData.date) < new Date() ? "disabled" + " " + styles["hidden"] : ""} ${styles['registration-button']}`}>
                                Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                            </a>
                        </div>
                        <nav className={`${styles['race-nav']}`}>
                            <a href="#schedule-section" className={`link-std link-bold`}>Schedule</a>
                            <a href="#athletes-section" className={`link-std link-bold`}>Athletes</a>
                            <a href="#directions-section" className={`link-std link-bold`}>Directions</a>
                            <a href="#course-section" className={`link-std link-bold`}>Course</a>
                            <a href="#results-section" className={`link-std link-bold`}>Results</a>
                            <a href="#faq-section" className={`link-std link-bold`}>FAQ</a>
                        </nav>
                    </div>
                </section>
                <section className={`section-container`} id={`schedule-section`}>
                    {window.innerWidth > 640 &&
                        <div className={'section__div--half-width'} id={`athletes-section`}>
                            <h2 className={`section-heading`}>Registered Athletes</h2>
                            <hr />
                            {!(raceData.isRegOpen === 0 || new Date(raceData.date) < new Date()) ?
                                <p>Looking to join the fun?&nbsp;
                                    <a href={`./${raceName}/register`} className={`link-std link-bold link-small`}>Register Here</a>
                                </p>
                                :
                                <p>&nbsp;</p>
                            }
                            <RegisteredRacers raceData={raceData} racers={racers} />

                        </div>
                    }
                    <div className={`${window.innerWidth > 640 ? 'section__div--half-width' : 'section__div--full-width'}`}>
                        <h2 className={`section-heading`}>Schedule</h2>
                        <hr />
                        {window.innerWidth > 640 && <p>&nbsp;</p>}
                        {
                            scheduleItems ?
                                <table className={`${styles["schedule__table"]}`}>
                                    <thead>
                                        <tr><th>TIME</th><th>EVENT</th><th>LOCATION</th></tr>
                                    </thead>
                                    <tbody>
                                        {scheduleItems}
                                    </tbody>
                                </table>
                                :
                                <h4>Check back for race schedule</h4>
                        }
                    </div>
                </section>
                {window.innerWidth < 640 &&
                    <section className={`section-container`} id={`athletes-section`}>
                        <h2 className={`section-heading`}>Registered Athletes</h2>
                        <hr />
                        {!(raceData.isRegOpen === 0 || new Date(raceData.date) < new Date()) &&
                            <p>Looking to join the fun?&nbsp;
                                <a href={`./${raceName}/register`} className={`link-std link-bold link-small`}>Register Here</a>
                            </p>
                        }
                        <RegisteredRacers raceData={raceData} racers={racers} />
                    </section>
                }
                <section className={`section-container`} id={`directions-section`}>
                    <h2 className={`section-heading`}>Directions</h2>
                    <hr />
                    <div className={`${styles["directions-section"]}`}>
                        <div className={`${styles["location-section"]}`}>
                            {locationContainers}
                        </div>
                        {/* < Map mapMarkerData={mapMarkerData} selectedMapLocation={selectedMapLocation} /> */}
                    </div>
                </section >
                <section className={`section-container`} id={`course-section`}>
                    <h2 className={`section-heading`}>Race Details</h2>
                    <hr />
                    <CourseDetails details={raceData.longDescription} />
                </section>
                <section className={`section-container`} id={`results-section`}>
                    <h2 className={`section-heading`}>Results</h2>
                    <hr />
                    <Results />

                </section>
                <section className={`section-container`} id={`faq-section`}>
                    <h2 className={`section-heading`}>FAQ</h2>
                    <hr />
                    <FAQ />
                </section>
                <section className={`section-container`} id={`contact-section`}>
                    <h2 className={`section-heading`}>Contact</h2>
                    <hr />
                    <ContactForm contactEmail={raceData.contactEmail} raceName={raceData.name} />
                </section>
            </main>
        </>
    )
}