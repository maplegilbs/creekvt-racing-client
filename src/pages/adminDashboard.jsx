//Components
import AdminNavBar from "../components/adminNav";
import AdminHeader from "../components/adminHeader";
import Details from "../components/admin/details";
//Contexts
import { useContext, createContext } from "react";
//Hooks
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
//Styles
import styles from "./adminDashboard.module.css"


export const SelectedRaceContext = createContext()

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
    const [infoSectionToEdit, setInfoSectionToEdit] = useState(null)
    const [editComponent, setEditComponent] = useState(<>Hi</>)
    const [selectedRace, setSelectedRace] = useState()

    useEffect(() => {
        switch (infoSectionToEdit) {
            case "details":
                setEditComponent(<Details racename={'Race Name'} />);
                break;
            case "schedule":
                setEditComponent(<div>Schedule</div>);
                break;
            case "athletes":
                setEditComponent(<div>Athletes</div>);
                break;
            case "directions":
                setEditComponent(<div>Directions</div>);
                break;
            case "results":
                setEditComponent(<div>Results</div>);
                break;
            case "faqs":
                setEditComponent(<div>FAQS</div>);
                break;
            default:
                setEditComponent(<Details racename={'Race Name'} />);

        }
    }, [infoSectionToEdit])


    return (
        <div className={`${styles["dashboard-wrapper"]}`}>

            <SelectedRaceContext.Provider value={[selectedRace, setSelectedRace]}>
                <header className={`${styles["content-header"]}`}>
                    {userInfo && <AdminHeader userInfo={userInfo} editSelection={null} />}
                </header>
                <nav className={`${styles["sidebar-nav"]}`}>
                    <AdminNavBar availableRaces={userInfo.races} infoSectionToEdit={infoSectionToEdit} setInfoSectionToEdit={setInfoSectionToEdit} />
                </nav>
                <main className={`${styles["content-wrapper"]}`}>
                    {
                        !userInfo ?
                            <div>You do not have correct permissions to edit this race</div>
                            :
                            <>
                                {editComponent}
                            </>
                    }
                </main>
            </SelectedRaceContext.Provider>
        </div>
    )
}