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
import {
  generatePrescriptionsWithAI,
  submitConsultation,
} from "../../../../components/State/Doctor/Action.js";
import CustomComponent from "./CustomComponent.jsx";
import ScheduleTreatment from "./ScheduleTreatment.jsx";
import DynamicFormSection from "./DynamicFormSection.jsx";
import {toast} from "react-toastify";

const ConsultBody = ({
  selectedForm,
  appointments,
  onSuccess,
    onStart,
  completeData,
  setCompleteData,
  selectedComponent,
  setSelectedComponent,
    confirmedSections,
    setConfirmedSections,
    customSections,
    setCustomSections
}) => {
  const [final, setFinal] = useState({
    doctor: null,
    patient: null,
    appointment: null,
    department: null,
    action: null,
    consultationData: null,
  });

  console.log("App: ",appointments)

  const [modalData, setModalData] = useState(null);

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

  const [isAllowed, setIsAllowed] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => setActiveModal(null);

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

  const openNextAppointment = (data) => {
    // console.log("Working")
    setActiveModal("nextAppointment")
    setIsAllowed(data);
  };

  useEffect(() => {
    setFinal({
      ...final,
      patient: ongoingAppointment?.patient._id,
      department: ongoingAppointment?.department._id,
      doctor: ongoingAppointment?.doctor._id,
      appointment: ongoingAppointment?._id,
    });
  }, [ongoingAppointment]);

  useEffect(() => {
    if (
      selectedComponent === "PerceptionAndMedicines" ||
      selectedComponent === "static-2"
    ) {
      const aiData = {
        ...completeData,
        patientId: ongoingAppointment?.patient._id,
      };

      dispatch(generatePrescriptionsWithAI(aiData));
    }
  }, [selectedComponent, dispatch]);


  if (!appointments || appointments.length === 0) {
    return (
        <div className={styles["no-appointments"]}>
          <p>No appointments found</p>
        </div>
    );
  }

  if (!ongoingAppointment || ongoingAppointment.length === 0) {
    // Step 1: Filter for 'Waiting' status
    const waitingAppointments = appointments.filter(
        (appointment) => appointment.status === "Waiting"
    );

// Step 2: Find the one with the minimum tokenNumber
    const nextAppointment = waitingAppointments.length > 0
        ? waitingAppointments.reduce((min, curr) =>
                curr.tokenNumber < min.tokenNumber ? curr : min,
            waitingAppointments[0])
        : null;


    // console.log("Next Appointment:", nextAppointment);
    return (
        <>
          <div style={{display:'flex',flexDirection:'column'
            ,justifyContent:'center',alignItems:'center',marginTop:'1rem'}}>
            {
              nextAppointment ? (
                  <div className={styles["h2-right"]} style={{
                    backgroundColor: '#ffffff', border: '1px solid #25307F',
                    textAlign: 'center'
                  }} onClick={openNextAppointment}>
                    <p className={styles["pat-num-r"]}>{nextAppointment?.caseId}</p>
                    <p className={styles["pat-name-r"]}>
                      {nextAppointment.patient?.name}
                    </p>
                    <p className={styles["pat-status-r"]}>Next</p>
                  </div>
              ) : (
                  <p>No next appointments.</p>
              )
            }

            <div className={styles["no-appointments"]}>
              <p>No ongoing appointments found</p>
            </div>
          </div>

          {activeModal === "nextAppointment" && (
              <>
                <div className={styles["backdrop-overlay"]} onClick={closeModal}/>
                <div className={styles["nextAppointment-modal"]}>
                  <NextAppointment
                      onClose={closeModal}
                      nextAppointment={nextAppointment}
                      allowance = {true}
                      onStart={onStart}
                  />
                </div>
              </>
          )}
        </>
    )

  }

  const openAddQuestion = () => setActiveModal("addQuestion");

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

  // console.log("Next Appointment:", nextAppointment);

  const handleCompleteBtn = () => {
    if (!completeData || Object.keys(completeData).length === 0) {
      toast.error("Kindly fill the details of consultation!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
      return;
    }

    setActiveModal("complete");
  };

  const handleComplete = () => {
    const updatedFinal = {
      ...final,
      action: "complete",
      consultationData: completeData,
    };

    // console.log("Updated Final: ",updatedFinal)
    dispatch(submitConsultation(updatedFinal))
        .then(() => {
          setCompleteData({});
          onSuccess(); // ✅ Will only run after dispatch finishes
        })
        .catch((err) => {
          console.error("Submission failed:", err);
        });
    openNextAppointment(true);
  };

  const handleRefer = () => {
    if (!completeData || Object.keys(completeData).length === 0) {
      toast.error("Kindly fill the details of consultation!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
      return;
    }

    const updatedFinal = {
      ...final,
      action: "refer",
      consultationData: completeData,
    };

    setActiveModal("refer");
    setModalData(updatedFinal);
  };

  const handleSchedule = () => {
    const updatedFinal = {
      ...final,
      action: "schedule",
      consultationData: completeData,
    };

    setActiveModal("scheduleTreatment");
    setModalData(updatedFinal);
  };

  const handleAddSection = (sectionName) => {
    setCustomSections([...customSections, sectionName]);
    setSelectedComponent(sectionName);
  };


  // console.log("Seel: ",confirmedSections)

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
        {nextAppointment ? (
          <div className={styles["h2-right"]} onClick={() => openNextAppointment(false)}>
            <p className={styles["pat-num-r"]}>{nextAppointment?.caseId}</p>
            <p className={styles["pat-name-r"]}>
              {nextAppointment.patient?.name}
            </p>
            <p className={styles["pat-status-r"]}>Next</p>
          </div>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className={styles["h2-right"]}
          >
            <p className={styles["pat-name-r"]}>No next appointments</p>
          </div>
        )}
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

          {!selectedForm ? (
            <>
              <div
                className={`${styles["lp-2"]} ${
                  selectedComponent === "MedicalHistory" ? styles.active : ""}
                ${confirmedSections.includes("MedicalHistory") ? styles.confirmed : ""}
                `}
                onClick={() => setSelectedComponent("MedicalHistory")}
              >
                <p>Medical History</p>
              </div>
              <div
                className={`${styles["lp-3"]} ${
                  selectedComponent === "CurrentMedication" ? styles.active : ""
                }
                ${confirmedSections.includes("CurrentMedication") ? styles.confirmed : ""}
                `}
                onClick={() => setSelectedComponent("CurrentMedication")}
              >
                <p>Current Medication</p>
              </div>
              <div
                className={`${styles["lp-4"]} ${
                  selectedComponent === "DiagnosisAndVital" ? styles.active : ""
                }
                ${confirmedSections.includes("DiagnosisAndVital") ? styles.confirmed : ""}
                `}
                onClick={() => setSelectedComponent("DiagnosisAndVital")}
              >
                <p>Diagnosis & Vital</p>
              </div>
              <div
                className={`${styles["lp-5"]} ${
                  selectedComponent === "PerceptionAndMedicines"
                    ? styles.active
                    : ""
                } ${!completeData.medicalHistory ? styles.disabled : ""}
                ${confirmedSections.includes("PerceptionAndMedicines") ? styles.confirmed : ""}
                `}
                onClick={() => {
                  if (completeData.medicalHistory) {
                    setSelectedComponent("PerceptionAndMedicines");
                  }
                }}
              >
                <p>Prescription & Medicines</p>
              </div>
              <div
                onClick={() => setSelectedComponent("TreatmentAndTest")}
                className={`${styles["lp-6"]} ${
                  selectedComponent === "TreatmentAndTest" ? styles.active : ""
                }
                ${confirmedSections.includes("TreatmentAndTest") ? styles.confirmed : ""}
                `}
              >
                <p>Treatment and Tests</p>
              </div>
            </>
          ) : (
            <>
              {selectedForm?.sections?.map((section, index) => {
                const isDisabled =
                  section.name === "Prescription & Medicines" &&
                  !completeData?.medicalHistory;

                return (
                  <div
                    key={section.id}
                    className={`${styles["lp-6"]} ${
                      selectedComponent === section.id ? styles.active : ""
                    }
                     ${confirmedSections.includes(section.name) ? styles.confirmed : ""}
                     ${isDisabled ? styles.disabled : ""}`}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedComponent(section.id);
                      }
                    }}
                  >
                    <p>{section.name}</p>
                  </div>
                );
              })}
            </>
          )}

          {customSections.map((section, index) => (
            <div
              key={index}
              className={`${styles["lp-6"]} ${
                selectedComponent === section ? styles.active : ""
              }
              ${confirmedSections.includes(section) ? styles.confirmed : ""}
              `}
              onClick={() => setSelectedComponent(section)}
            >
              <p>{section}</p>
            </div>
          ))}

          <div className={styles["lp-7"]} onClick={openAddQuestion}>
            <Plus className={styles["lp-7-icon"]} size={38} />
            <p>Add Section</p>
          </div>

          <div className={styles["lp-8"]}>
            <button onClick={handleCompleteBtn}>
              <CircleCheck size={15} />
              <p>Complete</p>
            </button>
            <button className={styles["lp-8-refBtn"]} onClick={handleRefer}>
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
              <Complete onClose={closeModal} onComplete={handleComplete} nextAppointment={openNextAppointment}/>
            </div>
          </>
        )}
        {activeModal === "refer" && (
          <>
            <div className={styles["backdrop-overlay"]} onClick={closeModal} />
            <div className={styles["refer-modal"]}>
              <Refer
                setCompleteData={setCompleteData}
                onClose={closeModal}
                modalData={modalData}
                patient={ongoingAppointment.patient}
                onSuccess={onSuccess}
                openNextAppointment={openNextAppointment}
              />
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
                allowance={isAllowed}
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
                setCompleteData={setCompleteData}
                onClose={closeModal}
                onAddSection={handleAddSection}
                modalData={modalData}
                onSuccess={onSuccess}
              />
            </div>
          </>
        )}
        {/* Right Panel */}
        <div className={styles["right-panel"]}>
          <div className={styles["rp-content"]}>
            {selectedForm &&
              selectedForm.sections?.some(
                (sec) => sec.id === selectedComponent
              ) &&
              (() => {
                const currentSection = selectedForm.sections.find(
                  (sec) => sec.id === selectedComponent
                );

                if (!currentSection) return null;

                // Check for static Medical History
                if (
                  currentSection.isStatic &&
                  currentSection.name === "Medical History"
                ) {
                  return (
                    <MedicalHistory
                      patient={ongoingPatients[0]}
                      existingData={completeData}
                      selectedComponent="medicalHistory"
                      onConfirm={(medicalData) => {
                        setCompleteData((prev) => ({
                          ...prev,
                          medicalHistory: medicalData,
                        }));

                        setConfirmedSections((prev) => [...new Set([...prev, "Medical History"])]);

                        const currentIndex = selectedForm.sections.findIndex(
                          (sec) => sec.id === selectedComponent
                        );
                        const nextSection =
                          selectedForm.sections[currentIndex + 1];
                        if (nextSection) {
                          setSelectedComponent(nextSection.id);
                        }
                      }}
                    />
                  );
                }

                // Check for static Prescription & Medicines
                if (
                  currentSection.isStatic &&
                  currentSection.name === "Prescription & Medicines"
                ) {
                  return (
                    <PerceptionAndMedicines
                      patient={ongoingAppointment.patient}
                      existingData={completeData}
                      selectedComponent="perceptionsAndMedicines"
                      completeData={completeData}
                      generatedPrescriptions={generatedPrescriptionsWithAI}
                      onConfirm={(perceptionData) => {
                        setCompleteData((prev) => ({
                          ...prev,
                          perceptionsAndMedicines: perceptionData,
                        }));

                        setConfirmedSections((prev) => [...new Set([...prev, "Prescription & Medicines"])]);

                        const currentIndex = selectedForm.sections.findIndex(
                          (sec) => sec.id === selectedComponent
                        );
                        const nextSection =
                          selectedForm.sections[currentIndex + 1];
                        if (nextSection) {
                          setSelectedComponent(nextSection.id);
                        }
                      }}
                    />
                  );
                }

                // Default Dynamic Section for all others
                return (
                  <DynamicFormSection
                    key={selectedComponent}
                    section={currentSection}
                    onConfirm={(data) => {
                      setCompleteData((prev) => ({
                        ...prev,
                        [currentSection.name]: data,
                      }));

                      const currentIndex = selectedForm.sections.findIndex(
                        (sec) => sec.id === selectedComponent
                      );
                      const nextSection =
                        selectedForm.sections[currentIndex + 1];
                      if (nextSection) {
                        setSelectedComponent(nextSection.id);
                      }
                      setConfirmedSections((prev) => [...new Set([...prev, currentSection.name])]);
                    }}
                    existingData={completeData}
                  />
                );
              })()}

            {selectedComponent === "PatientInfo" && (
              <PatientInfo
                ongoingAppointment={ongoingAppointment}
                patient1={ongoingPatients[0]}
                onConfirm={() => {
                  if (!selectedForm) {
                    setSelectedComponent("MedicalHistory");
                  } else {
                    setSelectedComponent("static-1");
                  }
                }}
              />
            )}
            {selectedComponent === "MedicalHistory" && (
              <MedicalHistory
                patient={ongoingPatients[0]}
                existingData={completeData}
                selectedComponent="medicalHistory"
                onConfirm={(medicalData) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    medicalHistory: medicalData,
                  }));
                  setSelectedComponent("CurrentMedication");
                  setConfirmedSections((prev) => [...new Set([...prev, "MedicalHistory"])]);
                }}
              />
            )}
            {selectedComponent === "CurrentMedication" && (
              <CurrentMedication
                patient={ongoingPatients[0]}
                existingData={completeData}
                selectedComponent="currentMedications"
                onConfirm={(currentMedicationData) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    currentMedications: currentMedicationData,
                  }));
                  setSelectedComponent("DiagnosisAndVital");
                  setConfirmedSections((prev) => [...new Set([...prev, "CurrentMedication"])]);
                }}
              />
            )}
            {selectedComponent === "DiagnosisAndVital" && (
              <DiagnosisAndVital
                patient={ongoingPatients[0]}
                existingData={completeData}
                selectedComponent="diagnosisVitals"
                onConfirm={(diagnosisAndVital) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    diagnosisVitals: diagnosisAndVital,
                  }));
                  setSelectedComponent("PerceptionAndMedicines");
                  setConfirmedSections((prev) => [...new Set([...prev, "DiagnosisAndVital"])]);
                }}
              />
            )}
            {selectedComponent === "PerceptionAndMedicines" && (
              <PerceptionAndMedicines
                patient={ongoingAppointment.patient}
                existingData={completeData}
                selectedComponent="perceptionsAndMedicines"
                completeData={completeData}
                generatedPrescriptions={generatedPrescriptionsWithAI}
                onConfirm={(perceptionData) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    perceptionsAndMedicines: perceptionData,
                  }));
                  console.log("Perception Data: ",perceptionData)
                  setSelectedComponent("TreatmentAndTest");
                  setConfirmedSections((prev) => [...new Set([...prev, "PerceptionAndMedicines"])]);
                }}
              />
            )}
            {selectedComponent === "TreatmentAndTest" && (
              <TreatmentAndTest
                patient={ongoingPatients[0]}
                existingData={completeData}
                selectedComponent="treatmentAndTests"
                onConfirm={(treatmentAndTestsData) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    treatmentAndTests: treatmentAndTestsData,
                  }));
                  setSelectedComponent("TreatmentAndTest");
                  setConfirmedSections((prev) => [...new Set([...prev, "TreatmentAndTest"])]);
                }}
              />
            )}

            {customSections.includes(selectedComponent) && (
              <CustomComponent
                selectedComponent={selectedComponent}
                existingData={completeData}
                onConfirm={(data) => {
                  setCompleteData((prev) => ({
                    ...prev,
                    [selectedComponent]: data,
                  }));
                  console.log("Selected Comp ; ",selectedComponent)
                  setConfirmedSections((prev) => [...new Set([...prev, selectedComponent])]);
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
