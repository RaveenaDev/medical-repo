import CommonPanel from "../components/CommonPanel";
import { FiFilter } from "react-icons/fi";
import { ChevronLeft, Search, X } from "lucide-react";
import styles from "./InPatient.module.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../../doctor/components/appointmentRequests/AppointmentRequest.jsx";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredInpatients } from "../../../components/State/Receptionist/Action.js";
import useDebounce from "../../../hooks/useDebounce.js";

const InPatients = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const doctor = useSelector((store) => store.doctor);
  const totalFilteredInPatients = doctor.totalFilteredInpatients;
  const filteredInPatients = doctor.filteredInPatients;
  const isLoadingFilteredInPatients = useSelector(
    (store) => store.receptionist.isLoadingFilteredInPatients
  );

  const debouncedSearch = useDebounce(searchQuery, 500);

  // console.log("Total: ",totalFilteredInPatients)
  // console.log("Fil: ", filteredInPatients);

  useEffect(() => {
    // dispatch(getPatients());
    dispatch(
      getFilteredInpatients(filters, page, rowsPerPage, debouncedSearch)
    );
  }, [dispatch, sortOrder, page, rowsPerPage, filters, debouncedSearch]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters.status, sortOrder]);

  const handleRequestBtn = () => {
    navigate("/doctor/doctor-request");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleAppointmentRequests = () => {
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };

  // const location = useLocation();
  // const inPatients = location.state?.inPatients || [];

  // console.log("Transferred: ",inPatients)

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchResults = () => {
    // admin = null;
    dispatch(
      getFilteredInpatients(filters, page, rowsPerPage, debouncedSearch)
    );
    setFilterDrawerOpen(false);
  };

  const handleSortChange = (event) => {
    // admin = null;
    setSortOrder(event.target.value);
    setFilters({
      ...filters,
      sort: event.target.value,
    });
    // console.log(event.target.value)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        color: "#ffffff",
        marginTop: "2px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "15px",
        paddingLeft: "1px",
      }}
    >
      {localStorage.getItem("doctorRequestsCount")}
    </Box>
  );

  return (
    <>
      <div style={{ position: "relative", top: "7px", paddingLeft: "8px" }}>
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
            <span className={styles.backText}>Inpatient List</span>
          </div>
        </div>
        <hr />
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            {totalFilteredInPatients} <span>Inpatients</span>
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

            <div className={styles.filterSearch}>
              <div className={styles["search-wrapper"]}>
                <Search size={18} className={styles["search-icon"]} />
                <input
                  type="text"
                  placeholder="Search inpatients..."
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
                <FiFilter fill="#25307f" />
                <span>Filter</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className={styles.patientsTableContainer}>
        {isLoadingFilteredInPatients ? (
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
            {filteredInPatients && filteredInPatients.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.patientsTable}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Patient ID</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Patient</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Bed</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Room</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Wing/Floor</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Doctor</th>
                      <th style={{ backgroundColor: "#F1F1F1" }}>Status</th>
                      {/*<th></th>*/}
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
                              {truncateText(
                                patient?.name || "Not Assigned",
                                15
                              )}
                            </div>
                            <div className={styles.patientEmail}>
                              {truncateText(
                                patient?.phone || "Not Assigned",
                                15
                              )}
                            </div>
                          </div>
                        </td>
                        <td className={styles.bedNumber}>
                          <div> {patient?.bedNumber || "Not Assigned"}</div>
                          <div>{patient?.roomType || "Not Assigned"}</div>
                        </td>
                        <td className={styles.room}>
                          <div>{patient?.roomID || "Not Assigned"}</div>
                          <div>{patient?.roomName || "Not Assigned"}</div>
                        </td>
                        <td className={styles.status}>
                          <div>{patient?.wing || "N/A"} Wing</div>
                          <div>{patient?.floor || "N/A"} Floor</div>
                        </td>
                        <td className={styles.doctor}>
                          {patient?.doctor?.name || "Not Assigned"}
                        </td>
                        <td className={styles.status}>
                          <span
                            className={`${styles.statusBadge} ${
                              styles[patient.status.toLowerCase()]
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
                <TablePagination
                  component="div"
                  count={totalFilteredInPatients}
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
              </div>
            ) : (
              <div className={styles.noDataMessage}>No inpatients found.</div>
            )}
          </>
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
                  value="Stable"
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
                  label="Stable"
                  sx={{ height: "34px", color: "#878787" }}
                />
                <FormControlLabel
                  value="Critical"
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
                  label="Critical"
                  sx={{ height: "34px", color: "#878787" }}
                />

                <FormControlLabel
                  value="Moderate"
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
                  label="Moderate"
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
    </>
  );
};

export default InPatients;
