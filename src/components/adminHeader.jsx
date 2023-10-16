//Contexts
import { SelectedRaceContext } from "../pages/adminDashboard"
//Hooks
import { useContext } from "react"
//Styles
import styles from "./adminHeader.module.css"

export default function AdminHeader({userInfo, editSelection}) {
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    return (
        <>
        <h4 className={`${styles['welcome-heading']}`}>Welcome {userInfo.name}.</h4>
        </>
    )
}