import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {createDoctorNote, deleteDoctorNote, editDoctorNote, getDoctorNotes} from "../State/Doctor/Action.js";
import './doctorNotes.scss'

const DoctorNotesPopup = ({
  anchorRef,
  onClose,
  onAdd,
  disableAdd,
  popupRef,
  customStyle = {},
}) => {

  const [selectedNote, setSelectedNote] = useState(null);
  const [position, setPosition] = useState({ top: 100, left: 0 });
  const editorRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [headerColor, setHeaderColor] = useState("#25307F");
  const [showStickyPanel, setShowStickyPanel] = useState(false);
  const [stickyPanelPosition, setStickyPanelPosition] = useState({
    top: position.top,
    left: position.left + 330,
  });

  const [showSaveButton, setShowSaveButton] = useState(false);

  const colors = [
    "#FF5722", // red
    "#FFC107", // amber
    "#8BC34A", // green
    "#00BCD4", // cyan
    "#E91E63", // pink
    "#9E9E9E", // grey
  ];

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

  const stickyPanelRef = useRef(null);

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
          !e.target.closest(".popup-note") &&
          !stickyPanelRef.current?.contains(e.target)
      ) {
        onClose();
        setShowStickyPanel(false);
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

  const dispatch = useDispatch()
  const handleSavedNotes = () => {
    dispatch(getDoctorNotes())
      setShowStickyPanel(true);
      setShowOptions(false);
  }

  const doctorNotes = useSelector((store) => store.doctor.doctorNotes)

  console.log("Doc: ",doctorNotes)

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return ReactDOM.createPortal(
      <>
        <div
            ref={popupRef}
            className="popup-note"
            style={{...defaultStyle, ...customStyle}}
        >
          {/* Top Bar */}
          <div
              style={{
                backgroundColor: headerColor,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
          >
            <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
          <span
              style={{fontSize: "20px", cursor: "pointer"}}
              onClick={() => {
                if (!disableAdd) {
                  onAdd();
                }
              }}
          >
            ＋
          </span>
              <div
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(!showOptions);
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

                {(selectedNote || showSaveButton) && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          right: '2.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#ffffff',
                        }}
                    >
                      {/* Save or Edit Button */}
                      {showSaveButton && (
                          <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const content = editorRef.current.innerHTML.trim();
                                if (!content) return;

                                const notePayload = {
                                  note: content,
                                  color: headerColor,
                                };

                                if (selectedNote) {
                                  // Update note
                                  // console.log("Editing Note: ",selectedNote)
                                  // console.log("Edited Note: ",notePayload)

                                  dispatch(editDoctorNote(notePayload,selectedNote._id))
                                } else {
                                  // Create note
                                  dispatch(createDoctorNote(notePayload));
                                }

                                // Reset UI
                                setShowSaveButton(false);
                                setIsEmpty(true);
                                editorRef.current.innerHTML = "";
                                setSelectedNote(null);
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                color: '#ffffff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                border: 'none'
                              }}
                          >
                            {selectedNote ? "Edit" : "Save"}
                          </button>
                      )}

                      {/* Always show Delete button when a note is selected */}
                      {selectedNote && (
                          <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Deleting Note: ",selectedNote)
                                dispatch(deleteDoctorNote(selectedNote._id));
                                setSelectedNote(null);
                                setShowSaveButton(false);
                                setIsEmpty(true);
                                editorRef.current.innerHTML = "";
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                color: '#ffffff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                border: 'none'
                              }}
                          >
                            Delete
                          </button>
                      )}
                    </div>
                )}


                {/* Popup menu */}
                {showOptions && (
                    <div
                        style={{
                          position: "absolute",
                          top: 0, // adjust as needed to place above
                          right: 0,
                          left: 0,
                          backgroundColor: '#DAE4FF',
                          boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                          borderRadius: "1.5rem",
                          paddingBottom:'0.6rem',
                          zIndex: 10000
                        }}
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                      {/* Color Palette */}
                      <div style={{display: "flex"
                        // ,overflow: "hidden",
                        // borderBottomLeftRadius: "8px",
                        // borderBottomRightRadius: "8px"
                      }}>
                        {colors.map((clr) => (
                            <div
                                key={clr}
                                onClick={() => {
                                  setHeaderColor(clr);
                                  setShowOptions(false);
                                }}
                                style={{
                                  width: "4rem",
                                  height: "3rem",
                                  backgroundColor: clr,
                                  cursor: "pointer",
                                }}
                            ></div>
                        ))}
                      </div>

                      <div style={{padding: '1rem 1rem 0.5rem 1rem'}}>
                        {/* Action Menu */}
                        <div style={{display: 'flex', gap: '5px', marginBottom: '9px'}}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 6.27875V19.9812C20 20.5562 19.846 21.0367 19.538 21.4225C19.23 21.8083 18.8453 22.0008 18.384 22H5.616C5.15533 22 4.771 21.8075 4.463 21.4225C4.155 21.0375 4.00067 20.5567 4 19.98V4.02C4 3.44417 4.15433 2.96375 4.463 2.57875C4.77167 2.19375 5.156 2.00083 5.616 2H16.577L20 6.27875ZM19 6.8125L16.15 3.25H5.616C5.436 3.25 5.28833 3.32208 5.173 3.46625C5.05767 3.61042 5 3.795 5 4.02V19.9812C5 20.2054 5.05767 20.3896 5.173 20.5337C5.28833 20.6779 5.436 20.75 5.616 20.75H18.385C18.5643 20.75 18.7117 20.6779 18.827 20.5337C18.9423 20.3896 19 20.205 19 19.98V6.8125ZM12 17.6725C12.5513 17.6725 13.0227 17.4283 13.414 16.94C13.8053 16.4517 14.0007 15.8625 14 15.1725C13.9993 14.4825 13.8037 13.8937 13.413 13.4062C13.0223 12.9187 12.5513 12.6746 12 12.6737C11.4487 12.6729 10.9777 12.9171 10.587 13.4062C10.1963 13.8954 10.0007 14.4842 10 15.1725C9.99933 15.8608 10.195 16.45 10.587 16.94C10.979 17.43 11.45 17.6742 12 17.6725ZM6.77 9.2125H14.192V5.4625H6.77V9.2125ZM5 6.8125V20.75V3.25V6.8125Z"
                                fill="black"/>
                          </svg>
                          <div
                              onClick={handleSavedNotes}
                              style={{cursor: "pointer", fontSize: '0.9rem', color: '#070707'}}>Saved Notes
                          </div>
                        </div>
                        {/*<div style={{display: 'flex', gap: '5px', marginBottom: '9px'}}>*/}
                        {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                        {/*       xmlns="http://www.w3.org/2000/svg">*/}
                        {/*    <path*/}
                        {/*        d="M7.616 20C7.168 20 6.78667 19.8426 6.472 19.528C6.15733 19.2133 6 18.8323 6 18.385V5.99998H5V4.99998H9V4.22998H15V4.99998H19V5.99998H18V18.385C18 18.845 17.846 19.2293 17.538 19.538C17.23 19.8466 16.8453 20.0006 16.384 20H7.616ZM17 5.99998H7V18.385C7 18.5643 7.05767 18.7116 7.173 18.827C7.28833 18.9423 7.436 19 7.616 19H16.385C16.5383 19 16.6793 18.936 16.808 18.808C16.9367 18.68 17.0007 18.5386 17 18.384V5.99998ZM9.808 17H10.808V7.99998H9.808V17ZM13.192 17H14.192V7.99998H13.192V17Z"*/}
                        {/*        fill="black"/>*/}
                        {/*  </svg>*/}
                        {/*  <div onClick={() => setShowOptions(false)}*/}
                        {/*       style={{cursor: "pointer", fontSize: '0.9rem', color: '#070707'}}>Delete Note*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/*<div style={{display: 'flex', gap: '5px', marginBottom: '9px'}}>*/}
                        {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                        {/*       xmlns="http://www.w3.org/2000/svg">*/}
                        {/*    <path*/}
                        {/*        d="M5 19H6.098L16.796 8.302L15.698 7.204L5 17.902V19ZM4.808 20C4.57934 20 4.38734 19.9227 4.232 19.768C4.07667 19.6133 3.99934 19.4213 4 19.192V18.152C4 17.9307 4.04334 17.72 4.13 17.52C4.21667 17.32 4.333 17.1473 4.479 17.002L17.18 4.287C17.282 4.19567 17.395 4.125 17.519 4.075C17.643 4.025 17.7723 4 17.907 4C18.0417 4 18.1717 4.02133 18.297 4.064C18.4223 4.10667 18.539 4.18267 18.647 4.292L19.714 5.366C19.824 5.472 19.8993 5.58867 19.94 5.716C19.98 5.84267 20 5.96933 20 6.096C20 6.232 19.9773 6.362 19.932 6.486C19.886 6.60933 19.8133 6.72233 19.714 6.825L6.998 19.521C6.85334 19.6663 6.68067 19.7823 6.48 19.869C6.27934 19.9557 6.06867 19.9993 5.848 20H4.808ZM16.238 7.762L15.698 7.204L16.796 8.302L16.238 7.762Z"*/}
                        {/*        fill="black"/>*/}
                        {/*  </svg>*/}
                        {/*  <div onClick={() => setShowOptions(false)}*/}
                        {/*       style={{cursor: "pointer", fontSize: '0.9rem', color: '#070707'}}>Edit Note*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                )}

          </div>
            </div>
            <div style={{fontSize: "24px", cursor: "pointer"}} onClick={onClose}>
          ×
        </div>
          </div>

          {/* Editor */}
          <div
              ref={editorRef}
              contentEditable
              data-placeholder="Write doctor's notes here..."
              onInput={() => {
                const content = editorRef.current.innerHTML.trim();
                const isReallyEmpty =
                    content === "" ||
                    content === "<br>" ||
                    content === "<div><br></div>";

                setIsEmpty(isReallyEmpty);
                setShowSaveButton(!isReallyEmpty);  // Show save button if not empty
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
        </div>
        {showStickyPanel && (
            <div
                ref={stickyPanelRef}
                onMouseDown={(e) => {
                  const offsetX = e.clientX - stickyPanelPosition.left;
                  const offsetY = e.clientY - stickyPanelPosition.top;

                  const handleMouseMove = (moveEvent) => {
                    setStickyPanelPosition({
                      left: moveEvent.clientX - offsetX,
                      top: moveEvent.clientY - offsetY,
                    });
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
                style={{
                  position: "fixed",
                  // top: position.top, // align vertically with the popup
                  // left: position.left + 330, // place it just right to the main popup (315px wide + padding)
                  top: stickyPanelPosition.top,
                  left: stickyPanelPosition.left,
                  width: "280px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 99999999,
                  borderRadius: "12px",
                }}
            >
              <div
                  style={{
                    backgroundColor: "#25307F",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
              >
                Sticky Notes
                <span
                    style={{ cursor: "pointer", fontWeight: "normal" }}
                    onClick={() => setShowStickyPanel(false)}
                >
        ×
      </span>
              </div>

              <div style={{padding:'1rem'}}>
                <div style={{
                  position: 'relative',
                  width: '80%',
                  marginBottom: '12px'
                }}>
                  <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        cursor:'pointer'
                      }}
                  >
                    <mask
                        id="mask0_3680_3985"
                        style={{maskType: "alpha"}}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_3680_3985)">
                      <path
                          d="M15.8333 18L10.5833 12.75C10.1667 13.0833 9.6875 13.3472 9.14583 13.5417C8.60417 13.7361 8.02778 13.8333 7.41667 13.8333C5.90278 13.8333 4.62153 13.309 3.57292 12.2604C2.52431 11.2118 2 9.93056 2 8.41667C2 6.90278 2.52431 5.62153 3.57292 4.57292C4.62153 3.52431 5.90278 3 7.41667 3C8.93056 3 10.2118 3.52431 11.2604 4.57292C12.309 5.62153 12.8333 6.90278 12.8333 8.41667C12.8333 9.02778 12.7361 9.60417 12.5417 10.1458C12.3472 10.6875 12.0833 11.1667 11.75 11.5833L17 16.8333L15.8333 18ZM7.41667 12.1667C8.45833 12.1667 9.34375 11.8021 10.0729 11.0729C10.8021 10.3438 11.1667 9.45833 11.1667 8.41667C11.1667 7.375 10.8021 6.48958 10.0729 5.76042C9.34375 5.03125 8.45833 4.66667 7.41667 4.66667C6.375 4.66667 5.48958 5.03125 4.76042 5.76042C4.03125 6.48958 3.66667 7.375 3.66667 8.41667C3.66667 9.45833 4.03125 10.3438 4.76042 11.0729C5.48958 11.8021 6.375 12.1667 7.41667 12.1667Z"
                          fill="#2B2B2B"
                      />
                    </g>
                  </svg>

                  <input
                      placeholder="Search"
                      style={{
                        padding: "8px 8px 8px 32px", // add left padding for the icon
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                  />
                </div>

                <div
                    className="sticky-notes-scroll-container"
                >
                  {doctorNotes.length > 0 ? (
                      doctorNotes.map((note, index) => (
                          <div
                              key={index}
                              onClick={() => {
                                if (editorRef.current) {
                                  editorRef.current.innerHTML = note?.note || "";
                                  setHeaderColor(note?.color || "#25307F");
                                  setIsEmpty(false);
                                  setSelectedNote(note); // <-- Track selected note

                                  // Delay closing sticky panel to avoid React DOM sync issue
                                  setTimeout(() => {
                                    setShowStickyPanel(false);
                                  }, 50);
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                padding: "8px 1.4rem",
                                backgroundColor: "#E8F0FE",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                fontSize: "14px",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                                position: "relative",
                                width: '78%',
                              }}
                          >
                            <p style={{ color: '#424242', fontSize: '13px', marginBottom: 0 }}>
                              {truncateText(note?.note,25) || 'No content'}
                            </p>
                            <div style={{
                              position: 'absolute',
                              top: 15,
                              right: 0,
                              backgroundColor: '#ffffff',
                              display: 'inline-block'
                            }}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 0H0V20L20 0Z" fill="black" fillOpacity="0.2"/>
                              </svg>
                            </div>
                          </div>
                      ))
                  ) : (
                      <p style={{ color: '#999', paddingLeft: '1.5rem' }}>No notes found.</p>
                  )}
                </div>

              </div>
            </div>
        )}

      </>,
      document.body
  );
};

export default DoctorNotesPopup;
