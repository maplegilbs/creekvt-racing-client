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
              <Route path="/raceResults" element={<RaceResults />} />
              <Route path="/registeredRacers" element={<RegisteredRacers />} />
              <Route path="/raceRegistration" element={<RaceRegistration />} />
              <Route path="/raceInfo" element={<RaceInfo />} />
              <Route path="/photoGallery" element={<PhotoGallery />} />
            </Routes>
          </div>
          <Footer />
        </UserContextProvider>
      </Router>
    </div>
  );
}
export default App;
