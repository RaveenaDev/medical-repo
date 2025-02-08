import { useEffect, useState } from "react";
import ayu from "../../receptionist/patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";
import NewRequests from "./components/NewRequests/NewRequests";
import OngoingRequests from "./components/OngoingRequests/OngoingRequests";

export default function RequestTabs(props) {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [activeTab, setActiveTab] = useState("new");

  return (
    <>
      <div
        className={ayu.patients}
        style={{ position: "relative", height: "100vh" }}
      >
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("new")}
              className={
                activeTab === "new"
                  ? "bg-gray-800 text-white px-4 py-2 rounded"
                  : "bg-gray-200 px-4 py-2 rounded"
              }
            >
              New Requests
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={
                activeTab === "ongoing"
                  ? "bg-gray-800 text-white px-4 py-2 rounded"
                  : "bg-gray-200 px-4 py-2 rounded"
              }
            >
              Ongoing Requests
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={
                activeTab === "past"
                  ? "bg-gray-800 text-white px-4 py-2 rounded"
                  : "bg-gray-200 px-4 py-2 rounded"
              }
            >
              Past Requests
            </button>
          </div>

          {activeTab === "new" && <NewRequests />}
          {activeTab === "ongoing" && <OngoingRequests />}
          {activeTab === "past" && <PastRequests />}
        </div>
      </div>
    </>
  );
}
