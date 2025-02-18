import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";

const RecordModal = ({ open, bill, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!bill) return null;

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
              Billing Details: <span>{bill.patient.name}</span>
            </h2>
          </div>
          <Button className="print-btn">Print</Button>
        </div>
        <div className="billing-modal-body">
          <div className="billing-invoice-details">
            <div className="billing-no">
              <div>
                <span className="bold">Invoice Number</span>
                <span>{bill.invoiceNumber}</span>
              </div>
              <div>
                <span className="bold">Invoice Date</span>
                <span>{new Date(bill.invoiceDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-invoice-amount">
              {bill.services.map((service, index) => (
                <div key={index} className="billing-desc">
                  <div>
                    <span className="bold">Description</span>
                    <span>{service.name}</span>
                  </div>
                  {service.categories.map((cat, i) => (
                    <div key={i} className="billing-category">
                      <div>{cat.category}</div>
                      <div>Qty: {cat.quantity}</div>
                      <div>Price: {cat.rate}</div>
                      <div>Total: {cat.total}</div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="billing-divider"></div>
              <div className="billing-total">
                <div className="bold">Total</div>
                <div className="bold">{bill.totalAmount}</div>
              </div>
            </div>
          </div>
          <div className="billing-amount">
            <div className="billing-amount-details">
              <div>
                <div className="bold">Total Amount</div>
                <div>{bill.totalAmount}</div>
              </div>
              <div>
                <div className="bold">Paid</div>
                <div>{bill.paidAmount}</div>
              </div>
              <div>
                <div className="bold ">Outstanding</div>
                <div className="center">{bill.outstanding}</div>
              </div>
              <div>
                <div className="bold">Status</div>
                <div className={`center status ${bill.status.toLowerCase()}`}>
                  {bill.status}
                </div>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-history">
              <div className="bold">Payment History</div>
              <div className="billing-summary">
                <p>
                  Amount Paid: <span> {bill.paidAmount}</span>
                </p>
                <p>Mode: {bill.mode}</p>
                <p>
                  Date:{" "}
                  <span>{new Date(bill.invoiceDate).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
