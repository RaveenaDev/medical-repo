import styles from "./CurrentMedication.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const CurrentMedication = ({ onConfirm }) => {
  const [frequency1, setFrequency1] = useState("");
  const [frequency2, setFrequency2] = useState("");

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
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
    >
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Current Medication</p>
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
                  e.stopPropagation(); // prevent bubbling up to document click
                  setOpenQuestion((prev) => !prev);
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
                    onClick={() =>
                      setDynamicQuestions((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
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
              />
            </div>
          ))}
        </div>

        {/* row2 */}
        <div className={styles.row2}>
          <p className={styles.question}>
            Are you currently taking any heart-related medications?
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row3 */}
        <div className={styles.row3}>
          <div>
            <p className={styles.question}>Dosage:</p>
            <input
              type="text"
              className={styles.inputSmall}
              placeholder="ex. 25.00"
            />
          </div>
          <div>
            <p className={styles.question}>Frequency:</p>
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="weekly"
                  checked={frequency1 === "weekly"}
                  onChange={() => setFrequency1("weekly")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency1 === "weekly" ? styles.checked : ""
                  }`}
                >
                  {frequency1 === "weekly" && (
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
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  checked={frequency1 === "daily"}
                  onChange={() => setFrequency1("daily")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency1 === "daily" ? styles.checked : ""
                  }`}
                >
                  {frequency1 === "daily" && (
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
          </div>
        </div>

        {/* row4 */}
        <div className={styles.row4}>
          <p className={styles.question}>New Medication Prescribed:</p>
          <input type="text" className={styles.input} placeholder="" />
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <div>
            <p className={styles.question}>Dosage:</p>
            <input
              type="text"
              className={styles.inputSmall}
              placeholder="ex. 25.00"
            />
          </div>
          <div>
            <p className={styles.question}>Frequency:</p>
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  checked={frequency2 === "weekly"}
                  onChange={() => setFrequency2("weekly")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency2 === "weekly" ? styles.checked : ""
                  }`}
                >
                  {frequency2 === "weekly" && (
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
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  checked={frequency2 === "daily"}
                  onChange={() => setFrequency2("daily")}
                />
                <span
                  className={`${styles.circle} ${
                    frequency2 === "daily" ? styles.checked : ""
                  }`}
                >
                  {frequency2 === "daily" && (
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
          </div>
        </div>

        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.questionBlue}>Next Appointment Scheduled?</p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row7 */}
        <div className={styles.row7}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default CurrentMedication;
