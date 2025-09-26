import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import EntityBasedTable from "./EntityBasedTable";
import {
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import X from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EventIcon from "@mui/icons-material/Event"; // for Reschedule
import TodayIcon from "@mui/icons-material/Today"; // for Reschedule Today
import CommonPanel from "./components/CommonPanel.jsx";
import BookAppointment from "./Appointment/Book/BookAppointment.jsx";
import Select from "../../components/Select/index.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  getAllDepartments,
  getAppointments,
  getRequestedAppointments,
  startConsultation,
  submitConsultation,
  // markAppointmentCompleted, // <- If you already have an action for completion, import it and use in handleComplete below.
} from "../../components/State/Receptionist/Action.js";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import CompleteAppointmentModal from "./components/CompleteAppointmentModal.jsx";
import Reschedule from "./components/Reschedule.jsx";
import RescheduleToday from "./components/RescheduleToday.jsx";

function Receptionist(props) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tableIndex, setTableIndex] = useState(null);

  const [isBookAppointment, setIsBookAppointment] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [activeBox, setActiveBox] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState();

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleTodayOpen, setRescheduleTodayOpen] = useState(false);

  // menu + modal state
  const [rowMenuAnchor, setRowMenuAnchor] = useState(null);
  const [menuAppointment, setMenuAppointment] = useState(null);
  const [completeOpen, setCompleteOpen] = useState(false);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleSelectChange = (value) => setSelectedBranch(value);

  const refreshAppointments = useSelector(
    (state) => state.receptionist.refreshAppointments
  );

  useEffect(() => {
    const startDate = selectedDate.startOf("day").toISOString();
    const endDate = selectedDate.endOf("day").toISOString();

    // console.log("Fetching for date range:", selectedDate, startDate, endDate);
    dispatch(getAllDepartments());

    ["Scheduled", "Ongoing", "Waiting", "completed"].forEach((status) => {
      dispatch(
        getAppointments(
          status,
          startDate,
          endDate,
          selectedBranch,
          page,
          rowsPerPage
        )
      );
    });
  }, [
    dispatch,
    selectedBranch,
    selectedDate,
    refreshAppointments,
    page,
    rowsPerPage,
  ]);

  const departments = useSelector((store) => store.receptionist.departments);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (departments && Array.isArray(departments)) {
      setBranches(departments);
    }
  }, [departments]);

  let loading = useSelector((store) => store.receptionist.isLoading);
  let isLoadingAppointments = useSelector(
    (store) => store.receptionist.isLoadingAppointments
  );

  const scheduledAppointments = useSelector(
    (store) => store.receptionist.scheduledAppointments
  );

  // console.log('Ses: ',scheduledAppointments)
  const scheduledCount = useSelector((store) => store.admin.scheduledCount);

  const ongoingAppointments = useSelector(
    (store) => store.receptionist.ongoingAppointments
  );
  const ongoingCount = useSelector((store) => store.admin.ongoingCount);

  const waitingAppointments = useSelector(
    (store) => store.receptionist.waitingAppointments
  );
  const waitingCount = useSelector((store) => store.admin.waitingCount);

  const completedAppointments = useSelector(
    (store) => store.receptionist.completedAppointments
  );
  const completedCount = useSelector((store) => store.admin.completedCount);

  // Which doctors currently have an ongoing appointment?
  const ongoingDoctorIds = useMemo(() => {
    const ids = new Set();
    (ongoingAppointments || []).forEach((a) => {
      const id = a?.doctor?._id || a?.doctor?.id || a?.doctor; // be tolerant of shape
      if (id) ids.add(String(id));
    });
    return ids;
  }, [ongoingAppointments]);

  const boxData = [
    { id: 1, label: "Scheduled", count: scheduledCount },
    { id: 2, label: "Ongoing", count: ongoingCount },
    { id: 3, label: "Waiting", count: waitingCount },
    { id: 4, label: "Completed", count: completedCount },
  ];

  const activeLabel = useMemo(
    () => boxData.find((box) => box.id === activeBox)?.label,
    [activeBox]
  );

  const handleBoxClick = (id) => setActiveBox(id);

  useEffect(() => {
    dispatch(getRequestedAppointments());
  }, [dispatch]);

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  let appointments = [];
  let totalAppointmentsCount = 0;
  switch (activeLabel) {
    case "Scheduled":
      appointments = scheduledAppointments;
      totalAppointmentsCount = scheduledCount;
      break;
    case "Ongoing":
      appointments = ongoingAppointments;
      totalAppointmentsCount = ongoingCount;
      break;
    case "Waiting":
      appointments = waitingAppointments;
      totalAppointmentsCount = waitingCount;
      break;
    case "Completed":
      appointments = completedAppointments;
      totalAppointmentsCount = completedCount;
      break;
    default:
      appointments = [];
  }

  // console.log("App: ",appointments)
  // === Menu handlers ===
  const openRowMenu = (event, appointment) => {
    setRowMenuAnchor(event.currentTarget);
    setMenuAppointment(appointment);
  };
  const closeRowMenu = () => {
    setRowMenuAnchor(null);
  };

  const handleClickMarkCompleted = () => {
    closeRowMenu();
    setCompleteOpen(true);
  };

  // ✅ NEW: helper to refresh all buckets
  const refreshAllBuckets = () => {
    const startDateISO = selectedDate.startOf("day").toISOString();
    const endDateISO = selectedDate.endOf("day").toISOString();
    ["Scheduled", "Ongoing", "Waiting", "completed"].forEach((status) => {
      dispatch(
          getAppointments(
              status,
              startDateISO,
              endDateISO,
              selectedBranch,
              page,
              rowsPerPage
          )
      );
    });
  };

  const handleClickMarkOngoing = async () => {
    closeRowMenu();

    // Fetch the patientId from menuAppointment
    const patientId = menuAppointment?.patient?._id;

    if (patientId) {
      // Dispatch startConsultation with the patientId
      await dispatch(startConsultation(patientId));

      refreshAllBuckets();
    } else {
      console.error("Patient ID not found for the appointment.");
    }
  };

  const handleComplete = async ({ file, note, appointment }) => {
    // Prepare consultationData object based on what your backend expects
    const consultationData = {
      doctor: appointment?.doctor?._id, // Ensure doctor ID is passed
      patient: appointment?.patient?._id, // Ensure patient ID is passed
      appointment: appointment?._id, // Ensure appointment ID is passed
      department: appointment?.department?._id, // Ensure department ID is passed
      action: "complete", // Action is 'complete' when finalizing the consultation
      consultationData: {
        notes: note || "", // Append notes from modal
        // Add any other consultation data here (e.g., symptoms, diagnosis)
      },
      files: file ? [file] : [], // Attach files if present
    };

    // Call the submitConsultation action (dispatching the action)
    await dispatch(submitConsultation(consultationData));

    refreshAllBuckets();
  };

  const handleClickCancelAppointment = async () => {
    closeRowMenu();

    const appointmentId = menuAppointment?._id;
    if (appointmentId) {
      await dispatch(cancelAppointment(appointmentId));

      refreshAllBuckets();
    } else {
      console.error("Appointment ID not found for cancellation.");
    }
  };

  const handleClickReschedule = () => {
    closeRowMenu();
    setRescheduleOpen(true);
  };

  const handleClickRescheduleToday = () => {
    closeRowMenu();
    setRescheduleTodayOpen(true);
  };

  // ✅ NEW: modal confirms
  const handleConfirmReschedule = async ({ combinedISO }) => {
    if (!menuAppointment?._id) return;

    // await dispatch(
    //     rescheduleAppointment({
    //       appointmentId: menuAppointment._id,
    //       tokenDate: combinedISO, // adjust field if your backend expects a different name
    //       reason: "Rescheduled by receptionist",
    //     })
    // );

    setRescheduleOpen(false);
    refreshAllBuckets();
  };

  const handleConfirmRescheduleToday = async ({ afterTokenNumber }) => {
    if (!menuAppointment?._id) return;

    // await dispatch(
    //     rescheduleAppointment({
    //       appointmentId: menuAppointment._id,
    //       rescheduleTodayAfterToken: afterTokenNumber,
    //       baseDate: selectedDate.startOf("day").toISOString(),
    //       reason: "Moved later today after token",
    //     })
    // );

    setRescheduleTodayOpen(false);
    refreshAllBuckets();
  };

  return (
    <div
      style={{
        height: "99dvh",
        overflow: "hidden",
        background: " #F1F1F1",
      }}
    >
      <div>
        <div
          style={{
            position: "fixed",
            top: "0px",
            padding: "6px 10px",
            width: "77%",
            background: " #F1F1F1",
            zIndex: 100,
          }}
        >
          <CommonPanel
            setIsBookAppointment={setIsBookAppointment}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>

        <div style={{ marginTop: "200px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress sx={{ color: "#25307F" }} size={58} />
            </Box>
          ) : (
            <div>
              {!props.entity ? (
                <>
                  {isBookAppointment ? (
                    <BookAppointment
                      isOpen={isBookAppointment}
                      onClose={() => setIsBookAppointment(false)}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "relative",
                      }}
                    >
                      {/* Sticky filters + counters */}
                      <div
                        style={{
                          position: "sticky",
                          top: "210px",
                          background: "#fff",
                          zIndex: 10,
                          width: "100%",
                          // paddingTop: "10px",
                        }}
                      >
                        {departments.length > 0 && (
                          <Grid
                            container
                            spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{ margin: "10px 30px 10px 0" }}
                          >
                            <Grid xs={4}>
                              <Select
                                inputId="input-department"
                                selectId="select-department"
                                label="Department"
                                list={branches}
                                size="small"
                                onChange={handleSelectChange}
                              />
                            </Grid>
                          </Grid>
                        )}

                        <div
                          style={{
                            marginBottom: "0.8rem",
                            padding: "0 2rem",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1rem",
                          }}
                        >
                          {boxData.map((box) => (
                            <Box
                              key={box.id}
                              sx={{
                                backgroundColor:
                                  activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                                px: { sm: 3, md: 5, lg: 7 },
                                height: 55,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 1,
                                boxShadow: "none",
                                cursor: "pointer",
                                borderBottom:
                                  activeBox === box.id
                                    ? "3.5px solid #25307F"
                                    : "none",
                                transition: "all 0.3s ease-in-out",
                              }}
                              onClick={() => handleBoxClick(box.id)}
                            >
                              <h2
                                style={{
                                  fontSize: "2.1rem",
                                  fontWeight: 600,
                                  color:
                                    activeBox === box.id
                                      ? "#25307F"
                                      : " #4A4A4A",
                                }}
                              >
                                {box.count}
                              </h2>
                              <span
                                style={{
                                  fontSize: "1.6rem",
                                  fontWeight: 500,
                                  color: "black",
                                  marginRight: "4px",
                                }}
                              >
                                -
                              </span>
                              <p
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: 500,
                                  marginTop: "4px",
                                  color:
                                    activeBox === box.id ? "black" : "#747474",
                                }}
                              >
                                {box.label}
                              </p>
                            </Box>
                          ))}
                        </div>
                      </div>

                      {/* Table */}
                      <div style={{ position: "relative" }}>
                        <TableContainer
                          sx={{
                            maxHeight: "55vh",
                            overflowY: "auto",
                            position: "relative",
                          }}
                        >
                          <Table
                            sx={{
                              borderCollapse: "separate",
                              borderSpacing: "0 10px",
                              marginBottom: "30px",
                            }}
                          >
                            <TableHead
                              sx={{
                                position: "sticky",
                                top: 0,
                                backgroundColor: "white",
                                zIndex: 10,
                              }}
                            >
                              <TableRow>
                                <TableCell
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Case Id
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Name
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Appointment With
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Type Visit
                                </TableCell>
                                <TableCell
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Branch
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Appt. Time
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "#000", fontSize: "16px" }}
                                >
                                  Token No.
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    color: "#000",
                                    fontSize: "16px",
                                    pl: 3,
                                  }}
                                >
                                  Status
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            {isLoadingAppointments ? (
                              <TableRow>
                                <TableCell colSpan={8} align="center">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "20vh",
                                    }}
                                  >
                                    <CircularProgress
                                      sx={{ color: "#25307F" }}
                                      size={45}
                                    />
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableBody sx={{ marginBottom: "50px" }}>
                                {appointments.length > 0 ? (
                                  [...appointments]
                                    .sort((a, b) => {
                                      if (
                                        a.status === "Ongoing" &&
                                        b.status !== "Ongoing"
                                      )
                                        return -1;
                                      if (
                                        a.status !== "Ongoing" &&
                                        b.status === "Ongoing"
                                      )
                                        return 1;
                                      return 0;
                                    })
                                    .map((appointment) => (
                                      <TableRow
                                        key={appointment._id}
                                        sx={{
                                          bgcolor:
                                            appointment.status === "Ongoing"
                                              ? "#3DB46117"
                                              : "white",
                                          boxShadow:
                                            "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                          borderRadius: "8px",
                                          "&:hover": {
                                            backgroundColor: "#f9f9f9",
                                          },
                                          "& > *": { borderBottom: "unset" },
                                        }}
                                      >
                                        <TableCell>
                                          <Typography
                                            sx={{
                                              fontWeight: "bold",
                                              cursor: "pointer",
                                              color: "#25307F",
                                            }}
                                          >
                                            {truncateText(
                                              appointment.caseId,
                                              12
                                            )}
                                          </Typography>
                                        </TableCell>

                                        <TableCell>
                                          <Typography
                                            variant="body1"
                                            sx={{
                                              fontWeight: "bold",
                                              cursor: "pointer",
                                              color: "#25307F",
                                            }}
                                          >
                                            {appointment.patient.name}
                                          </Typography>
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            color: "#747474",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {appointment.doctor?.name}
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            color: "#747474",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {appointment.typeVisit}
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            color: "#747474",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {appointment.department.name}
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            color: "#747474",
                                            fontWeight: 600,
                                          }}
                                          align="center"
                                        >
                                          {appointment?.tokenDate
                                            ? new Date(appointment.tokenDate)
                                                .toLocaleTimeString("en-IN", {
                                                  timeZone: "Asia/Kolkata",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  hour12: true,
                                                })
                                                .replace("am", "AM")
                                                .replace("pm", "PM")
                                            : "N/A"}
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            color: "#747474",
                                            fontWeight: 600,
                                          }}
                                          align="center"
                                        >
                                          {appointment?.tokenNumber || "N/A"}
                                        </TableCell>

                                        <TableCell align="right">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              width: "100%",
                                            }}
                                          >
                                            <Chip
                                              label={appointment.status}
                                              size="small"
                                              sx={{
                                                textTransform: "capitalize",
                                                bgcolor:
                                                  appointment.status ===
                                                  "Ongoing"
                                                    ? "#3DB461"
                                                    : "white",
                                                color:
                                                  appointment.status ===
                                                  "Ongoing"
                                                    ? "white"
                                                    : appointment.status ===
                                                      "Completed"
                                                    ? "#EAA000"
                                                    : appointment.status ===
                                                      "Scheduled"
                                                    ? "#25307F"
                                                    : "#757575",
                                                fontWeight: "600",
                                                px: 0.7,
                                              }}
                                            />

                                            {/* Menu trigger (show for all except already completed) */}
                                            {appointment.status !==
                                              "completed" && (
                                              <Box sx={{ ml: "auto" }}>
                                                <IconButton
                                                  size="small"
                                                  sx={{
                                                    p: 0,
                                                    "&:focus": {
                                                      outline: "none",
                                                      boxShadow: "none",
                                                    },
                                                  }}
                                                  onClick={(e) =>
                                                    openRowMenu(e, appointment)
                                                  }
                                                >
                                                  <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                              </Box>
                                            )}
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                ) : (
                                  <TableRow>
                                    <TableCell align="center" colSpan={7}>
                                      No data found!
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            )}
                          </Table>

                          <TablePagination
                            component="div"
                            count={totalAppointmentsCount ?? 0} // fallback to 0 if null
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
                            sx={{
                              position: "sticky",
                              bottom: 0,
                              backgroundColor: "#fff",
                              borderTop: "2px solid #ddd",
                              zIndex: 11,
                            }}
                          />
                        </TableContainer>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isBookAppointment ? (
                    <BookAppointment
                      isBookAppointment={isBookAppointment}
                      onClose={() => setIsBookAppointment(false)}
                    />
                  ) : (
                    <EntityBasedTable
                      entity={props?.entity}
                      tableIndex={tableIndex}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Row menu */}
      <Menu
        anchorEl={rowMenuAnchor}
        open={Boolean(rowMenuAnchor)}
        onClose={closeRowMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuAppointment?.status === "Waiting" && (
          <>
            {/* Mark as Ongoing */}
            {(() => {
              const doctorId =
                menuAppointment?.doctor?._id ||
                menuAppointment?.doctor?.id ||
                menuAppointment?.doctor;
              const disableOngoing =
                doctorId && ongoingDoctorIds.has(String(doctorId));

              return (
                <MenuItem
                  onClick={disableOngoing ? undefined : handleClickMarkOngoing}
                  disabled={Boolean(disableOngoing)}
                  title={
                    disableOngoing
                      ? "This doctor already has an ongoing case."
                      : ""
                  }
                >
                  <ListItemIcon>
                    <PlayArrowIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Mark as Ongoing" />
                </MenuItem>
              );
            })()}

            {/* Cancel Appointment */}
            <MenuItem onClick={handleClickCancelAppointment}>
              <ListItemIcon>
                <X fontSize="small" /> {/* <- use your cancel icon */}
              </ListItemIcon>
              <ListItemText primary="Cancel Appointment" />
            </MenuItem>
            {/* Reschedule */}
            <MenuItem onClick={handleClickReschedule}>
              <ListItemIcon>
                <EventIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Reschedule" />
            </MenuItem>

            {/* Reschedule Today */}
            <MenuItem onClick={handleClickRescheduleToday}>
              <ListItemIcon>
                <TodayIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Reschedule Today" />
            </MenuItem>
          </>
        )}

        {menuAppointment?.status === "Ongoing" && (
          <>
            <MenuItem onClick={handleClickMarkCompleted}>
              <ListItemIcon>
                <DoneAllIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Mark as Completed" />
            </MenuItem>

            {/* Cancel Appointment */}
            <MenuItem onClick={handleClickCancelAppointment}>
              <ListItemIcon>
                <X fontSize="small" /> {/* <- cancel icon */}
              </ListItemIcon>
              <ListItemText primary="Cancel Appointment" />
            </MenuItem>
            {/* Reschedule */}
            <MenuItem onClick={handleClickReschedule}>
              <ListItemIcon>
                <EventIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Reschedule" />
            </MenuItem>

            {/* Reschedule Today */}
            <MenuItem onClick={handleClickRescheduleToday}>
              <ListItemIcon>
                <TodayIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Reschedule Today" />
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Completion modal */}
      <CompleteAppointmentModal
        open={completeOpen}
        onClose={() => setCompleteOpen(false)}
        onComplete={handleComplete}
        appointment={menuAppointment}
      />
      
      <Reschedule
          open={rescheduleOpen}
          onClose={() => setRescheduleOpen(false)}
          onConfirm={handleConfirmReschedule}
      />
      <RescheduleToday
          open={rescheduleTodayOpen}
          onClose={() => setRescheduleTodayOpen(false)}
          onConfirm={handleConfirmRescheduleToday}
      />
    </div>
  );
}

export default Receptionist;
