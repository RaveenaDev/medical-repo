import { useState, useRef } from "react";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import styles from "./DateSelector.module.scss";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const [internalDate, setInternalDate] = useState(dayjs());
  const inputRef = useRef(null);

  const currentDate = selectedDate || internalDate;

  const handleChange = (e) => {
    const newDate = dayjs(e.target.value);
    setSelectedDate ? setSelectedDate(newDate) : setInternalDate(newDate);
  };

  const openCalendar = () => {
    inputRef.current?.showPicker?.() || inputRef.current?.click();
  };

  return (
    <div className={styles.dateSelector} onClick={openCalendar}>
      <div className={styles.calendarWrapper}>
        <CalendarToday className={styles.calendarIcon} />
        <input
          ref={inputRef}
          type="date"
          value={currentDate.format("YYYY-MM-DD")}
          onChange={handleChange}
        />
      </div>

      <div className={styles.text}>
        <span className={styles.label}>
          {currentDate.isSame(dayjs(), "day") ? "Today" : "Selected Date"}
        </span>
        <span className={styles.date}>{currentDate.format("DD-MM-YYYY")}</span>
      </div>
    </div>
  );
};

export default DateSelector;
