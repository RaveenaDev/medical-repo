import React, { forwardRef } from "react";
import styles from "./PrescriptionAndMedicinesPrint.module.scss";

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
  ({ prescriptions = {}, patient = {} }, ref) => {
    const {
      medications,
      injectionsTherapies,
      nonDrugRecommendations,
      lifestyle,
      precautions,
      followUp,
      followUpInstructions, // in case you start using it later
      reviewDate,
      icdCode,
      problemStatement,
      therapyPlan,
      notes,
      aiGeneratedText,
    } = prescriptions || {};

    const today = new Date().toLocaleDateString("en-IN");
    const normalizedMedications = Array.isArray(medications)
      ? medications
          .map((m) =>
            typeof m === "string"
              ? m
              : typeof m?.text === "string"
              ? m.text
              : ""
          )
          .filter(isNonEmptyString)
      : [];
    console.log("followUp:", followUp);
    console.log("followUpInstructions RAW:", followUpInstructions);
    console.log("reviewDate:", reviewDate);

    return (
      <div ref={ref} className={`${styles.printLayout} ${styles.printOnly}`}>
        {/* Letterhead-style Header */}
        <header className={styles.pdfHeader}>
          <div className={styles.hospitalName}>
            <h1>SAI ASHA HOSPITAL</h1>
            <p className={styles.specialties}>
              MEDICINE | ORTHOPEDIC | SURGERY | MATERNITY | PEDIATRIC | DENTAL
            </p>
            <p className={styles.contact}>
              Address: 505, 1st Floor, Landmark XYZ, Mumbai – 400706 <br />
              Tel: 022-35017062, 022-35031026 | Mob: 9820889390
            </p>
          </div>
          <div className={styles.logoBox}>
            <span className={styles.logo}>✚</span>
          </div>
        </header>

        {/* Patient Details */}
        <section className={styles.patientInfo}>
          <div>
            <Row label="Patient Name" value={patient?.name || "N/A"} />
            <Row
              label="Age / Gender"
              value={`${patient?.age ?? "N/A"} / ${patient?.gender ?? "N/A"}`}
            />
          </div>
          <div>
            <Row label="Date" value={today} />
            <Row label="ID / OPD No" value={patient?.patId || "N/A"} />
          </div>
        </section>

        <hr className={styles.separator} />

        {/* Clinical Summary */}
        <Section title="Clinical Summary">
          {[
            isNonEmptyString(problemStatement) && (
              <Row
                key="ps"
                label="Problem Statement"
                value={problemStatement}
              />
            ),
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

        {/* Injections / Therapies */}
        <Section title="Injections / Therapies">
          <List items={injectionsTherapies} />
        </Section>

        {/* Lifestyle Advice */}
        <Section title="Lifestyle Advice">
          <List items={lifestyle} />
        </Section>

        {/* Non-Drug Recommendations */}
        <Section title="Non-Drug Recommendations">
          <List items={nonDrugRecommendations} />
        </Section>

        {/* Precautions */}
        <Section title="Precautions">
          {isNonEmptyString(precautions) ? <p>{precautions}</p> : null}
        </Section>

        {/* Follow-Up */}
        <Section title="Follow-Up">
          {Array.isArray(followUpInstructions) &&
            followUpInstructions.filter(isNonEmptyString).map((item, idx) => {
              const [label, ...rest] = item.split(":");
              const value = rest.join(":").trim();
              return value ? (
                <p key={idx}>
                  <strong>{label}:</strong> {value}
                </p>
              ) : (
                <p key={idx}>{item}</p>
              );
            })}
        </Section>

        {/* Notes (Doctor / AI) */}
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

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.signatureBox}>
            <div className={styles.signLine}></div>
            <p>Doctor’s Signature</p>
          </div>
          <p className={styles.note}>
            ⚕ Please follow instructions carefully and consult if symptoms
            persist.
          </p>
        </footer>
      </div>
    );
  }
);

export default PrescriptionAndMedicinesPrint;
