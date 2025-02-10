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
      <CommonPanel />

      <Box sx={{ backgroundColor: "white", pt: 0.7 }}>
        {/*<Box className={avi.headerContainer} style={{position:"relative",top:"52px",left:"12px"}}>*/}
        {/*    <button className={avi.icon} onClick={handleBack}>*/}
        {/*        <ArrowBackIosIcon/>*/}
        {/*    </button>*/}
        {/*    <h2 className={avi.departmentTitle}>Appointments</h2>*/}
        {/*</Box>*/}

        <div>
          {branches.length && (
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ md: "row" }}
              size={4}
              sx={{ margin: "10px 20px 10px 0" }}
            >
              <Grid size={1} pl={2}>
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
        <Grid container spacing={7} justifyContent="center" sx={{ mb: 1 }}>
          {boxData.map((box) => (
            <Grid item xs={3} key={box.id}>
              <Box
                sx={{
                  backgroundColor: activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                  width: 240,
                  height: 55,
                  display: "flex",
                  alignItems: "center",
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
                    marginRight: "4px",
                    marginLeft: "42px",
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
            </Grid>
          ))}
        </Grid>

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
                    bgcolor: patient.status === "Ongoing" ? "#EEF8F1" : "white",
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
                        patient.status === "Active" ? "success" : "default"
                      }
                      size="small"
                      sx={{
                        bgcolor:
                          patient.status === "Ongoing" ? "#3DB461" : "white",
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
                      onClick={(event) => handleMenuOpen(event, patient)}
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
            <Button onClick={handleSaveEditedPatient}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Appointments;
