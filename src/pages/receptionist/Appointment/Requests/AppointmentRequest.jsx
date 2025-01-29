import React, { useEffect } from "react";
import "./appointmentRequest.scss";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import arrowBack from "../../../../assets/arrow_back.svg"; // Import the SVG as a React component

const AppointmentRequestModal = ({ isOpen, onClose, requests }) => {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <Button className="close-btn" onClick={onClose}>
            <img src={arrowBack} alt="Back" />
          </Button>
          <h2>Appointment Requests </h2>
          <span className="request-count">({requests.length})</span>
        </div>
        <div className="modal-body">
          {requests.map((request, index) => (
            <div key={index} className="request-item">
              <div className="request-info">
                <img
                  src={request.img}
                  alt={request.name}
                  className="request-img"
                />
                <div className="request-text">
                  <p className="request-name">{request.name}</p>
                  <p className="request-detail">{request.detail}</p>
                </div>
              </div>

              <div className="request-actions">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#25307F",
                  }}
                >
                  Accept
                </Button>
                <Button
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                    border: "2px solid red" /* Red border */,
                    ".MuiSvgIcon-root": {
                      color: "red" /* Ensures the cross icon is red */,
                    },
                  }}
                >
                  <CloseIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestModal;
