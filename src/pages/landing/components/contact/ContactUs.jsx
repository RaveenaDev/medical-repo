import React, { useState } from "react";
import imageMed from "../../assets/imagemed.png";
import styles from "./Contact.module.scss";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className={styles["contact-container"]}>
            <div className={styles["image-container"]}>
                <img src={imageMed} alt="Medicine" />
            </div>
            <div className={styles["form-container"]}>
                <h3>Contact Us</h3>
                <h2>We're Here to Help !</h2>
                <div className={styles["form-wrapper"]}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className={styles["submit-btn"]}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
