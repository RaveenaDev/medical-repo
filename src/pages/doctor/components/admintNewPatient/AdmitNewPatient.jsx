import styles from "./AdmitNewPatient.module.scss";
import { ChevronLeft, X, Plus } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { approveAdmissionRequestWithSignature } from "../../../../components/State/Doctor/Action";
const AdmitNewPatient = ({ onClose, requests }) => {
  const dispatch = useDispatch();
  const [signature, setSignature] = useState(null);
  const handleApprove = async (requestId) => {
    if (!signature) {
      alert("Please upload your signature before approving.");
      return;
    }

    dispatch(approveAdmissionRequestWithSignature(requestId, signature));
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <ChevronLeft
          onClick={onClose}
          strokeWidth={1.65}
          className={styles.leftArrow}
        />
        <p>Admit New Patient</p>
        <label htmlFor="signatureUpload" className={styles.uploadButton}>
          <Plus size={16} strokeWidth={2} />
          {signature ? "Uploaded" : "Upload Signature"}
          <input
            id="signatureUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setSignature(reader.result); // base64
              if (file) reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>

      <div className={styles.admissionList}>
        {requests?.length > 0 ? (
          requests.map((req, idx) => {
            const details = req.admissionDetails;
            const name = details?.name || "Patient";
            const firstInitial = name.charAt(0).toUpperCase();

            return (
              <div key={req._id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.avatarCircle}>
                    <span>{firstInitial}</span>
                  </div>
                  <div className={styles.patientDetails}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.ageNdGender}>
                      {details?.age ? `${details.age} Y` : "Age N/A"}
                    </p>
                  </div>
                </div>
                <div className={styles.middleLine} />
                <div className={styles.cardRight}>
                  <div className={styles.admitDetails}>
                    <p>
                      Admission date:{" "}
                      <span>{dayjs(details.date).format("DD MMM YYYY")}</span>
                    </p>
                    <p>
                      Reason: <span>{details?.medicalNote || "N/A"}</span>
                    </p>
                    <p>
                      Status: <span>{req.status}</span>
                    </p>
                  </div>
                  <div className={styles.btnContainer}>
                    <button
                      onClick={() => handleApprove(req._id)}
                      className={styles.acceptBtn}
                    >
                      Accept
                    </button>
                    <button className={styles.rejectBtn}>
                      <X className={styles.rejectIcon} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No New Patient</p>
        )}
      </div>
    </div>
  );
};

export default AdmitNewPatient;
