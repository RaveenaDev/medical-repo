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
import { useNavigate } from "react-router-dom";
import Select from "../../components/Select/index.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointments,
  getRequestedAppointments,
} from "../../components/State/Receptionist/Action.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import accountCircle from "../../assets/account_circle.svg";
import billingDetails from "../../assets/payments.svg";
import addAppointments from "../../assets/plus.svg";

function Receptionist(props) {
  const [tableIndex, setTableIndex] = useState(null);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const [isBookAppointment, setIsBookAppointment] = useState(false); // State to toggle between components
  const navigate = useNavigate();

  const dummyRequests = [
    {
      id: 1,
      name: "Rahul Sharma",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Amit Verma",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Priya Singh",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [branches, setBranches] = useState([
    "All Branches",
    "Cardiology",
    "Therapy",
    "Dermatology",
  ]);

  const [activeBox, setActiveBox] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments("Scheduled"));
    dispatch(getAppointments("Ongoing"));
    dispatch(getAppointments("Waiting"));
    dispatch(getAppointments("Completed"));
  }, [dispatch]);

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

  // Handle Menu Open
  const handleMenuOpen = (event, patient) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  // Handle Edit Action
  const handleEdit = () => {
    setEditedPatient(selectedPatient); // Load selected patient into editedPatient
    setEditDialogOpen(true);
    handleMenuClose();
  };

  // Handle Delete Action
  const handleDelete = () => {
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getRequestedAppointments());
  }, [dispatch]);

  const appointmentRequests = useSelector(
    (store) => store.receptionist.appointmentRequests
  );
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
    <>
      <div style={{ padding: "0 20px 0 0" }}>
        <div
          style={{
            position: "fixed",
            top: "0px",
            padding: "10px",
            width: "77%",
            background: " #F1F1F1",
            zIndex: 10000,
          }}
        >
          <CommonPanel setIsBookAppointment={setIsBookAppointment} />
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
                <Box sx={{ backgroundColor: "white", pt: 0.7, px: 2 }}>
                  <div>
                    {branches.length && (
                      <Grid
                        container
                        spacing={2}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection={{ md: "row" }}
                        size={12}
                        sx={{ margin: "10px 20px 10px 0" }}
                      >
                        <Grid size={3}>
                          <Select
                            inputId="input-department"
                            selectId="select-department"
                            label="Department"
                            list={branches}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    )}
                  </div>

                  <div
                    // sx={{ mb: 1,px: 2}}
                    style={{
                      marginBottom: "1rem",
                      padding: "0 2rem",
                      justifyContent: "space-between",
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    {boxData.map((box) => (
                      <div key={box.id}>
                        <Box
                          sx={{
                            backgroundColor:
                              activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                            px: { sm: 3, md: 5, lg: 8 },
                            height: 55,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                            boxShadow: 1,
                            cursor: "pointer",
                            borderBottom:
                              activeBox === box.id
                                ? "4px solid #25307F"
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
                              // marginRight: "4px",
                              // marginLeft: "42px",
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
                      </div>
                    ))}
                  </div>

                  {/* Table Section */}
                  <TableContainer component={Paper}>
                    <Table
                      sx={{
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                      }}
                    >
                      <TableHead sx={{}}>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Case Id
                          </TableCell>
                          <TableCell
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Appointment With
                          </TableCell>
                          <TableCell
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Type Visit
                          </TableCell>
                          <TableCell
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Branch
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Token Number
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: " #000000",
                              fontFamily: "Karla",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ pl: 2 }}>
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
                              <TableCell align="center">
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
                                        ? "orange"
                                        : appointment.status === "Scheduled"
                                        ? "#25307F"
                                        : "#757575",
                                    fontWeight: "600",
                                    px: 0.7,
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TableCell align="center">No data found!</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Actions Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 2,
                      sx: { padding: 1 },
                    }}
                  >
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "error.main" }}>
                        Delete
                      </ListItemText>
                    </MenuItem>
                  </Menu>

                  {/* Edit Patient Dialog */}
                  <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Patient</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Modify the details of the patient.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.name}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            name: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.email}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            email: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.phone}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            phone: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Type of Visit"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.type}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            type: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Branch"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.branch}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            branch: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.date}
                        onChange={(e) =>
                          setEditedPatient({
                            ...editedPatient,
                            date: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <FormControl fullWidth margin="dense">
                        <FormLabel>Status</FormLabel>
                        <RadioGroup
                          name="status"
                          value={editedPatient.status}
                          onChange={(e) =>
                            setEditedPatient({
                              ...editedPatient,
                              status: e.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="Active"
                            control={<Radio />}
                            label="Active"
                          />
                          <FormControlLabel
                            value="In-active"
                            control={<Radio />}
                            label="In-active"
                          />
                        </RadioGroup>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleEditDialogClose}>Cancel</Button>
                      <Button>Save</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
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
    </>
  );
}

export default Receptionist;
