import CommonPanel from "../components/CommonPanel";
import { FaUserCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { patientData } from "../../../constants/patientsData";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./InPatient.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../components/appointmentRequests/AppointmentRequest";

const InPatients = () => {
  const sortOptions = ["Newest to Oldest", "Oldest to Newest"];
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest to Oldest");
  const navigate = useNavigate();

  const handleRequestBtn = () => {
    navigate("/doctor/doctor-request");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentRequests = () => {
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };

  const appointmentRequests = [
    {
      _id: "req001",
      patient: {
        name: "John Doe",
      },
      note: "Needs consultation for back pain.",
    },
    {
      _id: "req002",
      patient: {
        name: "Jane Smith",
      },
      note: "Follow-up appointment for diabetes check-up.",
    },
    {
      _id: "req003",
      patient: {
        name: "Alice Johnson",
      },
      note: "Wants to discuss lab report results.",
    },
    {
      _id: "req004",
      patient: {
        name: "Bob Brown",
      },
      note: "First-time appointment for general check-up.",
    },
    {
      _id: "req005",
      patient: {
        name: "Charlie Wilson",
      },
      note: "Consultation regarding skin allergy.",
    },
    {
      _id: "req006",
      patient: {
        name: "Emily Davis",
      },
      note: "Needs a prescription refill for blood pressure medication.",
    },
  ];

  return (
    <>
      <div style={{ position: "relative" }}>
        <CommonPanel />
      </div>
      <div className={styles.patientsHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <ChevronLeft size={28} strokeWidth={1.7} />
            <span className={styles.backText}>Inpatient List</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.requestButton} onClick={handleRequestBtn}>
              <div className={styles.badgeCircle}>
                10
                <span className={styles.notificationDot}></span>
              </div>
              <span className={styles.buttonLabel}>Request</span>
            </button>

            <button
              onClick={handleAppointmentRequests}
              className={`${styles.appointmentSection} ${styles.boxStyle}`}
            >
              <FaUserCircle className={styles.userIcon} />
              <span>Appointment Requests</span>
            </button>
          </div>
        </div>
        <hr />
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            56 <span>Inpatients</span>
          </span>
          <div className={styles.verticalDivider}></div>
          <div className={styles.sortFilterSection}>
            <div className={styles.sortBy}>
              <span>Sort by:</span>
              <div className={styles.dropdown}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenSort((prev) => !prev)}
                >
                  <p>{selectedSort}</p>
                  <span className={styles.arrow}>
                    {openSort ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                {openSort && (
                  <ul className={styles.menu}>
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        className={`${styles.item} ${
                          selectedSort === option ? styles.active : ""
                        }`}
                        onClick={() => {
                          setSelectedSort(option);
                          setOpenSort(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={`${styles.filter} ${styles.boxStyle}`}>
              <FiFilter />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* Modal Component */}
      <AppointmentRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointmentRequests={appointmentRequests}
      >
        <p>This is where appointment requests will appear.</p>
      </AppointmentRequestModal>

      <div className={styles.patientsTableContainer}>
        <table className={styles.patientsTable}>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient</th>
              <th>Bed</th>
              <th>Condition</th>
              <th>Doctor</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index}>
                <td className={styles.patientId}>{patient.id}</td>
                <td className={styles.patientInfo}>
                  <div>
                    <div className={styles.patientName}>{patient.name}</div>
                    <div className={styles.patientEmail}>{patient.email}</div>
                  </div>
                </td>
                <td className={styles.bedNumber}>{patient.bed}</td>
                <td className={styles.condition}>{patient.condition}</td>
                <td className={styles.doctor}>{patient.doctor}</td>
                <td className={styles.status}>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[patient.status.toLowerCase()]
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <BsThreeDotsVertical className={styles.menuIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InPatients;
