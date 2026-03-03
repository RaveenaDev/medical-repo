import React, { forwardRef } from "react";
import styles from "./PrescriptionAndMedicinesPrint.module.scss";
import { formatToDDMMYYYY } from "../../../../../utils/dateFormatter";

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isNonEmptyArray = (arr) =>
  Array.isArray(arr) && arr.filter(isNonEmptyString).length > 0;

const Row = ({ label, value }) =>
  isNonEmptyString(value) ? (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  ) : null;

const Section = ({ title, children }) => {
  if (!children) return null;
  // If children is an array, remove falsy entries after mapping
  const content = Array.isArray(children) ? children.filter(Boolean) : children;
  const isEmpty =
    (Array.isArray(content) && content.length === 0) ||
    (typeof content === "string" && !isNonEmptyString(content)) ||
    !content;
  if (isEmpty) return null;

  return (
    <section className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      {Array.isArray(content) ? content : <div>{content}</div>}
    </section>
  );
};

const List = ({ items }) => {
  if (!isNonEmptyArray(items)) return null;
  const cleaned = items.filter(isNonEmptyString);
  if (cleaned.length === 0) return null;
  return (
    <ul className={styles.bulletList}>
      {cleaned.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  );
};

const PrescriptionAndMedicinesPrint = forwardRef(
  ({ prescriptions = {}, patient = {}, summary = {} }, ref) => {
    const {
      diagnosis,
      medications,
      injectionsTherapies,
      nonDrugRecommendations,
      lifestyle,
      precautions,
      followUp,
      followUpInstructions,
      reviewDate,
      icdCode,
      problemStatement,
      therapyPlan,
      notes,
      aiGeneratedText,
    } = prescriptions || {};

    const rawSummary = summary?.description || "";

    const summaryText = rawSummary
      .replace(/\*\*/g, "") // remove markdown bold
      .replace(/\n+/g, " ") // remove excessive newlines
      .trim();
    const todayFormatted = formatToDDMMYYYY(new Date());
    const normalizedDiagnosis = Array.isArray(diagnosis)
      ? diagnosis
          .map((d) =>
            typeof d === "string"
              ? d
              : typeof d?.name === "string"
              ? `${d.name}${d.icd ? ` (${d.icd})` : ""}`
              : "",
          )
          .filter(isNonEmptyString)
      : [];
    const normalizedMedications = Array.isArray(medications)
      ? medications
          .map((m) =>
            typeof m === "string"
              ? m
              : typeof m?.text === "string"
              ? m.text
              : "",
          )
          .filter(isNonEmptyString)
      : [];

    // console.log("followUp:", followUp);
    // console.log("followUpInstructions RAW:", followUpInstructions);
    // console.log("reviewDate:", reviewDate);

    return (
      <div ref={ref} className={`${styles.printLayout} ${styles.printOnly}`}>
        {/* ================= PAGE 1 ================= */}
        <div className={`${styles.printPage} ${styles.pageBreak}`}>
          <header className={styles.pdfHeader}>
            <div className={styles.hospitalName}>
              <h1>SAI ASHA HOSPITAL</h1>
              <p className={styles.specialties}>
                MEDICINE | ORTHOPEDIC | SURGERY | MATERNITY | PEDIATRIC | DENTAL
              </p>
              <p className={styles.contact}>
                Address: 505, 1st Floor, Landmark XYZ, Mumbai – 400706 <br />
                Tel: 022-35017062 | Mob: 9820889390
              </p>
            </div>
            <div className={styles.logoBox}>
              <span className={styles.logo}>✚</span>
            </div>
          </header>

          <section className={styles.patientInfo}>
            <div>
              <Row label="Patient Name" value={patient?.name || "N/A"} />
              <Row
                label="Age / Gender"
                value={`${patient?.age ?? "N/A"} / ${patient?.gender ?? "N/A"}`}
              />
            </div>
            <div>
              <Row label="Date" value={todayFormatted} />
              <Row label="ID / OPD No" value={patient?.patId || "N/A"} />
            </div>
          </section>

          <hr className={styles.separator} />

          {/* Diagnosis Section */}
          <Section title="Diagnosis">
            {normalizedDiagnosis.length > 0 ? (
              <List items={normalizedDiagnosis} />
            ) : (
              isNonEmptyString(problemStatement) && <p>{problemStatement}</p>
            )}
          </Section>

          {/* Patient Summary Section */}
          {/* <Section title="Patient History">
            {isNonEmptyString(summaryText) &&
              summaryText
                .split(". ")
                .map((line, i) => (
                  <p key={i}>
                    {line.trim().endsWith(".")
                      ? line.trim()
                      : line.trim() + "."}
                  </p>
                ))}
          </Section> */}
          {/* Clinical Summary */}
          <Section title="Clinical Summary">
            {[
              isNonEmptyString(icdCode) && (
                <Row key="icd" label="ICD Code" value={icdCode} />
              ),
              isNonEmptyString(therapyPlan) && (
                <Row key="plan" label="Therapy Plan" value={therapyPlan} />
              ),
            ]}
          </Section>

          {/* Medications */}
          <Section title="Medications">
            {normalizedMedications.length > 0 ? (
              <table className={styles.pdfTable}>
                <thead>
                  <tr>
                    <th>Medicine & Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {normalizedMedications.map((m, i) => (
                    <tr key={i}>
                      <td>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </Section>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className={`${styles.printPage}`}>
          <Section title="Injections / Therapies">
            <List items={injectionsTherapies} />
          </Section>

          <Section title="Lifestyle Advice">
            <List items={lifestyle} />
          </Section>

          <Section title="Non-Drug Recommendations">
            <List items={nonDrugRecommendations} />
          </Section>

          <Section title="Precautions">
            {isNonEmptyString(precautions) ? <p>{precautions}</p> : null}
          </Section>

          <Section title="Follow-Up">
            {Array.isArray(followUpInstructions) &&
              followUpInstructions
                .filter(isNonEmptyString)
                .map((item, idx) => <p key={idx}>{item}</p>)}
          </Section>

          <Section title="Notes">
            {[
              isNonEmptyString(notes) && <p key="notes">{notes}</p>,
              isNonEmptyString(aiGeneratedText) && (
                <p key="ai" className={styles.subtle}>
                  <strong>AI Summary:</strong> {aiGeneratedText}
                </p>
              ),
            ]}
          </Section>

          <footer className={styles.footer}>
            <div className={styles.signatureBox}>
              <div className={styles.signLine}></div>
              <p>Doctor’s Signature</p>
            </div>
            <p className={styles.note}>
              Please follow instructions carefully and consult if symptoms
              persist.
            </p>
          </footer>
        </div>
      </div>
    );
  },
);

export default PrescriptionAndMedicinesPrint;
