import { ChevronDown, ChevronUp, X } from "lucide-react";
import styles from "./ScheduleTreatment.module.scss";
import { useState } from "react";

const ScheduleTreatment = ({ onClose }) => {
  // Dropdown 1: Date Range
  const treatmentOptions = [
    "Consultation",
    "Diagnostic Test",
    "Surgical Procedure",
  ];
  const [openTreatment, setOpenTreatment] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <header className={styles.header}>
        <p>Schedule Treatment</p>
      </header>
      <div className={styles.container}>
        {/* Patient Information */}
        <div className={styles.patientInformation}>
          <p className={styles.piHeader}>Patient Information</p>
          <div className={styles.piSection1}>
            <div className={styles.piLabel}>
              <p>Patient Information</p>
              <p>Age</p>
            </div>
            <div className={styles.piValue}>
              <input type="text" />
              <input type="number" />
            </div>
          </div>
          <div className={styles.piSection2}>
            {" "}
            <div className={styles.piLabel}>
              <p>Doctor Assigned</p>
              <p>Admit Patient</p>
            </div>
            <div className={styles.piValue}>
              <input type="text" className={styles.input} />
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="admit" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" name="admit" value="no" defaultChecked />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Section 1 */}
        <div className={styles.section1}>
          <div className={styles.treatmentType}>
            <p className={styles.label}>Treatment Type</p>{" "}
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenTreatment((prev) => !prev)}
              >
                <p
                  className={
                    selectedTreatment === "" ? styles.placeholder : null
                  }
                >
                  {selectedTreatment || "Select Treatment Type"}
                </p>
                <span className={styles.arrow}>
                  {openTreatment ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openTreatment && (
                <ul className={styles.menu}>
                  {treatmentOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedTreatment === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedTreatment(option);
                        setOpenTreatment(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.dateAndTime}>
            <div className={styles.date}>
              <p className={styles.label}>Date</p>
              <input className={styles.input2} type="date" />
            </div>
            <div className={styles.time}>
              <p className={styles.label}>Time</p>
              <input type="time" className={styles.input2} />
            </div>
          </div>

          <div className={styles.doctorNotes}>
            <label htmlFor="notes" className={styles.label}>
              Doctor Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Additional Instruction or Notes"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Submit Container */}
        <div className={styles.submitContainer}>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTreatment;
