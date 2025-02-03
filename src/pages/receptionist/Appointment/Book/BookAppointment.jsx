import React, {useEffect, useState} from "react";
import { TextField, MenuItem, Button, Divider } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookAppointment.scss";
import arrowBack from "../../../../assets/arrow_back.svg";
import {useDispatch, useSelector} from "react-redux";
import {
  bookAppointment,
  getAllDepartments,
  getDoctors,
  getPatients
} from "../../../../components/State/Receptionist/Action.js";
import {useNavigate} from "react-router-dom";

const BookAppointment = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  if (!isOpen) return null;

  // const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    email: "",
    appointmentType: "",
    departmentName: "",
    doctorEmail: "",
    note: "",
    date: new Date()
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({...formData,date});
  };

  const renderRequiredLabel = (label) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors())
    dispatch(getAllDepartments())
    dispatch(getPatients())
  }, [dispatch]);

  const doctors = useSelector(store => store.receptionist.doctors)
  const departments = useSelector(store => store.receptionist.departments)

  const handleClick = () => {
    console.log(formData)
    dispatch(bookAppointment(formData,onClose))
  }

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
          <Calendar onChange={handleDateChange} name="date" value={formData.date} />
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
            name="patientName"
            value={formData.patientName}
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
            <MenuItem value="Follow up">Follow up</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
            <MenuItem value="Vaccination">Vaccination</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <p>{renderRequiredLabel("Select Branch")}</p>
          <TextField
            select
            label="Select Branch"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            fullWidth
          >
            {
              departments.map((department,index) => (
                  <MenuItem key={index} value={department.departmentName}>{department.departmentName}</MenuItem>
              ))
            }
            {/*<MenuItem value="ENT">ENT</MenuItem>*/}
          </TextField>
          <p>{renderRequiredLabel("Select Doctor")}</p>
          <TextField
            select
            label="Select Doctor"
            name="doctorEmail"
            value={formData.doctorEmail}
            onChange={handleChange}
            fullWidth
          >
            {
              doctors.map((doctor,index) => (
                  <MenuItem key={index} value={doctor.email}>{doctor.name}</MenuItem>
              ))
            }
            {/*<MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>*/}
          </TextField>
          <p>{renderRequiredLabel("Mobile Number")}</p>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
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

          <Button variant="contained" className="submit-btn" fullWidth onClick={handleClick}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
