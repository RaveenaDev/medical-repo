// MedicalHistory.jsx — list -> detail using CSS modules, with file management for consultationData.files.{images,videos,attachments}
import {useEffect, useMemo, useState} from "react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
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
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const isEmpty = (o) => !o || !isObj(o) || Object.keys(o).length === 0;

/* ---------- robust file helpers ---------- */
const fileUrl = (f) => {
  if (!f) return "";
  if (typeof f === "string") return f;
  return (
      f.url || f.Url || f.URL || f.link || f.href || f.path || f.fileUrl || ""
  );
};
const fileName = (f) => {
  if (!f) return "File";
  if (typeof f === "string") return f.split("/").pop() || "File";
  return f.name || f.filename || f.originalName || "File";
};
const fileType = (f) => {
  if (!f) return "";
  if (typeof f === "string") {
    const lower = f.toLowerCase();
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lower)) return "image/*";
    if (/\.pdf$/.test(lower)) return "application/pdf";
    return "";
  }
  return f.fileType || f.type || "";
};
const isImage = (f) => {
  const t = (fileType(f) || "").toLowerCase();
  const n = fileName(f).toLowerCase();
  return t.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(n);
};
const isPdf = (f) => {
  const t = (fileType(f) || "").toLowerCase();
  const n = fileName(f).toLowerCase();
  return t === "application/pdf" || /\.pdf$/.test(n);
};

/* accept files from shapes:
   - array itself
   - { files: [] }
   - { files: { images:[], videos:[], attachments:[] } }
   - { images:[], videos:[], attachments:[], documents:[] }
*/
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
  if (isObj(x.files)) {
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
  if (!isObj(obj)) return obj;
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

/* ---------- simple JSON renderer ---------- */
const JsonValue = ({ value }) => {
  if (value === null || value === undefined || value === "")
    return <span style={{ color: "#888" }}>N/A</span>;
  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span style={{ color: "#888" }}>No items</span>;
    return (
        <ul className={styles.kvList}>
          {value.map((v, i) => (
              <li key={i}>
                {isObj(v) || Array.isArray(v) ? <JsonValue value={v} /> : String(v)}
              </li>
          ))}
        </ul>
    );
  }
  if (isObj(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0)
      return <span style={{ color: "#888" }}>No data</span>;
    return (
        <div className={styles.kvTable}>
          {entries.map(([k, v]) => (
              <div className={styles.kvRow} key={k}>
                <div className={styles.kvKey}>
                  {k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_\-]+/g, " ")}
                </div>
                <div className={styles.kvVal}>
                  <JsonValue value={v} />
                </div>
              </div>
          ))}
        </div>
    );
  }
  return <span>{String(value)}</span>;
};

