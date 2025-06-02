import PropTypes from "prop-types";
import styles from "./PatientInfo.module.scss";
const patientPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profileURL: PropTypes.string.isRequired,
  Gender: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired,
  Phone: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  caseId: PropTypes.number.isRequired,
  AssessedBy: PropTypes.string.isRequired,
  MemberStatus: PropTypes.string.isRequired,
  RegisterDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.number.isRequired,
  consultStatus: PropTypes.string.isRequired,
});

const PatientInfo = ({ patient, onConfirm }) => {
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
    >
      {/* Row1 */}
      <div className={styles.row1}>
        <img src={patient.profileURL} alt={patient.name} />
        <div className={styles.r1Info}>
          <p className={styles.patientName}>{patient.name}</p>
          <p className={styles.followUp}>Follow up Patient</p>
        </div>
      </div>

      {/* Row2 */}
      <div className={styles.row2}>
        <div className={styles.lv}>
          <p className={styles.label}>Gender</p>
          <p className={styles.value}>{patient.Gender}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Birthday</p>
          <p className={styles.value}>{patient.Birthday}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Phone Number</p>
          <p className={styles.value}>{patient.Phone}</p>
        </div>
      </div>

      {/* Row3 */}
      <div className={styles.row3}>
        <div className={styles.lv}>
          <p className={styles.label2}>Address</p>
          <p className={styles.addValue}>{patient.Address}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label2}>Case ID</p>
          <p className={styles.value2}>{patient.caseId}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label2}>Assessed By</p>
          <p className={styles.value2}>{patient.AssessedBy}</p>
        </div>
      </div>

      {/* Row4 */}
      <div className={styles.row4}>
        <div className={styles.lv}>
          <p className={styles.label}>Member Status</p>
          <div className={styles.status}>
            <span className={styles.dot}></span>
            <p className={styles.value}> {patient.MemberStatus}</p>
          </div>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Register Date</p>
          <p className={styles.value}>{patient.RegisterDate}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Email</p>
          <p className={styles.value}>{patient.email}</p>
        </div>
      </div>

      {/* Row5 */}
      <div className={styles.row5}>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
};

PatientInfo.propTypes = {
  patient: patientPropType.isRequired,
};

export default PatientInfo;
