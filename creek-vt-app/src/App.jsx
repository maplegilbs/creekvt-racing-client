import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar-section/NavigationBar";

import PhotoGallery from "./components/photo-gal-section/PhotoGallery";
import Footer from "./components/footer-section/footer";
import PageControl from "./components/page-section/pageControl";
import jwtDecode from "jwt-decode";


function App({Component, pageProps}) {
  const [token, setToken] = useState("");
<<<<<<< HEAD
  const [showRacesMain, setShowRacesMain] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRaceRegistration, setShowRaceRegistration] = useState(false);
  const [showraceResults, setShowRaceResults] = useState(false);
  const [showregisteredRacers, setShowRegisteredRacers] = useState(false);
  const [showraceInfo, setShowRaceInfo] = useState(true);
=======

  const [showRacesMain, setShowRacesMain] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRaceRegistration, setShowRaceRegistration] = useState(false);
  const [showRaceResults, setShowRaceResults] = useState(false);
  const [showRegisteredRacers, setShowRegisteredRacers] = useState(false);
  const [showRaceInfo, setShowRaceInfo] = useState(false);

>>>>>>> 7f64b2e11fad66c6ce7dfd06fbf6d12b7a798484

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
        <NavigationBar
          setToken={setToken}
          token={token}
          updateToken={updateToken}
          setShowRegister={setShowRegister}
          showRegister={showRegister}
          setShowSignIn={setShowSignIn}
          showSignIn={showSignIn}
          setShowRacesMain={setShowRacesMain}
          showRacesMain={showRacesMain}
          setShowRaceRegistration={setShowRaceRegistration}
          showRaceRegistration={showRaceRegistration}
          setShowRaceInfo={setShowRaceInfo}
          showRaceInfo={showRaceInfo}
          setShowRaceResults={setShowRaceResults}
          showRaceResults={showRaceResults}
          setShowRegisteredRacers={setShowRegisteredRacers}
          showRegisteredRacers={showRegisteredRacers}
        />
        //<PhotoGallery />
        <Routes>
          <Route path="/" />
          <Route path="/flows" />
        </Routes>
        <PageControl
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          showSignIn={showSignIn}
          setShowSignIn={setShowSignIn}
          token={token}
          setToken={setToken}
          updateToken={updateToken}
          setShowRacesMain={setShowRacesMain}
          showRacesMain={showRacesMain}
          setShowRaceRegistration={setShowRaceRegistration}
          showRaceRegistration={showRaceRegistration}
          setShowRaceInfo={setShowRaceInfo}
          showRaceInfo={showRaceInfo}
          setShowRaceResults={setShowRaceResults}
          showRaceResults={showRaceResults}
          setShowRegisteredRacers={setShowRegisteredRacers}
          showRegisteredRacers={showRegisteredRacers}
        />
        <Footer />
      </Router>
    </div>
  );
}
export default App;
