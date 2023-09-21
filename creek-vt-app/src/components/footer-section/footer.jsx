import { NavLink } from "react-router-dom";
import { FooterContainer, FooterBrand } from "./footer.style";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import "./footer.css";

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
          <img className="logo-main" src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" />
        </FooterBrand>
        {localStorage.getItem("isAdmin") !== "1" ? null : (
          <NavLink
            style={{ color: "white", fontSize: "40px" }}
            to="/adminDashboard">
            {" "}
            Admin Dashboard
          </NavLink>
        )}
      </FooterContainer>
    </>
  );
};

export default Footer;
