import styles from "./InitialConsultation.module.scss";
import { X, Plus } from "lucide-react";
const InitialConsultation = ({ onClose }) => {
  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Consultation Room: Jasmeet Kaur</h1>
        <div className={styles.header2}>
          <div>
            <h2>Patient ID</h2>
            <h3>XXXXXXX</h3>
          </div>
          <div>
            {" "}
            <h2>Age/Gender</h2>
            <h3>27/Female</h3>
          </div>
          <div>
            {" "}
            <h2>Room No:</h2>
            <h3>CR-204</h3>
          </div>
          <div>
            {" "}
            <h2>Doctor</h2>
            <h3>Dr. Arjun Mehta</h3>
          </div>
        </div>
        <div className={styles.row1}>
          <h2>Case Summmary</h2>
          <p>
            Chest pain and shortness of breath. Diabetic. History of
            hypertension. No known allergies.
          </p>
        </div>
        <div className={styles.section1}>
          <div>
            <h2>Diagnosis Vital</h2>
            <div className={styles.section1LeftNote}>
              <p>
                Patient presents with classic symptoms of angina. ECG changes
                suggestive of ischemia. Recommend immediate cardiac enzyme panel
                and ECG monitoring. Consider starting aspirin and beta-blockers
                pending further evaluation.
              </p>
            </div>
          </div>
          <div>
            <h2>Vitals</h2>
            <div className={styles.section1RightNote}>
              <p>
                <span>HR:</span>88 bpm
              </p>
              <p>
                <span>BP:</span>120/80 mmHg
              </p>
              <p>
                <span>Temp:</span>98.6 °F
              </p>
              <p>
                <span>O2:</span> 96%
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section1}>
          <div>
            <h2>Diagnosis Vital</h2>
            <div className={styles.section1LeftNote}>
              <p>
                Patient presents with classic symptoms of angina. ECG changes
                suggestive of ischemia. Recommend immediate cardiac enzyme panel
                and ECG monitoring. Consider starting aspirin and beta-blockers
                pending further evaluation.
              </p>
            </div>
          </div>
          {/* <div>
            <div className={styles.presBtn}>
              <button>
                <Plus size={20} strokeWidth={1.5} />
                Add Prescription
              </button>
            </div>
          </div> */}
        </div>

        <div className={styles.nextStep}>
          <h2>Next Step</h2>
          <p>
            Send patient for ECG and blood test. Schedule follow-up in 3 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InitialConsultation;
