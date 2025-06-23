import styles from "./DiagnosisAndVital.module.scss";
import { Image, Type, Plus, SquarePlay } from "lucide-react";
import {useRef, useState} from "react";
const DiagnosisAndVital = ({ onConfirm }) => {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");

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
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
    >
      <div className={styles.container1}>
        {/* row1 */}
        <div className={styles.row1}>
          <div>
            <p>Diagnosis and Vital</p>
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
          <p className={styles.question}>
            What is your current body temperature?
          </p>
          <input type="text" className={styles.input}/>
        </div>

        {/* row3 */}
        <div className={styles.row3}>
          <div className={styles.row3LeftContainer}>
            <p className={styles.question}>Enter your Blood Pressure reading</p>
          </div>
          <div className={styles.row3RightContainer}>
            <div className={styles.row3Right}>
              <p className={styles.row3p}>Diastolic</p>
              <input />
              <p>mmHg</p>
            </div>
            <div className={styles.row3Right}>
              <p className={styles.row3p}>Systolic</p>
              <input />
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
            <input type="text" className={styles.input2} />
            <p className={styles.row4Unit}>BPM</p>
          </div>
        </div>

        {/*row5 */}
        <div className={styles.row4}>
          <div className={styles.row4LeftContainer}>
            <p>What is your oxygen level (SpO2)? </p>
          </div>
          <div className={styles.row4RightContainer}>
            <input type="text" className={styles.input2} />
            <p className={styles.row4Unit}>%</p>
          </div>
        </div>
        {/* row6 */}
        <div className={styles.row6}>
          <p className={styles.question}>
            How many breaths do you take per minute?
          </p>
          <input type="text" className={styles.input} />
        </div>
        {/* row7 */}
        <div className={styles.weightRow}>
          <div className={styles.weightRowLeftContainer}>
            <p className={styles.question}>Enter your weight</p>
          </div>
          <div>
            <input
              type="number"
              className={styles.weightInput}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
                checked={unit === "kg"}
                onChange={() => setUnit(unit === "kg" ? "lbs" : "kg")}
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

        {/* row8 */}
        <div className={styles.row8}>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default DiagnosisAndVital;
