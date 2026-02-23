import React, { useEffect, useRef, useState } from "react";
import styles from "./UpdateProgress.module.scss";
import { X, Trash2, PenLine, Eraser, Mic } from "lucide-react";
import {
  addProgressTrackerPhase,
  formatImageWithAI,
  formatWithAI,
  getAllDoctors,
  getPatientDetailsByID,
} from "../../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";
import ScribblePad from "./scribblepad/ScribblePad";

const UpdateProgress = ({ onClose, patientId, caseId }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
  const [isFinalPhase, setIsFinalPhase] = useState(false);

  const [selectedPhase, setSelectedPhase] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAIText, setShowAIText] = useState(false);
  const [isDoctorVisit, setIsDoctorVisit] = useState(false);
  const [visitTime, setVisitTime] = useState("");
  const [visitNote, setVisitNote] = useState("");

  const todayISO = new Date().toISOString().split("T")[0];

  const [saving, setSaving] = useState(false); //  loader state

  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      name: file.name,
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
    //  critical: clear the input so selecting the same file again triggers onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview); // cleanup
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (!selectedPhase || !doctor || !date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true); //  start loader

      const form = new FormData();
      form.append("caseId", caseId);
      form.append("patient", patientId);
      form.append("title", selectedPhase);
      form.append("date", date);
      form.append("assignedDoctor", doctor);
      if (isFinalPhase) form.append("isFinalPhase", "true");
      form.append("description", description || "");
      const dataPayload = {};

      if (isDoctorVisit) {
        if (!visitTime) {
          alert("Please select visit time");
          setSaving(false);
          return;
        }

        dataPayload.doctorVisit = {
          doctor: doctor, // from existing Assigned Doctor
          date: date, // from existing Date of Activity
          time: visitTime,
          note: visitNote || "",
        };
      }

      if (Object.keys(dataPayload).length > 0) {
        form.append("data", JSON.stringify(dataPayload));
      }
      if (scribbleImage) {
        const blob = await fetch(scribbleImage).then((r) => r.blob());
        form.append("files", blob, "progress-handwriting.png");
      }

      selectedFiles.forEach((item) => {
        form.append("files", item.file, item.file.name);
      });

      await dispatch(addProgressTrackerPhase(form, patientId, caseId)); // waits for thunk to finish
      dispatch(getPatientDetailsByID(patientId));
      onClose(); // close after success (toast handled in action)
    } catch (err) {
      // errors are already logged in the action; show a basic alert here if you want
      console.error(err);
    } finally {
      setSaving(false); //  stop loader
    }
  };

  const doctors = useSelector((store) => store.doctor.allDoctors);

  // ScribbleInput component code

  const [descMode, setDescMode] = useState("text"); // text | whiteboard
  const [scribbleImage, setScribbleImage] = useState(null);
  const [aiDescription, setAiDescription] = useState("");
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [showScribbleModal, setShowScribbleModal] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (!showScribbleModal) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      // Store CSS size
      canvasSizeRef.current = {
        width: rect.width,
        height: rect.height,
      };

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resize();
    // Restore previous scribble if exists
    if (scribbleImage) {
      redrawCanvasFromImage(scribbleImage);
    }

    window.addEventListener("resize", resize);

    let drawing = false;
    let last = { x: 0, y: 0 };

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const start = (e) => {
      drawing = true;
      last = getPos(e);
    };

    const draw = (e) => {
      if (!drawing) return;
      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      last = pos;
    };

    const stop = () => {
      drawing = false;
      setScribbleImage(canvas.toDataURL("image/png"));
    };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointerleave", stop);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", start);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stop);
      canvas.removeEventListener("pointerleave", stop);
    };
  }, [showScribbleModal]);

  const convertScribbleToText = async () => {
    if (!scribbleImage) {
      alert("Please write something first");
      return;
    }

    setIsAIProcessing(true);
    try {
      const blob = await fetch(scribbleImage).then((r) => r.blob());
      const formData = new FormData();
      formData.append("image", blob, "progress.png");

      const data = await formatImageWithAI(formData);

      if (data?.formattedText) {
        setDescription(data.formattedText);
        setAiDescription(data.formattedText);
        setShowAIText(true);
      } else {
        alert("AI could not read handwriting");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to process handwriting");
    } finally {
      setIsAIProcessing(false);
    }
  };

  const redrawCanvasFromImage = (imageSrc) => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    const { width, height } = canvasSizeRef.current;

    img.onload = () => {
      // Clear in CSS pixel space
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Re-apply DPR scaling
      const dpr = window.devicePixelRatio || 1;
      ctx.scale(dpr, dpr);

      // Draw using CSS size
      ctx.drawImage(img, 0, 0, width, height);
    };

    img.src = imageSrc;
  };
  // MIC
  const [showMicModal, setShowMicModal] = useState(false);
  const [micText, setMicText] = useState("");
  const [formattedMicText, setFormattedMicText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isFormattingMic, setIsFormattingMic] = useState(false);
  const [showFormattedMic, setShowFormattedMic] = useState(false);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onresult = (e) => {
      let finalChunk = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalChunk += transcript + " ";
      }

      if (finalChunk) {
        setMicText((prev) =>
          prev ? prev + " " + finalChunk.trim() : finalChunk.trim(),
        );
      }
    };

    rec.onend = () => {
      if (isListeningRef.current) {
        try {
          rec.start();
        } catch (err) {
          console.error(err);
        }
      }
    };

    rec.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
    };

    recognitionRef.current = rec;

    return () => rec.abort();
  }, []);
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);
  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) return;

    if (isListening) {
      setIsListening(false);
      rec.stop();
    } else {
      setIsListening(true);
      try {
        rec.start();
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };
  const formatMicWithAI = async () => {
    if (!micText.trim()) {
      alert("Please record something first");
      return;
    }

    setIsFormattingMic(true);

    try {
      const data = await formatWithAI({ rawText: micText });

      if (data?.formattedText) {
        setFormattedMicText(data.formattedText);
        setShowFormattedMic(true);
      } else {
        alert("Formatting failed.");
      }
    } catch (err) {
      console.error(err);
      alert("AI formatting failed.");
    } finally {
      setIsFormattingMic(false);
    }
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Update Progress tracker</h1>

        <div className={styles.row1}>
          {/* Select Phase */}
          <div>
            <p className={styles.label}>Phase</p>
            <input
              type="text"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className={styles.textInput}
              style={{ border: "1px solid #cfcfcf" }}
              placeholder="Enter Phase"
            />
          </div>

          {/* Date of Activity */}
        </div>

        <div className={styles.row1}>
          <div className={styles.dateField}>
            <p className={styles.label}>Date of Activity</p>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                value={date}
                min={todayISO}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          {/* Assigned Doctor */}
          <div>
            <p className={styles.label}>Assigned Doctor</p>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={styles.textInput}
              style={{
                border: "1px solid #cfcfcf",
                padding: "1vh",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Doctor</option>
              {doctors?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isFinalPhase}
              onChange={(e) => setIsFinalPhase(e.target.checked)}
            />
            Mark this as the final stage of treatment
          </label>
        </div>
        {/* DOCTOR VISIT  */}
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isDoctorVisit}
              onChange={(e) => setIsDoctorVisit(e.target.checked)}
            />
            This phase is a Doctor Visit
          </label>
        </div>
        {isDoctorVisit && (
          <div className={styles.doctorVisitBox}>
            {/* Time */}
            <div>
              <p className={styles.label}>Visit Time</p>
              <input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className={styles.textInput}
                required
              />
            </div>

            {/* Note */}
            <div>
              <p className={styles.label}>Visit Note</p>
              <textarea
                className={styles.textarea}
                placeholder="e.g. Morning round, Post-op check, ICU visit"
                value={visitNote}
                onChange={(e) => setVisitNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        <div className={styles.row3}>
          {/* Description */}
          <div className={styles.descriptionContainer}>
            <div className={styles.descHeader}>
              <p className={styles.label}>Description</p>

              <div className={styles.btnGroup}>
                <button
                  className={styles.scribbleBtn}
                  onClick={() => {
                    setDescMode("whiteboard");
                    setShowScribbleModal(true);
                  }}
                >
                  <PenLine size={16} />
                </button>
                <button
                  className={styles.scribbleBtn}
                  onClick={() => {
                    setDescMode("mic");
                    setShowMicModal(true);
                  }}
                >
                  <Mic size={16} />
                </button>
              </div>
            </div>

            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter progress description..."
              rows={5}
            />
          </div>

          <div className={styles.uploadedFiles}>
            <div className={styles.uploadFilesContainer}>
              <h6 className={styles.label}>Upload Files</h6>

              <div className={styles.uploadBox}>
                <p className={styles.uploadPrompt}>
                  Choose a file or drag & drop it here
                </p>
                <span className={styles.uploadHint}>
                  JPEG, PNG, PDG upto 10 MB
                </span>

                <label className={styles.browseBtn}>
                  Browse File
                  <input
                    ref={fileInputRef} // 👈 attach ref
                    type="file"
                    multiple
                    className={styles.hiddenFileInput}
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <ul className={styles.uploadedFilesWrapper}>
                {/* Render newly uploaded files (selectedFiles state) */}
                {selectedFiles.map((item, idx) => (
                  <li key={`new-${idx}`} className={styles.fileRow}>
                    <img
                      src="/assets/fileIcon.svg"
                      alt="PDF icon"
                      className={styles.fileIcon}
                    />
                    <div className={styles.fileDetails}>
                      <a
                        href={item.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.fileName}
                      >
                        {item.name}
                      </a>
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
        </div>
        {/* Save Button */}
        <div style={{ marginTop: "2vh", textAlign: "center" }}>
          <button
            className={styles.saveBtn}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className={styles.loader} aria-hidden />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      {showScribbleModal && (
        <ScribblePad
          onClose={() => setShowScribbleModal(false)}
          onSave={({ image, text }) => {
            setScribbleImage(image);
            if (text) setDescription(text);
            setShowScribbleModal(false);
          }}
        />
      )}
      {showMicModal && (
        <div className={styles.scribbleModalOverlay}>
          <div className={styles.scribbleModal}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h3>Record Progress</h3>
              <X
                size={20}
                className={styles.closeIcon}
                onClick={() => {
                  setShowMicModal(false);
                  setIsListening(false);
                }}
              />
            </div>

            {/* Body */}
            <div className={styles.modalCanvasWrapper}>
              <textarea
                className={styles.aiTextArea}
                value={showFormattedMic ? formattedMicText : micText}
                onChange={(e) =>
                  showFormattedMic
                    ? setFormattedMicText(e.target.value)
                    : setMicText(e.target.value)
                }
                placeholder="Speak or edit text here..."
              />
            </div>

            {/* Footer */}
            <div className={styles.modalActions}>
              {/* Mic Button */}
              <button className={styles.secondaryBtn} onClick={toggleMic}>
                {isListening ? "Stop Mic" : "Start Mic"}
              </button>

              {/* Format Button */}
              {!showFormattedMic && micText && (
                <button
                  className={styles.aiBtn}
                  onClick={formatMicWithAI}
                  disabled={isFormattingMic}
                >
                  {isFormattingMic ? "Formatting..." : "Format with AI"}
                </button>
              )}

              {/* Toggle Raw / AI */}
              {formattedMicText && (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setShowFormattedMic(!showFormattedMic)}
                >
                  {showFormattedMic ? "View Raw Text" : "View AI Result"}
                </button>
              )}

              {/* Done */}
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  const finalText = showFormattedMic
                    ? formattedMicText
                    : micText;

                  setDescription(finalText);
                  setShowMicModal(false);
                  setShowFormattedMic(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProgress;
