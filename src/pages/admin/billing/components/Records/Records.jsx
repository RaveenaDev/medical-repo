import React, { useEffect, useState } from "react";
import "./Records.scss";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon
import RecordModal from "./components/RecordsModal.jsx";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillDetails,
  getBillingRecords,
} from "../../../../../components/State/Admin/Action.js";

const Records = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const billingRecords = useSelector((store) => store.admin.billingRecords);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!billingRecords || billingRecords.length === 0) {
      dispatch(getBillingRecords());
    }
  }, [dispatch, billingRecords]);
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
  const filterOptions = [
    "Patient",
    "Company",
    "Pharmacy",
    "Research Collaboration",
  ];
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
                color: "black",
              }}
            >
              {billingRecords.length}
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: "normal", color: "#878787" }}
              >
                Patients
              </Typography>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ marginRight: 1, color: "black" }}
              >
                Sort by:
              </Typography>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                size="small"
                sx={{ minWidth: 160 }}
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Filter Button with Dropdown */}
            <Button
              variant="outlined"
              startIcon={<FilterAltOutlinedIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleOpen}
            >
              {selectedFilter ? `Filter: ${selectedFilter}` : "Filter"}
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} onClick={() => handleSelect(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {/* Selected Filter Chip */}
            {selectedFilter && (
              <Chip
                label={selectedFilter}
                onDelete={() => setSelectedFilter("")}
                sx={{ bgcolor: "#e0e0e0" }}
              />
            )}
          </Box>
        </Box>
      </div>

      <div className="billings-table">
        <div className="table-header">
          <span>Case ID</span>
          <span>Name</span>
          <span>Phone Number</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {billingRecords.map((item) => (
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
            >
              View
            </Button>

            <IconButton className="menu-btn">
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {/* Use the separate BillingModal Component */}
      <RecordModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Records;
