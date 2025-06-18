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
            <div className={styles.tooltipWrapper}>
              <img src="/assets/gallery-icon.svg" alt="" />
              <span className={styles.tooltipText}>Image</span>
            </div>

            <div className={styles.tooltipWrapper}>
              <img src="/assets/formkit-icon.svg" alt="" />
              <span className={styles.tooltipText}>Text</span>
            </div>

            <div className={styles.tooltipWrapper}>
              <img src="/assets/Plus.svg" alt="" />
              <span className={styles.tooltipText}>Add</span>
            </div>

            <div className={styles.tooltipWrapper}>
              <img src="/assets/video-icon.svg" alt="" />
              <span className={styles.tooltipText}>Video</span>
            </div>
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
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="weekly"
                  checked={frequency1 === "weekly"}
                  onChange={() => setFrequency1("weekly")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency1 === "weekly" ? styles.checked : ""
                  }`}
                >
                  {frequency1 === "weekly" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Weekly
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  checked={frequency1 === "daily"}
                  onChange={() => setFrequency1("daily")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency1 === "daily" ? styles.checked : ""
                  }`}
                >
                  {frequency1 === "daily" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Daily
              </label>
            </div>
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
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  checked={frequency2 === "weekly"}
                  onChange={() => setFrequency2("weekly")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency2 === "weekly" ? styles.checked : ""
                  }`}
                >
                  {frequency2 === "weekly" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Weekly
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  checked={frequency2 === "daily"}
                  onChange={() => setFrequency2("daily")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency2 === "daily" ? styles.checked : ""
                  }`}
                >
                  {frequency2 === "daily" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Daily
              </label>
            </div>
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
