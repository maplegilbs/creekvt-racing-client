import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext({});
const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [showRacesMain, setShowRacesMain] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRaceRegistration, setShowRaceRegistration] = useState(false);
  const [showRaceResults, setShowRaceResults] = useState(false);
  const [showRegisteredRacers, setShowRegisteredRacers] = useState(false);
  const [showRaceInfo, setShowRaceInfo] = useState(true);

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

  const value = {
    token: token,
    setToken: setToken,
    showRacesMain: showRacesMain,
    setShowRacesMain: setShowRacesMain,
    showSignIn: showSignIn,
    setShowSignIn: setShowSignIn,
    showRegister: showRegister,
    setShowRegister: setShowRegister,
    showRaceRegistration: showRaceRegistration,
    setShowRaceRegistration: setShowRaceRegistration,
    showRaceResults: showRaceResults,
    setShowRaceResults: setShowRaceResults,
    showRegisteredRacers: showRegisteredRacers,
    setShowRegisteredRacers: setShowRegisteredRacers,
    showRaceInfo: showRaceInfo,
    setShowRaceInfo: setShowRaceInfo,
    updateToken: updateToken,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
