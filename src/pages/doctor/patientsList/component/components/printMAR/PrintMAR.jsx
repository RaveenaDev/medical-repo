import React from "react";
import styles from "./PrintMAR.module.scss";

const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  return isNaN(date) ? "—" : date.toLocaleDateString("en-IN");
};

const PrintMAR = ({ patient = {}, records = [] }) => {
  const today = new Date().toLocaleDateString("en-IN");

  return (
    <div id="print-mar" className={styles.printPage}>
      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <h2>Medication Administration Record (MAR)</h2>

        <div className={styles.infoGrid}>
          <div>
            <span>Patient Name</span>
            <div>{patient.name || "Unknown"}</div>
          </div>

          <div>
            <span>Patient ID</span>
            <div>{patient.id || "—"}</div>
          </div>

          <div>
            <span>Age / Gender</span>
            <div>
              {patient.age || "—"} / {patient.gender || "—"}
            </div>
          </div>

          <div>
            <span>Date</span>
            <div>{today}</div>
          </div>
        </div>
      </header>

      {/* ---------- MAR Table ---------- */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>

            <th>Medication</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Instructions</th>
            <th>Administered By</th>
            <th>Signature</th>
          </tr>
        </thead>

        <tbody>
          {records.length > 0 ? (
            records.map((item, idx) => (
              <tr key={idx}>
                <td>
                  {formatDate(item.date)} {item.time || "—"}
                </td>

                <td className={styles.medication}>{item.medication || "—"}</td>
                <td>{item.dose || "—"}</td>
                <td>{item.route || "—"}</td>
                <td className={styles.instructions}>{item.notes || "—"}</td>
                <td>{item.givenBy || "—"}</td>
                <td className={styles.signature}></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className={styles.empty}>
                No medication entries
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ---------- Footer ---------- */}
      <footer className={styles.footer}>
        <div>Prepared By</div>
        <div>Checked By</div>
        <div>Date</div>
      </footer>
    </div>
  );
};

export default PrintMAR;
