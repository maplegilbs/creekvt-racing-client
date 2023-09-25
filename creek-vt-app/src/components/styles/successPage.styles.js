import styled from 'styled-components';


export const SuccessPageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 40vh auto;
align-items: center;

@media (max-width: 800px) {
    margin: 30vh auto;
}


.thx - header{
    display: flex;
    justify-content: center;
    font-family: 'Roboto Serif', serif;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    /* padding: 5px; */
    margin-bottom: 20vh;
}
.thx-txt{
    display: flex;
    justify-content: center;
    font-family: 'Roboto Serif', serif;
    text-align: center;
    margin-bottom: 20px;
}
.btn-cont{
    display: flex;
    flex-direction: column;
    margin: auto;
    gap: 5px;

}
.btn-style{
    background: linear-gradient(45deg,#e1eaf4, #4d7288);
      color: white;
      padding: 10px;
      margin: 0 auto;
      border: 2px solid rgb(118,118,118);
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: .8em;
      text-transform: uppercase;
      text-shadow: 1px 1px 5px #333;
      border-radius: 5px;
      width: 30em;
}
.spinner-icon{
    display: flex;
    justify-content: center;
}
`;
