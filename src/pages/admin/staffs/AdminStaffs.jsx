import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
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
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../../components/State/Admin/Action.js";

const AdminStaffs = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const [patients, setPatients] = useState([
    {
      profile: "1",
      staffId: "XXXXXXXX",
      name: "Jasmin Kaur",
      phone: "+91 79327728",
      department: "Walk In",
      designation: "Cardiology",
      status: "Available",
    },
    {
      profile: "2",
      staffId: "XXXXXXXX",
      name: "Amit Tripathi",
      phone: "+91 79327728",
      department: "Referral",
      designation: "Cardiology",
      status: "On Leave",
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
    // setPatients((prev) => prev.filter((patient) => patient.id !== selectedPatient.id));
    console.log("Patient Deleted");
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  // Handle Save Edited Patient
  const handleSaveEditedPatient = () => {
    // setPatients((prev) =>
    //     prev.map((patient) => (patient.id === editedPatient.id ? editedPatient : patient))
    // );
    console.log("Patient Edited Successfully");
    handleEditDialogClose();
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    profile: "",
    name: "",
    phone: "",
    department: "",
    designation: "",
    status: "",
  });

  const handleSubmit = () => {
    console.log("New Staff Data:", newStaff);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);
  const admin = useSelector((store) => store.admin);
  const noOfStaffs = admin.totalStaffs;
  const staffs = admin.staffs;

  console.log("Staffs: ", staffs);

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
          <h2 className={ayu.departmentTitle}>Total Staffs:</h2>
          <h2 className={ayu.departmentTitleDetails}>{noOfStaffs}</h2>

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
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          {/* Profile Icon Input */}
          <Avatar
            src={newStaff.profile}
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
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={newStaff.phone}
            onChange={(e) =>
              setNewStaff({ ...newStaff, phone: e.target.value })
            }
          />

          <TextField
            select
            label="Department"
            name="department"
            value={newStaff.department}
            onChange={(e) =>
              setNewStaff({ ...newStaff, department: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="General Checkup">General Checkup</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>

          <TextField
            select
            label="Designation"
            name="designation"
            value={newStaff.designation}
            onChange={(e) =>
              setNewStaff({ ...newStaff, designation: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="General Checkup">General Checkup</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={newStaff.status}
            onChange={(e) =>
              setNewStaff({ ...newStaff, status: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
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
              <TableCell>Staff ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((patient) => (
              <TableRow
                key={patient._id}
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
                <TableCell sx={{ color: "#25307F", fontWeight: "bold" }}>
                  {patient.staff_id}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: "#25307F",
                      cursor: "pointer",
                    }}
                  >
                    {patient.name}
                  </Typography>
                </TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.department.name}</TableCell>
                <TableCell>{patient.designation}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    size="small"
                    sx={{
                      backgroundColor: "transparent", // Removes background
                      color: patient.status === "Available" ? "green" : "red", // Black for Available, Red otherwise
                      fontWeight: "bold",
                      border: "none", // Ensures no border appears
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
              setEditedPatient({ ...editedPatient, name: e.target.value })
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
              setEditedPatient({ ...editedPatient, email: e.target.value })
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
              setEditedPatient({ ...editedPatient, phone: e.target.value })
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
              setEditedPatient({ ...editedPatient, type: e.target.value })
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
              setEditedPatient({ ...editedPatient, branch: e.target.value })
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
              setEditedPatient({ ...editedPatient, date: e.target.value })
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
                setEditedPatient({ ...editedPatient, status: e.target.value })
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
    </>
  );
};
export default AdminStaffs;
