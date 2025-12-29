import React, { useEffect, useState } from "react";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";

import "./Billing.scss";
import { Navigate, useNavigate } from "react-router-dom";
import Records from "./components/Records/Records";
import Rate from "./components/Rate/Rate";

const BillingAdmin = ({ setIsSignUpOrLogin }) => {
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("billing Records");
  useEffect(() => {
    setIsSignUpOrLogin(false);
  }, [setIsSignUpOrLogin]);
  return (
    <div className="patients">
      {/* <div className="patientHeader">
        <Searchbar />
        <Notifications />
      </div> */}

      <div className="bill-heading">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => Navigate(`/admin`)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M20 27.5L7.5 15L20 2.5L22.2188 4.71875L11.9375 15L22.2188 25.2813L20 27.5Z"
            fill="black"
          />
        </svg>
        <p>Billings</p>
      </div>
      <div className="content">
        <div className="tabButtons">
          {["billing Records", "rate Management"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {activeTab === "billing Records" && <Records />}
        {activeTab === "rate Management" && <Rate />}
      </div>
    </div>
  );
};

export default BillingAdmin;
