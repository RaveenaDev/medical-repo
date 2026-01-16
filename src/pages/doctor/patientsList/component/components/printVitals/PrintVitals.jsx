import React from "react";

const PrintVitals = ({ patient = {}, vitals = [], vitalKeys = [] }) => {
  //   console.log("Printing vitals:", { patient, vitals, vitalKeys });
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN") : "—");

  const formatTime = (d) =>
    d
      ? new Date(d).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  return (
    <div id="print-vitals" className="pv-wrap">
      <div className="pv-header">
        <h2>Vital Records</h2>

        <div className="pv-info">
          <div>
            <span>Patient Name</span>
            <div>{patient.name || "—"}</div>
          </div>
          <div>
            <span>PAT ID</span>
            <div>{patient.id || "—"}</div>
          </div>
          <div>
            <span>Age/Gender</span>
            <div>
              {patient.age || "—"}/{patient.gender || "—"}
            </div>
          </div>
          <div>
            <span>Date</span>
            <div>{new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>
      </div>

      <table className="pv-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            {vitalKeys.map((k) => (
              <th key={k}>{k.toUpperCase()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {vitals.map((row, i) => (
            <tr key={i}>
              <td>{formatDate(row.recordedAt)}</td>
              <td>{formatTime(row.recordedAt)}</td>
              {vitalKeys.map((k) => (
                <td key={k}>{row?.vitals?.[k] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintVitals;
