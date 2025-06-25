import React, { useState } from "react";
import styles from "./LabTests.module.scss";
import { X } from "lucide-react";

const LabTests = ({ onClose }) => {
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

        <div className={styles.row1}>
          <div className={styles.radioGroup}>
            <label
              className={`${styles.customRadio} ${
                selected === "blood" ? styles.selectedRadio : ""
              }`}
            >
              <input
                type="radio"
                name="labTest"
                value="blood"
                className={styles.inputRadio}
                checked={selected === "blood"}
                onChange={() => setSelected("blood")}
              />
              <span>Blood test</span>
            </label>

            <label
              className={`${styles.customRadio} ${
                selected === "other" ? styles.selectedRadio : ""
              }`}
            >
              <input
                type="radio"
                name="labTest"
                value="other"
                className={styles.inputRadio}
                checked={selected === "other"}
                onChange={() => setSelected("other")}
              />
              <span>Other</span>
            </label>

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
              <input
                type="text"
                placeholder="Blood Type"
                className={styles.textInput}
              />
            </div>
            <div>
              <h6 className={styles.label}>Lipid Profile</h6>
              <input
                type="text"
                placeholder="Lipid Profile"
                className={styles.textInput}
              />
            </div>
            <div>
              <h6 className={styles.label}>CDC</h6>
              <input
                type="text"
                placeholder="CDC"
                className={styles.textInput}
              />
            </div>
            <div className={styles.textAreaBox}>
              <h6 className={styles.label}>Action Taken</h6>
              <textarea rows={6} />
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.textAreaBox}>
              <h6 className={styles.label}>Lab Observation</h6>
              <textarea rows={6} />
            </div>

            <div className={styles.attachmentBox}>
              <h6 className={styles.label}>Attached File</h6>
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

        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
