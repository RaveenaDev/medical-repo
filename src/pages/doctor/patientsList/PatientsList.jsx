import "./PatientsListDoctor.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import PatientCard from "./component/modals/PatientCard.jsx";
import { useEffect, useState } from "react";
import AddPatientForm from "./component/form/AddPatientForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  admitPatient,
  getAdmissionRequests,
  getAdmittedPatients,
  getApprovedAdmissions,
} from "../../../components/State/Doctor/Action.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PatientsList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmittedPatients());
    dispatch(getApprovedAdmissions());
    dispatch(getAdmissionRequests());
  }, [dispatch]);

  const patientsAdmitted = useSelector(
    (store) => store.doctor.admittedPatients
  );
  const approvedAdmissions = useSelector(
    (store) => store.doctor.approvedAdmissions
  );
  const admissionRequests = useSelector(
    (store) => store.doctor.admissionRequests
  );
  const admissionRequestsCount = useSelector(
    (store) => store.doctor.admissionRequestsCount
  );

  const [filter, setFilter] = useState("Total");

  const filteredPatients = patientsAdmitted.filter((patient) => {
    if (filter === "Total") return true;
    return patient.admissionStatus === filter;
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
  const [showForm, setShowFormx] = useState(false);

  const handleAddPatientClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleAdmitPatientClick = (patientId) => {
    // console.log(patientId);
    dispatch(admitPatient(patientId));
  };

  // console.log("Addmitted Patiemts", patientsAdmitted);
  // console.log("Admission Requests", admissionRequests);
  const sliderSettings = {
    dots: false,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 4,

    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="patientsListDoctorContainer">
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
          To be admitted:{" "}
          <span className="count">{admissionRequestsCount}</span>
        </div>
        <div className=" toAdmitSliderWrapper">
          <Slider {...sliderSettings}>
            {admissionRequests.map((patient, index) => (
              <div key={index} className="slick-slide-card">
                <div className="patientCard">
                  <div className="card_upper">
                    <div className="patientInfo">
                      <div className="patientDetailsContainer">
                        <img
                          src={
                            patient.avatar ||
                            "https://randomuser.me/api/portraits/women/17.jpg"
                          }
                          alt={`${patient.name} Avatar`}
                          className="patientAvatar"
                        />
                        <div>
                          <h5 className="patientName">
                            {patient.admissionDetails.name}
                          </h5>
                          <p className="patientAge">
                            {patient.admissionDetails.gender || "N/A"}{" "}
                            {patient.admissionDetails.age} Y
                          </p>
                        </div>
                      </div>

                      <div className="patientDetails">
                        <div>
                          Admission date:{" "}
                          <span className="value">
                            {
                              new Date(patient.admissionDetails.date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </span>
                        </div>
                        <div>
                          Reason:{" "}
                          <span className="value">
                            {patient.admissionDetails.medicalNote}
                          </span>
                        </div>
                        <div>
                          Status:{" "}
                          <span className="value">{patient.status}</span>
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
                  <div className="admit_btn_container">
                    {patient.approval?.doctor?.approved &&
                    patient.approval?.admin?.approved ? (
                      <button
                        className="admit_btn"
                        onClick={() => {
                          handleAdmitPatientClick(patient._id);
                        }}
                      >
                        Admit
                      </button>
                    ) : (
                      <div className="approval-status">
                        <div>
                          Doctor:{" "}
                          <span
                            className={
                              patient.approval?.doctor?.approved
                                ? "approved-text"
                                : "pending-text"
                            }
                          >
                            {patient.approval?.doctor?.approved
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>
                        <div>
                          Admin:{" "}
                          <span
                            className={
                              patient.approval?.admin?.approved
                                ? "approved-text"
                                : "pending-text"
                            }
                          >
                            {patient.approval?.admin?.approved
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
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
          {/* <div className="filterButton">
            <FiFilter fill="#25307F" />
            <span>Filter</span>
          </div>   */}
        </div>

        <div className="admittedList">
          {currentPatients.length > 0 ? (
            currentPatients.map((patient, index) => (
              <PatientCard key={index} patient={patient} />
            ))
          ) : (
            <div
              style={{
                paddingLeft: "1rem",
                paddingTop: "1rem",
                color: "#3A3A3A",
                fontStyle: "italic",
              }}
            >
              No patients found
            </div>
          )}
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
      </section>
      {/* Conditionally Render Form */}
      {showForm && <AddPatientForm onClose={handleCloseForm} />}
    </div>
  );
};

export default PatientsList;
