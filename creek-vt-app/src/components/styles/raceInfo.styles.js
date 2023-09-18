import '../../App.css';
import styled from 'styled-components';





export const RaceInfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 140vh;
width: 50%;
margin: auto;

  @media (max-width: 700px) {
    width: 100%;
    height: 200vh;
  }
`;

export const RaceInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  h2 {
    font-size: 50px;
  }
`;

export const RaceImage = styled.img`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto 40px;
  padding: 10px;
`;

export const RaceDescription = styled.p`
  margin: 40px;
`

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 50vh 50vh;
  justify-content: center;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 10vh;
  align-items: center;
  box-shadow: 5px 5px 5px black;
  color: white;
      padding: 10px;
      margin: 1vh auto;
      border: 2px solid rgb(118,118,118);
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: .8em;
      text-transform: uppercase;
      text-shadow: 1px 1px 5px #333;
      border-radius: 5px;
      background: linear-gradient(45deg,#e1eaf4, #4d7288);
  &:hover {
    opacity: 80%;
  }


  @media (max-width: 700px) {
    width: 100%;
    height: 10vh;
  }
`;
