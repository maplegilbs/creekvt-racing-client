import styled from 'styled-components';

export const RaceResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
    height: 100%;
    width: 80vw;
    margin: auto;
    margin-top: 15px;
    bottom: 0;
    

    .h2 {
        
    }

.main-txt{
    text-align: center;
    font-family: 'Roboto Serif', serif;
    font-weight: 600;
    padding: 0px;
    height: 10vh;
}
@media screen and (max-width:700px){
    height: 60vh;
}
`;

export const GridContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
font-family: Montserrat;
color: black;

.data-grid {
    
}
@media screen and (max-width:700px){
    width: 80vw;
    height: 80vh;
}
`;