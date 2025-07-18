import { X } from "lucide-react";
import styles from "./Discharge.module.scss";

const Discharge = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Discharge Summary</h1>
        </div>
        <div className={styles.sectionWrapper}>
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Patient Info</p>
            <div className={styles.qna}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Patient Name</p>
                <input type="text" className={styles.input} />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Age</p>
                <input type="text" className={styles.input} />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Sex</p>
                <input type="text" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <p className={styles.sectionHeading}>On Admission</p>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Admission Date</p>
                <input type="date" className={styles.inputDate} />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input type="text" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <p className={styles.sectionHeading}>On Discharge</p>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Discharge Date</p>
                <input type="date" className={styles.inputDate} />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input type="text" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Diagnosis</p>
            <div className={styles.qna3}>
              <div className={styles.questionWrapper}>
                <textarea className={styles.textarea} rows={3} />
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.sectionHeading}>To Attent O.P.D on Day</p>
                <input type="text" className={styles.inputDate} />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.sectionHeading}>Time:</p>
                <input type="time" className={styles.inputTime} />
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className={styles.saveContainer}>
          <button>Save And Download</button>
        </div>
      </div>
    </div>
  );
};

export default Discharge;
