import "./PatientsList.scss";
import Searchbar from "../../components/Searchbar/index.jsx";
import Notifications from "../../components/NotificationFunc/Notification.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import PatientCard from "../doctor/patientsList/component/modals/PatientCard.jsx";
import { useState } from "react";
import AddPatientForm from "../doctor/patientsList/component/form/AddPatientForm.jsx";

const IpdOverview = () => {
  const navigate = useNavigate();
  const patients = [
    {
      name: "Jasmine Kaur",
      age: "49",
      gender: "Female",
      admissionDate: "26 Jan 2025",
      reason: "Surgery Schedule",
      status: "Pending Admission",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      name: "Rahul Mehta",
      age: "58",
      gender: "Male",
      admissionDate: "19 Feb 2025",
      reason: "Heart Checkup",
      status: "Pending Admission",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Anjali Sharma",
      age: "32",
      gender: "Female",
      admissionDate: "02 Mar 2025",
      reason: "MRI Scan",
      status: "Pending Admission",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Suresh Rathi",
      age: "67",
      gender: "Male",
      admissionDate: "15 Mar 2025",
      reason: "Diabetes Monitoring",
      status: "Pending Admission",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      name: "Neha Verma",
      age: "41",
      gender: "Female",
      admissionDate: "23 Mar 2025",
      reason: "General Surgery",
      status: "Pending Admission",
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
  ];

  const patientsAdmitted = [
    {
      name: "Alice",
      age: "28",
      gender: "Female",
      "Upcoming Appointments": "19 Feb 2025",
      "Last Data Received": "24 Jan 2025",
      "Major Issue": "Follow-up-Required",
      status: "Critical",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "John",
      age: "45",
      gender: "Male",
      "Upcoming Appointments": "22 Feb 2025",
      "Last Data Received": "20 Jan 2025",
      "Major Issue": "Severe Chest Pain",
      status: "Admitted",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Sophie",
      age: "33",
      gender: "Female",
      "Upcoming Appointments": "25 Feb 2025",
      "Last Data Received": "21 Jan 2025",
      "Major Issue": "Regular Checkup",
      status: "Follow-up",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Raj",
      age: "39",
      gender: "Male",
      "Upcoming Appointments": "27 Feb 2025",
      "Last Data Received": "19 Jan 2025",
      "Major Issue": "Surgery Recovery",
      status: "Critical",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Emily",
      age: "29",
      gender: "Female",
      "Upcoming Appointments": "20 Feb 2025",
      "Last Data Received": "18 Jan 2025",
      "Major Issue": "Post-natal Check",
      status: "Admitted",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Karan",
      age: "50",
      gender: "Male",
      "Upcoming Appointments": "28 Feb 2025",
      "Last Data Received": "22 Jan 2025",
      "Major Issue": "Diabetes Management",
      status: "Follow-up",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Tina",
      age: "31",
      gender: "Female",
      "Upcoming Appointments": "21 Feb 2025",
      "Last Data Received": "17 Jan 2025",
      "Major Issue": "Blood Pressure",
      status: "Admitted",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  const [filter, setFilter] = useState("Total");

  const filteredPatients = patientsAdmitted.filter((patient) => {
    if (filter === "Total") return true;
    return patient.status === filter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;

  // Calculate the current page's patients
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  // Total pages
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // FORM
  const [showForm, setShowForm] = useState(false);

  const handleAddPatientClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="patientsListContainer">
      <div className="listHeader">
        <Searchbar />
        <Notifications />
      </div>

      <div className="greeting">
        <h4 className="heading">Good Morning, Dr. Amit Patil</h4>
        <p>
          I hope you are in good mood because there are 45 patients waiting for
          you.
        </p>
      </div>

      <div className="listHeading">
        <div className="headingContainer">
          <ChevronLeft
            size={25}
            strokeWidth={1.7}
            onClick={() => {
              navigate("/doctor");
            }}
          />

          <div className="heading">Patients List</div>
        </div>
        <div className="buttonsContainer">
          <div className="filterButton">
            <FiFilter fill="#25307F" />
            <span>Filter</span>
          </div>
          <div className="addButton" onClick={handleAddPatientClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="#D9D9D9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 18V10H0V8H8V0H10V8H18V10H10V18H8Z" fill="#D9D9D9" />
            </svg>
            ADD PATIENT
          </div>
        </div>
      </div>

      <section className="toAdmit">
        <div className="description">
          To be admitted: <span className="count">{patients.length}</span>
        </div>
        <div className="toAdmitList">
          {patients.slice(0, 4).map((patient, index) => (
            <div className="patientCard" key={index}>
              <div className="patientInfo">
                <div className="patientDetailsContainer">
                  <img
                    src={patient.avatar}
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

                <div className="patientDetails">
                  <div>
                    Admission date:{" "}
                    <span className="value">{patient.admissionDate}</span>
                  </div>
                  <div>
                    Reason: <span className="value">{patient.reason}</span>
                  </div>
                  <div>
                    Status: <span className="value">{patient.status}</span>
                  </div>
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
          ))}
        </div>
      </section>
      <section className="admittedPatients">
        <div className="admittedHeader">
          {["Total", "Critical", "Admitted", "Follow-Up"].map((item) => (
            <div
              key={item}
              className={`headerItem ${item} ${
                filter === item ? "active" : ""
              }`}
              onClick={() => setFilter(item)}
              style={{ cursor: "pointer" }}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="admittedList">
          {currentPatients.map((patient, index) => (
            <PatientCard key={index} patient={patient} />
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* Conditionally Render Form */}
        {showForm && <AddPatientForm onClose={handleCloseForm} />}
      </section>
    </div>
  );
};

export default IpdOverview;
