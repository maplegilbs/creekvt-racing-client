import { API_VIEWALL_RACES } from "../../constants/endpoints";
import RaceInfoCards from "../linkingComponents/raceInfoCards";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../store/UserContext";
import {
  MainContainer,
  HeaderContainer,
  CreekLogo as Logo,
  Blurb,
  LogoOverlay,
  OverlayText
} from "../styles/racesMain.styles";
import "./racesMain.css"
import Signin from "../auth/signin";
import { useNavigate } from "react-router-dom";
const RacesMain = (props) => {
  const navigate = useNavigate();
  const userctx = useContext(UserContext);
  useEffect(() => {
    fetchRacesFeed();
  }, []);
  async function fetchRacesFeed() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(API_VIEWALL_RACES, requestOptions);
      const data = await response.json();
      userctx.setRaceFeedItems(data.races);
      console.log(data.races)
    } catch (error) {
      console.log(error);
    }
  }
  function handleRaceClick(){
    
  }
  function handleSignupClick(){
    navigate("/signin")
  }
  return (
    <MainContainer className="m-3">

      <HeaderContainer>
      <Logo id="main-img"
        src="https://cdn.discordapp.com/attachments/1131315556243476591/1154190312143585330/RaceMainPage2.jpg"
        alt="hero-image"
        />
        <LogoOverlay className="overlay">
          <OverlayText>RACES</OverlayText>
        </LogoOverlay>
        
      </HeaderContainer>

      <Blurb className="blurb-txt">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam placeat eos ea laudantium debitis itaque, non quos ut reiciendis, doloribus, doloremque iusto odio sed. Magnam tempore commodi culpa doloremque sit?
      </Blurb>
      <div
        className="d-flex m-8 flex-wrap g-20"
        style={{ maxWidth: "75%", justifyContent:"space-between"}}>
        {userctx.raceFeedItems.map((race, index) => (
          <RaceInfoCards
            fetchRacesFeed={fetchRacesFeed}
            key={index}
            race={race}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default RacesMain;
