import { useEffect, useMemo, useState } from "react";
import "./PatientPreviousRecordRep.scss";
import VisitCard from "./VisitCard/VisitCard.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

/* -------------------- helpers -------------------- */
const palette = ["#5461BE", "#2E823B", "#EAA000", "#F14400"];

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const toISO = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d.toISOString();
};

const isPlainObject = (v) =>
    v !== null && typeof v === "object" && !Array.isArray(v);
const isEmptyObject = (obj) =>
    !obj || !isPlainObject(obj) || Object.keys(obj).length === 0;

const prettifyKey = (k = "") =>
    String(k)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_\-]+/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());

/** additional helpers for stacked rendering */
const isEmptyValue = (v) => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (isPlainObject(v)) return Object.keys(v).length === 0;
  return false;
};

const pruneDeep = (v) => {
  if (Array.isArray(v)) {
    const arr = v.map(pruneDeep).filter((x) => !isEmptyValue(x));
    return arr.length ? arr : undefined;
  }
  if (isPlainObject(v)) {
    const obj = {};
    for (const [k, val] of Object.entries(v)) {
      const pv = pruneDeep(val);
      if (!isEmptyValue(pv)) obj[k] = pv;
    }
    return Object.keys(obj).length ? obj : undefined;
  }
  if (typeof v === "string") return v.trim() || undefined;
  return v;
};

/** Robust extractors */
const getFileUrl = (f) => {
  if (!f) return "";
  if (typeof f === "string") return f;
  return (
      f.url || f.Url || f.URL || f.link || f.href || f.path || f.fileUrl || ""
  );
};
const getFileName = (f) => {
  if (!f) return "File";
  if (typeof f === "string") return f.split("/").pop() || "File";
  return (
      f.originalName ||
      f["Original Name"] ||
      f.OriginalName ||
      f.name ||
      f.filename ||
      f.fileName ||
      "File"
  );
};
const getFileType = (f) => {
  if (!f) return "";
  if (typeof f === "string") {
    const lower = f.toLowerCase();
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lower)) return "image/*";
    if (/\.pdf$/.test(lower)) return "application/pdf";
    return "";
  }
  return f.fileType || f.type || "";
};
const isImageFile = (f) => {
  const type = (getFileType(f) || "").toLowerCase();
  const name = getFileName(f).toLowerCase();
  return (
      type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(name)
  );
};
const isPdfFile = (f) => {
  const type = (getFileType(f) || "").toLowerCase();
  const name = getFileName(f).toLowerCase();
  return type === "application/pdf" || /\.pdf$/.test(name);
};

/** JSON pretty renderer */
const JSONValue = ({ value }) => {
  if (value === null || value === undefined || value === "")
    return <span style={{ color: "#888" }}>N/A</span>;

  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span style={{ color: "#888" }}>No items</span>;
    return (
        <ul className="kv-list">
          {value.map((v, i) => (
              <li key={i}>
                {isPlainObject(v) || Array.isArray(v) ? (
                    <JSONValue value={v} />
                ) : (
                    String(v)
                )}
              </li>
          ))}
        </ul>
    );
  }

  if (isPlainObject(value)) {
    if (isEmptyObject(value))
      return <span style={{ color: "#888" }}>No data</span>;
    return (
        <div className="kv-table">
          {Object.entries(value).map(([k, v]) => (
              <div className="kv-row" key={k}>
                <div className="kv-key">{prettifyKey(k)}</div>
                <div className="kv-val">
                  <JSONValue value={v} />
                </div>
              </div>
          ))}
        </div>
    );
  }

  return <span>{String(value)}</span>;
};

