import React, { useState } from "react";
import styles from "./LabTests.module.scss";
import { X } from "lucide-react";

const LabTests = ({ onClose }) => {
  const [selected, setSelected] = useState("blood");
  const [fileNames, setFileNames] = useState([]);

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Lab Test</h1>

        <div className={styles.row1}>
          <div className={styles.radioGroup}>
            <div
              className={`${styles.radioMember} ${
                selected === "blood" ? styles.activeRadio : ""
              }`}
            >
              <label className={styles.customRadio}>
                <input
                  type="radio"
                  name="labTest"
                  value="blood"
                  checked={selected === "blood"}
                  onChange={() => setSelected("blood")}
                />
                <span>Blood test</span>
              </label>
            </div>
            <div
              className={`${styles.radioMember} ${
                selected === "other" ? styles.activeRadio : ""
              }`}
            >
              <label className={styles.customRadio}>
                <input
                  type="radio"
                  name="labTest"
                  value="other"
                  checked={selected === "other"}
                  onChange={() => setSelected("other")}
                />
                <span>Other</span>
              </label>
            </div>
            {selected === "other" && (
              <input
                type="text"
                placeholder="Specify"
                className={styles.textInput}
              />
            )}
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.leftColumn}>
            <div>
              <h6 className={styles.label}>Blood Type</h6>
              <input type="text" placeholder="Blood Type" />
            </div>
            <div>
              <h6 className={styles.label}>Lipid Profile</h6>
              <input type="text" placeholder="Lipid Profile" />
            </div>
            <div>
              <h6 className={styles.label}>CDC</h6>
              <input type="text" placeholder="CDC" />
            </div>
            <div className={styles.textAreaBox}>
              <h6 className={styles.label}>Action Taken</h6>
              <textarea rows={6} />
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.textAreaBox}>
              {" "}
              <h6 className={styles.label}>Lab Observation</h6>
              <textarea rows={6} />
            </div>
            <div className={styles.attachmentBox}>
              <h6 className={styles.label}>Attached File</h6>
              <label className={styles.customFileUpload}>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const names = files.map((file) => file.name);
                    setFileNames((prev) => [...prev, ...names]);
                  }}
                />
                Choose File
              </label>

              <div className={styles.fileList}>
                <div className={styles.fileNameList}>
                  {fileNames.map((name, index) => (
                    <span key={index} className={styles.fileName}>
                      {name}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
