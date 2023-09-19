import styled from 'styled-components';


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const HeaderContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
`;

export const CreekLogo = styled.img`
  width: 90%;
  height: 60vh;
  object-fit: cover;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const LogoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #008CBA;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;

  &:hover .overlay {
    height: 100%;
  }
`;

export const OverlayText = styled.p`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Blurb = styled.p`

`;