/* -------------------- FileGrid -------------------- */
const FileGrid = ({ files = [] }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openPreview = (file) => {
    setActive(file);
    setOpen(true);
  };
  const closePreview = () => {
    setOpen(false);
    setActive(null);
  };

  if (!Array.isArray(files) || files.length === 0)
    return <div style={{ color: "#888" }}>No files</div>;

  return (
      <>
        <div className="file-grid">
          {files.map((f, idx) => {
            const url = getFileUrl(f);
            const name = getFileName(f);
            const type = getFileType(f);

            if (url && isImageFile(f)) {
              return (
                  <button
                      className="file-thumb"
                      key={f?._id || idx}
                      type="button"
                      onClick={() => openPreview(f)}
                      title={name}
                  >
                    <img
                        src={url}
                        alt={name}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement.classList.add(
                              "file-thumb-broken"
                          );
                        }}
                    />
                    <span className="file-caption">{name}</span>
                  </button>
              );
            }

            if (url && isPdfFile(f)) {
              return (
                  <button
                      className="file-card file-card--pdf"
                      key={f?._id || idx}
                      type="button"
                      onClick={() => openPreview(f)}
                      title={name}
                  >
                    <div className="file-icon" aria-hidden>
                      📄
                    </div>
                    <div className="file-meta">
                      <div className="file-name">{name}</div>
                      <div className="file-type">{type || "application/pdf"}</div>
                      <div className="file-open">Click to preview</div>
                    </div>
                  </button>
              );
            }

            return (
                <div className="file-card" key={f?._id || idx}>
                  <div className="file-icon" aria-hidden>
                    📎
                  </div>
                  <div className="file-meta">
                    <div className="file-name" title={name}>
                      {name}
                    </div>
                    {type ? <div className="file-type">{type}</div> : null}
                    {url ? (
                        <a
                            className="file-open"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                        >
                          Open
                        </a>
                    ) : (
                        <span className="file-missing">No URL</span>
                    )}
                  </div>
                </div>
            );
          })}
        </div>

        <Dialog open={open} onClose={closePreview} fullWidth maxWidth="md">
          <DialogContent
              sx={{
                p: 0,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
          >
            {active ? (
                isImageFile(active) ? (
                    <img
                        src={getFileUrl(active)}
                        alt={getFileName(active)}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          objectFit: "contain",
                        }}
                    />
                ) : isPdfFile(active) ? (
                    <iframe
                        src={getFileUrl(active)}
                        title={getFileName(active)}
                        style={{
                          width: "100%",
                          height: "80vh",
                          border: "none",
                          background: "#fff",
                        }}
                    />
                ) : null
            ) : null}

            <IconButton
                onClick={closePreview}
                sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
                aria-label="Close preview"
            >
              ✕
            </IconButton>
          </DialogContent>
        </Dialog>
      </>
  );
};

