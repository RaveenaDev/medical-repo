import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import {FaFacebook, FaGithub, FaInstagram, FaTwitter} from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
        <div className={styles.navbar}>
            <img className={styles.logo} src="/stepcarelogo.png" alt="Logo" />
            <div className={styles.navItems}>
                <h4>Home</h4>
                <h4>About</h4>
                <h4>Products</h4>
                <h4>Contact Us</h4>
                <div className={styles.authButtons}>
                    <button className={styles.registerBtn}>Register</button>
                    <button className={styles.loginBtn} onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </div>

            <button className={styles.menu} onClick={toggleMenu}>
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id="mask0" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="30"
                          height="30">
                        <rect width="30" height="30" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <path
                            d="M4.53088 22.5V20H27.1398V22.5H4.53088ZM4.53088 16.25V13.75H27.1398V16.25H4.53088ZM4.53088 10V7.5H27.1398V10H4.53088Z"
                            fill="white"
                        />
                    </g>
                </svg>
            </button>
        </div>

            {/* Full-screen menu when open */}
            {menuOpen && (
                <div className={styles.fullscreenMenu}>
                    <div>
                        <button className={styles.closeMenu} onClick={toggleMenu}>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.4 28.1667L19 21.5667L25.6 28.1667L28.1667 25.6L21.5667 19L28.1667 12.4L25.6 9.83333L19 16.4333L12.4 9.83333L9.83335 12.4L16.4334 19L9.83335 25.6L12.4 28.1667ZM19 37.3333C16.4639 37.3333 14.0806 36.8521 11.85 35.8896C9.61946 34.9271 7.67919 33.6208 6.02919 31.9708C4.37919 30.3208 3.07294 28.3806 2.11044 26.15C1.14794 23.9194 0.666687 21.5361 0.666687 19C0.666687 16.4639 1.14794 14.0806 2.11044 11.85C3.07294 9.61944 4.37919 7.67917 6.02919 6.02917C7.67919 4.37917 9.61946 3.07292 11.85 2.11042C14.0806 1.14792 16.4639 0.666666 19 0.666666C21.5361 0.666666 23.9195 1.14792 26.15 2.11042C28.3806 3.07292 30.3209 4.37917 31.9709 6.02917C33.6209 7.67917 34.9271 9.61944 35.8896 11.85C36.8521 14.0806 37.3334 16.4639 37.3334 19C37.3334 21.5361 36.8521 23.9194 35.8896 26.15C34.9271 28.3806 33.6209 30.3208 31.9709 31.9708C30.3209 33.6208 28.3806 34.9271 26.15 35.8896C23.9195 36.8521 21.5361 37.3333 19 37.3333Z"
                                    fill="#8E9BBB"/>
                            </svg>
                        </button>
                        <ul>
                            <li>About</li>
                            <li>Products</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    <div className={styles.footer}>
                        <div>
                            <ul>
                                <li>SRD House, LNB Road, Mangaldoi,Assam,781425</li>
                                <li>Email us: hello@organictea.com</li>
                                <li>Call us: +91 8210687508</li>
                            </ul>
                        </div>

                        <div className={styles.bottom}>
                            <p>@ Copyright 2025</p>
                            <p>All Rights Reserved By NaturaLeaf</p>

                            <div className={styles.footer__icons}>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter className={styles.icon}/>
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebook className={styles.icon}/>
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram className={styles.icon}/>
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub className={styles.icon}/>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
