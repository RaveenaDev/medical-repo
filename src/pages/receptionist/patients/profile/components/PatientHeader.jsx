import React, { useEffect, useState } from "react";
import "./PatientHeader.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import RecordModal from "./components/RecordsModal.jsx";
import { getBillsByPatientId } from "../../../../../components/State/Receptionist/Action.js";
import { useDispatch, useSelector } from "react-redux";

const PatientHeader = ({
  showEditPatients = true,
  patient,
  showAddButton,
  onClickBtn,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  // console.log("Pat : ",patient)
  const [activeModal, setActiveModal] = useState(null);
  const openBilling = () => setActiveModal("billing");
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);
  return (
    <div className="patient-header">
      <div className="patient-info">
        <span
          onClick={() => navigate(-1)}
          style={{
            transform: "translateY(4px)",
            color: "#25307F",
            cursor: "pointer",
          }}
        >
          <ArrowBackIosIcon />
        </span>
        <h2>Patient List</h2>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_405_1222"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect
              x="24"
              y="24"
              width="24"
              height="24"
              transform="rotate(-180 24 24)"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_405_1222)">
            <path
              d="M8 2L18 12L8 22L6.225 20.225L14.45 12L6.225 3.775L8 2Z"
              fill="#878787"
            />
          </g>
        </svg>

        <p>{patient?.name}</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_405_1222"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect
              x="24"
              y="24"
              width="24"
              height="24"
              transform="rotate(-180 24 24)"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_405_1222)">
            <path
              d="M8 2L18 12L8 22L6.225 20.225L14.45 12L6.225 3.775L8 2Z"
              fill="#878787"
            />
          </g>
        </svg>

        <p>XXXXXX</p>
      </div>
      {showAddButton && (
        <div className="patient-actions" style={{ cursor: "pointer" }}>
          <div
            className="box"
            style={{
              cursor: "pointer",
              background: "#25307f",
              padding: "2px 16px",
            }}
            onClick={onClickBtn}
          >
            <p
              style={{
                cursor: "pointer",

                color: "#fff",
              }}
            >
              Add files
            </p>
          </div>
        </div>
      )}

      {/* Use the separate BillingModal Component */}

      {/* <div
        className={`billing-modal ${
          activeModal === "billing" ? "billing-modalOpen" : ""
        }`}
      >
        <RecordModal onClose={closeModal} patient={patient} />
      </div> */}
    </div>
  );
};

export default PatientHeader;
