//Hooks
import { useEffect, useState } from "react"
//Styles
import styles from "./registeredRacers.module.css"

export default function RegisteredRacers({ raceData }) {
    const [registeredRacers, setRegisteredRacers] = useState([])

    console.log(raceData, registeredRacers)

    useEffect(() => {
        const getRegisteredRacers = async () => {
            try {
                const raceToFetch = raceData.name.split(' ').join('').toLowerCase();
                let racersResponse = await fetch(`http://localhost:3000/racers/${raceToFetch}`)
                let racersJSON = await racersResponse.json();
                console.log(racersJSON)
                setRegisteredRacers(racersJSON[0])
            } catch (error) {
                console.error(error);
            }
        }
        getRegisteredRacers()
    }, [])

    return (
        <div className={`${styles["racers-grid"]}`}>
            <div className={`${styles["racer-row"]} ${styles["header-row"]}`}>
                <h5 className={`${styles["racer-detail"]}`}>Count</h5>
                <h5 className={`${styles["racer-detail"]}`}>Athletes</h5>
                <h5 className={`${styles["racer-detail"]}`}>Category</h5>
            </div>
            {
                registeredRacers.map((racer, i) => {
                    return (
                        <div className={`${styles["racer-row"]}`}>
                            <p className={`${styles["racer-detail"]} ${styles["first-column"]}`}>{i + 1}</p>
                            <p className={`${styles["racer-detail"]}`}>
                                <span>{racer.firstName} {racer.lastName}</span>
                                {JSON.parse(racer.partners) ? JSON.parse(racer.partners).map(partner => {
                                    return (<>
                                        <span>{`${partner.firstName} ${partner.lastName}`}</span>
                                    </>
                                    )
                                }) : <></>}
                            </p>
                            <p className={`${styles["racer-detail"]} ${styles["last-column"]}`}>{racer.category}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}