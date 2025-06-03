import styles from "./DiagnosisAndVital.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";

const DiagnosisAndVital = () => {
  return (
    <form>
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Current Medication</p>
          </div>
          <div className={styles.attachments}>
            <Image size={19} />
            <Type size={19} />
            <Plus size={19} />
            <SquarePlay size={21} />
          </div>
        </div>

        {/* row2 */}
        <div className={styles.row2}>
          <p className={styles.question}>
            Are you currently taking any heart-related medications?
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row3 */}
        <div className={styles.row3}>
          <div className={styles.row3LeftContainer}>
            <p className={styles.question}>Enter your Blood Pressure reading</p>
          </div>
          <div className={styles.row3RightContainer}>
            <div className={styles.row3Right}>
              <p className={styles.row3p}>Diastolic</p>
              <input />
              <p>mmHg</p>
            </div>
            <div className={styles.row3Right}>
              <p className={styles.row3p}>Systolic</p>
              <input />
              <p>mmHg</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DiagnosisAndVital;
