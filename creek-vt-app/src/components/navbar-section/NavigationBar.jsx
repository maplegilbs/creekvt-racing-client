import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  DropdownContainer,
} from "./NavigationBar.style.js";
let navLinkStyle = {
  color: "white",
  fontFamily: "Montserrat, sans-serif",
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: "medium",
  textDecoration: "none",
  margin: "10px 10px",
  border: "1.5px darkgray solid",
  padding: "5px",
};

const NavigationBar = (props) => {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);
  function handleLogout() {
    localStorage.removeItem("firstName");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.reload();
  }

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
              <NavbarLink to="/">Flows & Forecasts</NavbarLink>
              <NavbarLink to="/">The Map</NavbarLink>
              <NavbarLink to="/">River Guide</NavbarLink>
              <NavbarLink to="/">Blog</NavbarLink>
              <NavbarLink to="/">About</NavbarLink>
              <div style={{ margin: "30px 5px" }}>
                <NavbarLink onClick={(e) => setShowDropdown(!showDropdown)}>
                  My Profile
                </NavbarLink>
                {showDropdown && (
                  <DropdownContainer style={{ zIndex: 4 }}>
                    {firstName ? (
                      <span style={navLinkStyle}>Hello {firstName}</span>
                    ) : (
                      <NavLink style={navLinkStyle} to={"/signin"}>
                        Signin Here
                      </NavLink>
                    )}
                    {firstName ? (
                      <button style={navLinkStyle} onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <NavLink style={navLinkStyle} to={"/register"}>
                        Register Here
                      </NavLink>
                    )}
                  </DropdownContainer>
                )}
              </div>
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
            <NavbarLink to="/">Flows & Forecasts</NavbarLink>
            <NavbarLinkExtended to="/">The Map</NavbarLinkExtended>
            <NavbarLinkExtended to="/">River Guide</NavbarLinkExtended>
            <NavbarLinkExtended to="/">Blog</NavbarLinkExtended>
            <NavbarLinkExtended to="/">About</NavbarLinkExtended>
            <NavbarLinkExtended
              onClick={(e) =>
                showDropdown === false
                  ? setShowDropdown(true)
                  : setShowDropdown(false)
              }>
              <NavbarLinkExtended>My Profile</NavbarLinkExtended>
              {showDropdown && (
                <DropdownContainer style={{ zIndex: 4 }}>
                  {/* on dropdown items need to make showsignin/showregister as true and all else pages false */}
                  <NavLink style={navLinkStyle} to={"/signin"}>
                    Signin Here
                  </NavLink>
                  <NavLink style={navLinkStyle} to={"/register"}>
                    Register Here
                  </NavLink>
                </DropdownContainer>
              )}
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
    </>
  );
};

export default NavigationBar;
