import React, { useEffect, useState } from "react";
import "./Records.scss";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon
import RecordModal from "./components/RecordsModal.jsx";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillDetails,
  getBillingRecords,
  getFilteredPatients,
} from "../../../../../components/State/Admin/Action.js";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const Records = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0); // page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default

  const billingRecords = useSelector((store) => store.admin.billingRecords);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!billingRecords || billingRecords.length === 0) {
      dispatch(getBillingRecords(page, rowsPerPage)); // Fetch billing records from API
    }
  }, [dispatch, billingRecords, page, rowsPerPage]);
  const billDetails = useSelector((store) => store.admin.billingRecord);
  useEffect(() => {
    setSelectedBill(billDetails);
  }, [billDetails]);
  const handleViewClick = (billId) => {
    dispatch(getBillDetails(billId)); // Fetch bill details from API
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBill(null);
  };
  const [sortOrder, setSortOrder] = useState("Monthly");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
  });
  // Handle Sort Change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    setSelectedFilter(option);
    handleClose();
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Search Results
  const handleSearchResults = () => {
    // dispatch(getFilteredPatients(filters));
    setFilterDrawerOpen(false);
  };

  const paginatedBillingRecords = billingRecords.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div className="billing-container">
      <div className="billings-details">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "0.5px solid #4A4A4A8C",
            borderBottom: "0.5px solid #4A4A4A8C",
            paddingY: 1.5,
            marginBottom: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                borderRight: "0.5px solid #4A4A4A8C",
                display: "flex",
                alignItems: "center",
                paddingRight: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",

                  marginRight: 1,
                  color: "black",
                }}
              >
                {billingRecords.length}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: "normal", color: "#878787" }}
              >
                Records
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  marginRight: 1,
                  color: "#0B0B0B",
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
                  minWidth: 160,
                  background: "#fff",
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
                <MenuItem
                  value="Weekly"
                  sx={{ borderBottom: "0.5px sloid black" }}
                >
                  Weekly
                </MenuItem>
                <MenuItem
                  sx={{ borderBottom: "0.5px sloid black" }}
                  value="Monthly"
                >
                  Monthly
                </MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </Box>
          </Box>

          {/*<Box sx={{ display: "flex", alignItems: "center" }}>*/}
          {/*  <Button*/}
          {/*      startIcon={<FilterAltIcon sx={{color:"#878787"}}/>}*/}
          {/*      sx={{*/}
          {/*        textTransform: "none",*/}
          {/*        padding: "6px 20px",*/}
          {/*        backgroundColor: "white",*/}
          {/*        borderRadius: "5px",*/}
          {/*        fontSize: "16px",*/}
          {/*        color: "#4A4A4A",*/}
          {/*        "&:focus": {*/}
          {/*          outline: "none",*/}
          {/*          boxShadow: "none",*/}
          {/*          backgroundColor: "white",*/}
          {/*        },*/}
          {/*      }}*/}
          {/*      onClick={() => setFilterDrawerOpen(true)}*/}
          {/*  >*/}
          {/*    Filter*/}
          {/*  </Button>*/}
          {/*</Box>*/}
        </Box>
      </div>

      <div className="billings-table" style={{ position: "relative" }}>
        <div className="table-header">
          <span>Case ID</span>
          <span>Name</span>
          <span>Phone Number</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div style={{ paddingBottom: "2rem" }}>
          {billingRecords.length > 0 ? (
            paginatedBillingRecords.map((item) => (
              <div className="table-row" key={item._id}>
                <span className="blue">{item.caseId}</span>
                <span className="blue">{item.patient.name}</span>
                <span className="grey">{item.patient.phone}</span>
                <span className="grey">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className="grey"> {item.totalAmount}</span>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <Button
                  onClick={() => handleViewClick(item._id)}
                  className="view-btn"
                  sx={{
                    outline: "none", // Removes focus outline
                    boxShadow: "none", // Removes MUI focus shadow
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:active": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  View
                </Button>
              </div>
            ))
          ) : (
            <div
              className="table-row blue"
              style={{
                gridTemplateColumns: "1fr",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              No Records Found
            </div>
          )}
        </div>
        <Box
          sx={{
            width: "100%",

            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "2px solid #ddd",
            zIndex: 11,
          }}
        >
          <TablePagination
            component="div"
            count={billingRecords.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            sx={{}}
          />
        </Box>
      </div>
      {/* Use the separate BillingModal Component */}
      <RecordModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
      />

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "48vh", // Adjust height as needed
            top: "20vh", // Center it vertically
            borderRadius: "10px 0 0 10px", // Optional rounded corners
          },
        }}
      >
        <Box sx={{ width: 220, padding: 2, paddingLeft: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
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
              Category
            </FormLabel>
            <RadioGroup
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <FormControlLabel
                value="patient"
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
                label="Patient"
                sx={{ height: "34px", color: "#878787" }}
              />
              <FormControlLabel
                value="company"
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
                label="Company"
                sx={{ height: "34px", color: "#878787" }}
              />
              <FormControlLabel
                value="pharmacy"
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
                label="Pharmacy"
                sx={{ height: "34px", color: "#878787" }}
              />
              <FormControlLabel
                value="researchCollaboration"
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
                label="Research Collaboration"
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
              marginLeft: "1.5rem",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            onClick={handleSearchResults}
          >
            Search Results
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default Records;
