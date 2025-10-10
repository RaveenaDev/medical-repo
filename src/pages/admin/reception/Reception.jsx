import React, { useEffect, useState } from "react";
import ReceptionPage from "./ReceptionPage.jsx";
import CommonPanel from "../Components/CommonPanel.jsx";
import dayjs from "dayjs";
function Reception(props) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
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
        <CommonPanel
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
      <div style={{ marginTop: "20vh" }}>
        {" "}
        <ReceptionPage
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
    </>
  );
}

export default Reception;
