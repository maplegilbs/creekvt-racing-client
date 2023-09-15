// const button = document.querySelector("button");

// button.addEventListener("click", () => {
//   console.log("dang it bobby quit clickin that button");
//   fetch('http://127.0.0.1:3000/create-checkout-session', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         items: [
//             {id: 1, quantity: 1}
//         ]
//     })
//   })
//   .then(res => {
//     if(res.ok) return res.json()
//     return res.json().then(json => Promise.reject(json))
//   }).then(({ url }) =>{
//     window.location = url
//   })
//   .catch(e => {
//     console.error(e.error)
//   })
// });


// // create stripe controller
// // dependencies move over
// // onclick move over  