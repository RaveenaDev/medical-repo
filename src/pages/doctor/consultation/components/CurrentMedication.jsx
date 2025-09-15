import styles from "./CurrentMedication.module.scss";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CurrentMedication = ({ onConfirm, selectedComponent, existingData }) => {
  const [formData, setFormData] = useState({
    currentMedication: "",
    currentMedications: [
      {
        name: "",
        dosage: "",
        frequency: "", // "daily" | "weekly" | "days"
        days: "", // only used when frequency === "days"
      },
    ],
  });
  const [dynamicAnswers, setDynamicAnswers] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const videoInputRef = useRef(null);
  const questionRef = useRef(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    const existing = existingData?.[selectedComponent];
    if (existing) {
      const existingMeds =
          existing.currentMedications && Array.isArray(existing.currentMedications)
              ? existing.currentMedications.map((m) => ({
                name: m?.name ?? "",
                dosage: m?.dosage ?? "",
                frequency: m?.frequency ?? "",
                // keep existing days if present; default empty
                days: m?.days ?? "",
              }))
              : [{ name: "", dosage: "", frequency: "", days: "" }];

      setFormData({
        currentMedication: existing.currentMedication || "",
        currentMedications: existingMeds,
      });

      setDynamicQuestions(existing.dynamicQuestions?.map((q) => q.question) || []);
      setDynamicAnswers(existing.dynamicQuestions?.map((q) => q.answer) || []);

      const imagePreviews =
          existing.images?.map((fileName) => ({
            id: fileName,
            file: { name: fileName },
          })) || [];
      const videoPreviews =
          existing.videos?.map((fileName) => ({
            id: fileName,
            file: { name: fileName },
          })) || [];

      setImages(imagePreviews);
      setVideos(videoPreviews);
    }
  }, [existingData, selectedComponent]);

  useEffect(() => {
    if (!openQuestion) return;
    const handleClickOutside = (event) => {
      if (questionRef.current && !questionRef.current.contains(event.target)) {
        setOpenQuestion(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openQuestion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
    e.target.value = "";
  };

  const handleRemoveVideo = (id) => {
    setVideos((prev) => prev.filter((vid) => vid.id !== id));
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedMeds = [...prev.currentMedications];
      // sanitize days to digits only
      if (field === "days") {
        const digitsOnly = String(value).replace(/\D/g, "");
        updatedMeds[index][field] = digitsOnly;
      } else {
        updatedMeds[index][field] = value;
        // if switching away from "days", clear days value to avoid stale data
        if (field === "frequency" && value !== "days") {
          updatedMeds[index].days = "";
        }
      }
      return { ...prev, currentMedications: updatedMeds };
    });
  };

  return (
      <form
          onSubmit={(e) => {
            e.preventDefault();

            // Basic validation: if "Every N days" chosen, N must be >= 1
            for (const [i, med] of formData.currentMedications.entries()) {
              if (med.frequency === "days") {
                const n = parseInt(med.days, 10);
                if (!n || n < 1) {
                  alert(`Please enter a valid number of days (>=1) for medicine #${i + 1}.`);
                  return;
                }
              }
            }

            const finalData = {
              ...formData,
              images: images.map((img) => img.file.name),
              videos: videos.map((vid) => vid.file.name),
              dynamicQuestions: dynamicQuestions.map((q, i) => ({
                question: q,
                answer: dynamicAnswers[i] || "",
              })),
            };

            onConfirm(finalData);
          }}
      >
        <div className={styles.container1}>
          {/* row1 */}
          <div className={styles.row1}>
            <div>
              <p>Current Medication</p>
            </div>
            <div className={styles.attachments}>
              <div className={styles.tooltipWrapper} onClick={() => fileInputRef.current.click()}>
                <img src="/assets/gallery-icon.svg" alt="" />
                <span className={styles.tooltipText}>Image</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
              </div>

              <div className={styles.tooltipWrapper}>
                <img
                    src="/assets/formkit-icon.svg"
                    alt=""
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenQuestion((prev) => !prev);
                    }}
                />
                <span className={styles.tooltipText}>Text</span>
              </div>

              <div className={styles.tooltipWrapper}>
                <img
                    src="/assets/Plus.svg"
                    alt=""
                    onClick={() => (openEdit ? setOpenEdit(false) : setOpenEdit(true))}
                />
                <span className={styles.tooltipText}>Edit</span>
              </div>

              <div className={styles.tooltipWrapper} onClick={() => videoInputRef.current.click()}>
                <img src="/assets/video-icon.svg" alt="" />
                <span className={styles.tooltipText}>Video</span>
                <input
                    type="file"
                    accept="video/*"
                    multiple
                    ref={videoInputRef}
                    style={{ display: "none" }}
                    onChange={handleVideoUpload}
                />
              </div>
            </div>
          </div>

          {images.length > 0 && (
              <>
                <h4>Images</h4>
                <div className={styles.imagePreviewRow}>
                  {images.map((img) => (
                      <div key={img.id} className={styles.imageWrapper}>
                        <img src={img.id} alt="uploaded" className={styles.uploadedImage} />
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => handleRemoveImage(img.id)}
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>
              </>
          )}

          {videos.length > 0 && (
              <>
                <h4>Videos</h4>
                <div className={styles.videoPreviewRow}>
                  {videos.map((vid) => (
                      <div key={vid.id} className={styles.videoWrapper}>
                        <video src={vid.id} className={styles.uploadedVideo} controls />
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => handleRemoveVideo(vid.id)}
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>
              </>
          )}

          {/* Open Question */}
          {openQuestion && (
              <>
                <div ref={questionRef} className={styles.customQuestion}>
                  <input
                      placeholder="Add your Question"
                      onChange={(e) => setQuestionText(e.target.value)}
                  />
                  <div className={styles.customQuestionBtns}>
                    <button className={styles.cancelBtn} type="button" onClick={() => setOpenQuestion(false)}>
                      Cancel
                    </button>
                    <button
                        className={styles.saveBtn}
                        type="button"
                        onClick={() => {
                          setDynamicQuestions((prev) => [...prev, questionText.trim()]);
                        }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
          )}

          {/* Dynamic Questions */}
          <div className={styles.dynamicQuestionContainer}>
            {dynamicQuestions.map((question, index) => (
                <div key={index} className={styles.dynamicQuestion}>
                  <div className={styles.questionHeader}>
                    <p className={styles.question}>{` ${question}`}</p>
                    {openEdit && (
                        <button
                            type="button"
                            onClick={() =>
                                setDynamicQuestions((prev) => prev.filter((_, i) => i !== index))
                            }
                            className={styles.removeButton}
                        >
                          <X />
                        </button>
                    )}
                  </div>
                  <input
                      type="text"
                      className={styles.input}
                      placeholder="Please specify"
                      value={dynamicAnswers[index] || ""}
                      onChange={(e) => {
                        const updated = [...dynamicAnswers];
                        updated[index] = e.target.value;
                        setDynamicAnswers(updated);
                      }}
                  />
                </div>
            ))}
          </div>

          {/* row2 */}
          <div className={styles.row2}>
            <p className={styles.question}>Are you currently taking any medications?</p>
            <select
                name="currentMedication"
                className={styles.input}
                value={formData.currentMedication}
                onChange={handleInputChange}
            >
              <option value="">Please Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Show medication fields only when "yes" is selected */}
          {formData.currentMedication === "yes" && (
              <>
                {formData.currentMedications.map((med, index) => (
                    <div key={index} className={styles.row3}>
                      <div>
                        <p className={styles.question}>Name:</p>
                        <input
                            type="text"
                            className={styles.inputSmall}
                            value={med.name}
                            onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className={styles.question}>Dosage:</p>
                        <input
                            type="text"
                            className={styles.inputSmall}
                            value={med.dosage}
                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                            placeholder="ex. 25.00"
                        />
                      </div>

                      <div className={styles.freq}>
                        <p className={styles.question}>Frequency:</p>
                        <div className={styles.customRadios}>
                          {/* Weekly */}
                          <label>
                            <input
                                type="radio"
                                name={`frequency-${index}`}
                                value="weekly"
                                checked={med.frequency === "weekly"}
                                onChange={() => handleMedicationChange(index, "frequency", "weekly")}
                            />
                            <span
                                className={`${styles.circle} ${
                                    med.frequency === "weekly" ? styles.checked : ""
                                }`}
                            >
                        {med.frequency === "weekly" && (
                            <img
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                                alt="Checked Icon"
                                width={24}
                                height={24}
                            />
                        )}
                      </span>
                            Weekly
                          </label>

                          {/* Daily */}
                          <label>
                            <input
                                type="radio"
                                name={`frequency-${index}`}
                                value="daily"
                                checked={med.frequency === "daily"}
                                onChange={() => handleMedicationChange(index, "frequency", "daily")}
                            />
                            <span
                                className={`${styles.circle} ${
                                    med.frequency === "daily" ? styles.checked : ""
                                }`}
                            >
                        {med.frequency === "daily" && (
                            <img
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                                alt="Checked Icon"
                                width={24}
                                height={24}
                            />
                        )}
                      </span>
                            Daily
                          </label>
                        </div>

                        {/* Every N days */}

                        <div className={styles.customRadios}>
                          <label>
                            <input
                                type="radio"
                                name={`frequency-${index}`}
                                value="days"
                                checked={med.frequency === "days"}
                                onChange={() => handleMedicationChange(index, "frequency", "days")}
                            />
                            <span
                                className={`${styles.circle} ${
                                    med.frequency === "days" ? styles.checked : ""
                                }`}
                            >
                        {med.frequency === "days" && (
                            <img
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                                alt="Checked Icon"
                                width={24}
                                height={24}
                            />
                        )}
                      </span>
                            Every
                            <input
                                type="number"
                                min={1}
                                inputMode="numeric"
                                className={styles.inputSmall}
                                style={{width: 70, margin: "0 6px",padding:'7px 7px'}}
                                placeholder="e.g., 3"
                                value={med.days || ""}
                                onFocus={() => handleMedicationChange(index, "frequency", "days")}
                                onChange={(e) => handleMedicationChange(index, "days", e.target.value)}
                            />
                            day(s)
                          </label>
                        </div>

                      </div>
                    </div>
                ))}

                <div className={styles.addRowButtonWrapper}>
                  <button
                      type="button"
                      className={styles.addRowButton}
                      onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            currentMedications: [
                              ...prev.currentMedications,
                              {name: "", dosage: "", frequency: "", days: ""},
                            ],
                          }))
                      }
                  >
                    + Add
                  </button>
                </div>
              </>
          )}

          {/* row7 */}
          <div className={styles.row7}>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
  );
};

export default CurrentMedication;
