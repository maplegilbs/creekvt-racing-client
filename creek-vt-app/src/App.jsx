import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar-section/NavigationBar";
import PhotoGallery from "./components/photo-gal-section/PhotoGallery";
import Footer from "./components/footer-section/footer";
import UserContextProvider from "./components/store/UserContext";
import Signin from "./components/auth/signin";
import RaceResults from "./components/page-section/raceResults";
import RegisteredRacers from "./components/page-section/registeredRacers";
import RaceRegistration from "./components/page-section/raceRegistration";
import RaceInfo from "./components/page-section/raceInfo";
import RacesMain from "./components/page-section/racesMain";
import Register from "./components/auth/register";
import AdminDashboard from "./components/page-section/adminDashboard";
import SuccessPage from "./components/page-section/successPage";
import ContactUs from "./components/page-section/contactUs";
import CourseDetails from "./components/page-section/courseDetails";
import RaceMap from "./components/page-section/raceMap";

function App({ Component, pageProps }) {
  const [token, setToken] = useState("");

  function updateToken(newToken) {
    localStorage.removeItem("token");
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-between">
      <Router>
        <UserContextProvider>
          <NavigationBar
            setToken={setToken}
            token={token}
            updateToken={updateToken}
          />
          <div>
            <Routes>
              <Route path="/" element={<RacesMain />} />
              <Route path="/racesMain" element={<RacesMain />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/raceResults/:raceName" element={<RaceResults />} />
              <Route
                path="/registeredRacers/:raceid/:raceYear/:raceName"
                element={<RegisteredRacers />}
              />
              <Route path="/raceRegistration/:raceid" element={<RaceRegistration />} />
              <Route
                path="/raceInfo/:raceYear/:raceLocation/:raceid/:raceName/:regOpen"
                element={<RaceInfo />}
              />
            
              <Route
                path="/raceInfo/:raceYear/:raceLocation/:raceid/:raceName/courseDetails"
                element={<CourseDetails />}
              />
              <Route path="/map.html" />
              <Route path="/map/:raceName" element={<RaceMap />} />
              <Route
                path="/photoGallery/:raceName/:year"
                element={<PhotoGallery />}
              />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/successPage" element={<SuccessPage />} />
              <Route path="/contact-us/:raceName" element={<ContactUs />} />
              {/* add route for contact */}
              <Route
                path="/courseDetails/:raceName"
                element={<CourseDetails />}
              />
            </Routes>
          </div>
        </UserContextProvider>
          <Footer />
      </Router>
    </div>
  );
}
export default App;
