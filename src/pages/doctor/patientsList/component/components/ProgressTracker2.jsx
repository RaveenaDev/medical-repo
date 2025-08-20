import React, { useEffect, useState } from "react";
import styles from "./ProgressTracker2.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../../../components/State/Doctor/Action";
import CompletedProgress from "./modals/completed/CompletedProgress";
import OngoingProgress from "./modals/ongoing/OngoingProgress";
import Discharge from "../modals/Discharge";
import UpdateProgress from "../form/UpdateProgress";
import { Plus } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const ProgressTracker2 = ({
  patientId,
  caseId,
  isFollowUpStatus,
  patientDetails,
}) => {
  // console.log("ProgressTracker2 patientDetails: ", caseId);
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(null);
  const [modalType, setModalType] = useState(null); // 'completed' or 'ongoing'

  useEffect(() => {
    dispatch(getProgressTrackerDetails(patientId, caseId));
  }, [dispatch, patientId, caseId]);

  const progressTracker = useSelector((store) => store.doctor.progressTracker);
  const isLoadingGetProgressTracker = useSelector(
    (store) => store.doctor.isLoadingGetProgressTracker
  );

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
    } else if (step.status === "ongoing" || step.status === "Final") {
      setModalType("ongoing");
      setSelectedStep(step);
    }
  };
  const [activeModal, setActiveModal] = useState(null);
  const openDischarge = () => setActiveModal("discharge");
  const openUpdateProgress = () => setActiveModal("update progress");
  const closeModal = () => setActiveModal(null);

  // Check if any step has status "completed"
  const isFinalPhase = progressTracker.some((step) => step.status === "Final");
  return (
    <div>
      <div className={styles.row1PT}>
        {!isFollowUpStatus && (
          <button className={styles.dischargeBtn} onClick={openDischarge}>
            <img src="/assets/inpatient/discharge.svg" alt="" /> Discharge
          </button>
        )}
        {/* Hide Update button if the status is "completed" */}
        {!isFinalPhase && (
          <button onClick={openUpdateProgress} className={styles.updateBtn}>
            <Plus className={styles.plusIcon} />
            Update
          </button>
        )}
      </div>
      <div>
        <h4 className={styles.title}>Progress Tracker</h4>
      </div>

      {isLoadingGetProgressTracker ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36vh", // or full height you need
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} size={58} />
        </Box>
      ) : (
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
              [...progressTracker].map((step, index) => (
                <div
                  key={index}
                  className={`${styles.tableRow} ${
                    step.status === "ongoing" ? styles.activeRow : ""
                  }`}
                  onClick={() => openModal(step)}
                >
                  <div className={`${styles.tableCell} ${styles.phaseCell}`}>
                    {step?.title || "Untitled Phase"}
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
                      ? step.status.charAt(0).toUpperCase() +
                        step.status.slice(1)
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
              patientId={patientId}
              caseId={caseId}
            />
          )}
        </div>
      )}
      {/* Ongoing Step Modal */}
      {modalType === "ongoing" && selectedStep && (
        <OngoingProgress
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
          patientId={patientId}
          caseId={caseId}
        />
      )}
      {activeModal === "discharge" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.dischargeModal}>
            <Discharge
              onClose={closeModal}
              patientId={patientId}
              caseId={caseId}
              patientDetails={patientDetails}
            />
          </div>
        </>
      )}
      {activeModal === "update progress" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.updateProgressModal}>
            <UpdateProgress
              onClose={closeModal}
              patientId={patientId}
              caseId={caseId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressTracker2;
