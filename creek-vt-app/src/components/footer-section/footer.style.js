import styled from "styled-components";
import "../../App.css";

// footer section

export const FooterContainer = styled.nav`
  background-image: linear-gradient(110deg, #4e647b, #293b46);
  box-shadow: 2px 3px 10px 4px;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vh 15vh 9vh 0;
  position: absolute;
  bottom: 0;

  @media (min-width: 700px) {
    height: 20vh;
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
