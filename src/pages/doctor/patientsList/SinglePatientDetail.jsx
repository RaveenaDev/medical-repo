import { useState } from "react";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./SinglePatientDetail.module.scss";
import { Plus } from "lucide-react";
import PatientProfile from "./component/PatientProfile";
import PatientPreviousRecord from "./component/PatientPreviousRecord";
import { useNavigate } from "react-router-dom";
const SinglePatientDetail = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const handleUpdateDiagnosis = () => {
    navigate("/doctor/consultation");
  };
  return (
    <main>
      <CommonPanelMini />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
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
              <Plus size={20} />
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
