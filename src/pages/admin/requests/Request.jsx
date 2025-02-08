import { useEffect, useState } from "react";
import "./Request.scss";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";
import NewRequests from "./components/NewRequests/NewRequests";
import OngoingRequests from "./components/OngoingRequests/OngoingRequests";
import PastRequests from "./components/PastRequests/PastRequests";

export default function RequestTabs({ setIsSignUpOrLogin }) {
  useEffect(() => {
    setIsSignUpOrLogin(false);
  }, [setIsSignUpOrLogin]);

  const [activeTab, setActiveTab] = useState("new");

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
}
