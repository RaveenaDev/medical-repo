import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";
import { X } from "lucide-react";
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
  console.log("original Bill", bill);
  const [isEditing, setIsEditing] = useState(false);
  const printRef = useRef(); // Reference for print container

  const [editableBill, setEditableBill] = useState({});
  console.log("Edited Bill", editableBill);

  useEffect(() => {
    if (bill) setEditableBill(JSON.parse(JSON.stringify(bill)));
  }, [bill]);

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
            <div className="heading-right">
              <button
                className="billing-edit-btn"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              <Button className="print-btn" onClick={handlePrint}>
                <img src="/assets/Print-icon.svg" />
              </Button>
            </div>
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
                    <div className="">
                      <div className="billing-description">
                        <p className="bold">Description</p>
                      </div>
                      <div className="billing-quantity">
                        <p className="bold">Quantity</p>
                      </div>
                      <div className="billing-price">
                        <p className="bold">Price</p>
                      </div>
                      {isEditing && (
                        <div className="billing-clearAll">
                          <button
                            className="clear-btn"
                            onClick={() => {
                              const updated = { ...editableBill };
                              updated.services[index].categories =
                                updated.services[index].categories.map(
                                  (cat) => ({
                                    ...cat,
                                    subCategoryName: "",
                                    quantity: 0,
                                    rate: 0,
                                  })
                                );
                              setEditableBill(updated);
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                    {editableBill?.services?.map((service, serviceIndex) =>
                      service.categories.map((cat, i) => (
                        <div key={i} className="billing-category">
                          <div className="billing-description">
                            {isEditing ? (
                              <input
                                className="inputDescription"
                                type="text"
                                value={cat.subCategoryName}
                                onChange={(e) => {
                                  const updated = { ...editableBill };
                                  updated.services[serviceIndex].categories[
                                    i
                                  ].subCategoryName = e.target.value;
                                  setEditableBill(updated);
                                }}
                              />
                            ) : (
                              <div>{cat.subCategoryName}</div>
                            )}
                          </div>

                          <div className="billing-quantity">
                            {isEditing ? (
                              <input
                                className="inputQuantity"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={cat.quantity}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    const updated = { ...editableBill };
                                    updated.services[serviceIndex].categories[
                                      i
                                    ].quantity = value;
                                    setEditableBill(updated);
                                  }
                                }}
                                onBlur={() => {
                                  const updated = { ...editableBill };
                                  const qtyValue =
                                    updated.services[serviceIndex].categories[i]
                                      .quantity || "0";
                                  updated.services[serviceIndex].categories[
                                    i
                                  ].quantity = String(parseInt(qtyValue, 10));
                                  setEditableBill(updated);
                                }}
                              />
                            ) : (
                              <div>{cat.quantity}</div>
                            )}
                          </div>

                          <div className="billing-price">
                            {isEditing ? (
                              <input
                                className="inputPrice"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={cat.rate}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Only allow digits (no letters or special chars)
                                  if (/^\d*$/.test(value)) {
                                    const updated = { ...editableBill };
                                    updated.services[serviceIndex].categories[
                                      i
                                    ].rate = value;
                                    setEditableBill(updated);
                                  }
                                }}
                                onBlur={() => {
                                  // Optional: Convert to number on blur
                                  const updated = { ...editableBill };
                                  const rateValue =
                                    updated.services[serviceIndex].categories[i]
                                      .rate || "0";
                                  updated.services[serviceIndex].categories[
                                    i
                                  ].rate = String(parseInt(rateValue, 10));
                                  setEditableBill(updated);
                                }}
                              />
                            ) : (
                              <div>₹{cat.rate}</div>
                            )}
                          </div>
                          {isEditing && (
                            <div className="billingCross">
                              <button
                                className="cross-btn"
                                onClick={() => {
                                  const updated = { ...editableBill };
                                  updated.services[
                                    serviceIndex
                                  ].categories.splice(i, 1); // remove 1 item at index i
                                  setEditableBill(updated);
                                }}
                              >
                                <X />
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}

                    {isEditing && (
                      <div className="billing-add">
                        <button
                          onClick={() => {
                            const updated = { ...editableBill };
                            // If no services, initialize it
                            if (
                              !updated.services ||
                              updated.services.length === 0
                            ) {
                              updated.services = [{ categories: [] }];
                            }
                            // Add a new empty category to the first service
                            updated.services[0].categories.push({
                              subCategoryName: "",
                              quantity: 1,
                              rate: 0,
                              total: 0,
                            });
                            setEditableBill(updated);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="billing-divider"></div>
                <div className="billing-total">
                  <div className="bold">Total</div>
                  <div className="bold">₹{bill.totalAmount}</div>
                </div>
              </div>
            </div>
            <div className="billing-amount">
              <div className="billing-amount-details">
                <div>
                  <div className="bold">Total Amount</div>
                  <div>₹{bill.totalAmount}</div>
                </div>
                <div>
                  <div className="bold">Paid</div>
                  <div>₹{bill.paidAmount}</div>
                </div>
                <div>
                  <div className="bold ">Outstanding</div>
                  <div className="center">₹{bill.outstanding}</div>
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
            <div className="billing-edited-save-btn">
              <button>Save</button>
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
