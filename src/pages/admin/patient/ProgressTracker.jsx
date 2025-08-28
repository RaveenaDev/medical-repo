import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../components/State/Admin/Action";
import styles from "./ProgressTracker.module.scss";
const ProgressTracker = ({ patient }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  console.log("patient:", patient);
  const patientId = patient?._id;
  const caseId = patient?.appointments[patient.appointments.length - 1]?.caseId;

  useEffect(() => {
    if (patientId && caseId) {
      dispatch(getProgressTrackerDetails(patientId, caseId));
      //console.log("Dispatch Request");
    }
  }, [dispatch, patientId, caseId]);

  const progressTracker = useSelector((store) => store.admin.progressTracker);

  // console.log("progressTracker details: ", progressTracker);

  const handleClick = () => {
    navigate("/admin/reception/patients/Tracking", {
      state: { patient },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
            [...progressTracker].map((step, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineSeparator}>
                  <div
                    className={`${styles.timelineDot} ${
                      step.status === "ongoing"
                        ? styles.ongoing
                        : styles.completed
                    }`}
                  ></div>
                  {index < progressTracker.length - 1 && (
                    <div className={styles.timelineConnector}></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noData}>No progress steps available.</div>
          )}
        </div>
      </div>

      <div
        className={styles.tableContainer}
        style={{ marginTop: "0px", paddingRight: "22px" }}
      >
        {/* Header row */}
        <div className={styles.tableHeaderRow}>
          <div className={styles.headerCell}>Phase</div>
          <div className={styles.headerCell}>Date</div>
          <div className={styles.headerCell}>Responsible</div>
          <div className={styles.headerCell}>Progress Status</div>
        </div>

        {/* Body */}
        {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
          progressTracker.map((step, index) => (
            <div
              key={index}
              className={`${styles.tableRow} ${
                step.status === "ongoing" ? styles.activeRow : ""
              }`}
              onClick={handleClick}
              style={{
                backgroundColor:
                  step.status === "ongoing" ? "#e8f5e9" : "inherit",

                cursor: step.status === "ongoing" ? "pointer" : "default",
                transition: "background-color 0.3s",
              }}
            >
              <div className={styles.tableCell} style={{ textAlign: "center" }}>
                {step?.title || "Untitled Phase"}
              </div>
              <div className={styles.tableCell} style={{ textAlign: "center" }}>
                {step?.date
                  ? new Date(step.date).toISOString().split("T")[0]
                  : "Date N/A"}
              </div>
              <div className={styles.tableCell} style={{ textAlign: "center" }}>
                {step?.doctor?.name || "Unknown"}
              </div>
              <div
                className={styles.tableCell}
                style={{
                  textAlign: "center",
                  fontWeight: "550",
                  color:
                    step.status === "completed"
                      ? "#EAA000"
                      : step.status === "ongoing"
                      ? "#2E823B"
                      : "black",
                }}
              >
                {step?.status
                  ? step.status.charAt(0).toUpperCase() + step.status.slice(1)
                  : "N/A"}
              </div>
            </div>
          ))
        ) : (
          <div
            className={styles.noData}
            style={{ textAlign: "center", color: "#888" }}
          >
            No progress steps available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
