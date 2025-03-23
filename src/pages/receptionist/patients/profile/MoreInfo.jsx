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
            <Grid
              container
              spacing={2}
              style={{
                height: "80vh", // Full viewport height
                padding: "1rem",
                marginBottom: "1rem",
                marginTop: "50px",
              }}
            >
              <Grid xs={6}>
                <Paper
                  elevation={3}
                  style={{
                    height: "100%", // Full height of the grid item
                    padding: "20px",
                    textAlign: "left",
                    width: "35vw",
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
                </Paper>
              </Grid>
              <Grid xs={6}>
                <Paper
                  elevation={3}
                  style={{
                    height: "100%", // Full height of the grid item
                    padding: "20px",
                    textAlign: "center",
                    width: "33.5vw",
                  }}
                >
                  <FileDocuments />
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
};

export default MoreInfo;
