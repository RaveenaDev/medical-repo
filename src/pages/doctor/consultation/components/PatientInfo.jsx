import PropTypes from "prop-types";
import styles from "./PatientInfo.module.scss";
import Avatar from "@mui/material/Avatar";
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

const PatientInfo = ({ ongoingAppointment, onConfirm }) => {
  const patient = ongoingAppointment.patient;
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
        {/* Avatar to show the initial letter */}
        <Avatar
          className={styles.avatar}
          sx={{
            width: 50, // Adjust the width
            height: 50, // Adjust the height
            fontSize: 26, // Size of the letter inside the Avatar
            // backgroundColor: '#3db461',
            bgcolor: "#e3e3e3",
            color: "#25307F",
            fontWeight: 400,
          }}
        >
          {patient.name[0].toUpperCase()}
        </Avatar>

        <div className={styles.r1Info}>
          <p className={styles.patientName}>{patient.name}</p>
          <p className={styles.followUp}>{patient.typeVisit} Patient</p>
        </div>
      </div>

      {/* Row2 */}
      <div className={styles.row2}>
        <div className={styles.lv}>
          <p className={styles.label}>Gender</p>
          <p className={styles.value}>{patient.gender}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Birthday</p>
          <p className={styles.value}>{patient.birthday}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Phone Number</p>
          <p className={styles.value}>{patient.phone}</p>
        </div>
      </div>

      {/* Row3 */}
      <div className={styles.row3}>
        <div className={styles.lv}>
          <p className={styles.label2}>Address</p>
          <p className={styles.addValue}>{patient.address}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label2}>Case ID</p>
          <p className={styles.value2}>{ongoingAppointment.caseId}</p>
        </div>
        <div className={styles.lv}>
          <p className={styles.label2}>Assessed By</p>
          <p className={styles.value2}>{ongoingAppointment.doctor.name}</p>
        </div>
      </div>

      {/* Row4 */}
      <div className={styles.row4}>
        <div className={styles.lv}>
          <p className={styles.label}>Member Status</p>
          <div className={styles.status}>
            <span className={styles.dot}></span>
            <p className={styles.value}> {patient.status}</p>
          </div>
        </div>
        <div className={styles.lv}>
          <p className={styles.label}>Register Date</p>
          <p className={styles.value}>
            {patient.registrationDate.split("T")[0]}
          </p>
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
