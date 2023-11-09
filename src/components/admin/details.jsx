//Components
import Default from "./default";
import ReactQuill from "react-quill";
//Contexts
import { SelectedRaceContext, LastSavedContext } from "../../pages/adminDashboard";
import { UserInfoContext } from "../../pages/layout.jsx";
//Hooks
import { useContext, useEffect, useState } from "react";
//Libs
import { formatDateTime } from "../../utils/formatDateTime";
//Styles
import 'react-quill/dist/quill.snow.css';
import styles from "./details.module.css"

//Quill Text Editor Setup
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, false] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
];

export default function Details() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const setSelectedRaceYear = useContext(SelectedRaceContext)[3] //Setter function for the selected race's year
    const [lastSaved, setLastSaved] = useContext(LastSavedContext)
    const [formData, setFormData] = useState({});
    const userInfo = useContext(UserInfoContext)[0]

    formData.date ? console.log(formData, selectedRace) : console.log("")

    useEffect(() => {
        const getRaceData = async () => {
            try {
                const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
                console.log(raceToFetch)
                let raceData = await fetch(`http://localhost:3000/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                setFormData({
                    date: formatDateTime(new Date(raceJSON[0].date)).htmlDateTime,
                    shortDescription: raceJSON[0].shortDescription !== "null"? raceJSON[0].shortDescription : null,
                    longDescription: raceJSON[0].longDescription !== "null"? raceJSON[0].longDescription : null,
                    notification: raceJSON[0].notification !== "null"? raceJSON[0].notification : null,
                    isRegOpen: raceJSON[0].isRegOpen,
                    categories: raceJSON[0].categoryOptions!== "null"? raceJSON[0].categoryOptions : null
                })
            }
            catch (err) {
                setFormData({
                    date: null,
                    shortDescription: '',
                    longDescription: '',
                    notification: '',
                    isRegOpen: false,
                    categories: null
                })
            }
        }
        getRaceData()
        setLastSaved(null)
    }, [selectedRace])

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
                "longDescription": `${formData.longDescription}`,
                "notification": `${formData.notification}`,
                "isRegOpen": `${formData.isRegOpen}`,
                "categoryOptions": `${formData.categories}`
            })
        })
        if (updatedRace.status == 200) {
            let now = new Date();
            let timeSaved = `${formatDateTime(now).time} ${formatDateTime(now).amPm}`
            setLastSaved(timeSaved)
            setSelectedRaceYear(formatDateTime(formData.date).year)
        }
    }

    function handleQuillChange(value) {
        console.log(value)
        setFormData(prev => {
            let updatedData = {
                ...prev,
                longDescription: value
            }
            return updatedData
        })
    }

    function handleChange(e) {
        if (e.target.type === "checkbox") {
            let isRegOpen = e.target.checked ? 1 : 0;
            setFormData({
                ...formData,
                isRegOpen: isRegOpen
            })
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
        setLastSaved('edited')
    }

    const test = new DOMParser(formData.longDescription, 'text/html')
    console.log(test)

    if (selectedRace) {
        return (
            <div className="admin-edit__container">
                <h2 className="section-heading">{selectedRace ? `${selectedRace} Details` : `Select a race to edit`}</h2>
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
                            <textarea maxLength={300} rows="4" name="shortDescription" id="shortDescription" onChange={handleChange} value={formData.shortDescription ? formData.shortDescription : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="notification">Banner notfication (will appear as a banner at the top of the details section)</label>
                            <input type="text" name="notification" id="notification" placeholder="EXAMPLE:   Only 5 spots left!" onChange={handleChange} value={formData.notification ? formData.notification : ''} />
                        </div>
                    </div>
                    <div className={`input-row ${styles["quill-container"]}`}>
                        <div className="input-group">
                            <label htmlFor="longDescription">Course Description</label>
                            <ReactQuill id="longDescription" theme="snow" modules={{ toolbar: toolbarOptions }} value={formData.longDescription} onChange={handleQuillChange} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="categories">Race categories.  MUST BE SEPARATED BY COMMAS</label>
                            <input type="text" name="categories" id="categories" placeholder="EXAMPLE:   Kayak, Canoe, Tandem Canoe, Tandem Kayak" onChange={handleChange} value={formData.categories ? formData.categories : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className={`input-group ${styles["checkbox-group"]}`}>
                            <label htmlFor="isRegOpen">Is Registration Open?</label>
                            <input type="checkbox" name="isRegOpen" id="isRegOpen" onChange={handleChange} checked={formData.isRegOpen ? true : false} />
                        </div>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
    else return <Default userInfo={userInfo} />
}