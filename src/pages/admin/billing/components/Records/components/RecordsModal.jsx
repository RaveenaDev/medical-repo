import React, { useEffect, useRef } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";
import printJS from "print-js"; // Import print-js
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
  const printRef = useRef(); // Reference for print container
  const handlePrint = () => {
    printJS({
      printable: "printable-bill",
      type: "html",
      scanStyles: false, // Prevents unwanted styles from affecting the print
      style: `
        body { font-family: Arial, sans-serif; font-size: 14px; margin: 0; padding: 20px; }
        .print-container { padding: 20px; border: 1px solid #ccc; width: 100%; max-width: 600px; margin: auto; }
        h2 { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; }
      `,
    });
  };
  if (!open || !bill) return null;

  return (
    <>
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
            <Button className="print-btn" onClick={handlePrint}>
              Print
            </Button>
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
                  <span>
                    {new Date(bill.invoiceDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
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
                        <div>{cat.subCategoryName}</div>
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
                    <span>
                      {new Date(bill.invoiceDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden Printable Section */}
      <div style={{ display: "none" }}>
        <div id="printable-bill" className="print-container" ref={printRef}>
          <h2>Invoice</h2>
          <p>
            <b>Invoice Number:</b> {bill.invoiceNumber}
          </p>
          <p>
            <b>Invoice Date:</b>{" "}
            {new Date(bill.invoiceDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <hr />
          <h3>Services</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.services?.map((service, index) =>
                service.categories?.map((cat, idx) => (
                  <tr key={`${index}-${idx}`}>
                    <td>{cat.subCategoryName}</td>
                    <td>{cat.quantity}</td>
                    <td>₹{cat.rate}</td>
                    <td>₹{cat.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <hr />
          <h3 className="total">Total Amount: ₹{bill.totalAmount}</h3>
        </div>
      </div>
    </>
  );
};

export default RecordModal;
