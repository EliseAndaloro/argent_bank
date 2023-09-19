import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">
        Copyright {new Date().getFullYear()} Argent Bank
      </p>
    </div>
  );
};

export default Footer;
