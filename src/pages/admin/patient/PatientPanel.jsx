import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Chip,
  Drawer,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import CommonPanel from "../Components/CommonPanel.jsx";
import { useDispatch, useSelector } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  getFilteredPatients,
  updatePatient,
} from "../../../components/State/Admin/Action.js";

const PatientPanel = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: "",
    type: "",
      sort: "desc"
  });

  // Handle Sort Change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
      setFilters({
          ...filters,
          sort: event.target.value
      })
    // console.log(event.target.value)
  };

    // console.log("Sorting: ",filters)

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
    if (selectedPatient) {
      setEditedPatient({
        id: selectedPatient._id,
        status: selectedPatient.status,
      });
    }

    setEditDialogOpen(true);
    handleMenuClose();
  };

  // Handle Filter Changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Search Results
  const handleSearchResults = () => {
    dispatch(getFilteredPatients(filters));
    setFilterDrawerOpen(false);
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  // Handle Save Edited Patient
  const handleSaveEditedPatient = () => {
    dispatch(updatePatient(editedPatient.id, editedPatient, filters));
    handleEditDialogClose();
  };

  // const location = useLocation();
  // const totalPatients = location.state?.totalPatients;

  const navigate = useNavigate();
  const handleClick = (patient) => {
    navigate(`/admin/reception/patients/PatientDetails`, {
      state: { patient },
    });
  };

  useEffect(() => {
    // dispatch(getPatients());
    dispatch(getFilteredPatients(filters));
  }, [dispatch,sortOrder]);

  const admin = useSelector((store) => store.admin);
  const noOfPatients = admin.totalFilteredPatients;
  const totalPatients = admin.filteredPatients;

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
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
          width: "76%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "140px" }}>
        <Box sx={{ padding: 2 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "0.5px solid #4A4A4A8C",
              borderBottom: "0.5px solid #4A4A4A8C",
              paddingY: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  color: "#25307F",
                  gap: 1,
                  borderRight: "0.5px solid #4A4A4A8C",
                  paddingRight: 2,
                  marginRight: 1,
                }}
              >
                {noOfPatients}
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "#878787",
                    fontSize: "1rem",
                    fontWeight: "normal",
                  }}
                >
                  Patients
                </Typography>
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: 1,
                    color: "#25307F",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "1.25rem",
                    lineHeight: " 100%",
                    letterSpacing: " 0%",
                  }}
                >
                  Sort by:
                </Typography>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  size="small"
                  sx={{
                    minWidth: 180,
                    background: "#fff",
                    color: "#4A4A4A",
                    boxShadow: "0px 4px 4px 0px #BDBDBD1C",
                    border: "1px solid transparent",
                    outline: "none",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "inherit", // Removes hover effect
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent", // Hides the border
                    },
                  }}
                >
                  <MenuItem value="desc">Newest to Oldest</MenuItem>
                  <MenuItem value="asc">Oldest to Newest</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                startIcon={<FilterAltIcon />}
                sx={{
                  textTransform: "none",
                  padding: "6px 20px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  fontSize: "15px",
                  color: "#25307F",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                    backgroundColor: "white",
                  },
                }}
                onClick={() => setFilterDrawerOpen(true)}
              >
                Filter
              </Button>
            </Box>
          </Box>

          {/* Table Section */}
          <TableContainer
            sx={{
              maxHeight: "64vh", // Adjust this to fit your layout needs
              overflowY: "auto",
            }}
          >
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                background: "#F1F1F1",
                marginBottom: "20px",
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
                  <TableCell>Case Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Type Visit</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center" sx={{ paddingRight: "22px" }}>
                    Status
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalPatients.length > 0 ? (
                  totalPatients.map((patient, index) => (
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
                      <TableCell sx={{ color: "#25307F", fontWeight: "bold" }}>
                        {truncateText(
                          patient.appointments[patient.appointments.length - 1]
                            ?.caseId || "Not Assigned",
                          13
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "#25307F" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "#25307F",
                          }}
                          onClick={() => handleClick(patient)}
                        >
                          {patient.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "underline" }}
                        >
                          {patient.email}
                        </Typography>
                      </TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>
                        {patient.appointments[patient.appointments.length - 1]
                          ?.typeVisit || "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        {patient.appointments[patient.appointments.length - 1]
                          ?.branch || "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        {new Date(patient.registrationDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={
                            patient.status.charAt(0).toUpperCase() +
                            patient.status.slice(1)
                          }
                          color={
                            patient.status.toLowerCase() === "active"
                              ? "success"
                              : "default"
                          }
                          size="small"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor:
                              patient.status.toLowerCase() === "active"
                                ? "#d4edda"
                                : "#f0f0f0",
                            color:
                              patient.status.toLowerCase() === "active"
                                ? "#155724"
                                : "#757575",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            "&:focus": {
                              outline: "none",
                              boxShadow: "none",
                            },
                          }}
                          onClick={(event) => handleMenuOpen(event, patient)}
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
          </TableContainer>

          {/* Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          </Menu>

          {/* Edit Patient Dialog */}
          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogContent sx={{ width: "250px" }}>
              <FormControl fullWidth margin="dense">
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={editedPatient.status || ""}
                  onChange={(e) =>
                    setEditedPatient({
                      ...editedPatient,
                      status: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button
                onClick={handleSaveEditedPatient}
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

          {/* Filter Drawer */}
          <Drawer
            anchor="right"
            open={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                height: "72vh", // Adjust height as needed
                top: "10vh", // Center it vertically
                borderRadius: "10px 0 0 10px", // Optional rounded corners
              },
            }}
          >
            <Box sx={{ width: 200, padding: 2, paddingLeft: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "#0B0B0B" }}>
                  Filter By
                </Typography>
                <IconButton
                  sx={{
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    color: "black",
                  }}
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Filter Options */}
              <FormControl
                sx={{ marginBottom: 4, marginTop: 2, width: "100%" }}
                component="fieldset"
              >
                <FormLabel
                  component="legend"
                  sx={{
                    marginBottom: 1,
                    color: "#000000",
                    "&.Mui-focused": { color: "#000000" }, // Prevents blue color on focus
                  }}
                >
                  Status
                </FormLabel>
                <RadioGroup
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    value="active"
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="Active"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value="inactive"
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="In-active"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value=""
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="All"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                </RadioGroup>
              </FormControl>

              <FormControl
                sx={{ marginBottom: 4, width: "100%" }}
                component="fieldset"
              >
                <FormLabel
                  component="legend"
                  sx={{
                    marginBottom: 1,
                    color: "#000000",
                    "&.Mui-focused": { color: "#000000" }, // Prevents blue color on focus
                  }}
                >
                  Type of Visit
                </FormLabel>
                <RadioGroup
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    value="Walk in"
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="Walk in"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value="Referral"
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="Referral"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value="Online"
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="Online"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value=""
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label="All"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                </RadioGroup>
              </FormControl>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#25307F",
                  textTransform: "none", // Prevents uppercase transformation
                  borderRadius: "16px",
                  padding: "6px 35px",
                  marginLeft: "4px",
                }}
                onClick={handleSearchResults}
              >
                Search Results
              </Button>
            </Box>
          </Drawer>
        </Box>
      </div>
    </div>
  );
};

export default PatientPanel;
