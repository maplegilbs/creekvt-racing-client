import '../../App.css';
import styled from 'styled-components';


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const HeaderContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
.img-container{
  box-shadow: rgba(0, 0, 0, 0.5) 0px 11px 10px 0px;
}
`;


export const CreekLogo = styled.img`
  width: 100vw;
  height: auto;
  object-fit: cover;

  @media (max-width: 700px) {
      width: 100vw;
      
      // min-height: 80vh;
    
  }


  #main-img{
      width: 100vw;
      box-shadow: 0 11px 10px 0 rgba(0,0,0,.5);
      height: auto;
      padding: 0% !important;
  }
`;

export const LogoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #008CBA;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;

  .overlay {
    display: none;
  }

  &:hover .overlay {
    height: 100%;
  }
`;

export const OverlayText = styled.p`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Blurb = styled.p`
    text-align: center;
    font-family: 'Roboto Serif', serif;
    padding: 20px;
    width: 70vw;

`;

export const RaceInfoCardsDiv = styled.div`
display: flex;
width: 60vw !important;
flex-wrap: wrap;
justify-content: center;
margin: auto;
`