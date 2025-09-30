import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./patients.module.scss";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import PatientList from "./PatientList.jsx";
import CommonPanel from "../components/CommonPanel.jsx";
import {ChevronLeft} from "lucide-react";

const Patients = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  return (
    <div
      className={styles.patients}
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div>
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
          <CommonPanel />
        </div>
        <div
          className={styles.patientListContainer}
          style={{ marginTop: "155px", height: "80vh", overflowY: "auto" }}
        >
          {!props.entity ? (
            <div className={styles.section}>
                <div className={styles.headerLeft}>
                    <ChevronLeft
                        size={28}
                        strokeWidth={1.7}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    />
                    <p className={styles.title}>Patient List</p>
                </div>
                <PatientList/>

              {/* <button onClick={() => navigate('/profile')} style={{backgroundColor: "white"}}>
            Click here to view the profile
          </button> */}
            </div>
          ) : (
            <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
