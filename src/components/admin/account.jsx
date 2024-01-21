//Components
import Loader from '../loader'
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
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(null)
    let userInfo = useContext(UserInfoContext)[0]
    console.log(formData, userInfo, updateStatus)

    //Update the schedule data when an input value field is being changed
    function handleChange(e) {
        if (e.target.name === 'newPass' && formData.newPass2) {
            setPasswordMatch(e.target.value === formData.newPass2)
        }
        if (e.target.name === 'newPass2' && formData.newPass) {
            setPasswordMatch(e.target.value === formData.newPass)
        }
        setFormData(prev => {
            let updatedFormData = {
                ...prev,
                [e.target.name]: e.target.value
            }
            return updatedFormData
        })
    }

    function toggleShowPasswordForm() {
        setShowPasswordForm(prev => !prev)
        clearForm()
    }

    function clearForm() {
        setFormData({
            oldPass: '',
            newPass: '',
            newPass2: ''
        })
        setUpdateStatus(null)
    }

    async function handleSubmit() {
        try {
            setUpdateStatus('pending')
            let token = localStorage.getItem('token')
            let updateResponse = await fetch(`${process.env.REACT_APP_SERVER}/users/updatePassword`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: formData.oldPass,
                    newPassword: formData.newPass
                })
            });
            console.log(updateResponse)
            if (updateResponse.status >= 200 && updateResponse.status < 300) {
                setUpdateStatus('success')
            }
            else {
                setUpdateStatus('failed')
            }
        } catch (error) {
            console.error(error)
        }
    }

    console.log(passwordMatch)

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
            {!showPasswordForm &&
                <button style={{ marginLeft: "0" }} type="button" className='button button--medium' onClick={() => toggleShowPasswordForm()}>Update Password</button>
            }
            {showPasswordForm &&
                <>
                    <form style={{ position: "relative" }} className={`${styles["password-form"]}`}>
                        {updateStatus === 'pending' &&
                            <div className={`${styles["password-form__overlay-container"]}`}><Loader loader_text={"Updating Password"} /></div>
                        }
                        {updateStatus === 'failed' &&
                            <div className={`${styles["password-form__overlay-container"]}`}>
                                <p>Password Update Failed - Double Check Your Current Password is Correct</p>
                                <a className='button button--medium' onClick={() => clearForm()}>Close</a>
                            </div>
                        }
                        {
                            updateStatus === 'success' &&
                            <div className={`${styles["password-form__overlay-container"]}`}>
                                <p>Password Updated Successfully</p>
                                <a className='button button--medium' onClick={() => clearForm()}>Close</a>
                            </div>

                        }
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
                            <input type="password" name="newPass2" id="newPass2" onChange={(e) => {
                                handleChange(e)
                            }} value={formData.newPass2} />
                            {(!passwordMatch && formData.newPass) &&
                                <p className={`${styles["password-match--alert"]}`}>Passwords do not match.  Please confirm your new password.</p>
                            }
                        </div>
                        <button type="button" style={{ display: "inline-flex", margin: ".25rem 1rem" }} className={`button button--medium ${!passwordMatch ? 'disabled' : ''}`} onClick={() => handleSubmit()} disabled={!passwordMatch ? true : false}>Submit</button>
                        <button type="button" style={{ display: "inline-flex", margin: ".25rem 1rem" }} className={`button button--medium`} onClick={() => toggleShowPasswordForm()}>Cancel</button>
                    </form>
                </>
            }
        </div>
    )
}
