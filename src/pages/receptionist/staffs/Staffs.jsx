import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
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
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ayu from "../doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import addIcon from "../../../assets/plus.svg";
import styles from "../styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffs } from "../../../components/State/Receptionist/Action.js";

const Staffs = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const dispatch = useDispatch();

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
    console.log("Page:", page, "Rows per page:", rowsPerPage);
    dispatch(getStaffs(page, rowsPerPage)); // Fetch all doctors
  }, [page, rowsPerPage]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  // Handle Menu Open

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
    handleEditDialogClose();
  };

  const location = useLocation();
  const staffs = useSelector((state) => state.receptionist.staffs);
  const noOfStaffs = useSelector((state) => state.receptionist.totalStaffs);

  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
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
          <CommonPanel />
        </div>
        <div style={{ marginTop: "150px" }}>
          <Box>
            <div
              className={ayu.headerContainer}
              style={{
                paddingBottom: "8px",
                borderBottom: "0.5px solid #4A4A4A8C",
              }}
            >
              <div
                className={ayu.backButton}
                onClick={() => navigate(`/receptionist`)}
              >
                <ArrowBackIosIcon />
              </div>
              <h2 className={ayu.departmentTitle}>Total Staffs:</h2>
              <h2
                className={ayu.departmentTitleDetails}
                style={{ color: "#878787" }}
              >
                {staffs?.length}
              </h2>
            </div>
          </Box>

          {/* Table Section */}
          <TableContainer
            sx={{
              maxHeight: "70vh", // Adjust this to fit your layout needs
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
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.length > 0 ? (
                  staffs.map((patient, index) => (
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
                      <TableCell sx={{ color: "#747474", fontWeight: "bold" }}>
                        {patient.phone}
                      </TableCell>
                      <TableCell sx={{ color: "#747474", fontWeight: "bold" }}>
                        {patient.department.name}
                      </TableCell>
                      <TableCell sx={{ color: "#747474", fontWeight: "bold" }}>
                        {patient.designation}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={patient.status}
                          size="small"
                          sx={{
                            backgroundColor: "transparent", // Removes background
                            color:
                              patient.status === "Available"
                                ? "#3DB461"
                                : "#E1473D",
                            fontWeight: "bold",
                            border: "none", // Ensures no border appears
                          }}
                        />
                      </TableCell>

                      {/*<TableCell>*/}
                      {/*    <IconButton*/}
                      {/*        onClick={(event) => handleMenuOpen(event, patient)}*/}
                      {/*    >*/}
                      {/*        <MoreVertIcon />*/}
                      {/*    </IconButton>*/}
                      {/*</TableCell>*/}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
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
                      No Staff found!
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
        </div>
      </div>
    </div>
  );
};
export default Staffs;
