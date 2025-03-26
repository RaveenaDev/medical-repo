import React, { useEffect } from "react";
import "./appointmentRequest.scss";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import arrowBack from "../../../../assets/arrow_back.svg";
import { useDispatch } from "react-redux";
import {
  acceptAppointmentRequests,
  rejectAppointmentRequests,
} from "../../../../components/State/Receptionist/Action.js"; // Import the SVG as a React component

const AppointmentRequestModal = ({
  isOpen,
  onClose,
  requests,
  appointmentRequests,
}) => {
  // console.log("REQ: ",appointmentRequests)

  const dispatch = useDispatch();

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

  const handleAcceptClick = (id) => {
    // console.log("Accept")
    dispatch(acceptAppointmentRequests(id));
  };

  const handleRejectClick = (id) => {
    // console.log("Reject")
    dispatch(rejectAppointmentRequests(id));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <Button
            className="close-btn"
            onClick={onClose}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <img src={arrowBack} alt="Back" />
          </Button>
          <h2>Appointment Requests </h2>
          <span className="request-count">({appointmentRequests.length})</span>
        </div>
        <div className="modal-body">
          {appointmentRequests.length > 0 ? (
            appointmentRequests.map((request, index) => (
              <div key={index} className="request-item">
                <div className="request-info">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CCCCCC' width='50' height='50'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M2 20c0-4 3-7 7-7h6c4 0 7 3 7 7'/%3E%3C/svg%3E" // Default SVG
                    alt="Profile-img"
                    className="request-img"
                  />
                  <div className="request-text">
                    <p className="request-name">{request.patient.name}</p>
                    <p className="request-detail">{request.note}</p>
                  </div>
                </div>

                <div className="request-actions">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#25307F",
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => handleAcceptClick(request._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "white",
                      color: "red",
                      border: "2px solid red", // Red border
                      ".MuiSvgIcon-root": {
                        color: "red", // Ensures the cross icon is red
                      },
                      "&:hover": {
                        backgroundColor: "white", // Prevents background color change
                        border: "2px solid red", // Keeps border red on hover
                      },
                      "&:focus, &:active": {
                        outline: "none",
                        boxShadow: "none",
                        border: "2px solid red", // Ensures no blue border on focus/click
                      },
                    }}
                    onClick={() => handleRejectClick(request._id)}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div
              className="request-item"
              style={{
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#25307F",
              }}
            >
              No Requests Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestModal;
