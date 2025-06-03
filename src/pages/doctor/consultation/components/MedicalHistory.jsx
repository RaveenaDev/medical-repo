import styles from "./MedicalHistory.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
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
            <Image size={19} />
            <Type size={19} />
            <Plus size={19} />
            <SquarePlay size={21} />
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
            <Box sx={{ display: "flex", gap: 4, marginTop: "1.5vh" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "1.6vh",
                }}
              >
                <Radio
                  checked={smoke === "yes"}
                  onChange={() => setSmoke("yes")}
                  value="yes"
                  name="smoke"
                  slotProps={{ input: { "aria-label": "Yes" } }}
                />
                Yes
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "1.6vh",
                }}
              >
                <Radio
                  checked={smoke === "no"}
                  onChange={() => setSmoke("no")}
                  value="no"
                  name="smoke"
                  slotProps={{ input: { "aria-label": "No" } }}
                />
                No
              </label>
            </Box>
          </div>
          <div>
            <p className={styles.question}>Do you drink alcohol?</p>
            <Box sx={{ display: "flex", gap: 4, marginTop: "1.5vh" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "1.6vh",
                }}
              >
                <Radio
                  checked={alcohol === "yes"}
                  onChange={() => setAlcohol("yes")}
                  value="yes"
                  name="alcohol"
                  slotProps={{ input: { "aria-label": "Yes" } }}
                />
                Yes
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "1.6vh",
                }}
              >
                <Radio
                  checked={alcohol === "no"}
                  onChange={() => setAlcohol("no")}
                  value="no"
                  name="alcohol"
                  slotProps={{ input: { "aria-label": "No" } }}
                />
                No
              </label>
            </Box>
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
