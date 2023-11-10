//Styles
import styles from "./athletes.module.css"

export default function AthleteRow({ itemData }) {
    return (
        <div className={`${styles["racer-row"]}`}>
            <p>{itemData.firstName ? itemData.firstName : ""}</p>
            <p>{itemData.lastName ? itemData.lastName : ""}</p>
            <p>{itemData.email ? itemData.email : ""}</p>
        </div>
    )
}