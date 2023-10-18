//Contexts
import { SelectedRaceContext, LastSavedContext } from "../pages/adminDashboard"
//Hooks
import { useContext } from "react"
//Styles
import styles from "./adminHeader.module.css"

export default function AdminHeader({ userInfo }) {
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)
    const lastSaved = useContext(LastSavedContext)[0]

    return (
        <>
            <div className={`${styles["welcome-heading"]}`}>
                <h4>{`${selectedRace ? `Currently Editing: ${selectedRace}` : "Select a race to edit"}`} </h4>
                <h4 className={`${lastSaved === 'edited'? styles["unsaved-heading"]: styles["saved-heading"]}`}>{
                lastSaved === 'edited'? 
                `You have unsaved edits`
                :
                lastSaved? `Saved at ${lastSaved}` : ''}</h4>
            </div>
        </>
    )
}