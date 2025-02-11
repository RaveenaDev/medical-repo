import React, { useState } from "react";
import "./PatientHeader.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import RecordModal from "./components/RecordsModal.jsx";

const PatientHeader = ({ showEditPatients = true }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBill(null);
  };
  const handleViewClick = (bill) => {
    setSelectedBill(bill);
    setOpenModal(true);
  };
  const navigate = useNavigate();
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

        <p>Jasmine Kaur</p>
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
      <div className="patient-actions" style={{cursor:'pointer'}}>
        <div>
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="42" height="42" rx="5" fill="white" />
            <mask
              id="mask0_patient_header"
              maskType="alpha"
              maskUnits="userSpaceOnUse"
              x="9"
              y="10"
              width="24"
              height="24"
            >
              <rect x="9" y="10" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_patient_header)">
              <path
                d="M27 17H15V13H27V17ZM27 22.5C27.2833 22.5 27.5208 22.4042 27.7125 22.2125C27.9042 22.0208 28 21.7833 28 21.5C28 21.2167 27.9042 20.9792 27.7125 20.7875C27.5208 20.5958 27.2833 20.5 27 20.5C26.7167 20.5 26.4792 20.5958 26.2875 20.7875C26.0958 20.9792 26 21.2167 26 21.5C26 21.7833 26.0958 22.0208 26.2875 22.2125C26.4792 22.4042 26.7167 22.5 27 22.5ZM25 29V25H17V29H25ZM27 31H15V27H11V21C11 20.15 11.2917 19.4375 11.875 18.8625C12.4583 18.2875 13.1667 18 14 18H28C28.85 18 29.5625 18.2875 30.1375 18.8625C30.7125 19.4375 31 20.15 31 21V27H27V31Z"
                fill="#25307F"
              />
            </g>
          </svg>
        </div>
        <div
          className="box"
          style={{cursor:'pointer'}}
          onClick={() =>
            handleViewClick({
              id: "C001231",
              name: "John Doe",
              phone: "9876543210",
              date: "11-12-2024",
              amount: "$250",
              status: "Paid",
            })
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask1_patient_header"
              maskType="alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_405_1216)">
              <path
                d="M14 13C13.1667 13 12.4583 12.7083 11.875 12.125C11.2917 11.5417 11 10.8333 11 10C11 9.16667 11.2917 8.45833 11.875 7.875C12.4583 7.29167 13.1667 7 14 7C14.8333 7 15.5417 7.29167 16.125 7.875C16.7083 8.45833 17 9.16667 17 10C17 10.8333 16.7083 11.5417 16.125 12.125C15.5417 12.7083 14.8333 13 14 13ZM7 16C6.45 16 5.97917 15.8042 5.5875 15.4125C5.19583 15.0208 5 14.55 5 14V6C5 5.45 5.19583 4.97917 5.5875 4.5875C5.97917 4.19583 6.45 4 7 4H21C21.55 4 22.0208 4.19583 22.4125 4.5875C22.8042 4.97917 23 5.45 23 6V14C23 14.55 22.8042 15.0208 22.4125 15.4125C22.0208 15.8042 21.55 16 21 16H7ZM9 14H19C19 13.45 19.1958 12.9792 19.5875 12.5875C19.9792 12.1958 20.45 12 21 12V8C20.45 8 19.9792 7.80417 19.5875 7.4125C19.1958 7.02083 19 6.55 19 6H9C9 6.55 8.80417 7.02083 8.4125 7.4125C8.02083 7.80417 7.55 8 7 8V12C7.55 12 8.02083 12.1958 8.4125 12.5875C8.80417 12.9792 9 13.45 9 14ZM20 20H3C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V7H3V18H20V20Z"
                fill="#25307F"
              />
            </g>
          </svg>

          <p>Billing Details</p>
        </div>
        {/* Conditionally render Edit Patients */}
        {showEditPatients && (
          <div className="box">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask2_patient_header"
                maskType="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask2_patient_header)">
                <path
                  d="M2 24V20H22V24H2ZM4 18V13.75L15.2 2.575C15.3833 2.39167 15.5958 2.25 15.8375 2.15C16.0792 2.05 16.3333 2 16.6 2C16.8667 2 17.125 2.05 17.375 2.15C17.625 2.25 17.85 2.4 18.05 2.6L19.425 4C19.625 4.18333 19.7708 4.4 19.8625 4.65C19.9542 4.9 20 5.15833 20 5.425C20 5.675 19.9542 5.92083 19.8625 6.1625C19.7708 6.40417 19.625 6.625 19.425 6.825L8.25 18H4ZM16.6 6.8L18 5.4L16.6 4L15.2 5.4L16.6 6.8Z"
                  fill="#25307F"
                />
              </g>
            </svg>
            <p>Edit Patients</p>
          </div>
        )}
      </div>
      {/* Use the separate BillingModal Component */}
      <RecordModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PatientHeader;
