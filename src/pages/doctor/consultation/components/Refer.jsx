import { useState } from "react";
import { X } from "lucide-react";
import styles from "./Refer.module.scss";
const Refer = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState("internal referral");
  return (
    <div>
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
          <div className={styles.head}>
            <p>Patient Referral Form</p>
          </div>

          <div className={styles.patientInfo}>
            <p>Patient: Jasmine Kaur</p>
            <p>ID: #P-2025-0156</p>
            <p>Primary Diagnosis: Chest Pain</p>
          </div>

          {/* Referral Urgency */}
          <div className={styles.referralUrgency}>
            <h4>Referral Urgency</h4>
            <div className={styles.referralUrgencyIn}>
              <label className={styles.radioLabel}>
                <input type="radio" name="urgency" value="routine" />
                <span className={styles.customRadio}></span>
                <span className={styles.routineText}>Routine</span>
              </label>

              <label className={styles.radioLabel}>
                <input type="radio" name="urgency" value="urgent" />
                <span className={styles.customRadio}></span>
                <span className={styles.urgentText}>Urgent</span>
              </label>

              <label className={styles.radioLabel}>
                <input type="radio" name="urgency" value="emergency" />
                <span className={styles.customRadio}></span>
                <span className={styles.emergencyText}>Emergency</span>
              </label>
            </div>
          </div>

          {/* Selection Refferal */}
          <div className={styles.selectionRef}>
            <div className={styles.selection}>
              <div
                className={
                  selectedTab === "internal referral" ? styles.activeTab : ""
                }
              >
                <p onClick={() => setSelectedTab("internal referral")}>
                  Internal Referral
                </p>
              </div>
              <div
                className={
                  selectedTab === "external referral" ? styles.activeTab : ""
                }
              >
                <p onClick={() => setSelectedTab("external referral")}>
                  External Referral
                </p>
              </div>

              {console.log(selectedTab)}
            </div>

            <div className={styles.selectionContent}>
              {selectedTab === "internal referral" && <div>Internal</div>}
              {selectedTab === "external referral" && <div>external</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refer;
