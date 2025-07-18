import { useState } from "react";
import styles from "./UpdateMAR.module.scss";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
const UpdateMAR = ({ onClose }) => {
  const medFreqOptions = ["Regular", "Alternative", "Custom"];
  const [openMedFreq, setOpenMedFreq] = useState(false);
  const [selectedMedFreq, setSelectedMedFreq] = useState("");

  const givenByOptions = ["Nurse 1", "Nurse 2", "Nurse 3"];
  const [openGivenBy, setOpenGivenBy] = useState(false);
  const [selectedGivenBy, setSelectedGivenBy] = useState("");
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Medicine Update</h1>
        <div className={styles.section1}>
          <div>
            <p> Medicine Name</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Dose</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Time</p>
            <input type="time" className={styles.inputDate} />
          </div>
          <div>
            {" "}
            <p>Medicine Frequency</p>
            {/* Med Freq Dropdown */}
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenMedFreq((prev) => !prev)}
              >
                <p>{selectedMedFreq || "Select"}</p>
                <span className={styles.arrow}>
                  {openMedFreq ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openMedFreq && (
                <ul className={styles.menu}>
                  {medFreqOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedMedFreq === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedMedFreq(option);
                        setOpenMedFreq(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            {" "}
            <p>Route</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Notes</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Given by</p>
            {/* Given By Dropdown */}
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenGivenBy((prev) => !prev)}
              >
                <p>{selectedGivenBy || "Select"}</p>
                <span className={styles.arrow}>
                  {openGivenBy ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openGivenBy && (
                <ul className={styles.menu}>
                  {givenByOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedGivenBy === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedGivenBy(option);
                        setOpenGivenBy(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.addMedicine}>
            <button>
              <Plus className={styles.icon} />
              <span>Add Medicine</span>
            </button>
          </div>
        </div>
        {/* Section 2 */}

        <div className={styles.btnContainer}>
          <button>Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMAR;
