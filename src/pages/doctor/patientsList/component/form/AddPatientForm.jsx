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
    // dispatch(getAvailableBeds());
    dispatch(getAvailableRooms());
  }, []);
  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
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
  });
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
      patId: form.patientId,
      sendTo: sendToValue,
      admissionDetails: {
        name: form.patientName,
        contact: form.contactNo,
        address: form.address,
        age: parseInt(form.age),
        gender: form.gender,
        emergencyContact: form.emergencyContact,
        emergencyName: form.emergencyContactName,
        admissionDate: form.date,
        room: form.roomNo,
        bed: form.bedNo,
        deposit: parseFloat(form.deposit),
        medicalNote: form.medicalNote,
      },
    };

    dispatch(createAdmissionRequest(payload));

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

  const availableRooms = useSelector((state) => state.doctor.roomsAvailable);
  // console.log("Available Rooms:", availableRooms);
  // const availableBeds = useSelector((state) => state.doctor.bedsAvailable);
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
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    value={form.patientId}
                    onChange={(e) =>
                      setForm({ ...form, patientId: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-field">
                  <label>Contact No.</label>
                  <input
                    type="Number"
                    value={form.contactNo}
                    onChange={(e) =>
                      setForm({ ...form, contactNo: e.target.value })
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
                  />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <input
                    type="text"
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
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
                      setForm({ ...form, emergencyContact: e.target.value })
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
                      setForm({ ...form, emergencyContactName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </section>
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
                      setForm({ ...form, medicalNote: e.target.value })
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
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Room No.</label>
                  <select
                    value={form.roomNo}
                    onChange={(e) =>
                      setForm({ ...form, roomNo: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a room</option>
                    {availableRooms &&
                      availableRooms.map((room) => (
                        <option key={room._id} value={room.roomID}>
                          {room.name} {/* Displaying the room name */}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Bed No.</label>
                  <input
                    type="text"
                    value={form.bedNo}
                    onChange={(e) =>
                      setForm({ ...form, bedNo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Deposit Given Rs.</label>
                  <input
                    type="text"
                    value={form.deposit}
                    onChange={(e) =>
                      setForm({ ...form, deposit: e.target.value })
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
