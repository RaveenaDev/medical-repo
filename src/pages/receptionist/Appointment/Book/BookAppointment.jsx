import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookAppointment.scss";
import arrowBack from "../../../../assets/arrow_back.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  getAllDepartments,
  getDoctors,
  getDoctorsByDepartment,
  getPatients, removeBookAppointmentData,
} from "../../../../components/State/Receptionist/Action.js";

const BookAppointment = ({
  isOpen,
  onClose,
  isFromDoctor,
  doctorEmail,
  department,
}) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  let dep = "";

  if(department){
    dep = department[0]?.name;
  }


  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    email: "",
    appointmentType: "",
    departmentName: dep || "",
    doctorEmail: doctorEmail || "", // Set the initial value,
    typeVisit: "Walk in",
    note: "",
    date: new Date(),
  });
  useEffect(() => {
    if (doctorEmail) {
      setFormData((prev) => ({
        ...prev,
        doctorEmail: doctorEmail, // Assuming doctorName is actually an email, adjust if needed
      }));
    }
  }, [doctorEmail]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderRequiredLabel = (label) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  const handleDepartmentDoctors = (departmentId) => {
    dispatch(getDoctorsByDepartment(departmentId));
  };

  if (department) {
    dispatch(getDoctorsByDepartment(department[0]._id));
  }

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getAllDepartments());
    dispatch(getPatients());
  }, [dispatch]);

  const doctors = useSelector((store) => store.receptionist.doctors);
  const departments = useSelector((store) => store.receptionist.departments);
  const doctorsByDepartment = useSelector(
    (store) => store.receptionist.doctorsByDepartment
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const bookingSuccess = useSelector(
    (store) => store.receptionist.bookAppointment
  );

  useEffect(() => {
    if (bookingSuccess) {
      setShowSuccessModal(true);
    }
  }, [bookingSuccess]);

  const validateForm = () => {
    let newErrors = {};

    // Required fields validation
    const requiredFields = [
      "patientName",
      "mobileNumber",
      "appointmentType",
      "departmentName",
      "doctorEmail",
      "email",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Mobile number validation (10-digit numeric)
    if (
      formData.mobileNumber &&
      !/^\d{10}$/.test(formData.mobileNumber.trim())
    ) {
      newErrors.mobileNumber = "Enter a valid 10-digit phone number";
    }

    // Email validation (optional but should be valid if provided)
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (validateForm()) {
      console.log("Data",formData)
      dispatch(bookAppointment(formData, onClose));
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };
  return (
    <>
      <Modal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          dispatch(removeBookAppointmentData());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "28px",
            }}
          >
            <svg
              width="70"
              height="70"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0C18 0 0 18 0 40C0 62 18 80 40 80C62 80 80 62 80 40C80 18 62 0 40 0ZM40 72C22.36 72 8 57.64 8 40C8 22.36 22.36 8 40 8C57.64 8 72 22.36 72 40C72 57.64 57.64 72 40 72ZM58.36 22.32L32 48.68L21.64 38.36L16 44L32 60L64 28L58.36 22.32Z"
                fill="#2E823B"
              />
            </svg>
            <Button
              onClick={() => {
                onClose();
                setShowSuccessModal(false);
                dispatch(removeBookAppointmentData());
              }}
              sx={{
                backgroundColor: "#25307F",
                color: "white",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              Appointment Confirmed
            </Button>
          </div>
        </Box>
      </Modal>

      <div>
        <div
          className={`book-appointment ${
            isFromDoctor ? "from-doctor" : "default"
          }`}
        >
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
              <Calendar
                onChange={handleDateChange}
                name="date"
                value={formData.date}
                tileDisabled={({ date }) =>
                  date < new Date().setHours(0, 0, 0, 0)
                } // Disable past dates
              />
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
                error={!!errors.patientName}
                helperText={errors.patientName}
              />
              <p>{renderRequiredLabel("Select Appointment Type")}</p>
              <TextField
                select
                label="Select Appointment Type"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                fullWidth
                error={!!errors.appointmentType}
                helperText={errors.appointmentType}
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
                error={!!errors.departmentName}
                helperText={errors.departmentName}
              >
                {departments.map((department, index) => (
                  <MenuItem
                    key={index}
                    value={department.departmentName}
                    onClick={() =>
                      handleDepartmentDoctors(department.departmentId)
                    }
                  >
                    {department.departmentName}
                  </MenuItem>
                ))}
              </TextField>
              <p>{renderRequiredLabel("Select Doctor")}</p>
              <TextField
                select
                label="Select Doctor"
                name="doctorEmail"
                value={formData.doctorEmail}
                onChange={handleChange}
                fullWidth
                error={!!errors.doctorEmail}
                helperText={errors.doctorEmail}
              >
                {doctorsByDepartment.map((doctor, index) => (
                  <MenuItem key={index} value={doctor.email}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </TextField>

              <p>{renderRequiredLabel("Type Visit")}</p>
              <TextField
                select
                name="typeVisit"
                value={formData.typeVisit}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Walk in">Walk In</MenuItem>
                <MenuItem value="Referral">Referral</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </TextField>
              <p>{renderRequiredLabel("Mobile Number")}</p>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
              <p>{renderRequiredLabel("Email")}</p>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />

              <Button
                variant="contained"
                className="submit-btn"
                fullWidth
                onClick={handleClick}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
