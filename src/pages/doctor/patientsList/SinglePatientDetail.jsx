import { useEffect, useState } from "react";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./SinglePatientDetail.module.scss";
import { Plus, ChevronLeft } from "lucide-react";
import PatientProfile from "./component/PatientProfile";
import PatientPreviousRecord from "./component/records/PatientPreviousRecord.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import BillingDetails from "./component/components/BillingDetails.jsx";
const SinglePatientDetail = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const location = useLocation();
  const patientId = location.state;
  // console.log("ID: ",patientId)
  const handleBackBtn = () => {
    navigate("/doctor/patientList");
  };
  const handleUpdateDiagnosis = () => {
    navigate("/doctor/consultation");
  };

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openBilling = () => setActiveModal("billing");
  const closeModal = () => setActiveModal(null);
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
            <button
              onClick={handleUpdateDiagnosis}
              className={styles.diagnosisBtn}
            >
              <Plus className={styles.plusIcon} />
              Update Diagnosis
            </button>
            <button className={styles.billingBtn} onClick={openBilling}>
              <img src="/assets/payment.svg" alt="" className={styles.icon} />
              Billing Details
            </button>
            <button className={styles.printBtn}>
              <img
                src="/assets/Print-icon.svg"
                alt=""
                className={styles.icon}
              />
            </button>
          </div>
        </header>
        <>
          <div
            className={styles["backdrop-overlay"]}
            style={{ display: activeModal === "billing" ? "block" : "none" }}
            onClick={closeModal}
          />

          <div
            className={`${styles["billing-modal"]} ${
              activeModal === "billing" ? styles["billing-modalOpen"] : ""
            }`}
          >
            <BillingDetails onClose={closeModal} />
          </div>
        </>

        <section>
          {activeTab === "profile" ? (
            <PatientProfile patientId={patientId} />
          ) : (
            <PatientPreviousRecord />
          )}
        </section>
      </div>
    </main>
  );
};

export default SinglePatientDetail;
