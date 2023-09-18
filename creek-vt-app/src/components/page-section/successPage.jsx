import { Button } from "reactstrap"
import "./successPage.css"
const SuccessPage = (props) => {
    
    let passedInfo = JSON.parse(localStorage.getItem("userInfo"))
    
    console.log(passedInfo)
   
    return ( 
        <>
        
        <h2 className="thx-header">Thanks for registering!</h2>
        <h5 className="thx-txt">Your reciept will be sent to the email address you provided shortly.</h5>
        <h5 className="thx-txt">Click on one of the races below to see all the registered racers!</h5>
        <div className="btn-cont">
            <Button className="btn-style">New Haven Ledges Race</Button>
            <Button className="btn-style">Peavine Race</Button>
            
        </div>
        </>
     );
}
 
export default SuccessPage;