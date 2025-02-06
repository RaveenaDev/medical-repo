import React, {useEffect, useState} from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterBox from "./Components/FilterBox";
import {Link, useNavigate} from "react-router-dom";
import rav from "../receptionist/styles.module.scss";
import EntityBasedTable from "../receptionist/EntityBasedTable/index.jsx";
import CommonPanel from "./Components/CommonPanel.jsx";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";


const PatientPanel = (props) => {

  const[showFilter, setShowFilter] = useState(false);

    const [tableIndex, setTableIndex] = useState(null);
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

  const [sortOrder, setSortOrder] = useState("Newest to Oldest");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "Jasmin Kaur",
      email: "jasmin@gmail.com",
      phone: "+91 79327728",
      type: "Walk In",
      branch: "Cardiology",
      date: "2024-10-08",
      status: "Active",
    },
    {
      id: "2",
      name: "Amit Tripathi",
      email: "amittripathi@gmail.com",
      phone: "+91 79327728",
      type: "Referral",
      branch: "Cardiology",
      date: "2024-10-08",
      status: "In-active",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
  });

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
    setEditedPatient(selectedPatient); // Load selected patient into editedPatient
    setEditDialogOpen(true);
    handleMenuClose();
  };

  // Handle Delete Action
  const handleDelete = () => {
    setPatients((prev) =>
        prev.filter((patient) => patient.id !== selectedPatient.id)
    );
    handleMenuClose();
  };

  // Handle Filter Changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Search Results
  const handleSearchResults = () => {
    console.log("Filters Applied:", filters);
    setFilterDrawerOpen(false);
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  // Handle Save Edited Patient
  const handleSaveEditedPatient = () => {
    setPatients((prev) =>
        prev.map((patient) =>
            patient.id === editedPatient.id ? editedPatient : patient
        )
    );
    handleEditDialogClose();
  };

    const navigate = useNavigate()
  const handleBack = () => {
    navigate('/admin/reception')
  }
  
  return (

      <>
        <CommonPanel/>
          <div className={rav.receptionist}>
              {!props.entity ?
                  <>
                      <Box
                          sx={{
                              padding: 3,
                              backgroundColor: "#F9FAFB",
                              minHeight: "100vh",
                              position:"relative"
                          }}
                      >
                          {/* Header Section */}
                          <Box
                              sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: 2,
                              }}
                          >
                              <Box sx={{ display: "flex", alignItems: "center",cursor:"pointer",color:"#25307F" }} onClick={handleBack}>
                                  <ArrowBackIosIcon sx={{ marginRight: 0.2 }} />
                                  <Typography variant="h6" sx={{ fontWeight: "bold"}}>
                                      Patient List
                                  </Typography>
                              </Box>
                          </Box>

                        {/* Header Section */}
                        <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderTop: "0.5px solid #4A4A4A8C",
                              borderBottom: "0.5px solid #4A4A4A8C",
                              paddingY: 2,
                              marginBottom: 3,
                            }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: "bold",
                                  borderRight: "0.5px solid #4A4A4A8C",
                                  paddingRight: 2,
                                  marginRight: 2,
                                  color: "#25307F"
                                }}
                            >
                              {patients.length}{" "}
                              <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ fontWeight: "normal", color: "black" }}
                              >
                                Patients
                              </Typography>
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body1" sx={{ marginRight: 1, color: "black" }}>
                                Sort by:
                              </Typography>
                              <Select
                                  value={sortOrder}
                                  onChange={handleSortChange}
                                  size="small"
                                  sx={{ minWidth: 160 }}
                              >
                                <MenuItem value="Newest to Oldest">Newest to Oldest</MenuItem>
                                <MenuItem value="Oldest to Newest">Oldest to Newest</MenuItem>
                              </Select>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button
                                variant="outlined"
                                startIcon={<FilterAltOutlinedIcon />}
                                sx={{ textTransform: "none" }}
                                onClick={() => setFilterDrawerOpen(true)}
                            >
                              Filter
                            </Button>
                          </Box>
                        </Box>

                          <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
                              <Table>
                                  <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
                                      <TableRow>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Case Id</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Name</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Phone Number</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Type</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Visit</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Branch</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Date</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Status</TableCell>
                                          <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}></TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {[...Array(9)].map((_, index) => (
                                          <TableRow
                                              key={index}


                                              sx={{
                                                  backgroundColor: "#FFFFFF",
                                                  marginBottom: 2,
                                                  "&:not(:last-child)": {
                                                      borderBottom: "16px solid #F9FAFB",
                                                  },
                                              }}
                                          >
                                              <TableCell>XXXXXXXX</TableCell>
                                              <TableCell>
                                                  <Link to={"/admin/reception/patients/PatientDetails"}>
                                                      <Typography
                                                          variant="body2"
                                                          sx={{ fontWeight: "bold", color: "#111827" }}
                                                      >
                                                          {index % 2 === 0 ? "Jasimine Kaur" : "Amit Tripathi"}
                                                      </Typography>
                                                  </Link>
                                                  <Typography variant="body2" sx={{ color: "#6B7280" }}>
                                                      example@gmail.com
                                                  </Typography>
                                              </TableCell>
                                              <TableCell>+91 79327728</TableCell>
                                              <TableCell>{index % 2 === 0 ? "Walk In" : "Referral"}</TableCell>
                                              <TableCell>Cardiology</TableCell>
                                              <TableCell>08-10-2024</TableCell>
                                              <TableCell>
                                                  <Box
                                                      sx={{
                                                          backgroundColor: "#D1FAE5",
                                                          padding: "4px 8px",
                                                          borderRadius: "16px",
                                                          color: "#059669",
                                                          textAlign: "center",
                                                          display: "inline-block",
                                                          fontSize: "0.875rem",
                                                          fontWeight: "bold",
                                                      }}
                                                  >
                                                      Active
                                                  </Box>
                                              </TableCell>
                                              <TableCell>
                                                  <IconButton>
                                                      <MoreVertIcon sx={{ color: "#9CA3AF" }} />
                                                  </IconButton>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </TableContainer>
                      </Box>
                  </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />}
          </div>
      </>
  );
};

export default PatientPanel;