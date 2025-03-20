import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";
import {useDispatch, useSelector} from "react-redux";
import {getBillById} from "../../../../../../components/State/Receptionist/Action.js"; // Import the SVG as a React component

const RecordModal = ({ open, bill, onClose,patient }) => {
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

  const billId = patient?.bills[patient.bills.length - 1]?._id;
  console.log("Bill :",billId)

  const dispatch = useDispatch();

  useEffect(() => {
    if(billId){
      dispatch(getBillById(billId));
    }
  }, [dispatch, billId]);

  const billByID = useSelector((store) => store.receptionist.bill);

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
              Billing Details: <span>{billByID?.patient.name}</span>
            </h2>
          </div>
          <Button className="print-btn">Print</Button>
        </div>
        <div className="billing-modal-body">
          <div className="billing-invoice-details">
            <div className="billing-no">
              <div>
                <span className="bold">Invoice Number</span>
                <span>{billByID?.invoiceNumber}</span>
              </div>
              <div>
                <span className="bold">Invoice Date</span>
                <span>{new Date(billByID?.invoiceDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                )}</span>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-invoice-amount">
              {billByID?.services.map((service, index) => (
                  <div key={index} className="billing-desc">
                    <div>
                      <span className="bold">Description</span>
                      <span>{service.name}</span>
                    </div>

                    {service.categories.map((cat, index) => (
                        <div key={index} className="billing-category">
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
                <div className="bold">{billByID?.totalAmount}</div>
              </div>
            </div>
          </div>
          <div className="billing-amount">
            <div className="billing-amount-details">
              <div>
                <div className="bold">Total Amount</div>
                <div>{billByID?.totalAmount}</div>
              </div>
              <div>
                <div className="bold">Paid</div>
                <div>{billByID?.paidAmount}</div>
              </div>
              <div>
                <div className="bold ">Outstanding</div>
                <div className="center">{billByID?.outstanding}</div>
              </div>
              <div>
                <div className="bold">Status</div>
                <div className="center">{billByID?.status}</div>
              </div>
            </div>
            <div className="billing-divider"></div>
            <div className="billing-history">
              <div className="bold">Payment History</div>
              <div className="billing-summary">
                <p>
                  Amount Paid: <span> {billByID?.paidAmount}</span>
                </p>
                <p>Mode: {bill?.mode}</p>
                <p>
                  Date: <span>{new Date(billByID?.invoiceDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                )}</span>
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
