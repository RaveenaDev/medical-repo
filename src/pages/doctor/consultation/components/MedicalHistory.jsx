import styles from "./MedicalHistory.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";

import { useState } from "react";

const CONDITIONS = [
  "Hypertension",
  "Heart failure",
  "Irregular heartbeat",
  "Asthma",
  "Diabetes",
  "Peripheral Artery Disease",
  "Heart attack",
];

export const MedicalHistory = ({ patient, onConfirm }) => {
  const [smoke, setSmoke] = useState("");
  const [alcohol, setAlcohol] = useState("");

  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState("");

  const handleToggle = (condition) => {
    setSelected((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <form
      className={styles.medicalHistory}
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
    >
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Medical History</p>
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
          <input
            className={styles.input}
            type="text"
            placeholder="Please describe the reason for your visit"
          />
        </div>

        {/* row3 */}
        <div className={styles.row3}>
          <p className={styles.question}>
            Have you had heart surgery or procedures? (e.g., stents, bypass
            surgery)
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row4 */}
        <div className={styles.row4}>
          <p className={styles.question}>
            Have you had any diagnostic tests related to your current condition?
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <div>
            <p className={styles.question}>Do you have any allergies?</p>
            <input type="text" placeholder="If yes, Please specify" />
          </div>

          <div>
            <p className={styles.question}>Do you smoke?</p>
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="yes"
                  checked={smoke === "yes"}
                  onChange={() => setSmoke("yes")}
                />
                <span
                  className={`${styles.circle} ${
                    smoke === "yes" ? styles.checked : ""
                  }`}
                >
                  {smoke === "yes" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="no"
                  checked={smoke === "no"}
                  onChange={() => setSmoke("no")}
                />
                <span
                  className={`${styles.circle} ${
                    smoke === "no" ? styles.checked : ""
                  }`}
                >
                  {smoke === "no" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                No
              </label>
            </div>
          </div>

          <div>
            <p className={styles.question}>Do you drink alcohol?</p>
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="alcohol"
                  value="yes"
                  checked={alcohol === "yes"}
                  onChange={() => setAlcohol("yes")}
                />
                <span
                  className={`${styles.circle} ${
                    alcohol === "yes" ? styles.checked : ""
                  }`}
                >
                  {alcohol === "yes" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="alcohol"
                  value="no"
                  checked={alcohol === "no"}
                  onChange={() => setAlcohol("no")}
                />
                <span
                  className={`${styles.circle} ${
                    alcohol === "no" ? styles.checked : ""
                  }`}
                >
                  {alcohol === "no" && (
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                      alt="Checked Icon"
                      width={24}
                      height={24}
                    />
                  )}
                </span>
                No
              </label>
            </div>
          </div>
        </div>

        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.question}>
            Do you have a history of any of the following conditions? (Check all
            that apply)
          </p>
          <div className={styles.options}>
            {CONDITIONS.map((condition) => (
              <button
                type="button"
                key={condition}
                className={`${styles.optionBtn} ${
                  selected.includes(condition) ? styles.selected : ""
                }`}
                onClick={() => handleToggle(condition)}
              >
                {condition}
              </button>
            ))}
            <input
              className={styles.otherInput}
              placeholder="Other (Please specify):"
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        </div>

        {/* row7 */}
        <div className={styles.row7}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};
