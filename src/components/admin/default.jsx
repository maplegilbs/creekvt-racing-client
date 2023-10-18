//Styles
import styles from "./default.module.css"
export default function Default({ userInfo }) {
    return (
        <div className={`${styles["welcome-wrapper"]}`}>
            <h2>Hi {userInfo.name}</h2>
            <p>Welcome to the admin dashboard.  Select a race from the dropdown on the left to begin, then choose from the menu options to edit details pertaining to that specific aspect of the race. </p>
            <p>Currently you have permissions to edit the following race(s): </p>
            <ul>
                {userInfo.races.map(race => <li key={race}>{race}</li>)}
            </ul>
            <p>Any issues contact gopaddling@creekvt.com</p>
        </div>
    )
}