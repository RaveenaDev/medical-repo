import { useState, useEffect } from "react";
import styles from "./ConsultBody.module.scss";
import { Plus, CircleCheck, CalendarCheck } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { generatePrescriptionsWithAI } from "../../../../components/State/Doctor/Action.js";
import CustomComponent from "./CustomComponent.jsx";
import ScheduleTreatment from "./ScheduleTreatment.jsx";

const ConsultBody = ({ appointments }) => {
  const [completeData, setCompleteData] = useState({
    patientId: null,
    medicalHistory: null,
    currentMedications: null,
    diagnosisVitals: null,
    perceptionsAndMedicines: null,
    treatmentAndTests: null,
  });
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

  const [customSections, setCustomSections] = useState([]);

  const [selectedComponent, setSelectedComponent] = useState("PatientInfo");

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const generatedPrescriptionsWithAI = useSelector(
    (store) => store.doctor.generatedPrescriptionsByAI
  );

  const ongoingAppointment = appointments.find(
    (app) => app.status === "Ongoing"
  );

  useEffect(() => {
    setCompleteData({
      ...completeData,
      patientId: ongoingAppointment?.patient._id,
    });
  }, [ongoingAppointment]);

  useEffect(() => {
    if (
      selectedComponent === "PerceptionAndMedicines" &&
      (completeData.medicalHistory !== null ||
        completeData.currentMedications !== null ||
        completeData.diagnosisVitals !== null)
    ) {
      // console.log("Data for AI: ", completeData);
      dispatch(generatePrescriptionsWithAI(completeData));
    }
  }, [
    selectedComponent,
    completeData.medicalHistory,
    completeData.currentMedications,
    completeData.diagnosisVitals,
    dispatch,
  ]);

  if (!ongoingAppointment || ongoingAppointment.length === 0) {
    return (
      <div className={styles["no-appointments"]}>
        <p>No appointments found</p>
      </div>
    );
  }

  const openComplete = () => setActiveModal("complete");
  const openRefer = () => setActiveModal("refer");
  const openNextAppointment = () => setActiveModal("nextAppointment");
  const openAddQuestion = () => setActiveModal("addQuestion");

  const closeModal = () => setActiveModal(null);

  const ongoingPatients = dummyPatient.filter(
    (patient) => patient.consultStatus === "Ongoing"
  );

  // Step 2: Find the next appointment with a token number greater than ongoing
  let nextAppointment = null;
  if (ongoingAppointment) {
    const ongoingToken = ongoingAppointment.tokenNumber;

    // Filter those with higher token number and same day (optional: if token is per day)
    const futureAppointments = appointments
      .filter((app) => app.tokenNumber > ongoingToken)
      .sort((a, b) => a.tokenNumber - b.tokenNumber); // ascending

    nextAppointment = futureAppointments[0] || null;
  }

  // console.log("Ongoing: ",ongoingAppointment)
  // console.log("Next: ",nextAppointment)

  const handleComplete = () => {
    console.log("DATA: ", completeData);
  };

  const handleRefer = () => {
    console.log("DATA: ", completeData);
  };

  const handleSchedule = () => {
    console.log("DATA: ", completeData);
    setActiveModal("scheduleTreatment");
  };

  const handleAddSection = (sectionName) => {
    setCustomSections([...customSections, sectionName]);
    setSelectedComponent(sectionName);
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className={styles["no-appointments"]}>
        <p>No appointments found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header 2 */}
      <div className={styles["header-2"]}>
        <div className={styles["h2-left"]}>
          <p className={styles["pat-num-l"]}>{ongoingAppointment.caseId}</p>
          <p className={styles["pat-name-l"]}>
            {ongoingAppointment.patient?.name}
          </p>
          <p className={styles["pat-status-l"]}>{ongoingAppointment.status}</p>
        </div>
        <div className={styles["h2-right"]} onClick={openNextAppointment}>
          <p className={styles["pat-num-r"]}>{nextAppointment.caseId}</p>
          <p className={styles["pat-name-r"]}>
            {nextAppointment.patient?.name}
          </p>
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
              <p className={styles["lp-1-name"]}>
                {ongoingAppointment.patient.name}
              </p>
              <p className={styles["lp-1-role"]}>
                {ongoingAppointment.patient.typeVisit} Patient
              </p>
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

          {customSections.map((section, index) => (
            <div
              key={index}
              className={`${styles["lp-6"]} ${
                selectedComponent === section ? styles.active : ""
              }`}
              onClick={() => setSelectedComponent(section)}
            >
              <p>{section}</p>
            </div>
          ))}

          <div className={styles["lp-7"]} onClick={openAddQuestion}>
            <Plus className={styles["lp-7-icon"]} size={38} />
            <p>Add Question</p>
          </div>

          <div className={styles["lp-8"]}>
            <button onClick={handleComplete}>
              <CircleCheck size={15} />
              <p>Complete</p>
            </button>
            <button className={styles["lp-8-refBtn"]} onClick={openRefer}>
              <img src="/assets/healthicons_referral.svg" sizes={""} alt="" />
              <p>Refer</p>
            </button>
          </div>
          <button
            type="button"
            className={styles["btn"]}
            onClick={handleSchedule}
          >
            <CalendarCheck className={styles["calendar-icon2"]} />
            <p>Schedule Treatment</p>
          </button>
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
              <Refer onClose={closeModal} handleRefer={handleRefer} />
            </div>
          </>
        )}
        {activeModal === "nextAppointment" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["nextAppointment-modal"]}>
              <NextAppointment
                onClose={closeModal}
                nextAppointment={nextAppointment}
              />
            </div>
          </>
        )}
        {activeModal === "addQuestion" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["addQuestion-modal"]}>
              <AddQuestion
                onClose={closeModal}
                onAddSection={handleAddSection}
              />
            </div>
          </>
        )}{" "}
        {activeModal === "scheduleTreatment" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["scheduleTreatment-modal"]}>
              <ScheduleTreatment
                onClose={closeModal}
                onAddSection={handleAddSection}
              />
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
                onConfirm={(medicalData) => {
                  console.log(
                    "Data coming from medical History: ",
                    medicalData
                  );
                  setCompleteData({
                    ...completeData,
                    medicalHistory: medicalData,
                  });
                  setSelectedComponent("CurrentMedication");
                }}
              />
            )}
            {selectedComponent === "CurrentMedication" && (
              <CurrentMedication
                patient={ongoingPatients[0]}
                onConfirm={(currentMedicationData) => {
                  console.log(
                    "Data coming from current Medications: ",
                    currentMedicationData
                  );
                  setCompleteData({
                    ...completeData,
                    currentMedications: currentMedicationData,
                  });
                  setSelectedComponent("DiagnosisAndVital");
                }}
              />
            )}
            {selectedComponent === "DiagnosisAndVital" && (
              <DiagnosisAndVital
                patient={ongoingPatients[0]}
                onConfirm={(diagnosisAndVital) => {
                  console.log(
                    "Data coming from diagnosis and vital : ",
                    diagnosisAndVital
                  );
                  setCompleteData({
                    ...completeData,
                    diagnosisVitals: diagnosisAndVital,
                  });
                  setSelectedComponent("PerceptionAndMedicines");
                }}
              />
            )}
            {selectedComponent === "PerceptionAndMedicines" && (
              <PerceptionAndMedicines
                patient={ongoingAppointment.patient}
                completeData={completeData}
                generatedPrescriptions={generatedPrescriptionsWithAI}
                onConfirm={(perceptionData) => {
                  console.log(
                    "Data coming from perceptions and medicines: ",
                    perceptionData
                  );
                  setCompleteData({
                    ...completeData,
                    perceptionsAndMedicines: perceptionData,
                  });
                  setSelectedComponent("TreatmentAndTest");
                }}
              />
            )}
            {selectedComponent === "TreatmentAndTest" && (
              <TreatmentAndTest
                patient={ongoingPatients[0]}
                onConfirm={(treatmentAndTestsData) => {
                  console.log(
                    "Data coming from treatment and tests: ",
                    treatmentAndTestsData
                  );
                  setCompleteData({
                    ...completeData,
                    treatmentAndTests: treatmentAndTestsData,
                  });
                  setSelectedComponent("TreatmentAndTest");
                }}
              />
            )}

            {customSections.includes(selectedComponent) && (
              <CustomComponent
                selectedComponent={selectedComponent}
                onConfirm={(data) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    [selectedComponent]: data,
                  }));

                  // console.log("Complete Data:", completeData);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultBody;
