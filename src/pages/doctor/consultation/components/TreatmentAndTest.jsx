import styles from "./TreatmentAndTest.module.scss";
import { Plus, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import TreatmentAndTestPrint from "./print/TreatmentAndTestPrint";

const commonTests = [
  "CBC (Complete Blood Count)",
  "LFT (Liver Function Test)",
  "KFT (Kidney Function Test)",
  "Blood Sugar (Fasting)",
  "Blood Sugar (PP)",
  "HbA1c",
  "Lipid Profile",
  "Thyroid Profile (T3, T4, TSH)",
  "Urine Routine",
  "Urine Culture",
  "Chest X-Ray PA View",
  "ECG",
  "Echocardiography",
  "Ultrasound Abdomen",
  "CT Scan Brain",
  "MRI Spine",
];

const initialTreatment = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  notes: "",
};

const initialTest = {
  name: "",
  type: "",
  notes: "",
};

const TreatmentAndTest = ({
  patient,
  onConfirm,
  existingData,
  selectedComponent,
}) => {
  const [treatment, setTreatment] = useState(initialTreatment);
  const [treatments, setTreatments] = useState([]);
  const [test, setTest] = useState(initialTest);
  const [tests, setTests] = useState([]);
  const [errors, setErrors] = useState({});

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Treatment & Tests",
  });

  // Prefill from existing data
  useEffect(() => {
    if (existingData?.[selectedComponent]) {
      const sectionData = existingData[selectedComponent];
      if (sectionData.treatments) setTreatments(sectionData.treatments);
      if (sectionData.tests) setTests(sectionData.tests);
    }
  }, [existingData, selectedComponent]);

  const handleAddTreatment = () => {
    const newErrors = {};
    if (!treatment.name) newErrors.name = true;
    if (!treatment.dosage) newErrors.dosage = true;
    if (!treatment.frequency) newErrors.frequency = true;
    if (!treatment.duration) newErrors.duration = true;

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setTreatments((prev) => [...prev, treatment]);
    setTreatment(initialTreatment);
    setErrors({});
  };

  const handleAddTest = () => {
    if (test.name) {
      setTests((prev) => [...prev, test]);
      setTest(initialTest);
    }
  };

  const handleRemoveTreatment = (index) => {
    setTreatments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveTest = (index) => {
    setTests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onConfirm({ treatments, tests });
  };

  const handleFrequencyChange = (e) => {
    let value = e.target.value.toUpperCase();
    if (/^\d{3}$/.test(value)) value = value.split("").join("-");
    setTreatment((prev) => ({ ...prev, frequency: value }));
  };

  return (
    <div>
      <div className={styles.container1}>
        {/* Header */}
        <div className={styles.row1}>
          <p>Treatment And Tests</p>
          <button onClick={handlePrint} className={styles.printBtn}>
            <Printer size={18} /> Print
          </button>
        </div>

        {/* Treatment input */}
        <div className={styles.row2}>
          <input
            type="text"
            className={`${styles.input1} ${errors.name ? styles.error : ""}`}
            placeholder="Medicine name"
            value={treatment.name}
            onChange={(e) =>
              setTreatment({ ...treatment, name: e.target.value })
            }
          />
          <input
            type="text"
            className={`${styles.input1} ${errors.dosage ? styles.error : ""}`}
            placeholder="Dosage"
            value={treatment.dosage}
            onChange={(e) =>
              setTreatment({ ...treatment, dosage: e.target.value })
            }
          />
          <input
            type="text"
            list="frequencyOptions"
            placeholder="Times per Day"
            className={`${styles.input1} ${
              errors.frequency ? styles.error : ""
            }`}
            value={treatment.frequency}
            onChange={handleFrequencyChange}
          />
          <datalist id="frequencyOptions">
            <option value="1-0-0">Morning only</option>
            <option value="0-1-0">Afternoon only</option>
            <option value="0-0-1">Evening only</option>
            <option value="1-1-0">Morning & Afternoon</option>
            <option value="1-0-1">Morning & Evening</option>
            <option value="0-1-1">Afternoon & Evening</option>
            <option value="1-1-1">Morning, Afternoon & Evening</option>
            <option value="SOS">As needed</option>
          </datalist>

          <input
            type="text"
            className={`${styles.input1} ${
              errors.duration ? styles.error : ""
            }`}
            placeholder="Days / Duration"
            value={treatment.duration}
            onChange={(e) =>
              setTreatment({ ...treatment, duration: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.input1}
            placeholder="Notes (optional)"
            value={treatment.notes}
            onChange={(e) =>
              setTreatment({ ...treatment, notes: e.target.value })
            }
          />
        </div>

        <div className={styles.row3}>
          <button type="button" onClick={handleAddTreatment}>
            <Plus size={18} /> Add Treatment
          </button>
        </div>

        {/* Treatments list */}
        {treatments.length > 0 && (
          <div className={styles.row4}>
            <div className={styles.r4Left}>
              <p>Prescribed :</p>
            </div>
            <div className={styles.r4Right}>
              {treatments.map((item, index) => (
                <div key={index} className={styles.r4RightContent}>
                  <p>
                    <span>&#8226;&nbsp;</span>
                    {item.name} {item.dosage} – ({item.frequency}) x{" "}
                    {item.duration}
                    {item.notes && ` (${item.notes})`}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveTreatment(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test input */}
        <div className={styles.row5}>
          <p>Order Tests</p>
        </div>
        <div className={styles.row6}>
          <input
            type="text"
            className={styles.in1}
            placeholder="Test name"
            list="commonTests"
            value={test.name}
            onChange={(e) => setTest({ ...test, name: e.target.value })}
          />
          <datalist id="commonTests">
            {commonTests.map((testName, i) => (
              <option key={i} value={testName} />
            ))}
          </datalist>
          <select
            className={styles.input2}
            value={test.type}
            onChange={(e) => setTest({ ...test, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Blood">Blood</option>
            <option value="Urine">Urine</option>
            <option value="Imaging">Imaging</option>
            <option value="ECG">ECG</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            className={styles.input1}
            placeholder="Notes (optional)"
            value={test.notes}
            onChange={(e) => setTest({ ...test, notes: e.target.value })}
          />
        </div>

        <div className={styles.row7}>
          <button type="button" onClick={handleAddTest}>
            <Plus size={18} /> Add Test
          </button>
        </div>

        {/* Tests list */}
        {tests.length > 0 && (
          <div className={styles.row4}>
            <div className={styles.r4Left}>
              <p>To be ordered :</p>
            </div>
            <div className={styles.r4Right}>
              {tests.map((item, index) => (
                <div key={index} className={styles.r4RightContent}>
                  <p>
                    <span>&#8226;&nbsp;</span>
                    {item.name} {item.type}
                    {item.notes && ` (${item.notes})`}
                  </p>
                  <button type="button" onClick={() => handleRemoveTest(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className={styles.row9}>
          <button type="button" onClick={handleSubmit}>
            <p>Confirm</p>
          </button>
        </div>
      </div>

      {/* Print version */}
      <TreatmentAndTestPrint
        ref={printRef}
        treatments={treatments}
        tests={tests}
        patient={patient}
      />
    </div>
  );
};

export default TreatmentAndTest;
