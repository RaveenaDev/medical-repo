import React, { useState, useEffect } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import ayu from "../../receptionist/patients/patients.module.scss";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "./Calender.scss";
import AddEventPanel from "../components/AddEventPanel.jsx";
import dayjs from "dayjs";

const Calender = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [week, setWeek] = useState([]);

  const handleOpenPanel = () => setIsPanelOpen(true);
  const handleClosePanel = () => setIsPanelOpen(false);

  const handlePrevMonth = () => {
    const updated = currentMonth.subtract(1, "month");
    setCurrentMonth(updated);
    updateWeek(updated);
  };

  const handleNextMonth = () => {
    const updated = currentMonth.add(1, "month");
    setCurrentMonth(updated);
    updateWeek(updated);
  };

  const updateWeek = (date) => {
    const startDay = date.startOf("day");
    const days = Array.from({ length: 7 }, (_, i) => startDay.add(i, "day"));
    setWeek(days);
  };

  useEffect(() => {
    updateWeek(currentMonth);
  }, []);

  const hours = [
    "9:00AM",
    "9:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
    "1:00PM",
    "1:30PM",
    "2:00PM",
    "2:30PM",
  ];

  return (
    <>
      <div style={{ position: "relative" }}>
        <CommonPanel />

        <div>
          <div className="header">
            <div className="title">
              <div className="chevron-icon">
                <ChevronLeft />
              </div>
              <p>Calendar</p>
            </div>
            <button onClick={handleOpenPanel}>
              <Plus /> Add New Event
            </button>
          </div>
        </div>

        {isPanelOpen && <AddEventPanel onClose={handleClosePanel} />}
      </div>

      {/* Month Selection */}
      <div className="month-selection-container">
        <div className="month-selection">
          <button onClick={handlePrevMonth}>
            <ChevronLeft className="btn" size={20} />
          </button>
          <div>{currentMonth.format("MMMM YYYY")}</div>
          <button onClick={handleNextMonth}>
            <ChevronRight className="btn" size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-wrapper">
        <div className="calendar-header">
          {week.map((day) => (
            <div className="calendar-day" key={day.format()}>
              <div>{day.format("dddd")}</div>
              <div>{day.format("DD.MM.YY")}</div>
            </div>
          ))}
        </div>

        <div className="calendar-body">
          <div className="calendar-times">
            {hours.map((hour) => (
              <div key={hour} className="time-slot">
                <p>{hour}</p>
              </div>
            ))}
          </div>

          <div className="calendar-columns">
            {week.map((day) => (
              <div className="calendar-column" key={day.format()}>
                {/* Events would be mapped here dynamically */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
