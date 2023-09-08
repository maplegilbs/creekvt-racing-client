import React, { useState } from 'react';
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
  NavbarLinkExtended
} from './NavigationBar.style.js';





const NavigationBar = (props) => {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <>
      <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>

          <LeftContainer>
            
            <NavbarBrand>
              <img
                src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png"/>
            </NavbarBrand>
            
          </LeftContainer>

          <RightContainer>
            <NavbarLinkContainer>
              <NavbarLink to="/">Flows & Forecasts</NavbarLink>                            
              <NavbarLink to="/">The Map</NavbarLink>
              <NavbarLink to="/">River Guide</NavbarLink>
              <NavbarLink to="/">Blog</NavbarLink>
              <NavbarLink to="/">About</NavbarLink>
              <OpenLinksButton onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}> {extendNavbar ? <>&#10005;</> : <>&#8801;</>}</OpenLinksButton>
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
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
    </>
  );
}

export default NavigationBar;