import React, { forwardRef } from "react";
import styles from "./TreatmentAndTestPrint.module.scss";

const frequencyMap = {
  OD: "Once daily",
  BD: "Twice daily",
  TDS: "Thrice daily",
  QID: "Four times daily",
  SOS: "As needed",
};

const priorityMap = {
  Routine: "Normal",
  Urgent: "High priority",
  Stat: "Immediate",
};

const TreatmentAndTestPrint = forwardRef(
  ({ treatments, tests, patient }, ref) => {
    // Check if treatments/tests have any notes
    const hasTreatmentNotes = treatments.some((t) => t.notes && t.notes.trim());
    const hasTestNotes = tests.some((t) => t.notes && t.notes.trim());

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
            <p>
              <strong>Patient Name:</strong> {patient?.name || "N/A"}
            </p>
            <p>
              <strong>Age / Gender:</strong> {patient?.age || "N/A"} /{" "}
              {patient?.gender || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>ID / OPD No:</strong> {patient?.patId || "N/A"}
            </p>
          </div>
        </section>

        <hr className={styles.separator} />

        {/* Treatments */}
        {treatments.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Prescribed Medicines</h4>
            <table className={styles.pdfTable}>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  {hasTreatmentNotes && <th>Notes</th>}
                </tr>
              </thead>
              <tbody>
                {treatments.map((t, i) => {
                  const freqText = frequencyMap[t.frequency];
                  return (
                    <tr key={i}>
                      <td>{t.name}</td>
                      <td>{t.dosage}</td>
                      <td>
                        {t.frequency}
                        {freqText ? ` (${freqText})` : ""}
                      </td>
                      <td>{t.duration}</td>
                      {hasTreatmentNotes && <td>{t.notes || "-"}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {/* Tests */}
        {tests.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Lab / Diagnostic Tests</h4>
            <table className={styles.pdfTable}>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Type</th>
                  <th>Priority</th>
                  {hasTestNotes && <th>Notes</th>}
                </tr>
              </thead>
              <tbody>
                {tests.map((t, i) => {
                  const priText = priorityMap[t.priority];
                  return (
                    <tr key={i}>
                      <td>{t.name}</td>
                      <td>{t.type}</td>
                      <td>
                        {t.priority}
                        {priText ? ` (${priText})` : ""}
                      </td>
                      {hasTestNotes && <td>{t.notes || "-"}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.signatureBox}>
            <div className={styles.signLine}></div>
            <p>Doctor’s Signature</p>
          </div>
          <p className={styles.note}>
            ⚕ Please follow dosage instructions carefully and consult if
            symptoms persist.
          </p>
        </footer>
      </div>
    );
  }
);

export default TreatmentAndTestPrint;
