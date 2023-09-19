import styled from 'styled-components';
import '../../App.css';

export const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  outline: 2px solid black;
  height 100vh;
  width: 200vh;
  margin: 2vh auto;
`;

export const CourseMap = styled.div`

`;

export const InfoBlurb = styled.p`

`;

export const Directions = styled.div`

`;

export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.apiKey
  })
)(MapContainer)