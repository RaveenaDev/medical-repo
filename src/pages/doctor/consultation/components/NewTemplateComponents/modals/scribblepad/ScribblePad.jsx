import React, { useEffect, useRef, useState } from "react";
import styles from "./ScribblePad.module.scss";
import { X, Undo2, Eraser, PenLine, Trash2, Sparkles } from "lucide-react";

import { createPortal } from "react-dom";
import { formatImageWithAI } from "../../../../../../../components/State/Doctor/Action";
import { useSelector } from "react-redux";

const INITIAL_HEIGHT = 2000; // starting canvas height
const EXPAND_BY = 1000; // expand amount when near bottom
const MAX_HEIGHT = 6000;

const ScribblePad = ({ onClose, onSave, patient, doctor }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [tool, setTool] = useState("pen");
  const [penSize, setPenSize] = useState(2);
  const [strokes, setStrokes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const [aiText, setAiText] = useState("");
  const [showAIText, setShowAIText] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  const currentStroke = useRef([]);
  /* ----------------  Hospital details  ---------------- */
  const { hospital } = useSelector((state) => state.auth || {});

  const hospitalName = hospital?.name || "SAI ASHA HOSPITAL";

  const hospitalAddr =
    hospital?.address ||
    "MEDICINE / ORTHOPAEDIC / SURGERY / MATERNITY / PAEDIATRIC / DENTAL";

  const hospitalPhone =
    hospital?.phone ||
    "05, 1ST FLOOR, LAXCON PLAZA, PLOT NO.20 & 21, SECTOR-19, NERUL";

  const doctorName = doctor?.name || "Dr. ________";

  /* ---------------- Prevent Background Scroll ---------------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ---------------- Canvas Setup ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = INITIAL_HEIGHT * dpr;

    canvas.style.width = rect.width + "px";
    canvas.style.height = INITIAL_HEIGHT + "px";

    ctx.scale(dpr, dpr);

    drawBackground(ctx, canvas.width / dpr, canvas.height / dpr);
  }, []);

  /* ---------------- Background (Ruled Lines) ---------------- */
  const drawBackground = (ctx, width, height) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // ---------- HOSPITAL HEADER ----------
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    ctx.font = "bold 20px Arial";
    ctx.fillText(hospitalName, width / 2, 30);

    ctx.font = "13px Arial";
    ctx.fillText(hospitalAddr, width / 2, 50);
    ctx.fillText(hospitalPhone, width / 2, 68);

    ctx.textAlign = "left";
    ctx.font = "14px Arial";

    const startY = 100;

    ctx.fillText(`Patient Name: ${patient?.name || "-"}`, 20, startY);
    ctx.fillText(`PAT ID: ${patient?._id || "-"}`, width - 250, startY);

    ctx.fillText(`Doctor: ${doctorName}`, 20, startY + 20);
    ctx.fillText(
      `Date: ${new Date().toLocaleDateString()}`,
      width - 250,
      startY + 20,
    );

    // Separator Line
    ctx.beginPath();
    ctx.moveTo(20, startY + 35);
    ctx.lineTo(width - 20, startY + 35);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();

    // ---------- RULED LINES ----------
    const spacing = window.innerWidth <= 1024 ? 40 : 32;
    ctx.strokeStyle = "#eef2f7";

    for (let y = startY + 60; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  /* ---------------- Redraw ---------------- */
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    drawBackground(ctx, canvas.width / dpr, canvas.height / dpr);

    strokes.forEach((stroke) => {
      const pts = stroke.points;

      for (let i = 1; i < pts.length; i++) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = pts[i].size || penSize;
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [strokes]);

  /* ---------------- Auto Expand ---------------- */
  const expandCanvasIfNeeded = (y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const currentHeight = canvas.height / dpr;

    //  Stop if max height reached
    if (currentHeight >= MAX_HEIGHT) return;

    const threshold = currentHeight - 300;

    if (y > threshold) {
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const newHeight = Math.min(currentHeight + EXPAND_BY, MAX_HEIGHT);

      canvas.height = newHeight * dpr;
      canvas.style.height = newHeight + "px";

      //  Reset transform before scaling again
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.putImageData(image, 0, 0);

      redrawCanvas();
    }
  };
  /* ---------------- Drawing ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const down = (e) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);

      setIsDrawing(true);
      currentStroke.current = [getPos(e)];
    };

    const move = (e) => {
      if (!isDrawing) return;

      const pos = getPos(e);
      expandCanvasIfNeeded(pos.y);

      const pressure = e.pressure || 0.5; // fallback for mouse
      const dynamicSize = tool === "pen" ? penSize + pressure * 6 : 20;

      currentStroke.current.push({
        ...pos,
        size: dynamicSize,
      });

      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 20;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "#000";
      }

      const pts = currentStroke.current;

      if (pts.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
      ctx.lineWidth = pts[pts.length - 1].size;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const up = (e) => {
      canvas.releasePointerCapture(e.pointerId);

      if (!isDrawing) return;
      setIsDrawing(false);

      if (tool !== "eraser") {
        setStrokes((prev) => [
          ...prev,
          { points: currentStroke.current, size: penSize },
        ]);
      }
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
    };
  }, [isDrawing, tool, penSize]);

  /* ---------------- AI Conversion ---------------- */
  const convertWithAI = async () => {
    const image = canvasRef.current.toDataURL("image/jpeg", 0.7);
    const blob = await fetch(image).then((r) => r.blob());
    const formData = new FormData();
    formData.append("image", blob, "note.jpeg");

    try {
      setIsProcessingAI(true);
      const data = await formatImageWithAI(formData);

      if (data?.formattedText) {
        setAiText(data.formattedText);
        setShowAIText(true);
      } else {
        alert("AI could not read handwriting");
      }
    } catch {
      alert("AI conversion failed");
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleSave = () => {
    const image = canvasRef.current.toDataURL("image/jpeg", 0.7);
    onSave({ image, text: aiText });
  };

  useEffect(() => {
    if (!showAIText) {
      redrawCanvas();
    }
  }, [showAIText]);

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.toolbar}>
        {/* LEFT: Drawing Tools */}
        <div className={styles.toolGroup}>
          <button
            className={`${styles.toolBtn} ${
              tool === "pen" ? styles.activePen : ""
            }`}
            onClick={() => setTool("pen")}
          >
            <PenLine size={22} />
            <span>Pen</span>
          </button>

          <button
            className={`${styles.toolBtn} ${
              tool === "eraser" ? styles.activeEraser : ""
            }`}
            onClick={() => setTool("eraser")}
          >
            <Eraser size={22} />
            <span>Eraser</span>
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => setStrokes((p) => p.slice(0, -1))}
          >
            <Undo2 size={22} />
          </button>

          <button className={styles.iconBtn} onClick={() => setStrokes([])}>
            <Trash2 size={22} />
          </button>
        </div>

        {/* CENTER: Pen Size */}
        <div className={styles.sliderGroup}>
          <span>Size</span>
          <input
            type="range"
            min="1"
            max="10"
            value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
          />
        </div>

        {/* RIGHT: Actions */}
        <div className={styles.actionGroup}>
          <button
            className={styles.aiBtn}
            onClick={() => {
              if (showAIText) {
                setShowAIText(false);
              } else {
                convertWithAI();
              }
            }}
            disabled={isProcessingAI}
          >
            <Sparkles size={20} />
            {showAIText
              ? "Back to Writing"
              : isProcessingAI
              ? "Reading..."
              : "Convert"}
          </button>

          <button className={styles.doneBtn} onClick={handleSave}>
            Done
          </button>

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`${styles.canvasContainer} ${
          showAIText ? styles.aiMode : ""
        }`}
      >
        <canvas
          ref={canvasRef}
          style={{ display: showAIText ? "none" : "block" }}
        />

        {showAIText && (
          <textarea
            className={styles.aiTextFull}
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
          />
        )}
      </div>
    </div>,
    document.body,
  );
};

export default ScribblePad;
