import { useEffect, useState } from "react";
import styles from "./PastReportsAndDischarge.module.scss";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPatientHistory } from "../../../../components/State/Doctor/Action";
import { Modal, Box } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";

const formatValue = (value) => {
  if (!value) return "N/A";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (dayjs(value).isValid() && typeof value === "string") {
    return dayjs(value).format("DD MMM YYYY");
  }
  if (typeof value === "object") {
    return (
      <ul style={{ paddingLeft: "1rem", margin: 0 }}>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {formatValue(v)}
          </li>
        ))}
      </ul>
    );
  }
  return JSON.stringify(value);
};
const prettyKey = (str = "") =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/[_\-]/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const isEmpty = (v) => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string" && v.trim() === "") return true;
  if (Array.isArray(v) && v.length === 0) return true;
  if (typeof v === "object" && Object.keys(v).length === 0) return true;
  return false;
};

/* Remove unwanted keys + remove empty items */
const sanitizeConsultationData = (cd = {}) => {
  const omit = new Set([
    "medicalHistory",
    "previousHistoryData",
    "_id",
    "timestamp",
    "patientId",
  ]);

  const cleaned = {};

  for (let [key, value] of Object.entries(cd)) {
    if (omit.has(key)) continue;
    if (isEmpty(value)) continue;

    cleaned[key] = value;
  }

  return cleaned;
};
const smartFormat = (value) => {
  if (value === null || value === undefined)
    return <span style={{ color: "#bbb" }}>—</span>;

  if (typeof value === "string" || typeof value === "number") return value;

  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return (
      <ul style={{ paddingLeft: "1rem", margin: 0 }}>
        {value.map((v, i) => (
          <li key={i}>{smartFormat(v)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([k, v]) => !isEmpty(v));
    if (entries.length === 0) return null;

    return (
      <ul style={{ paddingLeft: "1rem", margin: 0 }}>
        {entries.map(([k, v]) => (
          <li key={k}>
            <strong>{prettyKey(k)}:</strong> {smartFormat(v)}
          </li>
        ))}
      </ul>
    );
  }

  return String(value);
};

const safeFormat = (value) => {
  if (value === null || value === undefined)
    return <span style={{ color: "#888" }}>—</span>;

  // string / number
  if (typeof value === "string" || typeof value === "number") return value;

  // date string
  if (typeof value === "string" && dayjs(value).isValid()) {
    return dayjs(value).format("DD MMM YYYY");
  }

  // array
  if (Array.isArray(value)) {
    return (
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {value.map((v, i) => (
          <li key={i}>{safeFormat(v)}</li>
        ))}
      </ul>
    );
  }

  // object → render key-value list
  if (typeof value === "object") {
    return (
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {safeFormat(v)}
          </li>
        ))}
      </ul>
    );
  }

  return JSON.stringify(value);
};

