import React from "react";
import styles from "../../styles/components/logo.module.scss";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "12px",
        marginLeft: "6px",
        alignItems: "center",
        height: "12vh",
      }}
    >
      <img
        style={{
          width: "14vw",
          height: "12vh",
          marginTop: "0rem",
          marginBottom: "0",
        }}
        src="/newlogo.png"
//         src="/sidebar_logo.jpg"
      />
    </div>
  );
};

export default Logo;
