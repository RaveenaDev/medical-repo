import { useState } from "react";
import styles from "./Library.module.scss";
import { X } from "lucide-react";
export default function Library({ onClose }) {
  const prebuilt = [
    {
      title: "General Physician Consultation",
      description: "Sections: Patient info, Symptoms, Medical History",
    },
    {
      title: "Dental Check-up",
      description: "Sections: Dental history, X-ray, Observations",
    },
    {
      title: "Cardiology Evaluation",
      description: "Sections: ECG, Blood Pressure, Family History",
    },
    {
      title: "Eye Examination",
      description: "Sections: Vision Test, Eye Pressure, Symptoms",
    },
  ];
  const saved = [
    {
      title: "Save General Physician Consultation",
      description: "Sections: Patient info, Symptoms, Medical History",
    },
    {
      title: "Save Dental Check-up",
      description: "Sections: Dental history, X-ray, Observations",
    },
    {
      title: "Save Cardiology Evaluation",
      description: "Sections: ECG, Blood Pressure, Family History",
    },
    {
      title: "Save Eye Examination",
      description: "Sections: Vision Test, Eye Pressure, Symptoms",
    },
  ];
  const [activeTab, setActiveTab] = useState("prebuilt");

  return (
    <div className={styles.container}>
      <div style={styles.head}>
        <div className={styles.crossContainer}>
          <X
            size={20}
            onClick={() => {
              onClose();
            }}
          />
        </div>
        {/* row 1 */}
        <div className={styles.row1}>
          <button
            onClick={() => setActiveTab("prebuilt")}
            className={`${styles.tabButton} ${
              activeTab === "prebuilt" ? styles.activeTab : ""
            }`}
          >
            Prebuilt Forms
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`${styles.tabButton} ${
              activeTab === "saved" ? styles.activeTab : ""
            }`}
          >
            My Saved Forms
          </button>
        </div>
      </div>

      {/* Forms Container */}
      <div className={styles.formsContainer}>
        {/*Prebuilt Forms*/}
        {activeTab === "prebuilt"
          ? prebuilt.map((form, index) => (
              <div className={styles.row2} key={index}>
                <h4>{form.title}</h4>
                <p>{form.description}</p>
                <div className={styles.btnContainer}>
                  <button className={styles.previewBtn}>
                    <img src="/assets/filterIcon.svg" alt="" width={20} />
                    Preview
                  </button>
                  <button className={styles.applyBtn}>
                    <img src="/assets/clipboardIcon.svg" alt="" width={20} />
                    Apply
                  </button>
                </div>
              </div>
            ))
          : saved.map((form, index) => (
              <div className={styles.row2} key={index}>
                <h4>{form.title}</h4>
                <p>{form.description}</p>
                <div className={styles.btnContainer}>
                  <button className={styles.previewBtn}>
                    <img src="/assets/filterIcon.svg" alt="" width={20} />
                    Preview
                  </button>
                  <button className={styles.applyBtn}>
                    <img src="/assets/clipboardIcon.svg" alt="" width={20} />
                    Apply
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