const PastReportsAndDischarge = ({ patientId }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    dispatch(getPatientHistory(patientId));
  }, [dispatch, patientId]);

  const closeModal = () => setActiveModal(null);
  const patientHistory = useSelector((store) => store.doctor.patientHistory);
  const isLoadingPatientHistory = useSelector(
    (store) => store.doctor.isLoadingPatientHistory
  );
  const capitalize = (str) =>
    typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  // console.log("Patient History:", patientHistory);
  return (
    <div className={styles.container}>
      <header>
        <p>Past Reports And Discharges</p>
      </header>
      <Modal open={!!activeModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {activeModal && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Consultation Summary
              </h2>

              {/* ======================
        BASIC INFO
    ======================= */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionTitle}>Overview</div>

                <div className={styles.dataItem}>
                  <strong>Date:</strong>{" "}
                  {dayjs(activeModal.date).format("DD MMM YYYY, hh:mm A")}
                </div>
                <div className={styles.dataItem}>
                  <strong>Doctor:</strong> {activeModal.doctor}
                </div>
                <div className={styles.dataItem}>
                  <strong>Department:</strong> {activeModal.department}
                </div>
              </div>

              {/* ======================
        CONSULTATION DATA
    ======================= */}
              {(() => {
                const cd = sanitizeConsultationData(
                  activeModal.consultationData || {}
                );
                if (Object.keys(cd).length === 0) return null;

                const diagnosis = cd.diagnosisAndVitals || cd.diagnosisVitals;
                const pm = cd.prescriptionAndMedicines;
                const tests = cd.treatmentAndTests;

                const otherKeys = Object.keys(cd).filter(
                  (k) =>
                    ![
                      "diagnosisVitals",
                      "diagnosisAndVitals",
                      "prescriptionAndMedicines",
                      "treatmentAndTests",
                      "files",
                    ].includes(k)
                );

                return (
                  <>
                    {/* --- Diagnosis & Vitals --- */}
                    {diagnosis && (
                      <div className={styles.sectionBlock}>
                        <div className={styles.sectionTitle}>
                          Diagnosis & Vitals
                        </div>
                        <div className={styles.dataItem}>
                          {smartFormat(diagnosis)}
                        </div>
                      </div>
                    )}

                    {/* --- Prescription --- */}

                    {pm && (
                      <div className={styles.sectionBlock}>
                        <div className={styles.sectionTitle}>
                          Prescription & Medicines
                        </div>

                        {/* Problem Statement */}
                        {pm.problemStatement && (
                          <div className={styles.dataItem}>
                            {pm.problemStatement}
                          </div>
                        )}

                        {/* ICD Code */}
                        {pm.icdCode && (
                          <div className={styles.dataItem}>
                            <strong>ICD Code:</strong> {pm.icdCode}
                          </div>
                        )}

                        {/* Medications */}
                        {Array.isArray(pm.medications) &&
                          pm.medications.length > 0 && (
                            <>
                              <h4 style={{ marginBottom: 6 }}>Medications</h4>

                              {pm.medications.map((m, i) => {
                                const medText =
                                  typeof m === "string"
                                    ? m
                                    : m.text || m.name || JSON.stringify(m);

                                return (
                                  <div key={i} className={styles.subList}>
                                    {medText}
                                  </div>
                                );
                              })}
                            </>
                          )}

                        {/* Therapies */}
                        {Array.isArray(pm.injectionsTherapies) &&
                          pm.injectionsTherapies.length > 0 && (
                            <>
                              <h4>Therapies / Injections</h4>
                              {pm.injectionsTherapies.map((t, i) => (
                                <div key={i} className={styles.dataItem}>
                                  {t}
                                </div>
                              ))}
                            </>
                          )}

                        {/* Lifestyle */}
                        {Array.isArray(pm.lifestyle) &&
                          pm.lifestyle.length > 0 && (
                            <>
                              <h4>Lifestyle Advice</h4>
                              {pm.lifestyle.map((l, i) => (
                                <div key={i} className={styles.dataItem}>
                                  {l}
                                </div>
                              ))}
                            </>
                          )}

                        {/* Non-drug */}
                        {Array.isArray(pm.nonDrugRecommendations) &&
                          pm.nonDrugRecommendations.length > 0 && (
                            <>
                              <h4>Non-Drug Recommendations</h4>
                              {pm.nonDrugRecommendations.map((n, i) => (
                                <div key={i} className={styles.dataItem}>
                                  {n}
                                </div>
                              ))}
                            </>
                          )}

                        {/* Follow-Up */}
                        {(pm.followUp || pm.followUpInstructions) && (
                          <>
                            <h4>Follow-Up</h4>

                            {pm.followUp && (
                              <div className={styles.dataItem}>
                                {pm.followUp}
                              </div>
                            )}

                            {pm.followUpInstructions && (
                              <div className={styles.dataItem}>
                                {smartFormat(pm.followUpInstructions)}
                              </div>
                            )}
                          </>
                        )}

                        {/* Precautions */}
                        {pm.precautions && (
                          <>
                            <h4>Precautions</h4>
                            <div className={styles.dataItem}>
                              {pm.precautions}
                            </div>
                          </>
                        )}

                        {/* Therapy Plan */}
                        {pm.therapyPlan && (
                          <>
                            <h4>Therapy Plan</h4>
                            <div className={styles.dataItem}>
                              {pm.therapyPlan}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* --- Tests & Treatments --- */}
                    {tests && (
                      <div className={styles.sectionBlock}>
                        <div className={styles.sectionTitle}>
                          Treatments & Tests
                        </div>

                        {tests.treatments?.length > 0 &&
                          tests.treatments.map((t, i) => (
                            <div className={styles.subList} key={i}>
                              <strong>{t.name}</strong> – {t.dosage} (
                              {t.frequency}) for {t.duration}
                            </div>
                          ))}

                        {tests.tests?.length > 0 && (
                          <div className={styles.dataItem}>
                            {smartFormat(tests.tests)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* --- Additional Clean Data --- */}
                    {otherKeys.length > 0 && (
                      <div className={styles.sectionBlock}>
                        <div className={styles.sectionTitle}>
                          Additional Data
                        </div>

                        {otherKeys.map((k) => (
                          <div className={styles.dataItem} key={k}>
                            <strong>{prettyKey(k)}:</strong>{" "}
                            {smartFormat(cd[k])}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </Box>
      </Modal>
      {/* Card List */}

      {isLoadingPatientHistory ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36vh", // or full height you need
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} size={58} />
        </Box>
      ) : patientHistory.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36vh", // or full height you need
          }}
        >
          <p className={styles.noHistory}>No History Found</p>
        </Box>
      ) : (
        <div className={styles.cardWrapper}>
          {patientHistory?.length > 0 ? (
            patientHistory.map((entry, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => setActiveModal(entry)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.top}>
                  <div className={styles.left}>
                    <img src="/assets/labIcon.svg" alt="icon" />
                    <div className={styles.meta}>
                      <h3>
                        Consultation with{" "}
                        {entry.doctor || "Doctor not specified"}
                      </h3>
                      <p>
                        {entry.date
                          ? dayjs(entry.date).format("DD MMM YYYY, hh:mm A")
                          : "Date not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.details}>
                  <p>
                    <strong>Department:</strong> {entry.department || "N/A"}
                  </p>
                  <p className={styles.infoLine}>
                    <strong>Diagnosis:</strong>{" "}
                    {entry.consultationData?.diagnosisAndVitals?.text || "N/A"}
                  </p>
                  <p className={styles.infoLine}>
                    <strong>Complaints:</strong>{" "}
                    {entry.consultationData?.complaints || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No consultation history found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PastReportsAndDischarge;
