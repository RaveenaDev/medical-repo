import React, { useEffect, useState } from "react";
import ReceptionPage from "./ReceptionPage.jsx";
import CommonPanel from "../Components/CommonPanel.jsx";

function Reception(props) {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "200px" }}>
        {" "}
        <ReceptionPage />
      </div>
    </>
  );
}

export default Reception;
