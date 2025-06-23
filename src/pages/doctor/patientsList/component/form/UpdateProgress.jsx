import React, { useState } from "react";
import styles from "./UpdateProgress.module.scss";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { FaRegCalendarAlt } from "react-icons/fa";

const UpdateProgress = ({ onClose }) => {
  const phaseOptions = [
    "Post-Surgery Follow-up",
    "Surgery",
    "Lab Tests",
    "Initial Consultation",
  ];

  const progressOptions = ["Ongoing", "Completed", "Pending"];
  const [openPhase, setOpenPhase] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [doctor, setDoctor] = useState("Dr. Arunita");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Update Progress tracker</h1>

        <div className={styles.row1}>
          {/* Select Phase */}
          <div>
            <p className={styles.label}>Select Phase</p>
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenPhase((prev) => !prev)}
              >
                <p>{selectedPhase || "Select Phase"}</p>
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

          {/* Date of Activity */}
          <div className={styles.dateField}>
            <p className={styles.label}>Date of Activity</p>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row1}>
          {/* Assigned Doctor */}
          <div>
            <p className={styles.label}>Assigned Doctor</p>
            <input
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={styles.textInput}
              style={{ border: "1px solid #cfcfcf" }}
            />
          </div>

          {/* Progress Status */}
          <div>
            <p className={styles.label}>Progress Status</p>
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenProgress((prev) => !prev)}
              >
                <p>{selectedProgress || "Select Status"}</p>
                <span className={styles.arrow}>
                  {openProgress ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openProgress && (
                <ul className={styles.menu}>
                  {progressOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedProgress === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedProgress(option);
                        setOpenProgress(false);
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

        {/* Description */}
        <div style={{ marginTop: "2vh" }}>
          <p className={styles.label}>Description</p>
          <textarea
            placeholder="shortness of breath, fatigue, swelling..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </div>

        {/* Save Button */}
        <div style={{ marginTop: "2vh", textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#25307f",
              color: "white",
              padding: "1.2vh 2vw",
              border: "none",
              borderRadius: "4px",
              fontSize: "1.9vh",
              fontFamily: "Karla, sans-serif",
              cursor: "pointer",
            }}
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgress;
