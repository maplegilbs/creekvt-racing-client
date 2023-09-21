import React, { useEffect, useContext } from "react";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/successPage.css";
import { API_ADD_REGISTERED_RACER } from "../../constants/endpoints";
import { urlBuilder } from "../util/urlBuilder";
import { UserContext } from "../store/UserContext";
import Spinner from 'react-bootstrap/Spinner';


const SuccessPage = (props) => {
  let passedInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userctx = useContext(UserContext)
  const navigate = useNavigate();
  
  useEffect(() => {
  console.log(userctx.raceFeedItems)
   if (userctx.raceFeedItems.length > 0){
      
      const raceInformation = userctx.raceFeedItems.find((race) => {
        return race.id == passedInfo.raceId
      })  
      const urlString = `/registeredRacers/${raceInformation.id}/${raceInformation.year}/${urlBuilder(raceInformation.name)}`
      setTimeout(() => {
        navigate(urlString)
      }, 5000) 
      
   } 
  }, [userctx.raceFeedItems]);
  
  async function registerAthlete() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = {
        raceId: parseInt(passedInfo.raceId),
        firstName: passedInfo.firstName,
        lastName: passedInfo.lastName,
        DOB: passedInfo.DOB,
        email: passedInfo.email,
        phone: passedInfo.phone,
        category: passedInfo.vessel,
        ACA: parseInt(passedInfo.ACA),
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

  function handleRegisteredRacersClick() {
    
  }

  return (
    <>
      <h2 className="thx-header">Thanks for registering!</h2>
      <h5 className="thx-txt">
        Your reciept will be sent to the email address you provided shortly.
      </h5>
      <h5 className="thx-txt">
        You will be redirected to view the registered racers in 5 seconds!
      </h5>
      <div className="spinner-icon">
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
     </div>
    </>
  );
};

export default SuccessPage;
