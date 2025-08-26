import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./receptionPage.module.scss";
import ayu from "../departments/departments.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentRequests,
  getAppointments,
  getPatients,
  getRejectedAppointments,
} from "../../../components/State/Admin/Action.js";

function createData(name, appointmentWith, typeVisit, branch, tokenNumber) {
  return { name, appointmentWith, typeVisit, branch, tokenNumber };
}
// Utility function to truncate text
const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const ReceptionPage = ({ setSelectedDate, selectedDate }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAppointments("Scheduled"));
  //   dispatch(getAppointmentRequests());
  //   dispatch(getRejectedAppointments());
  //   dispatch(getPatients());
  // }, [dispatch]);
  useEffect(() => {
    const startDate = selectedDate.startOf("day").toISOString();
    const endDate = selectedDate.endOf("day").toISOString();

    dispatch(getAppointments("Ongoing", startDate, endDate));
    dispatch(getAppointmentRequests());
    dispatch(getRejectedAppointments());
    dispatch(getPatients());
  }, [dispatch, selectedDate]);

  const admin = useSelector((store) => store.admin);
  const isLoadingTotalAppointments = useSelector(
    (store) => store.admin.isLoadingTotalAppointments
  );
  const isLoadingGetPatients = useSelector(
    (store) => store.admin.isLoadingGetPatients
  );
  const isLoadingAppointmentRequests = useSelector(
    (store) => store.admin.isLoadingAppointmentRequests
  );
  //console.log(isLoadingAppointmentRequests);

  const isLoadingRejectedAppointments = useSelector(
    (store) => store.admin.isLoadingRejectedAppointments
  );
  const totalAppointments = admin.totalAppointments;
  const totalPatients = admin.patients;
  const totalAppointmentRequests = admin.appointmentRequests;
  const totalRejectedAppointments = admin.rejectedAppointments;

  const handleAppointments = () => {
    navigate("/admin/reception/appointments", {
      state: { selectedDate: selectedDate.format() }, // Ensure it's a serializable string
    });
  };

  const handlePatients = () => {
    navigate("/admin/reception/patients", { state: { totalPatients } });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "-10px" }}>
      <Grid size={8.5}>
        <Grid container direction="column" spacing={2}>
          {/* First vertically stacked item */}
          <Grid
            className={styles.container1}
            style={{ paddingBottom: "6px", borderRadius: "4px" }}
          >
            <div className={styles.heading1} onClick={handleAppointments}>
              <h3>Appointments</h3>
              <span className={ayu.forwardButton}>
                <ArrowForwardIosIcon />
              </span>
            </div>

            <div>
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
                          fontSize: "13px",
                          color: "#959595",
                          border: "none",
                          px: 2.6,
                        }}
                      >
                        Case ID
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: "13px",
                          color: "#959595",
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
                          fontSize: "13px",
                          color: "#959595",
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
                          fontSize: "13px",
                          color: "#959595",
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
                          fontSize: "13px",
                          color: "#959595",
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
                          fontSize: "13px",
                          color: "#959595",
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
                          fontSize: "13px",
                          color: "#959595",
                          padding: "0.5 1",
                          border: "none",
                          px: 0.6,
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {isLoadingTotalAppointments ? (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ border: "none", textAlign: "center", py: 8 }}
                        >
                          <CircularProgress
                            sx={{ color: "#25307F" }}
                            size={45}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {totalAppointments.length > 0 ? (
                        totalAppointments.slice(0, 5).map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              backgroundColor: "#EEF8F1",
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
                              }}
                            >
                              {truncateText(row.caseId, 13)}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ color: "#25307f", border: "none", px: 0.6 }}
                            >
                              {truncateText(row.patient?.name, 13)}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ border: "none", px: 0.6, color: "#747474" }}
                            >
                              {truncateText(row.doctor?.name, 14)}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ border: "none", px: 0.6, color: "#747474" }}
                            >
                              {row.typeVisit}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ border: "none", px: 0.6, color: "#747474" }}
                            >
                              {row.department.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ border: "none", px: 0.6, color: "#747474" }}
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
                                  fontWeight: "bold",
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
                  )}
                </Table>
              </TableContainer>
            </div>
          </Grid>
          {/* Second vertically stacked item */}
          <Grid
            className={styles.container1}
            style={{ paddingBottom: "6px", borderRadius: "4px" }}
          >
            <div className={styles.heading1} onClick={handlePatients}>
              <h3>Patients</h3>
              <span className={ayu.forwardButton}>
                <ArrowForwardIosIcon />
              </span>
            </div>

            <div>
              <TableContainer>
                <Table
                  sx={{
                    borderCollapse: "separate", // Ensure border-spacing works
                    borderSpacing: "0 8px", // Adds vertical spacing between rows
                  }}
                  aria-label="simple table"
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
                          fontSize: "13px",
                          color: "#959595",
                          pl: 4,
                          border: "none",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: "13px",
                          color: "#959595",
                          padding: "0.5 1",
                          border: "none",
                        }}
                      >
                        Responsible
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: "13px",
                          color: "#959595",
                          padding: "0.5 1",
                          border: "none",
                        }}
                      >
                        Phase
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: "13px",
                          color: "#959595",
                          padding: "0.5 1",
                          border: "none",
                        }}
                      >
                        Branch
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "13px",
                          color: "#959595",
                          padding: "0.5 1",
                          border: "none",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {isLoadingGetPatients ? (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ border: "none", textAlign: "center", py: 8 }}
                        >
                          <CircularProgress
                            sx={{ color: "#25307F" }}
                            size={45}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {totalPatients.length > 0 ? (
                        totalPatients.slice(0, 5).map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "& td, & th": { py: 1.2 }, // Removes padding from all cells
                              backgroundColor:
                                row.status === "active" ? "#edf8f1" : "#fff",
                            }}
                          >
                            <TableCell
                              component="td"
                              scope="row"
                              sx={{
                                color: "#25307f",
                                border: "none",
                                padding: "14px 24px",
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              component="td"
                              scope="row"
                              sx={{
                                border: "none",
                                padding: "14px 14px",
                                color: "#747474",
                                fontWeight: 500,
                              }}
                            >
                              {truncateText(
                                row.doctors[0]?.name || "Not Assigned",
                                12
                              )}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: "none",
                                padding: "14px 14px",
                                color: "#747474",
                              }}
                            >
                              {truncateText(row.role, 14)}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: "none",
                                padding: "14px 14px",
                                color: "#747474",
                              }}
                            >
                              {row.appointments.length > 0
                                ? row.appointments[row.appointments.length - 1]
                                    ?.branch || "Not Assigned"
                                : "Not Assigned"}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ border: "none", padding: "14px 14px" }}
                            >
                              <span
                                style={{
                                  color: "#4b9758",
                                  backgroundColor: "#c6e1cb", // Replace with your desired color
                                  padding: "6px 14px", // Add padding for spacing
                                  borderRadius: "16px", // Add rounded corners
                                  display: "inline-block", // Ensures the span wraps only the text
                                  fontSize: "12px",
                                  border: "1px solid #4b9758",
                                }}
                              >
                                Active
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={5}
                            sx={{ backgroundColor: "#EEF8F1" }}
                          >
                            No patients found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        size={3.5}
        className={styles.container1}
        sx={{
          maxHeight: "78.5vh",
          overflowY: "auto",
          paddingX: "15px",
        }}
      >
        <div>
          <div className={styles.heading1} style={{ padding: "0" }}>
            <h3>Appointment Requests ({totalAppointmentRequests?.length})</h3>
          </div>

          {totalAppointmentRequests ? (
            totalAppointmentRequests.map((req, index) => (
              <div key={index} className={styles.items}>
                <div className={styles.circle}></div>
                <div>
                  <h4>{req.patient.name}</h4>
                  <p>
                    Appointment for {req.department.name},{" "}
                    {new Date(req.tokenDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  {/*<p>Appointment for ENT, 28 September</p>*/}
                </div>
              </div>
            ))
          ) : (
            <div>No appointment found</div>
          )}
        </div>

        <div>
          <div className={styles.heading2}>
            <h3>Canceled ({totalRejectedAppointments.length})</h3>
          </div>

          {totalRejectedAppointments.map((req, index) => (
            <div key={index} className={styles.items}>
              <div className={styles.circle}></div>
              <div>
                <h4>{req.patient.name}</h4>
                <p>
                  Appointment for {req.doctor.specialization},{" "}
                  {new Date(req.dateActioned).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                {/*<p>Appointment for ENT, 28 September</p>*/}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.heading3}>
            <h3>Confirmed (4)</h3>
          </div>

          {totalRejectedAppointments.map((req, index) => (
            <div key={index} className={styles.items}>
              <div className={styles.circle}></div>
              <div>
                <h4>{req.patient.name}</h4>
                <p>
                  Appointment for {req.doctor.specialization},{" "}
                  {new Date(req.dateActioned).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                {/*<p>Appointment for ENT, 28 September</p>*/}
              </div>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};
export default ReceptionPage;
