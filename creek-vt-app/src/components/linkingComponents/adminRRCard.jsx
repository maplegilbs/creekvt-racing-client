import React, { useContext, useState } from "react";
import { API_DELETE_REGISTERED_RACER } from "../../constants/endpoints";
import { UserContext } from "../store/UserContext";
const AdminRRCard = (props) => {
  const userctx = useContext(UserContext);
  let { id, firstName, lastName, email, raceId } = props.racer;

  function handleDeleteRacerClick(clickValue) {
    deleteRegisteredRacer(clickValue);
  }
  async function deleteRegisteredRacer(selectedRacer) {
    try {
      const token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
      const response = await fetch(
        API_DELETE_REGISTERED_RACER + raceId + "/" + selectedRacer,
        requestOptions
      );
      const data = await response.json();
      props.fetchRegisteredRacers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div
        style={{
          border: "black 1.5px solid",
          margin: "2px 0",
          justifyContent: "space-between",
        }}
        className="d-flex">
        ID:{id}, Firstname: {firstName}, Lastname:
        {lastName}, Email: {email}
        <div className="d-flex flex-column m-1">
          <button
            onClick={() => handleDeleteRacerClick(email)}
            style={{ height: "50%", backgroundColor: "red" }}>
            DELETE
          </button>
          <button
            onClick={() => userctx.setSelectedUpdateAthlete(props.racer)}
            style={{
              height: "50%",
              backgroundColor: "blue",
              color: "white",
            }}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRRCard;
