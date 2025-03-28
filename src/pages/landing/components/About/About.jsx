import React from "react";
import aboutUs from "../../../../assets/AboutUs.png";

const About = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        gap: "2rem",
        margin: "0 4rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#5663C2",
            // fontFamily: " Inter",
            fontWeight: " 600",
            fontSize: "1.75rem",
            lineHeight: "100%",
            letterSpacing: " 0%",
          }}
        >
          About
        </div>
        <div
          style={{
            // font-family: Poppins;
            fontWeight: "600",
            fontSize: "2.5rem",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#555555",
            marginTop: "1rem",
          }}
        >
          Hospital Management Software for{" "}
          <span style={{ color: "#25307F" }}>
            Enhanced Healthcare Efficiency
          </span>
        </div>
        <div
          style={{
            color: "#555555B8",
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "1.75rem",
            lineHeight: "100%",
            letterSpacing: "0%",
            marginTop: "2.25rem",
          }}
        >
          Our comprehensive hospital management software helps you manage
          patient records, optimize workflows, and improve overall service
          delivery. Designed for hospitals of all sizes, our system ensures a
          seamless experience for both patients and healthcare providers.
        </div>
      </div>
      <div
        style={{
          // width: "468px",
          height: "28rem",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "5rem",
          borderBottomLeftRadius: "10px",
          backgroundImage: `url(${aboutUs})`,
          backgroundSize: "cover", // Ensures the image covers the whole div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating
          marginTop: "3rem",
        }}
      ></div>
      <div style={{ padding: "7rem 0 0 3rem" }}>
        <div
          style={{
            // fontFamily: "Inter",
            fontWeight: "600",
            fontSize: "1.5rem",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#5663C2",
            paddingLeft: "2rem",
          }}
        >
          Why Us
        </div>
        <div>
          <ul
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              lineHeight: "300%",
              letterSpacing: "0%",
              color: "#555555",
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {" "}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1216"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4714_1216)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
              Role-Based Dashboards
            </li>
            <li
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {" "}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1216"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4714_1216)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
              Appointment Scheduling & Tracking
            </li>
            <li
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {" "}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1216"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4714_1216)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
              Service Rate Management
            </li>
            <li
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {" "}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1216"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4714_1216)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
              Revenue Insights & Reporting
            </li>
            <li
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {" "}
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4714_1216"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="31"
                  height="31"
                >
                  <rect width="31" height="31" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4714_1216)">
                  <path
                    d="M12.3371 23.251L4.97461 15.8885L6.81523 14.0479L12.3371 19.5698L24.1882 7.71875L26.0288 9.55938L12.3371 23.251Z"
                    fill="#5663C2"
                  />
                </g>
              </svg>
              Patient File Management & Treatment Progress
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