/* -------------------- component -------------------- */
const PatientPreviousRecord = ({ patientDetails = {}, loading }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const consultations = Array.isArray(patientDetails?.consultations)
      ? patientDetails.consultations
      : [];
  const admissionRequests = Array.isArray(patientDetails?.admissionRequests)
      ? patientDetails.admissionRequests
      : [];
  const otherDocuments = Array.isArray(patientDetails?.otherDocuments)
      ? patientDetails?.otherDocuments
      : [];
  const combined = useMemo(() => {
    const normConsultations = consultations.map((c) => ({
      id:
          c?._id ||
          `consult-${c?.appointment || Math.random().toString(36).slice(2)}`,
      kind: "consultation",
      dateISO: toISO(c?.date),
      displayDate: formatDate(c?.date),
      description:
          c?.treatment?.note ||
          c?.consultationData?.notes ||
          c?.consultationData?.complaints ||
          c?.status ||
          "Consultation",
      doctorName: c?.doctor?.name || "N/A",
      departmentName: c?.department?.name || "N/A",
      typeofVisit: c?.typeofVisit || "Consultation",
      raw: c,
    }));

    const normAdmissions = admissionRequests.map((a) => ({
      id: a?._id || `admit-${Math.random().toString(36).slice(2)}`,
      kind: "admission",
      dateISO: toISO(a?.createdAt) || toISO(a?.updatedAt),
      displayDate: formatDate(a?.createdAt || a?.updatedAt),
      description:
          a?.admissionDetails?.medicalNote || a?.status || "Admission Request",
      doctorName: a?.approval?.doctor?.name || a?.doctor?.name || "N/A",
      departmentName: a?.admissionDetails?.department || "N/A",
      typeofVisit: "Admission",
      raw: a,
    }));

    const normDocuments = otherDocuments.map((a) => ({
      id: a?._id || `doc-${Math.random().toString(36).slice(2)}`,
      kind: "documents",
      dateISO: toISO(a?.createdAt) || toISO(a?.updatedAt),
      displayDate: formatDate(a?.createdAt || a?.updatedAt),
      description: a?.originalName || "File Uploaded",
      doctorName: a?.uploadedBy?.role || "N/A",
      departmentName: a?.admissionDetails?.department || "N/A",
      typeofVisit: "File Upload",
      raw: a,
    }));
    const sorted = [
      ...normConsultations,
      ...normAdmissions,
      ...normDocuments,
    ].sort((a, b) => {
      if (!a.dateISO && !b.dateISO) return 0;
      if (!a.dateISO) return 1;
      if (!b.dateISO) return -1;
      return new Date(b.dateISO) - new Date(a.dateISO);
    });

    return sorted;
  }, [consultations, admissionRequests, otherDocuments]);

  const [selectedItem, setSelectedItem] = useState(combined[0] || null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!selectedItem && combined.length) setSelectedItem(combined[0]);
  }, [combined, selectedItem]);

  const filtered = useMemo(() => {
    if (!search?.trim()) return combined;
    const q = search.toLowerCase();
    return combined.filter((item) => {
      return (
          (item?.description || "").toLowerCase().includes(q) ||
          (item?.doctorName || "").toLowerCase().includes(q) ||
          (item?.departmentName || "").toLowerCase().includes(q) ||
          (item?.typeofVisit || "").toLowerCase().includes(q)
      );
    });
  }, [combined, search]);

  const DateBadge = ({ iso }) =>
      iso ? (
          <div className="record-date">
            <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "6px", verticalAlign: "middle" }}
            >
              <path
                  d="M1.33398 6.5V14.8333C1.33398 15.2754 1.50958 15.6993 1.82214 16.0118C2.1347 16.3244 2.55862 16.5 3.00065 16.5H13.0007C13.4427 16.5 13.8666 16.3244 14.1792 16.0118C14.4917 15.6993 14.6673 15.2754 14.6673 14.8333V6.5M1.33398 6.5V4.83333C1.33398 4.39131 1.50958 3.96738 1.82214 3.65482C2.1347 3.34226 2.55862 3.16667 3.00065 3.16667H4.66732M1.33398 6.5H14.6673M14.6673 6.5V4.83333C14.6673 4.39131 14.4917 3.96738 14.1792 3.65482C13.8666 3.34226 13.4427 3.16667 13.0007 3.16667H11.334M4.66732 3.16667H11.334M4.66732 3.16667V1.5M11.334 3.16667V1.5"
                  stroke="#25307F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
            {formatDate(iso)}
          </div>
      ) : null;

  /* ----------- CONSULTATION: stacked rendering ----------- */
  const renderConsultation = (item) => {
    const c = item?.raw || {};
    const data = c?.consultationData || {};

    const images = Array.isArray(data?.files?.images) ? data.files.images : [];
    const videos = Array.isArray(data?.files?.videos) ? data.files.videos : [];
    const attachments = Array.isArray(data?.files?.attachments)
        ? data.files.attachments
        : [];
    const files = [...images, ...videos, ...attachments];

    const fullRow = { gridColumn: "1 / -1" };
    const renderStack = (label, content) => {
      const cleaned = pruneDeep(content);
      if (isEmptyValue(cleaned)) return null;
      return (
          <>
            <div className="kv-row">
              <div className="kv-key" style={fullRow}>{label}</div>
            </div>
            <div className="kv-row">
              <div className="kv-val" style={fullRow}>
                {isPlainObject(cleaned) || Array.isArray(cleaned)
                    ? <JSONValue value={cleaned} />
                    : String(cleaned)}
              </div>
            </div>
          </>
      );
    };

    const medHistoryDesc = data?.medicalHistory?.description;

    const cmRoot = data?.currentMedications;
    const cmFlag = cmRoot?.currentMedication;
    const cmList = Array.isArray(cmRoot?.currentMedications)
        ? cmRoot.currentMedications
        : Array.isArray(cmRoot)
            ? cmRoot
            : [];

    const dx = data?.diagnosisVitals || {};
    const dxBundle = pruneDeep({
      "Dx Primary Concern": dx?.dxPrimaryConcern,
      "Dx Pain":
          dx?.dxPain?.hasPain === true
              ? "Has Pain"
              : dx?.dxPain?.hasPain === false
                  ? "No Pain"
                  : undefined,
      "Dx Pain Details": pruneDeep({
        Location: dx?.dxPain?.location,
        Severity: dx?.dxPain?.severity,
      }),
      "Dx Associated Symptoms": dx?.dxAssociatedSymptoms,
      "Dx Recent Changes": dx?.dxRecentChanges,
      "Dx Symptom Onset": dx?.dxSymptomOnset,
      Weight:
          dx?.weight?.value != null
              ? `${dx.weight.value}${dx?.weight?.unit ? ` ${dx.weight.unit}` : ""}`
              : undefined,
      Height:
          dx?.height?.value != null
              ? `${dx.height.value}${dx?.height?.unit ? ` ${dx.height.unit}` : ""}`
              : undefined,
      "Heart Rate": dx?.heartRate,
      "Respiration Rate": dx?.respirationRate,
      "Oxygen Level": dx?.oxygenLevel,
      Temperature: dx?.temperature,
      BP:
          dx?.systolic || dx?.diastolic
              ? `${dx?.systolic ?? ""}${
                  dx?.systolic && dx?.diastolic ? "/" : ""
              }${dx?.diastolic ?? ""}`
              : undefined,
    });

    const OMIT = new Set([
      "files",
      "images",
      "videos",
      "notes",
      "previousHistoryData",
      "medicalHistory",
      "currentMedications",
      "diagnosisVitals",
    ]);

    return (
        <section className="patient-records">
          <DateBadge iso={item?.dateISO} />
          <div className="visit-details">
            <h3>Consultation Details</h3>

            <div className="kv-table">
              {renderStack("Doctor", item?.doctorName || "N/A")}
              {renderStack("Department", item?.departmentName || "N/A")}
              {renderStack("Type", item?.typeofVisit || "Consultation")}
              {c?.status ? renderStack("Status", c.status) : null}
              {c?.caseId ? renderStack("Case ID", c.caseId) : null}
              {/*{c?.appointment ? renderStack("Appointment", c.appointment) : null}*/}
              {c?.followUpRequired !== undefined
                  ? renderStack(
                      "Follow-up Required",
                      c.followUpRequired ? "Yes" : "No"
                  )
                  : null}
              {c?.treatment?.note
                  ? renderStack("Treatment Note", c.treatment.note)
                  : null}
            </div>

            {renderStack("Notes", data?.notes)}

            {renderStack("Medical History → Description", medHistoryDesc)}

            {(!isEmptyValue(cmFlag) || !isEmptyValue(cmList)) && (
                <>
                  <h4 style={{ marginTop: 16 }}>Current Medications</h4>
                  <div className="kv-table">
                    {!isEmptyValue(cmFlag) &&
                        renderStack("Current Medication", cmFlag)}
                    {!isEmptyValue(cmList) &&
                        renderStack("Medication List", cmList)}
                  </div>
                </>
            )}

            {!isEmptyValue(dxBundle) && (
                <>
                  <h4 style={{ marginTop: 16 }}>Diagnosis Vitals</h4>
                  <div className="kv-table">
                    {Object.entries(dxBundle).map(([k, v]) => renderStack(k, v))}
                  </div>
                </>
            )}

            {(() => {
              const pairs = Object.entries(data || {})
                  .filter(([k]) => !OMIT.has(k))
                  .map(([k, v]) => [k, pruneDeep(v)])
                  .filter(([, v]) => !isEmptyValue(v));

              if (pairs.length === 0) return null;

              return (
                  <>
                    <h4 style={{ marginTop: 16 }}>Additional Clinical Data</h4>
                    <div className="kv-table">
                      {pairs.map(([k, v]) => renderStack(prettifyKey(k), v))}
                    </div>
                  </>
              );
            })()}

            {files.length > 0 && (
                <>
                  <h4 style={{ marginTop: 16 }}>Attachments</h4>
                  <FileGrid files={files} />
                </>
            )}
          </div>
        </section>
    );
  };

  /* ----------- ADMISSION: unchanged ----------- */
  const renderProgressPhases = (phases) => {
    if (!Array.isArray(phases) || phases.length === 0)
      return <div style={{ color: "#888" }}>No progress phases</div>;

    const sorted = [...phases].sort((a, b) => {
      const da = toISO(a?.date);
      const db = toISO(b?.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return new Date(da) - new Date(db);
    });

    return (
        <div className="phases-stack">
          {sorted.map((p, idx) => {
            const pdata = isPlainObject(p?.data) ? p.data : {};
            const desc =
                pdata.description ?? pdata.Description ?? p?.description ?? "";
            const treatment = pdata.Treatment ?? pdata.treatment ?? "";
            const notes = pdata.Notes ?? pdata.notes ?? "";

            const FIXED = new Set([
              "description",
              "Description",
              "Treatment",
              "treatment",
              "Notes",
              "notes",
            ]);
            const dynamicPairs = Object.entries(pdata).filter(
                ([k]) => !FIXED.has(k)
            );

            return (
                <div className="phase-card" key={p?._id || idx}>
                  <div className="phase-card-header">
                    <div className="phase-title">
                      {p?.title || `Phase ${idx + 1}`}
                    </div>
                    <div className="phase-date">{formatDate(p?.date)}</div>
                  </div>

                  <div className="kv-table">
                    <div className="kv-row">
                      <div className="kv-key">Case ID</div>
                      <div className="kv-val">{p?.caseId || "N/A"}</div>
                    </div>
                    <div className="kv-row">
                      <div className="kv-key">Assigned Doctor</div>
                      <div className="kv-val">
                        {isPlainObject(p?.assignedDoctor)
                            ? p?.assignedDoctor?.name ||
                            p?.assignedDoctor?._id ||
                            "N/A"
                            : p?.assignedDoctor || "N/A"}
                      </div>
                    </div>
                    {p?.isFinal !== undefined && (
                        <div className="kv-row">
                          <div className="kv-key">Final</div>
                          <div className="kv-val">{p.isFinal ? "Yes" : "No"}</div>
                        </div>
                    )}
                    {p?.isDone !== undefined && (
                        <div className="kv-row">
                          <div className="kv-key">Done</div>
                          <div className="kv-val">{p.isDone ? "Yes" : "No"}</div>
                        </div>
                    )}
                  </div>

                  {!isEmptyObject(pdata) && (
                      <>
                        <div className="kv-table" style={{ marginTop: 12 }}>
                          {desc ? (
                              <div className="kv-row">
                                <div className="kv-key">Description</div>
                                <div className="kv-val">{String(desc)}</div>
                              </div>
                          ) : null}

                          {treatment ? (
                              <div className="kv-row">
                                <div className="kv-key">Treatment</div>
                                <div className="kv-val">{String(treatment)}</div>
                              </div>
                          ) : null}

                          {notes ? (
                              <div className="kv-row">
                                <div className="kv-key">Notes</div>
                                <div className="kv-val">{String(notes)}</div>
                              </div>
                          ) : null}
                        </div>
                        {dynamicPairs.length > 0 && (
                            <>
                              <div style={{ fontWeight: 600, marginTop: "1rem" }}>
                                Additional Info
                              </div>
                              <div className="kv-table">
                                {dynamicPairs.map(([k, v]) => (
                                    <div className="kv-row" key={k}>
                                      <div className="kv-key">{prettifyKey(k)}</div>
                                      <div className="kv-val">
                                        <JSONValue value={v} />
                                      </div>
                                    </div>
                                ))}
                              </div>
                            </>
                        )}
                      </>
                  )}

                  <div style={{ fontWeight: 600, marginTop: 12 }}>Files</div>
                  <FileGrid files={Array.isArray(p?.files) ? p.files : []} />
                </div>
            );
          })}
        </div>
    );
  };

  const renderAdmission = (item) => {
    const a = item?.raw || {};
    const ad = a?.admissionDetails || {};
    return (
        <section className="patient-records">
          <DateBadge iso={item?.dateISO} />
          <div className="visit-details">
            <div className="kv-table">
              {a?.caseId && (
                  <div className="kv-row">
                    <div className="kv-key">Case ID</div>
                    <div className="kv-val">{a.caseId}</div>
                  </div>
              )}
              <div className="kv-row">
                <div className="kv-key">Address</div>
                <div className="kv-val">{ad?.address || "N/A"}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Contact</div>
                <div className="kv-val">{ad?.contact || "N/A"}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Emergency Contact</div>
                <div className="kv-val">{ad?.emergencyContact || "N/A"}</div>
              </div>
              {ad?.reason && (
                  <div className="kv-row">
                    <div className="kv-key">Reason</div>
                    <div className="kv-val">{ad.reason}</div>
                  </div>
              )}
            </div>

            <h4 style={{ marginTop: 16, fontSize: "1.1rem", fontWeight: "bold" }}>
              Progress Phases
            </h4>
            {renderProgressPhases(a?.progressPhases)}
          </div>
        </section>
    );
  };

  const renderDocs = (item) => {
    const c = item?.raw || {};
    const fileUrl = c?.url || item?.url;
    const fileType =
        c?.fileType?.split("/")[1]?.toUpperCase() ||
        c?.fileType?.toUpperCase() ||
        "UNKNOWN";
    const fileName = c?.originalName || item?.description || "Unnamed File";
    const uploadedByRaw = c?.uploadedBy?.role || item?.doctorName || "N/A";
    const uploadedBy =
        uploadedByRaw.charAt(0).toUpperCase() + uploadedByRaw.slice(1);
    const fileSizeKB = c?.fileSize
        ? (c.fileSize / 1024).toFixed(2) + " KB"
        : "Unknown";
    const uploadDate = new Date(
        c?.uploadedAt || item?.dateISO
    ).toLocaleString();

    const isImage = c?.fileType?.startsWith("image/");

    const handleDownload = async () => {
      if (!fileUrl) return;
      setDownloading(true);
      try {
        const res = await fetch(fileUrl, { mode: "cors" });
        if (!res.ok) throw new Error("Network error");
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch (err) {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("download", fileName);
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      setDownloading(false);
    };

    return (
        <section className="patient-records">
          <DateBadge iso={item?.dateISO} />
          <div className="visit-details">
            <h3>File Uploaded</h3>

            <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mt: 2,
                  boxShadow: 2,
                  borderRadius: 2,
                }}
            >
              {isImage && (
                  <img
                      src={fileUrl}
                      alt={fileName}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginRight: 16,
                      }}
                  />
              )}

              <CardContent sx={{ flex: 1, padding: "8px 0" }}>
                <Typography variant="body1" fontWeight={600}>
                  {fileName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {fileType} • {fileSizeKB}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Uploaded By: {uploadedBy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {uploadDate}
                </Typography>
              </CardContent>

              <Stack direction="row" spacing={1}>
                {isImage ? (
                    <IconButton color="primary" onClick={() => setOpenPreview(true)}>
                      <VisibilityIcon />
                    </IconButton>
                ) : (
                    <IconButton color="primary" onClick={handleDownload}>
                      {downloading ? (
                          <CircularProgress size={20} sx={{ color: "primary.main" }} />
                      ) : (
                          <DownloadIcon />
                      )}
                    </IconButton>
                )}
              </Stack>
            </Card>

            {isImage && (
                <Dialog
                    open={openPreview}
                    onClose={() => setOpenPreview(false)}
                    fullWidth
                    maxWidth="sm"
                >
                  <DialogTitle>{fileName}</DialogTitle>
                  <DialogContent>
                    <img
                        src={fileUrl}
                        alt={fileName}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                    />
                  </DialogContent>
                </Dialog>
            )}
          </div>
        </section>
    );
  };

  const renderRightDetails = (item) => {
    if (!item) return null;
    if (item.kind === "consultation") return renderConsultation(item);
    if (item.kind === "admission") return renderAdmission(item);
    if (item.kind === "documents") return renderDocs(item);
    return null;
  };

  /* -------------------- render -------------------- */
  return (
      <div>
        {loading ? (
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "36vh",
                }}
            >
              <CircularProgress sx={{ color: "#25307F" }} size={58} />
            </Box>
        ) : (
            <div className="patient-previous-record-container-rep">
              <div className="patient-records-container-rep">
                {/* LEFT LIST */}
                <section className="patient-visits">
                  <div className="visit-header">
                    <h3>Past Records</h3>

                    <div className="searchContainerPPR">
                      <svg
                          width="1vw"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="searchIconPPR"
                      >
                        <path
                            d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64445 17.3333 8.66667 17.3333C6.24445 17.3333 4.19467 16.4942 2.51733 14.816C0.840001 13.1378 0.000889594 11.088 7.05467e-07 8.66667C-0.000888183 6.24533 0.838223 4.19556 2.51733 2.51733C4.19645 0.839111 6.24622 0 8.66667 0C11.0871 0 13.1373 0.839111 14.8173 2.51733C16.4973 4.19556 17.336 6.24533 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.7502 14.0836 12.9173 12.9173C14.0844 11.7511 14.6676 10.3342 14.6667 8.66667C14.6658 6.99911 14.0827 5.58267 12.9173 4.41733C11.752 3.252 10.3351 2.66844 8.66667 2.66667C6.99822 2.66489 5.58178 3.24844 4.41733 4.41733C3.25289 5.58622 2.66933 7.00267 2.66667 8.66667C2.664 10.3307 3.24756 11.7476 4.41733 12.9173C5.58711 14.0871 7.00356 14.6702 8.66667 14.6667Z"
                            fill="#878787"
                        />
                      </svg>
                      <input
                          type="search"
                          className="search_bar"
                          placeholder="Search Records.."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="visit-list">
                    {filtered.map((item, index) => (
                        <VisitCard
                            key={item.id}
                            date={item.displayDate}
                            description={item.description}
                            doctor={item.doctorName}
                            typeofVisit={item.typeofVisit}
                            department={item.departmentName}
                            color={palette[index % palette.length]}
                            departmentbgColor={
                              item.kind === "admission" ? "#F7F8FC" : undefined
                            }
                            departmentColor={
                              item.kind === "admission" ? "#5461BE" : undefined
                            }
                            status={
                              item.kind === "admission" ? item.raw?.status : undefined
                            }
                            kind={item.kind}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}

                    {filtered.length === 0 && (
                        <div style={{ color: "#888", fontSize: 14, padding: "12px" }}>
                          No records match your search.
                        </div>
                    )}
                  </div>
                </section>

                {/* RIGHT DETAILS */}
                <div className="patient_records_details-rep">
                  <div
                      className="records_details_header"
                      style={{ backgroundColor: "#ffffff" }}
                  >
                    <div className="patient-records-heading">
                      {selectedItem
                          ? selectedItem.kind === "consultation"
                              ? "Consultation Details"
                              : selectedItem.kind === "documents"
                                  ? "Records Uploaded"
                                  : "Admission Request"
                          : "Details"}
                    </div>
                  </div>

                  <div className="records_details_body">
                    {renderRightDetails(selectedItem)}
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default PatientPreviousRecord;
