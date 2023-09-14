import React, { createContext, useState, useEffect } from "react";

//autopopulates
export const UserContext = createContext({
  token: "",
  race: "",
  firstName: "",
  updateToken: () => {},
  setRace: () => {},
  updateFirstName: () => {},
});

//creates functions available sitewide
const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [race, setRace] = useState(null);
  const [firstName, setFirstName] = useState("");

  function updateToken(newToken) {
    localStorage.removeItem("token");
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
  function updateFirstName(nameStore) {
    localStorage.removeItem("firstName");
    setFirstName(nameStore);
    localStorage.setItem("firstName", firstName);
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
    updateToken: updateToken,
    setRace,
    updateFirstName,
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
