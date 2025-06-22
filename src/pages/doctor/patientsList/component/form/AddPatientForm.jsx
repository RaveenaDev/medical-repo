import React from "react";
import "./AddPatientForm.scss";

const AddPatientForm = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic
    onClose();
  };

  return (
    <div className="add-patient-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClose}
          className="cancel-btn"
        >
          <path
            d="M10 23.1075L16.5538 16.5538L23.1075 23.1075M23.1075 10L16.5525 16.5538L10 10"
            stroke="#5461BE"
            stroke-width="1.875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <h3>Admission Form</h3>
        <form onSubmit={handleSubmit}>
          <section>
            <h4>Personal Details</h4>
            <div className="form-section">
              <div className="form-group">
                <div className="form-field">
                  <label>Patient Name</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Patient ID</label>
                  <input type="text" required />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Contact No.</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Address</label>
                  <input type="text" required />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Age</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <input type="text" required />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Emergency Contact</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Emergency Contact Name</label>
                  <input type="text" required />
                </div>
              </div>
            </div>
          </section>
          <section>
            <h4>Medical notes</h4>
            <div className="form-section">
              <div className="form-note">
                Patient presents with classic symptoms of angina. ECG changes
                suggestive of ischemia. Recommend immediate cardiac enzyme panel
                and ECG monitoring. Consider starting aspirin and beta-blockers
                pending further evaluation.
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Date</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Deposit Given Rs.</label>
                  <input type="text" required />
                </div>
              </div>

              <div className="form-consent">
                I hereby consent to any necessary medical procedures, including
                surgeries, medications, diagnostic tests, biopsies, blood
                transfusions, cardiac defibrillation, and pacing. I understand
                and accept the potential risks involved and will not hold the
                hospital responsible for any outcomes arising during or after
                these procedures.
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label>Doctor Signature</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Witness</label>
                  <input type="text" required />
                </div>
                <div className="form-field">
                  <label>Patient Signature</label>
                  <input type="text" required />
                </div>
              </div>
            </div>
          </section>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              Admit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
