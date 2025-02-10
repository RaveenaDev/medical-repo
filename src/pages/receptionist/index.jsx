import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import styles from "./styles.module.scss";
import ayu from "./patients/patients.module.scss";
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
import AppointmentRequestModal from "./Appointment/Requests/AppointmentRequest.jsx";
import BookAppointment from "./Appointment/Book/BookAppointment.jsx";
import { useNavigate } from "react-router-dom";
import Select from "../../components/Select/index.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAppointmentRequests = () => {
    console.log("handleAppointmentRequests");
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };
  const handleBilling = () => {
    console.log("handleBilling");
    navigate("/receptionist/billing");
  };
  const handleBookAppointment = () => {
    console.log("handleBookAppointment");
    setIsBookAppointment(true); // Set the state to show BookAppointment component
  };

  const [branches, setBranches] = useState([
    "All Branches",
    "Cardiology",
    "Therapy",
    "Dermatology",
  ]);

  const [activeBox, setActiveBox] = useState(1);

  const boxData = [
    { id: 1, label: "Scheduled", count: 25 },
    { id: 2, label: "Ongoing", count: 12 },
    { id: 3, label: "Waiting", count: 40 },
    { id: 4, label: "Completed", count: 5 },
  ];

  const handleBoxClick = (id) => {
    setActiveBox(id);
  };

  const [appointments, setAppointments] = useState([
    {
      id: "1",
      name: "Jasmin Kaur",
      appointmentWith: "jasmin@gmail.com",
      typeVisit: "Walk In",
      branch: "Cardiology",
      tokenNo: "2024-10-08",
      status: "Ongoing",
    },
    {
      id: "2",
      name: "Amit Tripathi",
      appointmentWith: "amittripathi@gmail.com",
      typeVisit: "Referral",
      branch: "Cardiology",
      tokenNo: "2024-10-08",
      status: "Waiting",
    },
    {
      id: "3",
      name: "Amit Tripathi",
      appointmentWith: "amittripathi@gmail.com",
      typeVisit: "Referral",
      branch: "Cardiology",
      tokenNo: "2024-10-08",
      status: "Completed",
    },
  ]);

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

  // Handle Save Edited Patient
  const handleSaveEditedPatient = () => {
    setAppointments((prev) =>
      prev.map((patient) =>
        patient.id === editedPatient.id ? editedPatient : patient
      )
    );
    handleEditDialogClose();
  };

  return (
    <>
      <div>
        <CommonPanel />
        {!props.entity ? (
          <>
            <div className={styles.appointmentBlock}>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                flexDirection={{ md: "row" }}
                size={12}
                sx={{ margin: "0 0 20px 0" }}
              >
                <Grid size={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                          backgroundColor: "white",
                          boxShadow: 3,
                          borderRadius: 1,
                          width: 180, // Adjust width here
                          textAlign: "center",
                          // padding: "4px", // Reduce padding to make the container smaller
                        }}
                    >
                      <DatePicker
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          sx={{
                            width: "100%", // Ensure the date picker takes up 100% of the container's width
                            fontSize: "24px", // Adjust font size inside the date picker
                            input: {
                              fontSize: "14px", // Adjust input field font size if needed
                              padding: "10px", // Adjust input field padding to make it smaller
                            }
                          }}
                      />
                    </Box>
                  </LocalizationProvider>
                </Grid>
                <Grid
                  size={9}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                      color: "#878787",
                      textTransform: "capitalize",
                      padding: {
                        xs: "0px 8px",
                        sm: "0px 10px",
                        md: "0px 10px",
                      }, // Adjust padding
                      backgroundColor: "#fff",
                      marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Reduce margin for small screens
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: "4px", sm: "6px", md: "8px" }, // Adjust spacing between icon and text
                    }}
                    onClick={handleAppointmentRequests}
                  >
                    <img
                      src={accountCircle}
                      className={styles.appointmentBlock__accountIcon}
                    />
                    Appointment Requests
                  </Button>
                  {/* Modal Component */}
                  <AppointmentRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    requests={dummyRequests}
                  >
                    <p>This is where appointment requests will appear.</p>
                  </AppointmentRequestModal>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                      color: "#878787",
                      textTransform: "capitalize",
                      padding: {
                        xs: "0px 8px",
                        sm: "0px 10px",
                        md: "0px 10px",
                      }, // Adjust padding
                      backgroundColor: "#fff",
                      marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Reduce margin for small screens
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: "4px", sm: "6px", md: "8px" }, // Adjust spacing between icon and text
                    }}
                    onClick={handleBilling}
                  >
                    <img
                      src={billingDetails}
                      className={styles.appointmentBlock__paymentIcon}
                    />
                    Billing
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                      color: "#ffffff",
                      textTransform: "capitalize",
                      padding: {
                        xs: "0px 8px",
                        sm: "0px 10px",
                        md: "0px 10px",
                      }, // Adjust padding
                      backgroundColor: "#25307F",
                    }}
                    onClick={handleBookAppointment}
                  >
                    <img
                      src={addAppointments}
                      className={styles.appointmentBlock__plusIcon}
                    />
                    Book Appointment
                  </Button>
                </Grid>
              </Grid>
            </div>

            {/* Main Table */}

            {/* Conditionally render BookAppointment or Dashboard based on state */}
            {isBookAppointment ? (
              <BookAppointment
                isOpen={isBookAppointment}
                onClose={() => setIsBookAppointment(false)}
              />
            ) : (
              <Box sx={{ backgroundColor: "white", pt: 0.7 }}>
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
                    style={{marginBottom:"1rem",padding:"0 2rem",justifyContent:"space-between",display:"flex",gap:"1rem"}}
                >
                  {boxData.map((box) => (
                    <div key={box.id}>
                      <Box
                          sx={{
                            backgroundColor:
                                activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                            px: {sm:3,md:3,lg:6},
                            height: 55,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                            boxShadow: 1,
                            cursor: "pointer",
                            borderBottom:
                                activeBox === box.id ? "4px solid #6A0DAD" : "none",
                            transition: "all 0.3s ease-in-out",
                          }}
                        onClick={() => handleBoxClick(box.id)}
                      >
                        <h2
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 600,
                            color: "#25307F",
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
                            color: "black",
                            marginTop: "4px",
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
                      background: "#F1F1F1",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Case Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Appointment With</TableCell>
                        <TableCell>Type Visit</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Token Number</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((patient) => (
                        <TableRow
                          key={patient.id}
                          sx={{
                            background: "#fff",
                            bgcolor:
                              patient.status === "Ongoing"
                                ? "#EEF8F1"
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
                          <TableCell>{patient.id}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", cursor: "pointer" }}
                            >
                              {patient.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {patient.appointmentWith}
                            </Typography>
                          </TableCell>
                          <TableCell>{patient.typeVisit}</TableCell>
                          <TableCell>{patient.branch}</TableCell>
                          <TableCell>{patient.tokenNo}</TableCell>
                          <TableCell>
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
                                  patient.status === "Ongoing"
                                    ? "#3DB461"
                                    : "white",
                                color:
                                  patient.status === "Ongoing"
                                    ? "white"
                                    : patient.status === "Completed"
                                    ? "orange"
                                    : "#757575",
                                fontWeight: "bold",
                                px: 0.7,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(event) =>
                                handleMenuOpen(event, patient)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
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
                    <Button onClick={handleSaveEditedPatient}>Save</Button>
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
    </>
  );
}

export default Receptionist;
