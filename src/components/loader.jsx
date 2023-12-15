//Styles
import styles from "./loader.module.css"

export default function Loader({loader_text}) {
    return (
        <>
            <div className={`${styles["loader"]}`}>
                <div className={`${styles["loading_text"]}`}>{loader_text}</div>
                <div className={`${styles["loading_spinner"]}`}></div>
            </div>
        </>
    )
}