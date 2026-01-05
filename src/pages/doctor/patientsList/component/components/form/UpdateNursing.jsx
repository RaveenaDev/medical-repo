import { Plus, X } from "lucide-react";
import styles from "./UpdateNursing.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { recordPatientVitals } from "../../../../../../components/State/Doctor/Action";

const CORE_VITALS = {
  heartRate: "Heart Rate",
  temperature: "Temperature",
  bloodPressure: "Blood Pressure",
  spo2: "SpO2",
  intake: "Intake (ml)",
  output: "Output (ml)",
};

const UpdateNursing = ({ onClose, patientId, vitalDefinitions }) => {
  // console.log("vitalDefinitions:", vitalDefinitions);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    heartRate: "",
    temperature: "",
    bloodPressure: "",
    spo2: "",
    intake: "",
    output: "",
    time: "",
    date: "",
    recordedBy: "",
  });

  const [customVitals, setCustomVitals] = useState(() => {
    if (!Array.isArray(vitalDefinitions)) return [];

    return vitalDefinitions
      .filter((v) => !CORE_VITALS[v]) // exclude core vitals
      .map((v) => ({
        key: v,
        label: v
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase()), // auto prettify
        value: "",
      }));
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const handleCustomVitalChange = (index, key, value) => {
    const updatedVitals = [...customVitals];
    updatedVitals[index][key] = value;
    setCustomVitals(updatedVitals);
  };

  const addCustomVital = () => {
    setCustomVitals([...customVitals, { key: null, label: "", value: "" }]);
  };

  const handleSubmit = () => {
    const vitalsPayload = {
      heartRate: form.heartRate,
      temperature: form.temperature,
      bloodPressure: form.bloodPressure,
      spo2: form.spo2,
      intake: form.intake,
      output: form.output,
    };

    // Append custom vitals
    customVitals.forEach((vital) => {
      if (vital.label && vital.value) {
        vitalsPayload[vital.key || vital.label] = vital.value;
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

  const staff = useSelector((store) => store.doctor.allStaff);

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
            <p>Intake (ml)</p>
            <input
              type="number"
              value={form.intake}
              onChange={handleChange("intake")}
              placeholder="ml"
            />
          </div>

          <div>
            <p>Output (ml)</p>
            <input
              type="number"
              value={form.output}
              onChange={handleChange("output")}
              placeholder="ml"
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
            <select
              value={form.recordedBy}
              onChange={handleChange("recordedBy")}
              className={styles.select}
            >
              <option value="">Select staff</option>
              {staff.map((s) => {
                const name = s.name || s.fullName;
                return (
                  <option key={s._id} value={name}>
                    {name} {s.role ? `(${s.role})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
          {customVitals.map((vital, index) => (
            <div key={vital.key || index} className={styles.customVitalRow}>
              <input
                type="text"
                placeholder="Label"
                value={vital.label}
                disabled={!!vital.key} //  only backend vitals locked
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
              {!vital.key && (
                <button
                  type="button"
                  onClick={() =>
                    setCustomVitals(customVitals.filter((_, i) => i !== index))
                  }
                  className={styles.removeBtn}
                >
                  <X size={14} />
                </button>
              )}
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
