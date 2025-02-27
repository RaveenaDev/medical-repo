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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../styles.module.scss";
import addIcon from "../../../assets/plus.svg";
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

  return (
    <>
      <CommonPanel />

      <Box>
        <div className={ayu.headerContainer}>
          <div
            className={ayu.backButton}
            onClick={() => navigate(`/receptionist`)}
          >
            <ArrowBackIosIcon />
          </div>
          <h2 className={ayu.departmentTitle}>Total Doctors:</h2>
          <h2 className={ayu.departmentTitleDetails}>8</h2>

          <div style={{ marginLeft: "25px" }}>
            {branches.length && (
              <Grid item xs={3} spacing={2}>
                <Box sx={{ width: "200px" }}>
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
      <TableContainer component={Paper}>
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            background: "#F1F1F1",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Booking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((patient) => (
              <TableRow
                key={patient.id}
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
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {patient._id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{patient.name}</Typography>
                </TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.specialization}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={patient.status}
                    color={patient.status === "Active" ? "success" : "default"}
                    size="small"
                    sx={{
                      bgcolor:
                        patient.status === "Emergency Room"
                          ? "#d4edda"
                          : patient.status === "On Leave"
                          ? "#f8d7da"
                          : patient.status === "Idle"
                          ? "#ffffff"
                          : undefined,
                      color:
                        patient.status === "Emergency Room"
                          ? "#155724"
                          : patient.status === "On Leave"
                          ? "#721c24"
                          : patient.status === "Idle"
                          ? "#000000"
                          : undefined,

                      width: "9rem",
                      border:
                        patient.status === "Emergency Room"
                          ? "1px solid green"
                          : patient.status === "On Leave"
                          ? "1px solid red"
                          : patient.status === "Idle"
                          ? "1px solid black"
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
                      border: "2px solid purple", // Purple border
                      borderRadius: "18px", // Rounded corners
                      color: "purple", // Blue text color
                      textTransform: "none", // Prevents uppercase text
                      fontSize: "12px", // Adjust text size if needed
                      "&:hover": {
                        borderColor: "purple", // Darker border on hover
                        backgroundColor: "rgba(128, 0, 128, 0.1)", // Light purple hover effect
                      },
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
    </>
  );
};
export default Doctors;
