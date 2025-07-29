import CommonPanel from "../components/CommonPanel";
import { FiFilter } from "react-icons/fi";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Patients.module.scss";
import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../components/appointmentRequests/AppointmentRequest";
import {
    Box,
    Button, Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton, MenuItem,
    Radio,
    RadioGroup, Select, TablePagination,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {getFilteredPatients} from "../../../components/State/Doctor/Action.js";
const Patients = () => {
    const dispatch = useDispatch();
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

    useEffect(() => {
        // dispatch(getPatients());
        dispatch(getFilteredPatients(filters, page, rowsPerPage));
    }, [dispatch, sortOrder, page, rowsPerPage]);

    const doctor = useSelector((store) => store.doctor)
    const totalFilteredPatients = doctor.totalFilteredPatients
    const filteredPatients = doctor.filteredPatients

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

  const handleRequestBtn = () => {
    navigate("/doctor/doctor-request");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentRequests = () => {
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchResults = () => {
        // admin = null;
        dispatch(getFilteredPatients(filters, page, rowsPerPage));
        setFilterDrawerOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };

  const appointmentRequests = [
    {
      _id: "req001",
      patient: {
        name: "John Doe",
      },
      note: "Needs consultation for back pain.",
    },
    {
      _id: "req002",
      patient: {
        name: "Jane Smith",
      },
      note: "Follow-up appointment for diabetes check-up.",
    },
    {
      _id: "req003",
      patient: {
        name: "Alice Johnson",
      },
      note: "Wants to discuss lab report results.",
    },
    {
      _id: "req004",
      patient: {
        name: "Bob Brown",
      },
      note: "First-time appointment for general check-up.",
    },
    {
      _id: "req005",
      patient: {
        name: "Charlie Wilson",
      },
      note: "Consultation regarding skin allergy.",
    },
    {
      _id: "req006",
      patient: {
        name: "Emily Davis",
      },
      note: "Needs a prescription refill for blood pressure medication.",
    },
  ];

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

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <>
      <div style={{ position: "relative" }}>
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
          <div className={styles.headerRight}>
            <Button
              variant="contained"
              onClick={handleRequestBtn}
              sx={{
                fontSize: "14px",
                color: "#000",
                fontFamily: "Inter",
                fontWeight: "400",
                textTransform: "capitalize",
                padding: "3px 6px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px 0px #C2C2C240",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#F14400",
                  position: "absolute",
                  left: "31px",
                  top: "6px",
                }}
              ></div>
              {circle}
              <span
                style={{
                  marginLeft: "16px",
                  marginRight: "8px",
                  marginTop: "2px",
                }}
              >
                Requests
              </span>
            </Button>

            <Button
              variant="contained"
              onClick={handleAppointmentRequests}
              sx={{
                fontSize: "14px",
                color: "#878787",
                textTransform: "capitalize",
                padding: "6px 6px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px 0px #C2C2C240",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <div
                style={{
                  height: "9px",
                  width: "9px",
                  borderRadius: "50%",
                  backgroundColor: "#F14400",
                  position: "absolute",
                  left: "25px",
                  top: "6px",
                }}
              ></div>
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.55592 19.5877C6.65384 18.7481 7.88092 18.0861 9.23717 17.6017C10.5934 17.1173 12.0143 16.8752 13.4997 16.8752C14.9851 16.8752 16.4059 17.1173 17.7622 17.6017C19.1184 18.0861 20.3455 18.7481 21.4434 19.5877C22.1969 18.705 22.7835 17.704 23.2033 16.5845C23.6231 15.4651 23.833 14.2703 23.833 13.0002C23.833 10.137 22.8266 7.69895 20.8137 5.6861C18.8009 3.67325 16.3629 2.66683 13.4997 2.66683C10.6365 2.66683 8.19846 3.67325 6.18561 5.6861C4.17277 7.69895 3.16634 10.137 3.16634 13.0002C3.16634 14.2703 3.37624 15.4651 3.79603 16.5845C4.21582 17.704 4.80245 18.705 5.55592 19.5877ZM13.4997 14.2918C12.2295 14.2918 11.1585 13.8559 10.2867 12.984C9.41478 12.1121 8.97884 11.0411 8.97884 9.771C8.97884 8.50086 9.41478 7.42985 10.2867 6.55798C11.1585 5.6861 12.2295 5.25016 13.4997 5.25016C14.7698 5.25016 15.8408 5.6861 16.7127 6.55798C17.5846 7.42985 18.0205 8.50086 18.0205 9.771C18.0205 11.0411 17.5846 12.1121 16.7127 12.984C15.8408 13.8559 14.7698 14.2918 13.4997 14.2918ZM13.4997 25.9168C11.7129 25.9168 10.0337 25.5778 8.46217 24.8996C6.89065 24.2215 5.52363 23.3012 4.36113 22.1387C3.19863 20.9762 2.27832 19.6092 1.6002 18.0377C0.92207 16.4661 0.583008 14.787 0.583008 13.0002C0.583008 11.2134 0.92207 9.53419 1.6002 7.96266C2.27832 6.39113 3.19863 5.02412 4.36113 3.86162C5.52363 2.69912 6.89065 1.77881 8.46217 1.10068C10.0337 0.422559 11.7129 0.0834961 13.4997 0.0834961C15.2865 0.0834961 16.9656 0.422559 18.5372 1.10068C20.1087 1.77881 21.4757 2.69912 22.6382 3.86162C23.8007 5.02412 24.721 6.39113 25.3992 7.96266C26.0773 9.53419 26.4163 11.2134 26.4163 13.0002C26.4163 14.787 26.0773 16.4661 25.3992 18.0377C24.721 19.6092 23.8007 20.9762 22.6382 22.1387C21.4757 23.3012 20.1087 24.2215 18.5372 24.8996C16.9656 25.5778 15.2865 25.9168 13.4997 25.9168Z"
                  fill="#25307F"
                />
              </svg>
              <span
                style={{
                  marginLeft: "16px",
                  marginRight: "8px",
                  marginTop: "2px",
                }}
              >
                Appointment Requests
              </span>
            </Button>
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
                className={`${styles.filter} ${styles.boxStyle}`}>
              <FiFilter fill="#25307f" />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* Modal Component */}
      <AppointmentRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointmentRequests={appointmentRequests}
      >
        <p>This is where appointment requests will appear.</p>
      </AppointmentRequestModal>

      <div className={styles.patientsTableContainer}>
        {filteredPatients && filteredPatients.length > 0 ? (
            <>
                <table className={styles.patientsTable}>
                    <thead>
                    <tr>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Case ID</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Name</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Phone Number</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Type Visit</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Branch</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Date</th>
                        <th style={{ backgroundColor: '#F1F1F1' }}>Booking</th>
                        {/*<th></th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPatients.map((patient, index) => (
                        <tr key={index}>
                            <td className={styles.patientId}>{patient?.patId || "Not Assigned"}</td>
                            <td className={styles.patientInfo}>
                                <div>
                                    <div className={styles.patientName}>{patient.name || "Not Assigned"}</div>
                                    <div className={styles.patientEmail}>{patient.email || "Not Assigned"}</div>
                                </div>
                            </td>
                            <td className={styles.phoneNumber}>{patient.phone}</td>
                            <td className={styles.typeVisit}>
                                {patient?.typeVisit || "Not Assigned"}
                            </td>
                            <td className={styles.branch}>
                                {patient.appointments[patient.appointments.length - 1]
                                    ?.department.name || "Not Assigned"}
                            </td>
                            <td className={styles.date}>
                                {/*{truncateText(patient?.appointments[0].date, 10)}*/}
                                {new Date(
                                    patient.registrationDate
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
                <TablePagination
                    component="div"
                    count={totalFilteredPatients}
                    page={page} // current page
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage} // items per page
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                    sx={{
                        width: '100%',
                        backgroundColor: "#fff",
                        borderTop: "2px solid #ddd",
                        zIndex: 11,
                    }}
                />
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
              <Box sx={{width: 200, padding: 2, paddingLeft: 4}}>
                  <Box
                      sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 2,
                      }}
                  >
                      <Typography variant="h6" sx={{color: "#0B0B0B"}}>
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
                          <CloseIcon/>
                      </IconButton>
                  </Box>

                  {/* Filter Options */}
                  <FormControl
                      sx={{marginBottom: 6, marginTop: 2, width: "100%"}}
                      component="fieldset"
                  >
                      <FormLabel
                          component="legend"
                          sx={{
                              marginBottom: 1,
                              color: "#000000",
                              "&.Mui-focused": {color: "#000000"}, // Prevents blue color on focus
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
    </>
  );
};

export default Patients;
