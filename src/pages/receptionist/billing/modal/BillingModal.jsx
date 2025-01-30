import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./BillingModal.scss"; // Ensure this file exists

import arrowBack from "../../../../assets/arrow_back.svg"; // Import the SVG as a React component

const BillingModal = ({ open, bill, onClose }) => {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  if (!bill) return null; // Avoid rendering if no bill is selected

  return (
    <div
      className={`billing-modal-overlay ${open ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`billing-modal-content ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="billing-modal-header">
          <div className="header-content">
            <button className="close-btn" onClick={onClose}>
              <img src={arrowBack} alt="Back" />
            </button>
            <h2>
              Billing Details: <span>{bill.name}</span>
            </h2>
          </div>
          <Button className="print-btn">Print</Button>
        </div>
        <div className="billing-modal-body">
          <div className="billing-invoice-details">
            <div className="billing-no">
              <div>
                <span className="bold">Invoice Number</span>
                <span>INV20240919-VC-73</span>
              </div>
              <div>
                <span className="bold">Invoice Date</span>
                <span>{bill.date}</span>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-invoice-amount">
              <div className="billing-desc">
                <div>
                  <span className="bold">Description</span>
                  <span>Therapy Session</span>
                </div>
                <div>
                  <span className="bold">Quantity</span>
                  <span className="center">1</span>
                </div>
                <div>
                  <span className="bold">Price</span>
                  <span> {bill.amount}</span>
                </div>
              </div>
              <div className="billing-divider"></div>
              <div className="billing-total">
                <div className="bold">Total</div>
                <div className="bold">{bill.amount}</div>
              </div>
            </div>
          </div>
          <div className="billing-amount">
            <div className="billing-amount-details">
              <div>
                <div className="bold">Total Amount</div>
                <div>{bill.amount}</div>
              </div>
              <div>
                <div className="bold">Paid</div>
                <div>{bill.amount}</div>
              </div>
              <div>
                <div className="bold ">Outstanding</div>
                <div className="center">$0</div>
              </div>
              <div>
                <div className="bold">Status</div>
                <div className="center">{bill.status}</div>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-history">
              <div className="bold">Payment History</div>
              <div className="billing-summary">
                <p>
                  Amount Paid: <span> {bill.amount}</span>
                </p>
                <p>Mode: Cash</p>
                <p>
                  Date: <span>{bill.date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingModal;
