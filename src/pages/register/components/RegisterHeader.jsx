import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const RegisterHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="register_Header">
      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
        >
          <path
            d="M20 27.5L7.5 15L20 2.5L22.2188 4.71875L11.9375 15L22.2188 25.2813L20 27.5Z"
            fill="black"
          />
        </svg>
      </div>
      <h2>Register</h2>
      <div className="register_Header-Login">
        Already a Member?
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default RegisterHeader;
