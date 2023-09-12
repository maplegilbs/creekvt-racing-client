import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar-section/NavigationBar";
import Footer from "./components/footer-section/footer";
import PageControl from "./components/page-section/pageControl";

function App() {
  const [token, setToken] = useState("");
  const [showRacesMain, setShowRacesMain] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRaceRegistration, setShowRaceRegistration] = useState(false);
  const [showraceResults, setShowRaceResults] = useState(false);
  const [showregisteredRacers, setShowRegisteredRacers] = useState(false);
  const [showraceInfo, setShowRaceInfo] = useState(false);

  function updateToken(newToken) {
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
        showraceInfo={showraceInfo}
        setShowRaceResults={setShowRaceResults}
        showraceResults={showraceResults}
        setShowRegisteredRacers={setShowRegisteredRacers}
        showregisteredRacers={showregisteredRacers}
      />
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
        showraceInfo={showraceInfo}
        setShowRaceResults={setShowRaceResults}
        showraceResults={showraceResults}
        setShowRegisteredRacers={setShowRegisteredRacers}
        showregisteredRacers={showregisteredRacers}
      />
      <Footer />
    </Router>
  );
}
export default App;
