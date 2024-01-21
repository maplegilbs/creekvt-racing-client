//Components
import Loader from "../components/loader";
//Contexts
import { UserInfoContext } from "./layout";
//Hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
//Libraries
import { pause } from "../utils/pause";
//Styles
import styles from "./login.module.css"


export default function AdminLogin() {
    const userInfo = useContext(UserInfoContext)[0];
    const setUserInfo = useContext(UserInfoContext)[1]
    const [loginData, setLoginData] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) navigate('/races/adminDashboard')
    }, [])

    useEffect(() => {
        const getUserDataAndNavigate = async () => {
            if (isLoggedIn) {
                let token = localStorage.getItem('token')
                let currentUser = await fetch(`${process.env.REACT_APP_SERVER}/users/userInfo`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                //need to give error notice here
                if (currentUser.status !== 200) setUserInfo(null);
                else {
                    let currentUserInfo = await currentUser.json();
                    setUserInfo(currentUserInfo)
                    navigate('/races/adminDashboard')
                }
            }
        }
        getUserDataAndNavigate()
    }, [isLoggedIn])


    async function adminLogin(e) {
        e.preventDefault();
        setLoginStatus('pending')
        await pause(3000)
        let loginResponse = await fetch(`${process.env.REACT_APP_SERVER}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        if (loginResponse.status === 200) {
            let loginInfo = await loginResponse.json();
            localStorage.setItem("token", loginInfo)
            setIsLoggedIn(true);
            setLoginStatus('success')
        }
        else {
            setLoginStatus('failed')
        }
    }

    function clearForm() {
        setLoginData({})
        setLoginStatus(null)
    }

    function handleChange(e) {
        setLoginData(
            prev => {
                prev[e.target.name] = e.target.value
                return prev
            })
    }

    return (
        <>
            <div className={`${styles["login-form__container"]}`}>
                    {loginStatus === 'pending' &&
                        <div className={`${styles["login-form__overlay-container"]}`}><Loader loader_text={"Logging In"} /></div>
                    }
                    {loginStatus === 'failed' &&
                        <div className={`${styles["login-form__overlay-container"]}`}>
                            <p>Login Failed - Double Check Username & Password</p>
                            <a className='button button--medium' onClick={() => clearForm()}>Close</a>
                        </div>
                    }
                    {loginStatus === 'success' &&
                        <div className={`${styles["login-form__overlay-container"]}`}>
                            <p>Logged In</p>
                            <a className='button button--medium' onClick={() => {
                                clearForm();
                            }}>Close</a>
                        </div>

                    }
                <h4 className={`section-heading`}>Organizer Login</h4>
                <form style={{ position: "relative" }} onSubmit={adminLogin}>
                    <div className={`input-group`}>
                        <label htmlFor="userName">Username</label>
                        <input onChange={handleChange} type="text" name="userName" id="userName" />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} type="password" name="password" id="password" />
                    </div>
                    <button className={`button button--medium ${styles["login-button"]}`} type="submit">Login</button>
                </form>
            </div>
        </>
    )
}