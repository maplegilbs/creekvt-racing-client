//Hooks
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./checkout.module.css"

export default function RegistrationReceipt({ registrationData, raceInfo, raceName, receiptInfo }) {
    const [racers, setRacers] = useState(null)
    const params = useParams()

    console.log('line13', registrationData)

    useEffect(() => {
        async function getRacerData() {
            const raceData = await fetch(`${process.env.REACT_APP_SERVER}/races/${params.raceName}`);
            const raceJSON = await raceData.json();
            let currentRaceYear = new Date(raceJSON[0].date).getFullYear()
            const racersData = await fetch(`${process.env.REACT_APP_SERVER}/racers/${params.raceName}/${currentRaceYear}`);
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
                <h3 style={{margin: "0 auto;"}}>Get Ready To Race!</h3>
            </header>
            <div >
                <div ><p>Mark your calendar for {formatDateTime(new Date(raceInfo.date)).fullDate}.  You{registrationData.racers.map((racer, index) => {
                    return index > 0 ? `${racer.firstName}` : ""
                }).join(', ')
                } will be competing in the {registrationData.category} class for champion of the {raceInfo.name}.  Good luck and SYOTR!</p></div>
            </div>
            <br /><br />
            <h5 style={{textAlign: "left;"}}>Here is your registration receipt.</h5>
            <p style={{fontSize: ".8rem", margin: "0"}}>Transaction ID: {receiptInfo.orderData.id}</p>
            <p style={{fontSize: ".8rem", margin: "0"}}>Payment Date: {formatDateTime(new Date(receiptInfo.timeStamp)).fullDate}</p>
            <br />
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
                <p>Paid</p>
                <p>${subTotal.toFixed(2)}</p>
            </div>
            <br />
            <p>Be sure to review the <a href={`/races/${raceName}`} className={`link-std`}>race page</a> for schedule, directions and other details.  Or contact the organizers with any questions.</p>
        </div>
    )

}