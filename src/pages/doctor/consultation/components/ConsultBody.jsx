import { useState, useEffect } from "react";
import styles from "./ConsultBody.module.scss";
import { Plus, CircleCheck } from "lucide-react";
import DiagnosisAndVital from "./DiagnosisAndVital";
import TreatmentAndTest from "./TreatmentAndTest";
import PerceptionAndMedicines from "./PerceptionAndMedicines";
import PatientInfo from "./PatientInfo";
import { MedicalHistory } from "./MedicalHistory";
import CurrentMedication from "./CurrentMedication";
import Complete from "./Complete";
import Refer from "./Refer";
import NextAppointment from "./NextAppointment";
import AddQuestion from "./AddQuestion";

const ConsultBody = ({appointments}) => {
  const dummyPatient = [
    {
      id: 1,
      name: "Anil Kumar",
      profileURL: "https://i.pravatar.cc/30?img=17",
      Gender: "Male (55yrs)",
      Birthday: "Jan 20th, 1969",
      Phone: "(+91) 9123456780",
      Address:
        "302, Maple Residency, Banjara Hills, Hyderabad, Telangana, 500034",
      caseId: 45678,
      AssessedBy: "Dr. Ravi Gupta",
      MemberStatus: "Active Member",
      RegisterDate: "May 18th, 2021",
      email: "anil.kumar69@gmail.com",
      token: 100,
      consultStatus: "Done",
    },
    {
      id: 2,
      name: "Jaismine Kaur",
      profileURL: "https://randomuser.me/api/portraits/women/17.jpg",
      Gender: "Female (28yrs)",
      Birthday: "Feb 24th, 1997",
      Phone: "(+91) 1234567890",
      Address:
        "904, A Wing, ABC Apartment,Sector 12,Borivali West,Mumbai, Maharashtra, 400092",
      caseId: 1234567,
      AssessedBy: "Dr.Arunita Chatterjee",
      MemberStatus: "Active Member",
      RegisterDate: "June 24th,2024",
      email: "jasmeet89@gmail.com",
      token: 101,
      consultStatus: "Ongoing",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      profileURL: "https://i.pravatar.cc/30?img=15",
      Gender: "Male (34yrs)",
      Birthday: "May 12th, 1990",
      Phone: "(+91) 9876543210",
      Address:
        "504, B Wing, Sunrise Tower, Andheri East, Mumbai, Maharashtra, 400069",
      caseId: 23456,
      AssessedBy: "Dr. Sameer Mehta",
      MemberStatus: "Inactive",
      RegisterDate: "July 15th, 2023",
      email: "rahul.sharma90@gmail.com",
      token: 102,
      consultStatus: "Remaining",
    },
    {
      id: 4,
      name: "Priya Desai",
      profileURL: "https://i.pravatar.cc/30?img=16",
      Gender: "Female (41yrs)",
      Birthday: "Sep 2nd, 1983",
      Phone: "(+91) 9988776655",
      Address: "601, Garden View, Koregaon Park, Pune, Maharashtra, 411001",
      caseId: 34567,
      AssessedBy: "Dr. Sunita Rao",
      MemberStatus: "Active Member",
      RegisterDate: "August 3rd, 2022",
      email: "priya.desai83@gmail.com",
      token: 103,
      consultStatus: "Remaining",
    },
  ];

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openComplete = () => setActiveModal("complete");
  const openRefer = () => setActiveModal("refer");
  const openNextAppointment = () => setActiveModal("nextAppointment");
  const openAddQuestion = () => setActiveModal("addQuestion");

  const closeModal = () => setActiveModal(null);

  const [selectedComponent, setSelectedComponent] = useState("PatientInfo");
  const [activePanel, setActivePanel] = useState("lp1");

  const ongoingPatients = dummyPatient.filter(
    (patient) => patient.consultStatus === "Ongoing"
  );

  if (!appointments || appointments.length === 0) {
    return (
        <div className={styles["no-appointments"]}>
          <p>No appointments found</p>
        </div>
    );
  }

  console.log("Appointments: ",appointments)

  // Step 1: Find the ongoing appointment
  const ongoingAppointment = appointments.find(app => app.status === "Ongoing");

// Step 2: Find the next appointment with a token number greater than ongoing
  let nextAppointment = null;
  if (ongoingAppointment) {
    const ongoingToken = ongoingAppointment.tokenNumber;

    // Filter those with higher token number and same day (optional: if token is per day)
    const futureAppointments = appointments
        .filter(app => app.tokenNumber > ongoingToken)
        .sort((a, b) => a.tokenNumber - b.tokenNumber); // ascending

    nextAppointment = futureAppointments[0] || null;
  }

  console.log("Ongoing: ",ongoingAppointment)
  console.log("Next: ",nextAppointment)

  return (
    <div>
      {/* Header 2 */}
      <div className={styles["header-2"]}>
        <div className={styles["h2-left"]}>
          <p className={styles["pat-num-l"]}>{ongoingAppointment.caseId}</p>
          <p className={styles["pat-name-l"]}>{ongoingAppointment.patient?.name}</p>
          <p className={styles["pat-status-l"]}>{ongoingAppointment.status}</p>
        </div>
        <div className={styles["h2-right"]} onClick={openNextAppointment}>
          <p className={styles["pat-num-r"]}>{nextAppointment.caseId}</p>
          <p className={styles["pat-name-r"]}>{nextAppointment.patient?.name}</p>
          <p className={styles["pat-status-r"]}>Next</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className={styles["panel"]}>
        {/* Left Panel */}
        <div className={styles["left-panel"]}>
          <div
            className={`${styles["lp-1"]} ${
              selectedComponent === "PatientInfo" ? styles.active : ""
            }`}
            onClick={() => setSelectedComponent("PatientInfo")}
          >
            <img
              src={ongoingPatients[0].profileURL}
              alt=""
              className={styles["lp-1-avatar"]}
            />
            <div className={styles["lp-1-info"]}>
              <p className={styles["lp-1-name"]}>{ongoingAppointment.patient.name}</p>
              <p className={styles["lp-1-role"]}>{ongoingAppointment.patient.typeVisit} Patient</p>
            </div>
          </div>

          <div
            className={`${styles["lp-2"]} ${
              selectedComponent === "MedicalHistory" ? styles.active : ""
            }`}
            onClick={() => setSelectedComponent("MedicalHistory")}
          >
            <p>Medical History</p>
          </div>
          <div
            className={`${styles["lp-3"]} ${
              selectedComponent === "CurrentMedication" ? styles.active : ""
            }`}
            onClick={() => setSelectedComponent("CurrentMedication")}
          >
            <p>Current Medication</p>
          </div>
          <div
            className={`${styles["lp-4"]} ${
              selectedComponent === "DiagnosisAndVital" ? styles.active : ""
            }`}
            onClick={() => setSelectedComponent("DiagnosisAndVital")}
          >
            <p>Diagnosis & Vital</p>
          </div>
          <div
            className={`${styles["lp-5"]} ${
              selectedComponent === "PerceptionAndMedicines"
                ? styles.active
                : ""
            }`}
            onClick={() => setSelectedComponent("PerceptionAndMedicines")}
          >
            <p>Perception & Medicines</p>
          </div>
          <div
            onClick={() => setSelectedComponent("TreatmentAndTest")}
            className={`${styles["lp-6"]} ${
              selectedComponent === "TreatmentAndTest" ? styles.active : ""
            }`}
          >
            <p>Treatment and Tests</p>
          </div>

          <div className={styles["lp-7"]} onClick={openAddQuestion}>
            <Plus className={styles["lp-7-icon"]} size={38} />
            <p>Add Question</p>
          </div>

          <div className={styles["lp-8"]}>
            <button onClick={openComplete}>
              <CircleCheck size={15} />
              <p>Complete</p>
            </button>
            <button className={styles["lp-8-refBtn"]} onClick={openRefer}>
              <img src="/assets/healthicons_referral.svg" sizes={""} alt="" />
              <p>Refer</p>
            </button>
          </div>
        </div>

        {activeModal === "complete" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["complete-modal"]}>
              <Complete onClose={closeModal} onComplete={openNextAppointment} />
            </div>
          </>
        )}

        {activeModal === "refer" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["refer-modal"]}>
              <Refer onClose={closeModal} />
            </div>
          </>
        )}

        {activeModal === "nextAppointment" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["nextAppointment-modal"]}>
              <NextAppointment onClose={closeModal} nextAppointment={nextAppointment}/>
            </div>
          </>
        )}

        {activeModal === "addQuestion" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["addQuestion-modal"]}>
              <AddQuestion onClose={closeModal} />
            </div>
          </>
        )}

        {/* Right Panel */}

        <div className={styles["right-panel"]}>
          <div className={styles["rp-content"]}>
            {selectedComponent === "PatientInfo" && (
              <PatientInfo
                ongoingAppointment={ongoingAppointment}
                patient1={ongoingPatients[0]}
                onConfirm={() => setSelectedComponent("MedicalHistory")}
              />
            )}
            {selectedComponent === "MedicalHistory" && (
              <MedicalHistory
                patient={ongoingPatients[0]}
                onConfirm={() => setSelectedComponent("CurrentMedication")}
              />
            )}
            {selectedComponent === "CurrentMedication" && (
              <CurrentMedication
                patient={ongoingPatients[0]}
                onConfirm={() => setSelectedComponent("DiagnosisAndVital")}
              />
            )}
            {selectedComponent === "DiagnosisAndVital" && (
              <DiagnosisAndVital
                patient={ongoingPatients[0]}
                onConfirm={() => setSelectedComponent("PerceptionAndMedicines")}
              />
            )}
            {selectedComponent === "PerceptionAndMedicines" && (
              <PerceptionAndMedicines
                patient={ongoingPatients[0]}
                onConfirm={() => setSelectedComponent("TreatmentAndTest")}
              />
            )}
            {selectedComponent === "TreatmentAndTest" && (
              <TreatmentAndTest patient={ongoingPatients[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultBody;
