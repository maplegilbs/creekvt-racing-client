import styled from "styled-components";
import "../../App.css";

// footer section

export const FooterContainer = styled.nav`
  background-image: linear-gradient(110deg, #4e647b, #293b46);
  box-shadow: 2px 3px 10px 4px;
  margin: 0px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vh 4vh 4vh 0;
  // position: fixed !important;
  bottom: 0px;
  height: auto !important;
  flex-direction: column;


.footer-main{
    bottom: 0px !important;
    justify-content: center;

}

  }

  @media screen and (max-width: 800px) {
    height: 12vh;
    width: 100vw;
    padding: 0px;
.footer-main{
    padding: 5vh 0vh 5vh 0px !important;
}
.logo-main{
        height: auto !important;
        max-width: 100%
        box-shadow: 1px, 1.5px, 5px, 2px;

    }
  }
`;

export const FooterBrand = styled.div`
  .logo-main{
    text-align: center;
    margin: auto !important;
    height: 12vh !important;
    padding: 3px;
    max-width: 100%
}
  @media (min-width: 700px) {
    height: 5px;
    margin-bottom: 9vh
`;
