import React from "react";
import background from "../../../../assets/image 7.png";
import Navbar from "../navbar/Navbar.jsx";
import styles from "./Hero.module.scss";

const HeroSection = () => {
  return (
    <div
      className={styles["hero-section"]}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className={styles["hero-container"]} id="home">
        <div className={styles["hero-content"]}>
          <div>
            <h2>Transform Hospital Operations with Our</h2>
            <h2>All-in-One Management Portal</h2>
            <p>
              Streamline workflows, enhance patient care, and optimize revenue
              with role-based access for Admin, Reception, and Doctors.
            </p>
          </div>
          <div>
            <button className={styles["show-more-btn"]}>See More</button>
          </div>
        </div>
      </div>

      <div className={styles["explore-section"]}>
        <svg
          width="95"
          height="67"
          viewBox="131 290 144 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_dddddd_4714_1206)">
            <rect
              x="166"
              y="299"
              width="79"
              height="79"
              rx="39.5"
              fill="white"
            />
            <g mask="url(#mask0_4714_1206)">
              <path
                d="M197.74 351.127C196.408 351.974 194.666 351.018 194.666 349.439V327.559C194.666 325.981 196.408 325.025 197.74 325.872L214.931 336.812C216.166 337.598 216.166 339.401 214.931 340.187L197.74 351.127Z"
                fill="#25307F"
              />
            </g>
          </g>
        </svg>
        <p>Explore More</p>
      </div>
    </div>
  );
};

export default HeroSection;
