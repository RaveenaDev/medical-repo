import CommonPanel from "../components/CommonPanel";
import { FaUserCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Patients.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../components/appointmentRequests/AppointmentRequest";
const Patients = () => {
  const patientData = [
    {
      id: "XXXXXXX",
      name: "Jatindra kaur",
      email: "jatindra@gmail.com",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
      bed: "C-108",
      condition: "Valve Repair",
      doctor: "Dr. Patel",
      status: "Critical",
    },
    {
      id: "XXXXXXX",
      name: "Amit Tripathi",
      email: "amittripathi@gmail.com",
      bed: "C-109",
      condition: "Heart Failure",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Inactive",
    },
    {
      id: "XXXXXXX",
      name: "Arvind Sharma",
      email: "arvind.sharma@gmail.com",
      bed: "C-108",
      condition: "Arrhythmia",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
    },
    {
      id: "XXXXXXX",
      name: "Kumari Sneha",
      email: "kumari.sneha@gmail.com",
      bed: "D-108",
      condition: "Angioplasty",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Inactive",
    },
    {
      id: "XXXXXXX",
      name: "Aditya Soni",
      email: "aditya.soni@gmail.com",
      bed: "C-108",
      condition: "Stent Replacement",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
    },
    {
      id: "XXXXXXX",
      name: "Khushi Saini",
      email: "khushi.saini@gmail.com",
      bed: "C-108",
      condition: "Angioplasty",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
    },
    {
      id: "XXXXXXX",
      name: "Yash Sharma",
      email: "yash.sharma@gmail.com",
      bed: "C-108",
      condition: "Heart Failure",
      doctor: "Dr. Patel",
      status: "Critical",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
    },
    {
      id: "XXXXXXX",
      name: "Ayush Trivedi",
      email: "ayush.trivedi@gmail.com",
      bed: "C-108",
      condition: "Valve Repair",
      doctor: "Dr. Patel",
      status: "Stable",
      phoneNo: "1234567890",
      typeVisit: "Walk in",
      branch: "Cardiology",
      date: "08-1-2025",
      booking: "Active",
    },
  ];

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
            <span className={styles.backText}>Patient List</span>
          </div>
          <div className={styles.headerRight}>
            <button onClick={handleRequestBtn} className={styles.requestButton}>
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
            56 <span>Patients</span>
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
              <FiFilter fill="#25307f" />
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
              <th>Case ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Type Visit</th>
              <th>Branch</th>
              <th>Date</th>
              <th>Booking</th>
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
                <td className={styles.phoneNumber}>{patient.phoneNo}</td>
                <td className={styles.typeVisit}>{patient.typeVisit}</td>
                <td className={styles.branch}>{patient.branch}</td>
                <td className={styles.date}>{patient.date}</td>
                <td className={styles.booking}>
                  <span
                    className={` ${styles.bookingBadge} ${
                      patient.booking.toLowerCase() === "active"
                        ? styles.activeBooking
                        : styles.inactiveBooking
                    }`}
                  >
                    {patient.booking}
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

export default Patients;
