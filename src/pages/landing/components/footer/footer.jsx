import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__column">
          <div className="heading">Company</div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div className="footer__column">
          <div className="heading">Help</div>
          <div>Customer Support</div>
          <div>Delivery Details</div>
          <div>Terms & Conditions</div>
          <div>Privacy Policy</div>
        </div>

        <div className="footer__column ">
          <div className="heading">Resources</div>
          <div> Blogs</div>
          <div>Youtube Channel</div>
        </div>
        <div className="footer__column address-col">
          <div className="heading">Get in touch</div>
          <div className="address">
            {" "}
            <a
              href="https://www.google.com/maps/place/Reliable+Tech+Park/@19.1699746,73.0013554,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7bf5fad9a6ebb:0xff55fed18a75a987!8m2!3d19.1699746!4d73.0013554!16s%2Fg%2F1hd_wnr99?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D
            "
              target="_blank"
              rel="noopener noreferrer"
            >
              12B, Reliable Tech Park, C Wing, Thane – Belapur Rd, MIDC, Airoli,
              Mumbai, Navi Mumbai, Maharashtra 400708
            </a>
          </div>

          <div className="address">Email us: contact@steptechindia.com</div>
          <div className="address">Call us: +91-8692845191</div>
        </div>
      </div>
      <div className="footer__divider"></div>
      <div className="footer__bottom">
        <div className="copyright-info">
          <p> © Copyright 2025</p>
          <p> All Rights Reserved by Step Group of Companies</p>
        </div>
        <div className="footer__icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="footer-icon" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="footer-icon" />
          </a>
          <a
            href="https://www.instagram.com/stepconsultancy_?igsh=dnFtcHVyNDdvMWY3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="footer-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/step-consultancyy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="footer-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
