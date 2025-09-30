import React, { useEffect, useState } from "react";
import "./EditPatientForm.scss";

import { useDispatch, useSelector } from "react-redux";

import AdmissionFormPrintWrapperEdit from "./print/AdmissionFormPrintWrapperEdit.jsx";
import { getInsuranceCompanies } from "../../../../../../../components/State/Admin/Action.js";
import { addInsuranceAfterAdmission } from "../../../../../../../components/State/Doctor/Action.js";

/* ---------- Helpers: Indian-format display + raw-state parsing (no commas) ---------- */
const formatIndian = (val) => {
  if (val === "" || val == null) return "";
  const s = String(val);
  const [rawInt = "", rawDec = ""] = s.split(".");
  const intOnly = rawInt.replace(/\D/g, "");
  const decOnly = rawDec.replace(/\D/g, "");
  if (!intOnly) return decOnly ? `0.${decOnly}` : "";

  const last3 = intOnly.slice(-3);
  const head = intOnly.slice(0, -3);
  const headWithCommas = head.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const withCommas = (head ? headWithCommas + "," : "") + last3;
  return decOnly ? `${withCommas}.${decOnly}` : withCommas;
};
// Format date to yyyy-mm-dd for <input type="date">
const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

// Keep only digits + single dot, normalize leading zeros/dots
const parseToRaw = (input) => {
  const stripped = String(input)
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");
  if (!stripped) return "";
  const parts = stripped.split(".");
  const intPart = parts[0].replace(/^0+(?=\d)/, ""); // keep one 0 only if followed by digit
  const decPart = parts.slice(1).join(""); // collapse multiple dots into one
  let raw = intPart || "0";
  if (decPart.length) raw += "." + decPart;
  if (stripped.startsWith(".")) raw = "0." + decPart; // ".5" -> "0.5"
  return raw;
};
/* ------------------------------------------------------------------------------- */

