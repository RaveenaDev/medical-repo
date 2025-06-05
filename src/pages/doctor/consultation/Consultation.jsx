import { useState } from "react";
import CommonPanel from "../components/CommonPanel";
import styles from "./Consultation.module.scss";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import { ClockFading, LibraryBig, Plus } from "lucide-react";

import ConsultBody from "./components/ConsultBody";
import AppointmentHistory from "./components/AppointmentHistory";
import PatientNewForm from "./components/PatientNewForm";

export const Consultation = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const [activeView, setActiveView] = useState("consult");

  return (
    <div>
      <div>
        <CommonPanel />

        {/* Header 1 */}
        <div className={styles["header-1"]}>
          <div className={styles["header-left"]}>
            <div className={styles["date-selections"]}>
              <div className={styles.text}>
                <span className={styles.label}>
                  {selectedDate === dayjs().format("YYYY-MM-DD")
                    ? "Today"
                    : "Selected Date"}
                </span>
                <span className={styles.date}>
                  {dayjs(selectedDate).format("DD-MM-YYYY")}
                </span>
              </div>

              <div className={styles["calendar-wrapper"]}>
                <label htmlFor="datePicker">
                  <CalendarToday className={styles["calendar-icon"]} />
                </label>
                <input
                  type="date"
                  id="datePicker"
                  value={selectedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className={styles["from-library"]}>
              <LibraryBig />
              <p>From Library</p>
            </button>
          </div>
          <div className={styles["header-right"]}>
            <button
              className={styles["appointment-container"]}
              onClick={() => setActiveView("appointmentHistory")}
            >
              <ClockFading className={styles["clock-icon"]} size={16} />
              <p>Appointment History</p>
            </button>
            <button
              className={styles["new-form-container"]}
              onClick={() => setActiveView("patientNewForm")}
            >
              <Plus className={styles["plus-icon"]} size={16} />
              <p>Create New Form</p>
            </button>
          </div>
        </div>

        {activeView === "appointmentHistory" && (
          <AppointmentHistory onBack={() => setActiveView("consult")} />
        )}
        {activeView === "patientNewForm" && (
          <PatientNewForm onBack={() => setActiveView("consult")} />
        )}
        {activeView === "consult" && <ConsultBody />}
      </div>
    </div>
  );
};
