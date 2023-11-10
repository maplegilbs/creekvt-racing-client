//Contexts
import { useContext } from "react";
import { UserInfoContext } from "../pages/layout.jsx";
//Styles
import styles from "./footer.module.css"


const Footer = (props) => {
  const userInfo = useContext(UserInfoContext)[0];
  
  return (
    <>
      <footer className={styles["primary-footer"]}>
        <div className={styles["footer-items"]}>
          <img  src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" />
        </div>
         <div className={styles["footer-items"]}>
        <ul>
                <li><a title="River Guide" href="https://creekvt.com/riverguide/">River Guide</a></li>
                <li><a href="https://creekvt.com/map.html">The Map</a></li>
                <li><a title="River Level Reporting" href="https://creekvt.com/river-level-reporting/">River Level
                        Reporting</a></li>
                <li><a href="https://creekvt.com/blog/">Blog</a></li>
                <li><a href="https://creekvt.com/about/">About</a></li>
                <li><a href="https://creekvt.com/contact/">Contact</a></li>
                {userInfo ?
                <li><a href="http://localhost:3001/races/adminDashboard">Admin Dashboard</a></li> :
                <li><a href="http://localhost:3001/races/adminLogin">Organizer Login</a></li>
                }
            </ul>
        </div>
         <div className={styles["footer-items"]}>
            <p>Creek VT 2023</p>
            <p>Thanks For Visiting</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