/* ---------- FileGrid with preview ---------- */
const FileGrid = ({ files = [] }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  if (!Array.isArray(files) || files.length === 0)
    return <div style={{ color: "#888" }}>No files</div>;

  const openPreview = (f) => {
    setActive(f);
    setOpen(true);
  };
  const closePreview = () => {
    setOpen(false);
    setActive(null);
  };

  return (
      <>
        <div className={styles.fileGrid}>
          {files.map((f, i) => {
            const url = fileUrl(f);
            const name = fileName(f);
            const type = fileType(f);

            if (url && isImage(f)) {
              return (
                  <button
                      key={f?._id || i}
                      type="button"
                      className={styles.fileThumb}
                      title={name}
                      onClick={() => openPreview(f)}
                  >
                    <img
                        src={url}
                        alt={name}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement.classList.add(
                              styles.fileThumbBroken
                          );
                        }}
                    />
                    <span className={styles.fileCaption}>{name}</span>
                  </button>
              );
            }

            if (url && isPdf(f)) {
              return (
                  <button
                      key={f?._id || i}
                      type="button"
                      className={`${styles.fileCard} ${styles.fileCardPdf}`}
                      // onClick={() => openPreview(f)}
                      title={name}
                  >
                    <div className={styles.fileIcon} aria-hidden>
                      📄
                    </div>
                    <div className={styles.fileMeta}>
                      <div className={styles.fileName}>{name}</div>
                      <div className={styles.fileType}>
                        {type || "application/pdf"}
                      </div>
                      {/* <div className={styles.fileOpen}>Click to preview</div> */}
                    </div>
                  </button>
              );
            }

            return (
                <div key={f?._id || i} className={styles.fileCard} title={name}>
                  <div className={styles.fileIcon} aria-hidden>
                    📎
                  </div>
                  <div className={styles.fileMeta}>
                    <div className={styles.fileName}>{name}</div>
                    {type ? <div className={styles.fileType}>{type}</div> : null}
                    {url ? (
                        <a
                            className={styles.fileOpen}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                        >
                          Open
                        </a>
                    ) : (
                        <span className={styles.fileMissing}>No URL</span>
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
                isImage(active) ? (
                    <img
                        src={fileUrl(active)}
                        alt={fileName(active)}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          objectFit: "contain",
                        }}
                    />
                ) : isPdf(active) ? (
                    <iframe
                        src={fileUrl(active)}
                        title={fileName(active)}
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
export const MedicalHistory = ({ patientDetails = {}, loading, onConfirmSummary }) => {
  // console.log("Det: ", patientDetails);
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
          .replace(/^\*\*/, "") // remove starting **
          .replace(/\*\*$/, "") // remove ending **
          .replace(/^Patient Summary:\s*/i, "") // remove "Patient Summary:"
          .trim(); // remove extra spaces

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
          c?.consultationData?.notes || // <-- support notes here
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
    return [...normConsultations, ...normAdmissions, ...normDocuments].sort(
        (a, b) => {
          if (!a.dateISO && !b.dateISO) return 0;
          if (!a.dateISO) return 1;
          if (!b.dateISO) return -1;
          return new Date(b.dateISO) - new Date(a.dateISO);
        }
    );
  }, [consultations, admissionRequests, otherDocuments]);

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return combined;
    return combined.filter(
        (item) =>
            (item.description || "").toLowerCase().includes(q) ||
            (item.doctorName || "").toLowerCase().includes(q) ||
            (item.departmentName || "").toLowerCase().includes(q) ||
            (item.typeofVisit || "").toLowerCase().includes(q)
    );
  }, [combined, search]);

  // console.log("cOM" ,combined)

  /* ---------- AI Summary Handler ---------- */
  const handleConfirmSummary = () => {
    const medicalHistory = {
      description: aiSummary || "No data found",
      previousHistoryData: {
        // consultations: consultations,
        // admissionRequests: admissionRequests,
        // otherDocuments: otherDocuments,
        combined: combined
      }
    };

    if (onConfirmSummary) {
      onConfirmSummary(medicalHistory);
    }
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
        {/* <div className={styles.patientRecordsHeading}>{title}</div> */}
        <div style={{ marginLeft: "auto", color: "#25307F", fontWeight: 600 }}>
          {formatDate(dateISO)}
        </div>
      </div>
  );

  const ConsultationDetail = ({ item }) => {
    const c = item?.raw || {};
    const data = c?.consultationData || {};
    const cleanData = stripFileBuckets(data);

    // Accept nested consultationData.files.{images,videos,attachments}
    const files = gatherFiles(
        data?.files // nested files object with buckets
    );

    return (
        <div className={styles.recordsDetailsBody}>
          <div className={styles.kvTable}>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Doctor</div>
              <div className={styles.kvVal}>{item.doctorName}</div>
            </div>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Department</div>
              <div className={styles.kvVal}>{item.departmentName}</div>
            </div>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Type</div>
              <div className={styles.kvVal}>{item.typeofVisit}</div>
            </div>
            {c?.status && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Status</div>
                  <div className={styles.kvVal}>{c.status}</div>
                </div>
            )}
            {c?.caseId && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Case ID</div>
                  <div className={styles.kvVal}>{c.caseId}</div>
                </div>
            )}
            {/*{c?.appointment && <div className={styles.kvRow}><div className={styles.kvKey}>Appointment</div><div className={styles.kvVal}>{c.appointment}</div></div>}*/}
            {c?.followUpRequired !== undefined && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Follow-up Required</div>
                  <div className={styles.kvVal}>
                    {c.followUpRequired ? "Yes" : "No"}
                  </div>
                </div>
            )}
            {c?.treatment?.note && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Treatment Note</div>
                  <div className={styles.kvVal}>{c.treatment.note}</div>
                </div>
            )}
          </div>

          {!isEmpty(cleanData) && (
              <>
                <h4 style={{ marginTop: 16 }}>Consultation Data</h4>
                <div className={styles.kvTable}>
                  {Object.entries(cleanData).map(([k, v]) => (
                      <div className={styles.kvRow} key={k}>
                        <div className={styles.kvKey}>
                          {k.replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </div>
                        <div className={styles.kvVal}>
                          {Array.isArray(v) || isObj(v)
                              ? JSON.stringify(v)
                              : String(v ?? "N/A")}
                        </div>
                      </div>
                  ))}
                </div>
              </>
          )}

          {files.length > 0 && (
              <>
                <h4 style={{ marginTop: 16 }}>Attachments</h4>
                <FileGrid files={files} />
              </>
          )}
        </div>
    );
  };

  const AdmissionDetail = ({ item }) => {
    const a = item?.raw || {};
    const ad = a?.admissionDetails || {};
    const phases = Array.isArray(a?.progressPhases) ? a.progressPhases : [];
    const admissionFiles = asFiles(a);

    return (
        <div className={styles.recordsDetailsBody}>
          <div className={styles.kvTable}>
            {a?.caseId && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Case ID</div>
                  <div className={styles.kvVal}>{a.caseId}</div>
                </div>
            )}
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Address</div>
              <div className={styles.kvVal}>{ad?.address || "N/A"}</div>
            </div>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Contact</div>
              <div className={styles.kvVal}>{ad?.contact || "N/A"}</div>
            </div>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Emergency Contact</div>
              <div className={styles.kvVal}>{ad?.emergencyContact || "N/A"}</div>
            </div>
            {ad?.reason && (
                <div className={styles.kvRow}>
                  <div className={styles.kvKey}>Reason</div>
                  <div className={styles.kvVal}>{ad.reason}</div>
                </div>
            )}
          </div>

          {admissionFiles.length > 0 && (
              <>
                <h4 style={{ marginTop: 16 }}>Attachments</h4>
                <FileGrid files={admissionFiles} />
              </>
          )}

          <h4 style={{ marginTop: 16, fontSize: "1.1rem", fontWeight: "bold" }}>
            Progress Phases
          </h4>
          {phases.length === 0 ? (
              <div style={{ color: "#888" }}>No progress phases</div>
          ) : (
              <div className={styles.phasesStack}>
                {[...phases]
                    .sort(
                        (p, q) =>
                            new Date(toISO(p?.date) || 0) - new Date(toISO(q?.date) || 0)
                    )
                    .map((p, idx) => {
                      const phaseFiles = asFiles(p);
                      return (
                          <div className={styles.phaseCard} key={p?._id || idx}>
                            <div className={styles.phaseCardHeader}>
                              <div className={styles.phaseTitle}>
                                {p?.title || `Phase ${idx + 1}`}
                              </div>
                              <div className={styles.phaseDate}>
                                {formatDate(p?.date)}
                              </div>
                            </div>
                            <div className={styles.kvTable}>
                              <div className={styles.kvRow}>
                                <div className={styles.kvKey}>Case ID</div>
                                <div className={styles.kvVal}>{p?.caseId || "N/A"}</div>
                              </div>
                              <div className={styles.kvRow}>
                                <div className={styles.kvKey}>Assigned Doctor</div>
                                <div className={styles.kvVal}>
                                  {isObj(p?.assignedDoctor)
                                      ? p?.assignedDoctor?.name ||
                                      p?.assignedDoctor?._id ||
                                      "N/A"
                                      : p?.assignedDoctor || "N/A"}
                                </div>
                              </div>
                              {p?.isFinal !== undefined && (
                                  <div className={styles.kvRow}>
                                    <div className={styles.kvKey}>Final</div>
                                    <div className={styles.kvVal}>
                                      {p.isFinal ? "Yes" : "No"}
                                    </div>
                                  </div>
                              )}
                              {p?.isDone !== undefined && (
                                  <div className={styles.kvRow}>
                                    <div className={styles.kvKey}>Done</div>
                                    <div className={styles.kvVal}>
                                      {p.isDone ? "Yes" : "No"}
                                    </div>
                                  </div>
                              )}
                            </div>

                            {p?.description && (
                                <>
                                  <div style={{ fontWeight: 600, marginTop: 8 }}>
                                    Description
                                  </div>
                                  <div>{p.description}</div>
                                </>
                            )}

                            {!isEmpty(p?.data) && (
                                <>
                                  <div style={{ fontWeight: 600, marginTop: 12 }}>
                                    Phase Data
                                  </div>
                                  <div className={styles.kvTable}>
                                    <JsonValue value={p.data} />
                                  </div>
                                </>
                            )}

                            <div style={{ fontWeight: 600, marginTop: 8 }}>Files</div>
                            <FileGrid files={phaseFiles} />
                          </div>
                      );
                    })}
              </div>
          )}
        </div>
    );
  };

  const DocumentDetail = ({ item }) => {
    const c = item?.raw || {};
    const fileUrl = c?.url || item?.url;
    const fileType = c?.fileType || "unknown";
    const fileName = c?.originalName || item?.description || "Unnamed File";
    const uploadedByRaw = c?.uploadedBy?.role || item?.doctorName || "N/A";
    const uploadedBy =
        typeof uploadedByRaw === "string"
            ? uploadedByRaw.charAt(0).toUpperCase() + uploadedByRaw.slice(1)
            : "N/A";
    const fileSizeKB = c?.fileSize
        ? (c.fileSize / 1024).toFixed(2) + " KB"
        : "Unknown";
    const uploadDate = new Date(
        c?.uploadedAt || item?.dateISO
    ).toLocaleString();

    const isImage = fileType.startsWith("image/");

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
        // fallback if blob fails (e.g., CORS)
        const a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("download", fileName);
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } finally {
        setDownloading(false);
      }
    };

    const handlePreview = () => setOpenPreview(true);
    const handleClosePreview = () => setOpenPreview(false);

    const files = fileUrl
        ? [
          {
            url: fileUrl,
            type: fileType,
            name: fileName,
            size: fileSizeKB,
          },
        ]
        : [];

    return (
        <div className={styles.recordsDetailsBody}>
          <div className={styles.kvTable}>
            <div className={styles.kvRow}>
              <div className={styles.kvKey}>File Name</div>
              <div className={styles.kvVal}>{fileName}</div>
            </div>

            <div className={styles.kvRow}>
              <div className={styles.kvKey}>File Type</div>
              <div className={styles.kvVal}>{fileType}</div>
            </div>

            <div className={styles.kvRow}>
              <div className={styles.kvKey}>File Size</div>
              <div className={styles.kvVal}>{fileSizeKB}</div>
            </div>

            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Uploaded By</div>
              <div className={styles.kvVal}>{uploadedBy}</div>
            </div>

            <div className={styles.kvRow}>
              <div className={styles.kvKey}>Upload Date</div>
              <div className={styles.kvVal}>{uploadDate}</div>
            </div>
          </div>

          {files.length > 0 && (
              <>
                <h4 style={{ marginTop: 16 }}>Attachment</h4>
                <FileGrid files={files} />

                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  {isImage && (
                      <button
                          onClick={handlePreview}
                          style={{
                            background: "transparent",
                            border: "2px solid #5461BE",
                            color: "#5461BE",
                            borderRadius: "8px",
                            padding: "6px 14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                      >
                        Preview
                      </button>
                  )}
                  <button
                      onClick={handleDownload}
                      disabled={downloading}
                      style={{
                        background: downloading ? "#a1a1a1" : "#5461BE",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 14px",
                        fontWeight: 500,
                        cursor: downloading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "all 0.2s ease",
                      }}
                  >
                    {downloading ? (
                        <CircularProgress size={18} sx={{ color: "#fff" }} />
                    ) : (
                        "Download"
                    )}
                  </button>
                </div>
              </>
          )}

          {/* Image Preview Dialog */}
          {isImage && (
              <Dialog
                  open={openPreview}
                  onClose={handleClosePreview}
                  fullWidth
                  maxWidth="md"
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
                    "&:hover": { backgroundColor: "#3d4a9f" }
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
                  className="searchIconPPR"
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
                <div style={{color: "#888", fontSize: 14, padding: 12}}>
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