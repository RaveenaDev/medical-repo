import React, { useEffect, useState } from "react";
import "./AddPatientForm.scss";
import {
  createAdmissionRequest,
  getAvailableRooms,
} from "../../../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";

const AddPatientForm = ({ onClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvailableRooms());
  }, []);
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
    roomNo: "",
    bedNo: "",
    deposit: "",
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
  const [isExistingPatient, setIsExistingPatient] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [availableBeds, setAvailableBeds] = useState([]);
  const [bedsAvailable, setBedsAvailable] = useState(true);

  const availableRooms = useSelector((state) => state.doctor.roomsAvailable);
  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    setSelectedRoom(roomId);

    // If "Select a room" is chosen, clear bed selection and re-enable the bed dropdown
    if (roomId === "") {
      setAvailableBeds([]); // Clear the available beds
      setBedsAvailable(true); // Re-enable the bed dropdown
      setForm((prevForm) => ({ ...prevForm, bedNo: "" })); // Clear selected bed
    } else {
      // Find the selected room and its available beds
      const room = availableRooms.find((room) => room.roomID === roomId);
      if (room && room.beds.length > 0) {
        setBedsAvailable(true); // There are available beds
        setAvailableBeds(room.beds); // Set available beds
      } else {
        setBedsAvailable(false); // No available beds
        setAvailableBeds([]); // Clear available beds
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic
    if (selectedRoles.length === 0) {
      alert("Please select at least one approval role (Doctor or Admin).");
      return;
    }
    const sendToValue =
      selectedRoles.includes("Doctor") && selectedRoles.includes("Admin")
        ? "Both"
        : selectedRoles[0] || "";

    const payload = {
      ...(isExistingPatient
        ? { patId: form.patientId }
        : { email: form.email }),
      sendTo: sendToValue,
      mobileNumber: form.contactNo,
      name: form.patientName,
      insurance: {
        hasInsurance: form.hasInsurance,
        employerName: form.employerName,
        insuranceIdNumber: form.insuranceIdNumber,
        policyNumber: form.policyNumber,
        insuranceCompany: form.insuranceCompany,
        employeeCode: form.employeeCode,
        insuranceStartDate: new Date(form.insuranceStartDate),
        insuranceExpiryDate: new Date(form.insuranceExpiryDate)
      },
      admissionDetails: {
        name: form.patientName,
        contact: form.contactNo,
        address: form.address,
        age: parseInt(form.age),
        gender: form.gender,
        emergencyContact: form.emergencyContact,
        emergencyName: form.emergencyContactName,
        admissionDate: form.date,
        date: new Date(form.date),
        room: selectedRoom,
        bed: form.bedNo,
        deposit: parseFloat(form.deposit),
        medicalNote: form.medicalNote,
      },
    };

    dispatch(createAdmissionRequest(payload));

    console.log("Pay: ",payload)
    onClose();
  };
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleCheckboxChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };
  // console.log("Available Rooms:", availableRooms);
  return (
    <div className="add-patient-modal">
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

        <h3>Admission Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="radio-group patient-type-toggle">
            <label>
              <input
                type="radio"
                name="patientType"
                checked={isExistingPatient}
                onChange={() => setIsExistingPatient(true)}
              />
              Existing Patient
            </label>
            <label>
              <input
                type="radio"
                name="patientType"
                checked={!isExistingPatient}
                onChange={() => setIsExistingPatient(false)}
              />
              New Patient
            </label>
          </div>

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
                          setForm({...form, patientName: e.target.value})
                      }
                      required
                  />
                </div>
                {isExistingPatient ? (
                    <div className="form-field">
                      <label>Patient ID</label>
                      <input
                          type="text"
                          value={form.patientId}
                          onChange={(e) =>
                              setForm({...form, patientId: e.target.value})
                          }
                          required
                      />
                    </div>
                ) : (
                    <div className="form-field">
                      <label>Email</label>
                      <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                              setForm({...form, email: e.target.value})
                          }
                          required
                      />
                    </div>
                )}
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Contact No.</label>
                  <input
                      type="Number"
                      value={form.contactNo}
                      onChange={(e) =>
                          setForm({...form, contactNo: e.target.value})
                      }
                      required
                  />
                </div>
                <div className="form-field">
                  <label>Address</label>
                  <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) =>
                          setForm({...form, address: e.target.value})
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
                      onChange={(e) => setForm({...form, age: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <input
                      type="text"
                      value={form.gender}
                      onChange={(e) =>
                          setForm({...form, gender: e.target.value})
                      }
                      required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Emergency Contact</label>
                  <input
                      type="number"
                      value={form.emergencyContact}
                      onChange={(e) =>
                          setForm({...form, emergencyContact: e.target.value})
                      }
                      required
                  />
                </div>
                <div className="form-field">
                  <label>Emergency Contact Name</label>
                  <input
                      type="text"
                      value={form.emergencyContactName}
                      onChange={(e) =>
                          setForm({...form, emergencyContactName: e.target.value})
                      }
                      required
                  />
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
                            setForm({...form, hasInsurance: true});
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
                            setForm({...form, hasInsurance: false});
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
              <div >
                <h4>Insurance Details</h4>
                <div className="form-section insurance-details">
                  <div className="form-group">
                    <div className="form-field">
                      <label>Employer Name (if individual)</label>
                      <input
                          type="text"
                          value={form.employerName}
                          onChange={(e) =>
                              setForm({...form, employerName: e.target.value})
                          }
                          required
                      />
                    </div>
                    <div className="form-field">
                      <label>Insurance ID Number</label>
                      <input
                          type="text"
                          value={form.insuranceIdNumber}
                          onChange={(e) =>
                              setForm({...form, insuranceIdNumber: e.target.value})
                          }
                          required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-field">
                      <label>Policy Number</label>
                      <input
                          type="text"
                          value={form.policyNumber}
                          onChange={(e) =>
                              setForm({...form, policyNumber: e.target.value})
                          }
                          required
                      />
                    </div>
                    <div className="form-field">
                      <label>Company</label>
                      <input
                          type="text"
                          value={form.insuranceCompany}
                          onChange={(e) =>
                              setForm({...form, insuranceCompany: e.target.value})
                          }
                          required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-field">
                      <label>Employee Code</label>
                      <input
                          type="text"
                          value={form.employeeCode}
                          onChange={(e) =>
                              setForm({...form, employeeCode: e.target.value})
                          }
                          required
                      />
                    </div>
                    <div className="form-field">
                      <label>Start Date</label>
                      <input
                          type="date"
                          value={form.insuranceStartDate}
                          onChange={(e) =>
                              setForm({...form, insuranceStartDate: e.target.value})
                          }
                          required
                      />
                    </div>
                    <div className="form-field">
                      <label>Expiry Date</label>
                      <input
                          type="date"
                          value={form.insuranceExpiryDate}
                          onChange={(e) =>
                              setForm({...form, insuranceExpiryDate: e.target.value})
                          }
                          required
                      />
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
                  <label>Reason</label>
                  <input
                      type="text"
                      value={form.medicalNote}
                      onChange={(e) =>
                          setForm({...form, medicalNote: e.target.value})
                      }
                      required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Date</label>
                  <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({...form, date: e.target.value})}
                      required
                  />
                </div>

                {/* Room Dropdown */}
                <div className="form-field">
                  <label>Room No.</label>
                  <select
                      value={selectedRoom}
                      onChange={handleRoomChange}
                      required
                  >
                    <option value="">Select a room</option>
                    {availableRooms.map((room) => (
                        <option key={room._id} value={room.roomID}>
                          {room.name}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Bed No.</label>
                  <select
                      value={form.bedNo}
                      onChange={(e) =>
                          setForm({...form, bedNo: e.target.value})
                      }
                      disabled={!selectedRoom || !bedsAvailable}
                      required
                  >
                    <option value="">Select a bed</option>
                    {bedsAvailable ? (
                        availableBeds.map((bed) => (
                            <option key={bed._id} value={bed.bedNumber}>
                              {bed.bedNumber}
                            </option>
                        ))
                    ) : (
                        <option>No beds available</option>
                    )}
                  </select>
                </div>

                <div className="form-field">
                  <label>Deposit Given Rs.</label>
                  <input
                      type="text"
                      value={form.deposit}
                      onChange={(e) =>
                          setForm({...form, deposit: e.target.value})
                      }
                  />
                </div>
              </div>

              <div className="form-consent">
                I hereby consent to any necessary medical procedures, including
                surgeries, medications, diagnostic tests, biopsies, blood
                transfusions, cardiac defibrillation, and pacing. I understand
                and accept the potential risks involved and will not hold the
                hospital responsible for any outcomes arising during or after
                these procedures.
              </div>

              <div className="form-approval">
                <p>Send For Approval</p>

                <label className="circle-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes("Doctor")}
                    onChange={() => handleCheckboxChange("Doctor")}
                  />
                  <span className="custom-circle" /> Doctor
                </label>

                <label className="circle-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes("Admin")}
                    onChange={() => handleCheckboxChange("Admin")}
                  />
                  <span className="custom-circle" /> Admin
                </label>
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label>Doctor Signature</label>
                  <input
                    type="text"
                    value={form.doctorSignature}
                    onChange={(e) =>
                      setForm({ ...form, doctorSignature: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Witness</label>
                  <input
                    type="text"
                    value={form.witness}
                    onChange={(e) =>
                      setForm({ ...form, witness: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Patient Signature</label>
                  <input
                    type="text"
                    value={form.patientSignature}
                    onChange={(e) =>
                      setForm({ ...form, patientSignature: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
