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
  DropdownContainer,
  DropdownItem,
} from "./NavigationBar.style.js";

const NavigationBar = (props) => {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
              <NavbarLink
                onClick={(e) =>
                  showDropdown === false
                    ? setShowDropdown(true)
                    : setShowDropdown(false)
                }>
                <NavbarLink to="/">My Profile</NavbarLink>
                {showDropdown && (
                  <DropdownContainer style={{ zIndex: 4 }}>
                    <DropdownItem
                      //! need these to change the state of show signin and register
                      onClick={() => {
                        props.setShowSignIn(true);
                        props.setShowRacesMain(false);
                        props.setShowRaceRegistration(false);
                        props.setShowRaceInfo(false);
                        props.setShowRaceResults(false);
                        props.setShowRegisteredRacers(false);
                      }}>
                      signin
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        props.setShowRegister(true);
                        props.setShowRacesMain(false);
                        props.setShowRaceRegistration(false);
                        props.setShowRaceInfo(false);
                        props.setShowRaceResults(false);
                        props.setShowRegisteredRacers(false);
                      }}>
                      Register
                    </DropdownItem>
                  </DropdownContainer>
                )}
              </NavbarLink>
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
              <NavbarLinkExtended to="/">My Profile</NavbarLinkExtended>
              {showDropdown && (
                <DropdownContainer style={{ zIndex: 4 }}>
                  {/* on dropdown items need to make showsignin/showregister as true and all else pages false */}
                  <DropdownItem
                    onClick={() => {
                      props.setShowSignIn(true);
                      props.setShowRegister(false);
                      props.setShowRacesMain(false);
                      props.setShowRaceRegistration(false);
                      props.setShowRaceInfo(false);
                      props.setShowRaceResults(false);
                      props.setShowRegisteredRacers(false);
                    }}>
                    signin
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      props.setShowRegister(true);
                      props.setShowSignIn(false);
                      props.setShowRacesMain(false);
                      props.setShowRaceRegistration(false);
                      props.setShowRaceInfo(false);
                      props.setShowRaceResults(false);
                      props.setShowRegisteredRacers(false);
                    }}>
                    Register
                  </DropdownItem>
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
