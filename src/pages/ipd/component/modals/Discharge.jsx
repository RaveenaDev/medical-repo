import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Discharge.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { dischargePatient } from "../../../../components/State/Doctor/Action";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Discharge = ({ onClose, patientId, caseId, patientDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // loader state

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
    isDAMA: false,
    damaReason: "",
    patID: "",
  });

  // console.log("Patient Details in Discharge Modal:", patientDetails);

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
        isDAMA: patientDetails?.isDAMA || false,
        damaReason: patientDetails?.damaReason || "",
        patID: patientDetails.patId || "",
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

  const handleSubmit = async () => {
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

    try {
      setLoading(true); // start loader
      const res = await dispatch(dischargePatient(payload));
      if (res) {
        handlePrintPopup();
        navigate("/ipd");
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loader
    }
  };
  const handlePrintPopup = () => {
    const printWindow = window.open("", "_blank", "width=900,height=650");

    if (!printWindow) {
      toast.error("Popup blocked. Please allow popups.");
      return;
    }

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Discharge Summary</title>
  <style>
    @page {
      size: A4;
      margin: 12mm;
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #111;
    }

    .page {
      page-break-after: always;
    }

    .header {
      text-align: center;
      margin-bottom: 10px;
    }

    .header h1 {
      font-size: 22px;
      margin: 0;
      letter-spacing: 1px;
    }

    .sub {
      font-size: 11px;
      margin: 2px 0;
    }

    .addr {
      font-size: 10px;
      margin: 0;
    }

    .titleBox {
      border: 1px solid #000;
      display: inline-block;
      padding: 4px 18px;
      margin-top: 8px;
      font-weight: 700;
      font-size: 13px;
    }

    .line {
      margin-top: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }

    .label {
      font-size: 10px;
    }

    .row {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }

    .col {
      flex: 1;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }

    .sectionTitle {
      font-weight: 700;
      margin-top: 14px;
    }

    .box {
      min-height: 48px;
      border-bottom: 1px solid #000;
      margin-top: 4px;
      white-space: pre-wrap;
    }

    .diagnosisBox {
      border: 1px solid #000;
      padding: 6px;
      margin-top: 14px;
      min-height: 36px;
    }

    .note {
      text-align: center;
      margin-top: 14px;
      font-size: 10px;
    }

    .right {
      text-align: right;
      margin-top: 40px;
    }
      .damaLegal {
  border: 1px solid #000;
  padding: 8px;
  margin-top: 16px;
  font-size: 11px;
  line-height: 1.4;
}

.signatureRow {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 11px;
}

.signatureBox {
  width: 30%;
  border-top: 1px solid #000;
  text-align: center;
  padding-top: 4px;
}

  </style>
</head>

<body>

<!-- ================= PAGE 1 ================= -->
<div class="page">

  <div class="header">
    <h1>SAI ASHA HOSPITAL</h1>
    <div class="sub">MEDICINE / ORTHOPEDIC / SURGERY / MATERNITY / PEDIATRIC / DENTAL</div>
    <div class="addr">
      05, 1st Floor, Laxcon Plaza, Plot No. 20 & 21, Sector-29, Nerul (E), Navi Mumbai – 400706
    </div>
    <div class="addr">
      Mob: 892 888 9390 &nbsp;&nbsp; Tel: 022 3501 0702 / 022 3503 1026
    </div>

    <div class="titleBox">DISCHARGE SUMMARY</div>
  </div>

  <div class="line">
    <span class="label">Patient's Name</span><br/>
    ${formData.patientName || " "}
  </div>

  <div class="row">
    <div class="col"><span class="label">Age</span><br/>${
      formData.age || " "
    }</div>
    <div class="col"><span class="label">Sex</span><br/>${
      formData.sex || " "
    }</div>
    <div class="col"><span class="label">PAT ID</span><br/>${
      formData.patID || " "
    }</div>
  </div>

  <div class="line">
    <span class="label">Hon. Dr.</span><br/>
  </div>

  <div class="row">
    <div class="col">
      <span class="label">Admission Date</span><br/>
      ${formData.admissionDate || " "}
    </div>
    <div class="col">
      <span class="label">Time</span><br/>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <span class="label">Discharge Date</span><br/>
      ${formData.dischargeDate || " "}
    </div>
    <div class="col">
      <span class="label">Time</span><br/>
    </div>
  </div>

  <div class="sectionTitle">CLINICAL NOTE:</div>

  <div style="margin-top:6px;">1. On Admission</div>
  <div class="box">${formData.onAdmissionNotes || ""}</div>

  <div style="margin-top:10px;">2. On Discharge</div>
  <div class="box">${formData.onDischargeNotes || ""}</div>

  <div class="diagnosisBox">
  <b>DISCHARGE TYPE:</b><br/>
  ${
    formData.isDAMA
      ? "DAMA (Discharge Against Medical Advice)"
      : "Normal Discharge"
  }
</div>

${
  formData.isDAMA
    ? `<div class="diagnosisBox">
         <b>Reason for DAMA:</b><br/>
         ${formData.damaReason || ""}
       </div>`
    : ""
}
  <div class="diagnosisBox">
    <b>DIAGNOSIS:</b><br/>
    ${formData.diagnosis || ""}
  </div>
${
  formData.isDAMA
    ? `
<div class="damaLegal">
  <b>DISCHARGE AGAINST MEDICAL ADVICE (DAMA)</b><br/><br/>
  I / We, the patient / authorized attendant, hereby state that we are taking
  discharge against the medical advice of the treating doctor. The nature of the
  illness, possible risks, complications, and consequences of leaving the
  hospital at this stage have been clearly explained to us and understood.
  <br/><br/>
  We voluntarily choose to leave the hospital and agree that the hospital,
  management, and treating doctors shall not be held responsible for any
  deterioration, complications, or adverse outcome after discharge.
</div>

<div class="signatureRow">
  <div class="signatureBox">Patient / Attendant Signature</div>
  <div class="signatureBox">Treating Doctor</div>
  <div class="signatureBox">Date & Time</div>
</div>
`
    : ""
}

  <div class="row" style="margin-top:12px;">
    <div class="col">
      <span class="label">To Attend O.P.D. on Day</span><br/>
      ${formData.followUpDate || " "}
    </div>
    <div class="col">
      <span class="label">Time</span><br/>
    </div>
  </div>

  <div class="note">Please bring this card for further reference</div>

</div>

<!-- ================= PAGE 2 ================= -->
<div class="page">

  <div class="sectionTitle">Investigation Done</div>

  <div class="row">
    <div class="col"><span class="label">Blood</span></div>
    <div class="col"><span class="label">X-Ray</span></div>
  </div>

  <div class="row">
    <div class="col"><span class="label">Urine</span></div>
    <div class="col"><span class="label">U.S.G</span></div>
  </div>

  <div class="sectionTitle" style="margin-top:16px;">
    Treatment Given / Operation Notes
  </div>
  <div class="box" style="min-height:120px;"></div>

  <div class="sectionTitle" style="margin-top:16px;">
    Follow up Treatment
  </div>
  <div class="box" style="min-height:80px;"></div>

  <div class="right">Medical Officer</div>

</div>

<script>
  window.onload = function () {
    window.print();
    window.onafterprint = function () {
      window.close();
    };
  };
</script>

</body>
</html>
  `);

    printWindow.document.close();
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
          <div className={styles.card}>
            <p className={styles.cardTitle}>Patient Information</p>

            <div className={styles.grid3}>
              <div>
                <label>Patient Name</label>
                <input className={styles.input} value={formData.patientName} />
              </div>

              <div>
                <label>Age</label>
                <input className={styles.input} value={formData.age} />
              </div>

              <div>
                <label>Sex</label>
                <input className={styles.input} value={formData.sex} />
              </div>
            </div>
          </div>

          {/* On Admission */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>On Admission</p>

            <div className={styles.grid2}>
              <div className={styles.formItem}>
                <label>Admission Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.admissionDate}
                  onChange={(e) =>
                    handleChange("admissionDate", e.target.value)
                  }
                />
              </div>

              <div className={`${styles.formItem} ${styles.full}`}>
                <label>Clinical Notes</label>
                <textarea
                  rows={4}
                  className={styles.textarea}
                  value={formData.onAdmissionNotes}
                  onChange={(e) =>
                    handleChange("onAdmissionNotes", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* On Discharge */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>On Discharge</p>

            <div className={styles.grid2}>
              <div className={styles.formItem}>
                <label>Discharge Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.dischargeDate}
                  onChange={(e) =>
                    handleChange("dischargeDate", e.target.value)
                  }
                />
              </div>

              <div className={styles.full}>
                <label>Clinical Notes</label>
                <textarea
                  rows={4}
                  className={styles.textarea}
                  value={formData.onDischargeNotes}
                  onChange={(e) =>
                    handleChange("onDischargeNotes", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Discharge Type */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>Discharge Type</p>

            <div className={styles.radioRow}>
              <label>
                <input
                  type="radio"
                  checked={!formData.isDAMA}
                  onChange={() => handleChange("isDAMA", false)}
                />
                Normal Discharge
              </label>

              <label>
                <input
                  type="radio"
                  checked={formData.isDAMA}
                  onChange={() => handleChange("isDAMA", true)}
                />
                DAMA
              </label>
            </div>

            {formData.isDAMA && (
              <div>
                <label>Reason for DAMA</label>
                <textarea
                  rows={3}
                  className={styles.textarea}
                  value={formData.damaReason}
                  onChange={(e) => handleChange("damaReason", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Diagnosis */}
          <div className={`${styles.card} ${styles.highlight}`}>
            <p className={styles.cardTitle}>Final Diagnosis</p>
            <textarea
              rows={4}
              className={styles.textarea}
              value={formData.diagnosis}
              onChange={(e) => handleChange("diagnosis", e.target.value)}
            />
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
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${styles.saveBtn} ${loading ? styles.disabledBtn : ""}`}
          >
            {loading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <CircularProgress size={16} thickness={5} color="inherit" />
                Saving...
              </span>
            ) : (
              "Save And Download"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discharge;
