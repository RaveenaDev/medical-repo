import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo.jsx";
import ProgressTracker from "./ProgressTracker";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PatientHeader from "./components/PatientHeader.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { WhatsApp, Email, Close } from "@mui/icons-material";
import { getPatientDetailsById } from "../../../../components/State/Receptionist/Action.js";
import { useDispatch, useSelector } from "react-redux";

const PatientProfile = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const dispatch = useDispatch();

  // console.log("Pat: ",patient)

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleSendEmail = () => {
    window.open(
      `mailto:${patient?.email}?subject=Appointment Details&body=Hello, here are your appointment details.`,
      "_blank"
    );
    setShowModal(false);
  };

  const handleSendWhatsApp = () => {
    window.open(
      `https://wa.me/${patient?.phone}?text=Hello, here are your appointment details.`,
      "_blank"
    );
    setShowModal(false);
  };

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchData = async () => {
      // backend response structure
      const response = {
        medicalHistory: patient.medicalHistory,
        currentMedications: patient.currentMedication,
      };

      setMedicalHistory(response.medicalHistory);
      setCurrentMedications(response.currentMedications);
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getPatientDetailsById(patient?._id));
  }, [dispatch, patient]);

  const patDetails = useSelector((store) => store.receptionist.patientDetails);

  console.log("Det: ", patDetails);

  const upcoming = patient.appointments?.filter(
    (app) => app.status === "Scheduled"
  ).length;
  const completed = patient.appointments?.filter(
    (app) => app.status === "Completed"
  ).length;

  if (!patient) {
    return <p>No patient data found!</p>;
  }

  return (
    <>
      <PatientHeader patient={patient} />
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "1rem", marginTop: "60px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            padding: "5px 0",
            width: "75vw", // Optional
          }}
        >
          {/* Box 1 - Profile Card */}
          <div
            style={{
              width: "25%",
              padding: "20px 0",
              backgroundColor: "#FFFFFF",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "2px",
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
                src=""
                alt="Profile Image"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  marginBottom: "2px",
                  fontSize: "2rem",
                  color: "#25307F",
                  bgcolor: "#e3e3e3",
                }}
              >
                {patient.name[0].toUpperCase()}
              </Avatar>
              <h4
                style={{
                  margin: "2px 0",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#25307F",
                }}
              >
                {patient.name}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#878787",
                  marginBottom: "24px",
                }}
              >
                {patient.email}
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
                  <h5 style={{ color: "#25307F", fontSize: "24px" }}>
                    {completed}
                  </h5>
                  <p style={{ fontSize: "14px", color: "#878787" }}>
                    Past Visits
                  </p>
                </div>
                <div>
                  <h5 style={{ fontSize: "24px", color: "#25307F" }}>
                    {upcoming}
                  </h5>
                  <p style={{ fontSize: "14px", color: "#878787" }}>Upcoming</p>
                </div>
              </div>

              <button
                style={{
                  marginTop: "16px",
                  padding: "12px 10px",
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
                onClick={() => setShowModal(true)}
              >
                Send Message
              </button>
              {/* Modal UI */}

              <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "10px",
                    padding: "10px",
                    width: "400px", // Increased width
                    maxWidth: "90%", // Ensures responsiveness
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Send Message Via
                </DialogTitle>

                <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
                  <Button
                    fullWidth
                    startIcon={<WhatsApp />}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#25D366",
                      border: "1px solid #25D366",
                      marginBottom: "10px",
                      "&:hover": {
                        backgroundColor: "#25D366",
                        color: "#fff",
                      },
                    }}
                    onClick={handleSendWhatsApp}
                  >
                    WhatsApp
                  </Button>

                  <Button
                    fullWidth
                    startIcon={<Email />}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#007bff",
                      border: "1px solid #007bff",
                      "&:hover": {
                        backgroundColor: "#007bff",
                        color: "#fff",
                      },
                    }}
                    onClick={handleSendEmail}
                  >
                    Email
                  </Button>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button
                    onClick={() => setShowModal(false)}
                    sx={{
                      color: "#25307F",
                      border: "1px solid #25307F",
                      boxShadow: "0px 4px 4px 0px #C2C2C240",
                      "&:hover": {
                        backgroundColor: "#25307F",
                        color: "#fff",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          {/* Box 2 - Personal Info (Middle Section) */}
          <div
            style={{
              width: "50%",
              minWidth: "400px",
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "2px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PersonalInfo patient={patient} />
          </div>

          {/* Box 3 - Medical Info */}
          <div
            style={{
              width: "28%",
              backgroundColor: "#ffffff",
              height: "auto",
              padding: "16px 8px",
              borderRadius: "2px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <MedicalInfo
              patient={patient}
              medicalHistory={medicalHistory}
              currentMedications={currentMedications}
              patDetails={patDetails}
              showSymptoms={false} // Hide Symptoms section
              showHistory={false} // Hide Social History section
            />
          </div>
        </div>

        {/* Progress Tracker  */}
        <Grid xs={12}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF", // Set the background color to white
              padding: "16px 0", // Optional padding for content spacing
              borderRadius: "8px", // Optional rounded corners
              width: "75vw", // Optional
            }}
          >
            <div style={{ paddingLeft: "38px" }}>
              <Typography
                variant="h3"
                sx={{ color: "#4A4A4A", fontSize: "20px" }}
              >
                Progress Tracker
              </Typography>

              <Box
                sx={{
                  height: "1px",
                  //   backgroundColor: "#8787877A",
                  my: 2, // Adds top and bottom margin (equivalent to padding)
                }}
              />
            </div>

            <ProgressTracker patient={patient} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientProfile;
