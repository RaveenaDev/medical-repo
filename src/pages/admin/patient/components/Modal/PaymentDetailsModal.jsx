import React, { useEffect } from "react";
import "./PaymentModal.scss";
import arrowBack from "/arrow_back.svg"; // Import the SVG as a React component
import { Button } from "@mui/material";

const PaymentDetailsModal = ({ open, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div
      className={`payment-modal-overlay ${open ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`payment-modal-content ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-modal-header">
          <div className="header-content">
            <h2>Payment Details</h2>
          </div>
          <div className="btns">
            <Button className="modal-btn blue">Refund</Button>
            <Button className="modal-btn blue">Add Advance Payment</Button>
            <svg
              onClick={onClose}
              width="40"
              height="40"
              viewBox="0 0 43 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.5" cy="24.5" r="21.5" fill="#25307F" />
              <path
                d="M27.344 16.088C27.5787 16.2373 27.7387 16.376 27.824 16.504C27.9093 16.632 27.92 16.792 27.856 16.984C27.8133 17.1547 27.6747 17.3893 27.44 17.688L17.36 30.84C17.1467 31.1173 16.9653 31.2987 16.816 31.384C16.6667 31.4907 16.528 31.5227 16.4 31.48C16.272 31.4587 16.1227 31.3947 15.952 31.288C15.76 31.1387 15.6213 31.0107 15.536 30.904C15.4507 30.776 15.44 30.6267 15.504 30.456C15.5893 30.264 15.7387 30.0187 15.952 29.72L26.032 16.568C26.3307 16.184 26.5547 15.9707 26.704 15.928C26.8533 15.864 27.0667 15.9173 27.344 16.088ZM16.016 16.088C16.208 15.9813 16.368 15.9173 16.496 15.896C16.624 15.8747 16.7413 15.9173 16.848 16.024C16.976 16.1307 17.136 16.312 17.328 16.568L27.408 29.72C27.6427 30.0187 27.792 30.264 27.856 30.456C27.92 30.6267 27.9093 30.776 27.824 30.904C27.76 31.0107 27.6213 31.1387 27.408 31.288C27.2373 31.3947 27.088 31.4587 26.96 31.48C26.832 31.5227 26.6933 31.4907 26.544 31.384C26.3947 31.2987 26.2133 31.1173 26 30.84L15.92 17.688C15.7067 17.3893 15.568 17.144 15.504 16.952C15.44 16.76 15.4507 16.6 15.536 16.472C15.6213 16.344 15.7813 16.216 16.016 16.088Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="payment-modal-details">
          <div>
            <p>Total Bill Amount</p>
            <h4 className="blue">
              <span>₹</span> 500
            </h4>
          </div>
          <div>
            <p>Paid</p>
            <h4 className="blue">
              <span>₹</span>500
            </h4>
          </div>
          <div>
            <p>Due</p>
            <h4 className="blue">0</h4>
          </div>
          <div>
            <p>Remaining Credits</p>
            <h4 className="blue"> 0</h4>
          </div>
        </div>
        <div className="payment-modal-body">
          <div className="btns end">
            <Button className="modal-btn blue">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_416_1361"
                  masktype="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_416_1361)">
                  <path
                    d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                    fill="#25307F"
                  />
                </g>
              </svg>
              <p> Add New Bill</p>
            </Button>
            <Button className="modal-btn blue">Refferal Billing</Button>
          </div>
          <div className="payment-invoice-details">
            <div className="invoice-heading">
              <div>Invoice Number</div>
              <div>Date</div>
              <div>Patient Name</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <div className="invoice-details">
              <div>INV-001</div>
              <div>2022-01-15</div>
              <div>John Doe</div>
              <div>Unpaid</div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_416_1415"
                    masktype="alpha"
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
                  <g mask="url(#mask0_416_1415)">
                    <path
                      d="M14 2L24 12L14 22L12.225 20.225L20.45 12L12.225 3.775L14 2Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="payment-amount">
            <p className="blue">Refund detail</p>
            <div className="refund-details">
              <div className="refund-heading">
                <div>Refund Amount</div>
                <div>Date</div>
                <div>Invoice Number</div>
              </div>
              <div>No Data Found </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
