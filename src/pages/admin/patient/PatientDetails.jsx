import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo";
import styles from "./profile.module.scss";
import rav from "./styles.module.scss";
import ProgressTracker from "./ProgressTracker";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PatientHeader from "./components/PatientHeader.jsx";

const PatientDetails = (props) => {
  const { state: patient } = useLocation(); // Retrieve the patient data passed from PatientList
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);

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
      };

      // Simulating an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMedicalHistory(response.medicalHistory);
      setCurrentMedications(response.currentMedications);
    };

    fetchData();
  }, []);

  return (
      <>
        <div className={rav.receptionist}>
              <>
                <PatientHeader />
                <Grid container spacing={2}>
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        padding: "20px",
                        width: "100%",
                      }}
                  >
                    {/* Box 1 - Profile Card */}
                    <div
                        style={{
                          width: "25%",

                          backgroundColor: "#FFFFFF",
                          height: "auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "16px 20px",
                          borderRadius: "10px",
                          boxShadow: "0 2px 5px rgba(31, 23, 23, 0.1)",
                          textAlign: "center",
                          color: "black",
                        }}
                    >
                      <div
                          style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                      >
                        <Avatar
                            src="https://via.placeholder.com/150"
                            alt="Profile Image"
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              marginBottom: "8px",
                            }}
                        />
                        <h4
                            style={{
                              margin: "8px 0",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                        >
                          Jasmine Kaur
                        </h4>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                          Jaisminekaur@gmail.com
                        </p>

                        <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              width: "100%",
                              marginTop: "10px",
                            }}
                        >
                          <div>
                            <h5 style={{ margin: "5px 0" }}>8</h5>
                            <p style={{ fontSize: "14px", color: "#777" }}>
                              Past Visits
                            </p>
                          </div>
                          <div>
                            <h5 style={{ margin: "5px 0" }}>2</h5>
                            <p style={{ fontSize: "14px", color: "#777" }}>
                              Upcoming
                            </p>
                          </div>
                        </div>

                        <button
                            style={{
                              marginTop: "16px",
                              padding: "12px 24px",
                              width: "100%",
                              border: "2px solid #25307F",
                              backgroundColor: "transparent",
                              color: "#25307F",
                              fontSize: "14px",
                              fontWeight: "bold",
                              borderRadius: "6px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#25307F";
                              e.target.style.color = "#ffffff";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#25307F";
                            }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>

                    {/* Box 2 - Personal Info (Middle Section) */}
                    <div
                        style={{
                          width: "50%",
                          minWidth: "400px",
                          backgroundColor: "#ffffff",
                          padding: "20px",
                          borderRadius: "10px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                      <PersonalInfo />
                    </div>

                    {/* Box 3 - Medical Info */}
                    <div
                        style={{
                          width: "25%",
                          backgroundColor: "#ffffff",
                          height: "auto",
                          padding: "16px 20px",
                          borderRadius: "10px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                      <MedicalInfo
                          medicalHistory={medicalHistory}
                          currentMedications={currentMedications}
                          showSymptoms={false} // Hide Symptoms section
                          showHistory={false} // Hide Social History section
                      />
                    </div>
                  </div>

                  <Grid item xs={12}>
                    <Box
                        sx={{
                          backgroundColor: "#FFFFFF", // Set the background color to white
                          padding: "16px", // Optional padding for content spacing
                          borderRadius: "8px", // Optional rounded corners
                          width: "75vw", // Optional
                        }}
                    >
                      <Typography
                          variant="h3"
                          sx={{ color: "#4A4A4A", fontSize: "20px" }}
                      >
                        Progress Tracker
                      </Typography>

                      <Box
                          sx={{
                            height: "1px",
                            backgroundColor: "#8787877A",
                            my: 2, // Adds top and bottom margin (equivalent to padding)
                          }}
                      />

                      <ProgressTracker />
                    </Box>
                  </Grid>
                </Grid>
              </>
        </div>
      </>
  );
};

export default PatientDetails;
