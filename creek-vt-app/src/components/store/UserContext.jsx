import React, { createContext, useState, useEffect } from "react";

//autopopulates
export const UserContext = createContext({
  token: "",
  race: "",
  firstName: "",
  adminCredentials: "",
  raceFeedItems: "",
  updateToken: () => {},
  setRace: () => {},
  updateFirstName: () => {},
  updateAdminCred: () => {},
  setRaceFeedItems: () => {},
});

//creates functions available sitewide
const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [race, setRace] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [adminCredentials, setAdminCredentials] = useState("");
  const [raceFeedItems, setRaceFeedItems] = useState([]);

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
  function updateFirstName(nameStore) {
    setFirstName(nameStore);
    localStorage.setItem("firstName", nameStore);
  }
  function updateAdminCred(adminStored) {
    setAdminCredentials(adminStored);
    localStorage.setItem("isAdmin", adminStored);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  //values passed
  const value = {
    token: token,
    race,
    firstName,
    adminCredentials,
    raceFeedItems,
    setRaceFeedItems,
    updateToken,
    setRace,
    updateFirstName,
    updateAdminCred,
  };
  return (
    <>
      <UserContext.Provider value={value}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;
