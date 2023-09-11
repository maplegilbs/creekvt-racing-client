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
        setShowRegister={setShowRegister}
        setShowSignIn={setShowSignIn}
        updateToken={updateToken}
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
      />
      <Footer />
    </Router>
  );
}
export default App;
