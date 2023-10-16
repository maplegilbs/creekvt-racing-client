//Contexts
import { SelectedRaceContext } from "../pages/adminDashboard";
//Hooks
import { useContext } from "react";
//Styles
import styles from './adminNav.module.css'

export default function AdminNavBar({availableRaces, infoSectionToEdit, setInfoSectionToEdit}) {
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    const raceOptions = availableRaces.map (race =>  <option value={race}>{race}</option>)

    function handleChange (e) {
        setSelectedRace(e.target.value)
    }
    
    return (
        <menu className={`${styles["admin-menu"]}`}>
            <label htmlFor="raceSelect">Select A Race To Edit</label>
            <select onChange={handleChange} className={`${styles["menu-option"]} ${styles["menu-select"]}`} id="raceSelect">
                <option>Select Race</option>
                {raceOptions}
            </select>
            <button onClick={()=>setInfoSectionToEdit("details")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'details' ? styles["active"]:""}`}>Details</button>
            <button onClick={()=>setInfoSectionToEdit( "schedule")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'schedule' ? styles["active"]:""}`}>Schedule</button>
            <button onClick={()=>setInfoSectionToEdit("athletes")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'athletes' ? styles["active"]:""}`}>Athletes</button>
            <button onClick={()=>setInfoSectionToEdit("directions")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'directions' ? styles["active"]:""}`}>Directions</button>
            <button onClick={()=>setInfoSectionToEdit("results")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'results' ? styles["active"]:""}`}>Results</button>
            <button onClick={()=>setInfoSectionToEdit("faqs")}  className={`${styles["menu-option"]} ${infoSectionToEdit === 'faqs' ? styles["active"]:""}`}>FAQs</button>
        </menu>
    )
}