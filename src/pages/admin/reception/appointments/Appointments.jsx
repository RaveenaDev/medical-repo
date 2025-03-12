import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import CommonPanel from "../../Components/CommonPanel.jsx";
import Grid from "@mui/material/Grid2";
import Select from "../../../../components/Select/index.jsx";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../../components/State/Admin/Action.js";

function Appointments(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleBack = () => {
    navigate("/admin/reception");
  };

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
    (store) => store.admin.scheduledAppointments
  );
  const ongoingAppointments = useSelector(
    (store) => store.admin.ongoingAppointments
  );
  const waitingAppointments = useSelector(
    (store) => store.admin.waitingAppointments
  );
  const completedAppointments = useSelector(
    (store) => store.admin.completedAppointments
  );

  const boxData = [
    { id: 1, label: "Scheduled", count: scheduledAppointments.length },
    { id: 2, label: "Ongoing", count: ongoingAppointments.length },
    { id: 3, label: "Waiting", count: waitingAppointments.length },
    { id: 4, label: "Completed", count: completedAppointments.length },
  ];

  const handleBoxClick = (id) => {
    setActiveBox(id);
  };

  const activeLabel = boxData.find((box) => box.id === activeBox)?.label;

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

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  let totalAppointments = [];

  switch (activeLabel) {
    case "Scheduled":
      totalAppointments = scheduledAppointments;
      break;
    case "Ongoing":
      totalAppointments = ongoingAppointments;
      break;
    case "Waiting":
      totalAppointments = waitingAppointments;
      break;
    case "Completed":
      totalAppointments = completedAppointments;
      break;
    default:
      totalAppointments = [];
  }

  return (
    <>
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
        <CommonPanel />
      </div>

      <div style={{ marginTop: "200px" }}>
        <Box sx={{ backgroundColor: "white", pt: 0.7 }}>
          <div>
            {branches.length && (
              <Grid
                container
                spacing={2}
                // justifyContent="flex-end"
                justifyContent="space-between"
                alignItems="center"
                flexDirection={{ md: "row" }}
                // size={12}
                sx={{ margin: "10px 20px 10px 0" }}
              >
                <Grid size={3} pl={2}>
                  <h3
                    style={{
                      color: "#25307F",
                      paddingBottom: "12px",
                      cursor: "pointer",
                    }}
                    onClick={handleBack}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        transform: "translateY(5px)",
                      }}
                    >
                      <ArrowBackIosIcon />
                    </span>
                    Appointments
                  </h3>
                </Grid>
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
                    px: { sm: 3, md: 3, lg: 6 },
                    height: 55,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    boxShadow: 1,
                    cursor: "pointer",
                    borderBottom:
                      activeBox === box.id ? "4px solid #25307F" : "none",
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
                      // marginLeft: "20%",
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
                  <TableCell sx={{paddingLeft:"28px"}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalAppointments.length > 0 ? (
                  totalAppointments.map((patient, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        background: "#fff",
                        bgcolor:
                          patient.status === "Ongoing" ? "#EEF8F1" : "white",
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
                      <TableCell sx={{color:'#25307F'}}>{truncateText(patient.caseId, 13)}</TableCell>
                      <TableCell sx={{color:'#25307F'}}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                          {patient.patient.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{color:'#878787'}}>
                        <Typography variant="body2">
                          {patient.doctor?.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{color:'#878787'}}>{patient.typeVisit}</TableCell>
                      <TableCell sx={{color:'#878787'}}>{patient.department.name}</TableCell>
                      <TableCell align="center" sx={{color:'#878787',paddingRight:'40px'}}>{patient?.tokenNumber || "N/A"}</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.status}
                          size="small"
                          sx={{
                            bgcolor:
                              patient.status === "Ongoing"
                                ? "#3DB461"
                                : patient.status === "Scheduled"
                                ? "#25307F"
                                : patient.status === "Waiting"
                                ? "#ffffff"
                                : "white",
                            color:
                              patient.status === "Ongoing"
                                ? "#FFFFFF"
                                : patient.status === "Completed"
                                ? "orange"
                                : patient.status === "Scheduled"
                                ? "white"
                                : patient.status === "Waiting"
                                ? "#878787"
                                : "#757575",
                            fontWeight: "bold",
                            px: 0.7,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, patient)}
                        >
                          <MoreVertIcon />
                        </IconButton>
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
                    <TableCell>No data found!</TableCell>
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
              <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
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
      </div>
    </>
  );
}

export default Appointments;
