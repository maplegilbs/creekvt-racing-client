//Styles
import styles from "./adminHeader.module.css"

export default function AdminHeader({userInfo, editSelection}) {

    return (
        <>
        <h4 className={`${styles['welcome-heading']}`}>Welcome {userInfo.name}.</h4>
        </>
    )
}