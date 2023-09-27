import React, { useContext, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { API_REGISTER_USER } from "../../constants/endpoints";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
require("bootstrap");

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
    navigate("/racesMain");
  }

  async function registerUser() {
    try {
      //heaaders
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //request body
      let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        DOB: DOB,
        gender: gender,
        phone: phone,
      };
      //request options
      let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      //send request
      const response = await fetch(API_REGISTER_USER, requestOption);
      //get response
      const data = await response.json();
      userctx.updateToken(data.token);
      userctx.updateFirstName(firstName);
      userctx.storeLoginInfo(body);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="w-45 border border-primary p-3">
          <h2>Register account</h2>
          <Form className="d-flex align-items-center flex-column">
            <FormGroup>
              <Label for="first">First Name</Label>
              <Input
                type="first"
                name="first"
                id="first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last">Last Name</Label>
              <Input
                type="last"
                name="last"
                id="last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="DOB">DOB (for race results/statistics)</Label>
              <Input
                type="DOB"
                name="DOB"
                id="DOB"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                placeholder="YYYY-MM-DD"
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gender (for race results/statistics)</Label>
              <Input
                type="gender"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter 1 character gender"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone (for race results/statistics)</Label>
              <Input
                type="phone"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="enter number here"
              />
            </FormGroup>
            <Button type="submit" onClick={handleSubmit} style={{background: "linear-gradient(45deg,#e1eaf4, #4d7288)"}}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
