import { useEffect, useState } from "react";
import styles from "./PatientProfile.module.scss";
import ProgressTracker2 from "./components/ProgressTracker2";
import { Bed, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import MedAdminRecord from "./components/MedAdminRecord";
import Nursing from "./components/Nursing";
import PastReportsAndDischarge from "./components/PastReportsAndDischarge.jsx";
import UpdateProgress from "./form/UpdateProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientDetailsByID,
  getPatientVitals,
  getProgressTrackerDetails,
} from "../../../../components/State/Doctor/Action.js";
import BedInfo from "./modals/BedInfo.jsx";
import Discharge from "./modals/Discharge.jsx";
const PatientProfile = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState("medical admin");
  const [activePatientInfo, setActivePatientInfo] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  useEffect(() => {
    dispatch(getPatientDetailsByID(patientId));
  }, [dispatch]);

  const openDischarge = () => setActiveModal("discharge");
  const openUpdateProgress = () => setActiveModal("update progress");
  const openBedInfo = () => setActiveModal("bedInfo");
  const closeModal = () => setActiveModal(null);
  const handleActivePatientInfo = () => {
    setActivePatientInfo((prev) => !prev);
  };

  const patientDetails = useSelector((store) => store.doctor.patientDetails);

  // console.log("patieny details: ", patientDetails);

  return (
    <div>
      <div className={styles.section1}>
        <div className={styles.patientInfo}>
          <h4>Patient Info</h4>
          <div className={styles.patientCard}>
            <div className={styles.imgWrapper}>
              <img
                src="https://randomuser.me/api/portraits/women/17.jpg"
                alt=""
              />
            </div>
            <div className={styles.patientCardInfo}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey}>Patient Name:</p>
                <p className={styles.patientValue}>
                  {patientDetails.name || "n/a"}
                </p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Patient ID:</p>
                <p className={styles.patientValue}>
                  {" "}
                  {patientDetails.patId || "n/a"}
                </p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Contact Info:</p>
                <p className={styles.patientValue}>
                  {" "}
                  {patientDetails.phone || "n/a"}
                </p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Age:</p>
                <p className={styles.patientValue}>
                  {" "}
                  {patientDetails.age || "n/a"}
                </p>
              </div>
            </div>
          </div>
          {activePatientInfo === true ? (
            <div className={styles.patientDetail}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Blood Group:</p>
                <p className={styles.patientValue2}>A(+ve)</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admitted On:</p>
                <p className={styles.patientValue2}>3 June 2025</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Visit Type:</p>
                <p className={styles.patientValue2}>PD - First Admission</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Condition:</p>
                <p className={styles.patientValue2}>Under Observation</p>
              </div>
              <div className={styles.detailRow}>
                <p className={`${styles.patientKey2} ${styles.patientAddress}`}>
                  <span>Address line:</span>
                </p>
                <p className={styles.patientValue2}>
                  {patientDetails.address || "n/a"}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.emergencyContact}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Emergency Contact:</p>
                <p className={styles.patientValue2}>Amanjeet Singh</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Relationship:</p>
                <p className={styles.patientValue2}>Spouse</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Contact:</p>
                <p className={styles.patientValue2}>(+91)9478492408</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admisssion Date & Time:</p>
                <p className={styles.patientValue2}>03/11/2025, 5:00 PM</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>MRN:</p>
                <p className={styles.patientValue2}>213546</p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admitted By:</p>
                <p className={styles.patientValue2}>Dr.Arunita</p>
              </div>
            </div>
          )}

          {/* Patient Info Control */}
          <div className={styles.patientInfoControl}>
            <button onClick={openBedInfo}>
              <Bed className={styles.bedIcon} /> Bed no.
            </button>

            <div
              className={styles.patientInfoControlRight}
              onClick={() => handleActivePatientInfo()}
            >
              <span>Patient Details</span>
              {activePatientInfo === true ? (
                <ChevronRight className={styles.rightIcon} />
              ) : (
                <ChevronLeft className={styles.rightIcon} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.progressTracker}>
          <div className={styles.row1PT}>
            <button className={styles.dischargeBtn} onClick={openDischarge}>
              <img src="/assets/inpatient/discharge.svg" alt="" /> Discharge
            </button>
            <button onClick={openUpdateProgress} className={styles.updateBtn}>
              <Plus className={styles.plusIcon} />
              Update
            </button>
          </div>
          <h4>Progress Tracker</h4>
          <div>
            <ProgressTracker2 patientId={patientId} />
          </div>
        </div>
        {activeModal === "bedInfo" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.bedInfo}>
              <BedInfo onClose={closeModal} />
            </div>
          </>
        )}
        {activeModal === "discharge" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.dischargeModal}>
              <Discharge onClose={closeModal} />
            </div>
          </>
        )}
        {activeModal === "update progress" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.updateProgressModal}>
              <UpdateProgress onClose={closeModal} />
            </div>
          </>
        )}
      </div>
      <div className={styles.section2}>
        <div className={styles.header2}>
          <div
            onClick={() => setActiveTab("medical admin")}
            className={
              activeTab === "medical admin"
                ? styles.activeTab
                : styles.inactiveTab
            }
          >
            <p className={styles.headerText}>Medical Administration Record</p>
          </div>
          <div
            onClick={() => setActiveTab("nursing")}
            className={
              activeTab === "nursing" ? styles.activeTab : styles.inactiveTab
            }
          >
            <p className={styles.headerText}>Nursing Section</p>
          </div>
          <div
            onClick={() => setActiveTab("past reports")}
            className={
              activeTab === "past reports"
                ? styles.activeTab
                : styles.inactiveTab
            }
          >
            <p className={styles.headerText}>Past Reports & Discharges</p>
          </div>
        </div>
        <div className={styles.content}>
          {activeTab === "medical admin" && <MedAdminRecord />}
          {activeTab === "nursing" && <Nursing patientId={patientId} />}
          {activeTab === "past reports" && (
            <PastReportsAndDischarge patientId={patientId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
