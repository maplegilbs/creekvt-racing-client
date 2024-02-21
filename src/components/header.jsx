//Styles
import styles from './header.module.css'

export default function Header() {

    return (
        <nav className={`${"navbar navbar-expand-lg navbar-dark bg-dark"} ${styles["navbar"]} ${styles["navbar-dark"]}`}>
            <a className={`${"navbar-brand mobile-hide"} ${styles["navbar-brand"]}`} href="https://creekvt.com">
                <img className={`${styles["navbar-brand-image"]}`}
                    src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" /></a>
            <button className={`${"navbar-toggler"} ${styles["navbar-toggler"]}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={`${"navbar-toggler-icon"} ${styles["navbar-toggler-icon"]}`}></span>
            </button>
            <div className={`${"collapse navbar-collapse"} ${styles["navbarSupportedContent"]}`} id="navbarSupportedContent">
                <ul className={`${"nav navbar-nav"}`}>
                    <li className={`${"nav-item dropdown"}`}>
                        <a className={`${"nav-link dropdown-toggle d-flex justify-content-start"} ${styles["dropdown-toggle"]} ${styles["nav-link"]}`} href="https://creekvt.com/flows"
                            id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            Flows
                        </a>
                        <div className={`${"dropdown-menu flex-column"} ${styles["dropdown-menu"]}`} aria-labelledby="navbarDropdown">
                            <a className={`${"dropdown-item"} ${styles["dropdown-item"]}`} href="https://creekvt.com/flows">Current Flows</a>
                            <a className={`${"dropdown-item"} ${styles["dropdown-item"]}`} href="https://creekvt.com/river-level-reporting">Level Reporting</a>
                        </div>
                    </li>
                    <hr className={`${"mobile-show"}`} />
                    <li className={`${"nav-item d-flex justify-content-start"}`}>
                        <a className={`${"nav-link"} ${styles["nav-link"]}`} href="https://creekvt.com/riverguide">Guide</a>
                    </li>
                    <hr className={`${"mobile-show"}`} />
                    <li className={`${"nav-item d-flex justify-content-start"}`}>
                        <a className={`${"nav-link"} ${styles["nav-link"]}`} href="https://creekvt.com/blog">Blog</a>
                    </li>
                    <hr className={`${"mobile-show"}`} />
                    <li className={`${"nav-item d-flex justify-content-start"}`}>
                        <a className={`${"nav-link"} ${styles["nav-link"]}`} href="/races">Races</a>
                    </li>
                    <hr className={`${"mobile-show"}`} />
                    <li className={`${"nav-item d-flex justify-content-start"}`}>
                        <a className={`${"nav-link"} ${styles["nav-link"]}`} href="https://creekvt.com/map.html">Map</a>
                    </li>
                    <hr className={`${"mobile-show"}`} />
                    <li className={`${"nav-item d-flex justify-content-start"}`}>
                        <a className={`${"nav-link"} ${styles["nav-link"]}`} href="https://creekvt.com/about">About</a>
                    </li>
                </ul>
            </div>
            <a className={`${"navbar-brand mobile-show"} ${styles["navbar-brand"]}`} href="https://creekvt.com"><img className={`${styles["navbar-brand-image"]}`} height="42px"
                src="https://creekvt.com/wp-content/uploads/2019/04/MobileLogo7.png" /></a>
        </nav>
    )

}