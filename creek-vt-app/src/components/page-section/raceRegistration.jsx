import React, { useContext } from "react";
import { UserContext } from "../store/UserContext";

const RaceRegistration = (props) => {
  const userctx = useContext(UserContext);
  
  async function handlePayButton(){
    fetch('http://localhost:3307/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          items: [
              {id: 1, quantity: 1}
          ]
      })
    })
    .then(res => {
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) =>{
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
  };
  

  return <div><button onClick={handlePayButton}>PAY BUTTON</button></div>;
};

export default RaceRegistration;
