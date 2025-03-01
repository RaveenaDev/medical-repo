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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaff,
  deleteStaff,
  getDoctors,
  updateStaff,
} from "../../../components/State/Admin/Action.js";

const AdminStaffs = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedStaff, setEditedStaff] = useState({
    staff_id: "",
    staffId: "",
    profile: "",
    name: "",
    phone: "",
    department: "",
    designation: "",
    status: "",
  });
  // Handle Edit Action
  const handleEdit = () => {
    if (selectedStaff) {
      setEditedStaff({
        profile: selectedStaff.profile,
        name: selectedStaff.name,
        phone: selectedStaff.phone,
        department: selectedStaff.department._id,
        designation: selectedStaff.designation,
        staff_id: selectedStaff.staff_id,
        staffId: selectedStaff._id,
        status: selectedStaff.status,
      });

      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  // Handle Save Edited Room
  const handleSaveEditedStaff = () => {
    dispatch(updateStaff(editedStaff.staffId, editedStaff));
    setEditDialogOpen(false);
  };

  // Handle Menu Open
  const handleMenuOpen = (event, staff) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorEl(event.currentTarget);
    setSelectedStaff(staff);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStaff(null);
  };

  // Handle Delete Action
  const handleDelete = () => {
    dispatch(deleteStaff(selectedStaff._id));
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    staff_id: "",
    profile: "",
    name: "",
    phone: "",
    department: "",
    designation: "",
    status: "",
  });

  const handleSubmit = () => {
    dispatch(addStaff(newStaff));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const staffs = useSelector((state) => state.admin.staffs);
  const noOfStaffs = staffs.length;

  const departments = useSelector((state) => state.admin.departments);

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
          <input
            type="file"
            accept="image/*"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="file-input">
            <Avatar
              src={newStaff.profile}
              alt="Profile"
              sx={{ width: 60, height: 60, cursor: "pointer", marginBottom: 2 }}
            />
          </label>

          <TextField
            autoFocus
            margin="dense"
            label="Staff Id"
            type="text"
            fullWidth
            variant="outlined"
            value={newStaff.staff_id}
            onChange={(e) =>
              setNewStaff({ ...newStaff, staff_id: e.target.value })
            }
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
            {departments?.map((departments) => (
              <MenuItem
                key={departments.departmentId}
                value={departments.departmentId}
              >
                {departments.departmentName}
              </MenuItem>
            ))}
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
            {staffs.map((staff) => (
              <TableRow
                key={staff?._id}
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
                    src={staff?.profile}
                    alt="Profile"
                    sx={{ width: 40, height: 40 }} // Adjust size
                  />
                </TableCell>
                <TableCell sx={{ color: "#25307F", fontWeight: "bold" }}>
                  {staff?.staff_id}
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
                    {staff?.name}
                  </Typography>
                </TableCell>
                <TableCell>{staff?.phone}</TableCell>
                <TableCell>{staff?.department.name}</TableCell>
                <TableCell>{staff?.designation}</TableCell>
                <TableCell>
                  <Chip
                    label={staff?.status}
                    size="small"
                    sx={{
                      backgroundColor: "transparent", // Removes background
                      color: staff?.status === "Available" ? "green" : "red", // Black for Available, Red otherwise
                      fontWeight: "bold",
                      border: "none", // Ensures no border appears
                    }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, staff)}>
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
        <DialogTitle>Edit Staff</DialogTitle>
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
              src={editedStaff.profile}
              alt="Profile"
              sx={{ width: 60, height: 60, cursor: "pointer", marginBottom: 2 }}
            />
          </label>

          <TextField
            autoFocus
            margin="dense"
            label="Staff Id"
            type="text"
            fullWidth
            variant="outlined"
            value={editedStaff.staff_id}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, staff_id: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editedStaff.name}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={editedStaff.phone}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, phone: e.target.value })
            }
          />

          <TextField
            select
            label="Department"
            name="department"
            value={editedStaff.department}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, department: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            {departments?.map((departments) => (
              <MenuItem
                key={departments.departmentId}
                value={departments.departmentId}
              >
                {departments.departmentName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Designation"
            name="designation"
            value={editedStaff.designation}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, designation: e.target.value })
            }
            fullWidth
            margin="dense"
          ></TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={editedStaff.status}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, status: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEditedStaff}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AdminStaffs;
