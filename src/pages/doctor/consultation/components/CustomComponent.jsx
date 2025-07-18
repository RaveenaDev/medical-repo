import styles from "./CustomComponent.module.scss";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const CustomComponent = ({ onConfirm, selectedComponent, existingData }) => {

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
        if (!existingData || !selectedComponent) return;

        console.log("Ex: ",existingData)
        console.log("Sel: ",selectedComponent)

        const sectionData = existingData[selectedComponent];

        if (sectionData) {
            // Prefill dynamic questions and answers
            if (Array.isArray(sectionData.dynamicQuestions)) {
                const questions = sectionData.dynamicQuestions.map(q => q.question || "");
                const answers = sectionData.dynamicQuestions.map(q => q.answer || "");
                setDynamicQuestions(questions);
                setDynamicAnswers(answers);
            }

            // Prefill image file names (mocked as URLs since File objects can't be reconstructed)
            if (Array.isArray(sectionData.images)) {
                setImages(sectionData.images.map((name, idx) => ({
                    id: `prefilled-image-${idx}`,
                    file: { name }, // dummy file object
                })));
            }

            // Prefill video file names
            if (Array.isArray(sectionData.videos)) {
                setVideos(sectionData.videos.map((name, idx) => ({
                    id: `prefilled-video-${idx}`,
                    file: { name }, // dummy file object
                })));
            }
        }
    }, [existingData, selectedComponent]);


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
                const finalData = {
                    images: images.map((img) => img.file.name),
                    videos: videos.map((vid) => vid.file.name),
                    dynamicQuestions: dynamicQuestions.map((q, i) => ({
                        question: q,
                        answer: dynamicAnswers[i] || "",
                    })),
                };

                // console.log("Final Dynamic Data: ",finalData)
                onConfirm(finalData);
            }}
        >
            <div className={styles.container1}>
                {/* row1 */}
                <div className={styles.row1}>
                    <div>
                        <p>{selectedComponent}</p>
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

                {
                    !dynamicQuestions.length > 0 && !openQuestion && (
                        <div className={styles.noQuestionMsg}>
                            <p>Please create your questions.</p>
                        </div>
                    )
                }

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

                {
                    dynamicQuestions.length > 0 && (
                    <div className={styles.row7}>
                        <button type="submit">Confirm</button>
                    </div>
                    )
                }
            </div>
        </form>
    );
};

export default CustomComponent;
