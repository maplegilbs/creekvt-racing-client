import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar-section/NavigationBar";
import PhotoGallery from "./components/photo-gal-section/PhotoGallery";

function App({Component, pageProps}) {
  const [token, setToken] = useState("");
  
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
      <NavigationBar updateToken={updateToken} token={token} />
      <PhotoGallery />
      <Routes>
        <Route path="/" />
        <Route path="/flows" />
      </Routes>
    </Router>
    
  );
}
export default App;
