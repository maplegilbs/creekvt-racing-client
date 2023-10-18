//Contexts
import { SelectedRaceContext } from "../pages/adminDashboard"
//Hooks
import { useContext } from "react"
//Styles
import styles from "./adminHeader.module.css"

export default function AdminHeader({userInfo}) {
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    return (
        <>
        <h4 className={`${styles['welcome-heading']}`}>{`${selectedRace? `Currently Editing: ${selectedRace}` : "Select a race to edit"}`} </h4>
        </>
    )
}