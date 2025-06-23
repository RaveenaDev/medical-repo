import React from "react";
import "./PatientPreviousRecord.scss"; // Assuming you have a CSS file for styling
import VisitRecords from "./visitRecord/visitRecords";
import VisitCard from "./VisitCard/VisitCard";

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
              />
            ))}
          </div>
        </section>
        <section className="patient-records">
          <div className="record-date">15 May - 18 May 2025</div>
          <div>
            <VisitRecords />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientPreviousRecord;
