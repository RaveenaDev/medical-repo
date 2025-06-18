import styles from "./AddQuestion.module.scss";
import { X } from "lucide-react";
const AddQuestion = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <div className={styles.container}>
        <h4>Rename Section</h4>

        <input type="text" placeholder="Section Name" />
        <div className={styles.buttonContainer}>
          <button className={styles.confirmBtn}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
