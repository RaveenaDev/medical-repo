import React, { useEffect, useState } from "react";
import styles from "./UpdateProgress.module.scss";
import { X, ChevronDown, ChevronUp, Trash2, SquarePen } from "lucide-react";

import { FaRegCalendarAlt } from "react-icons/fa";
import {
  addProgressTrackerPhase,
  getDoctorsByDepartment,
} from "../../../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";

const UpdateProgress = ({ onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctorsByDepartment());
  }, []);
  const progressOptions = ["Ongoing", "Completed", "Pending"];

  const [openProgress, setOpenProgress] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState({
    description: false,
  });

  const [description, setDescription] = useState("");

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
  const handleSubmit = async () => {
    if (!caseId || !patientId || !selectedPhase || !doctor) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("caseId", caseId);
    formData.append("patient", patientId);
    formData.append("title", selectedPhase);
    formData.append("date", date);
    formData.append("assignedDoctor", doctor);
    formData.append("description", description);

    selectedFiles.forEach((item, index) => {
      formData.append("files", item.file); // key must match backend field
    });

    dispatch(addProgressTrackerPhase(formData, patientId));
    onClose();
  };

  const doctors = useSelector((store) => store.doctor.doctors);

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
            <p className={styles.label}>Phase</p>
            <input
              type="text"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className={styles.textInput}
              style={{ border: "1px solid #cfcfcf" }}
              placeholder="Enter Phase"
            />
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
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={styles.textInput}
              style={{
                border: "1px solid #cfcfcf",
                padding: "1vh",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Doctor</option>
              {doctors?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
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
                <span className={styles.placeholder}>
                  shortness of breath, fatigue, swelling...
                </span>
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
            onClick={handleSubmit}
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgress;
