import React, { useState, useEffect, useContext } from "react";
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
    startTime: "",
    location: "",
  });
  const [racerAddData, setRacerAddData] = useState({
    athleteId: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    category: "",
  });

  //function section
  function handleRaceSelect(selection) {
    setSelectedRace(selection);
    setEditData({
      name: selection.name,
      date: selection.date,
      startTime: selection.startTime,
      location: selection.location,
    });
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
  function handleAddInputChange(e) {
    const { name, value } = e.target;
    setRacerAddData(() => ({
      [name]: value,
    }));
  }
  function handleSubmitUpdate(e) {
    e.preventDefault();
    updateRace();
  }

  //fetch section
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

  // use effects
  useEffect(() => {
    if (selectedRace.id) {
      fetchRegisteredRacers();
    }
  }, [selectedRace]);
  useEffect(() => {
    fetchRacesFeed();
  }, []);

  // This section is what renders in the options box
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
            <label htmlFor="startTime" className="form-label">
              Time:
            </label>
            <input
              type="text"
              id="startTime"
              name="startTime"
              className="form-control"
              value={editData.startTime}
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
            className="bg-light d-flex flex-column m-1"
            style={{
              width: "50%",
              fontSize: "",
              maxHeight: "40vh",
              overflowY: "auto",
            }}>
            <h4>Registered Racers:</h4>
            {registeredRacersItems?.map((racer, index) => (
              <div
                style={{ border: "black 1.5px solid" }}
                key={index}
                className="d-flex justify-content-between">
                ID:{racer.id}, Firstname: {racer.firstName}, Lastname:{" "}
                {racer.lastName}
                <div className="d-flex flex-column m-1">
                  <button style={{ height: "50%", backgroundColor: "red" }}>
                    DELETE
                  </button>
                  <button
                    style={{
                      height: "50%",
                      backgroundColor: "blue",
                      color: "white",
                    }}>
                    UPDATE
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "50%",
              backgroundColor: "khaki",
              border: "black solid 2px",
              maxHeight: "40vh",
              overflowY: "auto",
            }}>
            <form
              className="d-flex flex-column align-items-center"
              style={{ gap: "3px" }}>
              <h5 style={{ textAlign: "center" }}>Add Racer</h5>
              <div>
                <label htmlFor="addRacerAthleteId">Athlete ID:</label>
                <input
                  type="text"
                  name="addRacerAthleteId"
                  id="addRacerAthleteId"
                  className="form-control"
                  value={racerAddData.athleteId}
                  onChange={handleAddInputChange}
                  placeholder="Enter id"
                />
              </div>
              <div>
                <label htmlFor="addRacerFirstName">First Name:</label>
                <input
                  type="text"
                  name="addRacerFirstName"
                  id="addRacerFirstName"
                  className="form-control"
                  value={racerAddData.firstName}
                  onChange={handleAddInputChange}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label htmlFor="addRacerLastName">Last Name:</label>
                <input
                  type="text"
                  name="addRacerLastName"
                  id="addRacerLastName"
                  className="form-control"
                  value={racerAddData.lastName}
                  onChange={handleAddInputChange}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label htmlFor="addRacerAge">Age:</label>
                <input
                  type="text"
                  name="addRacerAge"
                  id="addRacerAge"
                  className="form-control"
                  value={racerAddData.age}
                  onChange={handleAddInputChange}
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label htmlFor="addRacerEmail">Email:</label>
                <input
                  type="text"
                  name="addRacerEmail"
                  id="addRacerEmail"
                  className="form-control"
                  value={racerAddData.email}
                  onChange={handleAddInputChange}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label htmlFor="addRacerPhone">Phone:</label>
                <input
                  type="text"
                  name="addRacerPhone"
                  id="addRacerPhone"
                  className="form-control"
                  value={racerAddData.phone}
                  onChange={handleAddInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label htmlFor="addRacerCategory">Category:</label>
                <input
                  type="text"
                  name="addRacerCategory"
                  id="addRacerCategory"
                  className="form-control"
                  value={racerAddData.category}
                  onChange={handleAddInputChange}
                  placeholder="Enter category"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitUpdate}>
                Add Racer
              </button>
            </form>
          </div>
        </div>
      );
    }
    return null;
  }
  return (
    <div className="d-flex flex-column">
      <div style={{ margin: "20px 30px", fontWeight: "bolder" }}>
        Welcome Back Admin {adminName}
      </div>
      <div style={{ textAlign: "center", fontWeight: "bold", margin: "10px" }}>
        Use This dashboard to edit race information, racers, and to post
        results.
      </div>
      <div className="d-flex justify-content-center">
        <Dropdown>
          <div
            className="d-flex m-3"
            style={{ gap: "30px", border: "solid black 2px", padding: "2px" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Race to Edit
            </Dropdown.Toggle>
            <h4> Currently selected race to edit: {selectedRace.name}</h4>
          </div>
          <Dropdown.Menu>
            {userctx.raceFeedItems.map((race, index) => (
              <Dropdown.Item key={index} onClick={() => handleRaceSelect(race)}>
                {race.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
          <div>
            <label style={{ marginRight: "100px" }}>
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
