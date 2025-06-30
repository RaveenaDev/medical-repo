import { useState } from "react";
import styles from "./PostSurgeryFollowUp.module.scss";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const PostSurgeryFollowUp = ({ onClose }) => {
  const dummyData = {
    surgeryName: "Heart Valve Replacement",
    surgeryDate: "2024-06-26",
    assignedDoctor: "Dr. Arunita",
    roomNumber: "G-129",
    healingStatus: "ongoing",
    medicationAdjustments: ["Reduced beta blockers", "Stopped Aspirin"],
    uploadedFiles: [],
    postSurgeryNotes:
      "Surgery uneventful. Patient is stable. Will monitor for 24 hrs and start oral intake gradually.",
    observedSymptoms: "Shortness of breath, Fatigue",
  };

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
        <h1 className={styles.title}>Post Surgery Follow Up</h1>

        {/* Section 1 */}
        <div className={styles.section1}>
          <div className={styles.sec1Left}>
            <div className={styles.sec1RowLeft}>
              <p className={styles.labelRow}>Surgery Name:</p>
              <p className={styles.ansRow}>Heart Valve Replacement</p>
            </div>
            <div className={styles.sec1RowLeft}>
              {" "}
              <p className={styles.labelRow}>Surgery Date:</p>
              <p>06/26/2025</p>
            </div>
            <div className={styles.sec1RowLeft}>
              {" "}
              <p className={styles.labelRow}>Assigned Doctor:</p>
              <p>Dr.Arunita</p>
            </div>
            <div className={styles.sec1RowLeft}>
              {" "}
              <p className={styles.labelRow}>Room No:</p>
              <p>G-129</p>
            </div>
            <div className={styles.sec1RowLeft}>
              {" "}
              <p className={styles.labelRow}>Healing status:</p>
              <p>ongoing</p>
            </div>
          </div>

          <div className={styles.sec1Right}>
            <div className={styles.medWrapper}>
              <h6 className={styles.label}>Medication Adjustments</h6>
              <ul>
                {dummyData.medicationAdjustments.map((item, idx) => (
                  <li className={styles.label} key={idx}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.uploadWrapper}>
              <div className={`${styles.formGroup} ${styles.attachmentWidth} `}>
                <p className={styles.label}>Uploaded Files</p>
                <div className={styles.attachmentBox}>
                  <label className={styles.customFileUpload}>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className={styles.inputFile}
                    />
                    Choose File
                  </label>

                  <div className={styles.fileList}>
                    {selectedFiles.map((item, index) => (
                      <div key={index} className={styles.filePreviewBox}>
                        {item.file.type.startsWith("image/") ? (
                          <img
                            src={item.preview}
                            alt={item.name}
                            className={styles.previewImg}
                          />
                        ) : (
                          <span className={styles.fileName}>{item.name}</span>
                        )}
                        <X
                          className={styles.removeIcon}
                          size={16}
                          onClick={() => handleRemoveFile(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section2}>
          <div className={`${styles.sec2Left} `}>
            <p className={styles.label}>Post Surgery Notes</p>
            <p className={styles.content}>{dummyData.postSurgeryNotes}</p>
          </div>

          <div className={styles.sec2Left}>
            <p className={styles.label}>Observed Symptoms</p>
            <p className={styles.content}>{dummyData.observedSymptoms}</p>
          </div>
        </div>
        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PostSurgeryFollowUp;
