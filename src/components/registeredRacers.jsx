//Constants
import { flagLookup } from "../constants"
//Hooks
import { useEffect, useState } from "react"
//Styles
import styles from "./registeredRacers.module.css"

export default function RegisteredRacers({ racers }) {
    let locationAbbrevs = Object.assign(flagLookup.canada, flagLookup.unitedStates)
    console.log(racers)
    console.log(locationAbbrevs)

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
                                    console.log(racerName)
                                    let racerSpan = <span key={i} className={`${styles["racer-name__span"]}`}>
                                        {`${racerName.split("loc=")[0]}`}
                                        {(racerName.split("loc=")[1] !== 'null' && racerName.split("loc=")[1].toLowerCase() !== 'other') &&
                                            <div  className={`${styles["location__div"]}`}>
                                                <p>{locationAbbrevs[racerName.split("loc=")[1]].toUpperCase()}</p>
                                                <img src={`/flags/${locationAbbrevs[racerName.split("loc=")[1]].toLowerCase()}.svg`} height={'20px'} />
                                            </div>
                                        }
                                    </span>
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