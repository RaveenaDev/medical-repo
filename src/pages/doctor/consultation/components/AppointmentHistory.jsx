import styles from "./AppointmentHistory.module.scss";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAppointmentHistory} from "../../../../components/State/Doctor/Action.js";

const AppointmentHistory = ({ onBack }) => {
  // Dropdown 1: Date Range
  const dateOptions = ["Last 7 days", "Last 30 days", "Last month"];
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAppointmentHistory());
  }, [dispatch]);

  const appointmentHistory = useSelector((store) => store.doctor.appointmentHistory)

  return (
    <div>
      {/* row 1 */}
      <div className={styles.row1}>
        <div className={styles.r1Left}>
          <ChevronLeft
            size={26}
            className={styles.arrowLeftIcon}
            onClick={() => {
              onBack();
            }}
          />
          <p>Appointment History</p>
        </div>
        <div className={styles.r1Right} style={{ display: "flex", gap: "1vw" }}>
          {/* Date Range Dropdown */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDate((prev) => !prev)}
            >
              <p>{selectedDate || "Date range"}</p>
              <span className={styles.arrow}>
                {openDate ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            {openDate && (
              <ul className={styles.menu}>
                {dateOptions.map((option) => (
                  <li
                    key={option}
                    className={`${styles.item} ${
                      selectedDate === option ? styles.active : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(option);
                      setOpenDate(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div>Case Id</div>
          <div>Name</div>
          <div>Appointment With</div>
          <div>Type Visit</div>
          <div>Token</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className={styles.dataContainer}>
          {appointmentHistory.map((item, idx) => (
            <div key={idx} className={styles.row}>
              <div className={styles.blueText}>{item.caseId}</div>
              <div className={styles.blueText}>{item.name}</div>
              <div>+91 {item.phone}</div>
              <div>{item.typeVisit}</div>
              <div>{item.token}</div>
              <div>{item.date}</div>
              <div>
                <button className={styles.viewBtn}>{item.status}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;
