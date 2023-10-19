//Components
import Default from "./default.jsx";
//Contexts
import { SelectedRaceContext, UserInfoContext } from "../../pages/adminDashboard"
//Hooks
import { useContext, useEffect, useState } from "react"
//Styles
import styles from "./athletes.module.css"

function AthleteRow({ i, registeredRacers }) {
    console.log(registeredRacers[i].partners ? JSON.parse(registeredRacers[i].partners) : 'None')
    return (
        <div className={`${styles["racer-row"]}`}>
            <p>{registeredRacers[i].id}</p>
            <p>{registeredRacers[i].firstName}</p>
            <p>{registeredRacers[i].lastName}</p>
            <p>{registeredRacers[i].email}</p>
            <p>{registeredRacers[i].category}</p>
            {
                JSON.parse(registeredRacers[i].partners) &&
                <div className={`${styles["partners-block"]}`}>
                    <div className={`${styles["partners-row"]}`}>
                    <p><strong>Partners:</strong> {JSON.parse(registeredRacers[i].partners).map(partner => `${partner.firstName} ${partner.lastName}`).join(', ')}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default function Athletes() {
    const selectedRace = useContext(SelectedRaceContext)[0];
    const userInfo = useContext(UserInfoContext)
    const [registeredRacers, setRegisteredRacers] = useState(null)
    console.log(registeredRacers)

    useEffect(() => {
        const getRacerData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let fetchedRacerData = await fetch(`http://localhost:3000/racers/${raceToFetch}`)
                console.log(fetchedRacerData)
                let fetchedRacerJSON = await fetchedRacerData.json();
                console.log(fetchedRacerJSON[0])
                setRegisteredRacers(fetchedRacerJSON[0])
            } catch (error) {
                console.error(error);
            }
        }
        getRacerData()
    }, [selectedRace])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitted')
    }

    if (selectedRace) {
        return (
            <>
                <div className={`${styles["registered-racers__container"]}`}>
                    <div className={`${styles["racer-headers"]}`}>
                        <h6>ID</h6><h6>First Name</h6><h6>Last Name</h6><h6>Email</h6><h6>Category</h6>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {registeredRacers ? registeredRacers.map((racer, i) => <AthleteRow i={i} registeredRacers={registeredRacers} />) : 'No data'}
                        <button type="submit">Save</button>
                    </form>
                </div>
            </>
        )
    }
    else return <Default userInfo={userInfo} />
}