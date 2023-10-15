//Hooks
import { useLoaderData } from "react-router-dom";
//Styles
import styles from "./races.module.css"

export async function loader() {
    //get data on all races from api here
    let racesData = await fetch('http://localhost:3000/races');
    let racesJSON = await racesData.json();
    return racesJSON;
}

export default function Races() {
    const racesData = useLoaderData();

    const racesCards = racesData.map(raceData => {
        return (
            <div className={`card ${styles["card"]}`}>
                <h5 className={`card-title ${styles["card-title"]}`}>{raceData.name}</h5>
                <img src={raceData.primaryImageURL} className={`card-img`} alt="..." />
                <div className={`card-body`}>
                    <p className={`card-text ${styles["card-text"]}`}>
                        {raceData.shortDescription}
                    </p>
                    <div className={`${styles["button__container"]}`}>
                        <a href="#" className={`button button--large disabled`}>
                            Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                        </a>
                        <a href={`/races/${raceData.name.split(' ').join('').toLowerCase()}`} className={`button button--large`}>Information</a>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <main>
            <div className={`${styles["hero-image__container"]}`}>
                <img className={`${styles["hero-image"]}`} src="https://creekvt.com/races/RaceMainPage2.jpg" />
            </div>
            <div className={`${styles["content-container"]}`}>
                <div className={`${styles["heading-container"]}`}>
                    <h2>Vermont Whitewater Races</h2>
                    <p className={`${styles["heading-container__summary"]}`}>
                        Welcome to the world of whitewater racing in the Green Mountains. On
                        this site you can register to compete, find information on each
                        race, or relive prior years by browsing through our collection of race
                        results and photos. For the 2024 season we are looking forward
                        to the return of the classic New Haven Ledges Race, as well as the 3rd
                        annual Peavine Race. Check the individual race pages for details and to
                        sign up. <br /><br />See you at the finish line.</p>
                </div>
                <div className={`${styles["section-container"]}`}>
                    <h2 className={`${styles["section-heading"]}`}>2024 Lineup</h2>
                    <hr />
                    <div className={`${styles["race-cards__container"]}`}>
                        {racesCards}
                    </div>
                </div>
            </div>
        </main>
    )
}