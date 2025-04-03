import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
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

            <div className={styles.menu}>
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
            </div>
        </div>
    );
};

export default Navbar;
