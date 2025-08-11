import React, { useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../../components/State/Receptionist/Action";

const ProgressTracker = ({ patient }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      progress: "",
      status: "Completed",
    },
  ];
  const handleClick = () => {
    navigate("/receptionist/patients/profile/progressReport", {
      state: { patient },
    });
  };

  const location = useLocation();
  const { caseId } = location.state;

  //console.log("Case ID: ", caseId);

  //  console.log("Patient: ", patient);
  //const patientId = patient.patId;
  //console.log("Patient-ID: ", patient._id);

  useEffect(() => {
    if (patient?._id && caseId) {
      const patientId = patient._id;
      dispatch(getProgressTrackerDetails(patientId, caseId));
      //console.log("Dispatch Request");
    }
  }, [dispatch, patient, caseId]);

  const progressTracker = useSelector(
    (store) => store.receptionist.progressTracker
  );
  console.log("progressTracker details: ", progressTracker);
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
          marginTop: "55px",
          paddingRight: "0",
          marginLeft: "12px",
          backgroundColor: "none",
        }}
      >
        {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
          progressTracker.map((step, index) => (
            <TimelineItem key={index} style={{ padding: 0, margin: 0 }}>
              <TimelineSeparator style={{ padding: 0, margin: 0 }}>
                <TimelineDot
                  sx={{
                    margin: 0,
                    backgroundColor:
                      step.status === "ongoing" ? "#2E823B" : "#EAA000",
                    borderColor:
                      step.status === "ongoing" ? "#2E823B" : "#EAA000",
                    boxShadow:
                      step.status === "ongoing"
                        ? "0px 0px 0px 3px rgba(46, 130, 59, 0.3)" // Green glow
                        : "none", // No glow for completed
                  }}
                />
                {index < progressTracker.length - 1 && (
                  <TimelineConnector sx={{ width: "13%" }} />
                )}
              </TimelineSeparator>
              <TimelineContent style={{ padding: 0 }}></TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <div style={{ padding: "10px", color: "#888" }}>
            No progress steps available.
          </div>
        )}
      </Timeline>

      <TableContainer style={{ marginTop: "-22px", paddingRight: "22px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#878787",
                  //paddingLeft: "44px",
                  textAlign: "center",
                }}
              >
                Phase
              </TableCell>
              <TableCell sx={{ color: "#878787", textAlign: "center" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "#878787", textAlign: "center" }}>
                Responsible
              </TableCell>
              <TableCell sx={{ color: "#878787", textAlign: "center" }}>
                Progress Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
              progressTracker.map((step, index) => (
                <TableRow
                  key={index}
                  style={{
                    borderRadius: "8px",
                    backgroundColor:
                      step.status === "ongoing" ? "#e8f5e9" : "inherit",
                    height: "60px",
                  }}
                  sx={{
                    cursor: step.status === "ongoing" ? "pointer" : "default",
                    transition: "background-color 0.3s",
                  }}
                >
                  <TableCell
                    sx={{
                      padding: "24px 12px",
                      textAlign: "center",
                      borderRadius: "80px",
                    }}
                  >
                    {step?.title || "Untitled Phase"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {step?.date
                      ? new Date(step.date).toISOString().split("T")[0]
                      : "Date N/A"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {step?.doctor?.name || "Unknown"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography
                      style={{
                        color:
                          step.status === "completed"
                            ? "#EAA000"
                            : step.status === "ongoing"
                            ? "#2E823B"
                            : "black",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      {step?.status
                        ? step.status.charAt(0).toUpperCase() +
                          step.status.slice(1)
                        : "N/A"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ textAlign: "center", color: "#888", padding: "20px" }}
                >
                  No progress steps available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProgressTracker;
