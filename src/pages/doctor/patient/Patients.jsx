import CommonPanel from "../components/CommonPanel";
import { FaUserCircle } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { patientData } from "../../../constants/patientsData";
import "./Patients.scss";

const Patients = () => {

  return (
    <>
      <div style={{ position: "relative" }}>
        <CommonPanel />
      </div>
      <div className="patients-header">
        <div className="header-top">
          <span className="back-text">&lt; Inpatient List</span>
          <div className="appointment-section box-style">
            <FaUserCircle className="user-icon" />
            <span>Appointment Requests</span>
          </div>
        </div>
        <hr />
        <div className="header-bottom">
          <span className="patient-count">56  <span>Patients</span></span>
          <div className="vertical-divider"></div>
          <div className="sort-filter-section">
            <div className="sort-by">
              <span>Sort by:</span>
              <select className="box-style">
                <option>Newest to Oldest</option>
                <option>Oldest to Newest</option>
              </select>
            </div>
            <div className="filter box-style">
              <FiFilter />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="patients-table-container">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient</th>
              <th>Bed</th>
              <th>Condition</th>
              <th>Doctor</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index}>
                <td className="patient-id">{patient.id}</td>
                <td className="patient-info">
                  <div>
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-email">{patient.email}</div>
                  </div>
                </td>
                <td className="bed-number">{patient.bed}</td>
                <td className="condition">{patient.condition}</td>
                <td className="doctor">{patient.doctor}</td>
                <td className="status">
                  <span className={`status-badge ${patient.status.toLowerCase()}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="actions">
                  <BsThreeDotsVertical className="menu-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Patients;