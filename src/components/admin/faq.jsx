//Components
import DeleteConfirmation from "./deleteConfirmation.jsx";
//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard"
import { UserInfoContext } from "../../pages/layout.jsx";
//Hooks
import { useContext, useEffect, useState } from "react"
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleMinus, faCirclePlus, faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
//Libraries
import { v4 as uuidv4 } from 'uuid'
//Styles
import styles from "./faq.module.css"
import adminStyles from "./adminGlobalStyles.module.css"

function FAQRow({ itemData, editItem, askDeleteItem }) {
    let itemID = itemData.id
    return (
        <div className={`${adminStyles["info-row"]} ${styles["faq-row"]}`}>
            <div className={`${adminStyles["row-icons"]}`}>
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => editItem(itemID)} icon={faPenToSquare} style={{ color: "#000000", }} />
                <FontAwesomeIcon className={`${adminStyles["action-icon"]}`} onClick={() => askDeleteItem(itemID)} icon={faCircleMinus} style={{ color: "#af2323", }} />
            </div>
            <div className={`${styles["question-container"]}`}>
                <p>{itemData.question}</p>
            </div>
            <div className={`${styles["question-container"]}`}>
                <p>{itemData.answer}</p>
            </div>
        </div>
    )

}

function EditFAQRow({ itemData, handleChange, saveItem, cancelAction }) {
    let itemID = itemData.id

    return (
        <>
            <div className={`${adminStyles["info-row"]} ${styles["edit-row"]} ${adminStyles["edit-row"]}`}>
                <div className="input-row">
                    <div className={`input-group`}>
                        <label htmlFor={`faq-question-${itemID}`}>Question</label>
                        <textarea rows={6} name="question" id={`faq-question-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.question} />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor={`faq-answer-${itemID}`}>Answer</label>
                        <textarea rows={6} name="answer" id={`faq-answer-${itemID}`} onChange={(e) => handleChange(e, itemID)} value={itemData.answer} />
                    </div>
                </div>
                <div className={`${adminStyles["button-row"]} ${adminStyles["final-row"]} `}>
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

export default function FAQ() {
    const selectedRace = useContext(SelectedRaceContext)[0]; //Name of race with spaces i.e. "Test Race"
    const [faqData, setFaqData] = useState(null)
    const [selectedItemID, setSelectedItemID] = useState(null);  //The ID of a selected schedule item  
    const [selectedAction, setSelectedAction] = useState(null);  //Null, 'delete' or 'edit' to be used to determine if Edit components allowing for input should be displayed or not

    //Set our initial state based on any changes in the selected race
    useEffect(() => {
        getFAQData()
    }, [selectedRace])


    async function getFAQData() {
        try {
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let faqResponse = await fetch(`${process.env.REACT_APP_SERVER}/faq/${raceToFetch}`)
            let faqJSON = await faqResponse.json();
            if (faqResponse.status === 200) {
                setFaqData(faqJSON)
            }
            else throw new Error(faqJSON.message)
        } catch (error) {
            console.log(error)
            setFaqData([])
        }
    }

    //Add a blank item with corresponding race name and id to the DB and repopulate the faqData state
    async function addItem() {
        const token = localStorage.getItem('token')
        let tableInfoResponse = await fetch(`${process.env.REACT_APP_SERVER}/faq/tableInfo`, {
            headers: { authorization: `Bearer ${token}` }
        })
        let tableInfo = await tableInfoResponse.json()
        const blankItem = { raceName: selectedRace };
        tableInfo.forEach(column => {
            if (column.Field !== 'id' && column.Field !== 'raceName') blankItem[column.Field] = null
        })
        let newID = uuidv4();
        setFaqData(prev => {
            let updatedFAQ = prev.concat({ ...blankItem, id: newID })
            return updatedFAQ
        })
        setSelectedItemID(newID)
        setSelectedAction('edit')
    }

    //Set the selected action state to edit and the selected item id to the id of the item selected -- this will render a component with input fields for the selected item
    function editItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('edit')
    }

    //Action for when cancel button is selected
    function cancelAction() {
        setSelectedItemID(null);
        setSelectedAction(null);
    }
    //Set the selected action state to delete and the selected item id to the id of the item selected -- this will render the delete confirmation component with the ability to confirm or cancel deletion
    function askDeleteItem(itemID) {
        setSelectedItemID(itemID)
        setSelectedAction('delete')
    }

    //Display a modal to ask user to confirm deleting the item - if confirmed delete item from the database
    async function confirmDeleteItem(itemID) {
        try {
            const token = localStorage.getItem("token");
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            await fetch(`${process.env.REACT_APP_SERVER}/faq/${raceToFetch}/${itemID}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            })
            getFAQData();
        }
        catch (err) {
            console.log(err)
        }
        setSelectedItemID(null)
        setSelectedAction(null)
    }

    //Save item - whether item is newly created or updated
    //If itemID is a string it means it came from UUID and is a newly created item, if its a number it came from a call to the DB and means it is an item being updated
    async function saveItem(itemID) {
        try {
            let itemDataToSave = faqData.find(item => item.id === itemID);
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            const token = localStorage.getItem("token")
            delete itemDataToSave.id
            //if item is being updated patch request
            if (typeof itemID === 'number') {
                await fetch(`${process.env.REACT_APP_SERVER}/faq/${raceToFetch}/${itemID}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemDataToSave)
                })
            }
            //if item is being saved for the first time post request
            else if (typeof itemID === 'string') {
                await fetch(`${process.env.REACT_APP_SERVER}/faq/${raceToFetch}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemDataToSave)
                })
            }
            setSelectedItemID(null)
            setSelectedAction(null)
        } catch (error) {
            console.error(error)
        }
    }


    //Update the faq data when an input value field is being changed
    function handleChange(e, itemID) {
        setFaqData(prev => {
            let updatedFAQ = prev.map(faqItem => {
                if (faqItem.id !== itemID) return faqItem
                else {
                    let updatedScheduleItem = {
                        ...faqItem,
                        [e.target.name]: e.target.value
                    }
                    return updatedScheduleItem
                }
            })
            return updatedFAQ
        })
    }

    return (
        <div className={`${adminStyles["info__container"]} ${styles["faq__container"]}`}>
            <h2 className="section-heading">{selectedRace ? `${selectedRace} FAQ` : `Select a race to edit`}</h2>
            <div className={`${adminStyles["info-headers"]} ${styles['faq-headers']}`}>
                <h6></h6><h6>Question</h6><h6>Answer</h6>
            </div>
            {(faqData && !selectedAction) &&
                faqData.map(faqItem => <FAQRow key={faqItem.id} itemData={faqItem} editItem={editItem} askDeleteItem={askDeleteItem} />)
            }
            {selectedAction === 'edit' &&
                faqData.map(faqItem => {
                    return selectedItemID === faqItem.id ?
                        <EditFAQRow key={faqItem.id} itemData={faqItem} handleChange={handleChange} saveItem={saveItem} cancelAction={cancelAction} />
                        :
                        <FAQRow key={faqItem.id} itemData={faqItem} editItem={editItem} askDeleteItem={askDeleteItem} />
                })
            }
            {selectedAction === 'delete' &&
                <>
                    {faqData.map(faqItem => <FAQRow key={faqItem.id} itemData={faqItem} editItem={editItem} askDeleteItem={askDeleteItem} />)}
                    <DeleteConfirmation
                        itemID={selectedItemID}
                        setSelectedItemID={setSelectedItemID}
                        setSelectedAction={setSelectedAction}
                        confirmDeleteItem={confirmDeleteItem}
                        cancelAction={cancelAction}
                    />
                </>
            }
            {selectedAction !== 'edit' &&
                <button className={`${"button button--medium"} ${adminStyles["icon__button"]}`} onClick={() => addItem()}>
                    <FontAwesomeIcon className={`${styles["action-icon"]}`} icon={faCirclePlus} style={{ color: "#000000", }} /> &nbsp;&nbsp;Add FAQ
                </button>
            }
        </div>
    )
}