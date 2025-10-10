import React, { useEffect, useState } from "react";
import styles from "./TPA.module.scss";
import Searchbar from "../../../components/Searchbar";
import Notifications from "../../../components/NotificationFunc/Notification";
import Companies from "./companies/Companies";
import Patients from "./patients/Patients";
import AdmissionRequests from "./inPatients/AdmissionRequests";
import ayu from "../departments/departments.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
    setSelectedTab("admissionRequests");
  };

  return (
      <div className={styles.container}>
        {/*<div className={styles.header}>*/}
        {/*  <Searchbar /> <Notifications />*/}
        {/*</div>*/}

        <div style={{display: "flex", alignItems: "center"}}>
          <button className={styles.backButton}>
            <ArrowBackIosIcon/>
          </button>
          <h2 className={styles.head}>TPA</h2>
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
                style={{cursor: "pointer"}}
            >
              <span>TPA Patients</span>
            </div>

            <div
                onClick={handleInPatients}
                className={`${styles.selectionDiv} ${
                    selectedTab === "admissionRequests" ? styles.selectedTab : ""
                }`}
                style={{cursor: "pointer"}}
            >
              <span>Admission Forms</span>
            </div>
          </div>

          {selectedTab === "companies" && <Companies/>}
          {selectedTab === "patients" && <Patients/>}
          {selectedTab === "admissionRequests" && <AdmissionRequests/>}
        </div>
      </div>
  );
};

export default TPA;
