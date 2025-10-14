// MedicalHistory.jsx  (REPLACE FILE)
import { useEffect, useMemo, useState } from "react";
import VisitCard from "../../patientsList/component/records/VisitCard/VisitCard.jsx"; // keep your existing card
import "../../patientsList/component/records/PatientPreviousRecord.scss";            // re-use existing styles

/* -------- helpers kept from previous medical record flow -------- */
const palette = ["#5461BE", "#2E823B", "#EAA000", "#F14400"];
const API_BASE = import.meta.env.VITE_API_URL || "";

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return isNaN(d) ? "N/A" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
};
const toISO = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d) ? null : d.toISOString();
};
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const isEmptyObj = (o) => !o || !isObj(o) || Object.keys(o).length === 0;

/* ---- file helpers for attachments in detail view ---- */
const getFileUrl = (f) => (typeof f === "string" ? f : f?.url || f?.link || f?.href || f?.path || f?.fileUrl || "");
const getFileName = (f) => {
  if (typeof f === "string") return f.split("/").pop() || "File";
  return f?.originalName || f?.name || f?.fileName || "File";
};
const getFileType = (f) => {
  if (typeof f === "string") {
    const lower = f.toLowerCase();
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/.test(lower)) return "image/*";
    if (/\.(pdf)$/.test(lower)) return "application/pdf";
    return "";
  }
  return f?.fileType || f?.type || "";
};
const isImage = (f) => (getFileType(f) || "").toLowerCase().startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(getFileName(f));
const isPdf = (f) => (getFileType(f) || "").toLowerCase() === "application/pdf" || /\.pdf$/i.test(getFileName(f));

