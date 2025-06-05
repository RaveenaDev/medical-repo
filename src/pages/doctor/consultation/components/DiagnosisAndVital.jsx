import styles from "./DiagnosisAndVital.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";
import { useState } from "react";
const DiagnosisAndVital = ({ onConfirm }) => {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
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
            <p>Diagnosis and Vital</p>
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
            What is your current body temperature?
          </p>
          <input type="text" className={styles.input} />
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

        {/*row4 */}
        <div className={styles.row4}>
          <div className={styles.row4LeftContainer}>
            <p>What is your resting heart rate?</p>
          </div>
          <div className={styles.row4RightContainer}>
            <input type="text" className={styles.input2} />
            <p className={styles.row4Unit}>BPM</p>
          </div>
        </div>

        {/*row5 */}
        <div className={styles.row4}>
          <div className={styles.row4LeftContainer}>
            <p>What is your oxygen level (SpO2)? </p>
          </div>
          <div className={styles.row4RightContainer}>
            <input type="text" className={styles.input2} />
            <p className={styles.row4Unit}>%</p>
          </div>
        </div>
        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.question}>
            How many breaths do you take per minute?
          </p>
          <input type="text" className={styles.input} />
        </div>
        {/* row7 */}
        <div className={styles.weightRow}>
          <div className={styles.weightRowLeftContainer}>
            <p className={styles.question}>Enter your weight</p>
          </div>
          <div>
            <input
              type="number"
              className={styles.weightInput}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className={styles.unitToggleRow}>
            <span
              className={`${styles.unitLabel}`}
              onClick={() => setUnit("lbs")}
            >
              lbs
            </span>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={unit === "kg"}
                onChange={() => setUnit(unit === "kg" ? "lbs" : "kg")}
              />
              <span className={styles.slider}></span>
            </label>
            <span
              className={`${styles.unitLabel} `}
              onClick={() => setUnit("kg")}
            >
              KG
            </span>
          </div>
        </div>

        {/* row8 */}
        <div className={styles.row8}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default DiagnosisAndVital;
