//Vomponents
import Default from "./default"
import DeleteConfirmation from "./deleteConfirmation"
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard"
import { UserInfoContext } from "../../pages/layout"
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faPenToSquare, faCircleMinus, faXmark, faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { faImage, faSquareCheck } from "@fortawesome/free-regular-svg-icons"
//Libraries
import { v4 as uuidv4 } from 'uuid'
//Styles
import styles from "./sponsors.module.css"
import adminStyles from "./adminGlobalStyles.module.css"

function SponsorRow({ itemID, itemData, askDeleteItem, editItem }) {
    return (
        <div className={`${adminStyles["info-row"]} ${styles["sponsor-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <p>{itemData.name ? itemData.name : ''}</p>
            <p>{itemData.tier ? itemData.tier.split('')[0].toUpperCase() + itemData.tier.substring(1).toLowerCase() : ''}</p>
            <p>{itemData.isActive ?
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faSquareCheck} style={{ color: "#016014", }} />
                :
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faXmark} style={{ color: "#af2323", }} />
            }
            </p>
            <p>{itemData.linkURL ? itemData.linkURL : ''}</p>
            <div>
                {itemData.imgURL ?
                    <img className={`${styles["image-thumbnail"]}`} src={`${itemData.imgURL}`} />
                    :
                    <FontAwesomeIcon icon={faImage} size={'2xl'} />
                }
            </div>
        </div>
    )
}

function EditSponsorRow({ itemID, itemData, handleChange, saveItem, cancelAction }) {
    return (
        <>
            <div className={`${adminStyles["info-row"]} ${styles["edit-row"]} ${adminStyles["edit-row"]}`}>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`sponsor-name-${itemID}`}>Name</label>
                        <input type="text" name="name" id={`sponsor-name-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.name} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`sponsor-tier-${itemID}`}>Tier</label>
                        <select name="tier" id={`tier-${itemID}`} onChange={(e) => handleChange(e, itemID)}>
                            <option> -- </option>
                            <option value="primary" selected={(itemData.tier && itemData.tier.toLowerCase() === 'primary') ? "selected" : ""}>Primary</option>
                            <option value="secondary" selected={(itemData.tier && itemData.tier.toLowerCase() === 'secondary') ? "selected" : ""}>Secondary</option>
                        </select>
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`sponsor-linkURL-${itemID}`}>Link URL</label>
                        <input type="text" name="linkURL" id={`sponsor-linkURL-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.linkURL} />
                    </div>
                </div>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label style={{ alignSelf: "center" }} htmlFor={`sponsor-isActive-${itemID}`}>Is Active?</label>
                        <input style={{ alignSelf: "center" }} type="checkbox" name="isActive" id={`sponsor-isActive-${itemID}`} onChange={(e) => handleChange(e, itemID)} checked={itemData.isActive ? true : false} value={itemData.isActive} />
                    </div>
                </div>
                <div className={`input-row ${styles["second-row"]}`}>
                    <div className={`input-group`}>
                        <label htmlFor={`sponsor-isActive-${itemID}`}>{itemData.imgURL ? 'Change Image' : 'Add Image'}</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/png, image/jpeg"
                            capture="environment"
                            onChange={(e) => { handleChange(e, itemID) }}
                        />
                    </div>
                    <div className={`input-group`}>
                        <img className={`${styles["image-thumbnail"]}`} src={itemData.image ? URL.createObjectURL(itemData.image) : itemData.imgURL ? itemData.imgURL : ''} />
                    </div>
                </div>
                <div className={`${adminStyles["button-row"]} ${styles["third-row"]} `}>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => saveItem(itemID)}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faFloppyDisk} style={{ color: "#016014", }} /> &nbsp;&nbsp;Save
                    </button>
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={cancelAction}>
                        <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} icon={faCircleXmark} style={{ color: "#af2323", }} /> &nbsp;&nbsp;Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default function Sponsors() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const userInfo = useContext(UserInfoContext)[0] //Logged in user info contianed in token
    const [sponsorData, setSponsorData] = useState(null);  //Array of objectes each containing data about specific sponsor
    const [selectedItemID, setSelectedItemID] = useState(null);  //The ID of a selected sponsor item  
    const [selectedAction, setSelectedAction] = useState(null);  //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getSponsorData()
    }, [selectedRace])

    //Basic fetch of sponsor data
    async function getSponsorData() {
        try {
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let response = await fetch(`${process.env.REACT_APP_SERVER}/sponsors/${raceToFetch}`)
            let responseJSON = await response.json();
            let cleanedResponseJSON = responseJSON.map(item => {
                for (let propertyName of Object.keys(item)) {
                    if (item[propertyName] === 'null') item[propertyName] = null
                }
                return item;
            })
            setSponsorData(cleanedResponseJSON)
        }
        catch (err) {
            console.error(err)
            setSponsorData([])
        }
    }


    //Add a blank item with corresponding race name and id to the DB and repopulate the faqData state
    async function addItem() {
        try {
            const token = localStorage.getItem('token')
            let tableInfoResponse = await fetch(`${process.env.REACT_APP_SERVER}/sponsors/tableInfo`, {
                headers: { authorization: `Bearer ${token}` }
            })
            let tableInfo = await tableInfoResponse.json()
            const blankItem = { raceName: selectedRace };
            tableInfo.forEach(column => {
                if (column.Field !== 'id' && column.Field !== 'raceName') blankItem[column.Field] = null
            })
            let newID = uuidv4()
            setSponsorData(prev => {
                let updatedSponsor = prev.concat({ ...blankItem, id: newID })
                return updatedSponsor
            })
            setSelectedItemID(newID)
            setSelectedAction('edit')
        } catch (error) {
            console.error(error)
        }

    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }

    //Action for when cancel button is selected
    async function cancelAction() {
        await getSponsorData();
        setSelectedItemID(null);
        setSelectedAction(null);
    }

    //Set the selected action state to delete and the selected item id to the id of the item selected -- this will render the delete confirmation component with the ability to confirm or cancel deletion
    function askDeleteItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('delete')
    }

    //Save item - whether item is newly created or updated
    //If itemID is a string it means it came from UUID and is a newly created item, if its a number it came from a call to the DB and means it is an item being updated
    async function saveItem(itemID) {
        let itemDataToSave = sponsorData.find(item => item.id === itemID);
        const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
        const token = localStorage.getItem("token")
        let sponsorFormData = new FormData();
        for (let itemProp in itemDataToSave) {
            sponsorFormData.append(itemProp, itemDataToSave[itemProp])
        }
        sponsorFormData.delete('id')
        //if item is being updated patch request
        if (typeof itemID === 'number') {
            await fetch(`${process.env.REACT_APP_SERVER}/sponsors/${raceToFetch}/${itemID}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: sponsorFormData
            })
        }
        //if item is being saved for the first time post request
        else if (typeof itemID === 'string') {
            await fetch(`${process.env.REACT_APP_SERVER}/sponsors/${raceToFetch}`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: sponsorFormData
            })
        }
        getSponsorData()
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    //Update the schedule data when an input value field is being changed
    function handleChange(e, itemID) {
        setSponsorData(prev => {
            let updatedSponsors = prev.map(sponsor => {
                if (sponsor.id !== itemID) return sponsor
                else {
                    if (e.target.type === "checkbox") {
                        let isChecked = e.target.checked ? 1 : 0;
                        let updatedSponsor = {
                            ...sponsor,
                            [e.target.name]: isChecked
                        }
                        return updatedSponsor
                    }
                    else if (e.target.type === "file") {
                        let updatedSponsor = {
                            ...sponsor,
                            imgURL: `https://creekvt.com/races/sponsorLogos/${e.target.files[0].name}`,
                            [e.target.name]: e.target.files[0]
                        }
                        return updatedSponsor
                    }
                    else {
                        let updatedSponsor = {
                            ...sponsor,
                            [e.target.name]: e.target.value
                        }
                        return updatedSponsor
                    }
                }
            })
            return updatedSponsors
        })
    }

    //Display a modal to ask user to confirm deleting the item - if confirmed delete item from the database
    async function confirmDeleteItem(itemID) {
        try {
            const token = localStorage.getItem("token");
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            const deletedItem = await fetch(`${process.env.REACT_APP_SERVER}/sponsors/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            const deletedItemInfo = await deletedItem.json();
            getSponsorData();
        }
        catch (err) {
            console.log(err)
        }
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    if (selectedRace && sponsorData) {
        return (
            <div className={`${adminStyles["info__container"]}`}>
                <h2 className="section-heading">{selectedRace ? `${selectedRace} Sponsors` : `Select a race to edit`}</h2>
                <div className={`${adminStyles["info-headers"]} ${styles['sponsor-headers']}`}>
                    <h6></h6><h6>Name</h6><h6>Tier</h6><h6>Active</h6><h6>Link URL</h6><h6>Image</h6>
                </div>
                {selectedAction === 'delete' &&
                    <>
                        {sponsorData.map(sponsor => <SponsorRow key={sponsor.id} itemID={sponsor.id} itemData={sponsor} editItem={editItem} askDeleteItem={askDeleteItem} />)}
                        <DeleteConfirmation
                            itemID={selectedItemID}
                            setSelectedItemID={setSelectedItemID}
                            setSelectedAction={setSelectedAction}
                            confirmDeleteItem={confirmDeleteItem}
                            cancelAction={cancelAction}
                        />
                    </>
                }
                {!selectedAction &&
                    sponsorData.map(sponsor => <SponsorRow key={sponsor.id} itemID={sponsor.id} itemData={sponsor} editItem={editItem} askDeleteItem={askDeleteItem} />)
                }
                {selectedAction === 'edit' &&
                    sponsorData.map(sponsor => {
                        return selectedItemID === sponsor.id ?
                            <EditSponsorRow key={sponsor.id} itemID={sponsor.id} itemData={sponsor} handleChange={handleChange} saveItem={saveItem} cancelAction={cancelAction} />
                            :
                            <SponsorRow key={sponsor.id} itemID={sponsor.id} itemData={sponsor} askDeleteItem={askDeleteItem} editItem={editItem} />
                    })
                }
                {selectedAction !== 'edit' &&
                    <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => addItem()}>
                        <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add Sponsor
                    </button>
                }
            </div>
        )
    }
    else return <Default userInfo={userInfo} />
}