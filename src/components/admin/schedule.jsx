//Contexts
import { SelectedRaceContext, LastSavedContext, UserInfoContext } from "../../pages/adminDashboard";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libs
import { formatDateTime } from "../../utils/formatDateTime";
//Styles
import styles from "./schedule.module.css"
import Default from "./default";

function ScheduleInput({ i, handleChange, handleRemove, formData }) {
    return (
        <section className={`${styles["schedule-input__section"]}`} id={`event-${i}`}>
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
            <button type="button" onClick={handleRemove}>Remove</button>
        </section>
    )
}



export default function Schedule() {
    const [formData, setFormData] = useState({});
    const [scheduleInputs, setScheduleInputs] = useState([])
    const selectedRace = useContext(SelectedRaceContext)[0]
    const [lastSaved, setLastSaved] = useContext(LastSavedContext)
    const userInfo = useContext(UserInfoContext)


    useEffect(() => {
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                let raceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                setFormData({
                    date: formatDateTime(new Date(raceJSON[0].date)).htmlDateTime,
                    schedule: JSON.parse(raceJSON[0].schedule)
                })
            }
            catch (err) {
                setFormData({
                    date: null,
                    schedule: null
                })

            }
        }
        getRaceData()
        setLastSaved(null)
    }, [selectedRace])

    useEffect(() => {
        setScheduleInputs(formData.schedule ? formData.schedule.map((scheduleItem, i) => {
            return (
                <ScheduleInput key={i} i={i} handleChange={handleChange} formData={formData} handleRemove={handleRemove} />
            )
        }) : [])
    }, [formData])

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
        if (updatedRace.status == 200) {
            let now = new Date();
            let timeSaved = `${formatDateTime(now).time} ${formatDateTime(now).amPm}`
            setLastSaved(timeSaved)
        }
    }

    function handleChange(e) {
        let itemIndex = Number(e.target.id.split('-')[1]);
        let propertyName = e.target.name;
        setFormData(prev => {
            let updatedSchedule = prev.schedule.map((item, i) => {
                if (i === itemIndex) {
                    item[propertyName] = e.target.value
                    return item
                }
                else return item
            })
            return { ...prev, schedule: updatedSchedule }
        })
        setLastSaved('edited')
    }

    function handleRemove(e) {
        console.log(e.target.parentElement)
        setFormData(prev => {
            let updatedSchedule = prev.schedule.filter((item, i) => {
                return i !== Number(e.target.parentElement.id.split('-')[1])
            })
            return { ...prev, schedule: updatedSchedule }
        })
        setLastSaved('edited')
    }

    //By adding a new element to our schedule array in the form data our useEffect above will run and create a new list of our schedule inputs
    function addScheduleInput() {
        setFormData(prev => {
            let updatedSchedule = prev.schedule ? prev.schedule.map(item => item) : [];
            updatedSchedule[updatedSchedule.length] = { "startTime": "", "endTime": "", "name": "", "location": "" }
            return { ...prev, schedule: updatedSchedule }
        })
    }

    if (selectedRace) {

        return (
            <div className="admin-edit__container">
                <h2 className="section-heading">{selectedRace ? `${selectedRace} Schedule` : `Select a race to edit`}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={`${styles["schedule-inputs"]}`}>
                        {scheduleInputs}
                    </div>
                    <section className={`${styles["schedule-input__section"]}`}>
                        <button type="button" onClick={addScheduleInput}>Add New</button>
                    </section>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
    else return <Default userInfo={userInfo} />

}