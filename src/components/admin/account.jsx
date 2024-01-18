//Components
//Contexts
import { UserInfoContext } from '../../pages/layout'
//Hooks
import { useContext, useState } from 'react'
//Libraries
//Styles
import styles from './account.module.css'
import adminStyles from './adminGlobalStyles.module.css'

export default function Account() {
    const [formData, setFormData] = useState({})
    const [showPasswordFrom, setShowPasswordFrom] = useState(false)
    let userInfo = useContext(UserInfoContext)[0]
    console.log(formData, userInfo)

    //Update the schedule data when an input value field is being changed
    function handleChange(e) {
        setFormData(prev => {
            let updatedFormData = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return updatedFormData
        })
    }

    function toggleShowPasswordForm() {
        setShowPasswordFrom(prev => !prev)
    }

    function handleSubmit() {

    }

    return (
        <div className={`${adminStyles["info__container"]}`}>
            <h2 className="section-heading">Account Info</h2>
            <br />
            <p><strong>User:</strong> {userInfo.name}</p>
            <br />
            <p><strong>Race Permissions:</strong></p>
            <ul>
                {userInfo.races.map(race => <li>{race}</li>)}
            </ul>
            <br />
            <br />
            {!showPasswordFrom &&
                <button style={{ marginLeft: "0" }} type="button" className='button button--medium' onClick={() => toggleShowPasswordForm()}>Update Password</button>
            }
            {showPasswordFrom &&
                <form className={`${styles["password-form"]}`}>
                    <div className={`input-group`}>
                        <label htmlFor="oldPass">Enter Current Password</label>
                        <input type="password" name="oldPass" id="oldPass" onChange={(e) => handleChange(e)} value={formData.oldPass} />
                    </div>

                    <div className={`input-group`}>
                        <label htmlFor="newPass">Enter New Password</label>
                        <input type="password" name="newPass" id="newPass" onChange={(e) => handleChange(e)} value={formData.newPass} />
                    </div>

                    <div className={`input-group`}>
                        <label htmlFor="newPass2">Confirm New Password</label>
                        <input type="password" name="newPass2" id="newPass2" onChange={(e) => handleChange(e)} value={formData.newPass2} />
                    </div>
                    <button type="button" style={{ display: "inline-flex", margin: ".25rem 1rem" }} className='button button--medium'>Submit</button>
                    <button type="button" style={{ display: "inline-flex", margin: ".25rem 1rem" }} className='button button--medium' onClick={() => toggleShowPasswordForm()}>Cancel</button>
                </form>
            }
        </div>
    )
}
