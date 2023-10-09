//Styles
import styles from "./races.module.css"

export default function Races() {
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
                        sign up. <br/><br/>See you at the finish line.</p>
                </div>
                <div className={`${styles["section-container"]}`}>
                    <h2 className={`${styles["section-heading"]}`}>2024 Lineup</h2>
                    <hr />
                    <div className={`${styles["race-cards__container"]}`}>
                        <div className={`card ${styles["card"]}`}>
                            <img src="https://creekvt.com/races/newhaven/images/2016/002.jpg" className={`card-img`} alt="..." />
                            <div className={`card-body`}>
                                <h5 className={`card-title`}>Card title</h5>
                                <p className={`card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className={`${styles["button__container"]}`}>
                                    <a href="#" className={`${styles["button"]}`}>Register</a>
                                    <a href="#" className={`${styles["button"]}`}>Information</a>
                                </div>
                            </div>
                        </div>
                        <div className={`card ${styles["card"]}`}>
                            <img src="https://creekvt.com/races/newhaven/images/2016/002.jpg" className={`card-img`} alt="..." />
                            <div className={`card-body`}>
                                <h5 className={`card-title ${styles["card-title"]}`}>Card title</h5>
                                <p className={`card-text ${styles["card-text"]}`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className={`${styles["button__container"]}`}>
                                    <a href="#" className={`${styles["button"]} ${styles["disabled"]}`}>
                                        Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                                    </a>
                                    <a href="#" className={`${styles["button"]}`}>Information</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}