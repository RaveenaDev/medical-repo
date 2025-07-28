import React, { useEffect, useState } from "react";
import styles from "./Index.module.scss";
import CommonPanel from "./components/CommonPanel.jsx";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "./components/DoughnutChart.jsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventDetails from "./components/EventDetails.jsx";
import AppointmentRequestModal from "./components/appointmentRequests/AppointmentRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmissionRequestsToApprove,
  getAppointmentRequests,
  getAppointments,
  getCriticalPatients,
  getDoctorRequests,
  getMostCommonDiagnosis,
  getUpcomingEvents,
} from "../../components/State/Doctor/Action.js";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AddEventPanel from "./components/AddEventPanel.jsx";
import { CalendarToday } from "@mui/icons-material";
import { ChevronRight } from "lucide-react";
import AdmitNewPatient from "./components/admintNewPatient/AdmitNewPatient.jsx";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const generateNextDates = (count = 11) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();

  const dates = Array.from({ length: count }, (_, i) => {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    return {
      day: futureDate.getDate(),
      month: months[futureDate.getMonth()],
    };
  });

  return dates;
};

const DATES = generateNextDates();

const DoctorOverview = ({ todayAppointments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Default to today's date if props are not provided
  const [internalSelectedDate, setInternalSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const navigate = useNavigate();

  const phases = [
    { name: "Early stage", count: 26, color: "#25307F" },
    { name: "Ongoing", count: 13, color: "#5752CB" },
    { name: "Maintenance", count: 5, color: "#D6DAFD" },
  ];
  const [selectedEvent, setSelectedEvent] = useState(null);
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleDateChange = (e) => {
    setInternalSelectedDate(e.target.value);
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

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "4px 1px",
      width: "4.4rem",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: 500,
      textTransform: "capitalize",
      border: "1px solid",
      display: "inline-block",
      marginTop: "4px",
      textAlign: "center",
    };

    switch (status.toLowerCase()) {
      case "critical":
        return {
          ...baseStyle,
          backgroundColor: "#f14400",
          color: "#ffffff",
          borderColor: "#f14400",
        };
      case "ongoing":
        return {
          ...baseStyle,
          backgroundColor: "#ffffff",
          color: "#2e823b",
          borderColor: "#2e823b",
        };
      case "moderate":
        return {
          ...baseStyle,
          backgroundColor: "#ffffff",
          color: "#eaa000",
          borderColor: "#eaa000",
        };
      case "high":
        return {
          ...baseStyle,
          backgroundColor: "#ffffff",
          color: "#f14400",
          borderColor: "#f14400",
        };
      default:
        return baseStyle;
    }
  };

  const totalPatients = phases.reduce((sum, p) => sum + p.count, 0);

  const [selected, setSelected] = useState(DATES[0].day);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleFooterBtn = () => {
    navigate("/doctor/calendar");
  };

  const handleDoctorRequest = () => {
    navigate("/doctor/doctor-request");
  };

  const handleAppointmentRequests = () => {
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };

  useEffect(() => {
    const container = document.querySelector(`.${styles.datePicker}`);

    // Mouse wheel scroll (vertical to horizontal)
    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    // Click and drag scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      container.classList.add(styles.activeDrag); // Optional styling
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove(styles.activeDrag);
    };

    const onMouseUp = () => {
      isDown = false;
      container.classList.remove(styles.activeDrag);
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed factor
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = dayjs(internalSelectedDate).startOf("day").toISOString();
    const endDate = dayjs(internalSelectedDate).endOf("day").toISOString();

    dispatch(getAppointments(startDate, endDate));
    dispatch(getMostCommonDiagnosis());
    dispatch(getUpcomingEvents(new Date()));
    dispatch(getDoctorRequests());
    dispatch(getAppointmentRequests());
    dispatch(getCriticalPatients());
    dispatch(getAdmissionRequestsToApprove("Pending"));
  }, [dispatch, selectedDate, internalSelectedDate]);

  const doctor = useSelector((store) => store.doctor);

  const diagnosis = doctor.diagnosis;

  const totalAppointments = doctor.totalAppointments;

  // console.log("Total : ",totalAppointments)

  const index = totalAppointments.findIndex(
    (item) => item.status === "Ongoing"
  );

  const appointmentsFromOngoing =
    index !== -1 ? totalAppointments.slice(index) : [];

  const appointmentRequests = doctor.appointmentRequests;

  const events = doctor.events;

  const criticalPatients = doctor.criticalPatients;

  // console.log("Crit: ",criticalPatients)

  const EVENTS = events.map((event) => {
    const hasTime = event.startTime && event.endTime;

    let status = "queued";
    let startHour = "";
    let duration = "";
    let time = "";
    let start, end;

    if (hasTime) {
      // Example: "10:00 AM"
      const [parsedStartHour] = event.startTime.split(" ");
      startHour = parsedStartHour;

      const date = dayjs.utc(event.date).local();

      const safeStartTime = event.startTime;
      let safeEndTime = event.endTime;
      if (safeEndTime === "12:00 AM" || safeEndTime === "00:00") {
        safeEndTime = "11:59 PM"; // 👈 TEMP FIX for your backend's time format
      }

      start = dayjs(
        `${date.format("YYYY-MM-DD")} ${safeStartTime}`,
        "YYYY-MM-DD hh:mm A"
      );
      end = dayjs(
        `${date.format("YYYY-MM-DD")} ${safeEndTime}`,
        "YYYY-MM-DD hh:mm A"
      );

      const now = dayjs();

      // console.log("NOW:", dayjs().format("YYYY-MM-DD hh:mm A"));
      // console.log("START:", start.format("YYYY-MM-DD hh:mm A"));
      // console.log("END:", end.format("YYYY-MM-DD hh:mm A"));

      if (now.isAfter(end)) {
        status = "cancelled";
      } else if (now.isBetween(start, end)) {
        status = "active";
      }

      duration = `${event.startTime} – ${safeEndTime}`;
      time = startHour;
    }

    return {
      allDay: event.allDay,
      eventType: event.eventType,
      hospital: event.hospital,
      labelTag: event.labelTag,
      note: event.note,
      participants: event.participants,
      title: event.title,
      time,
      type: event.eventType.toLowerCase(), // e.g. "meeting"
      duration,
      date: new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status,
    };
  });

  // console.log("Events: ",events)

  const colorPalette = [
    { color: "#D8E4FD", inColor: "#25307F" },
    { color: "#5E73D4", inColor: "#ffffff" },
    { color: "#2D3179", inColor: "#ffffff" },
    { color: "#A3A3A3", inColor: "#ffffff" },
    { color: "#F1F1F1", inColor: "#25307F" },
  ];

  // Transform
  const resultantData = diagnosis.map((item, index) => ({
    name: item.diagnosis,
    value: item.count,
    color: colorPalette[index % colorPalette.length].color,
    inColor: colorPalette[index % colorPalette.length].inColor,
  }));

  const handleDateSelected = (day, monthName) => {
    setSelected(day);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = monthNames.indexOf(monthName);

    if (monthIndex === -1) {
      console.error("Invalid month name:", monthName);
      return;
    }

    const year = new Date().getFullYear();
    const selectedDate = new Date(year, monthIndex, day);

    if (isNaN(selectedDate.getTime())) {
      console.error("Constructed invalid date:", selectedDate);
      return;
    }
    dispatch(getUpcomingEvents(selectedDate));
  };

  const handleOpenPanel = () => setIsPanelOpen(true);
  const handleClosePanel = () => setIsPanelOpen(false);

  useEffect(() => {
    document.body.style.overflow =
      isPanelOpen || selectedEvent ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen, selectedEvent]);

  const now = dayjs();

  const getEventEndTime = (startTime, duration) => {
    const [hrs, mins] = duration.split(":").map(Number);
    return dayjs(startTime).add(hrs, "hour").add(mins, "minute");
  };

  const eventsLeftToday = EVENTS.filter((event) => {
    if (event.allDay) return true; // count allDay events if you want

    const start = dayjs(event.time);
    const end = getEventEndTime(start, event.duration);

    // Event is either currently running or yet to start
    return end.isAfter(now) && start.isBefore(now.endOf("day"));
  });

  const [activeModal, setActiveModal] = useState(null);
  const openAdmitNewPatient = () => setActiveModal("admitNewPatient");
  const closeModal = () => setActiveModal(null);
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const requestsToApprove = useSelector(
    (state) => state.doctor.requestsToApprove
  );
  const filteredRequests = requestsToApprove.filter(
    (req) =>
      (req.sendTo === "Both" || req.sendTo === "Doctor") &&
      req.approval?.doctor?.approved === false
  );

  return (
    <>
      <div>
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            top: 0,
            width: "77.6vw",
            background: " #F1F1F1",
            paddingBottom: "1rem",
          }}
        >
          <CommonPanel
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            todayAppointments={todayAppointments}
          />

          <Grid
            container
            // sx={{ margin: "0 0 20px 0" }}
          >
            <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
              <div className={styles.headerLeft}>
                <div className={styles.dateSelections}>
                  <div className={styles.text}>
                    <span className={styles.label}>
                      {internalSelectedDate === dayjs().format("YYYY-MM-DD")
                        ? "Today"
                        : "Date"}
                    </span>
                    <span className={styles.date}>
                      {dayjs(internalSelectedDate).format("DD-MM-YYYY")}
                    </span>
                  </div>

                  <div className={styles["calendar-wrapper"]}>
                    <label htmlFor="datePicker">
                      <CalendarToday className={styles["calendar-icon"]} />
                    </label>
                    <input
                      type="date"
                      id="datePicker"
                      value={internalSelectedDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <button
                  className={styles.newPatientBtn}
                  onClick={openAdmitNewPatient}
                >
                  <p>
                    <span className={styles.greenDot} />{" "}
                    <span>{filteredRequests.length} New Patients </span>
                  </p>
                  <ChevronRight className={styles.rightArrow} />
                </button>
              </div>
            </Grid>
            <Grid
              size={8}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1vw" }}
            >
              <Button
                variant="contained"
                onClick={handleDoctorRequest}
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  textTransform: "capitalize",
                  padding: "2px 6px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {localStorage.getItem("doctorRequestsCount") > 0 && (
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
                )}
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
                  padding: "2px 6px",
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
              <>
                <div
                  className={styles["backdrop-overlay"]}
                  style={{
                    display:
                      activeModal === "admitNewPatient" ? "block" : "none",
                  }}
                  onClick={closeModal}
                />

                <div
                  className={`${styles["admitNewPatient-modal"]} ${
                    activeModal === "admitNewPatient"
                      ? styles["admitNewPatient-modalOpen"]
                      : ""
                  }`}
                >
                  <AdmitNewPatient
                    onClose={closeModal}
                    requests={filteredRequests}
                  />
                </div>
              </>
              {/* Modal Component */}
              <AppointmentRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                appointmentRequests={appointmentRequests}
              >
                <p>This is where appointment requests will appear.</p>
              </AppointmentRequestModal>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginTop: "32vh" }}>
          <div className={styles.parent1}>
            <div>
              <div className={styles.child1}>
                <div
                  className={styles.card}
                  style={{
                    zIndex: "1 !important", // ensure it appears above other content
                  }}
                >
                  <div className={styles.cardChild}>
                    <h4>Most Common Diagnosis</h4>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <p>This Month</p>
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_3306_7145"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                        >
                          <rect
                            y="16"
                            width="16"
                            height="16"
                            transform="rotate(-90 0 16)"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_3306_7145)">
                          <path
                            d="M14.6663 5.33333L7.99967 12L1.33301 5.33333L2.51634 4.15L7.99967 9.63333L13.483 4.15L14.6663 5.33333Z"
                            fill="#25307F"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {resultantData && resultantData.length > 0 ? (
                    <DoughnutChart data={resultantData} />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#888",
                        fontSize: "15px",
                        padding: "1rem",
                        fontStyle: "italic",
                      }}
                    >
                      No data found.
                    </div>
                  )}
                </div>
                <div className={styles.card}>
                  <div
                    className={styles.cardChild}
                    style={{ marginBottom: "10px" }}
                  >
                    <h4>Critical Alerts</h4>
                    <svg
                      width="20"
                      height="25"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 1.5L19 18.5H1L10 1.5Z"
                        stroke="#25307F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8.5V12.5"
                        stroke="#25307F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 15.5V15.51"
                        stroke="#25307F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div>
                    {criticalPatients.length > 0 ? (
                      criticalPatients.map((patient, index) => (
                        <div
                          key={index}
                          style={{
                            borderBottom: "1px solid #eee",
                            padding: "8px 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#2d3179",
                              }}
                            >
                              {patient.patientName}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#878787",
                              }}
                            >
                              {patient.condition}
                            </div>
                          </div>
                          <div style={getStatusStyle(patient.severity)}>
                            {patient.severity}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          fontStyle: "italic",
                          fontSize: "15px",
                          color: "#888",
                          padding: "1rem",
                          textAlign: "center",
                        }}
                      >
                        No alerts found.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.child2}>
                <div className={styles.heading}>
                  <h3>Appointments</h3>
                  <span>
                    <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <TableContainer>
                    <Table
                      sx={{
                        borderCollapse: "separate", // Ensure border-spacing works
                        borderSpacing: "0 8px", // Adds vertical spacing between rows
                      }}
                    >
                      <TableHead>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "& td, & th": { py: 0 }, // Removes padding from all cells
                          }}
                        >
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              border: "none",
                              px: 2.6,
                            }}
                          >
                            Case Id
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Appointment With
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Type Visit
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Branch
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Token&nbsp;No.
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: 500,
                              padding: "0.5 1",
                              border: "none",
                              px: 0.6,
                            }}
                          >
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointmentsFromOngoing.length > 0 ? (
                          appointmentsFromOngoing
                            .slice(0, 4)
                            .map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  backgroundColor:
                                    row.status === "Ongoing"
                                      ? "#EEF8F1"
                                      : "#ffffff",
                                  "& td, & th": { py: 1.5 }, // Removes padding from all cells
                                }}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{
                                    color: "#25307f",
                                    border: "none",
                                    px: 0.6,
                                    pl: 2,
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    backgroundColor:
                                      row.status === "Ongoing"
                                        ? "#EEF8F1"
                                        : "#ffffff",
                                  }}
                                >
                                  {truncateText(row.caseId, 8)}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{
                                    color: "#25307f",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    border: "none",
                                    px: 0.6,
                                    backgroundColor:
                                      row.status === "Ongoing"
                                        ? "#EEF8F1"
                                        : "#ffffff",
                                  }}
                                >
                                  {truncateText(row.patient?.name, 13)}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    border: "none",
                                    fontSize: "12px",
                                    px: 0.6,
                                    color: "#747474",
                                  }}
                                >
                                  {truncateText(row.doctor?.name, 14)}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    border: "none",
                                    fontSize: "12px",
                                    px: 0.6,
                                    color: "#747474",
                                  }}
                                >
                                  {row.typeVisit}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    border: "none",
                                    fontSize: "12px",
                                    px: 0.6,
                                    color: "#747474",
                                  }}
                                >
                                  {row.department.name}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    border: "none",
                                    fontSize: "12px",
                                    px: 0.6,
                                    color: "#747474",
                                  }}
                                >
                                  {truncateText(row?.tokenNumber || "N/A", 13)}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    border: "none",
                                    px: 0.6,
                                    pr: 2,
                                    color: "#747474",
                                    fontSize: "12px",
                                  }}
                                >
                                  <Chip
                                    label={row.status}
                                    size="small"
                                    sx={{
                                      bgcolor:
                                        row.status === "Ongoing"
                                          ? "#3DB461"
                                          : row.status === "Scheduled"
                                          ? "#25307F"
                                          : row.status === "Waiting"
                                          ? "#ffffff"
                                          : "white",
                                      color:
                                        row.status === "Ongoing"
                                          ? "#FFFFFF"
                                          : row.status === "Completed"
                                          ? "orange"
                                          : row.status === "Scheduled"
                                          ? "white"
                                          : row.status === "Waiting"
                                          ? "#878787"
                                          : "#757575",
                                      fontWeight: 500,
                                      px: 0.7,
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={7}
                              sx={{ backgroundColor: "#EEF8F1" }}
                            >
                              No appointments found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              {/*<div className={styles.child3}>*/}
              {/*  <div className={styles.card}>*/}
              {/*    <div*/}
              {/*      style={{ display: "flex", justifyContent: "space-between" }}*/}
              {/*    >*/}
              {/*      <div>*/}
              {/*        <h3 className={styles.title}>*/}
              {/*          Patients’ treatment phases*/}
              {/*        </h3>*/}
              {/*        <p className={styles.subtitle}>*/}
              {/*          You are coach to {totalPatients} active patients*/}
              {/*        </p>*/}
              {/*      </div>*/}

              {/*      <div className={styles.legend}>*/}
              {/*        {phases.map((p) => (*/}
              {/*          <div key={p.name} className={styles.legendItem}>*/}
              {/*            <span*/}
              {/*              className={styles.legendSwatch}*/}
              {/*              style={{ backgroundColor: p.color }}*/}
              {/*            />*/}
              {/*            <span>{p.name}</span>*/}
              {/*          </div>*/}
              {/*        ))}*/}
              {/*      </div>*/}
              {/*    </div>*/}

              {/*    <div className={styles.bars}>*/}
              {/*      {phases.map((p) => (*/}
              {/*        <div*/}
              {/*          key={p.name}*/}
              {/*          style={{*/}
              {/*            flexGrow: p.count,*/}
              {/*            display: "flex",*/}
              {/*            flexDirection: "column",*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          <span className={styles.phaseLabel}>*/}
              {/*            {p.count} Patients*/}
              {/*          </span>*/}
              {/*          <div className={styles.barTrack}>*/}
              {/*            <div*/}
              {/*              className={styles.barFill}*/}
              {/*              style={{*/}
              {/*                width: "100%",*/}
              {/*                backgroundColor: p.color,*/}
              {/*              }}*/}
              {/*            />*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      ))}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className={styles.div2}>
              {/* Header */}
              <div className={styles.eventsHeader}>
                <div>
                  <h3>Upcoming Events</h3>
                  <small>{eventsLeftToday.length} events left today</small>
                </div>
                <button className={styles.createBtn} onClick={handleOpenPanel}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9997 9.08317H9.49967V15.5832H7.33301V9.08317H0.833008V6.9165H7.33301V0.416504H9.49967V6.9165H15.9997V9.08317Z"
                      fill="#25307F"
                    />
                  </svg>
                  <span>Create Visit</span>
                </button>
              </div>

              {isPanelOpen && <div className="backdrop-overlay" />}
              {isPanelOpen && <AddEventPanel onClose={handleClosePanel} />}

              {/* Date pills */}
              <div className={styles.datePicker}>
                {DATES.map((d) => (
                  <button
                    key={d.day}
                    className={
                      d.day === selected ? styles.dateActive : styles.dateBtn
                    }
                    onClick={() => handleDateSelected(d.day, d.month)}
                  >
                    <span className={styles.dateDay}>{d.day}</span>
                    <span className={styles.dateMon}>{d.month}</span>
                  </button>
                ))}
              </div>

              {/* Event list */}
              <div className={styles.eventList}>
                {EVENTS.length === 0 ? (
                  <div className={styles.noEvents}>No events found</div>
                ) : (
                  EVENTS.map((e, i) => (
                    <div
                      key={i}
                      className={styles.eventRow}
                      onClick={() => setSelectedEvent(e)}
                    >
                      <div
                        className={`${styles.eventTime} ${
                          e.allDay ? styles.smallText : ""
                        }`}
                      >
                        {e.allDay ? "All Day" : e.time}
                      </div>
                      <div
                        className={`${styles.commonEventCard} ${
                          e.status === "active" || e.allDay
                            ? styles.eventCardActive
                            : e.status === "queued"
                            ? styles.eventCardQueued
                            : styles.eventCardCancelled
                        }`}
                      >
                        {e.type === "call" ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.95 18C14.8667 18 12.8083 17.546 10.775 16.638C8.74167 15.73 6.89167 14.4423 5.225 12.775C3.55833 11.1077 2.271 9.25767 1.363 7.225C0.455 5.19233 0.000666667 3.134 0 1.05C0 0.75 0.0999999 0.5 0.3 0.3C0.5 0.0999999 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0793332 5.725 0.238C5.90833 0.396667 6.01667 0.584 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.704 9.11233 5.162 9.687C5.62 10.2617 6.12433 10.816 6.675 11.35C7.19167 11.8667 7.73333 12.346 8.3 12.788C8.86667 13.23 9.46667 13.634 10.1 14L12.45 11.65C12.6 11.5 12.796 11.3877 13.038 11.313C13.28 11.2383 13.5173 11.2173 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1377 17.775 12.313C17.925 12.4883 18 12.684 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18Z"
                              fill="#616AA5"
                            />
                          </svg>
                        ) : e.type === "meeting" ? (
                          <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.7"
                              d="M9.03886 3.02125C9.039 2.62449 8.96094 2.23159 8.80917 1.86501C8.6574 1.49842 8.43488 1.16534 8.15433 0.884787C7.87377 0.604236 7.54069 0.381715 7.17411 0.229942C6.80752 0.0781693 6.41462 0.00011862 6.01786 0.00025002H3.05986C2.6599 -0.00489579 2.2629 0.0694369 1.8919 0.218935C1.52089 0.368433 1.18327 0.590121 0.898616 0.871134C0.613964 1.15215 0.387951 1.48689 0.233693 1.85594C0.0794339 2.22499 0 2.62101 0 3.021C0 3.42099 0.0794339 3.81701 0.233693 4.18606C0.387951 4.55511 0.613964 4.88985 0.898616 5.17087C1.18327 5.45188 1.52089 5.67357 1.8919 5.82306C2.2629 5.97256 2.6599 6.0469 3.05986 6.04175H3.63886V7.50025C3.63886 7.50025 9.03886 6.77125 9.03886 3.02125ZM6.28886 11.0002C6.28886 12.1052 5.39386 13.0002 4.28886 13.0002C3.18386 13.0002 2.28886 12.1052 2.28886 11.0002C2.28886 9.89525 3.18386 9.00025 4.28886 9.00025C5.39386 9.00025 6.28886 9.89525 6.28886 11.0002ZM4.28886 14.0002C2.87036 14.0002 0.0388644 14.7152 0.0388644 16.1337V18.0002H8.53886V16.1337C8.53886 14.7147 5.70736 14.0002 4.28886 14.0002ZM13.7889 13.0002C14.8939 13.0002 15.7889 12.1052 15.7889 11.0002C15.7889 9.89525 14.8939 9.00025 13.7889 9.00025C12.6839 9.00025 11.7889 9.89525 11.7889 11.0002C11.7889 12.1052 12.6839 13.0002 13.7889 13.0002ZM13.7889 14.0002C12.3704 14.0002 9.53886 14.7152 9.53886 16.1337V18.0002H18.0389V16.1337C18.0389 14.7147 15.2074 14.0002 13.7889 14.0002ZM13.0599 0.50025C12.6631 0.500119 12.2702 0.578169 11.9036 0.729942C11.537 0.881715 11.204 1.10424 10.9234 1.38479C10.6428 1.66534 10.4203 1.99842 10.2686 2.36501C10.1168 2.73159 10.0387 3.12449 10.0389 3.52125C10.0389 7.27125 14.8389 8.00025 14.8389 8.00025V6.54175H15.0179C15.4178 6.5469 15.8148 6.47256 16.1858 6.32306C16.5568 6.17357 16.8945 5.95188 17.1791 5.67087C17.4638 5.38985 17.6898 5.05511 17.844 4.68606C17.9983 4.31701 18.0777 3.92099 18.0777 3.521C18.0777 3.12101 17.9983 2.72499 17.844 2.35594C17.6898 1.98689 17.4638 1.65215 17.1791 1.37113C16.8945 1.09012 16.5568 0.868433 16.1858 0.718935C15.8148 0.569437 15.4178 0.495104 15.0179 0.50025H13.0599Z"
                              fill="#25307F"
                            />
                          </svg>
                        ) : null}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              marginRight: "1rem",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className={styles.eventTitle}>{e.title}</div>
                            <div className={styles.eventDuration}>
                              {e.duration}
                            </div>
                          </div>
                          <svg
                            width="11"
                            height="18"
                            viewBox="0 0 11 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.6"
                              d="M0.380428 17.2593C0.870428 17.7085 1.66043 17.7085 2.15043 17.2593L10.4604 9.64182C10.8504 9.28432 10.8504 8.70682 10.4604 8.34932L2.15043 0.731815C1.66043 0.282648 0.870428 0.282648 0.380428 0.731815C-0.109572 1.18098 -0.109572 1.90515 0.380428 2.35432L7.62043 9.00015L0.37043 15.646C-0.109571 16.086 -0.109572 16.8193 0.380428 17.2593Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Event Details Modal */}
              {selectedEvent && (
                <>
                  <div className="backdrop-overlay" />
                  <EventDetails
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                  />
                </>
              )}

              {/* Footer */}
              <div className={styles.eventsFooter}>
                <button className={styles.seeAllBtn} onClick={handleFooterBtn}>
                  See All
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(0, 7)"
                  >
                    <path
                      d="M6.125 4.25L9.875 8L6.125 11.75"
                      stroke="#333333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorOverview;
