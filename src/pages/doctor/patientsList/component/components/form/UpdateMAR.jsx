import { useState } from "react";
import styles from "./UpdateMAR.module.scss";
import { ChevronDown, ChevronUp, Plus, X, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMedicalAdministration } from "../../../../../../components/State/Doctor/Action";

const UpdateMAR = ({ onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  const [medications, setMedications] = useState([
    {
      medication: "",
      dose: "",
      time: "",
      date: "",
      medFreq: "",
      route: "",
      notes: "",
    },
  ]);

  const medFreqOptions = [
    { value: "OD", label: "Once daily (OD)" },
    { value: "BD", label: "Twice daily (BD)" },
    { value: "TDS", label: "Three times daily (TDS)" },
    { value: "QID", label: "Four times daily (QID)" },
    { value: "HS", label: "At bedtime (HS)" },
    { value: "SOS", label: "As needed (SOS)" },
    { value: "STAT", label: "Immediately (STAT)" },
    { value: "WEEKLY", label: "Once weekly" },
  ];

  const [openMedFreq, setOpenMedFreq] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicine = () => {
    const lastMed = medications[medications.length - 1];
    setMedications([
      ...medications,
      {
        medication: "",
        dose: "",
        time: lastMed.time, // inherit last time
        date: lastMed.date, // inherit last date
        medFreq: "",
        route: "",
        notes: "",
      },
    ]);
  };

  const deleteMedicine = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
  };
  const handleSubmit = async () => {
    try {
      const payload = {
        patient: patientId,
        caseId: caseId,
        medications: medications.map((med) => ({
          medication: med.medication,
          dose: med.dose,
          time: med.time,
          date: med.date,
          medFreq: med.medFreq,
          route: med.route,
          notes: med.notes,

          status: "Scheduled",
        })),
      };

      dispatch(addMedicalAdministration(payload));
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>

      <div className={styles.container}>
        <h1>Medicine Update</h1>

        {medications.map((med, index) => (
          <div className={styles.section1} key={index}>
            <div>
              <p>Medicine Name</p>
              <input
                type="text"
                className={styles.inputText}
                value={med.medication}
                onChange={(e) =>
                  handleChange(index, "medication", e.target.value)
                }
              />
            </div>

            <div>
              <p>Dose</p>
              <div className={styles.doseInput}>
                <input
                  type="text"
                  className={styles.inputTextDose}
                  value={med.dose}
                  onChange={(e) => handleChange(index, "dose", e.target.value)}
                />
              </div>
            </div>

            <div>
              <p>Time</p>
              <input
                type="time"
                className={styles.inputDate}
                value={med.time}
                onChange={(e) => handleChange(index, "time", e.target.value)}
              />
            </div>

            <div>
              <p>Date</p>
              <input
                type="date"
                className={styles.inputDate}
                value={med.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
              />
            </div>

            <div>
              <p>Medicine Frequency</p>
              <div className={styles.dropdown}>
                <button
                  className={styles.trigger}
                  onClick={() =>
                    setOpenMedFreq((prev) => (prev === index ? null : index))
                  }
                >
                  <p>
                    {med.medFreq
                      ? medFreqOptions.find((o) => o.value === med.medFreq)
                          ?.label
                      : "Select"}
                  </p>

                  <span className={styles.arrow}>
                    {openMedFreq === index ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                {openMedFreq === index && (
                  <ul className={styles.menu}>
                    {medFreqOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`${styles.item} ${
                          med.medFreq === option.value ? styles.active : ""
                        }`}
                        onClick={() => {
                          handleChange(index, "medFreq", option.value);
                          setOpenMedFreq(null);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <p>Route</p>
              <input
                type="text"
                className={styles.inputText}
                value={med.route}
                onChange={(e) => handleChange(index, "route", e.target.value)}
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <p>Special Instructions</p>
              <input
                type="text"
                className={styles.inputText}
                value={med.notes}
                onChange={(e) => handleChange(index, "notes", e.target.value)}
              />
            </div>

            {medications.length > 1 && (
              <div
                style={{
                  gridColumn: "1 / -1", // span full width (2 columns)
                  display: "flex",
                  alignItems: "center", // vertical center
                  justifyContent: "center", // horizontal center
                  paddingTop: "1vh", // optional: spacing from above
                }}
              >
                <Trash2
                  onClick={() => deleteMedicine(index)}
                  style={{
                    cursor: "pointer",
                    color: "#ed4301",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        <div className={styles.addMedicine}>
          <button onClick={addMedicine}>
            <Plus className={styles.icon} />
            <span>Add Medicine</span>
          </button>
        </div>

        <div className={styles.btnContainer}>
          <button onClick={handleSubmit}>Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMAR;
