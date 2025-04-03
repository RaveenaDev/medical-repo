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
        </div>
    );
};

export default Navbar;
