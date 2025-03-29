import React from "react";
import Navbar from "./components/Navbar.jsx";
import background from "../../assets/image 7.png";
import play from "../landing/assets/Frame 1.png";
import ContactUs from "./components/ContactUs.jsx";
import Solutions from "./components/solutions/Solutions.jsx";
import About from "./components/About/About.jsx";
import { Services } from "./components/services/Services.jsx";
import Footer from "./components/footer/footer.jsx";

const Base = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "95.5vh", // ye full screen height 100vh isliye nhi di because humne padding use kr rkhi hai
          padding: "18px 3rem 18px 22px",
        }}
      >
        <Navbar />


        <div
          style={{
            marginLeft: "20px",
            marginTop: "8rem",
            width: "34rem",
            backgroundColor: "rgba(210, 213, 238, 0.5)", // Semi-transparent white
            backdropFilter: "blur(10px)", // Blurred effect
            padding: "15px 22px",
            borderRadius: "8px", // Optional for a softer look
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#555555",
              height: "2.4rem",
            }}
          >
            Transform Hospital Operations with Our
          </h2>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#25307F",
              marginBottom: "14px",
            }}
          >
            All-in-One Management Portal
          </h2>
          <p style={{ color: "#555555", fontSize: "19px", width: "485px" }}>
            Streamline workflows, enhance patient care, and optimize revenue
            with role-based access for Admin,Reception, and Doctors.
          </p>
          <button
            style={{
              color: "white",
              marginTop: "22px",
              padding: "6px 28px",
              backgroundColor: "#25307F",
              borderRadius: "16px",
              outline: "none",
            }}
          >
            Show More
          </button>{" "}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "3rem",
            paddingTop: "2rem",
          }}
        >
          <svg
            style={{ cursor: "pointer" }}
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
              <mask
                id="mask0_4714_1206"
                maskType="alpha"
                maskUnits="userSpaceOnUse"
                x="178"
                y="313"
                width="50"
                height="51"
              >
                <rect
                  x="178"
                  y="313.5"
                  width="50"
                  height="50"
                  rx="2"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_4714_1206)">
                <path
                  d="M197.74 351.127C196.408 351.974 194.666 351.018 194.666 349.439V327.559C194.666 325.981 196.408 325.025 197.74 325.872L214.931 336.812C216.166 337.598 216.166 339.401 214.931 340.187L197.74 351.127Z"
                  fill="#25307F"
                />
              </g>
            </g>
            {/*<defs>*/}
            {/*    <filter id="filter0_dddddd_4714_1206" x="-132.62" y="0.380005" width="676.24"*/}
            {/*            height="676.24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">*/}
            {/*        <feFlood floodOpacity="0" result="BackgroundImageFix"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="3.555"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4714_1206"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="7.11"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="effect1_dropShadow_4714_1206"*/}
            {/*                 result="effect2_dropShadow_4714_1206"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="24.885"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="effect2_dropShadow_4714_1206"*/}
            {/*                 result="effect3_dropShadow_4714_1206"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="49.77"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="effect3_dropShadow_4714_1206"*/}
            {/*                 result="effect4_dropShadow_4714_1206"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="85.32"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="effect4_dropShadow_4714_1206"*/}
            {/*                 result="effect5_dropShadow_4714_1206"/>*/}
            {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
            {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
            {/*        <feOffset/>*/}
            {/*        <feGaussianBlur stdDeviation="149.31"/>*/}
            {/*        <feColorMatrix type="matrix"*/}
            {/*                       values="0 0 0 0 0.337255 0 0 0 0 0.388235 0 0 0 0 0.760784 0 0 0 1 0"/>*/}
            {/*        <feBlend mode="normal" in2="effect5_dropShadow_4714_1206"*/}
            {/*                 result="effect6_dropShadow_4714_1206"/>*/}
            {/*        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_4714_1206"*/}
            {/*                 result="shape"/>*/}
            {/*    </filter>*/}
            {/*</defs>*/}
          </svg>
          <p style={{ fontSize: "22px", fontWeight: 500 }}>Explore More</p>
        </div>
      </div>
      <Services />
      <About />
      <Solutions />
      <ContactUs />
      <Footer />
    </>
  );
};
export default Base;
