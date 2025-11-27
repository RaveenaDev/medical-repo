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
  TablePagination,
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
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./PatientList.module.scss";
import useDebounce from "../../../hooks/useDebounce.js";
import { Cross, Search, X } from "lucide-react";

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ status: "" });
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
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });

  // console.log("Filter: ",filters)

  // Handle Sort Change

  const debouncedSearch = useDebounce(searchQuery, 300);
  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setFilters({
      ...filters,
      sort: event.target.value,
    });
    // console.log(event.target.value)
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
    dispatch(getFilteredPatients(filters, page, rowsPerPage, debouncedSearch));
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
    const latestAppointment =
      patient.appointments?.[patient.appointments.length - 1];
    const caseId = latestAppointment?.caseId || "Not Assigned";
    navigate("/receptionist/patients/profile", { state: { patient, caseId } });
  };
  useEffect(() => {
    // dispatch(getPatients());
    dispatch(getFilteredPatients(filters, page, rowsPerPage, debouncedSearch));
  }, [dispatch, sortOrder, page, rowsPerPage, debouncedSearch]);

  const receptionist = useSelector((store) => store.receptionist);
  const loading = useSelector(
    (store) => store.receptionist.isLoadingFilteredPatients
  );
  const noOfPatients = receptionist.totalFilteredPatients;
  const totalPatients = receptionist.filteredPatients;

  // console.log("Total :", totalPatients);

  return (
    <div>
      <Box
        sx={{
          padding: "2vh 2vh 1.5vh 2vh",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          minHeight: 0,
        }}
      >
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
            <span className={styles.patientCount}>
              {noOfPatients} <span>Inpatients</span>
            </span>

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

          <Box className={styles.filterSearch}>
            <div className={styles["search-wrapper"]}>
              <Search size={18} className={styles["search-icon"]} />
              <input
                type="text"
                placeholder="Search Patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles["search-input"]}
              />
              <X
                strokeWidth={1.2}
                className={styles["cross-icon"]}
                onClick={() => setSearchQuery("")}
              />
            </div>
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
          className={styles.tableContainer}
          sx={{
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            position: "relative",
          }}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(2px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <CircularProgress sx={{ color: "#25307F" }} />
            </Box>
          )}

          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
              background: "#F1F1F1",
              marginBottom: "0px",
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
                <TableCell>Pat Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Type Visit</TableCell>

                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
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
                      {patient?.patId || "Not Assigned"}
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
                        {truncateText(patient?.name, 18)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {truncateText(patient?.email, 18)}
                      </Typography>
                    </TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>
                      {patient?.typeVisit || "Not Assigned"}
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
                    colSpan={8}
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
                    No Patients found!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={noOfPatients}
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
  );
};

export default PatientList;
