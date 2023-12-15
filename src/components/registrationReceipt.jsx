//Components
import { Link, useParams } from "react-router-dom";
import RegisteredRacers from "./registeredRacers";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./checkout.module.css"
import { useEffect, useState } from "react";

export default function RegistrationReceipt({ registrationData, raceInfo, raceName }) {
    const [racers, setRacers] = useState(null)
    const params = useParams()

    console.log('line13', registrationData)

    useEffect(() => {
        async function getRacerData() {
            const raceData = await fetch(`http://localhost:3000/races/${params.raceName}`);
            const raceJSON = await raceData.json();
            let currentRaceYear = new Date(raceJSON[0].date).getFullYear()
            const racersData = await fetch(`http://localhost:3000/racers/${params.raceName}/${currentRaceYear}`);
            const racersJSON = await racersData.json();
            let groupedRacers = racersJSON.reduce((accum, curRacer) => {
                //if the accumulator has a racer in an array that shares the id of the current racer, add it to that array, otherwise make a new array
                // [{id: category: racers: []}]
                let foundGroup = accum.find(group => Number(group.id) === Number(curRacer.entityID));
                if (!foundGroup) {
                    accum.push({ id: curRacer.entityID, category: curRacer.category, racers: [`${curRacer.firstName} ${curRacer.lastName}`] })
                }
                else {
                    foundGroup.racers.push(`${curRacer.firstName} ${curRacer.lastName}`)
                }
                return accum
            }, [])
            setRacers(groupedRacers)
        }
        getRacerData()
    }, [])

    let acaDiscount = Number(raceInfo.acaDiscount);
    let raceFee = Number(raceInfo.fee);
    let subTotal = 0;

    return (
        <div className={`${styles["subtotal__container"]}`}>
            <header>
                <h3>Get Ready To Race!</h3>
            </header>
            <div className={`${styles["registration-details"]}`}>
                <h5>Registration Details:</h5>
                <div className={`${styles["detail-row"]}`}><p>Race:</p><p> {raceInfo.name}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Event Date:</p><p> {formatDateTime(new Date(raceInfo.date)).fullDate}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Participant Count:</p><p> {registrationData.racers.length}</p></div>
                <div className={`${styles["detail-row"]}`}><p>Race Class:</p><p> {registrationData.category}</p></div>
            </div>
            <div className={`${styles["receipt-row"]} ${styles["receipt-row--header"]}`}>
                <h5>Racer</h5>
                <h5>Fee</h5>
                <h5>Discount</h5>
                <h5>Subtotal</h5>
            </div>
            {registrationData.racers.map(racer => {
                const racerDiscount = racer.acaNumber ? (acaDiscount * -1) : 0;
                const racerTotal = raceFee + racerDiscount;
                subTotal += racerTotal;

                return (
                    <div className={`${styles["receipt-row"]}`}>
                        <p>{`${racer.firstName + " " + racer.lastName}`}{racer.acaNumber && <><br /><span>ACA  #{racer.acaNumber}</span></>}</p>
                        <p>{`${raceInfo.fee}`}</p>
                        <p>{`${racerDiscount.toFixed(2)}`}</p>
                        <p>{`${racerTotal.toFixed(2)}`}</p>
                    </div>
                )
            })
            }
            <div className={`${styles["subtotal-row"]}`}>
                <p>Total</p>
                <p>${subTotal.toFixed(2)}</p>
            </div>
            {racers &&
                <RegisteredRacers racers={racers} />
            }
            <Link to={`/races/${raceName}`}>Back to races</Link>
        </div>
    )

}