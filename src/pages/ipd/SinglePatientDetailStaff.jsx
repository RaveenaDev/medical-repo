import { useEffect, useState } from "react";
import styles from "./SinglePatientDetail.module.scss";
import { Plus, ChevronLeft } from "lucide-react";
import PatientProfile from "./component/PatientProfile";
import PatientPreviousRecord from "./component/records/PatientPreviousRecord.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import BillingDetails from "./component/components/BillingDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDetailsByID } from "../../components/State/Doctor/Action.js";
const SinglePatientDetailStaff = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { patientId, isFollowUpStatus } = location.state || {};
  // console.log("ID: ",patientId)

  // console.log("Patient ID:", patientId);
  // console.log("Is Follow Up:", isFollowUpStatus); // true or false

  const handleBackBtn = () => {
    navigate("/ipd");
  };

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    dispatch(getPatientDetailsByID(patientId));
  }, [dispatch, patientId]);

  const patientDetails = useSelector((store) => store.doctor.patientDetails);

  // console.log("Pat Details: ", patientDetails);

  const isLoading = useSelector(
    (store) => store.doctor.isLoadingPatientDetails
  );

  // console.log("GOTCHA: ",patientDetails)

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
            {/*<button*/}
            {/*  onClick={handleUpdateDiagnosis}*/}
            {/*  className={styles.diagnosisBtn}*/}
            {/*>*/}
            {/*  <Plus className={styles.plusIcon} />*/}
            {/*  Update Diagnosis*/}
            {/*</button>*/}
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
            <PatientProfile
              patientId={patientId}
              isFollowUpStatus={isFollowUpStatus}
            />
          ) : (
            <PatientPreviousRecord
              loading={isLoading}
              patientDetails={patientDetails}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default SinglePatientDetailStaff;
