import { useState } from "react";
import CommonPanel from "../components/CommonPanel";
import styles from "./Consultation.module.scss";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import { ClockFading, LibraryBig, Plus } from "lucide-react";
export const Consultation = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <div>
        <CommonPanel />
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
            <button className={styles["appointment-container"]}>
              <ClockFading className={styles["clock-icon"]} size={16} />
              <p>Appointment History</p>
            </button>
            <button className={styles["new-form-container"]}>
              <Plus className={styles["plus-icon"]} size={16} />
              <p>Create New Form</p>
            </button>
          </div>
        </div>
        <div className={styles["header-2"]}>
          <div className={styles["h2-left"]}>
            <p className={styles["pat-num-l"]}>XXXXXXX</p>
            <p className={styles["pat-name-l"]}>Jaismine Kaur</p>
            <p className={styles["pat-status-l"]}>Ongoing</p>
          </div>
          <div className={styles["h2-right"]}>
            <p className={styles["pat-num-r"]}>XXXXXXX</p>
            <p className={styles["pat-name-r"]}>Amit Tripati</p>
            <p className={styles["pat-status-r"]}>Next</p>
          </div>
        </div>
        <div className={styles["left-panel"]}>
          <div className={styles["lp-1"]}>
            <img
              src="https://i.pravatar.cc/30?img=14"
              alt=""
              className={styles["lp-1-avatar"]}
            />
            <div className={styles["lp-1-info"]}>
              <p className={styles["lp-1-name"]}>Jaismine kaur</p>
              <p className={styles["lp-1-role"]}>Follow up Patient</p>
            </div>
          </div>

          {/* <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div> */}
        </div>
      </div>
    </div>
  );
};
