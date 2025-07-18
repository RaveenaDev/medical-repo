import { Plus, X } from "lucide-react";
import styles from "./UpdateNursing.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { recordPatientVitals } from "../../../../../../components/State/Doctor/Action";
const UpdateNursing = ({ onClose, patientId }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    heartRate: "",
    temperature: "",
    bloodPressure: "",
    spo2: "",
    time: "",
    date: "",
    recordedBy: "",
  });
  const [customVitals, setCustomVitals] = useState([]);
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const handleCustomVitalChange = (index, key, value) => {
    const updatedVitals = [...customVitals];
    updatedVitals[index][key] = value;
    setCustomVitals(updatedVitals);
  };

  const addCustomVital = () => {
    setCustomVitals([...customVitals, { label: "", value: "" }]);
  };

  const handleSubmit = () => {
    const vitalsPayload = {
      heartRate: form.heartRate,
      temperature: form.temperature,
      bloodPressure: form.bloodPressure,
      spo2: form.spo2,
    };
    // Append custom vitals
    customVitals.forEach((vital) => {
      if (vital.label && vital.value) {
        vitalsPayload[vital.label] = vital.value;
      }
    });
    const fullPayload = {
      patient: patientId,
      recordedBy: form.recordedBy,

      vitals: vitalsPayload,
      recordedAt: new Date(`${form.date}T${form.time}:00`),
    };

    dispatch(recordPatientVitals(fullPayload));
    onClose(); // close modal after submit
  };
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Record New Vital</h1>

        {/* Section 1 */}
        <div className={styles.section1}>
          <div>
            <p>Heart Rate</p>
            <input
              type="text"
              value={form.heartRate}
              onChange={handleChange("heartRate")}
            />
          </div>
          <div>
            {" "}
            <p>Temperature</p>
            <input
              type="text"
              value={form.temperature}
              onChange={handleChange("temperature")}
            />
          </div>
          <div>
            {" "}
            <p>Blood Pressure</p>
            <input
              type="text"
              value={form.bloodPressure}
              onChange={handleChange("bloodPressure")}
            />
          </div>
          <div>
            {" "}
            <p>SpO2</p>
            <input
              type="text"
              value={form.spo2}
              onChange={handleChange("spo2")}
            />
          </div>
          <div>
            {" "}
            <p>Time</p>
            <input
              type="time"
              value={form.time}
              onChange={handleChange("time")}
              className={styles.inputTime}
            />
          </div>
          <div>
            {" "}
            <p>Recorded Date</p>
            <input
              type="date"
              value={form.date}
              onChange={handleChange("date")}
              className={styles.inputDate}
            />
          </div>
        </div>
        <div className={styles.section2}>
          <div>
            <p>Recorded By</p>
            <input
              type="text"
              value={form.recordedBy}
              onChange={handleChange("recordedBy")}
            />
          </div>
          {customVitals.map((vital, index) => (
            <div key={index} className={styles.customVitalRow}>
              <input
                type="text"
                placeholder="Label (e.g. Respiratory Rate)"
                value={vital.label}
                onChange={(e) =>
                  handleCustomVitalChange(index, "label", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Value"
                value={vital.value}
                onChange={(e) =>
                  handleCustomVitalChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <div className={styles.addVitalWrapper}>
            <button type="button" onClick={addCustomVital}>
              <Plus className={styles.icon} />
              <span>Add Vital</span>
            </button>
          </div>
        </div>

        <div className={styles.submitContainer}>
          <button onClick={handleSubmit}>Save Vital Record</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNursing;
