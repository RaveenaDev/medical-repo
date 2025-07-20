import styles from "./TreatmentAndTest.module.scss";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
const TreatmentAndTest = ({ onConfirm, existingData, selectedComponent }) => {
  const [treatment, setTreatment] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });
  const [treatments, setTreatments] = useState([]);

  const [test, setTest] = useState({
    name: "",
    type: "",
    priority: "",
  });
  const [tests, setTests] = useState([]);

  // ✅ Prefill from existing data
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
    if (
      treatment.name &&
      treatment.dosage &&
      treatment.frequency &&
      treatment.duration
    ) {
      setTreatments((prev) => [...prev, treatment]);
      setTreatment({ name: "", dosage: "", frequency: "", duration: "" });
    }
  };

  const handleAddTest = () => {
    if (test.name && test.type && test.priority) {
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

  return (
    <div>
      <div className={styles.container1}>
        {/* row 1 */}
        <div className={styles.row1}>
          <p>Treatment And Tests</p>
        </div>

        {/* row 2 */}
        <div className={styles.row2}>
          <input
            type="text"
            className={styles.input1}
            placeholder="Medicine name"
            value={treatment.name}
            onChange={(e) =>
              setTreatment({ ...treatment, name: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.input1}
            placeholder="Dosage"
            value={treatment.dosage}
            onChange={(e) =>
              setTreatment({ ...treatment, dosage: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.input1}
            placeholder="Frequency"
            value={treatment.frequency}
            onChange={(e) =>
              setTreatment({ ...treatment, frequency: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.input1}
            placeholder="Duration"
            value={treatment.duration}
            onChange={(e) =>
              setTreatment({ ...treatment, duration: e.target.value })
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
                    {t.name} {t.dosage} - {t.frequency} x {t.duration}
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
          <input
            type="text"
            className={styles.in1}
            placeholder="Search Test"
            value={test.name}
            onChange={(e) => setTest({ ...test, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Blood"
            value={test.type}
            onChange={(e) => setTest({ ...test, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Routine"
            value={test.priority}
            onChange={(e) => setTest({ ...test, priority: e.target.value })}
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
                    {t.name} - {t.priority} ({t.type})
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
    </div>
  );
};

export default TreatmentAndTest;
