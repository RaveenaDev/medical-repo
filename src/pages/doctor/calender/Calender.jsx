import { useState, useEffect } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import { ChevronLeft, ChevronRight, Plus, ChevronDown } from "lucide-react";
import "./Calender.scss";
import AddEventPanel from "../components/AddEventPanel.jsx";
import dayjs from "dayjs";
import Select from "react-select";
import EventDetails from "../components/EventDetails.jsx";

const Calender = () => {
  const dummyEvents = [
    {
      id: 1,
      title: "Meeting Title",
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(9).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=1",
      name: "Raj Vishwakarma",
    },
    {
      id: 2,
      title: "Follow-up",
      startTime: dayjs().add(-1, "day").hour(10).minute(0),
      endTime: dayjs().add(-1, "day").hour(10).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=2",
      name: "Aditi Sharma",
    },
    {
      id: 3,
      title: "Consultation",
      startTime: dayjs().add(0, "day").hour(18).minute(30),
      endTime: dayjs().add(0, "day").hour(19).minute(15),
      profileUrl: "https://i.pravatar.cc/30?img=3",
      name: "Rahul Verma",
    },
    {
      id: 4,
      title: "Meeting Title",
      startTime: dayjs().add(3, "day").hour(9).minute(0),
      endTime: dayjs().add(3, "day").hour(9).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=7",
      name: "Raj Vishwakarma",
    },
    {
      id: 5,
      title: "Meeting Title",
      startTime: dayjs().hour(22).minute(0),
      endTime: dayjs().hour(22).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=8",
      name: "Raj Vishwakarma",
    },
  ];

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [week, setWeek] = useState([]);
  const [currentTimeTop, setCurrentTimeTop] = useState("0px");
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[dayjs().month()]
  );
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const slotHeight = 160;

  const handleOpenPanel = () => setIsPanelOpen(true);
  const handleClosePanel = () => setIsPanelOpen(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "#e0e0e0",
      borderRadius: "8px",
      paddingLeft: "20px",
      backgroundColor: "#fff",
      fontSize: "14px",
      fontWeight: 500,
      color: "#333",
      fontFamily: "Inter, sans-serif",
      width: "150px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      width: "150px",
      borderRadius: "8px",
      marginTop: "4px",
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      backgroundColor: state.isFocused ? "#f3f4f8" : "#fff",
      color: "#000",
      padding: "10px",
      cursor: "pointer",
      fontSize: "13px",
    }),
    dropdownIndicator: () => ({ display: "none" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  useEffect(() => {
    document.body.style.overflow =
      isPanelOpen || selectedEvent ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen, selectedEvent]);

  const handleMonthChange = (selected) => {
    setSelectedMonth(selected);
    setIsMonthOpen(false);
    const idx = monthOptions.findIndex((m) => m.value === selected.value);
    setCurrentDate(currentDate.month(idx).startOf("month"));
  };

  const updateWeek = (referenceDay) => {
    const start = referenceDay.startOf("day");
    setWeek(Array.from({ length: 7 }, (_, i) => start.add(i, "day")));
  };
  useEffect(() => {
    updateWeek(currentDate);
  }, [currentDate]);

  const hours = Array.from({ length: 28 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return dayjs().hour(hour).minute(minute).format("h:mm A");
  });

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = dayjs();
      const startHour = 9;
      const totalMins = 14 * 60; // 9→23h
      const calendarH = slotHeight * 28;
      const minsFrom9 = now.diff(
        now.startOf("day").add(startHour, "hour"),
        "minute"
      );
      const clamped = Math.max(0, Math.min(minsFrom9, totalMins));
      const px = (clamped / totalMins) * calendarH;
      setCurrentTimeTop(`${px}px`);
    };
    updateCurrentTime();
    const iv = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(iv);
  }, []);

  const getTop = (startTime) => {
    const minsFrom9 = startTime.diff(
      startTime.startOf("day").add(9, "hour"),
      "minute"
    );
    return (minsFrom9 / 30) * slotHeight;
  };
  const getHeight = (startTime, endTime) => {
    const dur = endTime.diff(startTime, "minute");
    return (dur / 30) * slotHeight;
  };

  const getColorById = (id) => {
    const map = [
      {
        bg: "#f4f7ff",
        border: "#9ca8dc",
        activeBg: "#dbe8ff",
        activeBorder: "#1a2a85",
      },
      {
        bg: "#faf5f9",
        border: "#e5b5b8",
        activeBg: "#f8d4db",
        activeBorder: "#d81b60",
      },
      {
        bg: "#e9f0ec",
        border: "#69bd85",
        activeBg: "#cce9d8",
        activeBorder: "#2e7d32",
      },
    ];
    return map[id % map.length];
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <CommonPanel />
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
        {isPanelOpen && <div className="backdrop-overlay" />}
        {isPanelOpen && <AddEventPanel onClose={handleClosePanel} />}
      </div>

      <div className="month-selection-container">
        <div className="week-selection">
          <button onClick={() => setCurrentDate((c) => c.subtract(7, "day"))}>
            <ChevronLeft className="btn" size={20} />
          </button>
          <div>{currentDate.format("MMMM YYYY")}</div>
          <button onClick={() => setCurrentDate((c) => c.add(7, "day"))}>
            <ChevronRight className="btn" size={20} />
          </button>
        </div>
        <div className="month-selection">
          <Select
            options={monthOptions}
            value={selectedMonth}
            onChange={handleMonthChange}
            styles={customStyles}
            isSearchable={false}
            onMenuOpen={() => setIsMonthOpen(true)}
            onMenuClose={() => setIsMonthOpen(false)}
            components={{
              DropdownIndicator: () => (
                <ChevronDown
                  size={22}
                  className={`chevron-icon ${isMonthOpen ? "rotate" : ""}`}
                />
              ),
            }}
          />
        </div>
      </div>

      <div className="calendar-wrapper">
        <div className="calendar-header">
          {week.map((day) => (
            <div className="calendar-day" key={day.format()}>
              <div>{day.format("dddd")}</div>
              <div>{day.format("DD.MM.YY")}</div>
            </div>
          ))}
        </div>
        <div className="calendar-cols">
          <div className="calendar-body">
            <div className="calendar-times">
              {hours.map((h) => (
                <div key={h} className="time-slot">
                  <p>{h}</p>
                </div>
              ))}
            </div>
            <div className="calendar-columns-wrapper">
              <div
                className="current-time-line"
                style={{ top: currentTimeTop }}
              >
                <span className="time-label">{dayjs().format("h:mm A")}</span>
                <div className="dot" />
              </div>
              <div className="calendar-columns">
                {week.map((day) => (
                  <div className="calendar-column" key={day.format()}>
                    {dummyEvents
                      .filter(
                        (ev) =>
                          ev.startTime.format("DD-MM-YYYY") ===
                          day.format("DD-MM-YYYY")
                      )
                      .map((event) => {
                        const color = getColorById(event.id);
                        const now = dayjs();
                        const isPast = now.isAfter(event.endTime);
                        const isActive =
                          !isPast &&
                          now.isAfter(event.startTime) &&
                          now.isBefore(event.endTime);
                        const isHovered = hoveredEventId === event.id;

                        const backgroundColor = isPast
                          ? "#f0f0f0"
                          : isActive
                          ? color.activeBg
                          : isHovered
                          ? color.border
                          : color.bg;
                        const borderColor = isPast
                          ? "#cccccc"
                          : isActive
                          ? color.activeBorder
                          : color.border;

                        return (
                          <div
                            key={event.id}
                            className="calendar-event"
                            onMouseEnter={() => setHoveredEventId(event.id)}
                            onMouseLeave={() => setHoveredEventId(null)}
                            onClick={() => setSelectedEvent(event)}
                            style={{
                              top: `${getTop(event.startTime)}px`,
                              height: `${
                                getHeight(event.startTime, event.endTime) * 0.98
                              }px`,
                              backgroundColor,
                              border: `1.5px solid ${borderColor}`,
                              color: "#000",
                              position: "absolute",
                              borderRadius: "15px",
                              padding: "8px",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            <div>
                              <p className="event-title">{event.title}</p>
                              <p className="event-time">
                                {event.startTime.format("h:mm A")} -{" "}
                                {event.endTime.format("h:mm A")}
                              </p>
                            </div>
                            <div className="event-user">
                              <img src={event.profileUrl} alt={event.name} />
                              <p className="user-name">{event.name}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
              {selectedEvent && (
                <>
                  <div className="backdrop-overlay" />
                  <EventDetails
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
