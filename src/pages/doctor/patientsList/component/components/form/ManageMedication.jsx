import { useState } from "react";
import styles from "./ManageMedication.module.scss";
import { X } from "lucide-react";
const ManageMedication = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(true);
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Manage Medication</h1>

        {activeTab ? (
          <div className={styles.section1}>
            <div>
              <p className={styles.label}>New Date</p>
              <input type="date" />
            </div>
            <div>
              {" "}
              <p className={styles.label}>New Time</p>
              <input type="time" />
            </div>
            <div>
              {" "}
              <p className={styles.label}>Reason for Rescheduled</p>
              <input type="text" placeholder="Optional" />
            </div>
          </div>
        ) : (
          //  Section 3
          <div className={styles.section3}>
            <div className={styles.part1}>
              <div className={styles.part1Left}>
                <p className={styles.label2}>Medication:</p>
                <p className={styles.label2}>Dosage:</p>
                <p className={styles.label2}>Route:</p>
                <p className={styles.label2}>Scheduled:</p>
              </div>
              <div className={styles.part1Right}>
                <p className={styles.ans}>Paracetamol</p>
                <p className={styles.ans}>500mg</p>
                <p className={styles.ans}>IV</p>
                <p className={styles.ans}>12:00 PM, 12-06-2025</p>
              </div>
            </div>
            <div className={styles.part2}>
              <button className={styles.givenBtn}>Given</button>
              <button className={styles.cancelBtn}>Cancel</button>
            </div>
            <div className={styles.part3}>OR</div>
          </div>
        )}

        <div className={styles.section2}>
          <button onClick={() => setActiveTab((prev) => !prev)}>
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMedication;
