import React, { createContext, useState, useEffect } from "react";

//autopopulates
export const UserContext = createContext({
  token: "",
  race: "",
  firstName: "",
  adminCredentials: "",
  raceFeedItems: "",
  selectedUpdateAthlete: "",
  updateToken: () => {},
  setRace: () => {},
  updateFirstName: () => {},
  updateAdminCred: () => {},
  setRaceFeedItems: () => {},
  capitalize: () => {},
  titleize: () => {},
  setSelectedUpdateAthlete: () => {},
});

//creates functions available sitewide
const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [race, setRace] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [adminCredentials, setAdminCredentials] = useState("");
  const [raceFeedItems, setRaceFeedItems] = useState([]);
  const [selectedUpdateAthlete, setSelectedUpdateAthlete] = useState([]);

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
  function capitalize(string) {
    let firstLetter = string[0];
    firstLetter = firstLetter.toUpperCase();
    let restOfWord = string.slice(1).toLowerCase();
    let fullWord = firstLetter + restOfWord;
    return fullWord;
  }
  function titleize(string) {
    return string
      .split(" ")
      .map((words) => capitalize(words))
      .join(" ");
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
    selectedUpdateAthlete,
    setRaceFeedItems,
    updateToken,
    setRace,
    updateFirstName,
    updateAdminCred,
    titleize,
    capitalize,
    setSelectedUpdateAthlete,
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
