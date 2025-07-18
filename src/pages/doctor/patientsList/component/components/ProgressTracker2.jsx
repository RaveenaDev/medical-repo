import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostSurgeryFollowUp from "./form/PostSurgeryFollowUp";
import LabTests from "./form/LabTests";
import InitialConsultation from "./form/InitialConsultation";
import Surgery from "./form/Surgery";
import styles from "./ProgressTracker2.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProgressTrackerDetails } from "../../../../../components/State/Doctor/Action";

const ProgressTracker2 = ({ patientId }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);
  useEffect(() => {
    dispatch(getProgressTrackerDetails(patientId));
  }, [dispatch]);
  const progressTracker = useSelector((store) => store.doctor.progressTracker);
  // console.log("progressTracker details: ", progressTracker);
  const steps = [
    {
      phase: "Post-Surgery Follow-up",
      date: "June 27th, 2024",
      responsible: "Dr. Minhesh",
      progress: "Healing progress",
      status: "Ongoing",
    },
    {
      phase: "Surgery",
      date: "June 26th, 2024",
      responsible: "Dr. Minhesh",
      progress: "Heart Surgery",
      status: "Completed",
    },
    {
      phase: "Lab Tests",
      date: "September 25th, 2024",
      responsible: "Dr. Arunita",
      progress: "Blood test",
      status: "Completed",
    },
    {
      phase: "Initial Consultation",
      date: "June 24th, 2024",
      responsible: "Dr. Arunita",
      progress: "Blood test",
      status: "Completed",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openFollowUp = () => setActiveModal("FollowUp");
  const openSurgery = () => setActiveModal("Surgery");
  const openLabTests = () => setActiveModal("LabTests");
  const openInitialConsultation = () => setActiveModal("InitialConsultation");
  const closeModal = () => setActiveModal(null);

  return (
    <div className={styles.container}>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          {[...progressTracker].reverse().map((step, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <div
                  className={`${styles.timelineDot} ${
                    step.status === "ongoing"
                      ? styles.ongoing
                      : styles.completed
                  }`}
                ></div>
                {index < steps.length - 0 && (
                  <div className={styles.timelineConnector}></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tableContainer}>
        {/* Header row */}
        <div className={styles.tableHeaderRow}>
          <div className={`${styles.headerCell} ${styles.phaseHeader}`}>
            Phase
          </div>
          <div className={`${styles.headerCell} ${styles.dateHeader}`}>
            Date
          </div>
          <div className={styles.headerCell}>Responsible</div>
          <div className={styles.headerCell}>Progress</div>
          <div className={styles.headerCell}>Status</div>
        </div>

        {/* Data rows */}
        {[...progressTracker].reverse().map((step, index) => (
          <div
            key={index}
            className={`${styles.tableRow} ${
              step.status === "Ongoing" ? styles.activeRow : ""
            }`}
            onClick={
              step.phase === "Post-Surgery Follow-up"
                ? openFollowUp
                : step.phase === "Lab Tests"
                ? openLabTests
                : step.phase === "Initial Consultation"
                ? openInitialConsultation
                : step.phase === "Surgery"
                ? openSurgery
                : null
            }
          >
            <div className={`${styles.tableCell} ${styles.phaseCell}`}>
              {step.phase}
            </div>
            <div className={`${styles.tableCell} ${styles.dateCell}`}>
              {new Date(step.date).toISOString().split("T")[0]}
            </div>
            <div className={styles.tableCell}>{step.doctor.name}</div>
            <div className={styles.tableCell}>{step.progress}</div>
            <div
              className={`${styles.tableCell} ${
                step.status === "Completed"
                  ? styles.statusCompleted
                  : styles.statusOngoing
              }`}
            >
              {step.status}
            </div>
          </div>
        ))}
      </div>

      {/* Modals remain the same */}
      {activeModal === "FollowUp" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.followUpModal}>
            <PostSurgeryFollowUp onClose={closeModal} />
          </div>
        </>
      )}
      {activeModal === "Surgery" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.surgeryModal}>
            <Surgery onClose={closeModal} />
          </div>
        </>
      )}
      {activeModal === "LabTests" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.labTestsModal}>
            <LabTests onClose={closeModal} />
          </div>
        </>
      )}
      {activeModal === "InitialConsultation" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.initialConsultationModal}>
            <InitialConsultation onClose={closeModal} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressTracker2;
