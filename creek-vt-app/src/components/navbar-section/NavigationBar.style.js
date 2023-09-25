import styled from "styled-components";
import "../../App.css";
import { Link } from "react-router-dom";

/*Header Nav Styles*/

/* Navbar */

export const NavbarContainer = styled.nav`
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  background-image: linear-gradient(110deg, #4e647b, #293b46);
  box-shadow: 2px 3px 10px 4px;
  margin-bottom: 15px;
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  display: flex;
  flex-direction: column;
  padding: 2px 20px 4px 0;
  position: fixed;

  @media (min-width: 700px) {
    height: 80px;
  }
  styled.navbar-dark,
  styled.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }

  #navbarSupportedContent {
    justify-content: flex-end;
  }
`;


export const NavbarBrand = styled.div`
  nav navbar-brand,
  nav navbar-brand,
  img {
    height: 8.2vh;
    width: auto;
    margin: auto;
    padding: 2px 2px;
  }
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: medium;
  margin: 30px 20px;
  text-decoration: none;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: medium;
  margin: 30px 20px;
  text-decoration: none;
`;

export const LeftContainer = styled.div` {
  flex: 40%;
  display: flex;
  align-items: center;
  padding-left: 15%;

`;

export const RightContainer = styled.div`
  flex: 50%;
  display: flex;
  justify-content: flex-column;
  padding-right: 100px;
`;
export const NavbarLinkContainer = styled.div`
  display: flex;
`;
export const NavDropdown = styled.div`
  .dropdown-menu {
    background-color: #364958;
    border: 0px;
    z-index: 999999;
  }

  .dropdown-item {
    color: #f5f5f5;
    line-height: 28px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
  }

  .dropdown-toggle::after {
    display: none;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  display: inline-block;
  margin-left: 200%;
  position: sticky;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #293b46;
  margin-top 5px
  zIndex: 5;
  position: absolute;
`;

export const DropdownItem = styled(Link)`
  color: white;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: medium;
  margin: 30px 20px;
  text-decoration: none;
  border: 1.5px darkgray solid;
  padding: 10px;
`;
export const NavLink = styled(Link)`
  color: "white",
  fontFamily: "Montserrat, sans-serif",
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: "medium",
  textDecoration: "none",
  margin: "10px 10px",
  border: "1.5px darkgray solid",
  padding: "5px",
;`;

// /* NavbarBrand */
// .navbar-brand,
// .navbar-brand img {
//   height: 66px;
//   padding: 2px 20px;
// }

// /* NavDropdown */
