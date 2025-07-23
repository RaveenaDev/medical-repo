import styles from "./AdmitNewPatient.module.scss";
import { ChevronLeft, X } from "lucide-react";
const AdmitNewPatient = ({ onClose }) => {
  const admissionData = [
    {
      name: "Jasmine Kaur",
      age: 49,
      gender: "Female",
      admissionDate: "26 Jan 2025",
      reason: "Surgery Schedule",
      status: "Pending Admission",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Ramchandra Mehta",
      age: 55,
      gender: "Male",
      admissionDate: "25 Jan 2025",
      reason: "Cardiac Evaluation",
      status: "Pending Admission",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      name: "Anjali Deshmukh",
      age: 34,
      gender: "Female",
      admissionDate: "27 Jan 2025",
      reason: "Maternity Check-up",
      status: "Admitted",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Sameer Sheikh",
      age: 60,
      gender: "Male",
      admissionDate: "28 Jan 2025",
      reason: "Orthopedic Surgery",
      status: "Pending Admission",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Pooja Verma",
      age: 41,
      gender: "Female",
      admissionDate: "29 Jan 2025",
      reason: "Routine Check-up",
      status: "Cancelled",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      name: "Vikram Nair",
      age: 37,
      gender: "Male",
      admissionDate: "30 Jan 2025",
      reason: "Neurology Review",
      status: "Admitted",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
      name: "Vikram Nair",
      age: 37,
      gender: "Male",
      admissionDate: "30 Jan 2025",
      reason: "Neurology Review",
      status: "Admitted",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
      name: "Vikram Nair",
      age: 37,
      gender: "Male",
      admissionDate: "30 Jan 2025",
      reason: "Neurology Review",
      status: "Admitted",
      formUrl: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <ChevronLeft
          onClick={onClose}
          strokeWidth={1.65}
          className={styles.leftArrow}
        />{" "}
        <p>Admit New Patient</p>
      </div>

      <div className={styles.admissionList}>
        {admissionData.length > 0 ? (
          admissionData.map((patient, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardLeft}>
                <img src={patient.imageUrl} alt="" />
                <div className={styles.patientDetails}>
                  <p className={styles.name}>{patient.name}</p>

                  <p className={styles.ageNdGender}>
                    {patient.gender}&nbsp;
                    {patient.age} Y
                  </p>
                </div>
              </div>
              <div className={styles.middleLine} />
              <div className={styles.cardRight}>
                <div className={styles.admitDetails}>
                  <p>
                    Admission date: <span>{patient.admissionDate}</span>
                  </p>
                  <p>
                    Reason: <span>{patient.reason}</span>
                  </p>
                  <p>
                    Status: <span>{patient.status}</span>
                  </p>
                </div>
                <div className={styles.btnContainer}>
                  <button className={styles.acceptBtn}>Accept</button>
                  <button className={styles.rejectBtn}>
                    <X className={styles.rejectIcon} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No New Patient</p>
        )}
      </div>
    </div>
  );
};

export default AdmitNewPatient;
