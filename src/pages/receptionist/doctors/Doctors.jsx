import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import ayu from "./doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid2";
import Select from "../../../components/Select/index.jsx";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const Doctors = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [branches, setBranches] = useState([
    "All Branches",
    "Cardiology",
    "Therapy",
    "Dermatology",
  ]);

  const location = useLocation();

  const doctors = location.state?.doctors;

  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div style={{ background: "#f1f1f1", height: "100lvh" }}>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          height: "30px",
          background: " #F1F1F1",
          width: "100%",
          zIndex: 100,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "150px" }}>
        <Box>
          <div className={ayu.headerContainer}>
            <div
              className={ayu.backButton}
              onClick={() => navigate(`/receptionist`)}
            >
              <ArrowBackIosIcon />
            </div>
            <h2 className={ayu.departmentTitle}>Total Doctors:</h2>
            <h2
              className={ayu.departmentTitleDetails}
              style={{ color: "#878787" }}
            >
              {doctors?.length}
            </h2>

            <div style={{ marginLeft: "25px" }}>
              {branches.length && (
                <Grid xs={3}>
                  <Box sx={{ width: "250px", background: "#FFFFFF" }}>
                    {" "}
                    {/* Adjust width here */}
                    <Select
                      inputId="input-department"
                      selectId="select-department"
                      label="Department"
                      list={branches}
                      size="small"
                    />
                  </Box>
                </Grid>
              )}
            </div>
          </div>
        </Box>

        {/* Table Section */}
        <TableContainer>
          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#000000" }}>Profile</TableCell>
                <TableCell sx={{ color: "#000000" }}>Doctor ID</TableCell>
                <TableCell sx={{ color: "#000000" }}>Name</TableCell>
                <TableCell sx={{ color: "#000000" }}>Phone Number</TableCell>
                <TableCell sx={{ color: "#000000" }}>Specialization</TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Booking
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((patient, index) => (
                <TableRow
                  key={index}
                  sx={{
                    background: "#fff",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                    "& > *": {
                      borderBottom: "unset",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={patient.profile}
                      alt="Profile"
                      sx={{ width: 40, height: 40 }} // Adjust size
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#25307F" }}
                    >
                      {truncateText(patient?._id, 8)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      sx={{ color: "#25307F", fontWeight: "bold" }}
                    >
                      {truncateText(patient?.name, 13)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#747474", fontWeight: "bold" }}>
                    {patient.phone}
                  </TableCell>
                  <TableCell sx={{ color: "#747474", fontWeight: "bold" }}>
                    {patient?.specialization || "Not Assigned"}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={patient.status}
                      color={
                        patient.status === "Active" ? "success" : "default"
                      }
                      size="small"
                      sx={{
                        bgcolor:
                          patient.status === "Emergency Room"
                            ? "#D3E4D5"
                            : patient.status === "With Patient"
                            ? "#D3E4D5"
                            : patient.status === "In Meeting"
                            ? "#D3E4D5"
                            : patient.status === "On Leave"
                            ? "#E4D6D3"
                            : patient.status === "Idle"
                            ? " #EBEBEB"
                            : undefined,
                        color:
                          patient.status === "Emergency Room"
                            ? "#2E823B"
                            : patient.status === "On Leave"
                            ? "#E1473D"
                            : patient.status === "In Meeting"
                            ? "#2E823B"
                            : patient.status === "Idle"
                            ? "#878787"
                            : patient.status === "With Patient"
                            ? "#2E823B"
                            : undefined,
                        width: "9rem",
                        border:
                          patient.status === "Emergency Room"
                            ? "1px solid #2E823B"
                            : patient.status === "On Leave"
                            ? " 1px solid #E1473D"
                            : patient.status === "Idle"
                            ? " 1px solid #878787"
                            : patient.status === "With Patient"
                            ? " 1px solid #2E823B"
                            : patient.status === "In Meeting"
                            ? " 1px solid #2E823B"
                            : undefined,

                        // fontSize: "12px"
                        py: 1.7,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{
                        border: "1px solidrgb(28, 30, 49)",
                        borderRadius: "18px", // Rounded corners
                        color: " #25307F",
                        textTransform: "none", // Prevents uppercase text
                        fontSize: "12px", // Adjust text size if needed
                      }}
                    >
                      Book Appointment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Doctors;
