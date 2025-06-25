import styles from "./UpdatePRD.module.scss";
import { X } from "lucide-react";
const UpdatePRD = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Past Records And Discharge Summaries</h1>

        <div className={styles.section1}>
          <div>
            <p></p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p></p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p></p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p></p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p></p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p></p>
            <input type="text" />
          </div>
        </div>
        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePRD;
