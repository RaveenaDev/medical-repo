import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";
import { X } from "lucide-react";
import printJS from "print-js"; // Import print-js
import { editBill } from "../../../../../../components/State/Admin/Action";
import { useDispatch } from "react-redux";
const RecordModal = ({ open, bill, onClose, billId }) => {
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
  useEffect(() => {
    if (!open && bill) {
      setIsEditing(false);
      setEditableBill(JSON.parse(JSON.stringify(bill)));
    }
  }, [open, bill]);
  const dispatch = useDispatch();
  console.log("original Bill", bill);
  const [isEditing, setIsEditing] = useState(false);
  const printRef = useRef(); // Reference for print container

  const [editableBill, setEditableBill] = useState({});
  // console.log("Edited Bill", editableBill);
  const printGrand = (editableBill?.services || []).reduce((s, r) => {
    const q = Number.isFinite(+r.quantity) ? +r.quantity : 0;
    const pr = Number.isFinite(+r.rate) ? +r.rate : 0;
    return s + q * pr;
  }, 0);
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
  const computedGrand = (editableBill?.services || []).reduce((sum, r) => {
    const q = Number.isFinite(+r.quantity) ? +r.quantity : 0;
    const pr = Number.isFinite(+r.rate) ? +r.rate : 0;
    return sum + q * pr;
  }, 0);

  const handleSave = async () => {
    const servicesPayload = (editableBill?.services || []).map((r) => ({
      service: r.serviceId, // ObjectId or string id
      category: r.category ?? r.service?.name ?? r.service ?? "Service",
      quantity: Number(r.quantity) || 0,
      rate: Number(r.rate) || 0,
      details: r.details || undefined, // preserved if present
    }));

    const payload = {
      services: servicesPayload,
      paidAmount: Number(editableBill?.paidAmount ?? bill?.paidAmount ?? 0),
      status: editableBill?.status ?? bill?.status,
      mode: editableBill?.mode ?? bill?.mode,
    };

    await dispatch(editBill(payload, billId));

    setIsEditing(false);
  };

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
                onClick={() => {
                  if (isEditing) {
                    // Cancel -> revert edits back to original bill
                    if (bill) setEditableBill(JSON.parse(JSON.stringify(bill)));
                    setIsEditing(false);
                  } else {
                    setIsEditing(true);
                  }
                }}
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
                <div className="billing-desc">
                  {/* Header row (unchanged) */}
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
                            const updated = JSON.parse(
                              JSON.stringify(editableBill)
                            );
                            updated.services = (updated.services || []).map(
                              (row) => ({
                                ...row,
                                // keep description fields as-is; zero only numeric fields
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

                  {/* Render each service as one line */}
                  {(editableBill?.services || []).map((row, i) => {
                    const desc =
                      row.category ||
                      row.service ||
                      row.details?.description ||
                      "—";
                    const qty = Number.isFinite(+row.quantity)
                      ? +row.quantity
                      : 0;
                    const rate = Number.isFinite(+row.rate) ? +row.rate : 0;

                    return (
                      <div key={i} className="billing-category">
                        <div className="billing-description">
                          <div>{desc}</div>
                        </div>

                        <div className="billing-quantity">
                          {isEditing ? (
                            <input
                              className="inputQuantity"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={String(row.quantity ?? "")}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D+/g, "");
                                const updated = JSON.parse(
                                  JSON.stringify(editableBill)
                                );
                                updated.services[i].quantity =
                                  v === "" ? "" : Number(v);
                                setEditableBill(updated);
                              }}
                              onBlur={() => {
                                const updated = JSON.parse(
                                  JSON.stringify(editableBill)
                                );
                                updated.services[i].quantity =
                                  Number(updated.services[i].quantity) || 0;
                                setEditableBill(updated);
                              }}
                            />
                          ) : (
                            <div>{qty}</div>
                          )}
                        </div>

                        <div className="billing-price">
                          {isEditing ? (
                            <input
                              className="inputPrice"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={String(row.rate ?? "")}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D+/g, "");
                                const updated = JSON.parse(
                                  JSON.stringify(editableBill)
                                );
                                updated.services[i].rate =
                                  v === "" ? "" : Number(v);
                                setEditableBill(updated);
                              }}
                              onBlur={() => {
                                const updated = JSON.parse(
                                  JSON.stringify(editableBill)
                                );
                                updated.services[i].rate =
                                  Number(updated.services[i].rate) || 0;
                                setEditableBill(updated);
                              }}
                            />
                          ) : (
                            <div>₹{rate}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="billing-divider"></div>

                {/* Totals (computed from editableBill.services) */}
                {(() => {
                  const grand = (editableBill?.services || []).reduce(
                    (sum, r) => {
                      const q = Number.isFinite(+r.quantity) ? +r.quantity : 0;
                      const pr = Number.isFinite(+r.rate) ? +r.rate : 0;
                      return sum + q * pr;
                    },
                    0
                  );
                  return (
                    <div className="billing-total">
                      <div className="bold">Total</div>
                      <div className="bold">₹{grand}</div>
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="billing-amount">
              <div className="billing-amount-details">
                <div>
                  <div className="bold">Total Amount</div>
                  <div>₹{isEditing ? computedGrand : bill.totalAmount}</div>
                </div>

                <div>
                  <div className="bold">Paid</div>
                  {isEditing ? (
                    <input
                      className="inputPaid"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={String(
                        editableBill.paidAmount ?? bill.paidAmount ?? 0
                      )}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D+/g, "");
                        setEditableBill((prev) => ({
                          ...prev,
                          paidAmount: v === "" ? "" : Number(v),
                        }));
                      }}
                      onBlur={() =>
                        setEditableBill((prev) => ({
                          ...prev,
                          paidAmount: Number(prev.paidAmount) || 0,
                        }))
                      }
                    />
                  ) : (
                    <div>₹{bill.paidAmount}</div>
                  )}
                </div>

                <div>
                  <div className="bold ">Outstanding</div>
                  <div className="center">
                    ₹
                    {isEditing
                      ? Math.max(
                          computedGrand -
                            Number(
                              editableBill.paidAmount ?? bill.paidAmount ?? 0
                            ),
                          0
                        )
                      : bill.outstanding}
                  </div>
                </div>

                <div>
                  <div className="bold">Status</div>
                  {isEditing ? (
                    <select
                      className="inputStatus"
                      value={String(
                        editableBill.status ?? bill.status ?? "Pending"
                      )}
                      onChange={(e) =>
                        setEditableBill((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  ) : (
                    <div
                      className={`center status ${bill.status.toLowerCase()}`}
                    >
                      {bill.status}
                    </div>
                  )}
                </div>
              </div>
              <div className="billing-divider"></div>
              <div className="billing-history">
                <div className="bold">Payment History</div>
                <div className="billing-summary">
                  <p>
                    Amount Paid: <span> {bill.paidAmount}</span>
                  </p>
                  <p>
                    Mode:
                    <span>
                      {isEditing ? (
                        <select
                          className="inputMode"
                          value={String(
                            editableBill.mode ?? bill.mode ?? "Cash"
                          )}
                          onChange={(e) =>
                            setEditableBill((prev) => ({
                              ...prev,
                              mode: e.target.value,
                            }))
                          }
                        >
                          <option value="Cash">Cash</option>

                          <option value="Online">Online</option>
                        </select>
                      ) : (
                        <span> {bill.mode}</span>
                      )}
                    </span>
                  </p>
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
            {isEditing && (
              <div className="billing-edited-save-btn">
                <button onClick={handleSave}>Save</button>
              </div>
            )}
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
              {(editableBill?.services || []).map((row, idx) => {
                const desc =
                  row.category ||
                  row.service ||
                  row.details?.description ||
                  "—";
                const qty = Number.isFinite(+row.quantity) ? +row.quantity : 0;
                const rate = Number.isFinite(+row.rate) ? +row.rate : 0;
                const total = qty * rate;
                return (
                  <tr key={idx}>
                    <td>{desc}</td>
                    <td>{qty}</td>
                    <td>₹{rate}</td>
                    <td>₹{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
          <h3 className="total">Total Amount: ₹{printGrand}</h3>
        </div>
      </div>
    </>
  );
};

export default RecordModal;
