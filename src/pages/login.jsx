//Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
//Styles
import styles from "./login.module.css"

export function loader() {
    return "Hello world";
}

export default function AdminLogin() {
    const [loginData, setLoginData] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isLoggedIn) navigate('/races/adminDashboard')
    },[isLoggedIn])

    async function adminLogin(e) {
        e.preventDefault();
        let loginResponse = await fetch(`http://localhost:3000/users/login`, {
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
        }
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
                <h4 className={`section-heading`}>Organizer Login</h4>
                <form onSubmit={adminLogin}>
                    <div className={`input-group`}>
                        <label htmlFor="userName">Username</label>
                        <input onChange={handleChange} type="text" name="userName" id="userName" />
                    </div>
                    <div className={`input-group`}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} type="password" name="password" id="password" />
                    </div>
                    <button className={`button button--medium`} type="submit">Login</button>
                </form>
            </div>
        </>
    )
}