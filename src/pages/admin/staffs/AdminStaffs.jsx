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
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
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
  getStaffs,
  updateStaff,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const AdminStaffs = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [errors, setErrors] = useState({}); // Added error state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };
  useEffect(() => {
    dispatch(getStaffs(page, rowsPerPage)); // Fetch all doctors
  }, [page, rowsPerPage]);
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
    let newErrors = {};

    Object.keys(editedStaff).forEach((key) => {
      if (key !== "profile" && !editedStaff[key]) {
        newErrors[key] = "This field is required";
      }
    });
    if (!/^\d{10}$/.test(editedStaff.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }
    dispatch(updateStaff(editedStaff.staffId, editedStaff));
    setErrors({});
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
    let newErrors = {};

    Object.keys(newStaff).forEach((key) => {
      if (key !== "profile" && !newStaff[key]) {
        newErrors[key] = "This field is required";
      }
    });
    if (!/^\d{10}$/.test(newStaff.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }
    dispatch(addStaff(newStaff));
    setAddDialogOpen(false);
    setErrors({});
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const staffs = useSelector((state) => state.admin.staffs);
  const loading = useSelector((state) => state.admin.isLoading);
  const noOfStaffs = staffs.length;
  // const noOfStaffs = null;
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
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
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
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                borderBottom: "0.5px solid #4A4A4A8C",
                paddingBottom: 1.5,
              }}
            >
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

            <Dialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
            >
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
                  label="Staff Id"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newStaff.staff_id}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, staff_id: e.target.value })
                  }
                  error={!!errors.staff_id}
                  helperText={errors.staff_id}
                  required
                />

                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newStaff.name}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
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
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />

                <TextField
                  label="Department"
                  name="department"
                  value={newStaff.department}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, department: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  error={!!errors.department}
                  helperText={errors.department}
                  required
                  select
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
                  value={newStaff.designation}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, designation: e.target.value })
                  }
                  fullWidth
                  margin="dense"
                  error={!!errors.designation}
                  helperText={errors.designation}
                  required
                ></TextField>

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
                  error={!!errors.status}
                  helperText={errors.status}
                  required
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
                    "&:hover": {
                      background: "#AEC3FF",
                    },
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            {/* Table Section */}
            <TableContainer
              sx={{
                maxHeight: "72vh", // Adjust this to fit your layout needs
                overflowY: "auto",
                position: "relative",
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
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Profile
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Staff ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Phone Number
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Designation
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffs.length > 0 ? (
                    staffs.map((staff) => (
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
                        <TableCell
                          sx={{ color: "#25307F", fontWeight: "bold" }}
                        >
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
                        <TableCell sx={{ color: "#747474" }}>
                          {staff?.phone}
                        </TableCell>
                        <TableCell sx={{ color: "#747474" }}>
                          {staff?.department.name}
                        </TableCell>
                        <TableCell sx={{ color: "#747474" }}>
                          {staff?.designation}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={staff?.status}
                            size="small"
                            sx={{
                              backgroundColor: "transparent", // Removes background
                              color:
                                staff?.status === "Available"
                                  ? "#3DB461"
                                  : "#E1473D", // Black for Available, Red otherwise
                              fontWeight: "bold",
                              border: "none", // Ensures no border appears
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, staff)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={8}
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
                        No data found!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={noOfStaffs}
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
                  label="Staff Id"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editedStaff.staff_id}
                  onChange={(e) =>
                    setEditedStaff({ ...editedStaff, staff_id: e.target.value })
                  }
                  error={!!errors.staff_id}
                  helperText={errors.staff_id}
                  required
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
                  value={editedStaff.phone}
                  onChange={(e) =>
                    setEditedStaff({ ...editedStaff, phone: e.target.value })
                  }
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />

                <TextField
                  select
                  label="Department"
                  name="department"
                  value={editedStaff.department}
                  onChange={(e) =>
                    setEditedStaff({
                      ...editedStaff,
                      department: e.target.value,
                    })
                  }
                  fullWidth
                  margin="dense"
                  error={!!errors.department}
                  helperText={errors.department}
                  required
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
                    setEditedStaff({
                      ...editedStaff,
                      designation: e.target.value,
                    })
                  }
                  fullWidth
                  margin="dense"
                  error={!!errors.designation}
                  helperText={errors.designation}
                  required
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
                  error={!!errors.status}
                  helperText={errors.status}
                  required
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditDialogClose}>Cancel</Button>
                <Button
                  onClick={handleSaveEditedStaff}
                  sx={{
                    backgroundColor: "#25307F",
                    "&:hover": {
                      background: "#AEC3FF",
                    },
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminStaffs;
