import React, { useEffect, useState } from "react";

const BillingAdmin = ({ setIsSignUpOrLogin }) => {
  const [activeTab, setActiveTab] = useState("new");
  useEffect(() => {
    setIsSignUpOrLogin(false);
  }, [setIsSignUpOrLogin]);
  return (
    <div className="patients">
      <div className="patientHeader">
        <Searchbar />
        <Notifications />
      </div>
      <div className="content">
        <div className="tabButtons">
          {["new", "ongoing", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
            </button>
          ))}
        </div>
        {activeTab === "new" && <NewRequests />}
        {activeTab === "ongoing" && <OngoingRequests />}
        {activeTab === "past" && <PastRequests />}
      </div>
    </div>
  );
};

export default BillingAdmin;
