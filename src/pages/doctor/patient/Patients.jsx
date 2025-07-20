import CommonPanel from "../components/CommonPanel";
import { FaUserCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Patients.module.scss";
import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AppointmentRequestModal from "../components/appointmentRequests/AppointmentRequest";
import {Box, Button} from "@mui/material";
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

  const location = useLocation();
    const patients = location.state?.patients || [];

  // console.log("Transferred : ",patients)

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

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
      <Box
          component="span"
          sx={{
            ...shapeStyles,
            ...shapeCircleStyles,
            color: "#ffffff",
            marginTop: "2px",
            paddingTop: "2px",
            paddingBottom: "2px",
            fontSize: "15px",
            paddingLeft: "1px",
          }}
      >
          {localStorage.getItem('doctorRequestsCount')}
      </Box>
  );

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <CommonPanel />
      </div>
      <div className={styles.patientsHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <ChevronLeft size={28} strokeWidth={1.7} style={{cursor:'pointer'}} onClick={() => navigate(-1)}/>
            <span className={styles.backText}>Patient List</span>
          </div>
          <div className={styles.headerRight}>
            {/*<button onClick={handleRequestBtn} className={styles.requestButton}>*/}
            {/*  <div className={styles.badgeCircle}>*/}
            {/*    10*/}
            {/*    <span className={styles.notificationDot}></span>*/}
            {/*  </div>*/}
            {/*  <span className={styles.buttonLabel}>Request</span>*/}
            {/*</button>*/}

            <Button
                variant="contained"
                onClick={handleRequestBtn}
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  textTransform: "capitalize",
                  padding: "3px 6px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
            >
              <div
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#F14400",
                    position: "absolute",
                    left: "31px",
                    top: "6px",
                  }}
              ></div>
              {circle}
              <span
                  style={{
                    marginLeft: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
              >
                  Requests
                </span>
            </Button>

            <Button
                variant="contained"
                onClick={handleAppointmentRequests}
                sx={{
                  fontSize: "14px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "6px 6px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
            >
              <div
                  style={{
                    height: "9px",
                    width: "9px",
                    borderRadius: "50%",
                    backgroundColor: "#F14400",
                    position: "absolute",
                    left: "25px",
                    top: "6px",
                  }}
              ></div>
              <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M5.55592 19.5877C6.65384 18.7481 7.88092 18.0861 9.23717 17.6017C10.5934 17.1173 12.0143 16.8752 13.4997 16.8752C14.9851 16.8752 16.4059 17.1173 17.7622 17.6017C19.1184 18.0861 20.3455 18.7481 21.4434 19.5877C22.1969 18.705 22.7835 17.704 23.2033 16.5845C23.6231 15.4651 23.833 14.2703 23.833 13.0002C23.833 10.137 22.8266 7.69895 20.8137 5.6861C18.8009 3.67325 16.3629 2.66683 13.4997 2.66683C10.6365 2.66683 8.19846 3.67325 6.18561 5.6861C4.17277 7.69895 3.16634 10.137 3.16634 13.0002C3.16634 14.2703 3.37624 15.4651 3.79603 16.5845C4.21582 17.704 4.80245 18.705 5.55592 19.5877ZM13.4997 14.2918C12.2295 14.2918 11.1585 13.8559 10.2867 12.984C9.41478 12.1121 8.97884 11.0411 8.97884 9.771C8.97884 8.50086 9.41478 7.42985 10.2867 6.55798C11.1585 5.6861 12.2295 5.25016 13.4997 5.25016C14.7698 5.25016 15.8408 5.6861 16.7127 6.55798C17.5846 7.42985 18.0205 8.50086 18.0205 9.771C18.0205 11.0411 17.5846 12.1121 16.7127 12.984C15.8408 13.8559 14.7698 14.2918 13.4997 14.2918ZM13.4997 25.9168C11.7129 25.9168 10.0337 25.5778 8.46217 24.8996C6.89065 24.2215 5.52363 23.3012 4.36113 22.1387C3.19863 20.9762 2.27832 19.6092 1.6002 18.0377C0.92207 16.4661 0.583008 14.787 0.583008 13.0002C0.583008 11.2134 0.92207 9.53419 1.6002 7.96266C2.27832 6.39113 3.19863 5.02412 4.36113 3.86162C5.52363 2.69912 6.89065 1.77881 8.46217 1.10068C10.0337 0.422559 11.7129 0.0834961 13.4997 0.0834961C15.2865 0.0834961 16.9656 0.422559 18.5372 1.10068C20.1087 1.77881 21.4757 2.69912 22.6382 3.86162C23.8007 5.02412 24.721 6.39113 25.3992 7.96266C26.0773 9.53419 26.4163 11.2134 26.4163 13.0002C26.4163 14.787 26.0773 16.4661 25.3992 18.0377C24.721 19.6092 23.8007 20.9762 22.6382 22.1387C21.4757 23.3012 20.1087 24.2215 18.5372 24.8996C16.9656 25.5778 15.2865 25.9168 13.4997 25.9168Z"
                    fill="#25307F"
                />
              </svg>
              <span
                  style={{
                    marginLeft: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
              >
                  Appointment Requests
                </span>
            </Button>

            {/*<button*/}
            {/*  onClick={handleAppointmentRequests}*/}
            {/*  className={`${styles.appointmentSection} ${styles.boxStyle}`}*/}
            {/*>*/}
            {/*  <FaUserCircle className={styles.userIcon} />*/}
            {/*  <span>Appointment Requests</span>*/}
            {/*</button>*/}
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
            {patients && patients.length > 0 ? (
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
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td className={styles.patientId}>{patient.caseId}</td>
                            <td className={styles.patientInfo}>
                                <div>
                                    <div className={styles.patientName}>{patient.name}</div>
                                    <div className={styles.patientEmail}>{patient.email}</div>
                                </div>
                            </td>
                            <td className={styles.phoneNumber}>{patient.phone}</td>
                            <td className={styles.typeVisit}>{patient.typeVisit}</td>
                            <td className={styles.branch}>{patient.branch}</td>
                            <td className={styles.date}>{truncateText(patient.date, 10)}</td>
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
                                <BsThreeDotsVertical className={styles.menuIcon}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.noDataMessage}>No patients found.</div>
            )}
        </div>

    </>
  );
};

export default Patients;
