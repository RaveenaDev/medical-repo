import styles from "./MedicalHistory.module.scss";

import {useRef, useState} from "react";

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
  const [smoke, setSmoke] = useState("");
  const [alcohol, setAlcohol] = useState("");

  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState("");

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
        onConfirm();
      }}
    >
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Medical History</p>
          </div>
          <div className={styles.attachments}>
              <div className={styles.tooltipWrapper} onClick={() => fileInputRef.current.click()}>
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
                  <img src="/assets/formkit-icon.svg" alt=""/>
                  <span className={styles.tooltipText}>Text</span>
              </div>

              <div className={styles.tooltipWrapper}>
                  <img src="/assets/Plus.svg" alt=""/>
                  <span className={styles.tooltipText}>Add</span>
            </div>

              <div className={styles.tooltipWrapper} onClick={() => videoInputRef.current.click()}>
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
                              <img src={img.id} alt="uploaded" className={styles.uploadedImage}/>
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
                              <video src={vid.id} className={styles.uploadedVideo} controls/>
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

          {/* row2 */}
          <div className={styles.row2}>
              <input
                  className={styles.input}
                  type="text"
                  placeholder="Please describe the reason for your visit"
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
                  className={styles.input}
                  placeholder="If yes, Please specify"
              />
          </div>

          {/* row4 */}
          <div className={styles.row4}>
          <p className={styles.question}>
            Have you had any diagnostic tests related to your current condition?
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="If yes, Please specify"
          />
        </div>

        {/* row5 */}
        <div className={styles.row5}>
          <div>
            <p className={styles.question}>Do you have any allergies?</p>
            <input type="text" placeholder="If yes, Please specify" />
          </div>

          <div>
            <p className={styles.question}>Do you smoke?</p>
            <div className={styles.customRadios}>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="yes"
                  checked={smoke === "yes"}
                  onChange={() => setSmoke("yes")}
                />
                <span
                  className={`${styles.circle} ${
                    smoke === "yes" ? styles.checked : ""
                  }`}
                >
                  {smoke === "yes" && (
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
                  checked={smoke === "no"}
                  onChange={() => setSmoke("no")}
                />
                <span
                  className={`${styles.circle} ${
                    smoke === "no" ? styles.checked : ""
                  }`}
                >
                  {smoke === "no" && (
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
                  checked={alcohol === "yes"}
                  onChange={() => setAlcohol("yes")}
                />
                <span
                  className={`${styles.circle} ${
                    alcohol === "yes" ? styles.checked : ""
                  }`}
                >
                  {alcohol === "yes" && (
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
                  checked={alcohol === "no"}
                  onChange={() => setAlcohol("no")}
                />
                <span
                  className={`${styles.circle} ${
                    alcohol === "no" ? styles.checked : ""
                  }`}
                >
                  {alcohol === "no" && (
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
              placeholder="Other (Please specify):"
              value={other}
              onChange={(e) => setOther(e.target.value)}
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
