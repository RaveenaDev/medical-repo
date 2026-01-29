import { useState, useRef } from "react";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import shreyStyles from "../components/CommonPanel.module.scss";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const [internalDate, setInternalDate] = useState(dayjs());
  const inputRef = useRef(null);

  const currentDate = selectedDate || internalDate;

  const handleChange = (e) => {
    const newDate = dayjs(e.target.value);
    setSelectedDate ? setSelectedDate(newDate) : setInternalDate(newDate);
  };

  const openCalendar = () => {
    //  This is the key
    inputRef.current?.showPicker?.() || inputRef.current?.click();
  };

  return (
    <div
      className={shreyStyles.todayRow}
      style={{
        width: "75%",
      }}
      onClick={openCalendar} //  whole row opens calendar
    >
      <div className={shreyStyles.calendarWrapperIn}>
        <CalendarToday className={shreyStyles.calendarIcon} />
        <input
          ref={inputRef}
          type="date"
          value={currentDate.format("YYYY-MM-DD")}
          onChange={handleChange}
          //  visually hidden but still functional
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>
      <div className={shreyStyles.text}>
        <span className={shreyStyles.label}>
          {currentDate.isSame(dayjs(), "day") ? "Today" : "Selected Date"}
        </span>
        <span className={shreyStyles.date}>
          {currentDate.format("DD-MM-YYYY")}
        </span>
      </div>
    </div>
  );
};

export default DateSelector;
