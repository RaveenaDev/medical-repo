import styles from "./MedicalHistory.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";
export const MedicalHistory = () => {
  return (
    <div className={styles.medicalHistory}>
      <div className={styles.container1}>
        <div className={styles.row1}>
          <div>
            <p>Medical History</p>
          </div>
          <div className={styles.attachments}>
            <Image size={19} />
            <Type size={19} />
            <Plus size={19} />
            <SquarePlay size={21} />
          </div>
        </div>
      </div>
    </div>
  );
};
