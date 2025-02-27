import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MedicalInfo from "./MedicalInfo";
import rav from "./styles.module.scss";
import FileDocuments from "./FileDocuments";
import PatientHeader from "./components/PatientHeader.jsx";
import {useLocation} from "react-router-dom";

const History = (props) => {

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

    const location = useLocation();
    const { medicalHistory,currentMedications,symptoms,history,patient } = location.state || {};

  return (
      <>
        <div className={rav.receptionist}>
              <>
                <PatientHeader showEditPatients={false} patient={patient} />
                <Grid
                    container
                    spacing={2}
                    style={{
                      height: "100vh", // Full viewport height
                      padding: "1rem",
                    }}
                >
                  <Grid xs={6}>
                    <Paper
                        elevation={3}
                        style={{
                          height: "100%", // Full height of the grid item
                          padding: "20px",
                          textAlign: "left",
                          width: "30vw",
                        }}
                    >
                      <MedicalInfo
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
                          width: "30vw",
                        }}
                    >
                      <FileDocuments />
                    </Paper>
                  </Grid>
                </Grid>
              </>
        </div>
      </>
  );
};

export default History;
