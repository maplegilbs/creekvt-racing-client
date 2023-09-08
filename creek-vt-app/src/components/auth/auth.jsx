import React, { useState } from "react";
import signin from "./signin";
import register from "./register";
function handlesubmit(e) {
  e.preventDefault();
  showSigninRegisterScreen();
}

function showSigninRegisterScreen() {}
const Auth = (props) => {
  return (
    <>
      <Button onClick={handlesubmit}>signin/register</Button>
    </>
  );
};

export default Auth;
