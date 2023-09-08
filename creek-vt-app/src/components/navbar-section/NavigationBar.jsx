import React from 'react';
import {
  NavbarContainer,
  LeftContainer,
  RightContainer, 
  NavbarInnerContainer,
NavbarExtendedContainer, 
  NavbarLinkContainer
} from './NavigationBar.style.js';
import { Link } from 'react-router-dom';





const NavigationBar = (props) => {
  return (
    <>
      <NavbarContainer>
        <NavbarInnerContainer>

          <LeftContainer>
          </LeftContainer>

          <RightContainer>
            <NavbarLinkContainer>
              <Link to="/"></Link>
            </NavbarLinkContainer>
          </RightContainer>

        </NavbarInnerContainer>

        <NavbarExtendedContainer>
        </NavbarExtendedContainer>
      </NavbarContainer>
    </>
  );
}

export default NavigationBar;