import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./DynamicFormSection.module.scss";

const DynamicFormSection = ({ section, onConfirm, existingData }) => {
    const [formData, setFormData] = useState({});
    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [openQuestion, setOpenQuestion] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const questionRef = useRef();
    //
    // useEffect(() => {
    //     if (existingData) {
    //         setFormData(existingData);
    //         setDynamicQuestions(existingData.dynamicQuestions || []);
    //     }
    // }, [existingData]);

    useEffect(() => {
        if (!existingData || !section?.fields) return;

        const sectionSpecificData = existingData[section.name];

        // console.log("Section Data: ", section);
        // console.log("Matched Existing Data: ", sectionSpecificData);

        if (sectionSpecificData) {
            const mappedFormData = {};

            section.fields.forEach((field) => {
                const answer = sectionSpecificData[field.question];
                if (answer !== undefined) {
                    mappedFormData[field.id] = answer;
                }
            });

            setFormData(mappedFormData);
            setDynamicQuestions(sectionSpecificData.dynamicQuestions || []);

            setImages((sectionSpecificData.images || []).map((fileName) => ({
                id: fileName,
                file: { name: fileName }
            })));

            setVideos((sectionSpecificData.videos || []).map((fileName) => ({
                id: fileName,
                file: { name: fileName }
            })));
        }
    }, [existingData, section]);

    useEffect(() => {
        if (!openQuestion) return;
        const handleClickOutside = (e) => {
            if (questionRef.current && !questionRef.current.contains(e.target)) {
                setOpenQuestion(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [openQuestion]);

    const handleChange = (id, value) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleChecklistToggle = (fieldId, option) => {
        setFormData((prev) => {
            const prevSelected = prev[fieldId] || [];
            return {
                ...prev,
                [fieldId]: prevSelected.includes(option)
                    ? prevSelected.filter((item) => item !== option)
                    : [...prevSelected, option],
            };
        });
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


    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert formData keys (ids) to readable field questions
        const readableData = {};
        section.fields.forEach((field) => {
            const answer = formData[field.id];
            if (answer !== undefined) {
                readableData[field.question] = answer;
            }
        });

        const finalData = {
            ...readableData,
            dynamicQuestions,
            images: images.map((img) => img.file.name),   // extract File objects
            videos: videos.map((vid) => vid.file.name),   // extract File objects
        };

        console.log("Submitted Form Data:", finalData);
        onConfirm(finalData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container1}>
                {/* row1 */}
                <div className={styles.row1}>
                    <div>
                        <p>{section?.name || "Untitled Section"}</p>
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
                                onClick={() => setEditMode((prev) => !prev)}
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

                                {editMode && (
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

                {/* Static Fields */}
                {section.fields.map((field) => (
                    <div className={styles.row2} key={field.id}>
                        <p className={styles.question}>{field.question}</p>

                        {field.type === "text" || field.type === "multiline" ? (
                            <input
                                className={styles.input}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                        ) : null}

                        {field.type === "textarea" && (
                            <textarea
                                className={styles.input}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ""}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                        )}

                        {field.type === "radio" && (
                            <div className={styles.customRadios}>
                                {field.options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name={field.id}
                                            value={option}
                                            checked={formData[field.id] === option}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        />
                                        <span
                                            className={`${styles.circle1} ${
                                                formData[field.id] === option ? styles.checked1 : ""
                                            }`}
                                        >
                                          {formData[field.id] === option && (
                                              <img
                                                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                                                  alt="check"
                                                  width={14}
                                                  height={14}
                                              />
                                          )}
                                        </span>
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}


                        {field.type === "checklist" && (
                            <div className={styles.options}>
                                {field.options.map((option, i) => (
                                    <button
                                        type="button"
                                        key={i}
                                        className={`${styles.optionBtn} ${
                                            formData[field.id]?.includes(option)
                                                ? styles.selected
                                                : ""
                                        }`}
                                        onClick={() => handleChecklistToggle(field.id, option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {field.type === "dropdown" && (
                            <div className={styles.dropdownWrapper}>
                                <select
                                    className={styles.dropdown}
                                    value={formData[field.id] || ""}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    {field.options.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                    </div>
                ))}

                <div className={styles.row7}>
                    <button type="submit" className={styles.submitButton}>
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DynamicFormSection;
