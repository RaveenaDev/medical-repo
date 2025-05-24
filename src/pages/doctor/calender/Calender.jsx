import { useState, useEffect } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "./Calender.scss";
import AddEventPanel from "../components/AddEventPanel.jsx";
import dayjs from "dayjs";
import EventDetails from "../components/EventDetails.jsx";

const Calender = () => {
  const dummyEvents = [
    {
      id: 1,
      title: "Meeting Title",
      startTime: dayjs().hour(9).minute(0), // today 9:00 AM
      endTime: dayjs().hour(9).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=1",
      name: "Raj Vishwakarma",
    },
    {
      id: 2,
      title: "Follow-up",
      startTime: dayjs().add(1, "day").hour(10).minute(0), // tomorrow 10 AM
      endTime: dayjs().add(1, "day").hour(10).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=2",
      name: "Aditi Sharma",
    },
    {
      id: 3,
      title: "Consultation",
      startTime: dayjs().add(2, "day").hour(11).minute(30),
      endTime: dayjs().add(2, "day").hour(12).minute(30),
      profileUrl: "https://i.pravatar.cc/30?img=3",
      name: "Rahul Verma",
    },
  ];

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [week, setWeek] = useState([]);
  const [currentTimeTop, setCurrentTimeTop] = useState("0px");
  const [hoveredEventId, setHoveredEventId] = useState(null);

  const handleOpenPanel = () => setIsPanelOpen(true);
  const handleClosePanel = () => setIsPanelOpen(false);

  useEffect(() => {
    if (isPanelOpen || selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen, selectedEvent]);

  const handlePrevWeek = () => {
    const updated = currentDate.subtract(7, "day");
    setCurrentDate(updated);
  };

  const handleNextWeek = () => {
    const updated = currentDate.add(7, "day");
    setCurrentDate(updated);
  };

  const updateWeek = (referenceDay) => {
    const today = referenceDay.startOf("day");
    const days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));
    setWeek(days);
  };

  useEffect(() => {
    updateWeek(currentDate);
  }, [currentDate]);

  const hours = Array.from({ length: 28 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return dayjs().hour(hour).minute(minute).format("h:mm A");
  });
  let slotHeight = 160;
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = dayjs();
      const startHour = 9;
      const totalMinutes = 14 * 60;
      const slotHeight = 160;
      const visualOffset = 0;

      const calendarHeight = slotHeight * 28;

      const minutesFromStart = now.diff(
        now.startOf("day").add(startHour, "hour"),
        "minute"
      );
      const clamped = Math.max(0, Math.min(minutesFromStart, totalMinutes));
      const topPx = (clamped / totalMinutes) * calendarHeight + visualOffset;

      setCurrentTimeTop(`${topPx}px`);
      console.log("topPx", topPx);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTop = (startTime) => {
    const minutesFromStart = startTime.diff(
      startTime.startOf("day").add(9, "hour"),
      "minute"
    );
    return (minutesFromStart / 30) * slotHeight;
  };

  const getHeight = (startTime, endTime) => {
    const duration = endTime.diff(startTime, "minute");
    return (duration / 30) * slotHeight;
  };

  const getColorById = (id) => {
    const colorMap = [
      { bg: "#f4f7ff", border: "#9ca8dc" },
      { bg: "#faf5f9", border: "#e5b5b8" },
      { bg: "#e9f0ec", border: "#69bd85" },
    ];
    return colorMap[id % colorMap.length];
  };

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen]);

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

      {/* Month & Week Navigation */}
      <div className="month-selection-container">
        <div className="month-selection">
          <button onClick={handlePrevWeek}>
            <ChevronLeft className="btn" size={20} />
          </button>
          <div>{currentDate.format("MMMM YYYY")}</div>
          <button onClick={handleNextWeek}>
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
          {/* Left Time Column */}
          <div className="calendar-times">
            {hours.map((hour) => (
              <div key={hour} className="time-slot">
                <p>{hour}</p>
              </div>
            ))}
          </div>

          {/* Columns & Current Time */}
          <div className="calendar-columns-wrapper">
            <div className="current-time-line" style={{ top: currentTimeTop }}>
              <span className="time-label">{dayjs().format("h:mm A")}</span>
              <div className="dot" />
            </div>

            <div className="calendar-columns">
              {week.map((day) => (
                <div className="calendar-column" key={day.format()}>
                  {dummyEvents
                    .filter(
                      (event) =>
                        event.startTime.format("DD-MM-YYYY") ===
                        day.format("DD-MM-YYYY")
                    )
                    .map((event) => {
                      const color = getColorById(event.id);
                      const isHovered = hoveredEventId === event.id;
                      const backgroundColor = isHovered
                        ? color.border
                        : color.bg;

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
                              getHeight(event.startTime, event.endTime) * 0.7
                            }px`,
                            backgroundColor,
                            border: `1.5px solid ${color.border}`,
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
                            <img src={event.profileUrl} alt="user" />
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
    </>
  );
};

export default Calender;
