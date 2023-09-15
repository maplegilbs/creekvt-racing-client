import React, { useState, Select, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import {
  API_UPDATE_RACE,
  API_VIEWALL_RACES,
  API_VIEW_REGISTERED_RACERS,
} from "../../constants/endpoints";
import { UserContext } from "../store/UserContext";

const AdminDashboard = (props) => {
  const userctx = useContext(UserContext);
  const [selectedEdit, setSelectedEdit] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [registeredRacersItems, setRegisteredRacersItems] = useState([]);
  let adminName = localStorage.getItem("firstName");
  const [editData, setEditData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });
  function handleRaceSelect(selection) {
    setSelectedRace(selection);
  }
  function handleRadioChange(event) {
    setSelectedEdit(event.target.value);
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmitUpdate(e) {
    e.preventDefault();
    updateRace();
  }
  async function fetchRacesFeed() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(API_VIEWALL_RACES, requestOptions);
      const data = await response.json();
      userctx.setRaceFeedItems(data.races);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateRace() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(editData),
      };
      const response = await fetch(
        API_UPDATE_RACE + selectedRace.id,
        requestOptions
      );
      const data = await response.json();
      setRegisteredRacersItems(data.registeredAthletes);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchRegisteredRacers() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        API_VIEW_REGISTERED_RACERS + selectedRace.id,
        requestOptions
      );
      const data = await response.json();
      setRegisteredRacersItems(data.registeredRacers);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (selectedRace.id) {
      fetchRegisteredRacers();
    }
  }, [selectedRace]);
  function renderEditOptions() {
    if (selectedEdit === "option1") {
      return (
        <div>
          <form>
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={editData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="form-control"
              value={editData.date}
              onChange={handleInputChange}
            />
            <label htmlFor="time" className="form-label">
              Time:
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className="form-control"
              value={editData.time}
              onChange={handleInputChange}
            />
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={editData.location}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitUpdate}>
              Submit Edit
            </button>
          </form>
        </div>
      );
    } else if (selectedEdit === "option2") {
      return (
        <div className="d-flex">
          <div
            className="bg-light d-flex flex-column"
            style={{ width: "50%", fontSize: "" }}>
            <h4>Registered Racers:</h4>
            {registeredRacersItems.map((racer, index) => (
              <div
                style={{ border: "black 1.5px solid" }}
                key={index}
                className="d-flex justify-content-between">
                ID:{racer.id}, Firstname: {racer.firstName}, Lastname:{" "}
                {racer.lastName}
              </div>
            ))}
          </div>
          <div>Racer Edits Go here</div>
        </div>
      );
    }
    return null;
  }
  useEffect(() => {
    fetchRacesFeed();
  }, []);
  return (
    <div className="d-flex flex-column">
      <div>Welcome Back Admin {adminName}</div>
      <div>
        Use This dashboard to edit race information, racers, and to post
        results.
      </div>
      <div className="d-flex justify-content-center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Race to Edit
          </Dropdown.Toggle>
          <h4> Currently selected race to edit: {selectedRace.name}</h4>
          <Dropdown.Menu>
            {userctx.raceFeedItems.map((race, index) => (
              <Dropdown.Item key={index} onClick={() => handleRaceSelect(race)}>
                {race.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
          <div>
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedEdit === "option1"}
                onChange={handleRadioChange}
              />
              Edit Race Details
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedEdit === "option2"}
                onChange={handleRadioChange}
              />
              Edit Registered Racers
            </label>
          </div>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-center">
        <div
          style={{
            width: "50vw",
            height: "40vh",
            backgroundColor: "darkgray",
          }}>
          {renderEditOptions()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
