// MedicalHistory.jsx — list -> detail using CSS modules, with file management for consultationData.files.{images,videos,attachments}
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import VisitCard from "../../patientsList/component/records/VisitCard/VisitCard.jsx";
import styles from "./MedicalHistory.module.scss";

/* ---------- helpers ---------- */
const palette = ["#5461BE", "#2E823B", "#EAA000", "#F14400"];

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return isNaN(d)
    ? "N/A"
    : d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
};
const toISO = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d) ? null : d.toISOString();
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

const asFiles = (x) => {
  if (!x) return [];
  if (Array.isArray(x)) return x;

  // direct buckets on object
  const buckets = [];
  if (Array.isArray(x.images)) buckets.push(...x.images);
  if (Array.isArray(x.videos)) buckets.push(...x.videos);
  if (Array.isArray(x.attachments)) buckets.push(...x.attachments);
  if (Array.isArray(x.documents)) buckets.push(...x.documents);
  if (buckets.length) return buckets;

  // nested files key can be array or object with buckets
  if (Array.isArray(x.files)) return x.files;
  if (isPlainObject(x.files)) {
    const f = x.files;
    const nested = [];
    if (Array.isArray(f.images)) nested.push(...f.images);
    if (Array.isArray(f.videos)) nested.push(...f.videos);
    if (Array.isArray(f.attachments)) nested.push(...f.attachments);
    if (Array.isArray(f.documents)) nested.push(...f.documents);
    return nested;
  }

  return [];
};

/* hide file buckets from JSON dump */
const FILE_KEYS = new Set([
  "files",
  "attachments",
  "documents",
  "images",
  "videos",
]);
const stripFileBuckets = (obj) => {
  if (!isPlainObject(obj)) return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (FILE_KEYS.has(k)) continue;
    out[k] = v;
  }
  return out;
};
const gatherFiles = (...candidates) => {
  const out = [];
  for (const cand of candidates) {
    if (!cand) continue;
    if (Array.isArray(cand)) out.push(...cand);
    else out.push(...asFiles(cand));
  }
  return out;
};

