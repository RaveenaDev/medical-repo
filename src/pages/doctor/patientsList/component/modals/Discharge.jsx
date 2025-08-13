import { useState } from "react";
import { X } from "lucide-react";
import styles from "./Discharge.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { dischargePatient } from "../../../../../components/State/Doctor/Action";

const Discharge = ({ onClose, patientId, caseId }) => {
  const dispatch = useDispatch();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [onAdmissionNotes, setOnAdmissionNotes] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [onDischargeNotes, setOnDischargeNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDay, setFollowUpDay] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");

  const handleSubmit = async () => {
    if (!admissionDate || !dischargeDate || !diagnosis) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      patientId,
      caseId,
      admissionDate,
      dischargeDate,
      onAdmissionNotes,
      onDischargeNotes,
      diagnosis,
      followUpDay,
      followUpTime,
    };

    dispatch(dischargePatient(payload));
    onClose();
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Discharge Summary</h1>
        </div>

        <div className={styles.sectionWrapper}>
          {/* Patient Info */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Patient Info</p>
            <div className={styles.qna}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Patient Name</p>
                <input
                  type="text"
                  className={styles.input}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Age</p>
                <input
                  type="text"
                  className={styles.input}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Sex</p>
                <input
                  type="text"
                  className={styles.input}
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* On Admission */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>On Admission</p>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Admission Date</p>
                <input
                  type="date"
                  className={styles.inputDate}
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input
                  type="text"
                  className={styles.input}
                  value={onAdmissionNotes}
                  onChange={(e) => setOnAdmissionNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* On Discharge */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>On Discharge</p>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Discharge Date</p>
                <input
                  type="date"
                  className={styles.inputDate}
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input
                  type="text"
                  className={styles.input}
                  value={onDischargeNotes}
                  onChange={(e) => setOnDischargeNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Diagnosis</p>
            <div className={styles.qna3}>
              <div className={styles.questionWrapper}>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Follow-up */}
          <div className={styles.section}>
            <div className={styles.qna2}>
              <div className={styles.questionWrapper}>
                <p className={styles.sectionHeading}>To Attend O.P.D on Day</p>
                <input
                  type="text"
                  className={styles.inputDate}
                  value={followUpDay}
                  onChange={(e) => setFollowUpDay(e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.sectionHeading}>Time:</p>
                <input
                  type="time"
                  className={styles.inputTime}
                  value={followUpTime}
                  onChange={(e) => setFollowUpTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className={styles.saveContainer}>
          <button onClick={handleSubmit}>Save And Download</button>
        </div>
      </div>
    </div>
  );
};

export default Discharge;
