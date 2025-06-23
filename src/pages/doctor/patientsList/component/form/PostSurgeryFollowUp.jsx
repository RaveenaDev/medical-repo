import { useState } from "react";
import styles from "./PostSurgeryFollowUp.module.scss";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const PostSurgeryFollowUp = ({ onClose }) => {
  const phaseOptions = ["Ongoing", "Completed", "Pending"];

  const [openPhase, setOpenPhase] = useState(false);

  const [selectedPhase, setSelectedPhase] = useState("");
  const [fileName, setFileName] = useState("");
  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Post Surgery Follow Up</h1>
        <div className={styles.formGrid}>
          <div className={styles.column}>
            <div className={`${styles.formGroup} ${styles.row1}`}>
              <p>Surgery Name</p>
              <input type="text" />
            </div>
            <div className={styles.formGroup}>
              <p>Surgery Date</p>
              <input type="date" />
            </div>
            <div className={styles.formGroup}>
              <p>Assigned Doctor</p>
              <input type="text" value="" />
            </div>
            <div className={styles.formGroup}>
              <p>Room No.</p>
              <input type="text" />
            </div>
            <div className={styles.formGroup}>
              <p>Healing status</p>
              <div className={styles.dropdown}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenPhase((prev) => !prev)}
                >
                  <h6>{selectedPhase || "Select Phase"}</h6>
                  <span className={styles.arrow}>
                    {openPhase ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                {openPhase && (
                  <ul className={styles.menu}>
                    {phaseOptions.map((option) => (
                      <li
                        key={option}
                        className={`${styles.item} ${
                          selectedPhase === option ? styles.active : ""
                        }`}
                        onClick={() => {
                          setSelectedPhase(option);
                          setOpenPhase(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={`${styles.formGroup} ${styles.row1}`}>
              <p>Post Surgery Notes</p>
              <textarea
                placeholder="Enter notes about healing and recovery behavior"
                rows={5}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.attachmentWidth} `}>
              <p>Attached Files</p>
              <label className={styles.customFileUpload}>
                <input
                  type="file"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                />
                <span>{fileName || "No file chosen"}</span>
              </label>
            </div>
            <div className={styles.formGroup}>
              <p>Observed Symptoms</p>
              <textarea
                placeholder="shortness of breath, fatigue, swelling…"
                rows={5}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.attachmentWidth}`}>
              <p>Medication Adjustments</p>
              <input type="text" />
            </div>
          </div>
        </div>{" "}
        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PostSurgeryFollowUp;
