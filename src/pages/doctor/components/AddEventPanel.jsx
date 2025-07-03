import { useRef, useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { CalendarToday } from "@mui/icons-material";
import "./AddEventPanel.scss";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Select from "react-select";
import {useDispatch} from "react-redux";
import {createNewEvent} from "../../../components/State/Doctor/Action.js";
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
      cursor: "pointer",
      backgroundColor: "#f9faff",
      width: "96%",
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
      width: "96%",
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

  const [inputName, setInputName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    allDay: false,
    startTime: "",
    endTime: "",
    participants: [],
    eventType: "",
    labelTag: "",
    note: "",
  });

  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  const panelRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (tag) => {
    setFormData({ ...formData, labelTag: tag });
  };

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startTime || !formData.endTime) {
      alert("Please select both start and end times");
      return;
    }

    const finalParticipants = inputName.trim()
        ? [...formData.participants, { name: inputName.trim() }]
        : formData.participants;

    const finalForm = {
      ...formData,
      participants: finalParticipants,
    };

    // console.log("Form : ",finalForm)
    dispatch(createNewEvent(finalForm,onClose))
  }

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
      <form  onSubmit={handleSubmit}>
        <div className="panel-form">
          <div className="event-title">
            <label>Event Title</label>
            <input
                type="text"
                placeholder="Enter Event"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="date-selection">
            <div className="today-row">
              <div className="text">
                <span className="label">
                  {formData.date === dayjs().format("YYYY-MM-DD")
                      ? "Today"
                      : "Selected Date"}
                </span>
                <span className="date">
                  {dayjs(formData.date).format("DD-MM-YYYY")}
                </span>
              </div>

              <div className="calendar-wrapper-in">
                <label htmlFor="datePicker">
                  <CalendarToday className="calendar-icon" />
                </label>
                <input
                    type="date"
                    id="datePicker"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({...formData, date: e.target.value})
                    }
                />
              </div>
            </div>

            <div className="allday-row">
              <label className="toggle-switch">
                <input
                    type="checkbox"
                    id="allday"
                    checked={formData.allDay}
                    onChange={(e) =>
                        setFormData({...formData, allDay: e.target.checked})
                    }
                />
                <span className="slider"></span>
              </label>
              <label htmlFor="allday">All day event</label>
            </div>
          </div>

          <div className="time">
            <label htmlFor="timePicker">Time</label>
            <div className="time-selection">
              <div className="time-picker-container">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="time-picker"
                >
                  <p className="time-label-from">From:</p>
                  <TimePicker
                    className="time-picker-1"
                    label=""
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setFormData({
                        ...formData,
                        startTime: newValue?.format("hh:mm A") || "",
                      });
                    }}
                    slots={{
                      openPickerIcon: () => null, // removes the clock icon
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          height: "45px", // overall height
                          "& .MuiInputBase-root": {
                            height: "45px", // input container
                            width: "180px",
                          },
                          "& input": {
                            padding: "10px 12px", // input padding
                          },
                        },
                        variant: "outlined",
                        inputProps: {
                          placeholder: "Start time", // ✅ your placeholder here
                        },
                      },
                    }}
                    open={false}
                  />
                  <p className="time-label-to">To:</p>
                  <TimePicker
                    className="time-picker-2"
                    label=""
                    value={value2}
                    onChange={(newValue) => {
                      setValue2(newValue);
                      setFormData({
                        ...formData,
                        endTime: newValue?.format("hh:mm A") || "",
                      });
                    }}
                    slots={{
                      openPickerIcon: () => null, // removes the clock icon
                    }}
                    slotProps={{
                      textField: {
                        sx: {
                          height: "45px", // overall height
                          "& .MuiInputBase-root": {
                            height: "45px", // input container
                            width: "180px",
                          },
                          "& input": {
                            padding: "10px 12px", // input padding
                          },
                        },
                        inputProps: {
                          placeholder: "End time", // ✅ your placeholder here
                        },
                      },
                    }}
                    open={false}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="patient-name">
            <label>Participants Name</label>
            <input
                type="text"
                placeholder="Enter name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputName.trim()) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: [...prev.participants, {name: inputName.trim()}],
                    }));
                    setInputName(""); // Clear the input field
                  }
                }}
            />
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
                  onChange={(option) =>
                      setFormData({ ...formData, eventType: option.value })
                  }
              />
            </div>
          </div>
          <div className="note">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              placeholder="Enter additional Note"
              rows="6"
              value={formData.note}
              onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
              }
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
                  className={`tag-btn ${tag.toLowerCase()} ${
                      formData.labelTag === tag ? "active" : ""
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
          <button type="submit" className="btn-save">Save Event</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPanel;
