//Components
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"
//Contexts
//Hooks
import { useContext, createContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

export async function loader() {
    let token = localStorage.getItem('token')
    let currentUser = await fetch("http://localhost:3000/users/userInfo", {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (currentUser.status !== 200) return null;
    else {
        let currentUserInfo = await currentUser.json();
        return currentUserInfo
    }
}

export const UserInfoContext = createContext();

export default function Layout() {
    const [userInfo, setUserInfo] = useState(useLoaderData())

    return (
        <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
                <Header />
                <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </UserInfoContext.Provider>
    )
}