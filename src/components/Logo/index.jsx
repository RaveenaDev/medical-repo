import React from "react";
import styles from "../../styles/components/logo.module.scss";

const Logo = () => {
  return (
    <div>
      <img
        style={{ width: "170px", height: "70px",marginTop:'1rem',marginBottom:'0.8rem' }}
        src="/sidebar_logo.jpg"
      />
    </div>
  );
};

export default Logo;
