import styles from "./CurrentMedication.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";

import { useState } from "react";
const CurrentMedication = ({ onConfirm }) => {
  const [frequency1, setFrequency1] = useState("");
  const [frequency2, setFrequency2] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
    >
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
          <div>
            <p className={styles.question}>Dosage:</p>
            <input
              type="text"
              className={styles.inputSmall}
              placeholder="ex. 25.00"
            />
          </div>
          <div>
            <p className={styles.question}>Frequency:</p>
          </div>
        </div>

        {/* row4 */}
        <div className={styles.row4}>
          <p className={styles.question}>New Medication Prescribed:</p>
          <input type="text" className={styles.input} placeholder="" />
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <div>
            <p className={styles.question}>Dosage:</p>
            <input
              type="text"
              className={styles.inputSmall}
              placeholder="ex. 25.00"
            />
          </div>
          <div>
            <p className={styles.question}>Frequency:</p>
          </div>
        </div>

        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.questionBlue}>Next Appointment Scheduled?</p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row7 */}
        <div className={styles.row7}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default CurrentMedication;
