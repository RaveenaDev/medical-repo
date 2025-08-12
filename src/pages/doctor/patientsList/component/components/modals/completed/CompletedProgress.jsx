import React from "react";
import styles from "./CompletedProgress.module.scss";
import { X } from "lucide-react";

const SectionBox = ({ title, children }) => (
  <div className={styles.sectionBox}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

const renderObject = (obj) => {
  if (!obj || typeof obj !== "object") return null;

  return Object.entries(obj).map(([key, value]) => (
    <p key={key}>
      <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
      {Array.isArray(value)
        ? value.map((v, i) => <div key={i}>• {v}</div>)
        : typeof value === "object"
        ? renderObject(value)
        : String(value)}
    </p>
  ));
};

const CompletedProgress = ({ step, onClose }) => {
  if (!step || !step.data) return null;

  const { data, doctor, phase, date } = step;

  // console.log("CompletedProgress", step);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.crossContainer}>
          <X size={20} onClick={onClose} />
        </div>
        <div className={styles.container}>
          <div className={styles.modalHeader}>
            <h2 className={styles.title}>
              {data?.title || phase || "Phase Details"}
            </h2>
          </div>

          <div className={styles.modalBody}>
            {data?.vitals && (
              <SectionBox title="Vitals">
                {renderObject(data.vitals)}
              </SectionBox>
            )}

            {data?.diagnosis && (
              <SectionBox title="Diagnosis">
                <p>{data.diagnosis}</p>
              </SectionBox>
            )}

            {data?.complaints && (
              <SectionBox title="Complaints">
                <p>{data.complaints}</p>
              </SectionBox>
            )}

            {data?.description && (
              <SectionBox title="Description">
                <p>{data.description}</p>
              </SectionBox>
            )}

            {data?.intraOpNotes && (
              <SectionBox title="Intraoperative Notes">
                {renderObject(data.intraOpNotes)}
              </SectionBox>
            )}

            {data?.notes && (
              <SectionBox title="Doctor Notes">
                <p>{data.notes}</p>
              </SectionBox>
            )}

            {data?.status && (
              <SectionBox title="Healing Status">
                <p>{data.status}</p>
              </SectionBox>
            )}

            {data?.nextVisit && (
              <SectionBox title="Next Visit">
                <p>{data.nextVisit}</p>
              </SectionBox>
            )}

            {data?.files && (
              <SectionBox title="Uploaded Files">
                {data.files.length > 0 ? (
                  <ul>
                    {data.files.map((file, idx) => (
                      <li key={idx} className={styles.fileRow}>
                        <img
                          src="/assets/fileIcon.svg"
                          alt="File"
                          className={styles.fileIcon}
                        />
                        <div className={styles.fileDetails}>
                          <a
                            href={file.preview || file.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.fileName}
                          >
                            {file.name || file}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No files uploaded</p>
                )}
              </SectionBox>
            )}

            {/* Render any unknown additional fields */}
            {Object.entries(data).map(([key, val]) => {
              const known = [
                "vitals",
                "diagnosis",
                "complaints",
                "description",
                "intraOpNotes",
                "files",
                "notes",
                "nextVisit",
                "status",
                "title",
              ];
              if (!known.includes(key)) {
                return (
                  <SectionBox key={key} title={key.replace(/([A-Z])/g, " $1")}>
                    {renderObject(val)}
                  </SectionBox>
                );
              }
              return null;
            })}
          </div>

          <div className={styles.modalFooter}>
            <p>
              <span>Doctor:</span> {doctor?.name || "Unknown"}
              <br />
              <span>Date:</span>{" "}
              {date
                ? new Date(date).toISOString().split("T")[0]
                : "Not Available"}
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.closeBtn} onClick={onClose}>
              Close
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompletedProgress;
