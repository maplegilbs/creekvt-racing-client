import styled from "styled-components";
import "../../App.css";

export const RaceTitle = styled.div`
    text-align: center;
    font-family: 'Roboto Serif', serif;
    font-size: 28px;
    font-weight: bold;
`
export const YearFilter = styled.div`
display: flex;
justify-content: space-evenly;
// border: 1px solid red;
margin: auto;
font-family: 'Roboto Serif', serif;
`
export const CardContainer = styled.div`

// margin: 5px 0px;

`

export const CardTextContainer = styled.div`
display: flex;
justify-content: center;
border: 2px solid rgb(118,118,118);
padding: 5px;
background-color: #4d7288;
// #4d7288
// #2D2D2D
font-family: 'Roboto Serif', serif;
color: white;
width: 20vw;
margin: 5px 0px;
border-radius: 5px;

@media screen and (max-width: 700px) {
    width: 80vw;
}
`