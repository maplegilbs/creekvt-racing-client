import { useState, useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_VIEW_RACES_BY_NAME } from "../../constants/endpoints";
import "./contactUs.css"
const ContactUs = (props) => {
    const { raceName } = useParams();
    const [race, setRace] = useState({});
    const navigate = useNavigate();
    async function getContactInfo() {
        try {
            let requestOptions = {
                method: "GET",
            };
            const response = await fetch(API_VIEW_RACES_BY_NAME + raceName, requestOptions)
            const data = await response.json();
            console.log(data)
            setRace(data.races[0]);
        } catch (error) {
            console.log(error);
        }
    }

    function handleClick() {
        window.location.href = "https://creekvt.com/contact/"
    }

    useEffect(() => {
        getContactInfo()
    }, []);
    return ( 
        <>
        <h2 className="contact-txt-main">Contact Us!</h2>
        <h4 className="contact-txt">Organization: {race.affiliatedOrganization}</h4>
        <h4 className="contact-txt">Contact Information: {race.organizerContact}</h4>
        <p className="contact-txt-sub">If you have any general questions, would like to help out with some projects, or possibly just want to connect with other members of the community you can access our main contact page via the button below.  </p>
        <div className="btn-main">
        <Button id="btn-actual"  onClick={handleClick}>Main Contact Page</Button></div>
        </>
     );
}
 
export default ContactUs;