/* ---------------- API ---------------- */
async function fetchPatientRecords(patId) {
  if (!patId) throw new Error("Missing patId");
  const res = await fetch(`${API_BASE}/api/patients/${encodeURIComponent(patId)}/records`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch ${res.status}`);
  return res.json();
}

/* ------------- MAIN ------------- */
export const MedicalHistory = ({ patient }) => {
  const patId = useMemo(() => patient?.patId || patient?.patID || patient?.id || null, [patient]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [details, setDetails] = useState(null); // full payload
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // list -> detail

  // fetch once per patient
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchPatientRecords(patId);
        if (!alive) return;
        setDetails(data || {});
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [patId]);

  // normalize to combined items (same as previous flow)
  const combined = useMemo(() => {
    const consultations = Array.isArray(details?.consultations) ? details.consultations : [];
    const admissionRequests = Array.isArray(details?.admissionRequests) ? details.admissionRequests : [];

    const normConsultations = consultations.map((c) => ({
      id: c?._id || `consult-${c?.appointment || Math.random().toString(36).slice(2)}`,
      kind: "consultation",
      dateISO: toISO(c?.date),
      displayDate: formatDate(c?.date),
      description: c?.treatment?.note || c?.consultationData?.complaints || c?.status || "Consultation",
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
  }, [details]);

  // search filter
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

  /* ---------- DETAIL RENDERERS (compact) ---------- */
  const DetailHeader = ({ title, dateISO, onBack }) => (
      <div className="records_details_header" style={{ background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" onClick={onBack} className="backBtnPPR">← Back</button>
        <div className="patient-records-heading">{title}</div>
        <div style={{ marginLeft: "auto", color: "#25307F", fontWeight: 600 }}>{formatDate(dateISO)}</div>
      </div>
  );

  const ConsultationDetail = ({ item }) => {
    const c = item?.raw || {};
    const data = c?.consultationData || {};
    const files = Array.isArray(c?.files) ? c.files : [];

    return (
        <div className="records_details_body">
          <div className="kv-table">
            <div className="kv-row"><div className="kv-key">Doctor</div><div className="kv-val">{item.doctorName}</div></div>
            <div className="kv-row"><div className="kv-key">Department</div><div className="kv-val">{item.departmentName}</div></div>
            <div className="kv-row"><div className="kv-key">Type</div><div className="kv-val">{item.typeofVisit}</div></div>
            {c?.status && <div className="kv-row"><div className="kv-key">Status</div><div className="kv-val">{c.status}</div></div>}
            {c?.caseId && <div className="kv-row"><div className="kv-key">Case ID</div><div className="kv-val">{c.caseId}</div></div>}
            {c?.appointment && <div className="kv-row"><div className="kv-key">Appointment</div><div className="kv-val">{c.appointment}</div></div>}
            {c?.followUpRequired !== undefined && (
                <div className="kv-row"><div className="kv-key">Follow-up Required</div><div className="kv-val">{c.followUpRequired ? "Yes" : "No"}</div></div>
            )}
            {c?.treatment?.note && <div className="kv-row"><div className="kv-key">Treatment Note</div><div className="kv-val">{c.treatment.note}</div></div>}
          </div>

          {!isEmptyObj(data) && (
              <>
                <h4 style={{ marginTop: 16 }}>Consultation Data</h4>
                <div className="kv-table">
                  {Object.entries(data).map(([k, v]) => (
                      <div className="kv-row" key={k}>
                        <div className="kv-key">{k.replace(/([a-z])([A-Z])/g, "$1 $2")}</div>
                        <div className="kv-val">{Array.isArray(v) || isObj(v) ? JSON.stringify(v) : String(v || "N/A")}</div>
                      </div>
                  ))}
                </div>
              </>
          )}

          {files.length > 0 && (
              <>
                <h4 style={{ marginTop: 16 }}>Attachments</h4>
                <div className="file-grid">
                  {files.map((f, idx) => {
                    const url = getFileUrl(f);
                    const name = getFileName(f);
                    if (!url) return null;
                    if (isImage(f)) return <a key={idx} className="file-thumb" href={url} target="_blank" rel="noreferrer"><img src={url} alt={name} /><span className="file-caption">{name}</span></a>;
                    if (isPdf(f)) return <a key={idx} className="file-card file-card--pdf" href={url} target="_blank" rel="noreferrer">📄 {name}</a>;
                    return <a key={idx} className="file-card" href={url} target="_blank" rel="noreferrer">📎 {name}</a>;
                  })}
                </div>
              </>
          )}
        </div>
    );
  };

  const AdmissionDetail = ({ item }) => {
    const a = item?.raw || {};
    const ad = a?.admissionDetails || {};
    const phases = Array.isArray(a?.progressPhases) ? a.progressPhases : [];

    return (
        <div className="records_details_body">
          <div className="kv-table">
            {a?.caseId && <div className="kv-row"><div className="kv-key">Case ID</div><div className="kv-val">{a.caseId}</div></div>}
            <div className="kv-row"><div className="kv-key">Address</div><div className="kv-val">{ad?.address || "N/A"}</div></div>
            <div className="kv-row"><div className="kv-key">Contact</div><div className="kv-val">{ad?.contact || "N/A"}</div></div>
            <div className="kv-row"><div className="kv-key">Emergency Contact</div><div className="kv-val">{ad?.emergencyContact || "N/A"}</div></div>
            {ad?.reason && <div className="kv-row"><div className="kv-key">Reason</div><div className="kv-val">{ad.reason}</div></div>}
            <div className="kv-row"><div className="kv-key">Doctor Approval</div><div className="kv-val">{a?.approval?.doctor?.name || "Pending"}</div></div>
            <div className="kv-row"><div className="kv-key">Admin Approval</div><div className="kv-val">{a?.approval?.admin?.name || "Pending"}</div></div>
          </div>

          <h4 style={{ marginTop: 16, fontSize: "1.1rem", fontWeight: "bold" }}>Progress Phases</h4>
          {phases.length === 0 ? (
              <div style={{ color: "#888" }}>No progress phases</div>
          ) : (
              <div className="phases-stack">
                {[...phases]
                    .sort((p, q) => new Date(toISO(p?.date) || 0) - new Date(toISO(q?.date) || 0))
                    .map((p, idx) => (
                        <div className="phase-card" key={p?._id || idx}>
                          <div className="phase-card-header">
                            <div className="phase-title">{p?.title || `Phase ${idx + 1}`}</div>
                            <div className="phase-date">{formatDate(p?.date)}</div>
                          </div>
                          <div className="kv-table">
                            <div className="kv-row"><div className="kv-key">Case ID</div><div className="kv-val">{p?.caseId || "N/A"}</div></div>
                            <div className="kv-row"><div className="kv-key">Assigned Doctor</div><div className="kv-val">{isObj(p?.assignedDoctor) ? p?.assignedDoctor?.name || p?.assignedDoctor?._id || "N/A" : p?.assignedDoctor || "N/A"}</div></div>
                            {p?.isFinal !== undefined && <div className="kv-row"><div className="kv-key">Final</div><div className="kv-val">{p.isFinal ? "Yes" : "No"}</div></div>}
                            {p?.isDone !== undefined && <div className="kv-row"><div className="kv-key">Done</div><div className="kv-val">{p.isDone ? "Yes" : "No"}</div></div>}
                          </div>
                          {p?.description && (<><div style={{ fontWeight: 600, marginTop: 8 }}>Description</div><div>{p.description}</div></>)}
                        </div>
                    ))}
              </div>
          )}
        </div>
    );
  };

  /* ---------- UI ---------- */
  if (!patId) return <div style={{ color: "#c00", padding: 8 }}>Patient ID not found.</div>;
  if (loading) return <div className="visit-list" style={{ padding: 16 }}>Loading…</div>;
  if (err) return <div className="visit-list" style={{ color: "#c00", padding: 16 }}>Failed: {err}</div>;

  // LIST VIEW
  if (!selectedItem) {
    return (
        <section className="patient-visits">
          <div className="visit-header">
            <h3>Past Records</h3>
            <div className="searchContainerPPR">
              <input
                  type="search"
                  className="search_bar"
                  placeholder="Search Records…"
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
                    departmentbgColor={item.kind === "admission" ? "#F7F8FC" : undefined}
                    departmentColor={item.kind === "admission" ? "#5461BE" : undefined}
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
  const title = selectedItem.kind === "consultation" ? "Consultation Details" : "Admission Request";
  return (
      <section className="patient_records_details">
        <DetailHeader title={title} dateISO={selectedItem.dateISO} onBack={() => setSelectedItem(null)} />
        {selectedItem.kind === "consultation" ? (
            <ConsultationDetail item={selectedItem} />
        ) : (
            <AdmissionDetail item={selectedItem} />
        )}
      </section>
  );
};

export default MedicalHistory;
