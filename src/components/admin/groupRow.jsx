//Components
import AthleteRow from "./athleteRow";
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard"
//Hooks
import { useContext } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus} from "@fortawesome/free-solid-svg-icons";
//Styles
import adminStyles from "./adminGlobalStyles.module.css"
import styles from "./athletes.module.css"

//Component for informational row only.  Buttons to edit or delete racers.
export default function GroupRow({ itemID, itemData, askDeleteItem, editItem }) {
    

    return (
        <div className={`${adminStyles["info-row"]} ${styles["group-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID, "racerEntity")} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemID ? itemID : ""}</p>
            <div className={`${styles["racer-rows"]}`}>
                {itemData.racers.map(item => <AthleteRow key={item.id} itemData={item} />)}
            </div>
            <p>{itemData.category ? itemData.category : ""}</p>
        </div>
    )
}