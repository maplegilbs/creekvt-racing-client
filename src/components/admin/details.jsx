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
import { adjEDTtoUTC } from "../../utils/adjForUTCDate.js";
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
                let raceData = await fetch(`${process.env.REACT_APP_SERVER}/races/${raceToFetch}`)
                let raceJSON = await raceData.json();
                setFormData({
                    date: formatDateTime(adjEDTtoUTC(new Date(raceJSON[0].date))).htmlDateTime,
                    shortDescription: raceJSON[0].shortDescription !== "null" ? raceJSON[0].shortDescription : null,
                    longDescription: raceJSON[0].longDescription !== "null" ? raceJSON[0].longDescription : null,
                    notification: raceJSON[0].notification !== "null" ? raceJSON[0].notification : null,
                    isRegOpen: raceJSON[0].isRegOpen,
                    categories: raceJSON[0].categoryOptions !== "null" ? raceJSON[0].categoryOptions : null,
                    fee: raceJSON[0].fee !== "null" ? raceJSON[0].fee : null,
                    acaDiscount: raceJSON[0].acaDiscount !== "null" ? raceJSON[0].acaDiscount : null,
                    type: raceJSON[0].type !== "null" ? raceJSON[0].type : null,
                    format: raceJSON[0].format !== "null" ? raceJSON[0].format : null,
                    difficulty: raceJSON[0].difficulty !== "null" ? raceJSON[0].difficulty : null,
                    contactEmail: raceJSON[0].contactEmail !== "null" ? raceJSON[0].contactEmail : null,
                    isPublished: raceJSON[0].isPublished !== "null" ? raceJSON[0].isPublished : null,
                })
            }
            catch (err) {
                setFormData({
                    date: null,
                    shortDescription: '',
                    longDescription: '',
                    notification: '',
                    isRegOpen: false,
                    categories: null,
                    fee: null,
                    acaDiscount: null,
                    type: null,
                    format: null,
                    difficulty: null,
                    contactEmail: null,
                    isPublished: null
                })
            }
        }
        getRaceData()
        setLastSaved(null)
    }, [selectedRace])

    async function handleSubmit(e) {
        e.preventDefault();
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        let token = localStorage.getItem('token')
        let updatedRace = await fetch(`${process.env.REACT_APP_SERVER}/races/${raceToFetch}`, {
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
                "categoryOptions": `${formData.categories}`,
                "fee": formData.fee,
                "acaDiscount": formData.acaDiscount,
                "type": formData.type,
                "format": formData.format,
                "difficulty": formData.difficulty,
                "contactEmail": formData.contactEmail,
                "isPublished": formData.isPublished
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
            let isChecked = e.target.checked ? 1 : 0;
            setFormData({
                ...formData,
                [e.target.name]: isChecked
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

    // const test = new DOMParser(formData.longDescription, 'text/html')
    // console.log(test)

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
                        <div className={`input-group ${styles["checkbox-group"]}`}>
                            <label htmlFor="isRegOpen">Is Registration Open?</label>
                            <input type="checkbox" name="isRegOpen" id="isRegOpen" onChange={handleChange} checked={formData.isRegOpen ? true : false} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="type">Race Type</label>
                            <input type="text" name="type" id="type" onChange={handleChange} value={formData.type ? formData.type : ''} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="format">Race Format</label>
                            <input type="text" name="format" id="format" onChange={handleChange} value={formData.format ? formData.format : ''} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="difficulty">Race Difficulty</label>
                            <input type="text" name="difficulty" id="difficulty" onChange={handleChange} value={formData.difficulty ? formData.difficulty : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="categories">Race categories.  MUST BE SEPARATED BY COMMAS</label>
                            <input type="text" name="categories" id="categories" placeholder="EXAMPLE:   Kayak, Canoe, Tandem Canoe, Tandem Kayak" onChange={handleChange} value={formData.categories ? formData.categories : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="shortDescription">Short Description (max 300 characters)</label>
                            <textarea maxLength={300} rows="4" name="shortDescription" id="shortDescription" onChange={handleChange} value={formData.shortDescription ? formData.shortDescription : ''} />
                        </div>
                    </div>
                    <div className={`input-row ${styles["quill-container"]}`}>
                        <div className="input-group">
                            <label htmlFor="longDescription">Long Description</label>
                            <ReactQuill id="longDescription" theme="snow" modules={{ toolbar: toolbarOptions }} value={formData.longDescription} onChange={handleQuillChange} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="fee">Race Entrance Fee</label>
                            <input type="number" name="fee" id="fee" onChange={handleChange} value={formData.fee ? formData.fee : ''} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="acaDiscount">ACA Discount</label>
                            <input type="number" name="acaDiscount" id="acaDiscount" onChange={handleChange} value={formData.acaDiscount ? formData.acaDiscount : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="contactEmail">Race Contact (email)</label>
                            <input type="email" name="contactEmail" id="contactEmail" onChange={handleChange} value={formData.contactEmail ? formData.contactEmail : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="notification">Banner notfication (will appear as a banner at the top of the details section)</label>
                            <input type="text" name="notification" id="notification" placeholder="EXAMPLE:   Only 5 spots left!" onChange={handleChange} value={formData.notification ? formData.notification : ''} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className={`input-group ${styles["checkbox-group"]}`}>
                            <label htmlFor="isPublished">Publish (Make Visible to public on the races page)</label>
                            <input type="checkbox" name="isPublished" id="isPublished" onChange={handleChange} checked={formData.isPublished ? true : false} />
                        </div>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
    else return <Default userInfo={userInfo} />
}