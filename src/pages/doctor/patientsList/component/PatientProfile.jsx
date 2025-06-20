import styles from "./PatientProfile.module.scss";

const PatientProfile = () => {
  return (
    <main>
      <section className={styles.section1}>
        <div className={styles.patientInfo}>
          <h4>Patient Info</h4>
          <div className={styles.patientCard}>
            <div className={styles.imgWrapper}>
              <img
                src="https://randomuser.me/api/portraits/women/17.jpg"
                width={65}
                alt=""
              />
            </div>
            <div className={styles.patientCardInfo}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey}>Patient Name:</p>
                <p className={styles.patientValue}>Jasmine Kaur</p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Patient ID:</p>
                <p className={styles.patientValue}>XXXXXXX</p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Contact Info:</p>
                <p className={styles.patientValue}>(+91)1234567890</p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Age:</p>
                <p className={styles.patientValue}>27</p>
              </div>
            </div>
          </div>
          <div className={styles.patientDetail}>
            <div className={styles.detailRow}>
              <p className={`${styles.patientKey2} ${styles.patientAddress}`}>
                <span>Address line:</span>
              </p>
              <p className={styles.patientValue2}>
                1234, Sector 15, Near City Mall, MG Road
              </p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Blood Group:</p>
              <p className={styles.patientValue2}>A(+ve)</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Admitted On:</p>
              <p className={styles.patientValue2}>3 June 2025</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Visit Type:</p>
              <p className={styles.patientValue2}>PD - First Admission</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Condition:</p>
              <p className={styles.patientValue2}>Under Observation</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Emergency Contact:</p>
              <p className={styles.patientValue2}>Amanjeet Singh</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Relationship:</p>
              <p className={styles.patientValue2}>Spouse</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.patientKey2}>Contact:</p>
              <p className={styles.patientValue2}>(+91)9478492408</p>
            </div>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
};

export default PatientProfile;
