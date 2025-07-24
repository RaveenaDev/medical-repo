import React from "react";
import styles from "./CompletedProgress.module.scss";

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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{data?.title || phase || "Phase Details"}</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className={styles.modalBody}>
          {data?.vitals && (
            <SectionBox title="Vitals">{renderObject(data.vitals)}</SectionBox>
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
                  {data.files.map((file, i) => (
                    <li key={i}>{file}</li>
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
            <strong>Doctor:</strong> {doctor?.name || "Unknown"}
            <br />
            <strong>Date:</strong>{" "}
            {date
              ? new Date(date).toISOString().split("T")[0]
              : "Not Available"}
          </p>
          <button className={styles.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedProgress;
