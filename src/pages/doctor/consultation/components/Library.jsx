// Library.js
import styles from "./Library.module.scss";
import { X } from "lucide-react";
export default function Library({ onClose }) {
  return (
    <div className={styles.container}>
      <div style={styles.head}>
        <div className={styles.crossContainer}>
          <X
            size={20}
            onClick={() => {
              onClose();
            }}
          />
        </div>
        {/* row 1 */}
        <div className={styles.row1}>
          <button>Prebuilt Forms</button>
          <button>My Saved Forms</button>
        </div>
      </div>

      {/* Forms Container */}
      <div className={styles.formsContainer}>
        {/* row 2 */}
        <div className={styles.row2}>
          <h4>General Physician Consultation</h4>
          <p>Sections: Patient info, Symptoms, Medical History</p>
          <div className={styles.btnContainer}>
            <button className={styles.previewBtn}>
              <img src="/assets/filterIcon.svg" alt="" width={20} />
              Preview
            </button>
            <button className={styles.applyBtn}>
              <img src="/assets/clipboardIcon.svg" alt="" width={20} />
              Apply
            </button>
          </div>
        </div>

        {/* row 3 */}
        <div className={styles.row2}>
          <h4>General Physician Consultation</h4>
          <p>Sections: Patient info, Symptoms, Medical History</p>
          <div className={styles.btnContainer}>
            <button className={styles.previewBtn}>
              <img src="/assets/filterIcon.svg" alt="" width={20} />
              Preview
            </button>
            <button className={styles.applyBtn}>
              <img src="/assets/clipboardIcon.svg" alt="" width={20} />
              Apply
            </button>
          </div>
        </div>

        {/* row 4 */}
        <div className={styles.row2}>
          <h4>General Physician Consultation</h4>
          <p>Sections: Patient info, Symptoms, Medical History</p>
          <div className={styles.btnContainer}>
            <button className={styles.previewBtn}>
              <img src="/assets/filterIcon.svg" alt="" width={20} />
              Preview
            </button>
            <button className={styles.applyBtn}>
              <img src="/assets/clipboardIcon.svg" alt="" width={20} />
              Apply
            </button>
          </div>
        </div>

        {/* row 5 */}
        <div className={styles.row2}>
          <h4>General Physician Consultation</h4>
          <p>Sections: Patient info, Symptoms, Medical History</p>
          <div className={styles.btnContainer}>
            <button className={styles.previewBtn}>
              <img src="/assets/filterIcon.svg" alt="" width={20} />
              Preview
            </button>
            <button className={styles.applyBtn}>
              <img src="/assets/clipboardIcon.svg" alt="" width={20} />
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
