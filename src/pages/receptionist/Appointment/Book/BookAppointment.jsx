import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Modal,
  Box,
  CircularProgress,
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
  getPatients,
  removeBookAppointmentData,
} from "../../../../components/State/Receptionist/Action.js";

const BookAppointment = ({
                           isOpen,
                           onClose,
                           isFromDoctor,
                           doctorEmail,
                           department,
                         }) => {

  const dispatch = useDispatch();



  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    email: "",
    appointmentType: "",
    departmentName: dep || "",
    doctorEmail: doctorEmail || "",
    typeVisit: "Walk in",
    note: "",
    date: new Date(), // will store both date & time after submit
    time: "",         // "HH:MM" (24h) selected below the calendar
    age: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (doctorEmail) {
      setFormData((prev) => ({
        ...prev,
        doctorEmail: doctorEmail,
      }));
    }
  }, [doctorEmail]);

  const [errors, setErrors] = useState({});

  // sanitize inputs
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (typeof value === "string") {
      value = value.trimStart();
    }

    if (name === "age") {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };

  const renderRequiredLabel = (label) => (
      <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  const handleDepartmentDoctors = (departmentId) => {
    dispatch(getDoctorsByDepartment(departmentId));
  };

  // moved this into an effect so it doesn't fire on every render
  useEffect(() => {
    if (department && department[0]?._id) {
      dispatch(getDoctorsByDepartment(department[0]._id));
    }
  }, [dispatch, department]);

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getAllDepartments());
    dispatch(getPatients());
  }, [dispatch]);

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

    const requiredFields = [
      "patientName",
      "mobileNumber",
      "appointmentType",
      "departmentName",
      "doctorEmail",
      "age",
      "gender",
      "time", // make time required
    ];
    requiredFields.forEach((field) => {
      const v = formData[field];
      if (v == null || (typeof v === "string" && v.trim() === "")) {
        newErrors[field] = "This field is required";
      }
    });

    // Phone
    if (
        formData.mobileNumber &&
        !/^\d{10}$/.test(formData.mobileNumber.trim())
    ) {
      newErrors.mobileNumber = "Enter a valid 10-digit phone number";
    }

    // Age
    if (formData.age && (Number(formData.age) < 0 || Number(formData.age) > 120)) {
      newErrors.age = "Enter a valid age (0-120)";
    }

    // Email (optional)
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    // If time is set, prevent selecting a past time for today
    if (formData.time) {
      const [hh, mm] = formData.time.split(":").map(Number);
      const chosen = new Date(formData.date);
      chosen.setHours(hh || 0, mm || 0, 0, 0);

      const now = new Date();
      const isSameDay =
          chosen.getFullYear() === now.getFullYear() &&
          chosen.getMonth() === now.getMonth() &&
          chosen.getDate() === now.getDate();

      if (isSameDay && chosen < now) {
        newErrors.time = "Select a future time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loadingBtn, setLoadingBtn] = useState(false);

    const handleClick = () => {
        if (!validateForm()) return;

        setLoadingBtn(true);

        // Merge selected time into the chosen date (local tz)
        const merged = new Date(formData.date);
        const [hh, mm] = (formData.time || "00:00").split(":").map(Number);
        merged.setHours(hh || 0, mm || 0, 0, 0);

        // Build payload as backend expects:
        // - single 'date' field in UTC ISO format
        // - omit 'time' since it's merged
        const { time, ...rest } = formData;
        const payload = {
            ...rest,
            // optional: send age as number if your API expects number
            age: rest.age !== "" ? Number(rest.age) : undefined,
            date: merged.toISOString(), // 👉 UTC, e.g. "2025-09-16T09:47:00.000Z"
        };

        // console.log("Payload: ",payload)
        //
        // setLoadingBtn(false)

        dispatch(bookAppointment(payload, onClose))
            .finally(() => setLoadingBtn(false));
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

  let dep = "";
  if (department) {
    dep = department[0]?.name;
  }

  if (!isOpen) return null;

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
              <h2 style={{fontWeight: 500,marginTop:'3px'}}>Book Appointment</h2>
            </div>

            <Divider className="divider" />
            <div className="content">
              <div className="left-panel">
                <h3>{renderRequiredLabel("Select Date")}</h3>
                <Calendar
                    onChange={handleDateChange}
                    name="date"
                    value={formData.date}
                    tileDisabled={({ date }) =>
                        date < new Date().setHours(0, 0, 0, 0)
                    }
                />

                {/* NEW: Time field below the calendar */}
                <h3 style={{ marginTop: 12 }}>{renderRequiredLabel("Select Time")}</h3>
                <TextField
                    type="time"
                    label="Select Time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }} // 5 minute steps
                    error={!!errors.time}
                    helperText={errors.time}
                    sx={{
                      // set width (px, %, etc.)
                      '& .MuiOutlinedInput-root': {
                        height: 46,
                        width: 180// overall field height
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '6px 10px',          // reduce inner padding
                        boxSizing: 'border-box',
                      },
                    }}
                />

                <h3 style={{ marginTop: 12 }}>Note</h3>
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

                <p>{renderRequiredLabel("Age")}</p>
                <TextField
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.age}
                    helperText={errors.age}
                />

                <p>{renderRequiredLabel("Gender")}</p>
                <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <p>Address</p>
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
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
                    slotProps={{
                      select: {
                        MenuProps: {
                          PaperProps: {
                            style: { maxHeight: 200, overflowY: "auto" },
                          },
                        },
                      },
                    }}
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
                    slotProps={{
                      select: {
                        MenuProps: {
                          PaperProps: {
                            style: { maxHeight: 200, overflowY: "auto" },
                          },
                        },
                      },
                    }}
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

                <p>Email</p>
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
                    sx={{
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                >
                  {loadingBtn ? (
                      <CircularProgress size={28} thickness={5} sx={{ color: "white" }} />
                  ) : (
                      "Confirm"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default BookAppointment;
