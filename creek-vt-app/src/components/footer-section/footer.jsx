import { NavLink } from "react-router-dom";
import { FooterContainer, FooterBrand, NavFooterButtons } from "../styles/footer.styles";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
// import "./footer.css";
import '../styles/footer.styles';

const Footer = (props) => {
  const userctx = useContext(UserContext);
  function checkAdminPriv() {
    userctx.updateAdminCred(localStorage.getItem("isAdmin"));
  }
  useEffect(() => {
    checkAdminPriv();
  }, [localStorage.getItem("isAdmin")]);
  return (
    <>
      <FooterContainer className="footer-main">
        <NavLink to="/signin" style={{ color: "#4e647b", fontSize: "3px" }}>
          .
        </NavLink>
        <FooterBrand>
          <img  src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" />
        </FooterBrand>
        {localStorage.getItem("isAdmin") !== "1" ? null : (
          <NavLink
            style={{ color: "white", fontSize: "35px", margin: "auto auto" }}
            to="/adminDashboard">
            {" "}
            Admin Dashboard
          </NavLink>
        )}
        <FooterBrand>
        <ul>
                <li><a title="River Guide" href="https://creekvt.com/riverguide/">River Guide</a></li>
                <li><a title="River Level Reporting" href="https://creekvt.com/river-level-reporting/">River Level
                        Reporting</a></li>
                <li><a href="https://creekvt.com/map.html">The Map</a></li>
                <li><a href="https://creekvt.com/blog/">Blog</a></li>
                <li><a href="https://creekvt.com/about/">About</a></li>
                <li><a href="https://creekvt.com/contact/">Contact</a></li>
            </ul>
        </FooterBrand>
        <FooterBrand>
            <p>Creek VT 2023</p>
            <p>Thanks For Visiting</p>
        </FooterBrand>
      </FooterContainer>
    </>
  );
};

export default Footer;
