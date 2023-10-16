//Components
import AdminNavBar from "../components/adminNav";
import AdminHeader from "../components/adminHeader";
//Hooks
import { useState } from "react";
import { useLoaderData } from "react-router";
//Styles
import styles from "./adminDashboard.module.css"


export async function loader() {
    let token = localStorage.getItem('token');
    let currentUser = await fetch("http://localhost:3000/users/userInfo", {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (currentUser.status !== 200) return null;
    else {
        let currentUserInfo = await currentUser.json();
        console.log(currentUserInfo)
        return currentUserInfo
    }
}


export default function AdminDashboard() {
    const userInfo = useLoaderData();
    // const [isAuthUser, setIsAuthUser] = useState(false)
    return (
        <div className={`${styles["dashboard-wrapper"]}`}>
            
            <header className={`${styles["content-header"]}`}>
            {userInfo && <AdminHeader userInfo={userInfo} editSelection={null} /> }
            </header>
            <nav className={`${styles["sidebar-nav"]}`}>
                <AdminNavBar availableRaces={userInfo.races} />
            </nav>
            <main className={`${styles["content-wrapper"]}`}>
                {
                    !userInfo ?
                        <div>You do not have correct permissions to edit this race</div>
                        :
                        <>
                            Main
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </>
                }
            </main>
        </div>
    )
}