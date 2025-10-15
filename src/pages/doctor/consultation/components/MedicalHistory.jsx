// MedicalHistory.jsx — list -> detail using CSS modules, with file management for consultationData.files.{images,videos,attachments}
import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import VisitCard from "../../patientsList/component/records/VisitCard/VisitCard.jsx";
import styles from "./MedicalHistory.module.scss";

/* ---------- helpers ---------- */
const palette = ["#5461BE", "#2E823B", "#EAA000", "#F14400"];

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return isNaN(d) ? "N/A" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
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
  return f.url || f.Url || f.URL || f.link || f.href || f.path || f.fileUrl || "";
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
const FILE_KEYS = new Set(["files", "attachments", "documents", "images", "videos"]);
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
  if (value === null || value === undefined || value === "") return <span style={{ color: "#888" }}>N/A</span>;
  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: "#888" }}>No items</span>;
    return (
        <ul className={styles.kvList}>
          {value.map((v, i) => (
              <li key={i}>{isObj(v) || Array.isArray(v) ? <JsonValue value={v} /> : String(v)}</li>
          ))}
        </ul>
    );
  }
  if (isObj(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return <span style={{ color: "#888" }}>No data</span>;
    return (
        <div className={styles.kvTable}>
          {entries.map(([k, v]) => (
              <div className={styles.kvRow} key={k}>
                <div className={styles.kvKey}>{k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_\-]+/g, " ")}</div>
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

  if (!Array.isArray(files) || files.length === 0) return <div style={{ color: "#888" }}>No files</div>;

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
                          e.currentTarget.parentElement.classList.add(styles.fileThumbBroken);
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
                      onClick={() => openPreview(f)}
                      title={name}
                  >
                    <div className={styles.fileIcon} aria-hidden>📄</div>
                    <div className={styles.fileMeta}>
                      <div className={styles.fileName}>{name}</div>
                      <div className={styles.fileType}>{type || "application/pdf"}</div>
                      <div className={styles.fileOpen}>Click to preview</div>
                    </div>
                  </button>
              );
            }

            return (
                <div key={f?._id || i} className={styles.fileCard} title={name}>
                  <div className={styles.fileIcon} aria-hidden>📎</div>
                  <div className={styles.fileMeta}>
                    <div className={styles.fileName}>{name}</div>
                    {type ? <div className={styles.fileType}>{type}</div> : null}
                    {url ? (
                        <a className={styles.fileOpen} href={url} target="_blank" rel="noreferrer">Open</a>
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
                        style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
                    />
                ) : isPdf(active) ? (
                    <iframe
                        src={fileUrl(active)}
                        title={fileName(active)}
                        style={{ width: "100%", height: "80vh", border: "none", background: "#fff" }}
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
export const MedicalHistory = ({ patientDetails = {}, loading }) => {
  const consultations = Array.isArray(patientDetails?.consultations) ? patientDetails.consultations : [];
  const admissionRequests = Array.isArray(patientDetails?.admissionRequests) ? patientDetails.admissionRequests : [];

  const combined = useMemo(() => {
    const normConsultations = consultations.map((c) => ({
      id: c?._id || `consult-${c?.appointment || Math.random().toString(36).slice(2)}`,
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
      description: a?.admissionDetails?.medicalNote || a?.status || "Admission Request",
      doctorName: a?.approval?.doctor?.name || a?.doctor?.name || "N/A",
      departmentName: a?.admissionDetails?.department || "N/A",
      typeofVisit: "Admission",
      raw: a,
    }));

    return [...normConsultations, ...normAdmissions].sort((a, b) => {
      if (!a.dateISO && !b.dateISO) return 0;
      if (!a.dateISO) return 1;
      if (!b.dateISO) return -1;
      return new Date(b.dateISO) - new Date(a.dateISO);
    });
  }, [consultations, admissionRequests]);

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return combined;
    return combined.filter((item) =>
        (item.description || "").toLowerCase().includes(q) ||
        (item.doctorName || "").toLowerCase().includes(q) ||
        (item.departmentName || "").toLowerCase().includes(q) ||
        (item.typeofVisit || "").toLowerCase().includes(q)
    );
  }, [combined, search]);

  console.log("cOM" ,combined)

  /* ---------- detail subviews ---------- */
  const DetailHeader = ({ title, dateISO, onBack }) => (
      <div className={styles.recordsDetailsHeader}>
        <div className={styles.headingContainer}>
          <ChevronLeft size={24} strokeWidth={1.7} style={{ cursor: "pointer", color: "#25307F" }} onClick={onBack} />
          <div className={styles.heading}>Back</div>
        </div>
        {/* <div className={styles.patientRecordsHeading}>{title}</div> */}
        <div style={{ marginLeft: "auto", color: "#25307F", fontWeight: 600 }}>{formatDate(dateISO)}</div>
      </div>
  );

  const ConsultationDetail = ({ item }) => {
    const c = item?.raw || {};
    const data = c?.consultationData || {};
    const cleanData = stripFileBuckets(data);

    // Accept nested consultationData.files.{images,videos,attachments}
    const files = gatherFiles(
        data?.files        // nested files object with buckets
    );

    return (
        <div className={styles.recordsDetailsBody}>
          <div className={styles.kvTable}>
            <div className={styles.kvRow}><div className={styles.kvKey}>Doctor</div><div className={styles.kvVal}>{item.doctorName}</div></div>
            <div className={styles.kvRow}><div className={styles.kvKey}>Department</div><div className={styles.kvVal}>{item.departmentName}</div></div>
            <div className={styles.kvRow}><div className={styles.kvKey}>Type</div><div className={styles.kvVal}>{item.typeofVisit}</div></div>
            {c?.status && <div className={styles.kvRow}><div className={styles.kvKey}>Status</div><div className={styles.kvVal}>{c.status}</div></div>}
            {c?.caseId && <div className={styles.kvRow}><div className={styles.kvKey}>Case ID</div><div className={styles.kvVal}>{c.caseId}</div></div>}
            {/*{c?.appointment && <div className={styles.kvRow}><div className={styles.kvKey}>Appointment</div><div className={styles.kvVal}>{c.appointment}</div></div>}*/}
            {c?.followUpRequired !== undefined && (
                <div className={styles.kvRow}><div className={styles.kvKey}>Follow-up Required</div><div className={styles.kvVal}>{c.followUpRequired ? "Yes" : "No"}</div></div>
            )}
            {c?.treatment?.note && <div className={styles.kvRow}><div className={styles.kvKey}>Treatment Note</div><div className={styles.kvVal}>{c.treatment.note}</div></div>}
          </div>

          {!isEmpty(cleanData) && (
              <>
                <h4 style={{ marginTop: 16 }}>Consultation Data</h4>
                <div className={styles.kvTable}>
                  {Object.entries(cleanData).map(([k, v]) => (
                      <div className={styles.kvRow} key={k}>
                        <div className={styles.kvKey}>{k.replace(/([a-z])([A-Z])/g, "$1 $2")}</div>
                        <div className={styles.kvVal}>{Array.isArray(v) || isObj(v) ? JSON.stringify(v) : String(v ?? "N/A")}</div>
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
            {a?.caseId && <div className={styles.kvRow}><div className={styles.kvKey}>Case ID</div><div className={styles.kvVal}>{a.caseId}</div></div>}
            <div className={styles.kvRow}><div className={styles.kvKey}>Address</div><div className={styles.kvVal}>{ad?.address || "N/A"}</div></div>
            <div className={styles.kvRow}><div className={styles.kvKey}>Contact</div><div className={styles.kvVal}>{ad?.contact || "N/A"}</div></div>
            <div className={styles.kvRow}><div className={styles.kvKey}>Emergency Contact</div><div className={styles.kvVal}>{ad?.emergencyContact || "N/A"}</div></div>
            {ad?.reason && <div className={styles.kvRow}><div className={styles.kvKey}>Reason</div><div className={styles.kvVal}>{ad.reason}</div></div>}
          </div>

          {admissionFiles.length > 0 && (
              <>
                <h4 style={{ marginTop: 16 }}>Attachments</h4>
                <FileGrid files={admissionFiles} />
              </>
          )}

          <h4 style={{ marginTop: 16, fontSize: "1.1rem", fontWeight: "bold" }}>Progress Phases</h4>
          {phases.length === 0 ? (
              <div style={{ color: "#888" }}>No progress phases</div>
          ) : (
              <div className={styles.phasesStack}>
                {[...phases]
                    .sort((p, q) => new Date(toISO(p?.date) || 0) - new Date(toISO(q?.date) || 0))
                    .map((p, idx) => {
                      const phaseFiles = asFiles(p);
                      return (
                          <div className={styles.phaseCard} key={p?._id || idx}>
                            <div className={styles.phaseCardHeader}>
                              <div className={styles.phaseTitle}>{p?.title || `Phase ${idx + 1}`}</div>
                              <div className={styles.phaseDate}>{formatDate(p?.date)}</div>
                            </div>
                            <div className={styles.kvTable}>
                              <div className={styles.kvRow}><div className={styles.kvKey}>Case ID</div><div className={styles.kvVal}>{p?.caseId || "N/A"}</div></div>
                              <div className={styles.kvRow}><div className={styles.kvKey}>Assigned Doctor</div><div className={styles.kvVal}>{isObj(p?.assignedDoctor) ? p?.assignedDoctor?.name || p?.assignedDoctor?._id || "N/A" : p?.assignedDoctor || "N/A"}</div></div>
                              {p?.isFinal !== undefined && <div className={styles.kvRow}><div className={styles.kvKey}>Final</div><div className={styles.kvVal}>{p.isFinal ? "Yes" : "No"}</div></div>}
                              {p?.isDone !== undefined && <div className={styles.kvRow}><div className={styles.kvKey}>Done</div><div className={styles.kvVal}>{p.isDone ? "Yes" : "No"}</div></div>}
                            </div>

                            {p?.description && (<><div style={{ fontWeight: 600, marginTop: 8 }}>Description</div><div>{p.description}</div></>)}

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

  if (loading) return <div className={styles.visitList} style={{ padding: 16 }}>Loading…</div>;

  // LIST VIEW
  if (!selectedItem) {
    return (
        <section className={styles.container}>
          <div className={styles.visitHeader}>
            <h3>Past Records</h3>
            <div className={styles.searchContainer}>
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
                    departmentbgColor={item.kind === "admission" ? "#F7F8FC" : undefined}
                    departmentColor={item.kind === "admission" ? "#5461BE" : undefined}
                    status={item.kind === "admission" ? item.raw?.status : undefined}
                    kind={item.kind}
                    onClick={() => setSelectedItem(item)}
                />
            ))}

            {filtered.length === 0 && (
                <div style={{ color: "#888", fontSize: 14, padding: 12 }}>No records match your search.</div>
            )}
          </div>
        </section>
    );
  }

  // DETAIL VIEW
  const title = selectedItem.kind === "consultation" ? "Consultation Details" : "Admission Request";
  return (
      <section className={styles.recordsDetails}>
        <DetailHeader title={title} dateISO={selectedItem.dateISO} onBack={() => setSelectedItem(null)} />
        {selectedItem.kind === "consultation" ? <ConsultationDetail item={selectedItem} /> : <AdmissionDetail item={selectedItem} />}
      </section>
  );
};

export default MedicalHistory;
