//Components
import AdminNavBar from "../components/adminNav";
import AdminHeader from "../components/adminHeader";
import Athletes from "../components/admin/athletes";
import Default from "../components/admin/default";
import Details from "../components/admin/details";
import Directions from "../components/admin/directions";
import Schedule from "../components/admin/schedule";
//Contexts
import { useContext, createContext } from "react";
//Hooks
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
//Styles
import styles from "./adminDashboard.module.css"


export const SelectedRaceContext = createContext()
export const LastSavedContext = createContext();
export const UserInfoContext = createContext();

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
        return currentUserInfo
    }
}

export default function AdminDashboard() {
    const userInfo = useLoaderData();
    const [infoSectionToEdit, setInfoSectionToEdit] = useState(null)
    const [editComponent, setEditComponent] = useState(<></>)
    const [selectedRace, setSelectedRace] = useState()
    const [lastSaved, setLastSaved] = useState(null)

    useEffect(() => {
        switch (infoSectionToEdit) {
            case "details":
                setEditComponent(<Details />);
                break;
            case "schedule":
                setEditComponent(<Schedule />);
                break;
            case "athletes":
                setEditComponent(<Athletes />);
                break;
            case "directions":
                setEditComponent(<Directions />);
                break;
            case "results":
                setEditComponent(<div>Results</div>);
                break;
            case "faqs":
                setEditComponent(<div>FAQS</div>);
                break;
            default:
                setEditComponent(<Default userInfo={userInfo} />);

        }
    }, [infoSectionToEdit])


    return (
        <div className={`${styles["dashboard-wrapper"]}`}>
            <UserInfoContext.Provider value={userInfo}>
                <SelectedRaceContext.Provider value={[selectedRace, setSelectedRace]}>
                    <LastSavedContext.Provider value={[lastSaved, setLastSaved]}>
                        <header className={`${styles["content-header"]}`}>
                            {userInfo && <AdminHeader userInfo={userInfo} editSelection={null} />}
                        </header>
                        <nav className={`${styles["sidebar-nav"]}`}>
                            {userInfo &&
                                <AdminNavBar availableRaces={userInfo.races} infoSectionToEdit={infoSectionToEdit} setInfoSectionToEdit={setInfoSectionToEdit} />
                            }
                        </nav>
                        <main className={`${styles["content-wrapper"]}`}>
                            {
                                !userInfo ?
                                    <div className={`${styles["unauth-overlay"]}`}>
                                        <h3>You do not have the correct permissions to edit races</h3>
                                        <a href="/races/adminLogin" className="button button--medium">Organizer Login</a>
                                        <a href="/races" className="button button--medium">Back to Races</a>
                                    </div>
                                    :
                                    <>
                                        {editComponent}
                                    </>
                            }
                        </main>
                    </LastSavedContext.Provider>
                </SelectedRaceContext.Provider>
            </UserInfoContext.Provider>
        </div>
    )
}