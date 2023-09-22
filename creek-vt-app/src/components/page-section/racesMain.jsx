import { API_VIEWALL_RACES } from "../../constants/endpoints";
import RaceInfoCards from "../linkingComponents/raceInfoCards";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../store/UserContext";

import {
  MainContainer,
  HeaderContainer,
  CreekLogo as Logo,
  Blurb,
  LogoOverlay,
  OverlayText,
  RaceInfoCardsDiv
} from "../styles/racesMain.styles";
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
  
  return (
    <MainContainer className="m-3">

      <HeaderContainer>
      <div className="img-container">
      <Logo id="main-img"
        src="https://cdn.discordapp.com/attachments/1131315556243476591/1154190312143585330/RaceMainPage2.jpg"
        alt="hero-image"
        />
        </div>
        <LogoOverlay className="overlay">
          <OverlayText>RACES</OverlayText>
        </LogoOverlay>
        
      </HeaderContainer>

      <Blurb className="blurb-txt">
Welcome to the world of whitewater racing in the Green Mountains! On this site you can register to compete, find detailed information on each race, or relive prior years by browsing through our collection of race results and photo galleries. For the 2024 season we are looking forward to the return of the classic New Haven Ledges Race, as well as the 3rd annual Peavine Race.  Check the individual race pages for details and to sign up.  See you at the finish line.
      </Blurb>
      <RaceInfoCardsDiv
       >
        {userctx.raceFeedItems.map((race, index) => (
          <RaceInfoCards
            fetchRacesFeed={fetchRacesFeed}
            key={index}
            race={race}
          />
        ))}
      </RaceInfoCardsDiv>
     
    </MainContainer>
  );
};

export default RacesMain;
