import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { API_SIGNIN_USER } from "../../constants/endpoints";

const signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    signin();
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
      //!update token (needs path up)
      //props.updateToken(data.token)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <div>
          <Form>
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
            <Button onClick={handleSubmit}>LOGIN</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default signin;
