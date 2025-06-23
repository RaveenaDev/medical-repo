import React, { useState } from "react";
import "./PatientPreviousRecord.scss"; // Assuming you have a CSS file for styling
import VisitRecords from "./visitRecord/visitRecords";
import VisitCard from "./VisitCard/VisitCard";
import Diagnosis from "./diagnosis/Diagnosis";

const PatientPreviousRecord = () => {
  const visitData = [
    {
      date: "15 May - 18 May 2025",
      description: "Admitted for chest pain, treated for hypertension",
      doctor: "Dr. Amit Patel",
      typeofVisit: "3 days Admission",
      department: "Cardiology",
      departmentColor: "#2E823B",
      departmentbgColor: "#E9F0EC",
    },
    {
      date: "8 Mar 2025",
      description: "Routine knee pain evaluation and physiotherapy",
      doctor: "Dr. Amit Patel",
      typeofVisit: "Outpatient",
      department: "Orthopedics",
      departmentColor: "#EAA000",
      departmentbgColor: "#FFFFFF",
    },
    {
      date: "22 Jan - 25 Jan 2025",
      description: "Routine knee pain evaluation and physiotherapy",
      doctor: "Dr. Amit Patel",
      typeofVisit: "Outpatient",
      department: "General Medicine",
      departmentColor: "#25307F",
      departmentbgColor: "#DAE4FF",
    },
    {
      date: "22 Jan - 25 Jan 2025",
      description: "Minor injury treatment after fall",
      doctor: "Dr. Amit Patel",
      typeofVisit: "Emergency",
      department: "Emergency",
      departmentColor: "#F14400",
      departmentbgColor: "#FAF5F9",
    },
  ];
  const colors = ["#5461BE", "#2E823B", "#EAA000", "#878787C2"];
  const [selectedVisit, setSelectedVisit] = useState(visitData[0]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const renderDetails = () => {
    switch (selectedRecord) {
      case "Diagnosis":
        return <Diagnosis />;
      case "Test & Reports":
        return (
          <div>
            💉 <b>Test & Reports</b>
          </div>
        );
      case "Prescriptions":
        return (
          <div>
            🧪 <b>Prescriptions</b>
          </div>
        );
      case "Procedures":
        return (
          <div>
            🩻 <b>Procedures</b>
          </div>
        );
      case "Doctor's Notes":
        return (
          <div>
            🩻 <b>Doctor's Notes</b>
          </div>
        );
      case "Hospital Discharge Summary":
        return (
          <div>
            🩻 <b>Discharge Summary</b>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="patient-previous-record-container">
      <section className="patient-details">
        <div className="patient-image">
          <img
            src="https://randomuser.me/api/portraits/women/12.jpg"
            alt="Patient"
            className="patient-image"
          />
        </div>
        <div className="patient-info-container">
          <h2 className="patient_name">Alice</h2>
          <div className="patient-info">
            <span className="patient-id">Patient ID: 12345</span>
            <span className="patient-age">Age: 30</span>
            <span className="patient-gender">Female</span>
          </div>
          <div className="patient-Allergy">
            Allergies
            <div className="patient-allergies">
              <span className="allergy-Status moderate"></span> Penicilin
            </div>
            <div className="patient-allergies">
              <span className="allergy-Status severe"></span>Peanut
            </div>
          </div>
        </div>
        <div className="patient-lastVisit">Last Visit: 22 May 2025</div>
      </section>
      <div className="patient-records-container">
        <section className="patient-visits">
          <div className="visit-header">
            <h3>Past Visits</h3>
            <div>Search Bar</div>
          </div>
          <div className="visit-list">
            {visitData.map((visit, index) => (
              <VisitCard
                key={index}
                date={visit.date}
                description={visit.description}
                doctor={visit.doctor}
                typeofVisit={visit.typeofVisit}
                department={visit.department}
                color={colors[index % colors.length]}
                departmentbgColor={visit.departmentbgColor}
                departmentColor={visit.departmentColor}
                onClick={() => setSelectedVisit(visit)}
              />
            ))}
          </div>
        </section>
        {selectedRecord ? (
          <div className="patient_records_details">
            <div
              className="records_details_header"
              onClick={() => setSelectedRecord(null)}
              style={{ backgroundColor: "#ffffff" }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6149_7254)">
                  <path
                    d="M18.0045 3.23895C17.4736 2.70811 16.6178 2.70811 16.087 3.23895L7.08445 12.2414C6.66195 12.6639 6.66195 13.3464 7.08445 13.7689L16.087 22.7714C16.6178 23.3023 17.4736 23.3023 18.0045 22.7714C18.5353 22.2406 18.5353 21.3848 18.0045 20.8539L10.1611 12.9998L18.0153 5.14561C18.5353 4.62561 18.5353 3.75895 18.0045 3.23895Z"
                    fill="#25307F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6149_7254">
                    <rect width="26" height="26" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="patient-records-heading">{selectedRecord}</div>
            </div>
            {renderDetails()}
          </div>
        ) : (
          <section className="patient-records">
            <div className="record-date">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33398 6.5V14.8333C1.33398 15.2754 1.50958 15.6993 1.82214 16.0118C2.1347 16.3244 2.55862 16.5 3.00065 16.5H13.0007C13.4427 16.5 13.8666 16.3244 14.1792 16.0118C14.4917 15.6993 14.6673 15.2754 14.6673 14.8333V6.5M1.33398 6.5V4.83333C1.33398 4.39131 1.50958 3.96738 1.82214 3.65482C2.1347 3.34226 2.55862 3.16667 3.00065 3.16667H4.66732M1.33398 6.5H14.6673M14.6673 6.5V4.83333C14.6673 4.39131 14.4917 3.96738 14.1792 3.65482C13.8666 3.34226 13.4427 3.16667 13.0007 3.16667H11.334M4.66732 3.16667H11.334M4.66732 3.16667V1.5M11.334 3.16667V1.5"
                  stroke="#25307F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {selectedVisit.date}
            </div>
            <div>
              <VisitRecords
                visit={selectedVisit}
                onSelectRecord={setSelectedRecord}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PatientPreviousRecord;
