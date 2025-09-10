import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CommonPanel from "../components/CommonPanel";
import { getAllAppointments } from "../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeBox, setActiveBox] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    const startDate = selectedDate.startOf("day").toISOString();
    const endDate = selectedDate.endOf("day").toISOString();

    // console.log("Fetching for date range:", selectedDate, startDate, endDate);

    ["Scheduled", "Ongoing", "Waiting", "Completed"].forEach((status) => {
      dispatch(
        getAllAppointments(status, startDate, endDate, page, rowsPerPage)
      );
    });
  }, [dispatch, selectedDate, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const scheduledAppointments = useSelector(
    (store) => store.doctor.scheduledAppointments
  );
  const ongoingAppointments = useSelector(
    (store) => store.doctor.ongoingAppointments
  );
  const waitingAppointments = useSelector(
    (store) => store.doctor.waitingAppointments
  );
  const completedAppointments = useSelector(
    (store) => store.doctor.completedAppointments
  );

  const scheduledCount = useSelector((store) => store.doctor.scheduledCount);
  const ongoingCount = useSelector((store) => store.doctor.ongoingCount);
  const waitingCount = useSelector((store) => store.doctor.waitingCount);
  const completedCount = useSelector((store) => store.doctor.completedCount);
  const boxData = [
    { id: 1, label: "Scheduled", count: scheduledCount },
    { id: 2, label: "Ongoing", count: ongoingCount },
    { id: 3, label: "Waiting", count: waitingCount },
    { id: 4, label: "Completed", count: completedCount },
  ];

  const handleBoxClick = (id) => setActiveBox(id);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/doctor");
  };

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  let appointments = [];

  let totalAppointmentsCount = 0;

  const activeLabel = useMemo(
    () => boxData.find((box) => box.id === activeBox)?.label,
    [activeBox]
  );

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
  return (
    <div style={{ height: "99dvh", overflow: "hidden", background: "#F1F1F1" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          padding: "10px",
          width: "77%",
          background: "#F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>

      <div style={{ marginTop: "200px" }}>
        <div style={{ backgroundColor: "white", position: "relative" }}>
          {/* Sticky Header */}
          <div
            style={{
              position: "sticky",
              top: "200px",
              background: "#fff",
              zIndex: 10,
              width: "100%",
              paddingTop: "10px",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ margin: "10px 30px 10px 0" }}
            >
              <Grid size={3} pl={2}>
                <h3
                  style={{
                    color: "#25307F",
                    paddingBottom: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                >
                  <ArrowBackIosIcon sx={{ verticalAlign: "middle" }} />{" "}
                  Appointments
                </h3>
              </Grid>
            </Grid>

            {/* Boxes */}
            <div
              style={{
                marginBottom: "1rem",
                padding: "0 2rem",
                display: "flex",
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
                    mx: "auto",
                    height: 55,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 1,
                    cursor: "pointer",
                    borderBottom:
                      activeBox === box.id ? "4px solid #25307F" : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={() => handleBoxClick(box.id)}
                >
                  <h2
                    style={{
                      fontSize: "2.1rem",
                      fontWeight: 600,
                      color: activeBox === box.id ? "#25307F" : "#4A4A4A",
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
                      color: activeBox === box.id ? "black" : "#747474",
                      marginTop: "4px",
                    }}
                  >
                    {box.label}
                  </p>
                </Box>
              ))}
            </div>
          </div>

          {/* Table */}
          <TableContainer
            sx={{ maxHeight: "47vh", overflowY: "auto", position: "relative" }}
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
                  <TableCell>Case Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Type Visit</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell align="center">Token Number</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ marginBottom: "50px" }}>
                {appointments.length > 0 ? (
                  [...appointments]
                    .sort((a, b) => {
                      if (a.status === "Ongoing" && b.status !== "Ongoing")
                        return -1;
                      if (a.status !== "Ongoing" && b.status === "Ongoing")
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
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          "&:hover": { backgroundColor: "#f9f9f9" },
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
                            {truncateText(appointment.caseId, 12)}
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

                        <TableCell sx={{ color: "#747474", fontWeight: 600 }}>
                          {appointment.doctor?.name}
                        </TableCell>

                        <TableCell sx={{ color: "#747474", fontWeight: 600 }}>
                          {appointment.typeVisit}
                        </TableCell>

                        <TableCell sx={{ color: "#747474", fontWeight: 600 }}>
                          {appointment.department.name}
                        </TableCell>

                        <TableCell
                          sx={{ color: "#747474", fontWeight: 600 }}
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
                                bgcolor:
                                  appointment.status === "Ongoing"
                                    ? "#3DB461"
                                    : "white",
                                color:
                                  appointment.status === "Ongoing"
                                    ? "white"
                                    : appointment.status === "Completed"
                                    ? "#EAA000"
                                    : appointment.status === "Scheduled"
                                    ? "#25307F"
                                    : "#757575",
                                fontWeight: "600",
                                px: 0.7,
                              }}
                            />
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
            </Table>
            <TablePagination
              component="div"
              count={totalAppointmentsCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
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
    </div>
  );
};

export default Appointments;
