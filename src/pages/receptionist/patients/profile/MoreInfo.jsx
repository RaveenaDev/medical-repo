import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MedicalInfo from "./MedicalInfo";
import rav from "../../styles.module.scss";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./profile.module.scss";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo.jsx";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import FileDocuments from "./FileDocuments";
import { useLocation } from "react-router-dom";
import PatientHeader from "./components/PatientHeader.jsx";

const MoreInfo = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const location = useLocation();
  const { medicalHistory, currentMedications, symptoms, history, patient } =
    location.state || {};

  return (
    <>
      <div style={{ height: "88vh" }}>
        {!props.entity ? (
          <>
            <PatientHeader showEditPatients={false} patient={patient} />
            <div
              style={{
                height: "80vh", // Full viewport height
                padding: "1rem",
                marginBottom: "1rem",
                marginTop: "50px",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  height: "100%", // Full height of the grid item
                  padding: "20px",
                  textAlign: "left",

                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <MedicalInfo
                  patient={patient}
                  medicalHistory={medicalHistory}
                  currentMedications={currentMedications}
                  symptoms={symptoms}
                  history={history}
                  showButton={false} // Hide the button
                />
              </div>
              <div
                style={{
                  height: "100%", // Full height of the grid item
                  padding: "20px",
                  textAlign: "center",

                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <FileDocuments />
              </div>
            </div>
          </>
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
};

export default MoreInfo;
