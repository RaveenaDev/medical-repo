import { useState } from "react";

import styles from "./ConsultBody.module.scss";

import { Plus, CircleCheck } from "lucide-react";
import DiagnosisAndVital from "./DiagnosisAndVital";
import TreatmentAndTest from "./TreatmentAndTest";
import PerceptionAndMedicines from "./PerceptionAndMedicines";
import PatientInfo from "./PatientInfo";
import { MedicalHistory } from "./MedicalHistory";
import CurrentMedication from "./CurrentMedication";

const ConsultBody = () => {
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

  const [selectedComponent, setSelectedComponent] = useState("PatientInfo");

  const ongoingPatients = dummyPatient.filter(
    (patient) => patient.consultStatus === "Ongoing"
  );

  return (
    <div>
      {/* Header 2 */}
      <div className={styles["header-2"]}>
        <div className={styles["h2-left"]}>
          <p className={styles["pat-num-l"]}>XXXXXXX</p>
          <p className={styles["pat-name-l"]}>Jaismine Kaur</p>
          <p className={styles["pat-status-l"]}>Ongoing</p>
        </div>
        <div className={styles["h2-right"]}>
          <p className={styles["pat-num-r"]}>XXXXXXX</p>
          <p className={styles["pat-name-r"]}>Amit Tripati</p>
          <p className={styles["pat-status-r"]}>Next</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className={styles["panel"]}>
        {/* Left Panel */}
        <div className={styles["left-panel"]}>
          <div
            className={styles["lp-1"]}
            onClick={() => setSelectedComponent("PatientInfo")}
          >
            <img
              src={ongoingPatients[0].profileURL}
              alt=""
              className={styles["lp-1-avatar"]}
            />
            <div className={styles["lp-1-info"]}>
              <p className={styles["lp-1-name"]}>Jaismine kaur</p>
              <p className={styles["lp-1-role"]}>Follow up Patient</p>
            </div>
          </div>

          <div
            className={styles["lp-2"]}
            onClick={() => setSelectedComponent("MedicalHistory")}
          >
            <p>Medical History</p>
          </div>
          <div
            className={styles["lp-3"]}
            onClick={() => setSelectedComponent("CurrentMedication")}
          >
            <p>Current Medication</p>
          </div>
          <div
            className={styles["lp-4"]}
            onClick={() => setSelectedComponent("DiagnosisAndVital")}
          >
            <p>Diagnosis & Vital</p>
          </div>
          <div
            className={styles["lp-5"]}
            onClick={() => setSelectedComponent("PerceptionAndMedicines")}
          >
            <p>Perception & Medicines</p>
          </div>
          <div
            className={styles["lp-6"]}
            onClick={() => setSelectedComponent("TreatmentAndTest")}
          >
            <p>Treatment and Tests</p>
          </div>

          <div className={styles["lp-7"]}>
            <Plus className={styles["lp-7-icon"]} size={38} />
            <p>Add Question</p>
          </div>

          <div className={styles["lp-8"]}>
            <button>
              <CircleCheck size={15} />
              <p>Complete</p>
            </button>
            <button className={styles["lp-8-refBtn"]}>
              <img src="/assets/healthicons_referral.svg" sizes={""} alt="" />
              <p>Refer</p>
            </button>
          </div>
        </div>

        {/* Right Panel */}

        <div className={styles["right-panel"]}>
          <div className={styles["rp-content"]}>
            {selectedComponent === "PatientInfo" && (
              <PatientInfo
                patient={ongoingPatients[0]}
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
