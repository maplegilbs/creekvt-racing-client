import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { API_SIGNIN_USER } from "../../constants/endpoints";
require("bootstrap");
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    signin();
    props.setShowRacesMain(true);
    props.setShowSignIn(false);
    props.setShowRegister(false);
  }
  async function signin() {
    try {
      // headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //request body
      let body = {
        email,
        password,
      };
      // request options
      let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      //send request
      const response = await fetch(API_SIGNIN_USER, requestOption);
      //get response
      const data = await response.json();
      props.updateToken(data.token);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="w-45 border border-primary p-3 d-flex flex-column align-items-center">
          <h2>Sign in</h2>
          <Form className="d-flex align-items-center flex-column">
            {/*email group */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            {/* password group */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" onClick={handleSubmit}>
              LOGIN
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signin;
