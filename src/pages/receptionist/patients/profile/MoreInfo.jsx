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
import PatientHeader from "./components/PatientHeader.jsx";

const MoreInfo = (props) => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [symptoms, setSymptoms] = useState([]); // State for symptoms
  const [socialHistory, setSocialHistory] = useState([]); // State for social history

  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchData = async () => {
      // backend response structure
      const response = {
        medicalHistory: [
          "Type 2 diabetes diagnosed 5 years ago",
          "Hypertension diagnosed 3 years ago",
          "Family history of heart disease (father)",
        ],
        currentMedications: [
          "Metformin (for diabetes)",
          "Lisinopril (for hypertension)",
          "Aspirin (for heart health)",
        ],
        symptoms: ["Fatigue", "Frequent urination", "Headaches"],
        socialHistory: [
          "Non-smoker",
          "Occasional alcohol use",
          "Regular exercise",
        ],
      };

      // Simulating an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMedicalHistory(response.medicalHistory);
      setCurrentMedications(response.currentMedications);
      setSymptoms(response.symptoms); // Set symptoms
      setSocialHistory(response.socialHistory); // Set social history
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={rav.receptionist}>
        {!props.entity ? (
          <>
            <PatientHeader showEditPatients={false} />
            <Grid
              container
              spacing={2}
              style={{
                height: "100vh", // Full viewport height
                padding: "1rem",
              }}
            >
              <Grid item xs={6}>
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
                    history={socialHistory}
                    showButton={false} // Hide the button
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
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
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
};

export default MoreInfo;
