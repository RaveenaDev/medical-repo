import styles from "./DiagnosisAndVital.module.scss";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DiagnosisAndVital = ({ onConfirm, selectedComponent, existingData }) => {
  // ---------------- Local state ----------------
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const videoInputRef = useRef(null);

  const questionRef = useRef(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");

  const [formData, setFormData] = useState({
    // --- Diagnosis fields ---
    dxPrimaryConcern: "",
    dxSymptomOnset: "", // ISO date string
    dxPain: "no", // "yes" | "no"
    dxPainLocation: "",
    dxPainSeverity: "", // 0-10
    dxRecentChanges: "",
    dxAssociatedSymptoms: "",

    // --- Vitals fields ---
    temperature: "",
    diastolic: "",
    systolic: "",
    heartRate: "",
    oxygenLevel: "",
    respirationRate: "",
    weight: "",
    unit: "kg",
    height: "",
    unit2: "cm",

    // --- Dynamic Q/A ---
    dynamicAnswers: [],
  });
  useEffect(() => {
    const existing = existingData?.[selectedComponent];

    console.log(existing); // For debugging

    if (existing) {
      setFormData((prev) => ({
        ...prev,
        // Diagnosis fields
        dxPrimaryConcern: existing.dxPrimaryConcern || "",
        dxSymptomOnset: existing.dxSymptomOnset || "",

        // dxPain: "yes" or "no", if exists
        dxPain: existing.dxPain?.hasPain === true ? "yes" : "no" || "no",  // Default to "no" if not found

        // If pain exists, get its properties (location, severity)
        dxPainLocation: existing.dxPain?.location || "",
        dxPainSeverity: existing.dxPain?.severity != null ? String(existing.dxPain.severity) : "",

        // Other diagnosis fields
        dxRecentChanges: existing.dxRecentChanges || "",
        dxAssociatedSymptoms: existing.dxAssociatedSymptoms || "",

        // Vitals fields
        temperature: existing.temperature || "",
        diastolic: existing.diastolic || "",
        systolic: existing.systolic || "",
        heartRate: existing.heartRate || "",
        oxygenLevel: existing.oxygenLevel || "",
        respirationRate: existing.respirationRate || "",
        weight: existing.weight?.value || "",
        unit: existing.weight?.unit || "kg",
        height: existing.height?.value || "",
        unit2: existing.height?.unit || "cm",

        // Dynamic answers
        dynamicAnswers: existing.dynamicQuestions?.map((q) => q.answer) || [],
      }));

      // For dynamic questions
      setDynamicQuestions(existing.dynamicQuestions?.map((q) => q.question) || []);

      // Prefill file previews (optional)
      const imagePreviews = existing.images?.map((fileName) => ({
        id: fileName,
        file: { name: fileName },
      })) || [];
      const videoPreviews = existing.videos?.map((fileName) => ({
        id: fileName,
        file: { name: fileName },
      })) || [];

      setImages(imagePreviews);
      setVideos(videoPreviews);
    }
  }, [existingData, selectedComponent]);


  // ---------------- Handlers ----------------
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

  const handleHeightUnitToggle = () => {
    setFormData((prev) => ({
      ...prev,
      unit2: prev.unit2 === "cm" ? "ft" : "cm",
    }));
  };

  const handleWeightUnitToggle = () => {
    setFormData((prev) => ({
      ...prev,
      unit: prev.unit === "kg" ? "lbs" : "kg",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let v = value;
    // Optional: numeric inputs could be normalized here
    if (type === "number" && value === "") v = "";
    setFormData((prev) => ({ ...prev, [name]: v }));
  };

  const handleDynamicAnswerChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.dynamicAnswers];
      updated[index] = value;
      return { ...prev, dynamicAnswers: updated };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
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
    const files = Array.from(e.target.files || []);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      dynamicAnswers,
      unit,
      weight,
      height,
      unit2,
      // Diagnosis fields (now directly at root level)
      dxPrimaryConcern,
      dxSymptomOnset,
      dxPain,
      dxPainLocation,
      dxPainSeverity,
      dxRecentChanges,
      dxAssociatedSymptoms,
      // strip them out; the rest are vitals
      ...vitalsRest
    } = formData;

    const finalData = {
      // ---- Diagnosis fields directly at the root level ----
      dxPrimaryConcern,
      dxSymptomOnset, // date string (YYYY-MM-DD)
      dxPain: {
        hasPain: dxPain === "yes",
        location: dxPain === "yes" ? dxPainLocation : "",
        severity:
            dxPain === "yes" && dxPainSeverity !== ""
                ? Number(dxPainSeverity)
                : null,
      },
      dxRecentChanges,
      dxAssociatedSymptoms, // e.g., "fever, fatigue, difficulty breathing"

      // ---- Vitals ----
      ...vitalsRest,
      weight: { value: weight, unit },
      height: { value: height, unit: unit2 },

      // ---- Dynamic Q&A ----
      dynamicQuestions: dynamicQuestions.map((q, i) => ({
        question: q,
        answer: dynamicAnswers[i] || "",
      })),

      // ---- Files (names only as per your current behavior) ----
      images: images.map((img) => img.file.name),
      videos: videos.map((vid) => vid.file.name),
    };

    // console.log("Final: ", finalData);

    onConfirm(finalData);
  };


  return (
      <form onSubmit={handleSubmit}>
        <div className={styles.container1}>
          {/* row1 */}
          <div className={styles.row1}>
            <div>
              <p>Diagnosis and Vital</p>
            </div>
            <div className={styles.attachments}>
              <div
                  className={styles.tooltipWrapper}
                  onClick={() => fileInputRef.current?.click()}
              >
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
                    onClick={() => setOpenEdit((s) => !s)}
                />
                <span className={styles.tooltipText}>Text</span>
              </div>

              <div
                  className={styles.tooltipWrapper}
                  onClick={() => videoInputRef.current?.click()}
              >
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

          {/* Images */}
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

          {/* Videos */}
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

          {/* Add a custom question */}
          {openQuestion && (
              <div ref={questionRef} className={styles.customQuestion}>
                <input
                    placeholder="Add your Question"
                    onChange={(e) => setQuestionText(e.target.value)}
                />
                <div className={styles.customQuestionBtns}>
                  <button
                      className={styles.cancelBtn}
                      type="button"
                      onClick={() => setOpenQuestion(false)}
                  >
                    Cancel
                  </button>
                  <button
                      className={styles.saveBtn}
                      type="button"
                      onClick={() => {
                        const q = (questionText || "").trim();
                        if (!q) return;
                        setDynamicQuestions((prev) => [...prev, q]);
                        setFormData((prev) => ({
                          ...prev,
                          dynamicAnswers: [...prev.dynamicAnswers, ""],
                        }));
                        setOpenQuestion(false);
                        setQuestionText("");
                      }}
                  >
                    Save
                  </button>
                </div>
              </div>
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
                            className={styles.removeButton}
                            onClick={() => {
                              setDynamicQuestions((prev) =>
                                  prev.filter((_, i) => i !== index)
                              );
                              setFormData((prev) => {
                                const updated = [...prev.dynamicAnswers];
                                updated.splice(index, 1);
                                return { ...prev, dynamicAnswers: updated };
                              });
                            }}
                        >
                          <X />
                        </button>
                    )}
                  </div>
                  <input
                      type="text"
                      className={styles.input}
                      placeholder="Please specify"
                      value={formData.dynamicAnswers[index] || ""}
                      onChange={(e) =>
                          handleDynamicAnswerChange(index, e.target.value)
                      }
                  />
                </div>
            ))}
          </div>

          {/* ---------------- DIAGNOSIS (before vitals) ---------------- */}
          <h4>Diagnosis</h4>

          {/* Q1: Primary concern */}
          <div className={styles.row2}>
            <p className={styles.question}>
              What is the primary symptom or concern you are experiencing?
            </p>
            <input
                type="text"
                name="dxPrimaryConcern"
                className={styles.input}
                value={formData.dxPrimaryConcern}
                onChange={handleInputChange}
                placeholder="e.g., chest pain, persistent cough"
            />
          </div>

          {/* Q2: Symptom onset */}
          <div className={styles.row2}>
            <p className={styles.question}>
              When did you first notice these symptoms?
            </p>
            <input
                type="date"
                name="dxSymptomOnset"
                className={styles.input}
                value={formData.dxSymptomOnset}
                onChange={handleInputChange}
            />
          </div>

          {/* Q3: Pain */}
          <div className={styles.row3a} style={{ marginTop: "3vh" }}>
            <div className={styles.row3aLeftContainer}>
              <p className={styles.question}>
                Have you experienced any pain? If yes, where and how severe is it?
              </p>
            </div>
            <div className={styles.row3aRightContainer}>
              <div className={styles.row3aRight}>
                <label className={styles.row3a} style={{ marginLeft: "2px" }}>
                  <input
                      type="radio"
                      name="dxPain"
                      value="no"
                      checked={formData.dxPain === "no"}
                      onChange={handleInputChange}
                  />
                  &nbsp;No
                </label>
                <label className={styles.row3a}>
                  <input
                      type="radio"
                      name="dxPain"
                      value="yes"
                      checked={formData.dxPain === "yes"}
                      onChange={handleInputChange}
                  />
                  &nbsp;Yes
                </label>
              </div>

              {formData.dxPain === "yes" && (
                  <div className={styles.row3aRight} style={{ marginTop: 8 }}>
                    <input
                        name="dxPainLocation"
                        className={styles.input}
                        placeholder="Location of pain (e.g., lower back)"
                        value={formData.dxPainLocation}
                        onChange={handleInputChange}
                    />
                    <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginTop: "-1px",
                        }}
                    >
                      <input
                          style={{ minWidth: "6vw", minHeight: "3.8vh" }}
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          name="dxPainSeverity"
                          className={styles.input2}
                          placeholder="Severity 0–10"
                          value={formData.dxPainSeverity}
                          onChange={handleInputChange}
                      />
                      <span className={styles.row4Unit}>/10</span>
                    </div>
                  </div>
              )}
            </div>
          </div>


          {/* Q4: Recent injuries/changes */}
          <div className={styles.row2}>
            <p className={styles.question}>
              Have you had any recent injuries or changes in your health?
            </p>
            <input
                type="text"
                name="dxRecentChanges"
                className={styles.input}
                value={formData.dxRecentChanges}
                onChange={handleInputChange}
                placeholder="e.g., fall, surgery, new medication"
            />
          </div>

          {/* Q5: Associated symptoms */}
          <div className={styles.row2}>
            <p className={styles.question}>
              Do you have any other associated symptoms like fever, fatigue, or difficulty breathing?
            </p>
            <input
                type="text"
                name="dxAssociatedSymptoms"
                className={styles.input}
                value={formData.dxAssociatedSymptoms}
                onChange={handleInputChange}
                placeholder="e.g., fever, fatigue, difficulty breathing"
            />
          </div>

          {/* ---------------- VITALS ---------------- */}
          <h4>Vitals</h4>

          {/* row2 */}
          <div className={styles.row2}>
            <p className={styles.question}>What is your current body temperature?</p>
            <input
                type="text"
                name="temperature"
                className={styles.input}
                value={formData.temperature}
                onChange={handleInputChange}
            />
          </div>

          {/* row3 */}
          <div className={styles.row3}>
            <div className={styles.row3LeftContainer}>
              <p className={styles.question}>Enter your Blood Pressure reading</p>
            </div>
            <div className={styles.row3RightContainer}>
              <div className={styles.row3Right}>
                <p className={styles.row3p}>Diastolic</p>
                <input
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleInputChange}
                />
                <p>mmHg</p>
              </div>
              <div className={styles.row3Right}>
                <p className={styles.row3p}>Systolic</p>
                <input
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleInputChange}
                />
                <p>mmHg</p>
              </div>
            </div>
          </div>

          {/* row4 */}
          <div className={styles.row4}>
            <div className={styles.row4LeftContainer}>
              <p>What is your resting heart rate?</p>
            </div>
            <div className={styles.row4RightContainer}>
              <input
                  type="text"
                  name="heartRate"
                  className={styles.input2}
                  value={formData.heartRate}
                  onChange={handleInputChange}
              />
              <p className={styles.row4Unit}>BPM</p>
            </div>
          </div>

          {/* row5 */}
          <div className={styles.row4}>
            <div className={styles.row4LeftContainer}>
              <p>What is your oxygen level (SpO2)? </p>
            </div>
            <div className={styles.row4RightContainer}>
              <input
                  type="text"
                  name="oxygenLevel"
                  className={styles.input2}
                  value={formData.oxygenLevel}
                  onChange={handleInputChange}
              />
              <p className={styles.row4Unit}>%</p>
            </div>
          </div>

          {/* row6 */}
          <div className={styles.row6}>
            <p className={styles.question}>How many breaths do you take per minute?</p>
            <input
                type="text"
                name="respirationRate"
                className={styles.input}
                value={formData.respirationRate}
                onChange={handleInputChange}
            />
          </div>

          {/* row7 (Weight) */}
          <div className={styles.weightRow}>
            <div className={styles.weightRowLeftContainer}>
              <p className={styles.question}>Enter your weight</p>
            </div>
            <div>
              <input
                  type="number"
                  name="weight"
                  className={styles.weightInput}
                  value={formData.weight}
                  onChange={handleInputChange}
              />
            </div>

            <div className={styles.unitToggleRow}>
            <span
                className={styles.unitLabel}
                onClick={() =>
                    setFormData((p) => ({ ...p, unit: "lbs" }))
                }
            >
              lbs
            </span>
              <label className={styles.toggleSwitch}>
                <input
                    type="checkbox"
                    checked={formData.unit === "kg"}
                    onChange={handleWeightUnitToggle}
                />
                <span className={styles.slider}></span>
              </label>
              <span
                  className={styles.unitLabel}
                  onClick={() =>
                      setFormData((p) => ({ ...p, unit: "kg" }))
                  }
              >
              KG
            </span>
            </div>
          </div>

          {/* row 7.5 (Height) */}
          <div className={styles.weightRow}>
            <div className={styles.weightRowLeftContainer}>
              <p className={styles.question}>Enter your height</p>
            </div>
            <div>
              <input
                  type="number"
                  name="height"
                  className={styles.weightInput}
                  value={formData.height}
                  onChange={handleInputChange}
              />
            </div>

            <div className={styles.unitToggleRow}>
            <span
                className={styles.unitLabel}
                onClick={() =>
                    setFormData((p) => ({ ...p, unit2: "ft" }))
                }
            >
              ft
            </span>
              <label className={styles.toggleSwitch}>
                <input
                    type="checkbox"
                    checked={formData.unit2 === "cm"}
                    onChange={handleHeightUnitToggle}
                />
                <span className={styles.slider}></span>
              </label>
              <span
                  className={styles.unitLabel}
                  onClick={() =>
                      setFormData((p) => ({ ...p, unit2: "cm" }))
                  }
              >
              cm
            </span>
            </div>
          </div>

          {/* row8 */}
          <div className={styles.row8}>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
  );
};

export default DiagnosisAndVital;
