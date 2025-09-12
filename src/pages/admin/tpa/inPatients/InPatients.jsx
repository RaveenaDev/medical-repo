import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredInpatients } from "../../../../components/State/Admin/Action";
import styles from "./InPatient.module.scss";
import ActionMenu from "./components/ActionMenu"; // Custom menu component for actions
import { Search } from "lucide-react";

const InPatients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters (status, type, sort order)
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });
  const [sortOrder, setSortOrder] = useState("desc");

  // Drawer for filters
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Redux store: inpatients
  const doctor = useSelector((store) => store.doctor);
  const totalFilteredInPatients = doctor.totalFilteredInpatients;
  const filteredInPatients = doctor.filteredInPatients;

  // Fetch patients whenever filters/pagination change
  useEffect(() => {
    dispatch(getFilteredInpatients(filters, page, rowsPerPage));
  }, [dispatch, sortOrder, page, rowsPerPage]);

  // Helper: truncate long strings (ID, name, email)
  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  // Handle filter changes inside drawer
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters (trigger search)
  const handleSearchResults = () => {
    dispatch(getFilteredInpatients(filters, page, rowsPerPage));
    setFilterDrawerOpen(false);
  };

  // Sort dropdown change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setFilters({ ...filters, sort: event.target.value });
  };

  // Pagination: page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination: rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div className={styles.inpatientcontainer}>
      {/* Header Section */}
      <div className={styles.patientsHeader}>
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            {totalFilteredInPatients} <span>Inpatients</span>
          </span>
          <div className={styles.verticalDivider}></div>

          {/* Sort + Filter Controls */}
          <div className={styles.sortFilterSection}>
            {/* Sort dropdown */}
            <div className={styles.sortBy}>
              <span>Sort by:</span>
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
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
              >
                <MenuItem value="desc">Newest to Oldest</MenuItem>
                <MenuItem value="asc">Oldest to Newest</MenuItem>
              </Select>
            </div>
            <div className={styles.filterSearch}>
              <div className={styles["search-wrapper"]}>
                <Search size={18} className={styles["search-icon"]} />
                <input
                  type="text"
                  placeholder="Search inpatients..."
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles["search-input"]}
                />
              </div>
              {/* Filter button */}
              <div
                onClick={() => setFilterDrawerOpen(true)}
                className={`${styles.filter} ${styles.boxStyle}`}
              >
                <FiFilter fill="#25307f" />
                <span>Filter</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* Patients Table */}
      <div className={styles.patientsTableContainer}>
        {filteredInPatients && filteredInPatients.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.patientsTable}>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient</th>
                  <th>Bed</th>
                  <th>Condition</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInPatients.map((patient, index) => (
                  <tr key={index}>
                    <td className={styles.patientId}>
                      {truncateText(patient?.patId || "Not Assigned", 12)}
                    </td>
                    <td className={styles.patientInfo}>
                      <div>
                        <div className={styles.patientName}>
                          {truncateText(patient?.name || "Not Assigned", 15)}
                        </div>
                        <div className={styles.patientEmail}>
                          {truncateText(patient?.email || "Not Assigned", 15)}
                        </div>
                      </div>
                    </td>
                    <td className={styles.bedNumber}>
                      {patient?.bedType || "Not Assigned"}
                    </td>
                    <td className={styles.condition}>
                      {patient?.admissionStatus || "Not Assigned"}
                    </td>
                    <td className={styles.doctor}>
                      {patient?.doctor?.name || "Not Assigned"}
                    </td>
                    <td className={styles.status}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[patient.status?.toLowerCase()]
                        }`}
                      >
                        {patient?.status}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      {/* Menu with options like Add Insurance */}
                      <ActionMenu patient={patient} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.noDataMessage}>No inpatients found.</div>
        )}

        {/* Filter Drawer (right side) */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              height: "58vh",
              top: "18vh",
              borderRadius: "10px 0 0 10px",
            },
          }}
        >
          <Box sx={{ width: 200, padding: 2, paddingLeft: 4 }}>
            {/* Drawer Header */}
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
                sx={{ color: "black" }}
                onClick={() => setFilterDrawerOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Filter Options */}
            <FormControl sx={{ marginBottom: 6, marginTop: 2, width: "100%" }}>
              <FormLabel
                sx={{
                  marginBottom: 1,
                  color: "#000000",
                  "&.Mui-focused": { color: "#000000" },
                }}
              >
                Status
              </FormLabel>
              <RadioGroup
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                {["Stable", "Critical", "Moderate"].map((status) => (
                  <FormControlLabel
                    key={status}
                    value={status}
                    control={
                      <Radio
                        sx={{
                          color: "#878787",
                          "&.Mui-checked": { color: "#25307F" },
                        }}
                      />
                    }
                    label={status}
                    sx={{ height: "34px", color: "#878787" }}
                  />
                ))}
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: "#878787",
                        "&.Mui-checked": { color: "#25307F" },
                      }}
                    />
                  }
                  label="All"
                  sx={{ height: "34px", color: "#878787" }}
                />
              </RadioGroup>
            </FormControl>

            {/* Search Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#25307F",
                textTransform: "none",
                borderRadius: "16px",
                padding: "6px 35px",
              }}
              onClick={handleSearchResults}
            >
              Search Results
            </Button>
          </Box>
        </Drawer>
      </div>

      {/* Pagination Section */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          borderTop: "2px solid #ddd",
          zIndex: 2,
        }}
      >
        <TablePagination
          component="div"
          count={totalFilteredInPatients}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
        />
      </Box>
    </div>
  );
};

export default InPatients;
