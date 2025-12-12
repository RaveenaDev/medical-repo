import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import ayu from "./doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid2";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BookAppointment from "../Appointment/Book/BookAppointment.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorsByDepartment,
  getAllDepartments,
  getDoctors,
  getDoctorsByDepartment,
} from "../../../components/State/Receptionist/Action.js";

const Doctors = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
    dispatch(getDoctors(page, rowsPerPage));
    dispatch(getAllDepartments());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const location = useLocation();

  const doctors = useSelector((state) => state.receptionist.doctors);
  const departments = useSelector((state) => state.receptionist.departments);
  const isLoadingDoctors = useSelector(
    (state) => state.receptionist.isLoadingDoctors
  );

  const noOfDoctors = useSelector((state) => state.receptionist.doctorCount);

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [isBookAppointment, setIsBookAppointment] = useState(false); // State to toggle between components

  const [isFromDoctor, setIsFromDoctor] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookAppointment(true);
  };

  useEffect(() => {
    if (selectedDepartment === "all") {
      // If "All Branches" is selected, show all doctors
      dispatch(getDoctors(page, rowsPerPage)); // Fetch all doctors
    } else {
      dispatch(fetchDoctorsByDepartment(selectedDepartment, page, rowsPerPage));
    }
  }, [page, rowsPerPage]);
  const handleDepartmentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDepartment(selectedValue);

    if (selectedValue === "all") {
      // If "All Branches" is selected, show all doctors
      dispatch(getDoctors(page, rowsPerPage)); // Fetch all doctors
    } else {
      dispatch(fetchDoctorsByDepartment(selectedValue, page, rowsPerPage));
    }
  };

  const departmentOptions = [
    { label: "All Branches", value: "all" }, // default option
    ...departments.map((dept) => ({
      label: dept.departmentName,
      value: dept.departmentId,
    })),
  ];

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div>
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

        {isLoadingDoctors ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={50} />
          </Box>
        ) : (
          <div style={{ marginTop: "18vh" }}>
            {isBookAppointment ? (
              <BookAppointment
                isOpen={isBookAppointment}
                onClose={() => setIsBookAppointment(false)}
                isFromDoctor={isFromDoctor}
                doctorEmail={selectedDoctor?.email}
                department={selectedDoctor.departments}
              />
            ) : (
              <div>
                <Box
                  sx={{
                    borderBottom: "1px solid #87878782",
                    paddingBottom: 0.5,
                    marginBottom: 1,
                  }}
                >
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
                      {noOfDoctors}
                    </h2>

                    <div style={{ marginLeft: "25px" }}>
                      <Grid xs={3}>
                        <Box sx={{ width: "250px", background: "#FFFFFF" }}>
                          {" "}
                          {/* Adjust width here */}
                          <Select
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            displayEmpty
                            size="small"
                            sx={{
                              background: "#ffffff",
                              outline: "none",
                              border: "1px solid #9797978F",
                              width: "100%",
                            }}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  maxHeight: 200, // Adjust the height as needed
                                  overflowY: "auto", // Enable vertical scrolling
                                },
                              },
                            }}
                          >
                            {departmentOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Grid>
                    </div>
                  </div>
                </Box>

                {/* Table Section */}
                <TableContainer
                  sx={{
                    maxHeight: "70vh", // Adjust this to fit your layout needs
                    overflowY: "auto",
                    position: "relative",
                  }}
                >
                  <Table
                    sx={{
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                      marginBottom: "20px",
                    }}
                  >
                    <TableHead
                      sx={{
                        position: "sticky",
                        backgroundColor: "#f1f1f1",
                        top: 0,
                        zIndex: 10, // Keep it above other elements
                      }}
                    >
                      <TableRow>
                        <TableCell sx={{ color: "#000000" }}>Profile</TableCell>

                        <TableCell sx={{ color: "#000000" }}>Name</TableCell>
                        <TableCell sx={{ color: "#000000" }}>
                          Phone Number
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }}>
                          Department
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }} align="center">
                          Status
                        </TableCell>
                        <TableCell sx={{ color: "#000000" }} align="center">
                          Booking
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctors.length > 0 ? (
                        doctors.map((patient, index) => (
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
                                sx={{ color: "#25307F", fontWeight: "bold" }}
                              >
                                {truncateText(patient?.name, 13)}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ color: "#747474", fontWeight: "bold" }}
                            >
                              {patient.phone}
                            </TableCell>
                            <TableCell
                              sx={{ color: "#747474", fontWeight: "bold" }}
                            >
                              {patient?.departments?.[0]?.name ||
                                "Not Assigned"}
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={patient.status}
                                color={
                                  patient.status === "Active"
                                    ? "success"
                                    : "default"
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
                                onClick={() => handleBookAppointment(patient)}
                              >
                                Book Appointment
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            align="center"
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
                            No doctors found!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={noOfDoctors}
                    page={page} // current page
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage} // items per page
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                    sx={{
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#fff",
                      borderTop: "2px solid #ddd",
                      zIndex: 11,
                    }}
                  />
                </TableContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Doctors;
