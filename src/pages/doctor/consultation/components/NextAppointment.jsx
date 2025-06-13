import React from "react";
import styles from "./NextAppointment.module.scss";
import { X } from "lucide-react";

const NextAppointment = ({ onClose }) => {
  return (
    <div className={styles.container1}>
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p>Next Appointment Patient Info</p>
        </div>

        {/* Patient Info */}
        <div className={styles.patientInfoContainer}>
          <div className={styles.img}>
            <img src="https://i.pravatar.cc/40?img=43" alt="" />
          </div>
          <div className={styles.patientInfo}>
            <p className={styles.name}>Amit Tripathi</p>
            <p>Age: 39&nbsp; |&nbsp; Male</p>
            <p>Patient ID: XXXXXXXX</p>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.row1}>
            <p className={styles.leftRow}>
              Date <br />
              <span>May 13th, 2025</span>
            </p>
            <p className={styles.rightRow}>
              Time <br />
              <span>3:00 PM</span>
            </p>
          </div>
          <div className={styles.row1}>
            <p className={styles.leftRow}>
              Consultation Doctor <br />
              <span>Dr. Arundhati</span>
            </p>
            <p className={styles.rightRow}>
              Department <br />
              <span>Cardiology</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button className={styles.startBtn}>Start Consultation</button>
          <button className={styles.rescheduleBtn}>Reschedule</button>
        </div>
      </div>
    </div>
  );
};

export default NextAppointment;
