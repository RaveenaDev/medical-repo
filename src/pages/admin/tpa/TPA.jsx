import { useEffect, useState } from "react";
import styles from "./TPA.module.scss";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";
import Companies from "./companies/Companies";
import Patients from "./patients/Patients";

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Searchbar /> <Notifications />
      </div>
      <div className={styles.content}>
        <div className={styles.selection}>
          <div
            onClick={() => handleCompanies()}
            className={`${styles.selectionDiv} ${
              selectedTab === "companies" ? styles.selectedTab : ""
            }`}
          >
            <span>Companies</span>
          </div>
          <div
            onClick={() => handlePatients()}
            className={`${styles.selectionDiv} ${
              selectedTab === "patients" ? styles.selectedTab : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <span>Patients</span>
          </div>
        </div>
        {selectedTab === "companies" ? <Companies /> : <Patients />}
      </div>
    </div>
  );
};

export default TPA;
