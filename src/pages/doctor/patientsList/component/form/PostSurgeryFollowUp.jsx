import { useState } from "react";
import styles from "./PostSurgeryFollowUp.module.scss";
import { X, ChevronDown, ChevronUp, Trash2, SquarePen } from "lucide-react";

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
      "Surgery uneventful. Patient is stable. Will monitor for 24 hrs and start oral intake gradually. wwwwwwwww wwwwwwww wwwwwwwwww wwwwwwww",
    observedSymptoms:
      "Shortness of breath, Fatigue www w ww www www wwww www w ww w w w",
  };
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

  const [postSurgeryNotes, setPostSurgeryNotes] = useState(
    dummyData.postSurgeryNotes
  );
  const [observedSymptoms, setObservedSymptoms] = useState(
    dummyData.observedSymptoms
  );
  const [editMode, setEditMode] = useState({
    notes: false,
    symptoms: false,
  });

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

        <div className={styles.mainContent}>
          {/* Left 1 */}
          <div className={styles.left}>
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
            {/* Post Surgery Notes */}
            <div className={styles.sec2Left}>
              <p className={styles.label}>Post Surgery Notes</p>
              {editMode.notes ? (
                <textarea
                  className={styles.content}
                  value={postSurgeryNotes}
                  onChange={(e) => setPostSurgeryNotes(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className={styles.content}>{postSurgeryNotes}</p>
              )}

              <SquarePen
                className={`${styles.editBtn} ${
                  editMode.notes ? styles.editBtnActive : ""
                }`}
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, notes: !prev.notes }))
                }
              />
            </div>

            {/* Observed Symptoms */}
            <div className={styles.sec2Left}>
              <p className={styles.label}>Observed Symptoms</p>
              {editMode.symptoms ? (
                <textarea
                  className={styles.content}
                  value={observedSymptoms}
                  onChange={(e) => setObservedSymptoms(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className={styles.content}>{observedSymptoms}</p>
              )}

              <SquarePen
                className={`${styles.editBtn} ${
                  editMode.symptoms ? styles.editBtnActive : ""
                }`}
                onClick={() =>
                  setEditMode((prev) => ({ ...prev, symptoms: !prev.symptoms }))
                }
              />
            </div>
          </div>

          {/* Right */}
          <div className={styles.right}>
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
                        <p className={styles.fileName}>{item.name}</p>
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
                        <p className={styles.fileName}>{item.name}</p>
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
          </div>
        </div>
        {/* section 3 */}
        <div className={styles.section3}>
          <div className={styles.addInfo}>
            <button>Add Additional Info</button>
          </div>
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.saveBtn}>Save</button>
          <button className={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PostSurgeryFollowUp;
