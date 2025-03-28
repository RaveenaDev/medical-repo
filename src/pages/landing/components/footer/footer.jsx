import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content-block">
          <div className="footer__column">
            <div className="heading">Company</div>
            <div>Home</div>
            <div>About</div>
            <div>Products</div>
            <div>News</div>
          </div>
          <div className="footer__column">
            <div className="heading">Help</div>
            <div>Customer Support</div>
            <div>Delivery Details</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
          </div>
        </div>
        <div className="footer__content-block">
          <div className="footer__column">
            <div className="heading">Resources</div>
            <div> Blogs</div>
            <div>Youtube Channel</div>
          </div>
          <div className="footer__column">
            <div className="heading">Get in touch</div>
            <div className="address">
              {" "}
              SRD House, LNB Road, Mangaldoi, Assam,784125
            </div>

            <div className="address">Email us : hello@organictea.com</div>

            <div className="address">Call us: +91 8210687508</div>
          </div>
        </div>
      </div>
      <div className="footer__divider"></div>
      <div className="footer__bottom">
        <div className="copyright-info">
          © Copyright 2024, All Rights Reserved by NaturaLeaf
        </div>
        <div className="footer__icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
