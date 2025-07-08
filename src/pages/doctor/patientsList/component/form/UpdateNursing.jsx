import { Plus, X } from "lucide-react";
import styles from "./UpdateNursing.module.scss";
const UpdateNursing = ({ onClose }) => {
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
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>Temperature</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>Blood Pressure</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>SpO2</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>Time</p>
            <input type="time" className={styles.inputTime} />
          </div>
          <div>
            {" "}
            <p>Recorded Date</p>
            <input type="date" className={styles.inputDate} />
          </div>
        </div>
        <div className={styles.section2}>
          <div>
            <p>Recorded By</p>
            <input type="text" />
          </div>
          <div className={styles.addVitalWrapper}>
            <button>
              <Plus className={styles.icon} />
              <span>Add Vital</span>
            </button>
          </div>
        </div>

        <div className={styles.submitContainer}>
          <button>Save Vital Record</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNursing;
