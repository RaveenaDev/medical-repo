import styles from "./TreatmentAndTest.module.scss";
import { Plus, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import TreatmentAndTestPrint from "./print/TreatmentAndTestPrint";
import { Autocomplete, TextField } from "@mui/material";

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

const TreatmentAndTest = ({
  patient,
  onConfirm,
  existingData,
  selectedComponent,
}) => {
  const [treatment, setTreatment] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const [treatments, setTreatments] = useState([]);

  const [test, setTest] = useState({
    name: "",
    type: "",
    priority: "",
  });
  const [tests, setTests] = useState([]);

  const [errors, setErrors] = useState({});

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Treatment & Tests",
  });
  const frequencyOptions = [
    "1-0-0 (Morning only)",
    "0-1-0 (Afternoon only)",
    "0-0-1 (Evening only)",
    "1-1-0 (Morning & Afternoon)",
    "1-0-1 (Morning & Evening)",
    "0-1-1 (Afternoon & Evening)",
    "1-1-1 (Morning, Afternoon & Evening)",
    "SOS (As needed)",
  ];
  //  Prefill from existing data
  useEffect(() => {
    //console.log("Ex: ",existingData)
    //console.log("Sel: ",selectedComponent)
    if (existingData && selectedComponent && existingData[selectedComponent]) {
      const sectionData = existingData[selectedComponent];
      if (sectionData.treatments) setTreatments(sectionData.treatments);
      if (sectionData.tests) setTests(sectionData.tests);
    }
  }, [existingData, selectedComponent]);
  const handleAddTreatment = () => {
    let newErrors = {};
    if (!treatment.name) newErrors.name = true;
    if (!treatment.dosage) newErrors.dosage = true;
    if (!treatment.frequency) newErrors.frequency = true;
    if (!treatment.duration) newErrors.duration = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop if errors
    }
    setTreatments((prev) => [...prev, treatment]);
    setTreatment({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    });
    setErrors({}); // clear errors
  };

  const handleAddTest = () => {
    if (test.name) {
      setTests((prev) => [...prev, test]);
      setTest({ name: "", type: "", priority: "" });
    }
  };

  const handleRemoveTreatment = (index) => {
    setTreatments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveTest = (index) => {
    setTests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const finalData = {
      treatments,
      tests,
    };
    // console.log("Treatment & Test Submitted:", finalData);
    onConfirm(finalData); // ⬅️ Send to parent
  };
  const handleFrequencyChange = (e) => {
    let value = e.target.value.toUpperCase(); // so "sos" → "SOS"

    // Auto-format only if it's numeric without dashes
    if (/^\d+$/.test(value)) {
      value = value.split("").join("-"); // "202" → "2-0-2"
    }

    setTreatment({ ...treatment, frequency: value });
  };
  return (
    <div>
      <div className={styles.container1}>
        {/* row 1 */}
        <div className={styles.row1}>
          <p>Treatment And Tests</p>
          <button onClick={handlePrint} className={styles.printBtn}>
            <Printer size={18} /> Print
          </button>
        </div>

        {/* row 2 */}
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
            placeholder="Dosage "
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

        {/* row 3 - Add Treatment */}
        <div className={styles.row3}>
          <button type="button" onClick={handleAddTreatment}>
            <Plus size={18} />
            Add Treatment
          </button>
        </div>

        {/* row4 - Show treatments */}
        {treatments.length > 0 && (
          <div className={styles.row4}>
            <div className={styles.r4Left}>
              <p>Prescribed :</p>
            </div>
            <div className={styles.r4Right}>
              {treatments.map((t, index) => (
                <div key={index} className={styles.r4RightContent}>
                  <p>
                    <span>&#8226;&nbsp;</span>
                    {t.name} {t.dosage} – ({t.frequency}) x {t.duration}
                    {t.notes && ` (${t.notes})`}
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

        {/* row5 */}
        <div className={styles.row5}>
          <p>Order Tests</p>
        </div>

        {/* row6 - Test input */}
        <div className={styles.row6}>
          {/* Test Name with autocomplete */}
          <input
            type="text"
            className={styles.in1}
            placeholder="Test name"
            list="commonTests"
            value={test.name}
            onChange={(e) => setTest({ ...test, name: e.target.value })}
          />
          <datalist id="commonTests">
            {commonTests.map((t, i) => (
              <option key={i} value={t} />
            ))}
          </datalist>
          {/* Type */}
          <select
            className={styles.input1}
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
          {/* Priority */}
          <select
            className={styles.input1}
            value={test.priority}
            onChange={(e) => setTest({ ...test, priority: e.target.value })}
          >
            <option value="">Select Priority</option>
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
            <option value="Stat">Stat (Immediate)</option>
          </select>

          {/* Notes */}
          <input
            type="text"
            className={styles.input1}
            placeholder="Notes (optional)"
            value={test.notes}
            onChange={(e) => setTest({ ...test, notes: e.target.value })}
          />
        </div>

        {/* row 7 - Add Test */}
        <div className={styles.row7}>
          <button type="button" onClick={handleAddTest}>
            <Plus size={18} />
            Add Test
          </button>
        </div>

        {/* row 8 - Show tests */}
        {tests.length > 0 && (
          <div className={styles.row4}>
            <div className={styles.r4Left}>
              <p>To be ordered :</p>
            </div>
            <div className={styles.r4Right}>
              {tests.map((t, index) => (
                <div key={index} className={styles.r4RightContent}>
                  <p>
                    <span>&#8226;&nbsp;</span>
                    {t.name} {t.type} {t.priority && `(${t.priority})`}
                    {t.notes && ` (${t.notes})`}
                  </p>

                  <button type="button" onClick={() => handleRemoveTest(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* row 9 - Submit */}
        <div className={styles.row9}>
          <button type="button" onClick={handleSubmit}>
            <p>Confirm</p>
          </button>
        </div>
      </div>
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
