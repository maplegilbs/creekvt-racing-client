//Styles
import styles from "./details.module.css"
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
//Hooks
import { useContext, useEffect, useState } from "react";

export default function Details({ racename }) {
    const [formData, setFormData] = useState({});
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    useEffect(() => {
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let raceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                console.log(raceJSON)
                setFormData({
                    date: raceJSON[0].date.slice(0, -8),
                    shortDescription: raceJSON[0].shortDescription
                })
            }
            catch (err) {
                setFormData({
                    date: null,
                    shortDescription: null
                })

            }
        }
        getRaceData()
    }, [selectedRace])

    console.log(formData)

    async function handleSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token')
        let updatedRace = await fetch('http://localhost:3000/races/testrace', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": `${selectedRace}`
            })
        })

    }
    return (
        <div className="admin-edit__container">
            <h3>{selectedRace? `Editing details for the ${selectedRace}`: `Select a race to edit`}</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="raceDate">Date</label>
                        <input type="date" name="raceDate" id="raceDate" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="raceTime">Time</label>
                        <input type="time" name="raceTime" id="raceTime" />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="raceDate">Date</label>
                        <input type="datetime-local" name="raceDate" id="raceDate" value={formData.date} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="summary">Short Description (max 300 characters)</label>
                        <textarea rows="8" name="summary" id="summary" value={formData.shortDescription} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="alert">Banner notfication (will appear as a banner at the top of the details section)</label>
                        <input type="text" name="alert" id="alert" placeholder="Example: Only 5 spots left!" />
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )

}