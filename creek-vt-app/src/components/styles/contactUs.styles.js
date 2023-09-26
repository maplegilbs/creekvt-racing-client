import styled from 'styled-components';

export const ContactUsContainer = styled.div`
.contact-txt-main{
    text-align: center;
    font-family: 'Roboto Serif', serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 60vw;
    margin: auto;
    padding: 25px;
    font-size: 38px;
}

.contact-txt{
    text-align: center;
    font-family: 'Roboto Serif', serif;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 60vw;
    margin: auto;

}
.contact-txt-sub{
    text-align: center;
    font-family: 'Roboto Serif', serif;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 60vw;
    margin: auto;
    font-size: 16px;
}
.btn-main{
    text-align: center;
    justify-content: center;
    margin: auto;
   padding: 10px;
}
#btn-actual{
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
    width: 15em;
    
}

@media screen and (max-width: 600px) {
    .contact-txt-sub{
        font-size: 14px;
    }
}
`;