import { useState } from "react";
import styles from "./isFollowUp.module.scss";
import { ChevronDown, ChevronUp, Heading } from "lucide-react";

const IsFollowUp = () => {
  const appointmentsData = [
    {
      drName: "Dr. Smith",
      heading: "Department of Cardiology",
      roomNumber: 101,
      wardNumber: 6,
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      date: "2024-07-01",
    },
    {
      drName: "Dr. Patel",
      heading: "Neurology Department",
      roomNumber: 202,
      wardNumber: 3,
      startTime: "11:30 AM",
      date: "2024-07-01",
      endTime: "12:30 PM",
    },
    {
      drName: "Dr. Khan",
      heading: "Orthopedic Department",
      roomNumber: 305,
      wardNumber: 5,
      startTime: "01:00 PM",
      date: "2024-07-01",
      endTime: "02:00 PM",
    },
    {
      drName: "Dr. Roy",
      heading: "Pediatrics",
      roomNumber: 107,
      wardNumber: 1,
      startTime: "02:30 PM",
      date: "2024-07-01",
      endTime: "03:30 PM",
    },
    {
      drName: "Dr. Mehra",
      heading: "Dermatology",
      roomNumber: 402,
      wardNumber: 7,
      startTime: "04:00 PM",
      date: "2024-07-01",
      endTime: "05:00 PM",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.appointment}>
        <div className={styles.header}>
          <p className={styles.appointmentTitle}>Appointments</p>
        </div>

        <div className={styles.appointmentWrapper}>
          {appointmentsData.length > 0 ? (
            appointmentsData.map((appointmentsData, index) => (
              <div key={index} className={styles.appointmentBox}>
                <div className={styles.row1}>
                  <p className={styles.drName}>{appointmentsData.drName}</p>

                  <p className={styles.time}>
                    {appointmentsData.startTime} to {appointmentsData.endTime}
                  </p>
                </div>
                <div className={styles.row1}>
                  <p className={styles.heading}>{appointmentsData.heading}</p>
                  <p className={styles.date}>{appointmentsData.date}</p>
                </div>

                <p className={styles.room}>
                  Room at {appointmentsData.roomNumber}, ward no.{" "}
                  {appointmentsData.wardNumber}
                </p>
              </div>
            ))
          ) : (
            <div>
              <p>No Appointment For Today</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.carePlan}>
        <div className={styles.titleCR}>
          <p>Care Plan</p>
        </div>
        <div className={styles.contentCR}>
          <div className={styles.contentLeftCR}>
            <div className={styles.contentLeftSectionCR}>
              <h2 className={styles.contentLeftTitle}>1. Medication Plan</h2>
              <ul>
                <li>8:00 AM: Aspirin 75mg, Metoprolol 25mg</li>
                <li>8:00 PM: Atorvastatin 20mg, Enalapril 5mg</li>
              </ul>
            </div>

            <div className={styles.contentLeftSectionCR}>
              {" "}
              <h2 className={styles.contentLeftTitle}>2. Diet Plan</h2>
              <p>
                Breakfast: Oats, fruits, low-fat milk Lunch: Boiled veggies,
                brown rice, curd Snacks: Coconut water, sprouts Dinner: Moong
                dal, chapati, sautéed greens
              </p>
            </div>
            <div className={styles.contentLeftSectionCR}>
              {" "}
              <h2 className={styles.contentLeftTitle}>3. Activity Plan</h2>
              <p>
                Week 1–2: Bed rest, assisted walking <br />
                Week 3–4: 10-minute morning walk <br />
                Week 5+: 30-minute walk, light cardiac rehab
              </p>
            </div>
            <div className={styles.contentLeftSectionCR}>
              {" "}
              <h2 className={styles.contentLeftTitle}>4. Monitoring Plan</h2>
              <p>
                BP: Twice a day Heart Rate: <br /> Morning & Evening Oxygen
                Saturation: <br />
                After activity Blood Tests: <br /> Weekly CBC, Monthly Lipids
                ECG/Echo: <br />
                After 2 weeks, then monthly
              </p>
            </div>
          </div>
          <div className={styles.gap} />
          <div className={styles.contentRightCR}>
            {" "}
            <div className={styles.contentRightSectionCR}>
              <h2 className={styles.contentRightTitle}>Emergency Signs</h2>
              <ul>
                <li>Chest pain or pressure</li>
                <li>breathing difficulty</li>
              </ul>
            </div>
            <div className={styles.contentRightSectionCR}>
              {" "}
              <h2 className={styles.contentRightTitle}>Avoids</h2>
              <p>Salt heavy foods, Fried or Oily items, Red Meat</p>
            </div>
            <div className={styles.followUpSchedule}>
              <h2>Follow-Up Schedule</h2>
              <ul>
                <li>Follow-Up Schedule</li>
                <li>Next OPD: July 10, 2024</li>
                <li>Blood Test Review: July 8, 2024</li>
                <li>Rehab Counseling: July 12, 2024</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsFollowUp;
