import React, { useState } from "react";
import "./PatientPreviousRecord.scss"; // Assuming you have a CSS file for styling
import VisitRecords from "./visitRecord/VisitRecords.jsx";
import VisitCard from "./VisitCard/VisitCard.jsx";
import Diagnosis from "./diagnosis/Diagnosis.jsx";
import Procedures from "./procudures/Procedures.jsx";
import DoctorNotes from "./doctorNotes/DoctorNotes.jsx";
import DischargeSummary from "./dischargeSummary/DischargeSummary.jsx";
import TestsAndRecords from "./testandrecords/TestsAndRecords.jsx";
import Prescriptions from "./prescription/Prescriptions.jsx";

const PatientPreviousRecord = ({patientDetails}) => {
  console.log("GOTCHA: ",patientDetails)
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
  const colors = ["#5461BE", "#2E823B", "#EAA000", "#F14400"];
  const [selectedVisit, setSelectedVisit] = useState(visitData[0]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const renderDetails = () => {
    switch (selectedRecord) {
      case "Diagnosis":
        return <Diagnosis />;
      case "Tests & Reports":
        return <TestsAndRecords />;
      case "Prescriptions":
        return <Prescriptions />;
      case "Procedures":
        return <Procedures />;

      case "Doctor's Notes":
        return <DoctorNotes />;

      case "Hospital Discharge Summary":
        return <DischargeSummary />;
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
          <h2 className="patient_name">{patientDetails.name || "N/A"}</h2>
          <div className="patient-info">
            <span className="patient-id">Patient ID: {patientDetails.patId || "N/A"}</span>
            <span className="patient-age">Age: {patientDetails.age || "N/A"}</span>
            <span className="patient-gender">{patientDetails.gender || "N/A"}</span>
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
        <div className="patient-lastVisit">Last Visit: {new Date(
              patientDetails.consultations[0].date
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) || "N/A"}
        </div>
      </section>
      <div className="patient-records-container">
        <section className="patient-visits">
          <div className="visit-header">
            <h3>Past Visits</h3>
            <div className="search_bar">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64445 17.3333 8.66667 17.3333C6.24445 17.3333 4.19467 16.4942 2.51733 14.816C0.840001 13.1378 0.000889594 11.088 7.05467e-07 8.66667C-0.000888183 6.24533 0.838223 4.19556 2.51733 2.51733C4.19645 0.839111 6.24622 0 8.66667 0C11.0871 0 13.1373 0.839111 14.8173 2.51733C16.4973 4.19556 17.336 6.24533 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.7502 14.0836 12.9173 12.9173C14.0844 11.7511 14.6676 10.3342 14.6667 8.66667C14.6658 6.99911 14.0827 5.58267 12.9173 4.41733C11.752 3.252 10.3351 2.66844 8.66667 2.66667C6.99822 2.66489 5.58178 3.24844 4.41733 4.41733C3.25289 5.58622 2.66933 7.00267 2.66667 8.66667C2.664 10.3307 3.24756 11.7476 4.41733 12.9173C5.58711 14.0871 7.00356 14.6702 8.66667 14.6667Z"
                  fill="#878787"
                />
              </svg>
              Search Records..
            </div>
          </div>
          <div className="visit-list">
            {patientDetails?.consultations?.map((visit, index) => (
              <VisitCard
                key={index}
                date={new Date(
                    visit.date
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }) || "N/A"}
                description={visit?.treatment?.note || "N/A"}
                doctor={visit?.doctor.name || "N/A"}
                typeofVisit={visit?.typeofVisit || "N/A"}
                department={visit.department.name || "N/A"}
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
                style={{ cursor: "pointer" }}
              >
                <g clipPath="url(#clip0_6149_7254)">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {new Date(
                  selectedVisit.date
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }) || "N/A"}
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
