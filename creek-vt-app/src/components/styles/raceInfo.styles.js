import '../../App.css';
import styled from 'styled-components';


export const RaceInfoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100rem;
width: 100%;
margin: 10px auto 20px auto;


  @media (max-width: 700px) {
    width: 100%;
    height: 200vh;
  }
`;

export const RaceInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;

 .title-txt {
text-align: center;
    font-family: 'Roboto Serif', serif;
    font-weight: 600;
    font-size: 2.75em;
}

.location-txt {
  text-align: center;
  font-family: 'Roboto Serif', serif;

  text-align: center;
    font-family: 'Roboto Serif', serif;
    font-weight: 600;
    font-size: larger;
}

  @media (max-width: 700px) {
    float: none;
  }
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 11px 10px 0 rgba(0,0,0,.5);
    margin: 15vh 0 0 0;
    width: 80em;

`;

export const RaceImage = styled.img`

  flex-direction: column;
  width: 100%;
  height: auto;
  margin: auto 0px;
  padding: 10px;
 
}
`;

export const RaceDescription = styled.p`
  margin: 40px;
  font-size: x-large;
  font-weight: 400;
  
  @media (max-width: 700px) {
    font-size: medium;
    float: none;

  }
`

export const ButtonGrid = styled.div`

  display: grid;
  grid-template-columns: 50vh 50vh;
  justify-content: center;
  gap: 20px;

  .btn-xtras {
    background: linear-gradient(45deg,#e1eaf4, #4d7288);
      color: white;
      padding: 10px;
      margin: 5px auto;
      border: 2px solid rgb(118,118,118);
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: .8em;
      text-transform: uppercase;
      text-shadow: 1px 1px 5px #333;
      border-radius: 5px;
      width: 30em;
      height: 8vh;

      @media (max-width: 700px) {
        width: 100em;
        margin: -5px auto;
      }
  }

 

  .btn-xtra-cont{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
}

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RegRacerContainer = styled.div`
.reg-btn,
.racers-btn {
    background: linear-gradient(45deg,#e1eaf4, #4d7288);
      color: white;
      padding: 10px;
      margin: 5px auto;
      border: 2px solid rgb(118,118,118);
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: .8em;
      text-transform: uppercase;
      text-shadow: 1px 1px 5px #333;
      border-radius: 5px;
      width: 30em;
      height: 8vh;
      
      @media (max-width: 700px) {
        width: 100em;
        margin: 5px 0px;
      }

  }


`;


export const Button = styled.button`

    &:hover {
      opacity: 80%;
    }

`;
