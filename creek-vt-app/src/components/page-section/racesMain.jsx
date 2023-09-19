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
const RacesMain = (props) => {
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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainContainer className="m-3">

      <HeaderContainer>
      <Logo
        src="https://creekvt.com/wp-content/uploads/2021/09/FrontPageE1600W_85.jpg"
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
        className="d-flex m-8 flex-wrap justify-content-center g-10"
        style={{ maxWidth: "75%" }}>
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
