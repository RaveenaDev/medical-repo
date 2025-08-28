import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Discharge.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { dischargePatient } from "../../../../../components/State/Doctor/Action";
import { useNavigate } from "react-router-dom";

const Discharge = ({ onClose, patientId, caseId, patientDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Single state object for all form data
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    sex: "",
    admissionDate: "",
    onAdmissionNotes: "",
    dischargeDate: "",
    onDischargeNotes: "",
    diagnosis: "",
    followUpDate: "",
  });

  // Prefill from patientDetails
  useEffect(() => {
    if (patientDetails) {
      setFormData({
        patientName: patientDetails.name || "",
        age: patientDetails.Age || "",
        sex: patientDetails.gender || "",
        admissionDate: patientDetails.admissionDate?.split("T")[0] || "",
        onAdmissionNotes: patientDetails.onAdmissionNotes || "",
        dischargeDate: patientDetails.dischargeDate?.split("T")[0] || "",
        onDischargeNotes: patientDetails.onDischargeNotes || "",
        diagnosis: patientDetails.diagnosis || "",
        followUpDate: patientDetails.followUpDate?.split("T")[0] || "",
      });
    }
  }, [patientDetails]);
  // console.log(patientDetails);
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const { admissionDate, dischargeDate, diagnosis } = formData;
    if (!admissionDate || !dischargeDate || !diagnosis) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      patientId,
      caseId,
      ...formData,
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
          {/* Patient Info (Read-Only) */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Patient Info</p>
            <div className={styles.qna}>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Patient Name</p>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Age</p>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Sex</p>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
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
                  value={formData.admissionDate}
                  onChange={(e) =>
                    handleChange("admissionDate", e.target.value)
                  }
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.onAdmissionNotes}
                  onChange={(e) =>
                    handleChange("onAdmissionNotes", e.target.value)
                  }
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
                  value={formData.dischargeDate}
                  onChange={(e) =>
                    handleChange("dischargeDate", e.target.value)
                  }
                />
              </div>
              <div className={styles.questionWrapper}>
                <p className={styles.label}>Clinical Notes</p>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.onDischargeNotes}
                  onChange={(e) =>
                    handleChange("onDischargeNotes", e.target.value)
                  }
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
                  value={formData.diagnosis}
                  onChange={(e) => handleChange("diagnosis", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Follow-up */}
          <div className={styles.section}>
            <p className={styles.sectionHeading}>To Attend O.P.D</p>
            <input
              type="date"
              className={styles.inputDate}
              value={formData.followUpDate}
              onChange={(e) => handleChange("followUpDate", e.target.value)}
            />
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