const EditPatientForm = ({ onClose, patientDetails }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInsuranceCompanies());
  }, [dispatch]);
  const [errors, setErrors] = useState({});

  const genders = ["Male", "Female", "Other"];
  const [hasInsurance, setHasInsurance] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    email: "",
    contactNo: "",
    address: "",
    age: "",
    gender: "",
    emergencyContact: "",
    emergencyContactName: "",
    doctorSignature: "",
    witness: "",
    patientSignature: "",
    date: "",
    time: "",
    roomNo: "",
    bedNo: "",
    deposit: "", // RAW number as string (no commas)
    medicalNote: "",
    hasInsurance: false,
    employerName: "",
    insuranceIdNumber: "",
    policyNumber: "",
    insuranceCompany: "",
    employeeCode: "",
    insuranceStartDate: "",
    insuranceExpiryDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const insuranceCompanies = useSelector(
    (state) => state.admin.insuranceCompanies
  );

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!form.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    // Contact
    if (!form.contactNo) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contactNo)) {
      newErrors.contactNo = "Contact number must be 10 digits";
    }

    // Age
    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(form.age) || form.age <= 0 || form.age > 120) {
      newErrors.age = "Enter a valid age";
    }

    // Emergency Contact
    if (!form.emergencyContact) {
      newErrors.emergencyContact = "Emergency contact is required";
    } else if (!/^\d{10}$/.test(form.emergencyContact)) {
      newErrors.emergencyContact = "Must be 10 digits";
    }

    if (!form.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }

    // Deposit
    if (form.deposit && parseFloat(form.deposit) < 0) {
      newErrors.deposit = "Deposit cannot be negative";
    }

    // Medical note
    if (!form.medicalNote.trim()) {
      newErrors.medicalNote = "Reason is required";
    }

    // Date
    if (!form.date) {
      newErrors.date = "Admission date is required";
    }
    // Time
    if (!form.time) {
      newErrors.time = "Admission time is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if invalid

    const payload = {
      name: form.patientName,
      contact: form.contactNo,
      address: form.address,
      age: parseInt(form.age),
      gender: form.gender,
      emergencyContact: form.emergencyContact,
      emergencyName: form.emergencyContactName,
      admissionDate: form.date,
      admissionTime: form.time,
      date: new Date(form.date),
      deposit: parseFloat(form.deposit || 0), // use RAW value
      medicalNote: form.medicalNote,
      hasInsurance: form.hasInsurance,
      employerName: form.employerName,
      insuranceIdNumber: form.insuranceIdNumber,
      policyNumber: form.policyNumber,
      insuranceCompany: form.insuranceCompany,
      employeeCode: form.employeeCode,
      insuranceStartDate: new Date(form.insuranceStartDate),
      insuranceExpiryDate: new Date(form.insuranceExpiryDate),
    };

    const admissionId = patientDetails._id;

    // console.log("Pay: ", payload);

    dispatch(addInsuranceAfterAdmission(admissionId, payload));
    onClose();
  };
  useEffect(() => {
    if (patientDetails) {
      if (patientDetails.admissionDetails?.insurance?.hasInsurance == true) {
        setHasInsurance(true);
      }
      setForm((prev) => ({
        ...prev,
        patientName: patientDetails.admissionDetails?.name || "",
        patientId: patientDetails.patient?.patId || "",
        email: patientDetails.admissionDetails?.email || "",
        contactNo: patientDetails.admissionDetails?.contact || "",
        address: patientDetails.admissionDetails?.address || "",
        age: patientDetails.admissionDetails?.age || "",
        gender: patientDetails.admissionDetails?.gender || "",
        emergencyContact:
          patientDetails.admissionDetails?.emergencyContact || "",
        emergencyContactName:
          patientDetails.admissionDetails?.emergencyName || "",

        deposit: patientDetails.admissionDetails?.deposit || "",
        medicalNote: patientDetails.admissionDetails?.medicalNote || "",
        hasInsurance: patientDetails.admissionDetails?.insurance?.hasInsurance,

        employerName:
          patientDetails.admissionDetails?.insurance?.employerName || "",
        insuranceIdNumber:
          patientDetails.admissionDetails?.insurance?.insuranceIdNumber || "",
        policyNumber:
          patientDetails.admissionDetails?.insurance?.policyNumber || "",
        insuranceCompany:
          patientDetails.admissionDetails?.insurance?.insuranceCompany || "",
        employeeCode:
          patientDetails.admissionDetails?.insurance?.employeeCode || "",
        insuranceStartDate: formatDateForInput(
          patientDetails.admissionDetails?.insurance?.insuranceStartDate
        ),
        insuranceExpiryDate: formatDateForInput(
          patientDetails.admissionDetails?.insurance?.insuranceExpiryDate
        ),
        date: formatDateForInput(patientDetails.admissionDetails?.date),

        time: patientDetails.admissionDetails?.time || "",
        roomNo: patientDetails.admissionDetails?.room?.name || "",
        bedNo: patientDetails.admissionDetails?.bed?.bedNumber || "",
      }));
    }
  }, [patientDetails]);
  // console.log("Patient Details: ", patientDetails);
  return (
    <div className="edit-patient-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClose}
          className="cancel-btn"
        >
          <path
            d="M10 23.1075L16.5538 16.5538L23.1075 23.1075M23.1075 10L16.5525 16.5538L10 10"
            stroke="#5461BE"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h3>Edit Admission Form</h3>
        <form onSubmit={handleSubmit}>
          <section>
            <h4>Personal Details</h4>
            <div className="form-section">
              <div className="form-group">
                <div className="form-field">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    value={form.patientName}
                    onChange={(e) =>
                      setForm({ ...form, patientName: e.target.value })
                    }
                    className={errors.patientName ? "input-error" : ""}
                  />
                  {errors.patientName && (
                    <span className="error">{errors.patientName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Patient ID</label>
                  <input type="text" readOnly value={form.patientId} disabled />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Contact No.</label>
                  <input
                    type="number"
                    value={form.contactNo}
                    onChange={(e) =>
                      setForm({ ...form, contactNo: e.target.value })
                    }
                    required
                    className={errors.contactNo ? "input-error" : ""}
                  />
                  {errors.contactNo && (
                    <span className="error">{errors.contactNo}</span>
                  )}
                </div>
                <div className="form-field">
                  <label>Address</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Age</label>
                  <input
                    type="text"
                    required
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={errors.age ? "input-error" : ""}
                  />
                  {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div className="form-field">
                  <label>Gender</label>

                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Emergency Contact</label>
                  <input
                    type="number"
                    value={form.emergencyContact}
                    onChange={(e) =>
                      setForm({ ...form, emergencyContact: e.target.value })
                    }
                    required
                    className={errors.emergencyContact ? "input-error" : ""}
                  />
                  {errors.emergencyContact && (
                    <span className="error">{errors.emergencyContact}</span>
                  )}
                </div>
                <div className="form-field">
                  <label>Emergency Contact Name</label>
                  <input
                    type="text"
                    value={form.emergencyContactName}
                    onChange={(e) =>
                      setForm({ ...form, emergencyContactName: e.target.value })
                    }
                    required
                    className={errors.emergencyContactName ? "input-error" : ""}
                  />
                  {errors.emergencyContactName && (
                    <span className="error">{errors.emergencyContactName}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label>Medical Insurance</label>
                  <div className="radio-group1">
                    <label>
                      <input
                        type="radio"
                        name="insurance"
                        value="yes"
                        checked={hasInsurance}
                        onChange={() => {
                          setHasInsurance(true);
                          setForm({ ...form, hasInsurance: true });
                        }}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="insurance"
                        value="no"
                        checked={!hasInsurance}
                        onChange={() => {
                          setHasInsurance(false);
                          setForm({ ...form, hasInsurance: false });
                        }}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {hasInsurance && (
            <div>
              <h4>Insurance Details</h4>
              <div className="form-section insurance-details">
                <div className="form-group">
                  <div className="form-field">
                    <label>Employer Name (if individual)</label>
                    <input
                      type="text"
                      value={form.employerName}
                      onChange={(e) =>
                        setForm({ ...form, employerName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label>Insurance ID Number</label>
                    <input
                      type="text"
                      value={form.insuranceIdNumber}
                      onChange={(e) =>
                        setForm({ ...form, insuranceIdNumber: e.target.value })
                      }
                      className={errors.insuranceIdNumber ? "input-error" : ""}
                    />
                    {errors.insuranceIdNumber && (
                      <span className="error">{errors.insuranceIdNumber}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-field">
                    <label>Policy Number</label>
                    <input
                      type="text"
                      value={form.policyNumber}
                      onChange={(e) =>
                        setForm({ ...form, policyNumber: e.target.value })
                      }
                      className={errors.policyNumber ? "input-error" : ""}
                    />
                    {errors.policyNumber && (
                      <span className="error">{errors.policyNumber}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>Company</label>
                    <select
                      value={form.insuranceCompany}
                      onChange={(e) =>
                        setForm({ ...form, insuranceCompany: e.target.value })
                      }
                      className="styled-select"
                    >
                      <option value="">Select Company</option>

                      {insuranceCompanies.map((comp, index) => (
                        <option key={index} value={comp.name}>
                          {comp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-field">
                    <label>Employee Code</label>
                    <input
                      type="text"
                      value={form.employeeCode}
                      onChange={(e) =>
                        setForm({ ...form, employeeCode: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={form.insuranceStartDate}
                      onChange={(e) =>
                        setForm({ ...form, insuranceStartDate: e.target.value })
                      }
                      className={errors.insuranceStartDate ? "input-error" : ""}
                    />
                    {errors.insuranceStartDate && (
                      <span className="error">{errors.insuranceStartDate}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      value={form.insuranceExpiryDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          insuranceExpiryDate: e.target.value,
                        })
                      }
                      className={
                        errors.insuranceExpiryDate ? "input-error" : ""
                      }
                    />
                    {errors.insuranceExpiryDate && (
                      <span className="error">
                        {errors.insuranceExpiryDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <section>
            <h4>Medical notes</h4>
            <div className="form-section">
              <div className="form-group">
                <div className="form-field">
                  <label>Diagnosis</label>
                  <input
                    type="text"
                    value={form.medicalNote}
                    onChange={(e) =>
                      setForm({ ...form, medicalNote: e.target.value })
                    }
                    required
                    className={errors.medicalNote ? "input-error" : ""}
                  />
                  {errors.medicalNote && (
                    <span className="error">{errors.medicalNote}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className={errors.date ? "input-error" : ""}
                  />
                  {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="form-field">
                  <label>Admission Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    className={errors.time ? "input-error" : ""}
                  />
                  {errors.time && <span className="error">{errors.time}</span>}
                </div>

                {/* Deposit with Indian formatting (no libs) */}
                <div className="form-field">
                  <label>Deposit Given Rs.</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={formatIndian(form.deposit)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deposit: parseToRaw(e.target.value),
                      })
                    }
                    className={errors.deposit ? "input-error" : ""}
                  />
                  {errors.deposit && (
                    <span className="error">{errors.deposit}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                {/* Room Dropdown */}
                <div className="form-field">
                  <label>Room No.</label>
                  <input type="text" readOnly value={form.roomNo} disabled />
                </div>

                <div className="form-field">
                  <label>Bed No.</label>
                  <input value={form.bedNo} disabled readOnly />
                </div>
              </div>
            </div>
          </section>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="submit-btn"
            >
              Print & Preview
            </button>
            <button type="submit" className="submit-btn">
              Send
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <AdmissionFormPrintWrapperEdit
          form={form}
          onClose={() => setSubmitted(false)}
        />
      )}
    </div>
  );
};

export default EditPatientForm;
