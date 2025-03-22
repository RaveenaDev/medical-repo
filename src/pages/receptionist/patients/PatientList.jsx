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
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getFilteredPatients,
    getPatients,
    updatePatient,
} from "../../../components/State/Receptionist/Action";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const PatientList = () => {
  const [sortOrder, setSortOrder] = useState("Newest to Oldest");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ status: "" });
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: "",
    type: "",
  });

  // console.log("Filter: ",filters)

  // Handle Sort Change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

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
    dispatch(updatePatient(editedPatient.id, editedPatient));
    handleEditDialogClose();
  };
  const navigate = useNavigate();
  const handleClick = (patient) => {
    navigate(`/receptionist/patients/profile`, { state: { patient } });
  };

  useEffect(() => {
    // dispatch(getPatients());
      dispatch(getFilteredPatients(filters));
  }, [dispatch]);

  const receptionist = useSelector((store) => store.receptionist);
  const noOfPatients = receptionist.totalFilteredPatients;
  const totalPatients = receptionist.filteredPatients;

  // console.log("Total :",totalPatients)

  return (
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
          marginBottom: 3,
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
              variant="body1"
              component="span"
              sx={{ color: "#878787", fontSize: "1rem", fontWeight: "normal" }}
            >
              Patients
            </Typography>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ marginRight: 1, color: "#25307F" }}
            >
              Sort by:
            </Typography>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              size="small"
              sx={{
                minWidth: 160,
                background: "#fff",
                color: "#4A4A4A",
                boxShadow: "0px 4px 4px 0px #BDBDBD1C",
              }}
            >
              <MenuItem value="Newest to Oldest">Newest to Oldest</MenuItem>
              <MenuItem value="Oldest to Newest">Oldest to Newest</MenuItem>
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
          maxHeight: "60vh", // Adjust this to fit your layout needs
          overflowY: "auto",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            background: "#F1F1F1",
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalPatients.map((patient, index) => (
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
                  {patient.appointments[patient.appointments.length - 1]
                    ?.caseId || "Not Assigned"}
                </TableCell>
                <TableCell>
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
                  <Typography variant="body2" color="text.secondary">
                    {patient.email}
                  </Typography>
                </TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>
                  {patient?.typeVisit || "Not Assigned"}
                </TableCell>
                <TableCell>
                  {patient.appointments[patient.appointments.length - 1]?.branch || "Not Assigned"}
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
            ))}
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
      {/* // Edit Patient Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent sx={{ width: "250px" }}>
          <FormControl fullWidth margin="dense">
            <FormLabel>Status</FormLabel>
            <RadioGroup
              name="status"
              value={editedPatient.status || ""}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, status: e.target.value })
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
  );
};

export default PatientList;
