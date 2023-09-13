import React, { createContext, useState, useEffect } from "react";

//autopopulates
export const UserContext = createContext({
  token: "",
  race: "",
  updateToken: () => {},
  setRace: () => {},
});

//creates functions available sitewide
const UserContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [race, setRace] = useState(null);

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

  //values passed
  const value = {
    token: token,
    updateToken: updateToken,
    race,
    setRace,
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
