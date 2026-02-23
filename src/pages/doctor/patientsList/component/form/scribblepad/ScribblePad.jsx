import React, { useEffect, useRef, useState } from "react";
import styles from "./ScribblePad.module.scss";
import { X, Undo2, Eraser, PenLine, Trash2, Sparkles } from "lucide-react";
import { formatImageWithAI } from "../../../../../../components/State/Doctor/Action";
import { createPortal } from "react-dom";

const INITIAL_HEIGHT = 2000; // starting canvas height
const EXPAND_BY = 1000; // expand amount when near bottom

const ScribblePad = ({ onClose, onSave }) => {
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

    const spacing = window.innerWidth <= 1024 ? 40 : 32;

    ctx.strokeStyle = "#eef2f7";
    ctx.lineWidth = 1;

    for (let y = 60; y < height; y += spacing) {
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

    const threshold = canvas.height - 300 * dpr;

    if (y * dpr > threshold) {
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.height += EXPAND_BY * dpr;
      canvas.style.height = parseInt(canvas.style.height) + EXPAND_BY + "px";

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
      const scrollTop = containerRef.current.scrollTop;

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + scrollTop,
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
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await fetch(image).then((r) => r.blob());
    const formData = new FormData();
    formData.append("image", blob, "note.png");

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
    const image = canvasRef.current.toDataURL("image/png");
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
