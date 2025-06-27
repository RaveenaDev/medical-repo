import { useState } from "react";
import styles from "./UpdatePRD.module.scss";
import { X } from "lucide-react";
const UpdatePRD = ({ onClose }) => {
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
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Past Records And Discharge Summaries</h1>

        <div className={styles.section1}>
          <div>
            <div className={styles.iconLabel}>
              <img src="/assets/stethoscope.svg" alt="" />
              <p className={styles.label}>Known Condition:</p>
            </div>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p className={styles.label}>Regurlar Medications:</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p className={styles.label}>Surgeries:</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p className={styles.label}>Allergies:</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p className={styles.label}>Regular Medications:</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p className={styles.label}>Family History:</p>
            <input type="text" />
          </div>
        </div>
        {/* Section 2*/}
        <div className={styles.section2}>
          <div className={styles.attachmentBox}>
            <h6 className={styles.label}>Attached Documents</h6>
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
        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePRD;
