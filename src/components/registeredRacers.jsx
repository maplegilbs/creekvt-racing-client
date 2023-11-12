//Hooks
import { useEffect, useState } from "react"
//Styles
import styles from "./registeredRacers.module.css"

export default function RegisteredRacers({ raceData, racers }) {

    return (
        <div className={`${styles["racers-grid"]}`}>
            <div className={`${styles["racer-row"]} ${styles["header-row"]}`}>
                <h5 className={`${styles["racer-detail"]}`}>Count</h5>
                <h5 className={`${styles["racer-detail"]}`}>Athletes</h5>
                <h5 className={`${styles["racer-detail"]}`}>Category</h5>
            </div>
            {racers.length > 0 &&
                racers.map((racer, i) => {
                    return (
                        <div className={`${styles["racer-row"]}`} key={racer.id}>
                            <p className={`${styles["racer-detail"]} ${styles["first-column"]}`}>{i + 1}</p>
                            <p className={`${styles["racer-detail"]}`}>
                                {racer.racers.map((racerName, i) => {
                                    let racerSpan = i < racer.racers.length -1 ? 
                                    <span className={`${styles["racer-name__span"]}`}>{`${racerName}`}</span>
                                    :
                                    <span className={`${styles["racer-name__span"]}`}>{racerName}</span>
                                    return racerSpan
                                })}
                            </p>
                            <p className={`${styles["racer-detail"]} ${styles["last-column"]}`}>{racer.category}</p>
                        </div>
                    )
                })
            }
            {racers.length === 0 && <h5 className={`${styles["racer-row"]} ${styles["racer-row__full-row-heading"]}`}>No racers registered yet.</h5>}
        </div>
    )
}