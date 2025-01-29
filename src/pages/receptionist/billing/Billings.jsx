import React, { useEffect, useState } from "react";
import "./billings.scss";
import Searchbar from "../../../components/Searchbar";
import NotificationIcon from "../../../components/Notification";

const Billings = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <div>
      <div className="header">
        <Searchbar />
        <NotificationIcon />
      </div>
    </div>
  );
};

export default Billings;
