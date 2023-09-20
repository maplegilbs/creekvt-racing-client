import styled from "styled-components";
import "../../App.css";

// footer section

export const FooterContainer = styled.nav`
  background-image: linear-gradient(110deg, #4e647b, #293b46);
  box-shadow: 2px 3px 10px 4px;
  margin: 1px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vh 4vh 4vh 0;
  position: sticky;
  bottom: 0;

  @media (max-width: 700px) {
    height: 12vh;
    padding: 3vh 4vh 7vh 0;
  }
`;

export const FooterBrand = styled.div`
  nav navbar-brand,
  nav navbar-brand,
  img {
    height: 15vh;
    width: auto;
    margin: auto;
    padding: 2px 2px;
  }
  @media (min-width: 700px) {
    height: 5px;
    margin-bottom: 9vh
`;
