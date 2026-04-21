// MoreInfo.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, Drawer } from "@mui/material";
import { Modal } from "@mui/material";
import { useLocation } from "react-router-dom";
import EntityBasedTable from "../../../EntityBasedTable/index.jsx";
import FileDocuments from "./components/FileDocuments.jsx";
import PatientHeader from "../components/PatientHeader.jsx";
import styles from "../profile.module.scss";
import PatientPreviousRecord from "./PatientPreviousRecord.jsx";

import { X } from "lucide-react";

/* ---------- helpers ---------- */
const humanize = (s = "") =>
  String(s)
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const isPrimitive = (v) =>
  v == null || ["string", "number", "boolean"].includes(typeof v);

const isEmptyArray = (v) => Array.isArray(v) && v.length === 0;
const isEmptyObject = (v) =>
  v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v).length === 0;

// Single FilePreviewModal component
// Single FilePreviewModal component
const FilePreviewModal = ({ open, onClose, fileUrl, fileType, fileName }) => {
  if (!open || !fileUrl) return null;

  const handleClose = (event, reason) => {
    // Allow closing via backdrop or escape key
    if (reason !== "backdropClick" || true) {
      onClose();
    }
  };

  const renderPreviewContent = () => {
    if (fileType?.startsWith("image")) {
      return (
        <img
          src={fileUrl}
          alt={fileName || "Preview"}
          style={{
            width: "100%",
            maxHeight: "80vh",
            maxWidth: "90vw",
            objectFit: "contain",
          }}
          onError={(e) => {
            console.error("Image failed to load:", fileUrl);
            e.target.style.display = "none";
          }}
        />
      );
    }

    if (fileType?.startsWith("video")) {
      return (
        <video
          controls
          style={{
            width: "100%",
            maxHeight: "80vh",
            maxWidth: "90vw",
          }}
          onError={(e) => {
            console.error("Video failed to load:", fileUrl);
          }}
        >
          <source src={fileUrl} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (fileType === "application/pdf") {
      // Correct URL for Cloudinary raw files
      const pdfUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

      return (
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          style={{
            width: "90vw",
            height: "80vh",
            border: "none",
          }}
          title={fileName || "PDF Preview"}
          onError={(e) => {
            console.error("PDF failed to load:", pdfUrl);
          }}
        />
      );
    }

    // Fallback for unsupported file types
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <p>Preview not available for this file type.</p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          Open file in new tab
        </a>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          maxWidth: "95vw",
          maxHeight: "95vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
          onClick={onClose}
        >
          ✕
        </Box>

        {renderPreviewContent()}

        {fileName && (
          <Box sx={{ p: 2, borderTop: "1px solid #eee", textAlign: "center" }}>
            <strong>{fileName}</strong>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

// Render file items with preview functionality
const FileItems = ({ items, depth = 0 }) => {
  const [previewModal, setPreviewModal] = useState({
    open: false,
    fileUrl: null,
    fileType: null,
    fileName: null,
  });

  const handlePreviewOpen = (fileUrl, fileType, fileName) => {
    console.log("Opening preview for:", { fileUrl, fileType, fileName });
    setPreviewModal({
      open: true,
      fileUrl,
      fileType,
      fileName,
    });
  };

  const handlePreviewClose = () => {
    setPreviewModal({
      open: false,
      fileUrl: null,
      fileType: null,
      fileName: null,
    });
  };

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <>
      <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
        {items.map((item, i) => {
          if (!item?.url) return null;

          const isImage = item.fileType?.startsWith("image");
          const isVideo = item.fileType?.startsWith("video");
          const isPDF = item.fileType === "application/pdf";
          const isPreviewable = isImage || isVideo || isPDF;

          return (
            <Box component="li" key={i} sx={{ mb: 1 }}>
              {isImage && (
                <Box
                  onClick={() =>
                    handlePreviewOpen(item.url, item.fileType, item.filename)
                  }
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.filename || `Image ${i + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                    }}
                    onError={(e) => {
                      console.error("Thumbnail failed to load:", item.url);
                      e.target.style.display = "none";
                    }}
                  />
                  <p style={{ margin: "4px 0", fontSize: "12px" }}>
                    {item.filename || `Image ${i + 1}`}
                  </p>
                </Box>
              )}

              {isVideo && (
                <Box>
                  <video
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      borderRadius: "4px",
                    }}
                    onError={(e) => {
                      console.error("Video failed to load:", item.url);
                    }}
                  >
                    <source src={item.url} type={item.fileType} />
                    Your browser does not support the video tag.
                  </video>
                  <p style={{ margin: "4px 0", fontSize: "12px" }}>
                    {item.filename || `Video ${i + 1}`}
                  </p>
                </Box>
              )}

              {isPDF && (
                <Box
                  onClick={() =>
                    handlePreviewOpen(item.url, item.fileType, item.filename)
                  }
                  sx={{
                    cursor: "pointer",
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "80px",
                    justifyContent: "center",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                    📄
                  </div>
                  <p
                    style={{ margin: "0", fontSize: "12px", fontWeight: "500" }}
                  >
                    {item.filename || `Document ${i + 1}`}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "10px",
                      color: "#666",
                    }}
                  >
                    Click to preview PDF
                  </p>
                </Box>
              )}

              {!isPreviewable && (
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "8px" }}>
                      📎
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {item.filename || `File ${i + 1}`}
                    </span>
                  </a>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      <FilePreviewModal
        open={previewModal.open}
        onClose={handlePreviewClose}
        fileUrl={previewModal.fileUrl}
        fileType={previewModal.fileType}
        fileName={previewModal.fileName}
      />
    </>
  );
};

/** Render dynamicQuestions array directly (no heading) */
const DynamicQuestions = ({ items, depth = 0 }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const getFirst = (obj, keys) => {
    for (const k of keys) {
      if (obj?.[k] != null && obj[k] !== "") return obj[k];
    }
    return null;
  };

  return (
    <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
      {items.map((it, i) => {
        if (isPrimitive(it)) {
          return (
            <Box component="li" key={i} sx={{ mb: 0.75 }}>
              {String(it)}
            </Box>
          );
        }

        if (it && typeof it === "object") {
          const q = getFirst(it, [
            "question",
            "ques",
            "que",
            "q",
            "title",
            "label",
          ]);
          const ans = getFirst(it, ["answer", "ans", "response", "value"]);
          const opts =
            it.options || it.choices || it.answers || it.responses || it.items;

          return (
            <Box component="li" key={i} sx={{ mb: 1 }}>
              <div style={{ fontWeight: 600 }}>
                {q ? `Q${i + 1}. ${q}` : `Q${i + 1}`}
              </div>

              {Array.isArray(opts) && opts.length > 0 && (
                <Box component="ul" sx={{ pl: 3, mt: 0.25, mb: 0.25 }}>
                  {opts.map((op, j) => (
                    <Box component="li" key={j} sx={{ mb: 0.25 }}>
                      {isPrimitive(op) ? String(op) : JSON.stringify(op)}
                    </Box>
                  ))}
                </Box>
              )}

              {ans != null && ans !== "" && (
                <div>
                  <em>Answer:</em> {String(ans)}
                </div>
              )}

              <ExtraObjectFields
                obj={it}
                excludeKeys={[
                  "question",
                  "ques",
                  "que",
                  "q",
                  "title",
                  "label",
                  "answer",
                  "ans",
                  "response",
                  "value",
                  "options",
                  "choices",
                  "answers",
                  "responses",
                  "items",
                ]}
                depth={depth + 1}
              />
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

/** Render object fields except excluded keys */
const ExtraObjectFields = ({ obj, excludeKeys = [], depth = 0 }) => {
  if (!obj || typeof obj !== "object") return null;

  const entries = Object.entries(obj).filter(([k]) => !excludeKeys.includes(k));
  if (entries.length === 0) return null;

  return (
    <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
      {entries.map(([k, v]) => {
        if (isEmptyArray(v) || isEmptyObject(v)) return null;

        return (
          <Box component="li" key={k} sx={{ mb: 0.5 }}>
            <strong>{humanize(k)}: </strong>
            {isPrimitive(v) ? (
              <span>{v === null ? "null" : String(v)}</span>
            ) : (
              <ValueNode label={k} value={v} depth={depth + 1} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

// Main ValueNode component
const ValueNode = ({ label, value, depth = 0 }) => {
  const keyLower = (label || "").toString().toLowerCase();

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    // Check if this array contains file objects by looking for a 'url' property
    const isFileArray = value.some(
      (item) => typeof item === "object" && "url" in item
    );
    if (isFileArray) {
      return <FileItems items={value} depth={depth} />;
    }

    // Regular arrays
    return (
      <Box component="ul" sx={{ pl: depth ? 3 : 2, m: 0 }}>
        {value.map((item, i) => (
          <Box component="li" key={i} sx={{ mb: 0.5 }}>
            {isPrimitive(item) ? (
              <span>{String(item)}</span>
            ) : (
              <ValueNode value={item} depth={depth + 1} />
            )}
          </Box>
        ))}
      </Box>
    );
  }

  // Primitive values
  if (isPrimitive(value)) {
    return (
      <Box sx={{ pl: depth ? 2 : 0, wordBreak: "break-word" }}>
        <span>{value === null ? "null" : String(value)}</span>
      </Box>
    );
  }

  // Objects
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return null;

    return (
      <Box
        component="ul"
        sx={{
          pl: depth ? 3 : 2,
          m: 0,
          borderLeft: depth ? "1px solid #eee" : "none",
        }}
      >
        {entries.map(([k, v]) => {
          const kLower = k.toLowerCase();

          if (isEmptyArray(v) || isEmptyObject(v)) return null;

          // Specific check for nested file arrays
          if (
            Array.isArray(v) &&
            v.some((item) => typeof item === "object" && "url" in item)
          ) {
            return (
              <Box component="li" key={k} sx={{ mb: 0.75 }}>
                <strong>{humanize(k)}: </strong>
                <FileItems items={v} depth={depth + 1} />
              </Box>
            );
          }

          // Handle dynamicQuestions specially
          if (kLower === "dynamicquestions") {
            return <DynamicQuestions key={k} items={v} depth={depth} />;
          }

          return (
            <Box component="li" key={k} sx={{ mb: 0.75 }}>
              <strong>{humanize(k)}: </strong>
              {isPrimitive(v) ? (
                <span>{v === null ? "null" : String(v)}</span>
              ) : (
                <ValueNode label={k} value={v} depth={depth + 1} />
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return null;
};

/** Renders the full consultationData with top-level headings */
const ConsultationDetails = ({ data }) => {
  if (!data) return <p>No consultation data</p>;

  const sections = Array.isArray(data)
    ? data.map((val, i) => [`Section ${i + 1}`, val])
    : Object.entries(data);

  const filtered = sections.filter(([k, v]) => {
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === "object") return Object.keys(v).length > 0;
    return v != null && v !== "";
  });

  if (filtered.length === 0) return <p>No consultation data</p>;

  return (
    <Box>
      {filtered.map(([key, val]) => {
        const keyLower = key.toString().toLowerCase();

        if (keyLower === "dynamicquestions") {
          return (
            <Box key={key} sx={{ mb: 2.5 }}>
              <DynamicQuestions items={val} />
            </Box>
          );
        }

        return (
          <Box key={key} sx={{ mb: 2 }}>
            <h4
              className={styles.title}
              style={{
                marginBottom: 8,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {humanize(key)}
            </h4>
            <ValueNode label={key} value={val} />
          </Box>
        );
      })}
    </Box>
  );
};

/* -------------------------------- */

const MoreInfo = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer control
  useEffect(() => {
    props?.setIsSignUpOrLogin?.(false);
  }, [props]);

  const location = useLocation();
  const { patient, consultationData, patDetails } = location.state || {};

  // console.log("Pat: ",patient)
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  return (
    <div style={{ height: "93vh", position: "relative" }}>
      {!props.entity ? (
        <>
          {/* Patient Header */}

          <PatientHeader
            showEditPatients={false}
            patient={patient}
            showAddButton={true}
            onClickBtn={handleDrawerOpen}
          />

          {/* Patient previous records */}
          <PatientPreviousRecord loading={false} patientDetails={patDetails} />

          {/* Drawer for FileDocuments */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{ zIndex: 100001 }}
            PaperProps={{
              sx: {
                width: { xs: "90%", sm: "480px" },
                p: 2,
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <h3 style={{ margin: 0 }}>Upload / Manage Files</h3>
              <Button
                sx={{
                  margin: 0,
                }}
                onClick={handleDrawerClose}
                variant="text"
              >
                <X color="red" />
              </Button>
            </Box>

            <FileDocuments patientId={patient?._id} />
          </Drawer>
        </>
      ) : (
        <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
      )}
    </div>
  );
};

export default MoreInfo;
