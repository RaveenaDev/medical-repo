import React from "react";
import aboutUs from "../../../../assets/AboutUs.png";
import "./about.scss";

const About = () => {
  return (
    <div className="about-container" id="about">
      <div className="about-text">
        <div className="about-title">About</div>
        <div className="about-heading">
          Hospital Management Software for{" "}
          <span className="highlight">Enhanced Healthcare Efficiency</span>
        </div>
        <div className="about-description">
          Our comprehensive hospital management software helps you manage
          patient records, optimize workflows, and improve overall service
          delivery. Designed for hospitals of all sizes, our system ensures a
          seamless experience for both patients and healthcare providers.
        </div>
      </div>

      <div className="about-image"></div>

      <div className="about-why-us">
        <div className="why-us-title">Why Us</div>
        <ul className="why-us-list">
          <li className="why-us-item">
            <p className="why-us-icon">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="checkmark-mask"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#checkmark-mask)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
            </p>
            <p className="why-us-text">Role-Based Dashboards</p>
          </li>

          <li className="why-us-item">
            <p className="why-us-icon">
              {/* Reuse same SVG */}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#checkmark" />
              </svg>
            </p>
            <p className="why-us-text">Appointment Scheduling & Tracking</p>
          </li>

          <li className="why-us-item">
            <p className="why-us-icon">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#checkmark" />
              </svg>
            </p>
            <p className="why-us-text">Service Rate Management</p>
          </li>

          <li className="why-us-item">
            <p className="why-us-icon">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#checkmark" />
              </svg>
            </p>
            <p className="why-us-text">Revenue Insights & Reporting</p>
          </li>

          <li className="why-us-item">
            <p className="why-us-icon">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#checkmark" />
              </svg>
            </p>
            <p className="why-us-text">
              Patient File Management & Treatment Progress
            </p>
          </li>
        </ul>

        <svg style={{ display: "none" }}>
          <symbol id="checkmark" viewBox="0 0 31 31" fill="none">
            <mask
              id="checkmark-mask"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="31"
              height="31"
            >
              <rect width="31" height="31" fill="#D9D9D9" />
            </mask>
            <g mask="url(#checkmark-mask)">
              <path
                d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                fill="#5663C2"
              />
            </g>
          </symbol>
        </svg>
      </div>
    </div>
  );
};

export default About;
