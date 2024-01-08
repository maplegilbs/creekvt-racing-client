//Components
import AdminNavBar from "../components/adminNav";
import AdminHeader from "../components/adminHeader";
import Athletes from "../components/admin/athletes";
import Default from "../components/admin/default";
import Details from "../components/admin/details";
import Directions from "../components/admin/directions";
import Results from "../components/admin/results";
import Schedule from "../components/admin/schedule";
import FAQ from "../components/admin/faq";
//Contexts
import { UserInfoContext } from "./layout";
//Hooks
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
//Libraries
import { formatDateTime } from "../utils/formatDateTime";
//Styles
import styles from "./adminDashboard.module.css"


export const SelectedRaceContext = createContext()
export const LastSavedContext = createContext();

export async function loader() {
    let loaderInfo = {}
    let raceInfo = await fetch(`${process.env.REACT_APP_SERVER}/races`)
    if (raceInfo.status !== 200) loaderInfo.raceInfo = null;
    else {
        let raceJSON = await raceInfo.json()
        loaderInfo.raceInfo = raceJSON;
    }
    return loaderInfo;
}

export default function AdminDashboard() {
    const userInfo = useContext(UserInfoContext)[0];
    const allRacesInfo = useLoaderData().raceInfo;
    const [infoSectionToEdit, setInfoSectionToEdit] = useState(null)
    const [editComponent, setEditComponent] = useState(<></>)
    const [selectedRace, setSelectedRace] = useState()
    const [selectedRaceYear, setSelectedRaceYear] = useState()
    const [lastSaved, setLastSaved] = useState(null)

    useEffect(() => {
        if (selectedRace) {
            let selectedRaceInfo = allRacesInfo.filter(race => race.name === selectedRace)[0]
            let selectedRaceRawDate = selectedRaceInfo.date;
            let selectedRaceDateString = `${formatDateTime(selectedRaceRawDate).year}`
            setSelectedRaceYear(selectedRaceDateString)
        }
    }, [selectedRace])

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
                setEditComponent(<Results />);
                break;
            case "faqs":
                setEditComponent(<FAQ />);
                break;
            default:
                setEditComponent(<Default userInfo={userInfo} />);

        }
    }, [infoSectionToEdit])


    return (
        <div className={`${styles["dashboard-wrapper"]}`}>
                <SelectedRaceContext.Provider value={[selectedRace, setSelectedRace, selectedRaceYear, setSelectedRaceYear]}>
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
        </div>
    )
}