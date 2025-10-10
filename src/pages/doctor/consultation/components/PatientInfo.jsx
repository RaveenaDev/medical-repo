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
  // Safe access with fallback
  const patient = ongoingAppointment?.patient || {};
  const doctor = ongoingAppointment?.doctor || {};

  // console.log(ongoingAppointment)

  const capitalizeFirstLetter = (str) => {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Helper function to get field value with case-insensitive key matching
  const getFieldValue = (obj, key, defaultValue = "N/A") => {
    if (!obj) return defaultValue;

    // Try exact match first
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }

    // Try case-insensitive match
    const lowerKey = key.toLowerCase();
    const matchingKey = Object.keys(obj).find(k => k.toLowerCase() === lowerKey);

    if (matchingKey && obj[matchingKey] !== undefined && obj[matchingKey] !== null && obj[matchingKey] !== "") {
      return obj[matchingKey];
    }

    return defaultValue;
  };

  // Get patient details with fallbacks
  const patientName = getFieldValue(patient, "name", "Unknown Patient");
  const typeVisit = getFieldValue(patient, "typeVisit", "Regular");
  const gender = getFieldValue(patient, "gender") || getFieldValue(patient, "Gender");
  const age = getFieldValue(patient, "age") || getFieldValue(patient, "Age");
  const phone = getFieldValue(patient, "phone") || getFieldValue(patient, "Phone");
  const address = getFieldValue(patient, "address") || getFieldValue(patient, "Address");
  const email = getFieldValue(patient, "email") || getFieldValue(patient, "Email");
  const status = getFieldValue(patient, "status") || getFieldValue(patient, "MemberStatus");
  const registrationDate = getFieldValue(patient, "registrationDate") || getFieldValue(patient, "RegisterDate");

  // Get appointment details with fallbacks
  const caseId = ongoingAppointment?.caseId || "N/A";
  const doctorName = getFieldValue(doctor, "name", "N/A");

  // Format registration date safely
  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    try {
      return dateString.split("T")[0];
    } catch (error) {
      return dateString;
    }
  };

  // Get initial letter for avatar
  const getInitial = (name) => {
    if (!name || typeof name !== 'string' || name.trim() === '') return '?';
    return name.trim()[0].toUpperCase();
  };

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
                width: 50,
                height: 50,
                fontSize: 26,
                bgcolor: "#e3e3e3",
                color: "#25307F",
                fontWeight: 400,
              }}
          >
            {getInitial(patientName)}
          </Avatar>

          <div className={styles.r1Info}>
            <p className={styles.patientName}>{patientName}</p>
            <p className={styles.followUp}>{typeVisit} Patient</p>
          </div>
        </div>

        {/* Row2 */}
        <div className={styles.row2}>
          <div className={styles.lv}>
            <p className={styles.label}>Gender</p>
            <p className={styles.value}>{gender}</p>
          </div>
          <div className={styles.lv}>
            <p className={styles.label}>Age</p>
            <p className={styles.value} style={{marginLeft:'2px'}}>{age}</p>
          </div>
          <div className={styles.lv}>
            <p className={styles.label}>Phone Number</p>
            <p className={styles.value}>{phone}</p>
          </div>
        </div>

        {/* Row3 */}
        <div className={styles.row3}>
          <div className={styles.lv}>
            <p className={styles.label2}>Address</p>
            <p className={styles.addValue}>{address}</p>
          </div>
          <div className={styles.lv}>
            <p className={styles.label2}>Case ID</p>
            <p className={styles.value2}>{caseId}</p>
          </div>
          <div className={styles.lv}>
            <p className={styles.label2}>Assessed By</p>
            <p className={styles.value2}>{doctorName}</p>
          </div>
        </div>

        {/* Row4 */}
        <div className={styles.row4}>
          <div className={styles.lv}>
            <p className={styles.label}>Member Status</p>
            <div className={styles.status}>
              <span className={styles.dot}></span>
              <p className={styles.value}> {capitalizeFirstLetter(status)}</p>
            </div>
          </div>
          <div className={styles.lv}>
            <p className={styles.label}>Register Date</p>
            <p className={styles.value}>
              {formatDate(registrationDate)}
            </p>
          </div>
          <div className={styles.lv}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{email}</p>
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
  ongoingAppointment: PropTypes.shape({
    patient: patientPropType,
    caseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    doctor: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  onConfirm: PropTypes.func.isRequired,
};

export default PatientInfo;