import { useEffect, useState } from "react";
import styles from "./TPA.module.scss";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";
import Companies from "./companies/Companies";
import Patients from "./patients/Patients";
import InPatients from "./inPatients/InPatients.jsx";
const TPA = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [selectedTab, setSelectedTab] = useState("companies");

  const handleCompanies = () => {
    setSelectedTab("companies");
  };

  const handlePatients = () => {
    setSelectedTab("patients");
  };

  const handleInPatients = () => {
    setSelectedTab("inpatients");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Searchbar /> <Notifications />
      </div>
      <div className={styles.content}>
        <div className={styles.selection}>
          <div
            onClick={handleCompanies}
            className={`${styles.selectionDiv} ${
              selectedTab === "companies" ? styles.selectedTab : ""
            }`}
          >
            <span>Companies</span>
          </div>

          <div
            onClick={handlePatients}
            className={`${styles.selectionDiv} ${
              selectedTab === "patients" ? styles.selectedTab : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <span>TPA Patients</span>
          </div>

          <div
            onClick={handleInPatients}
            className={`${styles.selectionDiv} ${
              selectedTab === "inpatients" ? styles.selectedTab : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <span>Inpatients</span>
          </div>
        </div>

        {selectedTab === "companies" && <Companies />}
        {selectedTab === "patients" && <Patients />}
        {selectedTab === "inpatients" && <InPatients />}
      </div>
    </div>
  );
};

export default TPA;
