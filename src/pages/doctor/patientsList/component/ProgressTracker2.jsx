import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";
import PostSurgeryFollowUp from "./form/PostSurgeryFollowUp";
import styles from "./ProgressTracker2.module.scss";
import LabTests from "./form/LabTests";
import InitialConsultation from "./form/InitialConsultation";
import Surgery from "./form/Surgery";

const ProgressTracker2 = ({ patient }) => {
  const navigate = useNavigate();

  const steps = [
    {
      phase: "Post-Surgery Follow-up",
      date: "June 27th, 2024",
      responsible: "Dr. Minhesh",
      progress: "Healing progress",
      status: "Ongoing",
    },
    {
      phase: "Surgery",
      date: "June 26th, 2024",
      responsible: "Dr. Minhesh",
      progress: "Heart Surgery",
      status: "Completed",
    },
    {
      phase: "Lab Tests",
      date: "June 25th, 2024",
      responsible: "Dr. Arunita",
      progress: "Blood test",
      status: "Completed",
    },
    {
      phase: "Initial Consultation",
      date: "June 24th, 2024",
      responsible: "Dr. Arunita",
      progress: "Blood test",
      status: "Completed",
    },
  ];

  const handleClick = () => {
    navigate("/admin/reception/patients/Tracking", {
      state: { patient },
    });
  };

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openFollowUp = () => setActiveModal("FollowUp");
  const openSurgery = () => setActiveModal("Surgery");
  const openLabTests = () => setActiveModal("LabTests");
  const openInitialConsultation = () => setActiveModal("InitialConsultation");
  const closeModal = () => setActiveModal(null);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="start"
    >
      <Timeline
        position="left"
        style={{
          marginTop: "3.8rem",
          paddingRight: "0",
          marginLeft: "8px",
          marginRight: "0px",
        }}
      >
        {steps.map((step, index) => (
          <TimelineItem key={index} style={{ padding: 0, margin: 0 }}>
            <TimelineSeparator style={{ padding: "0 0px", margin: 0 }}>
              <TimelineDot
                sx={{
                  margin: 0,
                  backgroundColor:
                    step.status === "Ongoing" ? "#2E823B" : "#EAA000",
                  borderColor:
                    step.status === "Ongoing" ? "#2E823B" : "#EAAA000",
                  boxShadow:
                    step.status === "Ongoing"
                      ? "0px 0px 1px 4px rgba(46, 130, 59, 0.3)" // Green glow
                      : "none", // Orange glow
                }}
              />
              {index < steps.length - 1 && (
                <TimelineConnector sx={{ height: "100%" }} />
              )}
            </TimelineSeparator>
            <TimelineContent style={{ padding: 0 }}></TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <TableContainer style={{ marginTop: "-22px", paddingRight: "22px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#878787" }}>
                <Typography sx={{ fontSize: "17px" }} variant="h6">
                  Phase
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ color: "#878787" }}>
                <Typography sx={{ fontSize: "17px" }} variant="h6">
                  Date
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ color: "#878787" }}>
                <Typography sx={{ fontSize: "17px" }} variant="h6">
                  Responsible
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ color: "#878787" }}>
                <Typography sx={{ fontSize: "17px" }} variant="h6">
                  Progress
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps.map((step, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor:
                    step.status === "Ongoing" ? "#e8f5e9" : "inherit",
                }}
                onClick={
                  step.phase === "Post-Surgery Follow-up"
                    ? openFollowUp
                    : step.phase === "Lab Tests"
                    ? openLabTests
                    : step.phase === "Initial Consultation"
                    ? openInitialConsultation
                    : step.phase === "Surgery"
                    ? openSurgery
                    : null
                }
                sx={{
                  cursor: step.status === "Ongoing" ? "pointer" : "",
                  transition: "background-color 0.3s",
                }}
              >
                <TableCell
                  align="center"
                  sx={{ padding: "24px 0", cursor: "pointer" }}
                >
                  {step.phase}
                </TableCell>
                <TableCell align="center">{step.date}</TableCell>
                <TableCell align="center">{step.responsible}</TableCell>
                <TableCell align="center">{step.progress}</TableCell>
                <TableCell align="center">
                  <Typography
                    style={{
                      color:
                        step.status === "Completed"
                          ? "#EAA000"
                          : step.status === "Ongoing"
                          ? "#2E823B"
                          : "black",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {step.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

            {activeModal === "FollowUp" && (
              <>
                <div className={styles.backdropOverlay} onClick={closeModal} />
                <div className={styles.followUpModal}>
                  <PostSurgeryFollowUp onClose={closeModal} />
                </div>
              </>
            )}
            {activeModal === "Surgery" && (
              <>
                <div className={styles.backdropOverlay} onClick={closeModal} />
                <div className={styles.surgeryModal}>
                  <Surgery onClose={closeModal} />
                </div>
              </>
            )}
            {activeModal === "LabTests" && (
              <>
                <div className={styles.backdropOverlay} onClick={closeModal} />
                <div className={styles.labTestsModal}>
                  <LabTests onClose={closeModal} />
                </div>
              </>
            )}
            {activeModal === "InitialConsultation" && (
              <>
                <div className={styles.backdropOverlay} onClick={closeModal} />
                <div className={styles.initialConsultationModal}>
                  <InitialConsultation onClose={closeModal} />
                </div>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProgressTracker2;
