//Styles
import styles from "./loader.module.css"

export default function Loader({ loader_text, bottom_text }) {
    return (
        <>
            <div className={`${styles["loader"]}`}>
                {loader_text &&
                    <div className={`${styles["loading_text"]}`}>{loader_text}</div>
                }
                <div className={`${styles["loading_spinner"]}`}></div>
                {bottom_text &&
                    <div className={`${styles["loading_text"]}`}>{bottom_text}</div>
                }
            </div>
        </>
    )
}