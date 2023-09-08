import React from 'react';
import {
  NavbarContainer,
  LeftContainer,
  RightContainer, 
  NavbarInnerContainer,
NavbarExtendedContainer, 
  NavbarLinkContainer,
  NavbarLink,
  NavbarBrand,
  NavDropdown
} from './NavigationBar.style.js';






const NavigationBar = (props) => {
  return (
    <>
      <NavbarContainer>
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
            </NavbarLinkContainer>
          </RightContainer>
<div>Register</div>
        </NavbarInnerContainer>
        
        <NavbarExtendedContainer>
          
        </NavbarExtendedContainer>
      </NavbarContainer>
    </>
  );
}

export default NavigationBar;