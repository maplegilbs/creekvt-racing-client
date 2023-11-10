//Components
//Contexts
import {SelectedRaceContext} from "../../pages/adminDashboard"
import { UserInfoContext } from "../../pages/layout.jsx";

//Hooks
import { useContext } from "react"
//Styles
import styles from "./results.module.css"
import adminStyles from "./adminGlobalStyles.module.css"

function ResultsTableRow() {

}

function EditResultsTableRow(){

}


export default function Results() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const userInfo = useContext(UserInfoContext)[0];  //Logged in user info contianed in token

    return (
        <div className={`${adminStyles["info__container"]}`}>
                    <h2 className="section-heading">{selectedRace ? `${selectedRace} Results` : `Select a race to edit`}</h2>
        <table className={`${styles["results-table"]}`}>
            
        </table>
        </div>
    )
}