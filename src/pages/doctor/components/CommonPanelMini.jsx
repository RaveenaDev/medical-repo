import { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";

const CommonPanelMini = () => {
  return (
    <>
      <div className={ayu.patients}>
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>

        <div className={ayu.cardhandling} style={{ marginTop: "-4rem" }}>
          <h4 className={ayu.heading}>Good Morning, Dr. Amit Patil</h4>
          <p>
            I hope you are in good mood because there are 45 patients waiting
            for you.
          </p>
        </div>
      </div>
    </>
  );
};
export default CommonPanelMini;
