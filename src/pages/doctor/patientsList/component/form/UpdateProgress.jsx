import React, { useState } from "react";
import styles from "./UpdateProgress.module.scss";
import { X, ChevronDown, ChevronUp, Trash2, SquarePen } from "lucide-react";

import { FaRegCalendarAlt } from "react-icons/fa";

const UpdateProgress = ({ onClose }) => {
  const phaseOptions = [
    "Post-Surgery Follow-up",
    "Surgery",
    "Lab Tests",
    "Initial Consultation",
  ];

  const surgeryData = {
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
    description: "This is description text",
  };

  const progressOptions = ["Ongoing", "Completed", "Pending"];
  const [openPhase, setOpenPhase] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState({
    description: false,
  });

  const [description, setDescription] = useState(surgeryData.description);

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
        <h1 className={styles.title}>Update Progress tracker</h1>

        <div className={styles.row1}>
          {/* Select Phase */}
          <div>
            <p className={styles.label}>Select Phase</p>
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenPhase((prev) => !prev)}
              >
                <p>{selectedPhase || "Select Phase"}</p>
                <span className={styles.arrow}>
                  {openPhase ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openPhase && (
                <ul className={styles.menu}>
                  {phaseOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedPhase === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedPhase(option);
                        setOpenPhase(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Date of Activity */}
          <div className={styles.dateField}>
            <p className={styles.label}>Date of Activity</p>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row1}>
          {/* Assigned Doctor */}
          <div>
            <p className={styles.label}>Assigned Doctor</p>
            <input
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={styles.textInput}
              style={{ border: "1px solid #cfcfcf" }}
            />
          </div>

          {/* Progress Status */}
          <div>
            <p className={styles.label}>Progress Status</p>
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenProgress((prev) => !prev)}
              >
                <p>{selectedProgress || "Select Status"}</p>
                <span className={styles.arrow}>
                  {openProgress ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openProgress && (
                <ul className={styles.menu}>
                  {progressOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedProgress === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedProgress(option);
                        setOpenProgress(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles.row3}>
          {/* Description */}
          <div className={styles.descriptionContainer}>
            <p className={styles.label}>Description</p>
            {editMode.description ? (
              <textarea
                placeholder="shortness of breath, fatigue, swelling..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                rows={5}
                autoFocus
              />
            ) : (
              <p className={styles.descriptionText}>
                {!description ? (
                  <span className={styles.placeholder}>
                    shortness of breath, fatigue, swelling...
                  </span>
                ) : (
                  description
                )}
              </p>
            )}
            <SquarePen
              className={`${styles.editBtn} ${
                editMode.description ? styles.editBtnActive : ""
              }`}
              onClick={() =>
                setEditMode((prev) => ({
                  ...prev,
                  description: !prev.description,
                }))
              }
            />
          </div>

          <div className={styles.uploadedFiles}>
            <div className={styles.uploadFilesContainer}>
              <h6 className={styles.label}>Upload Files</h6>

              <div className={styles.uploadBox}>
                <p className={styles.uploadPrompt}>
                  Choose a file or drag & drop it here
                </p>
                <span className={styles.uploadHint}>
                  JPEG, PNG, PDG upto 50 MB
                </span>

                <label className={styles.browseBtn}>
                  Browse File
                  <input
                    type="file"
                    multiple
                    className={styles.hiddenFileInput}
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <ul className={styles.uploadedFilesWrapper}>
                {/* Render existing files (from dummy data) */}
                {surgeryData.uploadedFiles.map((item, idx) => (
                  <li key={`static-${idx}`} className={styles.fileRow}>
                    <img
                      src="/assets/fileIcon.svg"
                      alt="PDF icon"
                      className={styles.fileIcon}
                    />
                    <div className={styles.fileDetails}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.fileName}
                      >
                        {item.name}
                      </a>
                      <span className={styles.uploadedText}>Uploaded</span>
                    </div>
                    <span className={styles.trashWrapper}>
                      <Trash2 className={styles.trashIcon} />
                    </span>
                  </li>
                ))}

                {/* Render newly uploaded files (selectedFiles state) */}
                {selectedFiles.map((item, idx) => (
                  <li key={`new-${idx}`} className={styles.fileRow}>
                    <img
                      src="/assets/fileIcon.svg"
                      alt="PDF icon"
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
            </div>
          </div>
        </div>
        {/* Save Button */}
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
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgress;
