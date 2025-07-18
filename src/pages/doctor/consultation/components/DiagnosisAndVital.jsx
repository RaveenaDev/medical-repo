import styles from "./DiagnosisAndVital.module.scss";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const DiagnosisAndVital = ({ onConfirm, selectedComponent, existingData }) => {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");

  const [height, setHeight] = useState("");
  const [unit2, setUnit2] = useState("cm");
  useEffect(() => {
    const existing = existingData?.[selectedComponent];
    if (existing) {
      setFormData({
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
        dynamicAnswers: existing.dynamicQuestions?.map((q) => q.answer) || [],
      });

      setDynamicQuestions(
        existing.dynamicQuestions?.map((q) => q.question) || []
      );

      // Prefill file previews (optional)
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

  const [formData, setFormData] = useState({
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
    dynamicAnswers: [],
  });

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
    if (!openQuestion) return;

    const handleClickOutside = (event) => {
      if (questionRef.current && !questionRef.current.contains(event.target)) {
        setOpenQuestion(false);
      }
    };

    document.addEventListener("click", handleClickOutside); // changed to 'click'

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicAnswerChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.dynamicAnswers];
      updated[index] = value;
      return { ...prev, dynamicAnswers: updated };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // unique identifier
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);

    // Reset input value so same file can be re-selected
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

    // Reset input value so same file can be re-selected
    e.target.value = "";
  };

  const handleRemoveVideo = (id) => {
    setVideos((prev) => prev.filter((vid) => vid.id !== id));
  };

  const handleWeightUnitToggle = () => {
    setFormData((prev) => ({
      ...prev,
      unit: prev.unit === "kg" ? "lbs" : "kg",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dynamicAnswers, unit, weight, height, unit2, ...rest } = formData;

    const finalData = {
      ...rest,
      weight: {
        value: weight,
        unit: unit,
      },
      height: {
        value: height,
        unit: unit2,
      },
      dynamicQuestions: dynamicQuestions.map((q, i) => ({
        question: q,
        answer: dynamicAnswers[i] || "",
      })),
      images: images.map((img) => img.file.name),
      videos: videos.map((vid) => vid.file.name),
    };

    console.log("Diagnosis & Vital Submitted:", finalData);
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
              onClick={() => fileInputRef.current.click()}
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
                  e.stopPropagation(); // Stop click from bubbling to document
                  setOpenQuestion((prev) => !prev); // Toggle state
                }}
              />
              <span className={styles.tooltipText}>Text</span>
            </div>

            <div className={styles.tooltipWrapper}>
              <img
                src="/assets/Plus.svg"
                alt=""
                onClick={() =>
                  openEdit ? setOpenEdit(false) : setOpenEdit(true)
                }
              />
              <span className={styles.tooltipText}>Text</span>
            </div>

            <div
              className={styles.tooltipWrapper}
              onClick={() => videoInputRef.current.click()}
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

        {images.length > 0 && (
          <>
            <h4>Images</h4>
            <div className={styles.imagePreviewRow}>
              {images.map((img) => (
                <div key={img.id} className={styles.imageWrapper}>
                  <img
                    src={img.id}
                    alt="uploaded"
                    className={styles.uploadedImage}
                  />
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
                  <video
                    src={vid.id}
                    className={styles.uploadedVideo}
                    controls
                  />
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
            {" "}
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
                    setDynamicQuestions((prev) => [
                      ...prev,
                      questionText.trim(),
                    ]);
                    setFormData((prev) => ({
                      ...prev,
                      dynamicAnswers: [...prev.dynamicAnswers, ""],
                    }));
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        {/* Dynamic Questions*/}
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

        {/* row2 */}
        <div className={styles.row2}>
          <p className={styles.question}>
            What is your current body temperature?
          </p>
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

        {/*row4 */}
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

        {/*row5 */}
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
          <p className={styles.question}>
            How many breaths do you take per minute?
          </p>
          <input
            type="text"
            name="respirationRate"
            className={styles.input}
            value={formData.respirationRate}
            onChange={handleInputChange}
          />
        </div>
        {/* row7 */}
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
              className={`${styles.unitLabel}`}
              onClick={() => setUnit("lbs")}
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
              className={`${styles.unitLabel} `}
              onClick={() => setUnit("kg")}
            >
              KG
            </span>
          </div>
        </div>

        {/* row 7.5 */}
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
              className={`${styles.unitLabel}`}
              onClick={() => setUnit2("ft")}
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
              className={`${styles.unitLabel} `}
              onClick={() => setUnit2("cm")}
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
