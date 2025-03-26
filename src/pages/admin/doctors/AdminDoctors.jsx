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
  updateDoctor,
} from "../../../components/State/Admin/Action.js";
import { useDispatch, useSelector } from "react-redux";
import Select1 from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const hospitalName = localStorage.getItem("hospitalName");

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

  const [errors, setErrors] = useState({}); // Added error state
  const validateDoctor = (doctor, isEdit = false) => {
    let newErrors = {};

    // Check required fields
    Object.keys(doctor).forEach((key) => {
      if (
        (!doctor[key] || doctor[key].trim() === "") && // Check empty values
        key !== "profile" &&
        key !== "role" &&
        key !== "hospitalName" &&
        (isEdit ? key !== "department" : true) // Skip department if in edit mode
      ) {
        newErrors[key] = "This field is required";
      }
    });

    // Validate email format
    if (doctor.email && !/^\S+@\S+\.\S+$/.test(doctor.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Validate phone number
    if (doctor.phone && !/^\d{10}$/.test(String(doctor.phone))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateDoctor(newDoctor);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors!", { position: "bottom-right" });
      return;
    }
    dispatch(addDoctor(newDoctor));
    setErrors({});
    setAddDialogOpen(false);
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewStaff({ ...newStaff, profile: imageUrl });
    } else {
      // Handle the case when no file is selected
      setNewStaff({ ...newStaff, profile: "" });
    }
  };
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    profile: "s",
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    status: "",
    department: "",
  });
  // Handle Edit Action
  const handleEdit = () => {
    if (selectedDoctor) {
      setEditedDoctor({
        profile: selectedDoctor.profile,
        name: selectedDoctor.name,
        email: selectedDoctor.email,
        password: selectedDoctor.password,
        phone: selectedDoctor.phone,
        specialization: selectedDoctor.specialization,
        status: selectedDoctor.status,
        department: selectedDoctor.department,
        _id: selectedDoctor._id,
      });
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  // Handle Save Edited Doctor
  const handleSaveEditedDoctor = () => {
    const newErrors = validateDoctor(editedDoctor, true);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors!", { position: "bottom-right" });
      return;
    }
    dispatch(updateDoctor(editedDoctor._id, editedDoctor));
    setErrors({});
    setEditDialogOpen(false);
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
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
    handleMenuClose();
  };

  return (
    <div
      style={{
        height: "96dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
        background: " #F1F1F1",
      }}
    >
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
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:hover": {
                    background: "#AEC3FF",
                  },
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
              error={!!errors.email}
              helperText={errors.email}
              required
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
              error={!!errors.password}
              helperText={errors.password}
              required
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
              error={!!errors.name}
              helperText={errors.name}
              required
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Phone"
              error={!!errors.phone}
              helperText={errors.phone}
              required
              type="text"
              fullWidth
              variant="outlined"
              value={newDoctor.phone}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, phone: e.target.value })
              }
            />

            <TextField
              margin="dense"
              label="Specialization"
              name="specialization"
              value={newDoctor.specialization}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, specialization: e.target.value })
              }
              fullWidth
              type="text"
              variant="outlined"
              error={!!errors.specialization}
              helperText={errors.specialization}
              required
            />
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
                error={!!errors.department}
                required
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
              error={!!errors.status}
              helperText={errors.status}
              required
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
        <TableContainer
          sx={{
            maxHeight: "70vh", // Adjust this to fit your layout needs
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
                backgroundColor: "#f1f1f1",
                top: 0,
                zIndex: 10, // Keep it above other elements
              }}
            >
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
                    <Typography
                      variant="body1"
                      sx={{ color: "#25307F", fontWeight: "bold" }}
                    >
                      {truncateText(doctor?._id, 8)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ color: "#25307F" }}>
                      {truncateText(doctor?.name, 13)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#747474" }}>
                    {doctor?.phone}
                  </TableCell>
                  <TableCell sx={{ color: "#747474" }}>
                    {doctor?.specialization || "Not Assigned"}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={doctor?.status}
                      color={
                        doctor?.status === "Active" ? "success" : "default"
                      }
                      size="small"
                      sx={{
                        bgcolor:
                          doctor?.status === "Available"
                            ? "#d4edda"
                            : doctor?.status === "On Leave"
                            ? "#f8d7da"
                            : doctor?.status === "Idle"
                            ? "000000"
                            : undefined,
                        color:
                          doctor?.status === "Available"
                            ? "#2E823B"
                            : doctor?.status === "On Leave"
                            ? "#E1473D"
                            : doctor?.status === "Idle"
                            ? "#878787"
                            : undefined,

                        width: "8rem",
                        border:
                          doctor?.status === "Available"
                            ? "1px solid #2E823B"
                            : doctor?.status === "On Leave"
                            ? "1px solid #E1473D"
                            : doctor?.status === "Idle"
                            ? "1px solid #878787"
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
                        border: "2px solid #25307F", // Purple border
                        borderRadius: "18px", // Rounded corners
                        px: 4,
                        color: "#25307F", // Blue text color
                        textTransform: "none", // Prevents uppercase text
                        fontSize: "12px", // Adjust text size if needed
                        "&:hover": {
                          borderColor: "#25307F", // Darker border on hover
                          backgroundColor: "rgba(128, 0, 128, 0.1)", // Light purple hover effect
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                  {/*<TableCell align="right">*/}
                  {/*  <IconButton*/}
                  {/*    onClick={(event) => handleMenuOpen(event, doctor)}*/}
                  {/*  >*/}
                  {/*    <MoreVertIcon />*/}
                  {/*  </IconButton>*/}
                  {/*</TableCell>*/}
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

        {/* Edit Doctor Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogContent>
            {/* Profile Icon Input */}
            <input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="file-input">
              <Avatar
                src={editedDoctor.profile}
                alt="Profile"
                sx={{
                  width: 60,
                  height: 60,
                  cursor: "pointer",
                  marginBottom: 2,
                }}
              />
            </label>

            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={editedDoctor.email}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              required
            />

            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={editedDoctor.password}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editedDoctor.name}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            <TextField
              margin="dense"
              label="Phone"
              type="text"
              fullWidth
              variant="outlined"
              value={editedDoctor.phone}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, phone: e.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />

            <TextField
              type="text"
              variant="outlined"
              label="Specialization"
              name="specialization"
              value={editedDoctor.specialization}
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                  specialization: e.target.value,
                })
              }
              fullWidth
              margin="dense"
              error={!!errors.specialization}
              helperText={errors.specialization}
              required
            ></TextField>
            {/* <FormControl fullWidth margin="dense">
            <InputLabel id="doctor-select-label">Department</InputLabel>
            <Select1
              labelId="doctor-select-label"
              id="doctor-select"
              name="Departments"
              value={editedDoctor.department}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, department: e.target.value })
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
          </FormControl> */}

            <TextField
              select
              label="Status"
              name="status"
              value={editedDoctor.status}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, status: e.target.value })
              }
              fullWidth
              margin="dense"
              error={!!errors.status}
              helperText={errors.status}
              required
            >
              <MenuItem value="Idle">Idle</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
              <MenuItem value="Emergency Room">Emergency Room</MenuItem>
              <MenuItem value="In Meeting">In Meeting</MenuItem>
              <MenuItem value="With Patient">With Patient</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={handleSaveEditedDoctor}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default AdminDoctors;
