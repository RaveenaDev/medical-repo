import React, { forwardRef } from "react";
import styles from "./TreatmentAndTestPrint.module.scss";

const TreatmentAndTestPrint = forwardRef(
  ({ treatments, tests, patient }, ref) => {
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
                </tr>
              </thead>
              <tbody>
                {treatments.map((t, i) => (
                  <tr key={i}>
                    <td>{t.name}</td>
                    <td>{t.dosage}</td>
                    <td>{t.frequency}</td>
                    <td>{t.duration}</td>
                  </tr>
                ))}
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
                </tr>
              </thead>
              <tbody>
                {tests.map((t, i) => (
                  <tr key={i}>
                    <td>{t.name}</td>
                    <td>{t.type}</td>
                    <td>{t.priority}</td>
                  </tr>
                ))}
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
