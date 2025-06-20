import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const DoctorNotesPopup = ({
  anchorRef,
  onClose,
  onAdd,
  disableAdd,
  popupRef,
  customStyle = {},
}) => {
  const [position, setPosition] = useState({ top: 100, left: 0 });
  const editorRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
  });

  useEffect(() => {
    const updateActiveFormats = () => {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      });
    };

    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  const getButtonStyle = (format) => ({
    ...toolbarButtonStyle,
    backgroundColor: activeFormats[format] ? "#e0e7ff" : "transparent", // light blue for active
    border: activeFormats[format] ? "1px solid #25307F" : "none",
  });
  useEffect(() => {
    const editor = editorRef.current;
    const observer = new MutationObserver(() => {
      if (editor.innerHTML === "<br>") {
        editor.innerHTML = "";
      }
    });

    observer.observe(editor, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculatePosition = () => {
      if (!anchorRef.current) return;

      const rect = anchorRef.current.getBoundingClientRect();
      const popupHeight = 366;
      const popupWidth = 315;
      const padding = 20;

      let top = rect.bottom;
      let left = rect.left + 200;

      if (top + popupHeight > window.innerHeight) {
        top = rect.top - popupHeight;
      }

      if (top < 0) top = 0;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - padding;
      }

      setPosition({ top, left });
    };

    calculatePosition();

    const handleClickOutside = (e) => {
      if (
        !anchorRef.current?.contains(e.target) &&
        !e.target.closest(".popup-note")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", calculatePosition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [anchorRef, onClose]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) execCommand("insertImage", url);
  };

  const toolbarButtonStyle = {
    background: "transparent",
    border: "none",
    fontSize: "16px",
    padding: "4px 6px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const defaultStyle = {
    position: "fixed",
    bottom: `${position.top - 60}px`,
    left: `${position.left + 10}px`,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    width: "315px",
    height: "366px",
    zIndex: 9999999,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 15px -5px #25307F66",
  };

  return ReactDOM.createPortal(
    <div
      ref={popupRef}
      className="popup-note"
      style={{ ...defaultStyle, ...customStyle }}
    >
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#25307F",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              if (!disableAdd) {
                onAdd();
              }
            }}
          >
            ＋
          </span>
          <span
            style={{
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5564 4.65756C11.5564 4.86196 11.5162 5.06438 11.4381 5.25325C11.3599 5.44212 11.2453 5.61374 11.1008 5.75832C10.9563 5.9029 10.7848 6.01761 10.596 6.09589C10.4072 6.17417 10.2048 6.2145 10.0004 6.21456C9.79596 6.21463 9.59354 6.17443 9.40467 6.09627C9.21581 6.01811 9.04418 5.90352 8.8996 5.75903C8.75502 5.61454 8.64031 5.44299 8.56203 5.25417C8.48375 5.06535 8.44343 4.86297 8.44336 4.65856C8.44323 4.24575 8.60709 3.8498 8.89889 3.5578C9.1907 3.26581 9.58655 3.1017 9.99936 3.10156C10.4122 3.10143 10.8081 3.26529 11.1001 3.5571C11.3921 3.8489 11.5562 4.24475 11.5564 4.65756Z"
                fill="white"
              />
              <path
                d="M10.0013 11.5554C10.8607 11.5554 11.5573 10.8587 11.5573 9.99936C11.5573 9.14 10.8607 8.44336 10.0013 8.44336C9.14196 8.44336 8.44531 9.14 8.44531 9.99936C8.44531 10.8587 9.14196 11.5554 10.0013 11.5554Z"
                fill="white"
              />
              <path
                d="M10.0013 16.8986C10.8607 16.8986 11.5573 16.202 11.5573 15.3426C11.5573 14.4833 10.8607 13.7866 10.0013 13.7866C9.14196 13.7866 8.44531 14.4833 8.44531 15.3426C8.44531 16.202 9.14196 16.8986 10.0013 16.8986Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
        <span style={{ fontSize: "24px", cursor: "pointer" }} onClick={onClose}>
          ×
        </span>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={() => {
          const content = editorRef.current.innerHTML.trim();
          const isReallyEmpty =
            content === "" ||
            content === "<br>" ||
            content === "<div><br></div>";

          setIsEmpty(isReallyEmpty);
        }}
        onBlur={() => {
          if (editorRef.current.innerText.trim() === "") {
            editorRef.current.innerHTML = "";
            setIsEmpty(true);
          }
        }}
        style={{
          position: "relative",
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          outline: "none",
        }}
        suppressContentEditableWarning={true}
      >
        {isEmpty && (
          <span
            style={{
              position: "absolute",
              color: "#999",
              pointerEvents: "none",
            }}
          >
            Write doctor's notes here...
          </span>
        )}
      </div>

      {/* Toolbar - Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "8px",
          borderTop: "1px solid #ccc",
        }}
      >
        <button
          style={getButtonStyle("bold")}
          onClick={() => execCommand("bold")}
        >
          <b>B</b>
        </button>
        <button
          style={getButtonStyle("italic")}
          onClick={() => execCommand("italic")}
        >
          <i>I</i>
        </button>
        <button
          style={getButtonStyle("underline")}
          onClick={() => execCommand("underline")}
        >
          <u>U</u>
        </button>
        <button
          style={getButtonStyle("strikeThrough")}
          onClick={() => execCommand("strikeThrough")}
        >
          <s>ab</s>
        </button>
        <button
          style={getButtonStyle("insertUnorderedList")}
          onClick={() => execCommand("insertUnorderedList")}
        >
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.654 1.116C4.512 1.116 4.39333 1.068 4.298 0.972C4.20267 0.876 4.15467 0.757 4.154 0.615C4.15333 0.473 4.20133 0.354333 4.298 0.259C4.39467 0.163666 4.51333 0.116 4.654 0.116H16C16.142 0.116 16.2607 0.163666 16.356 0.259C16.452 0.355 16.5 0.474 16.5 0.616C16.5 0.758 16.452 0.876667 16.356 0.972C16.26 1.06733 16.1413 1.11533 16 1.116H4.654ZM4.654 4.5C4.512 4.5 4.39333 4.452 4.298 4.356C4.20267 4.26 4.15467 4.141 4.154 3.999C4.15333 3.857 4.20133 3.73833 4.298 3.643C4.39467 3.54767 4.51333 3.5 4.654 3.5H16C16.142 3.5 16.2607 3.548 16.356 3.644C16.4513 3.74 16.4993 3.859 16.5 4.001C16.5007 4.143 16.4527 4.26167 16.356 4.357C16.2593 4.45233 16.1407 4.5 16 4.5H4.654ZM4.654 7.885C4.512 7.885 4.39333 7.837 4.298 7.741C4.202 7.645 4.154 7.526 4.154 7.384C4.154 7.242 4.202 7.12333 4.298 7.028C4.394 6.93267 4.51267 6.88467 4.654 6.884H16C16.142 6.884 16.2607 6.93233 16.356 7.029C16.4513 7.12567 16.4993 7.24433 16.5 7.385C16.5007 7.52567 16.4527 7.64433 16.356 7.741C16.2593 7.83767 16.1407 7.88567 16 7.885H4.654ZM1.116 1.23C0.941334 1.23 0.795 1.169 0.677 1.047C0.559 0.926333 0.5 0.776 0.5 0.596C0.5 0.427333 0.559 0.286 0.677 0.172C0.795 0.0573333 0.941334 0 1.116 0C1.29 0 1.436 0.0573333 1.554 0.172C1.672 0.285333 1.731 0.426666 1.731 0.596C1.731 0.776 1.672 0.926667 1.554 1.048C1.436 1.17 1.28967 1.231 1.115 1.231M1.115 4.596C0.941 4.596 0.795 4.539 0.677 4.425C0.559 4.311 0.5 4.16933 0.5 4C0.5 3.80667 0.559 3.65267 0.677 3.538C0.795 3.42333 0.941334 3.36567 1.116 3.365C1.29067 3.36433 1.43667 3.42167 1.554 3.537C1.67133 3.65233 1.73033 3.80667 1.731 4C1.731 4.16867 1.672 4.31033 1.554 4.425C1.436 4.53967 1.28967 4.59667 1.115 4.596ZM1.115 8C0.941 8 0.795 7.93933 0.677 7.818C0.559 7.696 0.5 7.54533 0.5 7.366C0.5 7.19667 0.559 7.055 0.677 6.941C0.795 6.82633 0.941334 6.769 1.116 6.769C1.29 6.769 1.436 6.82633 1.554 6.941C1.672 7.05567 1.731 7.19733 1.731 7.366C1.731 7.54533 1.672 7.696 1.554 7.818C1.436 7.93933 1.28967 8 1.115 8Z"
              fill="black"
            />
          </svg>
        </button>
        <button style={toolbarButtonStyle} onClick={insertImage}>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.116 16C1.65533 16 1.271 15.846 0.963 15.538C0.655 15.23 0.500667 14.8453 0.5 14.384V1.616C0.5 1.15533 0.654333 0.771 0.963 0.463C1.27167 0.155 1.656 0.000666667 2.116 0H14.885C15.345 0 15.7293 0.154333 16.038 0.463C16.3467 0.771667 16.5007 1.156 16.5 1.616V14.385C16.5 14.845 16.346 15.2293 16.038 15.538C15.73 15.8467 15.3453 16.0007 14.884 16H2.116ZM2.116 15H14.885C15.0383 15 15.1793 14.936 15.308 14.808C15.4367 14.68 15.5007 14.5387 15.5 14.384V1.616C15.5 1.462 15.436 1.32067 15.308 1.192C15.18 1.06333 15.0387 0.999333 14.884 1H2.116C1.962 1 1.82067 1.064 1.692 1.192C1.56333 1.32 1.49933 1.46133 1.5 1.616V14.385C1.5 14.5383 1.564 14.6793 1.692 14.808C1.82 14.9367 1.961 15.0007 2.115 15M4 12.5H13.154L10.327 8.73L7.712 12.038L5.962 9.923L4 12.5Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DoctorNotesPopup;
