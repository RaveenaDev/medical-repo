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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";

const ProgressTracker = ({ patient }) => {
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
      progress: "",
      status: "Completed",
    },
  ];

  const handleClick = () => {
    navigate("/admin/reception/patients/Tracking", {
      state: { patient },
    });
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="start"
    >
      <Timeline position="left" style={{ marginTop: "3.8rem", paddingRight: "0", marginLeft: "12px" }}>
        {steps.map((step, index) => (
          <TimelineItem key={index} style={{ padding: 0, margin: 0 }}>
            <TimelineSeparator style={{ padding: 0, margin: 0 }}>
              <TimelineDot
                  sx={{
                    margin: 0,
                    backgroundColor: step.status === "Ongoing" ? "#2E823B" : "#EAA000",
                    borderColor: step.status === "Ongoing" ? "#2E823B" : "#EAAA000",
                    boxShadow: step.status === "Ongoing"
                        ? "0px 0px 1px 4px rgba(46, 130, 59, 0.3)" // Green glow
                        : "none", // Orange glow
                  }}
              />
              {index < steps.length - 1 && <TimelineConnector sx={{ height: "100%" }}/>}
            </TimelineSeparator>
            <TimelineContent style={{ padding: 0 }}></TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <TableContainer style={{marginTop:"-22px",paddingRight:"22px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{color:'#878787'}}>
                <Typography sx={{fontSize:'17px'}} variant="h6">Phase</Typography>
              </TableCell>
              <TableCell align='center' sx={{color:'#878787'}}>
                <Typography sx={{fontSize:'17px'}} variant="h6">Date</Typography>
              </TableCell>
              <TableCell align='center' sx={{color:'#878787'}}>
                <Typography sx={{fontSize:'17px'}} variant="h6">Responsible</Typography>
              </TableCell>
              <TableCell align='center' sx={{color:'#878787'}}>
                <Typography sx={{fontSize:'17px'}} variant="h6">Progress</Typography>
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
                onClick={step.status === "Ongoing" ? () => handleClick() : ""}
                sx={{
                  cursor: step.status === "Ongoing" ? "pointer" : "",
                  transition: "background-color 0.3s",
                }}
              >
                <TableCell align='center' sx={{padding:"24px 0"}}>{step.phase}</TableCell>
                <TableCell align='center'>{step.date}</TableCell>
                <TableCell align='center'>{step.responsible}</TableCell>
                <TableCell align='center'>{step.progress}</TableCell>
                <TableCell align='center'>
                  <Typography
                    style={{
                      color:
                        step.status === "Completed"
                          ? "#EAA000"
                          : step.status === "Ongoing"
                          ? "#2E823B"
                          : "black",
                      fontWeight: 600,
                      fontSize: "14px"
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