/** JSON pretty renderer */
const JSONValue = ({ value }) => {
  if (value === null || value === undefined || value === "")
    return <span style={{ color: "#888" }}>N/A</span>;

  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span style={{ color: "#888" }}>No items</span>;
    return (
      <ul className={styles.kv_list}>
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
      <div className={styles.kv_table}>
        {Object.entries(value).map(([k, v]) => (
          <div className={styles.kv_row} key={k}>
            <div className={styles.kv_key}>{prettifyKey(k)}</div>
            <div className={styles.kv_val}>
              <JSONValue value={v} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(value)}</span>;
};

/* ----- extras: prune empties for dynamic consultationData ----- */
const isEmptyValue = (v) => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0 || v.every(isEmptyValue);
  if (isPlainObject(v))
    return Object.keys(v).length === 0 || Object.values(v).every(isEmptyValue);
  return false;
};

const pruneDeep = (v) => {
  if (Array.isArray(v)) {
    const arr = v.map(pruneDeep).filter((x) => !isEmptyValue(x));
    return arr;
  }
  if (isPlainObject(v)) {
    const out = {};
    for (const [k, val] of Object.entries(v)) {
      const pruned = pruneDeep(val);
      if (!isEmptyValue(pruned)) out[k] = pruned;
    }
    return out;
  }
  if (typeof v === "string") return v.trim();
  return v;
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
      <div className={styles.file_grid}>
        {files.map((f, idx) => {
          const url = getFileUrl(f);
          const name = getFileName(f);
          const type = getFileType(f);

          if (url && isImageFile(f)) {
            return (
              <button
                className={styles.file_thumb}
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
                    ); // handled via :global in SCSS
                  }}
                />
                <span className={styles.file_caption}>{name}</span>
              </button>
            );
          }

          if (url && isPdfFile(f)) {
            return (
              <button
                className={`${styles.file_card} ${styles.file_card__pdf}`}
                key={f?._id || idx}
                type="button"
                onClick={() => openPreview(f)}
                title={name}
              >
                <div className={styles.file_icon} aria-hidden>
                  📄
                </div>
                <div className={styles.file_meta}>
                  <div className={styles.file_name}>{name}</div>
                  <div className={styles.file_type}>
                    {type || "application/pdf"}
                  </div>
                  <div className={styles.file_open}>Click to preview</div>
                </div>
              </button>
            );
          }

          return (
            <div className={styles.file_card} key={f?._id || idx}>
              <div className={styles.file_icon} aria-hidden>
                📎
              </div>
              <div className={styles.file_meta}>
                <div className={styles.file_name} title={name}>
                  {name}
                </div>
                {type ? <div className={styles.file_type}>{type}</div> : null}
                {url ? (
                  <a
                    className={styles.file_open}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>
                ) : (
                  <span className={styles.file_missing}>No URL</span>
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

/* ---------- main ---------- */
export const MedicalHistory = ({
  patientDetails = {},
  loading,
  onConfirmSummary,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const consultations = Array.isArray(patientDetails?.consultations)
    ? patientDetails.consultations
    : [];
  const admissionRequests = Array.isArray(patientDetails?.admissionRequests)
    ? patientDetails.admissionRequests
    : [];
  const otherDocuments = Array.isArray(patientDetails?.otherDocuments)
    ? patientDetails?.otherDocuments
    : [];

  useEffect(() => {
    if (!aiSummary && patientDetails?.aiSummary) {
      const cleanedSummary = patientDetails.aiSummary
        .replace(/^\*\*/, "")
        .replace(/\*\*$/, "")
        .replace(/^Patient Summary:\s*/i, "")
        .trim();
      setAiSummary(cleanedSummary);
    }
  }, [patientDetails, aiSummary]);

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

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

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

  const lastVisitDate = useMemo(() => {
    const first = combined[0]?.dateISO;
    return first ? formatDate(first) : "N/A";
  }, [combined]);

  /* ---------- AI Summary Handler ---------- */
  const handleConfirmSummary = () => {
    const medicalHistory = {
      description: aiSummary || "No data found",
      previousHistoryData: {
        combined: combined,
      },
    };
    onConfirmSummary?.(medicalHistory);
  };

  /* ---------- detail subviews ---------- */
  const DetailHeader = ({ title, dateISO, onBack }) => (
    <div className={styles.recordsDetailsHeader}>
      <div className={styles.headingContainer}>
        <ChevronLeft
          size={24}
          strokeWidth={1.7}
          style={{ cursor: "pointer", color: "#25307F" }}
          onClick={onBack}
        />
        <div className={styles.heading}>Back</div>
      </div>
      <div style={{ marginLeft: "auto", color: "#25307F", fontWeight: 600 }}>
        {formatDate(dateISO)}
      </div>
    </div>
  );

  const ConsultationDetail = ({ item }) => {
    console.log("ConsultationDetail item:", item);
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
      if (isEmptyValue(content)) return null;
      return (
        <>
          <div className={styles.kv_row}>
            <div className={styles.kv_key} style={fullRow}>
              {label}
            </div>
          </div>
          <div className={styles.kv_row}>
            <div className={styles.kv_val} style={fullRow}>
              {isPlainObject(content) || Array.isArray(content) ? (
                <JSONValue value={content} />
              ) : (
                String(content)
              )}
            </div>
          </div>
        </>
      );
    };

    // ---- Known sections from consultationData ----
    const medHistoryDesc = data?.medicalHistory?.description;

    // Current medications: support multiple shapes
    const cmRoot = data?.currentMedications;
    const cmFlag = cmRoot?.currentMedication; // e.g., "yes"/"no"
    const cmList = Array.isArray(cmRoot?.currentMedications)
      ? cmRoot.currentMedications
      : Array.isArray(cmRoot)
      ? cmRoot
      : [];

    // Diagnosis + vitals bundle
    const dx = data?.diagnosisVitals || {};
    const dxBundle = pruneDeep({
      "Dx Primary Concern": dx?.dxPrimaryConcern,
      "Dx Pain": dx?.dxPain?.hasPain
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
        (dx?.weight?.value ? `${dx.weight.value}` : null) &&
        (dx?.weight?.unit
          ? `${dx.weight.value} ${dx.weight.unit}`
          : `${dx.weight.value}`),
      Height:
        (dx?.height?.value ? `${dx.height.value}` : null) &&
        (dx?.height?.unit
          ? `${dx.height.value} ${dx.height.unit}`
          : `${dx.height.value}`),
      "Heart Rate": dx?.heartRate,
      "Respiration Rate": dx?.respirationRate,
      "Oxygen Level": dx?.oxygenLevel,
      Temperature: dx?.temperature,
      BP:
        dx?.systolic || dx?.diastolic
          ? `${dx?.systolic ?? ""}${dx?.systolic && dx?.diastolic ? "/" : ""}${
              dx?.diastolic ?? ""
            }`
          : undefined,
    });
    /* ------------------------------------------
   PRESCRIPTION & MEDICINES
--------------------------------------------*/
    const pm = data?.prescriptionAndMedicines || {};
    const medList = pm?.medications || [];
    const lifestyles = pm?.lifestyle || [];
    const injections = pm?.injectionsTherapies || [];
    const nonDrug = pm?.nonDrugRecommendations || [];
    const followUps = pm?.followUpInstructions || [];

    // Build list of shown keys to exclude from dynamic section
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
      <section className={styles.patient_records}>
        <div className={styles.visit_details}>
          <h3>Consultation Details</h3>

          {/* Header facts stacked */}
          <div className={styles.kv_table}>
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

          {/* Notes */}
          {data?.notes ? (
            <>
              <h4 style={{ marginTop: 16 }}>Notes</h4>
              <div className={styles.kv_table}>
                {renderStack("Notes", String(data.notes))}
              </div>
            </>
          ) : null}

          {/* Medical History */}
          {!isEmptyValue(medHistoryDesc) && (
            <>
              <h4 style={{ marginTop: 16 }}>Medical History</h4>
              <div className={styles.kv_table}>
                {renderStack("Description", medHistoryDesc)}
              </div>
            </>
          )}

          {/* Current Medications */}
          {(!isEmptyValue(cmFlag) || !isEmptyValue(cmList)) && (
            <>
              <h4 style={{ marginTop: 16 }}>Current Medications</h4>
              <div className={styles.kv_table}>
                {!isEmptyValue(cmFlag) &&
                  renderStack("Current Medication", cmFlag)}
                {!isEmptyValue(cmList) &&
                  renderStack(
                    "Medication List",
                    cmList.map((m, i) => {
                      if (isPlainObject(m)) return m; // JSONValue will render nicely
                      return String(m ?? "");
                    })
                  )}
              </div>
            </>
          )}

          {/* Diagnosis + Vitals */}
          {!isEmptyValue(dxBundle) && (
            <>
              <h4 style={{ marginTop: 16 }}>Diagnosis Vitals</h4>
              <div className={styles.kv_table}>
                {Object.entries(dxBundle).map(([k, v]) => renderStack(k, v))}
              </div>
            </>
          )}
          {/* PRESCRIPTION UI */}
          {!isEmptyValue(pm) && (
            <div className={styles.section_block}>
              <div className={styles.section_title}>
                Prescription & Medicines
              </div>

              {/* Medications */}
              {medList.length > 0 && (
                <>
                  <h4 style={{ marginBottom: 8 }}>Medications</h4>
                  {medList.map((m, i) => (
                    <div className={styles.med_card} key={i}>
                      <strong style={{ display: "block", marginBottom: 4 }}>
                        {m.kind === "ai" ? "Suggested" : "Prescribed"}
                      </strong>
                      {m.text}
                    </div>
                  ))}
                </>
              )}

              {/* Injections / Therapies */}
              {injections.length > 0 && (
                <>
                  <h4 style={{ marginTop: 16, marginBottom: 8 }}>
                    Injections / Therapies
                  </h4>
                  {injections.map((inj, i) => (
                    <div className={styles.list_item} key={i}>
                      {inj}
                    </div>
                  ))}
                </>
              )}

              {/* Lifestyle Recommendations */}
              {lifestyles.length > 0 && (
                <>
                  <h4 style={{ marginTop: 16, marginBottom: 8 }}>
                    Lifestyle Advice
                  </h4>
                  {lifestyles.map((l, i) => (
                    <div className={styles.list_item} key={i}>
                      {l}
                    </div>
                  ))}
                </>
              )}

              {/* Non-drug recommendations */}
              {nonDrug.length > 0 && (
                <>
                  <h4 style={{ marginTop: 16, marginBottom: 8 }}>
                    Non-Drug Recommendations
                  </h4>
                  {nonDrug.map((n, i) => (
                    <div className={styles.list_item} key={i}>
                      {n}
                    </div>
                  ))}
                </>
              )}

              {/* Follow-up Instructions */}
              {followUps.length > 0 && (
                <>
                  <h4 style={{ marginTop: 16, marginBottom: 8 }}>
                    Follow-Up Instructions
                  </h4>
                  {followUps.map((f, i) => (
                    <div className={styles.list_item} key={i}>
                      {f}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {/* Dynamic fallback: anything else meaningful in consultationData */}
          {/* ------------------------------------------
    ADDITIONAL CLINICAL DATA (clean UI)
--------------------------------------------*/}
          {(() => {
            const pairs = Object.entries(data || {})
              .filter(
                ([k]) =>
                  !OMIT.has(k) && !["prescriptionAndMedicines"].includes(k)
              )
              .map(([k, v]) => [k, pruneDeep(v)])
              .filter(([, v]) => !isEmptyValue(v));

            if (pairs.length === 0) return null;

            return (
              <div className={styles.section_block}>
                <div className={styles.section_title}>
                  Additional Clinical Data
                </div>
                {pairs.map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <div className={styles.tag}>{prettifyKey(k)}</div>
                    <div style={{ marginTop: 6 }}>
                      <JSONValue value={v} />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Attachments */}
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

  const AdmissionDetail = ({ item }) => {
    const a = item?.raw || {};
    const ad = a?.admissionDetails || {};
    return (
      <section className={styles.patient_records}>
        <div className={styles.visit_details}>
          <div className={styles.kv_table}>
            {a?.caseId && (
              <div className={styles.kv_row}>
                <div className={styles.kv_key}>Case ID</div>
                <div className={styles.kv_val}>{a.caseId}</div>
              </div>
            )}
            <div className={styles.kv_row}>
              <div className={styles.kv_key}>Address</div>
              <div className={styles.kv_val}>{ad?.address || "N/A"}</div>
            </div>
            <div className={styles.kv_row}>
              <div className={styles.kv_key}>Contact</div>
              <div className={styles.kv_val}>{ad?.contact || "N/A"}</div>
            </div>
            <div className={styles.kv_row}>
              <div className={styles.kv_key}>Emergency Contact</div>
              <div className={styles.kv_val}>
                {ad?.emergencyContact || "N/A"}
              </div>
            </div>
            {ad?.reason && (
              <div className={styles.kv_row}>
                <div className={styles.kv_key}>Reason</div>
                <div className={styles.kv_val}>{ad.reason}</div>
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

  const DocumentDetail = ({ item }) => {
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
      } catch {
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
      <section className={styles.patient_records}>
        <div className={styles.visit_details}>
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
                <IconButton
                  color="primary"
                  onClick={() => setOpenPreview(true)}
                >
                  <VisibilityIcon />
                </IconButton>
              ) : (
                <IconButton color="primary" onClick={handleDownload}>
                  {downloading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "primary.main" }}
                    />
                  ) : (
                    <DownloadIcon />
                  )}
                </IconButton>
              )}
            </Stack>
          </Card>

          {/* Image Preview Dialog */}
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
                  style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </section>
    );
  };

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
      <div className={styles.phases__stack}>
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
            <div className={styles.phase__card} key={p?._id || idx}>
              <div className={styles.phase__card_header}>
                <div className={styles.phase__title}>
                  {p?.title || `Phase ${idx + 1}`}
                </div>
                <div className={styles.phase__date}>{formatDate(p?.date)}</div>
              </div>

              <div className={styles.kv_table}>
                <div className={styles.kv_row}>
                  <div className={styles.kv_key}>Case ID</div>
                  <div className={styles.kv_val}>{p?.caseId || "N/A"}</div>
                </div>
                <div className={styles.kv_row}>
                  <div className={styles.kv_key}>Assigned Doctor</div>
                  <div className={styles.kv_val}>
                    {isPlainObject(p?.assignedDoctor)
                      ? p?.assignedDoctor?.name ||
                        p?.assignedDoctor?._id ||
                        "N/A"
                      : p?.assignedDoctor || "N/A"}
                  </div>
                </div>
                {p?.isFinal !== undefined && (
                  <div className={styles.kv_row}>
                    <div className={styles.kv_key}>Final</div>
                    <div className={styles.kv_val}>
                      {p.isFinal ? "Yes" : "No"}
                    </div>
                  </div>
                )}
                {p?.isDone !== undefined && (
                  <div className={styles.kv_row}>
                    <div className={styles.kv_key}>Done</div>
                    <div className={styles.kv_val}>
                      {p.isDone ? "Yes" : "No"}
                    </div>
                  </div>
                )}
              </div>

              {!isEmptyObject(pdata) && (
                <>
                  <div className={styles.kv_table} style={{ marginTop: 12 }}>
                    {desc ? (
                      <div className={styles.kv_row}>
                        <div className={styles.kv_key}>Description</div>
                        <div className={styles.kv_val}>{String(desc)}</div>
                      </div>
                    ) : null}

                    {treatment ? (
                      <div className={styles.kv_row}>
                        <div className={styles.kv_key}>Treatment</div>
                        <div className={styles.kv_val}>{String(treatment)}</div>
                      </div>
                    ) : null}

                    {notes ? (
                      <div className={styles.kv_row}>
                        <div className={styles.kv_key}>Notes</div>
                        <div className={styles.kv_val}>{String(notes)}</div>
                      </div>
                    ) : null}
                  </div>
                  {dynamicPairs.length > 0 && (
                    <>
                      <div style={{ fontWeight: 600, marginTop: "1rem" }}>
                        Additional Info
                      </div>
                      <div className={styles.kv_table}>
                        {dynamicPairs.map(([k, v]) => (
                          <div className={styles.kv_row} key={k}>
                            <div className={styles.kv_key}>
                              {prettifyKey(k)}
                            </div>
                            <div className={styles.kv_val}>
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

  if (loading)
    return (
      <div className={styles.visitList} style={{ padding: 16 }}>
        Loading…
      </div>
    );

  // LIST VIEW
  if (!selectedItem) {
    return (
      <section className={styles.container}>
        {/* AI Summary Section */}
        <div className={styles.aiSummarySection}>
          <div className={styles.aiSummaryHeader}>
            <h4>AI Medical Summary</h4>
            <Button
              variant="contained"
              onClick={handleConfirmSummary}
              disabled={isSummaryLoading}
              sx={{
                backgroundColor: "#5461BE",
                textTransform: "none",
                borderRadius: "8px",
                padding: "6px 16px",
                "&:hover": { backgroundColor: "#3d4a9f" },
              }}
            >
              Confirm Summary
            </Button>
          </div>
          <div className={styles.aiSummaryContent}>
            {isSummaryLoading ? (
              <div className={styles.summaryLoading}>
                <CircularProgress size={24} />
                <span>Generating AI summary...</span>
              </div>
            ) : aiSummary ? (
              <p>{aiSummary}</p>
            ) : (
              <p className={styles.noData}>No data found</p>
            )}
          </div>
        </div>

        <div className={styles.visitHeader}>
          <h3>Past Records</h3>
          <div className={styles.searchContainer}>
            <svg
              width="1vw"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.searchIconPPR}
            >
              <path
                d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64445 17.3333 8.66667 17.3333C6.24445 17.3333 4.19467 16.4942 2.51733 14.816C0.840001 13.1378 0.000889594 11.088 7.05467e-07 8.66667C-0.000888183 6.24533 0.838223 4.19556 2.51733 2.51733C4.19645 0.839111 6.24622 0 8.66667 0C11.0871 0 13.1373 0.839111 14.8173 2.51733C16.4973 4.19556 17.336 6.24533 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.7502 14.0836 12.9173 12.9173C14.0844 11.7511 14.6676 10.3342 14.6667 8.66667C14.6658 6.99911 14.0827 5.58267 12.9173 4.41733C11.752 3.252 10.3351 2.66844 8.66667 2.66667C6.99822 2.66489 5.58178 3.24844 4.41733 4.41733C3.25289 5.58622 2.66933 7.00267 2.66667 8.66667C2.664 10.3307 3.24756 11.7476 4.41733 12.9173C5.58711 14.0871 7.00356 14.6702 8.66667 14.6667Z"
                fill="#878787"
              />
            </svg>
            <input
              type="search"
              className={styles.searchBar}
              placeholder="Search Records…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.visitList}>
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
              status={item.kind === "admission" ? item.raw?.status : undefined}
              kind={item.kind}
              onClick={() => setSelectedItem(item)}
            />
          ))}

          {filtered.length === 0 && (
            <div style={{ color: "#888", fontSize: 14, padding: 12 }}>
              No records match your search.
            </div>
          )}
        </div>
      </section>
    );
  }

  // DETAIL VIEW
  const title =
    selectedItem.kind === "consultation"
      ? "Consultation Details"
      : selectedItem.kind === "documents"
      ? "Records Uploaded"
      : "Admission Request";

  return (
    <section className={styles.recordsDetails}>
      <DetailHeader
        title={title}
        dateISO={selectedItem.dateISO}
        onBack={() => setSelectedItem(null)}
      />
      {selectedItem.kind === "consultation" ? (
        <ConsultationDetail item={selectedItem} />
      ) : selectedItem.kind === "documents" ? (
        <DocumentDetail item={selectedItem} />
      ) : (
        <AdmissionDetail item={selectedItem} />
      )}
    </section>
  );
};

export default MedicalHistory;
