import React, { useRef, useState } from "react";
import { X, Trash2, LucideTrash2 } from "lucide-react";
import styles from "./OngoingProgress.module.scss";
import { useDispatch } from "react-redux";
import {
  getPatientDetailsByID,
  updateProgressTrackerPhase,
} from "../../../../../../components/State/Doctor/Action";

const OngoingProgress = ({ step, onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // ----- Derived (existing) data from step -----
  const existingDescription =
    step?.data?.description || step?.data?.Description || "";
  const existingFiles = Array.isArray(step?.files) ? step.files : [];

  const formatIST = (iso) => {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const isImage = (mime, url) =>
    (mime && mime.startsWith("image/")) ||
    /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url || "");

  // ----- Local state -----
  // console.log("Final: ", step);
  const [formData, setFormData] = useState({
    isFinal: step?.status === "Final",
    note: step?.data?.Notes || "",
    treatment: step?.data?.Treatment || "",
    files: [], // new files for this update
    additionalFields: [],
  });
  const [saving, setSaving] = useState(false); // 👈 loader

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
    // allow re-selecting the same file later
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(formData.files[index].preview);
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleAddField = () => {
    setFormData((prev) => ({
      ...prev,
      additionalFields: [...prev.additionalFields, { label: "", value: "" }],
    }));
  };

  const handleDeleteField = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalFields: prev.additionalFields.filter((_, i) => i !== index),
    }));
  };

  const handleAdditionalChange = (index, key, value) => {
    setFormData((prev) => {
      const updatedFields = [...prev.additionalFields];
      updatedFields[index][key] = value;
      return { ...prev, additionalFields: updatedFields };
    });
  };

  const handleSaveClick = async () => {
    try {
      setSaving(true); // start loader

      const sourceId = step.sourceId;
      const sourceType = step.sourceType;

      // Merge additionalFields + treatment + note
      const updatedData = formData.additionalFields.reduce((acc, field) => {
        if (field.label) acc[field.label] = field.value;
        return acc;
      }, {});
      updatedData["Treatment"] = formData.treatment;
      updatedData["Notes"] = formData.note;

      // Build multipart form-data
      const form = new FormData();
      form.append("isDone", "true");
      form.append("isFinal", formData.isFinal ? "true" : "false"); // 👈 always send
      form.append("data", JSON.stringify(updatedData));

      // new files only
      formData.files.forEach((item) => {
        form.append("files", item.file, item.name);
      });

      await dispatch(
        updateProgressTrackerPhase(
          form,
          patientId,
          caseId,
          sourceType,
          sourceId
        )
      );

      // console.log(formData.isFinal)

      dispatch(getPatientDetailsByID(patientId));

      onClose(); // close on success
    } catch (e) {
      console.error(e);
      // optionally show an alert/toast here
    } finally {
      setSaving(false); // stop loader
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.crossContainer}>
          <X size={20} onClick={onClose} />
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>Ongoing Phase - {step?.title}</h1>

          {/* ===== Previous Phase Summary ===== */}
          {(step || existingDescription || existingFiles.length > 0) && (
            <div className={styles.previousBlock}>
              <div className={styles.prevHeader}>
                <div className={styles.prevHeaderItem}>
                  <span className={styles.label1}>Phase:</span>
                  <span className={styles.value}>{step?.title || "N/A"}</span>
                </div>
                <div className={styles.prevHeaderItem}>
                  <span className={styles.label1}>Date:</span>
                  <span className={styles.value}>{formatIST(step?.date)}</span>
                </div>
                <div className={styles.prevHeaderItem}>
                  <span className={styles.label1}>Doctor:</span>
                  <span className={styles.value}>
                    {step?.doctor?.name || "N/A"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "1rem",
                }}
              >
                {existingDescription && (
                  <div className={styles.prevDesc}>
                    <p className={styles.label}>Description</p>
                    <p className={styles.value}>{existingDescription}</p>
                  </div>
                )}

                {existingFiles.length > 0 && (
                  <>
                    <ul className={styles.uploadedFilesWrapper}>
                      {existingFiles.map((f) => (
                        <li key={f._id || f.url} className={styles.fileRow}>
                          {isImage(f.fileType, f.url) ? (
                            <img
                              src={f.url}
                              alt={f.originalName || "file"}
                              className={styles.thumb}
                            />
                          ) : (
                            <img
                              src="/assets/fileIcon.svg"
                              alt="File"
                              className={styles.fileIcon}
                            />
                          )}

                          <div className={styles.fileDetails}>
                            <a
                              href={f.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.fileName}
                            >
                              {f.originalName || "File"}
                            </a>
                            <span className={styles.uploadedText}>
                              {f.fileType || "file"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ===== Controls ===== */}
          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isFinal}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFinal: e.target.checked,
                  }))
                }
                disabled={saving}
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
                value={formData.note}
                rows={4}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, note: e.target.value }))
                }
                disabled={saving}
              />
            </div>

            <div className={styles.descriptionContainer}>
              <h6 className={styles.label}>Upload New Files</h6>
              <div className={styles.uploadBox}>
                <p className={styles.uploadPrompt}>
                  Choose a file or drag & drop it here
                </p>
                <span className={styles.uploadHint}>
                  JPEG, PNG, PDF up to 10 MB
                </span>
                <label className={styles.browseBtn}>
                  Browse File
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    disabled={saving}
                  />
                </label>
              </div>

              <ul className={styles.uploadedFilesWrapper}>
                {formData.files.map((item, idx) => (
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
            </div>
          </div>

          <div className={styles.treatmentContainer}>
            <p className={styles.label}>Treatment</p>
            <textarea
              className={styles.textarea}
              placeholder="Enter treatment details"
              value={formData.treatment}
              rows={4}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, treatment: e.target.value }))
              }
              disabled={saving}
            />
          </div>

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
              disabled={saving}
            >
              + Add Additional Info
            </button>

            {formData.additionalFields.map((field, index) => (
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
                    disabled={saving}
                  />
                  <textarea
                    className={styles.textInput}
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) =>
                      handleAdditionalChange(index, "value", e.target.value)
                    }
                    disabled={saving}
                  />
                  <LucideTrash2
                    size={42}
                    color="#e74c3c"
                    style={{ cursor: saving ? "not-allowed" : "pointer" }}
                    onClick={() => !saving && handleDeleteField(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2vh", textAlign: "center" }}>
            <button
              className={styles.saveBtn}
              onClick={handleSaveClick}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className={styles.loader} aria-hidden />
                  Saving...
                </>
              ) : (
                "Save & Close"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingProgress;
