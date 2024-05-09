//Components
import { Helmet } from "react-helmet";
//Hooks
import { useLoaderData } from "react-router-dom";
//Styles
import styles from "./races.module.css"
import { formatDateTime } from "../utils/formatDateTime";

export async function loader() {
    //get data on all races from api here
    let racesData = await fetch(`${process.env.REACT_APP_SERVER}/races`);
    let racesJSON = await racesData.json();
    return racesJSON;
}

export default function Races() {
    const racesData = useLoaderData();

    const racesCards = racesData.filter(raceData => raceData.isPublished)
        .sort((race1, race2) => {
            if (race1.date < race2.date) return -1;
            if (race1.date > race2.date) return 1;
            return 0
        })
        .map(raceData => {
            console.log(raceData)
            return (
                <div key={raceData.name} className={`card ${styles["card"]}`}>
                    <h5 className={`card-title ${styles["card-title"]}`}>{raceData.name}</h5>
                    <img src={raceData.primaryImageURL} className={`card-img`} alt="..." />
                    <div className={`card-body ${styles["card-body"]}`}>
                        <div className={`${styles["card-body-details"]}`}>
                            <div className={`${styles["details-group"]}`}>
                                <p>Next Race:</p> {new Date(raceData.date) > new Date() ? <p>{formatDateTime(new Date(raceData.date)).fullDate}</p> : <p>TBD</p>}
                            </div>
                            <div className={`${styles["details-group"]}`}>
                                <p>Race Type:</p> <p>{raceData.type}</p>
                            </div>
                            <div className={`${styles["details-group"]}`}>
                                <p>Difficulty:</p> <p>{raceData.difficulty}</p>
                            </div>
                            <div className={`${styles["details-group"]}`}>
                                <p>Format:</p> <p>{raceData.format}</p>
                            </div>
                        </div>
                        <p className={`card-text ${styles["card-text"]}`}>
                            {raceData.shortDescription}
                        </p>
                        <div className={`${styles["button__container"]}`}>
                            {(raceData.isRegOpen && (new Date(raceData.date) > new Date())) ?
                                <a href={`${raceData.name.split(' ').join('').toLowerCase()}/register`} className={`button button--large`}>
                                    Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                                </a>
                                :
                                <></>
                            }
                            <a href={`/races/${raceData.name.split(' ').join('').toLowerCase()}`} className={`button button--large`}>Information</a>
                        </div>
                    </div>
                </div>
            )
        })

    return (
        <>
            <Helmet>
                <meta property="og:title" content="Creek VT Races" />
                <meta property="og:description" content="Creek VT - Vermont Whitewater Racing" />
                <meta property="og:image" content="https://creekvt.com/races/RaceMainPage.jpg" />
                <meta property="og:url" content="https://creekvt.com/races" />
                <meta property="og:type" content="website" />
            </Helmet>
            <main>
                <div className={`${styles["hero-image__container"]}`}>
                    <img className={`${styles["hero-image"]}`} src="https://creekvt.com/races/RaceMainPage.jpg" />
                </div>
                <div className={`${styles["content-container"]}`}>
                    <div className={`${styles["heading-container"]}`}>
                        <h2 className={`primary-heading`}>Vermont Whitewater Racing</h2>
                        {/* <br /> */}
                        <p className={`${styles["heading-container__summary"]}`}>
                            Thanks to everybody for a great 2024 season of whitewater racing in the Green Mountains.
                            <br/><br/>
                            Congratultaions to all the competitors, organizers and volunteers.  Check individual race pages for results.  
                            <br/><br/>
                            - See you for the next round in 2025!
                            {/* Welcome to the world of whitewater racing in the Green Mountains. On
                            this site you can register to compete, find information on each
                            race, or relive prior years by browsing through our collection of race
                            results and photos. For the 2024 season we are looking forward
                            to the classic New Haven Ledges Race, the 3rd
                            annual Peavine Race as well as the return of the Wells River Rumble!</p>
                        <p className={`${styles["heading-container__summary"]}`}>- See you at the finish line!</p> */}
                        </p>
                    </div>
                    <section className={`section-container`}>
                        <h2 className={`section-heading`}>2024 Lineup</h2>
                        <hr />
                        <div className={`${styles["race-cards__container"]}`}>
                            {racesCards}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}