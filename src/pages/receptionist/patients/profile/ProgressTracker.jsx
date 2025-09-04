import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../../components/State/Receptionist/Action";
import styles from "./ProgressTracker.module.scss";
const ProgressTracker = ({ patient }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/receptionist/patients/profile/progressReport", {
      state: { patient },
    });
  };

  const location = useLocation();
  const { caseId } = location.state;

  //console.log("Case ID: ", caseId);

  //  console.log("Patient: ", patient);
  //const patientId = patient.patId;
  //console.log("Patient-ID: ", patient._id);

  useEffect(() => {
    if (patient?._id && caseId) {
      const patientId = patient._id;
      dispatch(getProgressTrackerDetails(patientId, caseId));
      //console.log("Dispatch Request");
    }
  }, [dispatch, patient, caseId]);

  const progressTracker = useSelector(
    (store) => store.receptionist.progressTracker
  );
  //console.log("progressTracker details: ", progressTracker);
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
            <div className={styles.noData}></div>
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
