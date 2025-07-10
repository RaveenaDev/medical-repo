import { Cross, X } from "lucide-react";
import styles from "./MedicalHistory.module.scss";

import { useEffect, useRef, useState } from "react";

const CONDITIONS = [
  "Hypertension",
  "Heart failure",
  "Irregular heartbeat",
  "Asthma",
  "Diabetes",
  "Peripheral Artery Disease",
  "Heart attack",
];

export const MedicalHistory = ({ patient, onConfirm }) => {
  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({
    smoke: "",
    alcohol: "",
    heartSurgery: "",
    diagnosticTests: "",
    otherCondition: "",
    visitReason: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleToggle = (condition) => {
    setSelected((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const videoInputRef = useRef(null);

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

  return (
    <form
      className={styles.medicalHistory}
      onSubmit={(e) => {
        e.preventDefault();

        // Combine selected conditions and otherCondition if filled
        const selectedConditions = [
          ...selected,
          ...(formData.otherCondition.trim() ? [formData.otherCondition.trim()] : []),
        ];

        // Remove `otherCondition` from formData before submission
        const { otherCondition, ...restFormData } = formData;

        const finalData = {
          ...restFormData,
          selectedConditions,
          dynamicQuestions: dynamicQuestions,
          images: images.map((img) => img.file.name),
          videos: videos.map((vid) => vid.file.name),
        };

        // console.log("Submitted Medical History Form:", finalData);

        onConfirm(finalData);
      }}
    >
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Medical History</p>
          </div>
          <div className={styles.attachments}>
            <div
                className={styles.tooltipWrapper}
                onClick={() => fileInputRef.current.click()}
            >
              <img src="/assets/gallery-icon.svg" alt=""/>
              <span className={styles.tooltipText}>Image</span>
              <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  style={{display: "none"}}
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
              <span className={styles.tooltipText}>Edit</span>
            </div>

            <div
                className={styles.tooltipWrapper}
                onClick={() => videoInputRef.current.click()}
            >
              <img src="/assets/video-icon.svg" alt=""/>
              <span className={styles.tooltipText}>Video</span>
              <input
                  type="file"
                  accept="video/*"
                  multiple
                  ref={videoInputRef}
                  style={{display: "none"}}
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
                        const trimmed = questionText.trim();
                        if (trimmed) {
                          setDynamicQuestions((prev) => [
                            ...prev,
                            {question: trimmed, answer: ""},
                          ]);
                          setQuestionText(""); // optional: reset input
                          setOpenQuestion(false); // close the box
                        }
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
          {dynamicQuestions.map((item, index) => (
              <div key={index} className={styles.dynamicQuestion}>
                <div className={styles.questionHeader}>
                  <p className={styles.question}>{item.question}</p>

                  {openEdit && (
                      <button
                          type="button"
                          onClick={() =>
                              setDynamicQuestions((prev) => prev.filter((_, i) => i !== index))
                          }
                          className={styles.removeButton}
                      >
                        <X/>
                      </button>
                  )}
                </div>

                <input
                    type="text"
                    className={styles.input}
                    placeholder="Please specify"
                    value={item.answer}
                    onChange={(e) => {
                      const newQuestions = [...dynamicQuestions];
                      newQuestions[index].answer = e.target.value;
                      setDynamicQuestions(newQuestions);
                    }}
                />
              </div>
          ))}
        </div>

        {/* row2 */}
        <div className={styles.row2}>
          <input
              className={styles.input}
              type="text"
              name="visitReason" // ✅ Match with the state key
              placeholder="Please describe the reason for your visit"
              value={formData.visitReason}
              onChange={handleChange} // ✅ Reuse the same handler
          />
        </div>

        {/* row3 */}
        <div className={styles.row3}>
          <p className={styles.question}>
            Have you had heart surgery or procedures? (e.g., stents, bypass
            surgery)
          </p>
          <input
              type="text"
              name="heartSurgery"
              className={styles.input}
              placeholder="If yes, Please specify"
              value={formData.heartSurgery}
              onChange={handleChange}
          />
        </div>

        {/* row4 */}
        <div className={styles.row4}>
          <p className={styles.question}>
            Have you had any diagnostic tests related to your current condition?
          </p>
          <input
              type="text"
              name="diagnosticTests"
              className={styles.input}
              placeholder="If yes, Please specify"
              value={formData.diagnosticTests}
              onChange={handleChange}
          />
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <div>
            <p className={styles.question}>Do you have any allergies?</p>
            <input
                type="text"
                name="allergies" // ✅ Add name
                placeholder="If yes, Please specify"
                value={formData.allergies} // ✅ Controlled value
                onChange={handleChange} // ✅ Universal change handler
            />
          </div>

          <div>
            <p className={styles.question}>Do you smoke?</p>
            <div className={styles.customRadios}>
              <label>
                <input
                    type="radio"
                    name="smoke"
                    value="yes"
                    checked={formData.smoke === "yes"}
                    onChange={handleChange}
                />
                <span
                    className={`${styles.circle} ${
                        formData.smoke === "yes" ? styles.checked : ""
                    }`}
                >
                  {formData.smoke === "yes" && (
                      <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                          alt="Checked Icon"
                          width={24}
                          height={24}
                      />
                  )}
                </span>
                Yes
              </label>
              <label>
                <input
                    type="radio"
                    name="smoke"
                    value="no"
                    checked={formData.smoke === "no"}
                    onChange={handleChange}
                />
                <span
                    className={`${styles.circle} ${
                        formData.smoke === "no" ? styles.checked : ""
                    }`}
                >
                  {formData.smoke === "no" && (
                      <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                          alt="Checked Icon"
                          width={24}
                          height={24}
                      />
                  )}
                </span>
                No
              </label>
            </div>
          </div>

          <div>
            <p className={styles.question}>Do you drink alcohol?</p>
            <div className={styles.customRadios}>
              <label>
                <input
                    type="radio"
                    name="alcohol"
                    value="yes"
                    checked={formData.alcohol === "yes"}
                    onChange={handleChange}
                />
                <span
                    className={`${styles.circle} ${
                        formData.alcohol === "yes" ? styles.checked : ""
                    }`}
                >
                  {formData.alcohol === "yes" && (
                      <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                          alt="Checked Icon"
                          width={24}
                          height={24}
                      />
                  )}
                </span>
                Yes
              </label>
              <label>
                <input
                    type="radio"
                    name="alcohol"
                    value="no"
                    checked={formData.alcohol === "no"}
                    onChange={handleChange}
                />
                <span
                    className={`${styles.circle} ${
                        formData.alcohol === "no" ? styles.checked : ""
                    }`}
                >
                  {formData.alcohol === "no" && (
                      <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                          alt="Checked Icon"
                          width={24}
                          height={24}
                      />
                  )}
                </span>
                No
              </label>
            </div>
          </div>
        </div>

        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.question}>
            Do you have a history of any of the following conditions? (Check all
            that apply)
          </p>
          <div className={styles.options}>
            {CONDITIONS.map((condition) => (
                <button
                    type="button"
                    key={condition}
                    className={`${styles.optionBtn} ${
                        selected.includes(condition) ? styles.selected : ""
                    }`}
                    onClick={() => handleToggle(condition)}
                >
                  {condition}
                </button>
            ))}
            <input
                className={styles.otherInput}
                name="otherCondition"
                placeholder="Other (Please specify):"
                value={formData.otherCondition}
                onChange={handleChange}
            />
          </div>
        </div>

        {/* row7 */}
        <div className={styles.row7}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};
