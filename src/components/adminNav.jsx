//Styles
import styles from './adminNav.module.css'

export default function AdminNavBar({availableRaces}) {

    const raceOptions = availableRaces.map (race =>  <option value={race}>{race}</option>)
    return (
        <menu className={`${styles["admin-menu"]}`}>
            <label htmlFor="raceSelect">Select A Race To Edit</label>
            <select className={`${styles["menu-option"]} ${styles["menu-select"]}`} id="raceSelect">
                {raceOptions}
            </select>
            <button className={`${styles["menu-option"]}`}>Details</button>
            <button className={`${styles["menu-option"]}`}>Schedule</button>
            <button className={`${styles["menu-option"]}`}>Athletes</button>
            <button className={`${styles["menu-option"]}`}>Directions</button>
            <button className={`${styles["menu-option"]}`}>Results</button>
            <button className={`${styles["menu-option"]}`}>FAQs</button>
        </menu>
    )
}