import React, { useState } from "react";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookAppointment.scss";
import arrowBack from "../../../../assets/arrow_back.svg";

const BookAppointment = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    appointmentType: "",
    branchType: "",
    doctor: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderRequiredLabel = (label) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  return (
    <div className="book-appointment">
      <div className="book-header">
        <button className="close-btn" onClick={onClose}>
          <img src={arrowBack} alt="Back" />
        </button>
        <h2>Book Appointment</h2>
      </div>

      <Divider className="divider" />
      <div className="content">
        <div className="left-panel">
          <h3>Select Date</h3>
          <Calendar onChange={setDate} value={date} />
          <h3>Note</h3>
          <TextField
            name="note"
            value={formData.note}
            onChange={handleChange}
            multiline
            rows={5}
            fullWidth
            placeholder="Enter additional Note"
          />
        </div>
        <div className="right-panel">
          <p>{renderRequiredLabel("Patient Name")}</p>
          <TextField
            label="Patient Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <p>{renderRequiredLabel("Select Appointment Type")}</p>
          <TextField
            select
            label="Select Appointment Type"
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="General Checkup">General Checkup</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>
          <p>{renderRequiredLabel("Select Branch")}</p>
          <TextField
            select
            label="Select Branch"
            name="branchType"
            value={formData.branchType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Therapy">Therapy</MenuItem>
            <MenuItem value="ENT">ENT</MenuItem>
          </TextField>
          <p>{renderRequiredLabel("Select Doctor")}</p>
          <TextField
            select
            label="Select Doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
            <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
          </TextField>
          <p>{renderRequiredLabel("Mobile Number")}</p>
          <TextField
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
          />
          <p>Email</p>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" className="submit-btn" fullWidth>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
