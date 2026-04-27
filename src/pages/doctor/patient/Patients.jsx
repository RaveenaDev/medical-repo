import CommonPanel from "../components/CommonPanel";
import { FiFilter } from "react-icons/fi";
import { ChevronLeft, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import styles from "./Patients.module.scss";
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
import { getFilteredPatients } from "../../../components/State/Doctor/Action.js";
import useDebounce from "../../../hooks/useDebounce.js";
const Patients = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default
  // const location = useLocation();
  // const patients = location.state?.patients || [];

  // console.log("Transferred : ",patients)

  const [sortOrder, setSortOrder] = useState("desc");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // dispatch(getPatients());
    dispatch(getFilteredPatients(filters, page, rowsPerPage, debouncedSearch));
  }, [dispatch, sortOrder, page, rowsPerPage, debouncedSearch]);

  const doctor = useSelector((store) => store.doctor);
  const totalFilteredPatients = doctor.totalFilteredPatients;
  const filteredPatients = doctor.filteredPatients;
  const loading = doctor.isLoadingFilteredPatients;

  // console.log("FIl: ", filteredPatients);

  const handleSortChange = (event) => {
    // admin = null;
    setSortOrder(event.target.value);
    setFilters({
      ...filters,
      sort: event.target.value,
    });
    // console.log(event.target.value)
  };

  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchResults = () => {
    // admin = null;
    dispatch(getFilteredPatients(filters, page, rowsPerPage, debouncedSearch));
    setFilterDrawerOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const handleClick = (patient) => {
    const latestAppointment =
      patient.appointments?.[patient.appointments.length - 1];
    const caseId = latestAppointment?.caseId || "Not Assigned";
    navigate("/doctor/patients/profile", { state: { patient, caseId } });
  };

  const isLaptop = useMediaQuery("(max-width: 1024px)");
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "relative", padding: isLaptop ? "0 2rem" : "0" }}>
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
            <span className={styles.backText}>Patient List</span>
          </div>
        </div>
        <hr />
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            {totalFilteredPatients} <span>Patients</span>
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
                  minWidth: { xs: 110, sm: 130, md: 180 },
                  height: { xs: 32, sm: 34, md: 40 },
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },

                  background: "#fff",
                  color: "#4A4A4A",
                  boxShadow: "0px 4px 4px 0px #BDBDBD1C",
                  border: "1px solid transparent",

                  "& .MuiSelect-select": {
                    padding: {
                      xs: "6px 8px",
                      sm: "6px 10px",
                      md: "8px 12px",
                    },
                  },

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
              <div
                onClick={() => setFilterDrawerOpen(true)}
                className={`${styles.filter} ${styles.boxStyle}`}
              >
                <FiFilter fill="#00a378" />
                <span>Filter</span>
              </div>
            </Box>
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
          <CircularProgress sx={{ color: "#25307F" }} size={58} />
        </Box>
      ) : (
        <>
          <div className={styles.patientsTableContainer}>
            {filteredPatients && filteredPatients.length > 0 ? (
              <>
                <table className={styles.patientsTable}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Pat ID</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Name</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>
                        Phone Number
                      </th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Type Visit</th>

                      <th style={{ backgroundColor: "#F1F1F1" }}>Date</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Booking</th>
                      {/*<th></th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index} onClick={() => handleClick(patient)}>
                        <td className={styles.patientId}>
                          {patient?.patId || "Not Assigned"}
                        </td>
                        <td className={styles.patientInfo}>
                          <div>
                            <div className={styles.patientName}>
                              {truncateText(patient.name || "Not Assigned", 15)}
                            </div>
                            <div className={styles.patientEmail}>
                              {truncateText(
                                patient.email || "Not Assigned",
                                15,
                              )}
                            </div>
                          </div>
                        </td>
                        <td className={styles.phoneNumber}>{patient.phone}</td>
                        <td className={styles.typeVisit}>
                          {patient?.typeVisit || "Not Assigned"}
                        </td>

                        <td className={styles.date}>
                          {/*{truncateText(patient?.appointments[0].date, 10)}*/}
                          {new Date(
                            patient.registrationDate,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                        <td className={styles.booking}>
                          <span
                            className={` ${styles.bookingBadge} ${
                              patient?.status.toLowerCase() === "active"
                                ? styles.activeBooking
                                : styles.inactiveBooking
                            }`}
                          >
                            {patient?.status}
                          </span>
                        </td>
                        {/*<td className={styles.actions}>*/}
                        {/*    <BsThreeDotsVertical className={styles.menuIcon}/>*/}
                        {/*</td>*/}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className={styles.noDataMessage}>No patients found.</div>
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
              count={totalFilteredPatients}
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
          </Box>
        </>
      )}
    </div>
  );
};

export default Patients;
