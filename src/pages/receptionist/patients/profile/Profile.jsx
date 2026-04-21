import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo.jsx";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import ProgressTracker from "./ProgressTracker";
import { Typography, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import PatientHeader from "./components/PatientHeader.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { WhatsApp, Email } from "@mui/icons-material";
import { getPatientDetailsById } from "../../../../components/State/Receptionist/Action.js";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const location = useLocation();
  const patient = location.state?.patient;
  const dispatch = useDispatch();

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableIndex, setTableIndex] = useState(null);

  const isMobile = useMediaQuery("(max-width:480px)");
  const isTablet = useMediaQuery("(max-width:1024px)");

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
    props?.setIsSignUpOrLogin(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

  const upcoming = patient?.appointments?.filter(
    (app) => app.status === "Scheduled"
  ).length;
  const completed = patient?.appointments?.filter(
    (app) => app.status === "Completed"
  ).length;

  if (!patient) return <p>No patient data found!</p>;

  return (
    <>
      <div>
        {!props.entity ? (
          <>
            <PatientHeader patient={patient} />

            <Box sx={{ mt: "60px", mb: 2, px: { xs: 1, sm: 2, md: 0 } }}>
              {/* 3-column card row */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 2fr 1fr",
                  },
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* Box 1 - Profile Card */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "2px",
                    boxShadow: "0 2px 5px rgba(31,23,23,0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "20px 0",
                    gridColumn: { xs: "1 / -1", sm: "1 / -1", lg: "auto" },
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src=""
                      alt="Profile Image"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        mb: "2px",
                        fontSize: "2rem",
                        color: "#00a378",
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
                        color: "#00a378",
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

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <div>
                        <h5 style={{ color: "#00a378", fontSize: "24px" }}>
                          {completed}
                        </h5>
                        <p style={{ fontSize: "14px", color: "#878787" }}>
                          Past Visits
                        </p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: "24px", color: "#00a378" }}>
                          {upcoming}
                        </h5>
                        <p style={{ fontSize: "14px", color: "#878787" }}>
                          Upcoming
                        </p>
                      </div>
                    </Box>

                    <button
                      style={{
                        marginTop: "16px",
                        padding: "12px 10px",
                        width: "100%",
                        border: "2px solid #00a378",
                        backgroundColor: "transparent",
                        color: "#00a378",
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#00a378";
                        e.target.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#00a378";
                      }}
                      onClick={() => setShowModal(true)}
                    >
                      Send Message
                    </button>

                    {/* Dialog */}
                    <Dialog
                      open={showModal}
                      onClose={() => setShowModal(false)}
                      sx={{
                        "& .MuiPaper-root": {
                          borderRadius: "10px",
                          padding: "10px",
                          width: "400px",
                          maxWidth: "90%",
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
                            mb: "10px",
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
                            color: "#00a378",
                            border: "1px solid #00a378",
                            "&:hover": {
                              backgroundColor: "#00a378",
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
                            color: "#00a378",
                            border: "1px solid #00a378",
                            boxShadow: "0px 4px 4px 0px #C2C2C240",
                            "&:hover": {
                              backgroundColor: "#00a378",
                              color: "#fff",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Box>

                {/* Box 2 - Personal Info */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: "20px",
                    borderRadius: "2px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    minWidth: 0,
                  }}
                >
                  <PersonalInfo patient={patient} />
                </Box>

                {/* Box 3 - Medical Info */}
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: "4px 8px 12px 8px",
                    borderRadius: "2px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    minHeight: "150px",
                    minWidth: 0,
                  }}
                >
                  <MedicalInfo
                    patient={patient}
                    medicalHistory={medicalHistory}
                    currentMedications={currentMedications}
                    patDetails={patDetails}
                    showSymptoms={false}
                    showHistory={false}
                  />
                </Box>
              </Box>

              {/* Progress Tracker */}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  p: { xs: "16px 12px", md: "16px 0" },
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <Box sx={{ pl: { xs: 1, md: "38px" } }}>
                  <Typography
                    variant="h3"
                    sx={{ color: "#4A4A4A", fontSize: "20px" }}
                  >
                    Progress Tracker
                  </Typography>
                  <Box sx={{ height: "1px", my: 2 }} />
                </Box>
                <ProgressTracker patient={patient} />
              </Box>
            </Box>
          </>
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
};

export default Profile;