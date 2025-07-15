import React from "react";
import "./PatientCard.scss"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();
  return (
    <div
      className="patientCard"
      onClick={() => navigate(`/doctor/patientList/patient-details`,{state: patient._id})}
    >
      <div className="patientInfo">
        <div className="patientHeader">
          <div className="patientDetailsContainer">
            <img
              src='https://randomuser.me/api/portraits/women/12.jpg'
              alt={`${patient.name} Avatar`}
              className="patientAvatar"
            />
            <div>
              <h5 className="patientName">{patient.name}</h5>
              <p className="patientAge">
                {patient.gender} {patient.age} Y
              </p>
            </div>
          </div>
          <div className={`statusDot ${patient.admissionStatus}`}>
            {patient.admissionStatus === "Critical" && <div className="innerCircle" />}
          </div>
        </div>
        <div className="patientCardDetails">
          <div>
            <div> Upcoming Appointments: </div>
            <div className="value">19 Feb 2025</div>
          </div>
          <div>
            <div> Last Data Received: </div>
            <div className="value">24 Jan 2025</div>
          </div>
          <div>
            <div> Major Issue: </div>
            <div className="value">Follow-up-Required</div>
          </div>
        </div>
        <div className="actionButtons">
          <div>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="21" height="21" rx="5" fill="#DAE4FF" />
              <path
                d="M15.3583 16C14.0852 16 12.8273 15.7226 11.5847 15.1677C10.3421 14.6128 9.21157 13.8259 8.19306 12.8069C7.17454 11.788 6.38783 10.6575 5.83294 9.41528C5.27806 8.17309 5.00041 6.91522 5 5.64167C5 5.45833 5.06111 5.30556 5.18333 5.18333C5.30556 5.06111 5.45833 5 5.64167 5H8.11667C8.25926 5 8.38657 5.04848 8.49861 5.14544C8.61065 5.24241 8.67685 5.35689 8.69722 5.48889L9.09444 7.62778C9.11481 7.79074 9.10972 7.92824 9.07917 8.04028C9.04861 8.15231 8.99259 8.24907 8.91111 8.33056L7.42917 9.82778C7.63287 10.2046 7.87467 10.5686 8.15456 10.9198C8.43444 11.271 8.74265 11.6098 9.07917 11.9361C9.39491 12.2519 9.72593 12.5448 10.0722 12.8149C10.4185 13.085 10.7852 13.3319 11.1722 13.5556L12.6083 12.1194C12.7 12.0278 12.8198 11.9591 12.9677 11.9135C13.1156 11.8679 13.2606 11.855 13.4028 11.875L15.5111 12.3028C15.6537 12.3435 15.7708 12.4175 15.8625 12.5246C15.9542 12.6318 16 12.7513 16 12.8833V15.3583C16 15.5417 15.9389 15.6944 15.8167 15.8167C15.6944 15.9389 15.5417 16 15.3583 16Z"
                fill="#333333"
              />
            </svg>
          </div>
          <div>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="21" height="21" rx="5" fill="#DAE4FF" />
              <path
                d="M7.2 11.6H13.8V10.5H7.2V11.6ZM7.2 9.95H13.8V8.85H7.2V9.95ZM7.2 8.3H13.8V7.2H7.2V8.3ZM16 16L13.8 13.8H6.1C5.7975 13.8 5.53863 13.6924 5.3234 13.4771C5.10817 13.2619 5.00037 13.0029 5 12.7V6.1C5 5.7975 5.1078 5.53863 5.3234 5.3234C5.539 5.10817 5.79787 5.00037 6.1 5H14.9C15.2025 5 15.4615 5.1078 15.6771 5.3234C15.8927 5.539 16.0004 5.79787 16 6.1V16ZM6.1 12.7H14.2675L14.9 13.3188V6.1H6.1V12.7Z"
                fill="#1E1E1E"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
