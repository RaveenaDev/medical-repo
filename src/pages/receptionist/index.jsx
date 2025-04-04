import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import styles from "./styles.module.scss";
import Grid from "@mui/material/Grid2";
import EntityBasedTable from "./EntityBasedTable";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CommonPanel from "./components/CommonPanel.jsx";
import BookAppointment from "./Appointment/Book/BookAppointment.jsx";
import Select from "../../components/Select/index.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getAppointments,
  getFilteredAppointments,
  getRequestedAppointments,
} from "../../components/State/Receptionist/Action.js";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";

function Receptionist(props) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tableIndex, setTableIndex] = useState(null);

  const [isBookAppointment, setIsBookAppointment] = useState(false); // State to toggle between components

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [activeBox, setActiveBox] = useState(1);

  const dispatch = useDispatch();

  const [selectedBranch, setSelectedBranch] = useState();
  const handleSelectChange = (value) => {
    // console.log("Selected Value: ",value);
    setSelectedBranch(value);
  };

  const refreshAppointments = useSelector((state) => state.receptionist.refreshAppointments);

  useEffect(() => {
    const startDate = selectedDate.startOf("day").toISOString();
    const endDate = selectedDate.endOf("day").toISOString();

    dispatch(getAllDepartments());

    ["Scheduled", "Ongoing", "Waiting", "Completed"].forEach((status) => {
      dispatch(getAppointments(status, startDate, endDate, selectedBranch));
    });
  }, [dispatch, selectedBranch, selectedDate,refreshAppointments]);

  // const startDate = new Date(selectedDate).toISOString().setHours(0, 0, 0, 0);
  // const endDate = new Date(selectedDate).toISOString();
  // console.log("START DATE: ", startDate);
  // console.log("END DATE: ", endDate);

  // useEffect(() => {
  //   dispatch(getAllDepartments());
  //   if (selectedBranch === null || selectedBranch === "All Branches") {
  //     dispatch(getAppointments("Scheduled"));
  //     dispatch(getAppointments("Ongoing"));
  //     dispatch(getAppointments("Waiting"));
  //     dispatch(getAppointments("Completed"));
  //   } else {
  //     // console.log(selectedBranch)
  //     dispatch(getFilteredAppointments("Scheduled", selectedBranch));
  //     dispatch(getFilteredAppointments("Ongoing", selectedBranch));
  //     dispatch(getFilteredAppointments("Waiting", selectedBranch));
  //     dispatch(getFilteredAppointments("Completed", selectedBranch));
  //   }
  // }, [dispatch, selectedBranch]);

  const departments = useSelector((store) => store.receptionist.departments);

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (departments && Array.isArray(departments)) {
      // setBranches(["All Branches",...departments.map((dept) => dept.departmentName)]);
      setBranches(departments);
    }
  }, [departments]);

  const scheduledAppointments = useSelector(
    (store) => store.receptionist.scheduledAppointments
  );
  const ongoingAppointments = useSelector(
    (store) => store.receptionist.ongoingAppointments
  );
  const waitingAppointments = useSelector(
    (store) => store.receptionist.waitingAppointments
  );
  const completedAppointments = useSelector(
    (store) => store.receptionist.completedAppointments
  );

  const boxData = [
    { id: 1, label: "Scheduled", count: scheduledAppointments.length },
    { id: 2, label: "Ongoing", count: ongoingAppointments.length },
    { id: 3, label: "Waiting", count: waitingAppointments.length },
    { id: 4, label: "Completed", count: completedAppointments.length },
  ];

  const activeLabel = boxData.find((box) => box.id === activeBox)?.label;

  const handleBoxClick = (id) => {
    setActiveBox(id);
  };

  useEffect(() => {
    dispatch(getRequestedAppointments());
  }, [dispatch]);

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  let appointments = [];

  switch (activeLabel) {
    case "Scheduled":
      appointments = scheduledAppointments;
      break;
    case "Ongoing":
      appointments = ongoingAppointments;
      break;
    case "Waiting":
      appointments = waitingAppointments;
      break;
    case "Completed":
      appointments = completedAppointments;
      break;
    default:
      appointments = [];
  }

  return (
    <div
      style={{
        height: "96dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
        background: " #F1F1F1",
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
          <CommonPanel
            setIsBookAppointment={setIsBookAppointment}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
        <div style={{ marginTop: "210px" }}>
          {!props.entity ? (
            <>
              {/* Main Table */}

              {/* Conditionally render BookAppointment or Dashboard based on state */}
              {isBookAppointment ? (
                <BookAppointment
                  isOpen={isBookAppointment}
                  onClose={() => setIsBookAppointment(false)}
                />
              ) : (
                <div
                  style={{
                    backgroundColor: "white",
                    position: "relative",
                  }}
                >
                  {/* Fixed / Sticky Header */}
                  <div
                    style={{
                      position: "sticky",
                      top: "220px",
                      background: "#fff",
                      zIndex: 10, // Ensures it's above other content
                      width: "100%",
                      paddingTop: "10px",
                    }}
                  >
                    {departments.length > 0 && (
                      <Grid
                        container
                        spacing={2}
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ margin: "10px 30px 10px 0" }}
                      >
                        <Grid item xs={4}>
                          <Select
                            inputId="input-department"
                            selectId="select-department"
                            label="Department"
                            list={branches}
                            size="small"
                            onChange={handleSelectChange}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {/* Box Data Section */}
                    <div
                      style={{
                        marginBottom: "1rem",
                        padding: "0 2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      {boxData.map((box) => (
                        <Box
                          key={box.id}
                          sx={{
                            backgroundColor:
                              activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                            px: { sm: 3, md: 5, lg: 7 },
                            height: 55,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                            boxShadow: 'none',
                            cursor: "pointer",
                            borderBottom:
                              activeBox === box.id
                                ? "3.5px solid #25307F"
                                : "none",
                            transition: "all 0.3s ease-in-out",
                          }}
                          onClick={() => handleBoxClick(box.id)}
                        >
                          <h2
                            style={{
                              fontSize: "2.1rem",
                              fontWeight: 600,
                              color:
                                activeBox === box.id ? "#25307F" : " #4A4A4A",
                            }}
                          >
                            {box.count}
                          </h2>
                          <span
                            style={{
                              fontSize: "1.6rem",
                              fontWeight: 500,
                              color: "black",
                              marginRight: "4px",
                            }}
                          >
                            -
                          </span>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              marginTop: "4px",
                              color: activeBox === box.id ? "black" : "#747474",
                            }}
                          >
                            {box.label}
                          </p>
                        </Box>
                      ))}
                    </div>
                  </div>
                  {/* Table Section */}
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <TableContainer
                      sx={{
                        maxHeight: "50vh", // Adjust this to fit your layout needs
                        overflowY: "auto",
                      }}
                    >
                      <Table
                        sx={{
                          borderCollapse: "separate",
                          borderSpacing: "0 10px",
                          marginBottom: "30px",
                        }}
                      >
                        <TableHead
                          sx={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white", // Ensure it's visible
                            zIndex: 10, // Keep it above other elements
                          }}
                        >
                          <TableRow>
                            <TableCell sx={{ color: "#000", fontSize: "16px" }}>
                              Case Id
                            </TableCell>
                            <TableCell sx={{ color: "#000", fontSize: "16px" }}>
                              Name
                            </TableCell>
                            <TableCell sx={{ color: "#000", fontSize: "16px" }}>
                              Appointment With
                            </TableCell>
                            <TableCell sx={{ color: "#000", fontSize: "16px" }}>
                              Type Visit
                            </TableCell>
                            <TableCell sx={{ color: "#000", fontSize: "16px" }}>
                              Branch
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "#000", fontSize: "16px" }}
                            >
                              Token Number
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                color: "#000",
                                fontSize: "16px",
                                pl: 3,
                              }}
                            >
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ marginBottom: "50px" }}>
                          {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                              <TableRow
                                key={appointment._id}
                                sx={{
                                  bgcolor:
                                    appointment.status === "Ongoing"
                                      ? "#3DB46117"
                                      : "white",
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
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      color: "#25307F",
                                    }}
                                  >
                                    {truncateText(appointment.caseId, 12)}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      color: "#25307F",
                                    }}
                                  >
                                    {appointment.patient.name}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#747474", fontWeight: "600" }}
                                >
                                  {appointment.doctor?.name}
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#747474", fontWeight: "600" }}
                                >
                                  {appointment.typeVisit}
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#747474", fontWeight: "600" }}
                                >
                                  {appointment.department.name}
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#747474", fontWeight: "600" }}
                                  align="center"
                                >
                                  {appointment?.tokenNumber || "N/A"}
                                </TableCell>
                                <TableCell align="right">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",

                                      width: "100%",
                                    }}
                                  >
                                    <Chip
                                      label={appointment.status}
                                      size="small"
                                      sx={{
                                        bgcolor:
                                          appointment.status === "Ongoing"
                                            ? "#3DB461"
                                            : "white",
                                        color:
                                          appointment.status === "Ongoing"
                                            ? "white"
                                            : appointment.status === "Completed"
                                            ? "#EAA000"
                                            : appointment.status === "Scheduled"
                                            ? "#25307F"
                                            : "#757575",
                                        fontWeight: "600",
                                        px: 0.7,
                                      }}
                                    />
                                    {appointment.status === "Waiting" && (
                                      <Box sx={{ ml: "auto" }}>
                                        <IconButton
                                          size="small"
                                          sx={{
                                            p: 0,
                                            "&:focus": {
                                              outline: "none",
                                              boxShadow: "none",
                                            },
                                          }}
                                        >
                                          <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell align="center" colSpan={7}>
                                No data found!
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Render either EntityBasedTable or BookAppointment based on props.entity and isBookAppointment */}
              {isBookAppointment ? (
                <BookAppointment
                  isBookAppointment={isBookAppointment}
                  onClose={() => setIsBookAppointment(false)}
                />
              ) : (
                <EntityBasedTable
                  entity={props?.entity}
                  tableIndex={tableIndex}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Receptionist;
