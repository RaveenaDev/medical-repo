import styles from "./Surgery.module.scss";
import { useState } from "react";
import { X } from "lucide-react";
const Surgery = ({ onClose }) => {
  const surgeryData = {
    surgeryName: "Heart Valve Replacement",
    surgeryDate: "06/26/2024",
    assignedDoctor: "Dr. Arunita",
    roomNumber: "G-129",
    healingStatus: "ongoing",
    uploadedFiles: [
      {
        name: "blood_test_report.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        name: "Intra_operative_notes_docs.pdf",
        url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      },
      {
        name: "consent_forms_report.pdf",
        url: "https://www.orimi.com/pdf-test.pdf",
      },
    ],
    intraoperativeNotes: [
      "No complications during anesthesia",
      "Valve replacement successful",
      "Vital signs stable throughout",
      "Estimated blood loss: minimal",
    ],
    actionTaken: [
      "Patient in post-op ICU",
      "Heart rhythm and BP stable",
      "Scheduled follow-up in 24 hours",
    ],
  };

  return (
    <>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Surgery</h1>

        {/* Section 1 */}
        <div className={styles.section1}>
          <div className={styles.sec1Left}>
            <div className={styles.sec1LeftRow}>
              <p className={styles.labelRow}>Surgery Name:</p>
              <p className={styles.ans}>Heart Valve Replacement</p>
            </div>
            <div className={styles.sec1LeftRow}>
              {" "}
              <p className={styles.labelRow}>Surgery Date:</p>
              <p className={styles.ans}>06/262024</p>
            </div>
            <div className={styles.sec1LeftRow}>
              {" "}
              <p className={styles.labelRow}>Assigned Doctor:</p>
              <p className={styles.ans}>Dr. Arunita</p>
            </div>
            <div className={styles.sec1LeftRow}>
              {" "}
              <p className={styles.labelRow}>Room No:</p>
              <p className={styles.ans}>G-129</p>
            </div>
            <div className={styles.sec1LeftRow}>
              {" "}
              <p className={styles.labelRow}>Healing status</p>
              <p className={styles.ans}>ongoing</p>
            </div>
          </div>
          <div className={styles.sec1Right}>
            {" "}
            <h6 className={styles.label}>Uploaded Files</h6>
            <ul className={styles.uploadedFilesWrapper}>
              {surgeryData.uploadedFiles.map((item, idx) => (
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
            <h6 className={styles.label}>Intraoperative Notes</h6>
            <div className={styles.content}>
              <ul>
                {surgeryData.intraoperativeNotes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>{" "}
          <div className={styles.sec2Right}>
            <h6 className={styles.label}>Action Taken</h6>
            <div className={styles.content}>
              <ul>
                {surgeryData.actionTaken.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surgery;
