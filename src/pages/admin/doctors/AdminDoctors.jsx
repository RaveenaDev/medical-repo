import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
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
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid2";
import Select from "../../../components/Select/index.jsx";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addDoctor,
  deleteDoctor,
  getDoctors,
} from "../../../components/State/Admin/Action.js";
import { useDispatch, useSelector } from "react-redux";
import Select1 from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";

const AdminDoctors = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.admin.doctors);
  const departments = useSelector((state) => state.admin.departments);
  const noOfDoctors = doctors.length;
  const [branches, setBranches] = useState([
    "All Branches",
    "Cardiology",
    "Therapy",
    "Dermatology",
  ]);

  const hospitalName = useSelector(
    (state) => state.authentication.hospitalName
  );

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    profile: "s",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "doctor",
    specialization: "",
    status: "",
    department: "",
    hospitalName: hospitalName,
  });

  const handleSubmit = () => {
    dispatch(addDoctor(newDoctor));
    console.log("New Doctor Data:", newDoctor);
    setAddDialogOpen(false);
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // Handle Edit Action
  const handleEdit = () => {
    if (selectedRoom) {
      setEditedRoom({
        roomID: selectedRoom.roomID,
        name: selectedRoom.name,
        doctorId: selectedRoom.assignedDoctor._id,
        status: selectedRoom.status,
        originalRoomID: selectedRoom._id,
      });
      setEditDialogOpen(true);
      console.log("Edit room", editedRoom);
    }
    handleMenuClose();
  }; // Handle Save Edited Room
  const handleSaveEditedRoom = () => {
    dispatch(updateRoom(editedRoom.originalRoomID, editedRoom));
    setEditDialogOpen(false);
    console.log("Patient Edited Successfully");
  };

  const handleMenuOpen = (event, doctor) => {
    event.stopPropagation(); // Prevents unwanted event bubbling
    setAnchorEl(event.currentTarget);
    setSelectedDoctor(doctor); // Correct reference
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoctor(null); // Fix: Clear selected doctor
  };

  // Handle Delete Action
  const handleDelete = () => {
    dispatch(deleteDoctor(selectedDoctor._id));
    console.log("Doctor Deleted"); // Dispatch delete action    console.log("Patient Deleted");
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <CommonPanel />

      <Box>
        <div className={ayu.headerContainer}>
          <span
            onClick={() => navigate(-1)}
            style={{
              transform: "translateY(4px)",
              color: "black",
              cursor: "pointer",
            }}
          >
            <ArrowBackIosIcon />
          </span>
          <h2 className={ayu.departmentTitle}>Total Doctors:</h2>
          <h2 className={ayu.departmentTitleDetails}>{noOfDoctors}</h2>

          <div style={{ marginLeft: "25px" }}>
            {branches.length && (
              <Grid xs={3}>
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

          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              sx={{
                fontSize: "20px",
                color: "#ffffff",
                textTransform: "capitalize",
                padding: "2px 18px",
                backgroundColor: "#25307F",
              }}
              onClick={() => setAddDialogOpen(true)} // Open the modal
            >
              <img
                src={addIcon}
                className={styles.appointmentBlock__plusIcon}
              />
              Add
            </Button>
          </div>
        </div>
      </Box>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          {/* Profile Icon Input */}
          <Avatar
            src={newDoctor.profile}
            alt="Profile"
            sx={{ width: 60, height: 60, cursor: "pointer", marginBottom: 2 }}
            onClick={() => {
              // Handle file input or image picker
              alert("Open file picker to select profile picture");
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.email}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, email: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newDoctor.password}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, password: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.name}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.phone}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, phone: e.target.value })
            }
          />

          <TextField
            select
            label="Specialization"
            name="specialization"
            value={newDoctor.specialization}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialization: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="General Checkup">General Checkup</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>
          <FormControl fullWidth margin="dense">
            <InputLabel id="doctor-select-label">Department</InputLabel>
            <Select1
              labelId="doctor-select-label"
              id="doctor-select"
              name="Departments"
              value={newDoctor.department}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, department: e.target.value })
              }
              label="Department"
              variant="outlined"
            >
              {departments?.map((department) => (
                <MenuItem
                  key={department.departmentId}
                  value={department.departmentName}
                >
                  {department.departmentName}
                </MenuItem>
              ))}
            </Select1>
          </FormControl>

          <TextField
            select
            label="Status"
            name="status"
            value={newDoctor.status}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, status: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="Idle">Idle</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
            <MenuItem value="Emergency Room">Emergency Room</MenuItem>
            <MenuItem value="In Meeting">In Meeting</MenuItem>
            <MenuItem value="With Patient">With Patient</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {/*<Button onClick={handleAddDialogClose}>Cancel</Button>*/}
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: "200px",
              backgroundColor: "#25307F",
              "&:hover": { backgroundColor: "green" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
              <TableCell align="center">Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors?.map((doctor, index) => (
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
                    src={doctor?.profile}
                    alt="Profile"
                    sx={{ width: 40, height: 40 }} // Adjust size
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {truncateText(doctor?._id, 13)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{doctor?.name}</Typography>
                </TableCell>
                <TableCell>{doctor?.phone}</TableCell>
                <TableCell>{doctor?.specialization}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={doctor?.status}
                    color={doctor?.status === "Active" ? "success" : "default"}
                    size="small"
                    sx={{
                      bgcolor:
                        doctor?.status === "Emergency Room"
                          ? "#d4edda"
                          : doctor?.status === "On Leave"
                          ? "#f8d7da"
                          : doctor?.status === "Idle"
                          ? "#ffffff"
                          : undefined,
                      color:
                        doctor?.status === "Emergency Room"
                          ? "#155724"
                          : doctor?.status === "On Leave"
                          ? "#721c24"
                          : doctor?.status === "Idle"
                          ? "#000000"
                          : undefined,

                      width: "8rem",
                      border:
                        doctor?.status === "Emergency Room"
                          ? "1px solid green"
                          : doctor?.status === "On Leave"
                          ? "1px solid red"
                          : doctor?.status === "Idle"
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
                    View Profile
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, doctor)}
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

      {/* Edit Room Dialog */}
      {/* <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Room ID"
                  name="roomID"
                  value={editedRoom.roomID}
                  onChange={(e) =>
                    setEditedRoom({ ...editedRoom, roomID: e.target.value })
                  }
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <TextField
                  margin="dense"
                  label="Room Name"
                  name="name"
                  value={editedRoom.name}
                  onChange={(e) =>
                    setEditedRoom({ ...editedRoom, name: e.target.value })
                  }
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    name="status"
                    value={editedRoom.status}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, status: e.target.value })
                    }
                    label="Status"
                    variant="outlined"
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Occupied">Occupied</MenuItem>
                    <MenuItem value="Under Maintenance">
                      Under Maintenance
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={3}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="doctor-select-label">
                    Doctor Assigned
                  </InputLabel>
                  <Select
                    labelId="doctor-select-label"
                    id="doctor-select"
                    name="doctorId"
                    value={editedRoom.doctorId}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, doctorId: e.target.value })
                    }
                    label="Doctor Assigned"
                    variant="outlined"
                  >
                    {doctors?.map((doctor) => (
                      <MenuItem key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEditedRoom} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};
export default AdminDoctors;
