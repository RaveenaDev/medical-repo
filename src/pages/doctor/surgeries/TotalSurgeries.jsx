import CommonPanel from "../components/CommonPanel";
import { FiFilter } from "react-icons/fi";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./TotalSurgeries.module.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../components/appointmentRequests/AppointmentRequest";
import {
  Box,
  Button,
  CircularProgress,
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
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredSurgeries } from "../../../components/State/Doctor/Action.js";

const TotalSurgeries = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("desc");

  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getPatients());
    dispatch(getFilteredSurgeries(filters, page, rowsPerPage));
  }, [dispatch, sortOrder, page, rowsPerPage]);

  const doctor = useSelector((store) => store.doctor);
  const totalFilteredSurgeries = doctor.totalFilteredSurgeries;
  const filteredSurgeries = doctor.filteredSurgeries;
  const loading = doctor.isLoadingFilteredSurgeries;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleSortChange = (event) => {
    // admin = null;
    setSortOrder(event.target.value);
    setFilters({
      ...filters,
      sort: event.target.value,
    });
    // console.log(event.target.value)
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchResults = () => {
    // admin = null;
    dispatch(getFilteredSurgeries(filters, page, rowsPerPage));
    setFilterDrawerOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const location = useLocation();
  const surgeries = location.state?.surgeries || [];
  const isLaptop = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <div style={{ position: "relative", padding: isLaptop ? "0 3rem" : "0" }}>
        <CommonPanel />
      </div>
      <div className={styles.patientsHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <ChevronLeft
              size={28}
              strokeWidth={1.7}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <span className={styles.backText}>Surgeries List</span>
          </div>
        </div>
        <hr />
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            {totalFilteredSurgeries} <span>Surgeries</span>
          </span>
          <div className={styles.verticalDivider}></div>
          <div className={styles.sortFilterSection}>
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
            </div>
            <div
              onClick={() => setFilterDrawerOpen(true)}
              className={`${styles.filter} ${styles.boxStyle}`}
            >
              <FiFilter fill="#00a378" />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <hr />
      </div>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // or full height you need
          }}
        >
          <CircularProgress sx={{ color: "#00a378" }} size={58} />
        </Box>
      ) : (
        <div className={styles.patientsTableContainer}>
          {filteredSurgeries && filteredSurgeries.length > 0 ? (
            <>
              <table className={styles.patientsTable}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Patient ID</th>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Patient</th>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Date</th>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Surgery Type</th>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Doctor</th>
                    <th style={{ backgroundColor: "#F1F1F1" }}>Status</th>
                    {/*<th></th>*/}
                  </tr>
                </thead>
                <tbody>
                  {filteredSurgeries.map((patient, index) => (
                    <tr key={index}>
                      <td className={styles.patientId}>{patient.patId}</td>
                      <td className={styles.patientInfo}>
                        <div>
                          <div className={styles.patientName}>
                            {patient.patient.name}
                          </div>
                          <div className={styles.patientEmail}>
                            {patient.patient.email}
                          </div>
                        </div>
                      </td>
                      <td className={styles.date}>{patient.date}</td>
                      <td className={styles.surgeryType}>
                        {patient.surgeryType}
                      </td>
                      <td className={styles.doctor}>{patient.doctor}</td>
                      <td className={styles.status2}>
                        <span
                          className={`${styles.statusBadge} ${
                            patient.status.toLowerCase() === "completed"
                              ? styles.completed
                              : patient.status.toLowerCase() === "cancelled"
                              ? styles.cancelled
                              : styles.scheduled
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      {/*<td className={styles.actions}>*/}
                      {/*    <BsThreeDotsVertical className={styles.menuIcon}/>*/}
                      {/*</td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
              <TablePagination
                component="div"
                count={totalFilteredSurgeries}
                page={page} // current page
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage} // items per page
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTop: "2px solid #ddd",
                  zIndex: 11,
                }}
              />
            </>
          ) : (
            <div className={styles.noDataMessage}>No data found.</div>
          )}

          <Drawer
            anchor="right"
            open={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                height: "58vh", // Adjust height as needed
                top: "18vh", // Center it vertically
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
                sx={{ marginBottom: 6, marginTop: 2, width: "100%" }}
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
                    value="Scheduled"
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
                    label="Scheduled"
                    sx={{ height: "34px", color: "#878787" }}
                  />
                  <FormControlLabel
                    value="Cancelled"
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
                    label="Cancelled"
                    sx={{ height: "34px", color: "#878787" }}
                  />

                  <FormControlLabel
                    value="Completed"
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
                    label="Completed"
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
        </div>
      )}
    </>
  );
};

export default TotalSurgeries;
