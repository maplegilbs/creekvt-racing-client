//Styles
import adminStyles from "./adminGlobalStyles.module.css"

export default function ErrorNotice({ message,  setErrorState}) {
    return (
        <div className={`${adminStyles["delete-confirm__container"]}`}>
            <div>
                <p>There was an error performing the selected request.</p>
                <p>{message}</p>
                <p>Please close this and try again or contact gopaddling@creekvt.com to report an issue.</p>
                <div className={`${adminStyles["button-row"]} ${adminStyles["button-row--even-space"]}`}>
                    <button type="button" className="button button--medium" onClick={()=>setErrorState({isInErrorState: false, message: ""})}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}