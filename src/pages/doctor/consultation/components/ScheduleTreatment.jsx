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

  const [treatment, setTreatment] = useState({
    patientName: "",
    age: "",
    doctorAssigned: "",
    admitPatient: "no",
    treatmentType: "",
    date: "",
    time: "",
    doctorNotes: ""
  });

  const [openTreatment, setOpenTreatment] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const handleSubmit = () => {
    console.log("Final Treatment Data: ", treatment);
    // axios.post('/api/schedule', treatment) or fetch(...)
  };

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
              <input
                  type="text"
                  value={treatment.patientName}
                  onChange={(e) => setTreatment({...treatment, patientName: e.target.value})}
              />
              <input
                  type="number"
                  value={treatment.age}
                  onChange={(e) => setTreatment({...treatment, age: e.target.value})}
              />
            </div>
          </div>
          <div className={styles.piSection2}>
            {" "}
            <div className={styles.piLabel}>
              <p>Doctor Assigned</p>
              <p>Admit Patient</p>
            </div>
            <div className={styles.piValue}>
              <input
                  type="text"
                  className={styles.input}
                  value={treatment.doctorAssigned}
                  onChange={(e) => setTreatment({...treatment, doctorAssigned: e.target.value})}
                  />
              <div className={styles.radioGroup}>
                <label>
                  <input
                      type="radio"
                      name="admit"
                      value="yes"
                      checked={treatment.admitPatient === "yes"}
                      onChange={(e) => setTreatment({...treatment, admitPatient: e.target.value})}
                  />
                  Yes
                </label>
                <label>
                  <input
                      type="radio"
                      name="admit"
                      value="no"
                      checked={treatment.admitPatient === "no"}
                      onChange={(e) => setTreatment({...treatment, admitPatient: e.target.value})}
                  />
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
                onClick={() => {
                  setTreatment({ ...treatment, treatmentType: option });
                  setSelectedTreatment(option); // optional for display
                  setOpenTreatment(false);
                }}
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
              <input
                  className={styles.input2}
                  type="date"
                  value={treatment.date}
                  onChange={(e) => setTreatment({...treatment, date: e.target.value})}
              />
            </div>
            <div className={styles.time}>
              <p className={styles.label}>Time</p>
              <input
                  type="time"
                  className={styles.input2}
                  value={treatment.time}
                  onChange={(e) => setTreatment({...treatment, time: e.target.value})}
              />
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
              value={treatment.doctorNotes}
              onChange={(e) => setTreatment({ ...treatment, doctorNotes: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Container */}
        <div className={styles.submitContainer}>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTreatment;
