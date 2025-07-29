import React, { useEffect, useState } from "react";
import styles from "./ProgressTracker2.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../../../components/State/Doctor/Action";
import CompletedProgress from "./modals/completed/CompletedProgress";
import OngoingProgress from "./modals/ongoing/OngoingProgress";

const OngoingModal = ({ step, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Ongoing Phase</h2>
          <button onClick={onClose}>✖</button>
        </div>
        <div className={styles.modalBody}>
          <p>This step is currently ongoing.</p>
          <p>
            <strong>Phase:</strong> {step?.phase}
          </p>
          <p>
            <strong>Doctor:</strong> {step?.doctor?.name}
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.closeBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgressTracker2 = ({ patientId }) => {
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(null);
  const [modalType, setModalType] = useState(null); // 'completed' or 'ongoing'

  useEffect(() => {
    dispatch(getProgressTrackerDetails(patientId));
  }, [dispatch]);

  const progressTracker = useSelector((store) => store.doctor.progressTracker);
  // console.log("progressTracker details: ", progressTracker);

  useEffect(() => {
    document.body.style.overflow = selectedStep ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedStep]);

  const openModal = (step) => {
    if (step.status === "completed") {
      setModalType("completed");
      setSelectedStep(step);
    } else if (step.status === "ongoing") {
      setModalType("ongoing");
      setSelectedStep(step);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
            [...progressTracker].reverse().map((step, index) => (
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

      <div className={styles.tableContainer}>
        <div className={styles.tableHeaderRow}>
          <div className={`${styles.headerCell} ${styles.phaseHeader}`}>
            Phase
          </div>
          <div className={`${styles.headerCell} ${styles.dateHeader}`}>
            Date
          </div>
          <div className={styles.headerCell}>Responsible</div>
          <div className={styles.headerCell}>Progress Status</div>
        </div>

        {Array.isArray(progressTracker) && progressTracker.length > 0 ? (
          [...progressTracker].reverse().map((step, index) => (
            <div
              key={index}
              className={`${styles.tableRow} ${
                step.status === "ongoing" ? styles.activeRow : ""
              }`}
              onClick={() => openModal(step)}
            >
              <div className={`${styles.tableCell} ${styles.phaseCell}`}>
                {step?.data?.title || "Untitled Phase"}
              </div>
              <div className={`${styles.tableCell} ${styles.dateCell}`}>
                {step?.date
                  ? new Date(step.date).toISOString().split("T")[0]
                  : "Date N/A"}
              </div>
              <div className={styles.tableCell}>
                {step?.doctor?.name || "Unknown"}
              </div>
              <div
                className={`${styles.tableCell} ${
                  step.status === "completed"
                    ? styles.statusCompleted
                    : styles.statusOngoing
                }`}
              >
                {step?.status
                  ? step.status.charAt(0).toUpperCase() + step.status.slice(1)
                  : "N/A"}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>No progress steps available.</div>
        )}
      </div>

      {/* Completed Step Modal */}
      {modalType === "completed" && selectedStep && (
        <CompletedProgress
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
        />
      )}

      {/* Ongoing Step Modal */}
      {modalType === "ongoing" && selectedStep && (
        <OngoingProgress
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </div>
  );
};

export default ProgressTracker2;
