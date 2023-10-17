//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libs
import { formatDateTime } from "../../utils/formatDateTime";
//Styles
import styles from "./details.module.css"

export default function Details({ racename }) {
    const [formData, setFormData] = useState({});
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    useEffect(() => {
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let raceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                setFormData({
                    date: formatDateTime(new Date(raceJSON[0].date)).htmlDateTime,
                    shortDescription: raceJSON[0].shortDescription,
                    notification: raceJSON[0].notification
                })
            }
            catch (err) {
                setFormData({
                    date: null,
                    shortDescription: '',
                    notification: ''
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
                "name": `${selectedRace}`,
                "date": `${formData.date}`,
                "shortDescription": `${formData.shortDescription}`,
                "notification": `${formData.notification}`
            })
        })

    }

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="admin-edit__container">
            <h3>{selectedRace? `Editing details for the ${selectedRace}`: `Select a race to edit`}</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="date">Date & Time</label>
                        <input type="datetime-local" name="date" id="date" onChange={handleChange} value={formData.date} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="shortDescription">Short Description (max 300 characters)</label>
                        <textarea rows="8" name="shortDescription" id="shortDescription" onChange={handleChange} value={formData.shortDescription? formData.shortDescription : ''} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="notification">Banner notfication (will appear as a banner at the top of the details section)</label>
                        <input type="text" name="notification" id="notification"  placeholder="Example: Only 5 spots left!" onChange={handleChange} value={formData.notification? formData.notification : ''}/>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )

}