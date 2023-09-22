import styled from "styled-components";
import "../../App.css";


// footer section

export const FooterContainer = styled.nav`
  width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	background-image: linear-gradient(180deg, #4e647b, #293b46);
	padding-top: 30px;
	padding-bottom: 30px;

  @media screen and (max-width: 640px) {
      flex-direction: column;
    
`;

export const FooterBrand = styled.div`
flex-basis: 33%;
padding: 0;
font-family: 'Montserrat';


  img{
  margin: 0 auto;
	width: 100px;
	height: 100px;
	display: block;
  }
 p {
  padding: 0;
	list-style: none;
	color: white;
	font-family: "Montserrat", sans-serif;
	font-size: 15px;
	font-weight: 700;
	line-height: 27px;
	text-align: center;
	text-transform: uppercase;
  margin-bottom: 0px;
 }
 ul{
  padding: 0;
	list-style: none;
	color: white;
	font-family: "Montserrat", sans-serif;
	font-size: 15px;
	font-weight: 700;
	line-height: 27px;
	text-align: center;
	text-transform: uppercase;
 }
 
 li a{
  color: white;
	line-height: 37px;
  text-decoration: none;
 }
 
 li a:visited{
  color: white;
	line-height: 37px;
 }
@media screen and (max-width: 640px){
		margin-top: 20px;
		margin-bottom: 25px;
  
  li {
    line-height: 37px;
  }

 
	
	
`
