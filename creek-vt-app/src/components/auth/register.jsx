import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { API_REGISTER_USER } from "../../constants/endpoints";
const register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    register();
  }
  async function register() {
    try {
      //heaaders
      let myHeaders = new Headers();
      myHeaaders.append("Content-Type", "application/json");
      //request body
      let body = {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
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
      //!update token (need to do after we establish where it lives)
      // props.updateToken(data.token)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <div>
          <h2>Register account</h2>
          <Form>
            <FormGroup>
              <div>
                <Label for="first">First Name</Label>
                <Input
                  type="first"
                  name="first"
                  id="first"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <Label for="last">Last Name</Label>
                <Input
                  type="last"
                  name="last"
                  id="last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
              </div>
              <div>
                <Label for="age">Age (for race results/statistics)</Label>
                <Input
                  type="age"
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Age"
                />
              </div>
              <div>
                <Label for="gender">Gender (for race results/statistics)</Label>
                <Input
                  type="gender"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter 1 character gender"
                />
              </div>
            </FormGroup>
            <Button onClick={handleSubmit}>Register</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default register;
