import React from "react";
import styles from "../../styles/components/logo.module.scss";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        alignItems: "center",
        height: "12vh",
      }}
    >
      <img
        style={{
          width: "170px",
          height: "70px",
          marginTop: "0rem",
          marginBottom: "0",
        }}
        src="/sidebar_logo.jpg"
      />
    </div>
  );
};

export default Logo;
