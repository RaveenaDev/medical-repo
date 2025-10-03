import React, {useEffect, useRef, useState} from "react";
import styles from "./UpdateProgress.module.scss";
import { X,Trash2, SquarePen } from "lucide-react";
import {
  addProgressTrackerPhase,
  getDoctorsByDepartment, getPatientDetailsByID,
} from "../../../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";

const UpdateProgress = ({ onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  useEffect(() => {
    dispatch(getDoctorsByDepartment());
  }, []);
  const [isFinalPhase, setIsFinalPhase] = useState(false);

  const [selectedPhase, setSelectedPhase] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editMode, setEditMode] = useState({
    description: false,
  });
  const [saving, setSaving] = useState(false); // 👈 loader state

  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
    // 👇 critical: clear the input so selecting the same file again triggers onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview); // cleanup
      return prev.filter((_, i) => i !== index);
    });
  };
  // const handleSubmit = async () => {
  //   if (!selectedPhase || !doctor) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }
  //
  //   // Option 2 (optional): Convert files to base64 (uncomment if needed)
  //   const filesBase64 = await Promise.all(
  //     selectedFiles.map(async (item) => ({
  //       name: item.file.name,
  //       type: item.file.type,
  //       content: await fileToBase64(item.file),
  //     }))
  //   );
  //
  //   const payload = {
  //     caseId,
  //     patient: patientId,
  //     title: selectedPhase,
  //     date: `${date}T${new Date().toTimeString().slice(0, 5)}`,
  //     assignedDoctor: doctor,
  //     description,
  //     isFinalPhase,
  //     files: filesBase64,
  //   };
  //
  //   dispatch(addProgressTrackerPhase(payload, patientId, caseId));
  //   onClose();
  // };

  const handleSubmit = async () => {
    if (!selectedPhase || !doctor || !date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true); // 👈 start loader

      const form = new FormData();
      form.append("caseId", caseId);
      form.append("patient", patientId);
      form.append("title", selectedPhase);
      form.append("date", date);
      form.append("assignedDoctor", doctor);
      if (isFinalPhase) form.append("isFinalPhase", "true");
      form.append(
          "data",
          JSON.stringify({
            description: description || "",
          })
      );
      selectedFiles.forEach((item) => {
        form.append("files", item.file, item.file.name);
      });

      await dispatch(addProgressTrackerPhase(form, patientId, caseId)); // waits for thunk to finish
      dispatch(getPatientDetailsByID(patientId))
      onClose(); // close after success (toast handled in action)
    } catch (err) {
      // errors are already logged in the action; show a basic alert here if you want
      console.error(err);
    } finally {
      setSaving(false); // 👈 stop loader
    }
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
        </div>

        <div className={styles.row1}>
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
        </div>
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isFinalPhase}
              onChange={(e) => setIsFinalPhase(e.target.checked)}
            />
            Mark this as the final stage of treatment
          </label>
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
                  JPEG, PNG, PDG upto 10 MB
                </span>

                <label className={styles.browseBtn}>
                  Browse File
                  <input
                      ref={fileInputRef}            // 👈 attach ref
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
              className={styles.saveBtn}
              onClick={handleSubmit}
              disabled={saving}
          >
            {saving ? (
                <>
                  <span className={styles.loader} aria-hidden />
                  Saving...
                </>
            ) : (
                "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgress;
