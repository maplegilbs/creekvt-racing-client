//Hooks
import { useLoaderData } from "react-router-dom";
//Styles
import styles from "./race.module.css"

export async function loader({ params }) {
    // Get data via api call to populate page here
    return params.raceName;
}

export default function Race() {
    const raceData = useLoaderData();
    return (
        <>
            <div className={`${styles["section-container"]}`}>
                <div className={`${styles["heading-container"]}`}>
                    <h2>
                        {/* Name */}
                        {raceData}
                    </h2>
                    <h4>
                        {/* Date */}
                        Saturday, May 5th 2024
                    </h4>
                    <h4>
                        {/* Time */}
                        10:00 AM
                    </h4>
                </div>
                {/* Registration Button */}
                <a href="#" className={`${styles["button"]} ${styles["button--large"]} ${styles["disabled"]}`}>
                    Register &nbsp;<img src="https://creekvt.com/races/RacerIcon.png" />
                </a>
                <p>
                    {/* Blurb */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, eum officiis. Corrupti accusantium sed labore nam veritatis deserunt distinctio architecto dignissimos minus in, harum ducimus!
                </p>
            </div>
            <div className={`${styles["section-container"]}`}>
                REGISTRATION:<br/>
                PUT-IN:<br/>
                START:<br/>
                FINISH:<br/>
                TAKE-OUT:<br/>
                AWARDS:<br/>
                AFTER PARTY:<br/>
                {/* Map */}
                <a href="https://www.google.com/maps/dir/?api=1&destination=44.12336589880534,-73.03465347551882&waypoints=44.12938735908366,-73.05119217901516" target="_blank" className={`${styles["button"]} ${styles["button--small"]}`}>
                    Directions
                </a>
                <span className={`${styles["button__subtext"]}`}>(Opens In Google Maps)</span>
            </div>
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