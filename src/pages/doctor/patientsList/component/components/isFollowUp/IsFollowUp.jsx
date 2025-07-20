import { useState } from "react";
import styles from "./isFollowUp.module.scss";
import { ChevronDown, ChevronUp } from "lucide-react";

const IsFollowUp = () => {
  const getWeekDates = (startDate = new Date()) => {
    const week = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      week.push(current);
    }
    return week;
  };

  const appointmentsData = {
    "2024-07-10": "Next OPD: July 10, 2024",
    "2024-07-08": "Blood Test Review: July 8, 2024",
    "2024-07-12": "Rehab Counseling: July 12, 2024",
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDates = getWeekDates(selectedDate);
  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const appointment = appointmentsData[selectedDateStr];

  const selectedBed1 = ["option 1", "option 2", "optioon 3"];
  const [openSelectedBed1, setOpenSelectedBed1] = useState(false);
  const [selectedSelectedBed1, setSelectedSelectedBed1] = useState("");
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={styles.container}>
      <div className={styles.appointment}>
        <div className={styles.header}>
          <p className={styles.appointmentTitle}>Appointments</p>
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenSelectedBed1((prev) => !prev)}
            >
              <p>{selectedSelectedBed1 || "Select"}</p>
              <span className={styles.arrow}>
                {openSelectedBed1 ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            {openSelectedBed1 && (
              <ul className={styles.menu}>
                {selectedBed1.map((option) => (
                  <li
                    key={option}
                    className={`${styles.item} ${
                      selectedSelectedBed1 === option ? styles.active : ""
                    }`}
                    onClick={() => {
                      setSelectedSelectedBed1(option);
                      setOpenSelectedBed1(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.weekRow}>
          {weekDates.map((date, idx) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={idx}
                onClick={() => handleDateClick(date)}
                className={`${styles.dayBox} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                <div className={styles.dateNum}>
                  {String(date.getDate()).padStart(2, "0")}
                </div>
                <div className={styles.dayName}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.appointmentBox}>
          {appointment ? <p>{appointment}</p> : <p>No Appointment For Today</p>}
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
