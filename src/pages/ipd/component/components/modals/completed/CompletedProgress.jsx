import React from "react";
import styles from "./CompletedProgress.module.scss";
import { X } from "lucide-react";

const SectionBox = ({ title, children }) => (
    <div className={styles.sectionBox}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
);

const formatIST = (iso) => {
  if (!iso) return "Not Available";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Not Available";
  }
};

const isImage = (mime, url) =>
    (mime && String(mime).startsWith("image/")) ||
    /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url || "");

const prettifyKey = (k = "") =>
    String(k)
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();

const renderValue = (val) => {
  if (val == null) return <span>—</span>;
  if (Array.isArray(val)) {
    return val.length ? (
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          {val.map((v, i) => (
              <li key={i}>{String(v)}</li>
          ))}
        </ul>
    ) : (
        <span>—</span>
    );
  }
  if (typeof val === "object") {
    return (
        <div>
          {Object.entries(val).map(([k, v]) => (
              <p key={k} style={{ margin: "2px 0" }}>
                <strong>{prettifyKey(k)}: </strong>
                {typeof v === "object" ? renderValue(v) : String(v)}
              </p>
          ))}
        </div>
    );
  }
  return <span>{String(val)}</span>;
};

const CompletedProgress = ({ step, onClose }) => {
  if (!step) return null;

  const { data = {}, doctor, date, title } = step;

  // Fixed fields (names you said are guaranteed)
  const description = data.description ?? data.Description ?? "";
  const treatment = data.Treatment ?? data.treatment ?? "";
  const notes = data.Notes ?? data.notes ?? "";

  // Everything else in `data` is dynamic — map it
  const FIXED = new Set([
    "description",
    "Description",
    "Treatment",
    "treatment",
    "Notes",
    "notes",
  ]);
  const dynamicPairs = Object.entries(data).filter(([k]) => !FIXED.has(k));

  // Files from backend (step.files)
  const files = Array.isArray(step.files) ? step.files : [];

  return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.crossContainer}>
            <X size={20} onClick={onClose} />
          </div>

          <div className={styles.container}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.title}>{title || "Phase Details"}</h2>
              <div className={styles.headerMeta}>
                <div>
                  <strong>Doctor:</strong> {doctor?.name || "Unknown"}
                </div>
                <div>
                  <strong>Date:</strong> {formatIST(date)}
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              {/* Fixed fields */}
              {description && (
                  <SectionBox title="Description">
                    <p>{description}</p>
                  </SectionBox>
              )}

              {treatment && (
                  <SectionBox title="Treatment">
                    <p>{treatment}</p>
                  </SectionBox>
              )}

              {notes && (
                  <SectionBox title="Doctor Notes">
                    <p>{notes}</p>
                  </SectionBox>
              )}

              {/* Dynamic fields (map all remaining keys) */}
              {dynamicPairs.length > 0 && (
                  <SectionBox title="Additional Info">
                    {dynamicPairs.map(([k, v]) => (
                        <div key={k} style={{ marginBottom: 6 }}>
                          <strong>{prettifyKey(k)}: </strong>
                          {renderValue(v)}
                        </div>
                    ))}
                  </SectionBox>
              )}

              {/* Files */}
              <SectionBox title="Uploaded Files">
                {files.length ? (
                    <ul className={styles.filesList}>
                      {files.map((f, idx) => {
                        const url = f.url || f.preview || "";
                        const name =
                            f.originalName || f.name || url.split("/").pop() || "File";
                        const type = f.fileType || f.type || "";
                        return (
                            <li key={f._id || url || idx} className={styles.fileRow}>
                              {isImage(type, url) ? (
                                  <img src={url} alt={name} className={styles.thumb} />
                              ) : (
                                  <img
                                      src="/assets/fileIcon.svg"
                                      alt="File"
                                      className={styles.fileIcon}
                                  />
                              )}
                              <div className={styles.fileDetails}>
                                <a
                                    href={url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.fileName}
                                >
                                  {name}
                                </a>
                                <span className={styles.fileMeta}>
                            {type || "file"}
                          </span>
                              </div>
                            </li>
                        );
                      })}
                    </ul>
                ) : (
                    <p>None</p>
                )}
              </SectionBox>
            </div>

            <div className={styles.btnContainer}>
              <button className={styles.closeBtn} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CompletedProgress;
