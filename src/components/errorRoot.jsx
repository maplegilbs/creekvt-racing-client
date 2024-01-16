//Components
import ContactForm from "./contactForm";
import Header from "./header";
//Hooks
import { useState } from "react";

export default function RootErrorElement() {
    const [wasContactFormSubmitted, setWasContactFormSubmitted] = useState(null)
    return (
        <>
            <Header />
            <div style={{ maxWidth: "95%", margin: "0 auto" }}>
                <br />
                <h4>Whoops!  This page can't be found.</h4>
                <br />
                <br />
                <h4>Go back to the <a style={{ display: "inline-flex" }} className={"button button--medium"} href="/races">Races Page</a> to explore Vermont Whitewater Racing</h4>
                <hr />
                <ContactForm
                    contactEmail={"races@creekvt.com"}
                    message={"Think there should be something here?  Contact us to let us know."}
                    setWasContactFormSubmitted={setWasContactFormSubmitted} />
            </div>
            <br/>
            <br/>
        </>
    )
}