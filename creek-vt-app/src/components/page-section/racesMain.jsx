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

      <Blurb>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium debitis explicabo eveniet deleniti laboriosam odit totam, possimus distinctio dolor facere mollitia tempore delectus eum rerum ipsa praesentium expedita? Ducimus possimus dolorem unde quibusdam mollitia, eum quo voluptatibus reiciendis laboriosam ex aperiam doloremque ad consequuntur, numquam hic et omnis sapiente. Obcaecati laboriosam enim explicabo deleniti! Architecto, molestias! Accusantium, dolor praesentium accusamus non unde alias, esse quis facere, laudantium iste harum! Fugiat maiores architecto accusamus, perspiciatis quos est minima optio asperiores atque expedita, illum quaerat consequatur incidunt possimus, dolorum nulla aliquam autem nostrum. Quasi, obcaecati! Quos sequi dolorem amet dolorum perferendis beatae molestiae repellat, deleniti corrupti aliquam qui ipsam quibusdam aperiam, fuga ad nulla est voluptas dignissimos nam. Temporibus vel eligendi architecto nobis eveniet, accusamus necessitatibus nesciunt nisi laudantium saepe modi, ab sunt ducimus voluptate dicta vero non omnis in? Non, beatae at voluptatum molestiae porro ea facilis quod dolores quam voluptatibus?
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
