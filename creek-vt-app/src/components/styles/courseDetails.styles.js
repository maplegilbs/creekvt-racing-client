import styled from "styled-components";
import "../../App.css";

export const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  height 100vh;
  width: 80vw;
  margin: 2vh auto;
  text-align: center;
  font-family: 'Montserrat';
  padding: 20px;

  @media screen and (max-width: 700px){
    height: auto;
    outline: 2px solid black;
  }
`;

export const MapContainer = styled.div`
height: 40vh`


export const InfoBlurb = styled.p`
  color: black;
`;


export const DirectionsDiv = styled.div`

`;

export const FlowList = styled.div`
text-decoration: none;
list-style-type: none;
font-weight: 600;
`