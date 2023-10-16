//Components
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"

export default function Layout() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}>
            <Header />
            <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}