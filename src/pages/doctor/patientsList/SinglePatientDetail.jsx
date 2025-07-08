import { useState } from "react";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./SinglePatientDetail.module.scss";
import { Plus, ChevronLeft } from "lucide-react";
import PatientProfile from "./component/PatientProfile";
import PatientPreviousRecord from "./component/records/PatientPreviousRecord.jsx";
import { useNavigate } from "react-router-dom";
const SinglePatientDetail = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate("/doctor/patientList");
  };
  const handleUpdateDiagnosis = () => {
    navigate("/doctor/consultation");
  };
  return (
    <main>
      <CommonPanelMini />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.backBtnWrapper}>
              <ChevronLeft
                size={25}
                className={styles.backIcon}
                onClick={handleBackBtn}
              />
            </div>
            <div
              onClick={() => setActiveTab("profile")}
              className={
                activeTab === "profile"
                  ? styles.activeTab
                  : styles.profileWrapper
              }
            >
              <span>Profile</span>
            </div>
            <div
              onClick={() => setActiveTab("previousMedRecords")}
              className={
                activeTab === "previousMedRecords"
                  ? styles.activeTab2
                  : styles.profileWrapper
              }
            >
              <span>Previous Medical Records</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button onClick={handleUpdateDiagnosis}>
              <Plus className={styles.plusIcon} />
              Update Diagnosis
            </button>
          </div>
        </header>

        <section>
          {activeTab === "profile" ? (
            <PatientProfile />
          ) : (
            <PatientPreviousRecord />
          )}
        </section>
      </div>
    </main>
  );
};

export default SinglePatientDetail;
