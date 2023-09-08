import styled from 'styled-components';
import '../../App.css';
import { Link } from 'react-router-dom';
/*Header Nav Styles*/

/* Navbar */

export const NavbarContainer = styled.nav`
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  background-image: linear-gradient(110deg, #4e647b, #293b46);
  box-shadow: 2px 3px 10px 4px;
  margin-bottom: 20px;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 2px 20px 4px 0;

 styled.navbar-dark styled.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
 }

#navbarSupportedContent {
  justify-content: flex-end;
}
`;

export const LeftContainer = styled.div` {
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 15%;

`;

export const NavbarBrand = styled.div`
nav navbar-brand,
nav navbar-brand img {
  height: 80px;
  padding: 2px 20px;
  background-color: red;
}
`


export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: medium;
  margin: 30px 10px;
  text-decoration: none;
`;

export const RightContainer = styled.div`
flex: 30%;
display: flex;
justify-content: flex-end;
padding-right: 50px;
`

export const NavbarInnerContainer = styled.div`
width: 100%;
height: 80px;
display: inline-block;
`
export const NavbarExtendedContainer = styled.div`

`


// /* NavbarBrand */
// .navbar-brand,
// .navbar-brand img {
//   height: 66px;
//   padding: 2px 20px;
// }

// /* NavDropdown */

// .dropdown-menu {
//   background-color: #364958;
//   border: 0px;
//   z-index: 999999;
// }

// .dropdown-item {
//   color: #f5f5f5;
//   line-height: 28px;
//   text-transform: uppercase;
//   font-weight: 700;
//   font-size: 14px;
// }

// .dropdown-toggle::after {
//   display: none;
// }