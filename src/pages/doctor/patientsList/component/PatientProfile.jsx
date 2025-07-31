import { useEffect, useState } from "react";
import styles from "./PatientProfile.module.scss";
import ProgressTracker2 from "./components/ProgressTracker2";
import {
  Bed,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MessageSquareText,
  Phone,
  Plus,
} from "lucide-react";
import MedAdminRecord from "./components/MedAdminRecord";
import Nursing from "./components/Nursing";
import PastReportsAndDischarge from "./components/PastReportsAndDischarge.jsx";
import UpdateProgress from "./form/UpdateProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientDetailsByID,
  getPatientVitals,
  getProgressTrackerDetails,
  updatePatientStatus,
} from "../../../../components/State/Doctor/Action.js";
import BedInfo from "./modals/BedInfo.jsx";
import Discharge from "./modals/Discharge.jsx";
import IsFollowUp from "./components/isFollowUp/IsFollowUp.jsx";
import { useLocation } from "react-router-dom";
const PatientProfile = ({ patientId, isFollowUpStatus }) => {
  const location = useLocation();
  const { caseId } = location.state || {};
  const [activeTab, setActiveTab] = useState("medical admin");
  const [activePatientInfo, setActivePatientInfo] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const statusOptions = ["Critical", "High", "Moderate", "Stable"];
  const [openStatus, setOpenStatus] = useState(false);
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

  // Check if there's a stored value in localStorage on initial load
  const savedStatus = localStorage.getItem(`status-${patientId}`);

  // If savedStatus exists, use it; otherwise, fall back to patientDetails?.healthStatus
  const [selectedStatus, setSelectedStatus] = useState(
    savedStatus || patientDetails?.healthStatus
  );

  useEffect(() => {
    // Whenever selectedStatus changes, update localStorage
    if (selectedStatus) {
      localStorage.setItem(`status-${patientId}`, selectedStatus);
    }
  }, [selectedStatus, patientId]);
  // console.log("patieny details: ", patientDetails);
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setOpenStatus(false);

    dispatch(updatePatientStatus(patientId, status));
  };
  return (
    <div>
      <div className={styles.section1}>
        <div className={styles.patientInfo}>
          <div className={styles.title}>
            <h4>Patient Info</h4>

            {isFollowUpStatus ? (
              <div className={styles.messageCallRow}>
                <img
                  src="/assets/inpatient/message.svg"
                  alt="message"
                  className={styles.messageIcon}
                />
                <Phone
                  fill="#2e823b"
                  //stroke="#2e823b"
                  strokeWidth="0px"
                  className={styles.callIcon}
                />
              </div>
            ) : (
              <div className={styles.dropdown}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenStatus((prev) => !prev)}
                >
                  <p
                    className={
                      selectedStatus ? styles[selectedStatus.toLowerCase()] : ""
                    }
                  >
                    {" "}
                    <span className={styles.dot}></span>
                    <strong>{selectedStatus || "Select"}</strong>
                  </p>
                  <span className={styles.arrow}>
                    {openStatus ? (
                      <ChevronUp className={styles.arrowIcon} />
                    ) : (
                      <ChevronDown className={styles.arrowIcon} />
                    )}
                  </span>
                </button>
                {openStatus && (
                  <ul className={styles.menu}>
                    {statusOptions.map((option) => (
                      <li
                        key={option}
                        className={`${styles.item} ${
                          styles[option.toLowerCase()]
                        } `}
                        onClick={() => handleStatusChange(option)}
                      >
                        <span className={styles.dot}></span>
                        <strong>{option}</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div
            className={`${styles.patientCard} ${
              selectedStatus === "Critical" ? styles.criticalBg : ""
            }`}
          >
            <div className={`${styles.imgWrapper} `}>
              <img
                className={` ${
                  selectedStatus === "Critical" ? styles.criticalImg : ""
                } `}
                src="https://randomuser.me/api/portraits/women/17.jpg"
                alt=""
              />
            </div>
            <div className={styles.patientCardInfo}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey}>Patient Name:</p>
                <p className={styles.patientValue}>
                  {patientDetails?.name || "n/a"}
                </p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Patient ID:</p>
                <p className={styles.patientValue}>
                  {" "}
                  {patientDetails?.patId || "n/a"}
                </p>
              </div>
              <div className={styles.detailRow}>
                {" "}
                <p className={styles.patientKey}>Contact Info:</p>
                <p className={styles.patientValue}>
                  {" "}
                  {patientDetails?.phone || "n/a"}
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
                <p className={styles.patientValue2}>
                  {patientDetails.bloodGroup || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admitted On:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.admissionDateTime || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Visit Type:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.visitType || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Condition:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.condition || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={`${styles.patientKey2} ${styles.patientAddress}`}>
                  <span>Address line:</span>
                </p>
                <p className={styles.patientValue2}>
                  {patientDetails.address || "Not specified"}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.emergencyContact}>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Emergency Contact:</p>
                <p className={styles.patientValue2}>
                  {patientDetails.emergencyContactName || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Relationship:</p>
                <p className={styles.patientValue2}>
                  {patientDetails.relationship || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Contact:</p>
                <p className={styles.patientValue2}>
                  {patientDetails.emergencyContact || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admisssion Date & Time:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.admissionDateTime || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>MRN:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.MRN || "Not specified"}
                </p>
              </div>
              <div className={styles.detailRow}>
                <p className={styles.patientKey2}>Admitted By:</p>
                <p className={styles.patientValue2}>
                  {" "}
                  {patientDetails.admittingBy || "Not specified"}
                </p>
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
            <ProgressTracker2 patientId={patientId} caseId={caseId} />
          </div>
        </div>
        {activeModal === "bedInfo" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.bedInfo}>
              <BedInfo onClose={closeModal} patientId={patientId} />
            </div>
          </>
        )}
        {activeModal === "discharge" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.dischargeModal}>
              <Discharge onClose={closeModal} patientId={patientId} />
            </div>
          </>
        )}
        {activeModal === "update progress" && (
          <>
            <div className={styles.backdropOverlay} onClick={closeModal} />
            <div className={styles.updateProgressModal}>
              <UpdateProgress
                onClose={closeModal}
                patientId={patientId}
                caseId={caseId}
              />
            </div>
          </>
        )}
      </div>
      {!isFollowUpStatus ? (
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
            {activeTab === "medical admin" && (
              <MedAdminRecord patientId={patientId} />
            )}
            {activeTab === "nursing" && <Nursing patientId={patientId} />}
            {activeTab === "past reports" && (
              <PastReportsAndDischarge patientId={patientId} />
            )}
          </div>
        </div>
      ) : (
        <IsFollowUp />
      )}
    </div>
  );
};

export default PatientProfile;
