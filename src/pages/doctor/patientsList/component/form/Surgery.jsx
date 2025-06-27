import styles from "./Surgery.module.scss";
import { useState } from "react";
import { X } from "lucide-react";
const Surgery = ({ onClose }) => {
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
        <h1>Surgery</h1>

        {/* Section 1 */}
        <div className={styles.section1}>
          <p>Surgery Name</p>
          <input type="text" />
        </div>

        {/* Section 2 */}
        <div className={styles.section2}>
          <div>
            <p>Intraoperative Notes</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>Action Taken</p>
            <input type="text" />
          </div>
          <div>
            {" "}
            <p>Additional Info</p>
            <input type="text" />
          </div>
          <div>
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
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surgery;
