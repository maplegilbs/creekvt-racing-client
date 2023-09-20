import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  NavbarBrand,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./NavigationBar.style.js";

// let navLinkStyle = {
//   color: "white",
//   fontFamily: "Montserrat, sans-serif",
//   textTransform: "uppercase",
//   fontWeight: 700,
//   fontSize: "medium",
//   textDecoration: "none",
//   margin: "10px 10px",
//   border: "1.5px darkgray solid",
//   padding: "5px",
// };

const NavigationBar = (props) => {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <>
      <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
          <LeftContainer>
            <NavbarBrand>
              <img src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" />
            </NavbarBrand>
          </LeftContainer>

          <RightContainer>
            <NavbarLinkContainer>
              <NavbarLink to="https://creekvt.com/flows">
                Flows & Forecasts
              </NavbarLink>
              <NavbarLink to="https://creekvt.com/map.html">The Map</NavbarLink>
              <NavbarLink to="https://creekvt.com/riverguide/">
                River Guide
              </NavbarLink>
              <NavbarLink to="https://creekvt.com/blog/">Blog</NavbarLink>
              <NavbarLink to="https://creekvt.com/about/">About</NavbarLink>
              <OpenLinksButton
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}>
                {" "}
                {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
              </OpenLinksButton>
            </NavbarLinkContainer>
          </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer>
            <NavbarLink to="https://creekvt.com/flows">
              Flows & Forecasts
            </NavbarLink>
            <NavbarLinkExtended>Flows & Forecasts</NavbarLinkExtended>
            <NavbarLinkExtended to="https://creekvt.com/map.html">
              The Map
            </NavbarLinkExtended>
            <NavbarLinkExtended to="https://creekvt.com/riverguide/">
              River Guide
            </NavbarLinkExtended>
            <NavbarLinkExtended to="https://creekvt.com/blog/">
              Blog
            </NavbarLinkExtended>
            <NavbarLinkExtended to="https://creekvt.com/about/">
              About
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
    </>
  );
};

export default NavigationBar;

//* my profile dropdown incase we need it later
// <NavbarLinkExtended
//   onClick={(e) =>
//     showDropdown === false
//       ? setShowDropdown(true)
//       : setShowDropdown(false)
//   }>
//   <NavbarLinkExtended>My Profile</NavbarLinkExtended>
//   {showDropdown && (
//     <DropdownContainer style={{ zIndex: 4 }}>
//       {/* on dropdown items need to make showsignin/showregister as true and all else pages false */}
//       <NavLink style={navLinkStyle} to={"/signin"}>
//         Signin Here
//       </NavLink>
//       <NavLink style={navLinkStyle} to={"/register"}>
//         Register Here
//       </NavLink>
//     </DropdownContainer>
//   )}
// </NavbarLinkExtended>

//*my profile desktop dropdown incase we need later
// <div style={{ margin: "30px 5px" }}>
//   <NavbarLink onClick={(e) => setShowDropdown(!showDropdown)}>
//     My Profile
//   </NavbarLink>
//   {showDropdown && (
//     <DropdownContainer style={{ zIndex: 4 }}>
//       {firstName ? (
//         <span style={navLinkStyle}>Hello {firstName}</span>
//       ) : (
//         <NavLink style={navLinkStyle} to={"/signin"}>
//           Signin Here
//         </NavLink>
//       )}
//       {firstName ? (
//         <button style={navLinkStyle} onClick={handleLogout}>
//           Logout
//         </button>
//       ) : (
//         <NavLink style={navLinkStyle} to={"/register"}>
//           Register Here
//         </NavLink>
//       )}
//     </DropdownContainer>
//   )}
// </div>

//!stuff needed to change name functionallity with above login stuff
// const [showDropdown, setShowDropdown] = useState(false);
// const [firstName, setFirstName] = useState("");

// useEffect(() => {
//   const storedFirstName = localStorage.getItem("firstName");
//   if (storedFirstName) {
//     setFirstName(storedFirstName);
//   }
// }, []);

// function handleLogout() {
//   localStorage.removeItem("firstName");
//   localStorage.removeItem("token");
//   localStorage.removeItem("isAdmin");
//   window.location.reload();
// }
