import React, { forwardRef } from "react";
import styles from "./AdmissionFormPDF.module.scss";

const AdmissionFormPDF = forwardRef(
  ({ form, selectedRoom, selectedRoles }, ref) => {
    return (
      <div ref={ref} className={styles.admissionPdf}>
        {/* Header */}
        <div className={styles.admissionPdf__header}>
          <h2>Sai Asha Hospital</h2>
          <p>123 Health Street, Wellness City, India</p>
          <p>Contact: +91-9*********</p>
        </div>

        <hr />

        {/* Title */}
        <h3 className={styles.admissionPdf__title}>Admission Form</h3>

        {/* Patient Details */}
        <section>
          <h4 className={styles.admissionPdf__sectionTitle}>Patient Details</h4>
          <table className={styles.admissionPdf__table}>
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>{form.patientName}</td>
                <td>
                  <strong>Patient ID / Email:</strong>
                </td>
                <td>{form.patientId || form.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Age:</strong>
                </td>
                <td>{form.age}</td>
                <td>
                  <strong>Gender:</strong>
                </td>
                <td>{form.gender}</td>
              </tr>
              <tr>
                <td>
                  <strong>Contact No.:</strong>
                </td>
                <td>{form.contactNo}</td>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>{form.address}</td>
              </tr>
              <tr>
                <td>
                  <strong>Emergency Contact:</strong>
                </td>
                <td>
                  {form.emergencyContact} ({form.emergencyContactName})
                </td>
                <td>
                  <strong>Admission Date & Time:</strong>
                </td>
                <td>
                  {form.date} {form.time}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Room & Deposit */}
        <section>
          <h4 className={styles.admissionPdf__sectionTitle}>
            Admission Details
          </h4>
          <table className={styles.admissionPdf__table}>
            <tbody>
              <tr>
                <td>
                  <strong>Room No.:</strong>
                </td>
                <td>{selectedRoom}</td>
                <td>
                  <strong>Bed No.:</strong>
                </td>
                <td>{form.bedNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Deposit:</strong>
                </td>
                <td>₹ {form.deposit}</td>
                <td>
                  <strong>Diagnosis:</strong>
                </td>
                <td>{form.medicalNote}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Insurance */}
        {form.hasInsurance && (
          <section>
            <h4 className={styles.admissionPdf__sectionTitle}>
              Insurance Details
            </h4>
            <table className={styles.admissionPdf__table}>
              <tbody>
                <tr>
                  <td>
                    <strong>Company:</strong>
                  </td>
                  <td>{form.insuranceCompany}</td>
                  <td>
                    <strong>Policy No.:</strong>
                  </td>
                  <td>{form.policyNumber}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Insurance ID:</strong>
                  </td>
                  <td>{form.insuranceIdNumber}</td>
                  <td>
                    <strong>Employer:</strong>
                  </td>
                  <td>{form.employerName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Employee Code:</strong>
                  </td>
                  <td>{form.employeeCode}</td>
                  <td>
                    <strong>Validity:</strong>
                  </td>
                  <td>
                    {form.insuranceStartDate} to {form.insuranceExpiryDate}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* Consent */}
        <section>
          <h4 className={styles.admissionPdf__sectionTitle}>Consent</h4>
          <p>
            I hereby consent to any necessary medical procedures, including
            surgeries, medications, diagnostic tests, biopsies, blood
            transfusions, cardiac defibrillation, and pacing. I understand and
            accept the potential risks involved and will not hold the hospital
            responsible for any outcomes arising during or after these
            procedures.
          </p>
        </section>

        {/* Approval */}
        <section>
          <h4 className={styles.admissionPdf__sectionTitle}>
            Approval Sent To
          </h4>
          <p>{selectedRoles.join(", ")}</p>
        </section>

        {/* Signatures */}
        <section className={styles.admissionPdf__signatures}>
          <div>
            <p>Doctor Signature:</p>
            <div className={styles.admissionPdf__sigBox}>
              {form.doctorSignature}
            </div>
          </div>
          <div>
            <p>Witness:</p>
            <div className={styles.admissionPdf__sigBox}>{form.witness}</div>
          </div>
          <div>
            <p>Patient Signature:</p>
            <div className={styles.admissionPdf__sigBox}>
              {form.patientSignature}
            </div>
          </div>
        </section>
      </div>
    );
  }
);

export default AdmissionFormPDF;
