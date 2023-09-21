import React, { Component, useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import {Form} from "react-bootstrap"
import { Dropdown } from "react-bootstrap";
import "./raceRegistration.css"
import { useParams } from "react-router-dom";

const RaceRegistration = (props) => {
  const userctx = useContext(UserContext);
  const { raceid } = useParams();

  const passedLogin = JSON.parse(localStorage.getItem("Login Info"))
  console.log(passedLogin)
  const [userData, setUserData] = useState({
    raceId: raceid,
    firstName: passedLogin.firstName || "",
    lastName: passedLogin.lastName || "",
    DOB: passedLogin.DOB || "",
    location: passedLogin.location || "",
    email: passedLogin.email || "",
    phone: passedLogin.phone || "",
    vessel: "",
    acaNumber: "",
  });
  const [selectedVessel, setSelectedVessel] = useState("Select a Vessel");
  const isFormValid = () => {
    return (
      userData.firstName.trim() !== "" &&
      userData.lastName.trim() !== "" &&
      userData.DOB.trim() !== "" &&
      userData.email.trim() !== "" &&
      userData.phone.trim() !== ""
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  async function handlePayButton(){
    if (!isFormValid()) {
      alert("Please fill out all required fields.");
      return;
    }
    const userDataJson = JSON.stringify(userData)
    localStorage.setItem("userInfo", userDataJson)
    console.log("DATA HERE", userDataJson)
    
    fetch(`http://localhost:3307/register/create-checkout-session/${parseInt(raceid)}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          items: [
              {id: 1, quantity: 1}
              
          ],
          email: userData.email,
      })
    })
    .then(res => {
      if(res.status !== 409) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) =>{
      window.location = url
    })
    .catch(e => {
      console.error(e)
    })
  };
  
  const handleDropdownSelect = (eventKey) => {
    setUserData({ ...userData, vessel: eventKey });
    setSelectedVessel(eventKey);
  };
  return (
  <>
  <h2 className="register-header">Register to Race</h2>
  <div className="subhead-cont">
    <h5 className="reg-subhead">Fill out every field as labeled, then hit "Pay and Complete" to pay.</h5>
    </div>
  
  <div id="form-shadow" className="shadow-lg bg-white rounded w-50">
  <Form className="form-cont" >
    <Form.Group>
      <Form.Label className="all-lbls">First Name</Form.Label>
      <Form.Control 
      // required
      type="text"
      name="firstName"
      placeholder=""
      value={userData.firstName} 
      onChange={handleInputChange}>
      </Form.Control>

      <Form.Label className="all-lbls">Last Name</Form.Label>
      <Form.Control 
      required
      type="text"
      name="lastName"
      placeholder=""
      value={userData.lastName} 
      onChange={handleInputChange}>
      </Form.Control>
      
      <Form.Label className="all-lbls">Date of Birth</Form.Label>
      <Form.Control
      required
      type="date"
      name="DOB"
      placeholder=""
      value={userData.DOB} 
      onChange={handleInputChange}></Form.Control>
      
      <Form.Label className="all-lbls">Location</Form.Label>
      <Form.Control
       type="text"
       name="location"
       placeholder=""
       value={userData.location} 
       onChange={handleInputChange}></Form.Control>
      
      <Form.Label className="all-lbls">Email</Form.Label>
      <Form.Control
      required
      type="text"
      name="email"
      placeholder=""
      value={userData.email} 
      onChange={handleInputChange}>
      </Form.Control>
      
      <Form.Label className="all-lbls">Phone Number</Form.Label>
      <Form.Control
      required
      type="text"
      name="phone"
      placeholder=""
      value={userData.phone} 
      onChange={handleInputChange}></Form.Control>

      <Dropdown name="vessel" onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedVessel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Tandem Kayak">Tandem Kayak</Dropdown.Item>
        <Dropdown.Item eventKey="Race Kayak">Race Kayak</Dropdown.Item>
        <Dropdown.Item eventKey="Recreational Kayak">Recreational Kayak</Dropdown.Item>
        <Dropdown.Item eventKey="Solo Canoe">Solo Canoe</Dropdown.Item>
        <Dropdown.Item eventKey="Race Canoe">Race Canoe</Dropdown.Item>
        <Dropdown.Item eventKey="Paddleboard">Paddleboard</Dropdown.Item>
        <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
    
    <Form.Label className="all-lbls">ACA Number</Form.Label>
      <Form.Control 
      type="text"

      name="acaNumber"
      placeholder="Not Required"
      value={userData.acaNumber} 

      onChange={handleInputChange}></Form.Control>

  </Form>
  <div className="btn-cont">
    <button className="pay-btn" onClick={handlePayButton}>Pay and Complete</button>
  </div>
    </div>
</>
)};

export default RaceRegistration;
