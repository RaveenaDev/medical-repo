import styles from "./UpdateMAR.module.scss";
import { X } from "lucide-react";
const UpdateMAR = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Medicine Update</h1>
        <div className={styles.section1}>
          <div>
            <p>Time of Administration</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Date of Administration</p>
            <input type="date" className={styles.inputDate} />
          </div>
          <div>
            {" "}
            <p>Medication Name</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Dose</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Route of Administration</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Assigned By</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Room No.</p>
            <input type="text" className={styles.inputText} />
          </div>
          <div>
            {" "}
            <p>Bed No.</p>
            <input type="text" className={styles.inputText} />
          </div>
        </div>
        {/* Section 2 */}
        <div className={styles.section2}>
          <div>
            <p>Status</p>
          </div>
          <div className={styles.statusGroup}>
            <label>
              <input type="radio" id="given" name="status" defaultChecked />
              <span>Given</span>
            </label>

            <label>
              <input type="radio" id="scheduled" name="status" />
              <span>Scheduled</span>
            </label>

            <label>
              <input type="radio" id="delayed" name="status" />
              <span>Delayed</span>
            </label>

            <label>
              <input type="radio" id="cancelled" name="status" />
              <span>Cancelled</span>
            </label>
          </div>
        </div>

        <div className={styles.description}>
          <p>Description</p>
          <textarea
            name="description"
            placeholder={`shortness of breath, fatigue,swelling...`}
            rows={4}
          />
        </div>

        <div className={styles.btnContainer}>
          <button>Save Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMAR;
