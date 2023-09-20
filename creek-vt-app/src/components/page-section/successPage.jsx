import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "./successPage.css";
import { API_ADD_REGISTERED_RACER } from "../../constants/endpoints";
const SuccessPage = (props) => {
  let passedInfo = JSON.parse(localStorage.getItem("userInfo"));

  async function registerAthlete() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = {
        raceId: parseInt(passedInfo.raceId),
        firstName: passedInfo.firstName,
        lastName: passedInfo.lastName,
        DOB: passedInfo.dob,
        email: passedInfo.email,
        phone: passedInfo.phoneNumber,
        category: passedInfo.vessel,
        ACA: parseInt(passedInfo.acaNumber),
      };
      console.log(JSON.stringify(body));
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_ADD_REGISTERED_RACER, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    registerAthlete()
  }, []);

  return (
    <>
      <h2 className="thx-header">Thanks for registering!</h2>
      <h5 className="thx-txt">
        Your reciept will be sent to the email address you provided shortly.
      </h5>
      <h5 className="thx-txt">
        Click on one of the races below to see all the registered racers!
      </h5>
      <div className="btn-cont">
        <Button className="btn-style">New Haven Ledges Race</Button>
        <Button className="btn-style">Peavine Race</Button>
      </div>
    </>
  );
};

export default SuccessPage;
