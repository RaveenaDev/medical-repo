import styles from "./ManageMedication.module.scss";
import { X } from "lucide-react";
const ManageMedication = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Update Medication Administration Record</h1>
      </div>
    </div>
  );
};

export default ManageMedication;
