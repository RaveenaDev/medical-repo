import React, { useState } from "react";
import { X, Trash2, LucideTrash2 } from "lucide-react";
import styles from "./OngoingProgress.module.scss";
import { useDispatch } from "react-redux";
import { updateProgressTrackerPhase } from "../../../../../../../components/State/Doctor/Action";

const OngoingProgress = ({ step, onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  const [isFinal, setIsFinal] = useState(false);
  const [note, setNote] = useState("");
  const [treatment, setTreatment] = useState("");
  const [files, setFiles] = useState([]);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [showAddField, setShowAddField] = useState(false);
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { label: "", value: "" }]);
  };
  const handleDeleteField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1); // Remove the field at the given index
    setAdditionalFields(updatedFields); // Update the state with the new array
  };

  const handleAdditionalChange = (index, key, value) => {
    const updated = [...additionalFields];
    updated[index][key] = value;
    setAdditionalFields(updated);
  };
  const handleSaveClick = async () => {
    const newFiles = await Promise.all(
      files.map(async (item) => ({
        name: item.name,
        content: await fileToBase64(item.file),
        type: item.file.type,
      }))
    );
    const sourceId = step.sourceId;
    const sourceType = step.sourceType;

    const payload = {
      isFinal,
      isDone: true,
      description: note,
      files: newFiles,
      treatment,
      additionalFields,
      date: new Date().toISOString(), // Send updated timestamp
    };
    dispatch(
      updateProgressTrackerPhase(
        payload,
        patientId,
        caseId,
        sourceType,
        sourceId
      )
    );
    onClose(); // Close modal
  };

  // console.log("Ongoing Progress Step: ", step);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.crossContainer}>
          <X size={20} onClick={onClose} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Ongoing Phase - {step?.title}</h1>

          <div className={styles.section1}>
            <div className={styles.row1}>
              <div className={styles.qna}>
                <p className={styles.label1}>Phase:&nbsp;</p>
                <p className={styles.value}>{step?.title || "N/A"}</p>
              </div>
              <div className={styles.qna}>
                <p className={styles.label1}>Date:&nbsp;</p>
                <p className={styles.value}>
                  {step?.date
                    ? new Date(step.date).toISOString().split("T")[0]
                    : "N/A"}
                </p>
              </div>
              <div className={styles.qna}>
                <p className={styles.label1}>Doctor:&nbsp;</p>
                <p className={styles.value}>{step?.doctor?.name || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isFinal}
                onChange={(e) => setIsFinal(e.target.checked)}
              />
              Mark this as the final stage of treatment
            </label>
          </div>

          <div className={styles.row3}>
            <div className={styles.descriptionContainer}>
              <p className={styles.label}>Note</p>
              <textarea
                className={styles.textarea}
                placeholder="Enter doctor's note here"
                value={note}
                rows={4}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <h6 className={styles.label}>Upload New Files</h6>
              <div className={styles.uploadBox}>
                <p className={styles.uploadPrompt}>
                  Choose a file or drag & drop it here
                </p>
                <span className={styles.uploadHint}>
                  JPEG, PNG, PDF up to 50 MB
                </span>
                <label className={styles.browseBtn}>
                  Browse File
                  <input type="file" multiple onChange={handleFileChange} />
                </label>
              </div>

              <ul className={styles.uploadedFilesWrapper}>
                {files.map((item, idx) => (
                  <li key={idx} className={styles.fileRow}>
                    <img
                      src="/assets/fileIcon.svg"
                      alt="File"
                      className={styles.fileIcon}
                    />
                    <div className={styles.fileDetails}>
                      <a
                        href={item.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.fileName}
                      >
                        {item.name}
                      </a>
                      <span className={styles.uploadedText}>Selected</span>
                    </div>
                    <span
                      className={styles.trashWrapper}
                      onClick={() => handleRemoveFile(idx)}
                    >
                      <Trash2 className={styles.trashIcon} />
                    </span>
                  </li>
                ))}
              </ul>
              {/* Show already uploaded backend files */}
              {step?.data?.files?.length > 0 && (
                <div className={styles.uploadedFiles}>
                  <p className={styles.label}>Existing Files</p>
                  <ul className={styles.uploadedFilesWrapper}>
                    {step.data.files.map((file, idx) => (
                      <li key={idx} className={styles.fileRow}>
                        <img
                          src="/assets/fileIcon.svg"
                          alt="File"
                          className={styles.fileIcon}
                        />
                        <div className={styles.fileDetails}>
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.fileName}
                          >
                            {file.split("/").pop()}
                          </a>
                          <span className={styles.uploadedText}>Uploaded</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className={styles.treatmentContainer}>
            <p className={styles.label}>Treatment</p>
            <textarea
              className={styles.textarea}
              placeholder="Enter treatment details"
              value={treatment}
              rows={4}
              onChange={(e) => setTreatment(e.target.value)}
            />
          </div>
          {/* Add Additional Info */}
          <div style={{ marginTop: "2vh" }}>
            <button
              onClick={handleAddField}
              style={{
                background: "#f0f3ff",
                border: "1px dashed #25307f",
                padding: "1vh 1vw",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "Karla",
                color: "#25307f",
                fontSize: "1.8vh",
                marginBottom: "2vh",
              }}
            >
              + Add Additional Info
            </button>

            {additionalFields.map((field, index) => (
              <div key={index} className={styles.row4}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder="Label (e.g. Allergies)"
                    value={field.label}
                    onChange={(e) =>
                      handleAdditionalChange(index, "label", e.target.value)
                    }
                  />
                  <textarea
                    className={styles.textInput}
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) =>
                      handleAdditionalChange(index, "value", e.target.value)
                    }
                  />
                  <LucideTrash2
                    size={42}
                    color="#e74c3c"
                    style={{
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => handleDeleteField(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "2vh", textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "#25307f",
                color: "white",
                padding: "1.2vh 2vw",
                border: "none",
                borderRadius: "4px",
                fontSize: "1.9vh",
                fontFamily: "Karla, sans-serif",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSaveClick();
              }}
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingProgress;
