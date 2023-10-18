//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libs
import { formatDateTime } from "../../utils/formatDateTime";
//Styles
import styles from "./schedule.module.css"

export default function Schedule({ racename }) {
    const [formData, setFormData] = useState({});
    const [selectedRace, setSelectedRace] = useContext(SelectedRaceContext)

    useEffect(() => {
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let raceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                console.log(JSON.parse(raceJSON[0].schedule))
                setFormData({
                    date: formatDateTime(new Date(raceJSON[0].date)).htmlDateTime,
                    schedule: JSON.parse(raceJSON[0].schedule)
                })
            }
            catch (err) {
                setFormData({
                    date: null,
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
                "schedule": formData.schedule
            })
        })

    }

    function handleChange(e) {
        let itemIndex = Number(e.target.id.split('-')[1]);
        let propertyName = e.target.name;
        setFormData(prev => {
            let updatedSchedule = prev.schedule.map((item, i) => {
                console.log(i, itemIndex)
                console.log(item)
                if (i === itemIndex) {
                    console.log(item)
                    item[propertyName] = e.target.value
                    return item
                }
                else return item
            })
            return { ...prev, schedule: updatedSchedule }
        })
    }


    let scheduleInputs = formData.schedule ? formData.schedule.map((scheduleItem, i) => {
        return (
            <section className={`${styles["schedule-input__section"]}`}>
                <div className={"input-row"}>
                    <div className="input-group">
                        <label htmlFor={`name-${i}`}>Name</label>
                        <input type="text" name="name" id={`name-${i}`} onChange={handleChange} value={formData.schedule[i].name} />
                    </div>
                    <div className="input-group">
                        <label htmlFor={`location-${i}`}>Location</label>
                        <input type="text" name="location" id={`location-${i}`} onChange={handleChange} value={formData.schedule[i].location} />
                    </div>
                </div>

                <div className="input-row">
                    <div className={"input-group"}>
                        <label htmlFor={`startTime-${i}`}>Start Time</label>
                        <input type="time" name="startTime" id={`startTime-${i}`} onChange={handleChange} value={formData.schedule[i].startTime} />
                    </div>
                    <div className="input-group">
                        <label htmlFor={`endTime-${i}`}>End Time</label>
                        <input type="time" name="endTime" id={`endTime-${i}`} onChange={handleChange} value={formData.schedule[i].endTime} />
                    </div>
                </div>
            </section>
        )
    })
        :
        ''
        ;

    return (
        <div className="admin-edit__container">
            <h3>{selectedRace ? `Editing Schedule For The ${selectedRace}` : `Select a race to edit`}</h3>
            <form onSubmit={handleSubmit}>
                <div class={`${styles["schedule-inputs"]}`}>
                    {scheduleInputs}
                </div>


                <button type="submit">Save</button>
            </form>
        </div>
    )

}