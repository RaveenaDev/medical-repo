import React, { useState } from "react";
import styles from "./LabTests.module.scss";
import { X } from "lucide-react";

const LabTests = ({ onClose }) => {
  const labTestData = {
    testGiven: "Blood Test",
    bloodType: "A+",
    lipidProfile: "HDL",
    cdc: "Normal",
    uploadedFiles: [
      {
        name: "blood_test_report.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        name: "CBC_summary_report.pdf",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
    actionTaken: [
      "Prescribed low-cholesterol diet",
      "No new medications introduced",
      "Cleared for surgery preparation",
    ],
    labObservations: [
      "Cholesterol slightly elevated",
      "Hemoglobin within normal range",
      "No signs of infection",
    ],
  };

  const [selected, setSelected] = useState("blood");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview); // cleanup
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Lab Test</h1>

        {/* Section 1 */}
        <div className={styles.section1}>
          <div className={styles.sec1Left}>
            <div className={styles.sec1LeftRow}>
              <p className={styles.labelRow}>
                Tests given: <span className={styles.ans}>Blood Test</span>
              </p>
            </div>
            <div className={styles.sec1LeftRow}>
              <p className={styles.labelRow}>
                Blood Type: <span className={styles.ans}>0+</span>
              </p>
            </div>
            <div className={styles.sec1LeftRow}>
              <p className={styles.labelRow}>
                Lipid Profile: <span className={styles.ans}>HDL</span>
              </p>
            </div>
            <div className={styles.sec1LeftRow}>
              <p className={styles.labelRow}>
                CDC: <span className={styles.ans}>Normal</span>
              </p>
            </div>
          </div>
          <div className={styles.sec1Right}>
            {" "}
            <h6 className={styles.label}>Uploaded Files</h6>
            <ul className={styles.uploadedFilesWrapper}>
              {labTestData.uploadedFiles.map((item, idx) => (
                <li key={idx} className={styles.fileRow}>
                  <img
                    src="/assets/fileIcon.svg"
                    alt="file icon"
                    width={12.5}
                  />
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section2}>
          <div className={styles.sec2Left}>
            <h6 className={styles.label}>Action Taken:</h6>
            <ul>
              {labTestData.actionTaken.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.sec2Right}>
            <h6 className={styles.label}>Lab Observation:</h6>
            <ul>
              {labTestData.labObservations.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
