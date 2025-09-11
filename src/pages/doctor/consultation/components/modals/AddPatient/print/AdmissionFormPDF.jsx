import React, { forwardRef } from "react";
import styles from "./AdmissionFormPDF.module.scss";

const AdmissionFormPDF = forwardRef(({ form, selectedRoom }, ref) => {
  return (
    <div ref={ref} className={styles.admissionPdf}>
      {/* Header */}
      <header className={styles.header}>
        <h2>SAI ASHA HOSPITAL</h2>
        <p>
          05, 1st Floor, Laxcon Plaza, Plot No. 20 & 21, Sector-29, Nerul (E),
          Navi Mumbai - 400 706
        </p>
        <p>Tel: 022 3501 0702 / 022 3503 1026 | Mob: 892 888 9390</p>
      </header>

      <h3 className={styles.formTitle}>Admission Form</h3>

      {/* Patient Details */}
      <section className={styles.section}>
        <h4>Patient Details</h4>
        <div className={styles.detailGrid}>
          {form.patientName && (
            <>
              <span>Name of Patient</span>
              <span>{form.patientName}</span>
            </>
          )}
          {form.gender && (
            <>
              <span>Sex</span>
              <span>{form.gender}</span>
            </>
          )}
          {form.age && (
            <>
              <span>Age</span>
              <span>{form.age}</span>
            </>
          )}
          {form.contactNo && (
            <>
              <span>Contact No.</span>
              <span>{form.contactNo}</span>
            </>
          )}
          {form.address && (
            <>
              <span>Address</span>
              <span>{form.address}</span>
            </>
          )}
          {form.emergencyContactName && (
            <>
              <span>Relative / Friend</span>
              <span>
                {form.emergencyContactName} ({form.emergencyContact})
              </span>
            </>
          )}
          {form.medicalNote && (
            <>
              <span>Diagnosis</span>
              <span>{form.medicalNote}</span>
            </>
          )}
          {form.date && (
            <>
              <span>Admitted On</span>
              <span>
                {form.date} {form.time}
              </span>
              <span>Discharge On</span>
              <span>{form.dischargeDate || "-"}</span>
            </>
          )}
        </div>
      </section>

      {/* Admission Details */}
      <section className={styles.section}>
        <h4>Admission Details</h4>
        <div className={styles.detailGrid}>
          {selectedRoom && (
            <>
              <span>Room No.</span>
              <span>{selectedRoom}</span>
            </>
          )}
          {form.bedNo && (
            <>
              <span>Bed No.</span>
              <span>{form.bedNo}</span>
            </>
          )}
          {form.deposit && (
            <>
              <span>Deposit Given</span>
              <span>₹ {form.deposit}</span>
            </>
          )}
        </div>
      </section>

      {/* Consent */}
      <section className={styles.section}>
        <h4>Consent</h4>
        <p className={styles.consent}>
          I hereby agree and give consent to the performance of such operation
          as may be found necessary to be performed upon myself and also to the
          administration of any consequences that may arise out of and in the
          course of such operations. I shall not hold the hospital responsible
          for any consequences that may arise out of and in the course of such
          operations and/or administrations of any drugs and/or infusion
          diagnostic procedures, biopsies, blood transfusion, cardiac
          defibrillation, and pacing.
        </p>
      </section>

      {/* Signatures */}
      <footer className={styles.signatures}>
        <div>
          <div className={styles.sigLine}></div>
          <p>Witness</p>
        </div>
        <div>
          <div className={styles.sigLine}></div>
          <p>Patient / Guardian</p>
        </div>
        <div>
          <div className={styles.sigLine}></div>
          <p>Doctor</p>
        </div>
      </footer>
    </div>
  );
});

export default AdmissionFormPDF;
