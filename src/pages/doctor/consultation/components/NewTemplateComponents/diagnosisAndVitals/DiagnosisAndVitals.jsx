import React, { useEffect, useRef, useState } from "react";
import styles from "./DiagnosisAndVitals.module.scss";

const DiagnosisAndVitals = ({ patient, existingData, selectedComponent, onConfirm }) => {
    const [mode, setMode] = useState("text");
    const [text, setText] = useState("");
    const [formattedText, setFormattedText] = useState("");
    const [isFormatting, setIsFormatting] = useState(false);
    const [showFormatted, setShowFormatted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const isListeningRef = useRef(false);

    // Initialize with existing data if available
    useEffect(() => {
        if (existingData?.diagnosisAndVitals?.text) {
            setText(existingData.diagnosisAndVitals.text);
            if (existingData.diagnosisAndVitals.formattedText) {
                setFormattedText(existingData.diagnosisAndVitals.formattedText);
                setShowFormatted(true);
            }
        }
    }, [existingData]);

    // Keep isListeningRef in sync with isListening state
    useEffect(() => {
        isListeningRef.current = isListening;
    }, [isListening]);

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
            if (finalChunk) setText((t) => (t ? t + " " : "") + finalChunk.trim());
        };
        rec.onend = () => {
            if (isListeningRef.current) {
                try {
                    rec.start();
                } catch (err) {
                    console.error("Error restarting recognition:", err);
                }
            }
        };
        rec.onerror = (e) => {
            console.error("Speech recognition error:", e.error);
            if (e.error === "no-speech" || e.error === "aborted") {
                return;
            }
            setIsListening(false);
        };
        recognitionRef.current = rec;
        return () => {
            if (rec) {
                rec.abort();
            }
        };
    }, []);

    const toggleMic = () => {
        const rec = recognitionRef.current;
        if (!rec) {
            console.error("Speech recognition not available");
            return;
        }
        if (isListening) {
            setIsListening(false);
            rec.stop();
        } else {
            setIsListening(true);
            try {
                rec.start();
            } catch (err) {
                console.error("Error starting recognition:", err);
                setIsListening(false);
            }
        }
    };

    // AI Formatting function
    const formatTextWithAI = async () => {
        if (!text.trim()) {
            alert("Please enter some text to format");
            return;
        }

        setIsFormatting(true);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('YOUR_API_ENDPOINT/format-medical-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    patientId: patient?._id,
                    context: 'diagnosis_and_vitals'
                })
            });

            if (!response.ok) {
                throw new Error('Formatting failed');
            }

            const data = await response.json();
            setFormattedText(data.formattedText || text);
            setShowFormatted(true);
        } catch (error) {
            console.error('Error formatting text:', error);
            alert('Failed to format text. Please try again.');
        } finally {
            setIsFormatting(false);
        }
    };

    // whiteboard
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const drawingRef = useRef(false);
    const lastPosRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (mode !== "whiteboard") return;
        const canvas = canvasRef.current;
        const parent = containerRef.current;
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctxRef.current = ctx;

        // Load existing image if available
        if (existingData?.diagnosisAndVitals?.image) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, rect.width, rect.height);
            };
            img.src = existingData.diagnosisAndVitals.image;
        }
    }, [mode, existingData]);

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleDown = (e) => {
        if (mode !== "whiteboard") return;
        drawingRef.current = true;
        lastPosRef.current = getPos(e);
    };
    const handleMove = (e) => {
        if (!drawingRef.current) return;
        const ctx = ctxRef.current;
        const pos = getPos(e);
        const last = lastPosRef.current;
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastPosRef.current = pos;
    };
    const handleUp = () => (drawingRef.current = false);
    const clearBoard = () => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleConfirm = () => {
        const finalText = showFormatted ? formattedText : text;

        const diagnosisAndVitals = {
            mode: mode,
            text: mode === "text" ? finalText.trim() : (existingData?.diagnosisAndVitals?.text || ""),
            rawText: mode === "text" ? text.trim() : "", // Keep original for reference
            formattedText: mode === "text" && showFormatted ? formattedText.trim() : "",
            image: mode === "whiteboard" ? canvasRef.current.toDataURL("image/png") : (existingData?.diagnosisAndVitals?.image || null),
            timestamp: new Date().toISOString(),
            patientId: patient?._id || null
        };

        if (onConfirm) {
            onConfirm(diagnosisAndVitals);
        }
    };

    const toggleView = () => {
        setShowFormatted(!showFormatted);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headingRow}>
                <h3 className={styles.heading}>Assessments</h3>
                <div className={styles.rightButtons}>
                    {mode === "whiteboard" && (
                        <button className={styles.clearBtn} onClick={clearBoard}>
                            Clear
                        </button>
                    )}

                    {
                        mode === "text" ?
                            <div className={styles.imgBtn}
                                 onClick={() => setMode("whiteboard")}
                            >
                                <svg width="22" height="22" viewBox="0 0 27 27" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.2987 7.91891C22.9162 8.30141 22.545 8.67266 22.5338 9.04391C22.5 9.40391 22.8825 9.77516 23.2425 10.1239C23.7825 10.6864 24.3113 11.1927 24.2887 11.7439C24.2663 12.2952 23.6925 12.8689 23.1187 13.4314L18.4725 18.0889L16.875 16.4914L21.6562 11.7214L20.5763 10.6414L18.9788 12.2277L14.76 8.00891L19.08 3.70016C19.5187 3.26141 20.25 3.26141 20.6663 3.70016L23.2987 6.33266C23.7375 6.74891 23.7375 7.48016 23.2987 7.91891ZM3.375 19.4052L14.13 8.63891L18.3487 12.8577L7.59375 23.6239H3.375V19.4052Z"
                                        fill="#F2F5FF"/>
                                </svg>
                            </div>
                            :
                            <button
                                className={styles.toggleBtn}
                                onClick={() => setMode("text")}
                            >
                                Text
                            </button>
                    }
                </div>
            </div>

            {mode === "text" ? (
                <div className={styles.textContainer}>
                    {showFormatted && formattedText && (
                        <div className={styles.viewToggle}>
                            <button
                                className={styles.viewToggleBtn}
                                onClick={toggleView}
                            >
                                {showFormatted ? "View Raw Text" : "View Formatted Text"}
                            </button>
                        </div>
                    )}

                    <textarea
                        className={styles.textArea}
                        placeholder="Type here or use mic..."
                        value={showFormatted ? formattedText : text}
                        onChange={(e) => showFormatted ? setFormattedText(e.target.value) : setText(e.target.value)}
                    />

                    <div className={styles.bottomButtons}>
                        {
                            isListening ?
                                <button
                                    className={`${styles.btn} ${styles.micBtn}`}
                                    onClick={toggleMic}
                                >
                                    Stop Mic
                                </button>
                                :
                                <div style={{cursor:'pointer', padding:0, margin:0, height:'2rem'}} onClick={toggleMic}>
                                    <svg width="50" height="40" viewBox="0 0 60 56" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.199219" width="60" height="55.6077" rx="27.8038" fill="#25307F"/>
                                        <path
                                            d="M29.9994 31.1719C28.6799 31.1719 27.5584 30.7101 26.6348 29.7865C25.7112 28.8628 25.2494 27.7413 25.2494 26.4219V16.9219C25.2494 15.6024 25.7112 14.4809 26.6348 13.5573C27.5584 12.6337 28.6799 12.1719 29.9994 12.1719C31.3188 12.1719 32.4403 12.6337 33.3639 13.5573C34.2875 14.4809 34.7494 15.6024 34.7494 16.9219V26.4219C34.7494 27.7413 34.2875 28.8628 33.3639 29.7865C32.4403 30.7101 31.3188 31.1719 29.9994 31.1719ZM28.416 42.2552V37.3865C25.6716 37.017 23.4021 35.7899 21.6077 33.7052C19.8132 31.6205 18.916 29.1927 18.916 26.4219H22.0827C22.0827 28.6122 22.8548 30.4794 24.3991 32.0237C25.9434 33.568 27.8101 34.3396 29.9994 34.3385C32.1886 34.3375 34.0559 33.5653 35.6012 32.0221C37.1465 30.4789 37.9181 28.6122 37.916 26.4219H41.0827C41.0827 29.1927 40.1855 31.6205 38.391 33.7052C36.5966 35.7899 34.3271 37.017 31.5827 37.3865V42.2552H28.416Z"
                                            fill="white"/>
                                    </svg>
                                </div>
                        }

                        {!showFormatted && text.trim() && (
                            <button
                                className={`${styles.btn} ${styles.formatBtn}`}
                                onClick={formatTextWithAI}
                                disabled={isFormatting}
                            >
                                {isFormatting ? "Formatting..." : "Format with AI"}
                            </button>
                        )}

                        <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.whiteboardWrapper}>
                    <div className={styles.whiteboard} ref={containerRef}>
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleDown}
                            onMouseMove={handleMove}
                            onMouseUp={handleUp}
                        />
                    </div>
                    <div className={styles.bottomButtons}>
                        <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiagnosisAndVitals;