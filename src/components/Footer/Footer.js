import React from 'react';
import "./Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <h3 className="footer__logo">Enclave</h3>
          <p className="footer__description">© 2007 - 2019 TRG-Enclave. All Rights Reserved. Terms and Conditions.</p>
        </div>
        <div className="footer__right">
          <ul className="footer__links">
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <ul className="footer__social-links">
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
