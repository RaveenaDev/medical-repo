import React from "react";
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
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const ProgressTracker = () => {
  const navigate = useNavigate();

  const steps = [
    { phase: "Post-Surgery Follow-up", date: "June 27th, 2024", responsible: "Dr. Minhesh", progress: "Healing progress", status: "Ongoing" },
    { phase: "Surgery", date: "June 26th, 2024", responsible: "Dr. Minhesh", progress: "Heart Surgery", status: "Completed" },
    { phase: "Lab Tests", date: "June 25th, 2024", responsible: "Dr. Arunita", progress: "Blood test", status: "Completed" },
    { phase: "Initial Consultation", date: "June 24th, 2024", responsible: "Dr. Arunita", progress: "", status: "Completed" },
  ];


  return (

    
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="start" gap="2px">
      <Timeline position="left" style={{ marginTop: "30px" }}>
        {steps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color={step.status === "Ongoing" ? "primary" : "success"}
                variant={step.status === "Ongoing" ? "filled" : "outlined"}
              />
              {index < steps.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <TableContainer component={Paper} style={{ maxWidth: 980 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Phase</Typography></TableCell>
              <TableCell><Typography variant="h6">Date</Typography></TableCell>
              <TableCell><Typography variant="h6">Responsible</Typography></TableCell>
              <TableCell><Typography variant="h6">Progress</Typography></TableCell>
              <TableCell><Typography variant="h6">Status</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps.map((step, index) => (
              <TableRow
                key={index}
                style={{ backgroundColor: step.status === "Ongoing" ? "#e8f5e9" : "inherit" }}
                onClick={() => navigate("/receptionist/patients/profile/progressReport")}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = step.status === "Ongoing" ? "#e8f5e9" : "inherit")}
              >
                <TableCell>{step.phase}</TableCell>
                <TableCell>{step.date}</TableCell>
                <TableCell>{step.responsible}</TableCell>
                <TableCell>{step.progress}</TableCell>
                <TableCell>
                  <Typography
                    style={{
                      color: step.status === "Completed" ? "#EAA000" : step.status === "Ongoing" ? "blue" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {step.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProgressTracker;
