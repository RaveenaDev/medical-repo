import React from "react";
import "./Diagnosis.scss";
const Diagnosis = () => {
  return (
    <div className="diagnosis-container">
      <section className="diagnosis_info">
        <div className="diagnosis_info_row">
          <div>Medical Record - Visit date: 22 May 2025</div>
          <div>#MR-2024-1847</div>
        </div>
        <div className="diagnosis_info_row">
          <div>Dr. Amit Patel - Cardiologist</div>
          <div className="last_updated">Last Updated: 22 May 2025</div>
        </div>
      </section>
      <section className="diagnosis_actions">
        <div className="action_button">Print Report</div>
        <div className="action_button">Edit Note</div>
        <div className="action_button">Share to Referral</div>
      </section>
      <section className="diagnosis_details"></section>
      <section className="diagnosis_button_container">
        <div className="diagnosis_button">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1537 5.75093C10.6193 5.05675 9.89417 4.53337 9.06701 4.24484C8.23984 3.9563 7.34651 3.91512 6.49631 4.12633C5.6461 4.33754 4.8759 4.79198 4.27992 5.43406C3.68394 6.07613 3.28803 6.878 3.14062 7.74156M11.3749 3.44434V5.97211H8.84708M4.01144 11.2489C4.54568 11.9433 5.27079 12.4669 6.09803 12.7556C6.92526 13.0444 7.81872 13.0856 8.66905 12.8744C9.51937 12.6631 10.2897 12.2086 10.8856 11.5663C11.4816 10.924 11.8774 10.1219 12.0245 9.25823M3.7909 13.5554V11.0277H6.31867"
              stroke="#DAE4FF"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Compare Past Diagnosis
        </div>
      </section>
    </div>
  );
};

export default Diagnosis;
