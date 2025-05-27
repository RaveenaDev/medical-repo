import { useRef, useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { CalendarToday } from "@mui/icons-material";
import "./AddEventPanel.scss";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Select from "react-select";
const AddEventPanel = ({ onClose }) => {
  const eventOptions = [
    { value: "Appointment", label: "Appointment" },
    { value: "Task", label: "Task" },
    { value: "Meeting", label: "Meeting" },
    { value: "Call", label: "Call" },
    { value: "Note", label: "Note" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      color: "black",
      fontFamily: "Karla, sans-serif",
      borderColor: "#7279ad",
      boxShadow: "none",
      backgroundColor: "#f9faff",
      width: "40%",
      "&:hover": {
        borderColor: "#7279ad",
      },
    }),
    indicatorSeparator: () => ({
      display: "none", //
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      width: "40%",
      borderRadius: "2px 2px 0 0",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    option: (base, state) => ({
      ...base,

      fontFamily: "Karla, sans-serif",
      fontWeight: "350",
      backgroundColor: state.isFocused ? "#dae4ff" : "#f9faff",

      color: "#000",
      padding: "8px 15px",
      borderRadius: state.data.value === "Appointment" ? "2px 2px 0 0" : "0",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Karla, sans-serif",
      color: "#000",
      fontWeight: "350",
    }),
  };

  const panelRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const handleSelect = (tag) => {
    setSelectedTag(tag);
  };

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={panelRef} className={`add-event-panel slide-in`}>
      {/* Header */}
      <div className="panel-header">
        <div className="cross-icon">
          <button className="x-button" onClick={onClose}>
            <X size={15} />
          </button>
        </div>
        <div className="panel-header-left">
          <Plus size={24} />
          <p>Add New Event</p>
        </div>
      </div>

      <hr />

      {/* Form */}
      <form>
        <div className="panel-form">
          <div className="event-title">
            <label>Event Title</label>
            <input type="text" placeholder="Enter Event" />
          </div>

          <div className="today-row">
            <div className="text">
              <span className="label">
                {selectedDate === dayjs().format("YYYY-MM-DD")
                  ? "Today"
                  : "Selected Date"}
              </span>
              <span className="date">
                {dayjs(selectedDate).format("DD-MM-YYYY")}
              </span>
            </div>

            <div className="calendar-wrapper-in">
              <label htmlFor="datePicker">
                <CalendarToday className="calendar-icon" />
              </label>
              <input
                type="date"
                id="datePicker"
                value={selectedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="allday-row">
            <label className="toggle-switch">
              <input type="checkbox" id="allday" />
              <span className="slider"></span>
            </label>
            <label htmlFor="allday">All day event</label>
          </div>
          <div className="patient-name">
            <label>Patient Name</label>
            <input type="text" placeholder="Enter Patient Name" />
          </div>
          <div className="dropdown-wrapper">
            <div className={`select-container ${isFocused ? "focused" : ""}`}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Type of event"
                options={eventOptions}
                styles={customStyles}
                isSearchable={false}
                onMenuOpen={() => setIsFocused(true)}
                onMenuClose={() => setIsFocused(false)}
              />
            </div>
          </div>
          <div className="note">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              placeholder="Enter additional Note"
              rows="6"
            ></textarea>
          </div>

          <div className="label-tags">
            <span>Label Tags</span>
            <div className="tags-row">
              <div className="tag-label">
                <p>Priority:</p>
              </div>
              {["High", "Medium", "Low"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-btn ${tag.toLowerCase().replace("-", "")} ${
                    selectedTag === tag ? "active" : ""
                  }`}
                  onClick={() => handleSelect(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save">Save Event</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPanel;
