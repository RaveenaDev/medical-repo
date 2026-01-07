import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Grid,
  InputAdornment,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import styles from "./billDetailsReception.module.scss";

import arrowBack from "/arrow_back.svg";
import printJS from "print-js"; // Import print-js

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDiscount,
  addPaymentToBill,
  addToBill,
  editBill,
  getBillDetails,
} from "../../../../components/State/Receptionist/Action";

const BillDetailsReception = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const { billId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      setLoading(true);
      try {
        await dispatch(getBillDetails(billId));
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [dispatch, billId]);

  const bill = useSelector((s) => s.admin?.billingRecord ?? null);

  useEffect(() => {
    if (bill) {
      setIsEditing(false); // ensure read-only initially
      setEditableBill(JSON.parse(JSON.stringify(bill)));
    }
  }, [bill]);
  console.log("original Bill", bill);
  // console.log("editable Bill", billId);
  const [isEditing, setIsEditing] = useState(false);
  const printRef = useRef(); // Reference for print container

  const [editableBill, setEditableBill] = useState({});

  const [addOpen, setAddOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    category: "",
    quantity: "1",
    rate: "0",
    details: "",
    date: "",
  });
  const [addErrors, setAddErrors] = useState({});

  const parseIntSafe = (v, fallback = 0) => {
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const lineTotal = parseIntSafe(addForm.quantity) * parseIntSafe(addForm.rate);

  const openAddDialog = () => setAddOpen(true);
  const closeAddDialog = () => {
    setAddOpen(false);
    setAddErrors({});
    setAddForm({ category: "", quantity: "1", rate: "0", details: "" });
  };

  // ---- Add Payment Dialog ----
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [addPaymentLoading, setAddPaymentLoading] = useState(false);
  const [addPaymentForm, setAddPaymentForm] = useState({
    amount: "",
    mode: "",
    reference: "",
  });
  const [addPaymentErrors, setAddPaymentErrors] = useState({});

  const openAddPayment = () => setAddPaymentOpen(true);
  const closeAddPayment = () => {
    setAddPaymentOpen(false);
    setAddPaymentErrors({});
    setAddPaymentForm({ amount: "", mode: "", reference: "", billId: billId });
  };
  // Validation function
  const validateAddPaymentForm = (form) => {
    const errors = {};

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      errors.amount = "Enter a valid amount";
    }

    if (!form.mode) {
      errors.mode = "Select a payment mode";
    }

    return errors;
  };

  // Submit handler
  const handleAddPaymentSubmit = async () => {
    const errors = validateAddPaymentForm(addPaymentForm);
    if (Object.keys(errors).length > 0) {
      setAddPaymentErrors(errors);
      return;
    }

    try {
      setAddPaymentLoading(true);

      await dispatch(addPaymentToBill(billId, addPaymentForm));

      closeAddPayment(); // reset & close if success
    } catch (err) {
      console.error(err);
      setAddPaymentErrors({ general: "Failed to add payment" });
    } finally {
      setAddPaymentLoading(false);
    }
  };

  const handleAddChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "quantity" || field === "rate") {
      value = value.replace(/\D+/g, ""); // digits only
    }
    setAddForm((p) => ({ ...p, [field]: value }));
  };

  const validateAdd = () => {
    const errs = {};
    if (!addForm.category.trim()) errs.category = "Category is required";
    if (parseIntSafe(addForm.quantity) <= 0) errs.quantity = "Must be > 0";
    if (parseIntSafe(addForm.rate) < 0) errs.rate = "Cannot be negative";
    setAddErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = async () => {
    if (!validateAdd()) return;
    setAddLoading(true);
    try {
      const payload = {
        category: addForm.category.trim(),
        quantity: parseIntSafe(addForm.quantity, 0),
        rate: parseIntSafe(addForm.rate, 0),
        details: addForm.details || undefined,
        date: addForm.date,
      };

      const action = await dispatch(addToBill(payload, billId));
      closeAddDialog();
    } catch (e) {
      console.error(e);
      // You can replace with a toast
      toast.error("Failed to add to bill. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setAddLoading(false);
    }
  };

  // console.log("Edited Bill", editableBill);

  const handlePrint = () => {
    printJS({
      printable: "printable-bill",
      type: "html",
      scanStyles: false,
      style: `
      @page { size: A4; margin: 6mm; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: Arial, sans-serif; font-size: 12px; color: #111; }
      .bill-wrap { border: 1px solid #222; padding: 10px; }
      .bill-head { display: flex; gap: 10px; align-items: center; }
      .bill-head .logo { width: 64px; height: 64px; object-fit: contain; }
      .bill-head .titleblock { flex: 1; }
      .bill-title { font-size: 16px; font-weight: 700; letter-spacing: 0.5px; text-align: center; margin: 6px 0 12px; }
      .muted { color: #555; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; margin-top: 8px; }
      .box { border: 1px solid #999; padding: 8px; border-radius: 2px; }
      .section-title { font-weight: 700; margin-bottom: 6px; font-size: 12px; }
      table.bill { width: 100%; border-collapse: collapse; margin-top: 10px; }
      table.bill th, table.bill td { border: 1px solid #000; padding: 6px; }
      table.bill th { background: #f2f2f2; text-align: left; }
      table.bill .right { text-align: right; }
      table.bill .center { text-align: center; }
      .totals { margin-top: 12px; width: 100%; }
      .totals .row { display: grid; grid-template-columns: 1fr auto; gap: 12px; margin: 4px 0; }
      .totals .label { text-align: right; }
      .totals .value { min-width: 120px; text-align: right; }
      .amount-words { border: 1px dashed #999; padding: 8px; margin-top: 10px; font-style: italic; }
      .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
      .sig-box { height: 64px; border: 1px solid #999; padding: 8px; display: flex; align-items: flex-end; justify-content: space-between; }
      .footnote { margin-top: 16px; text-align: center; font-size: 11px; color: #444; }
    `,
    });
  };

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

    // console.log("servicesPayload", servicesPayload);
    const payload = {
      services: servicesPayload,
      paidAmount: Number(editableBill?.paidAmount ?? bill?.paidAmount ?? 0),
      status: editableBill?.status ?? bill?.status,
      mode: editableBill?.mode ?? bill?.mode,
    };

    await dispatch(editBill(payload, billId));

    setIsEditing(false);
  };
  // ---- Helpers for print ----
  const safeNum = (v) => (Number.isFinite(+v) ? +v : 0);

  // Convert 0..99,99,99,999 into Indian words (rupees only)
  const amountInWordsINR = (num) => {
    num = Math.round(safeNum(num));
    if (num === 0) return "Zero rupees only";
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const two = (n) =>
      n < 20
        ? ones[n]
        : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    const three = (n) => {
      const h = Math.floor(n / 100),
        r = n % 100;
      return (
        (h ? ones[h] + " Hundred" + (r ? " " : "") : "") + (r ? two(r) : "")
      );
    };

    let out = "";
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thou = Math.floor(num / 1000);
    num %= 1000;
    const hund = num;

    if (crore) out += three(crore) + " Crore ";
    if (lakh) out += three(lakh) + " Lakh ";
    if (thou) out += three(thou) + " Thousand ";
    if (hund) out += three(hund);

    return (out.trim() + " rupees only").replace(/\s+/g, " ");
  };

  // Build GST-aware rows for print (gstPct optional; HSN/SAC optional)
  const printRows = (editableBill?.services || []).map((row) => {
    const qty = safeNum(row.quantity);
    const rate = safeNum(row.rate);
    const base = qty * rate;

    const gstPct = Number.isFinite(+row.gstPct)
      ? +row.gstPct
      : Number.isFinite(+row.details?.gstPct)
      ? +row.details.gstPct
      : 0;

    const gstAmt = +((base * gstPct) / 100).toFixed(2);
    const lineTotal = +(base + gstAmt).toFixed(2);

    const desc = row.category || row.service || row.details?.description || "—";
    const name =
      row.details?.doctorName ||
      row.details?.bedType ||
      row.details?.name ||
      row.category ||
      "—";
    const hsn = row.hsnSac ?? row.details?.hsnSac ?? "";

    const date =
      row.details?.consultationDate ||
      row.details?.billedDate ||
      row.date ||
      row.details?.date ||
      bill.invoiceDate ||
      "-";
    return {
      desc,
      name,
      date,
      hsn,
      qty,
      rate,
      base,
      gstPct,
      gstAmt,
      lineTotal,
      raw: row,
    };
  });

  const hasGST = printRows.some((r) => r.gstPct > 0);
  const subTotal = printRows.reduce((a, r) => a + r.base, 0);
  const taxTotal = printRows.reduce((a, r) => a + r.gstAmt, 0);
  const grossTotal = +(subTotal + taxTotal).toFixed(2);
  const roundOff = +(Math.round(grossTotal) - grossTotal).toFixed(2);
  const netPayable = +(grossTotal + roundOff).toFixed(2);

  const paidAmt = safeNum(editableBill?.paidAmount ?? bill?.paidAmount ?? 0);
  const balanceDue = Math.max(netPayable - paidAmt, 0);

  // Hospital/patient convenience fields
  const hospital = bill?.hospital || {};
  const hospitalName = hospital?.name || "SAI ASHA HOSPITAL";
  const hospitalAddr =
    hospital?.address ||
    "MEDICINE/ORTHOPAEDIC/SURGERY/MATERNITY/PADEDIATRIC/DENTAL";
  const hospitalPhone =
    hospital?.phone ||
    "05, 1ST FLOOR, LAXCON PLAZA,PLOT NO.20 & 21, SECTOR-19, NERUL";
  const hospitalGstin = hospital?.gstin || ""; // optional
  const hospitalPan = hospital?.pan || ""; // optional
  const logoUrl = hospital?.logoUrl || ""; // optional
  const normalizeCategory = (name) => {
    if (!name) return "Other";

    const lower = name.toLowerCase().trim();

    // Add your category normalization rules here:
    if (lower.includes("room")) return "Room Charges";
    if (lower.includes("consult")) return "Consultation";
    if (lower.includes("lab")) return "Lab Tests";
    if (lower.includes("medicine") || lower.includes("drug"))
      return "Medicines";
    if (lower.includes("surgery")) return "Surgery";

    return name.trim();
  };

  // Group printRows by category
  const groupedRows = printRows.reduce((acc, row) => {
    const category = normalizeCategory(row.desc || row.category || "Other");
    if (!acc[category]) acc[category] = [];
    acc[category].push(row);
    return acc;
  }, {});

  // DISCOUNT

  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountForm, setDiscountForm] = useState({
    type: "Flat", // Flat | Percentage
    value: "",
    reason: "",
  });
  const [discountErrors, setDiscountErrors] = useState({});
  const openDiscount = () => setDiscountOpen(true);

  const closeDiscount = () => {
    setDiscountOpen(false);
    setDiscountErrors({});
    setDiscountForm({ type: "Flat", value: "", reason: "" });
  };
  const validateDiscount = () => {
    const errors = {};
    const gross = bill?.grossAmount || bill?.totalAmount || 0;

    if (!discountForm.value || discountForm.value <= 0) {
      errors.value = "Enter a valid value";
    }

    if (discountForm.type === "Percentage" && discountForm.value > 100) {
      errors.value = "Percentage cannot exceed 100";
    }

    if (discountForm.type === "Flat" && discountForm.value > gross) {
      errors.value = "Discount cannot exceed total amount";
    }

    setDiscountErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleApplyDiscount = async () => {
    if (!validateDiscount()) return;

    try {
      setDiscountLoading(true);

      await dispatch(addDiscount(discountForm, billId));

      await dispatch(getBillDetails(billId)); // refresh bill
      closeDiscount();
    } catch (err) {
      console.error(err);
    } finally {
      setDiscountLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderWrap}>
        <CircularProgress sx={{ color: "#25307F" }} size={58} />
        <p>Loading bill details...</p>
      </div>
    );
  }

  return (
    <div className={`${styles["billing-modal-overlay"]}`}>
      <div className={`${styles["billing-modal-content"]} `}>
        <div className={styles["billing-modal-header"]}>
          <div className={styles["header-content"]}>
            <button
              className={styles["close-btn"]}
              onClick={() => navigate(-1)}
            >
              <img src={arrowBack} alt="Back" />
            </button>
            <h2>
              Billing Details: <span>{bill?.patient?.name}</span>
            </h2>
          </div>
          <div className={styles["heading-right"]}>
            <button
              className={styles["billing-edit-btn"]}
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

            <Button className={styles["print-btn"]} onClick={handlePrint}>
              <img src="/assets/Print-icon.svg" />
            </Button>
          </div>
        </div>
        <div className={styles["billing-modal-body"]}>
          <div className={styles["billing-invoice-details"]}>
            <div className={styles["billing-no"]}>
              <div>
                <span className={styles["bold"]}>Patient Name</span>
                <span>{bill?.patient?.name || "Not provided"}</span>
              </div>
              <div>
                <span className={styles["bold"]}>Invoice Number</span>
                <span>{bill?.invoiceNumber}</span>
              </div>
              <div>
                <span className={styles["bold"]}>Patient Number</span>
                <span>{bill?.patient?.phone || "Not provided"}</span>
              </div>

              <div>
                <span className={styles["bold"]}>Invoice Date</span>
                <span>
                  {new Date(bill?.invoiceDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {bill?.insurance && bill?.insurance?.hasInsurance && (
              <>
                <div className={styles["billing-divider"]}></div>
                <div className={styles["billing-insurance-details"]}>
                  <div>
                    <span className={styles["bold"]}>Insurance Company</span>
                    <span>
                      {bill.insurance.insuranceCompany || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Policy Number</span>
                    <span>{bill.insurance.policyNumber || "Not provided"}</span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Insurance ID</span>
                    <span>
                      {bill.insurance.insuranceIdNumber || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Employee Code</span>
                    <span>{bill.insurance.employeeCode || "Not provided"}</span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Employer Name</span>
                    <span>{bill.insurance.employerName || "Not provided"}</span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Insurance Period</span>
                    <span>
                      {bill.insurance.insuranceStartDate
                        ? `${new Date(
                            bill.insurance.insuranceStartDate
                          ).toLocaleDateString("en-IN")} — ${
                            bill.insurance.insuranceExpiryDate
                              ? new Date(
                                  bill.insurance.insuranceExpiryDate
                                ).toLocaleDateString("en-IN")
                              : "N/A"
                          }`
                        : "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Approval Status</span>
                    <span
                      className={`${styles["status"]} ${String(
                        bill.insurance.insuranceApproved || ""
                      ).toLowerCase()}`}
                    >
                      {bill.insurance.insuranceApproved || "Pending"}
                    </span>
                  </div>
                  <div>
                    <span className={styles["bold"]}>Amount Approved</span>
                    <span>
                      ₹
                      {(bill.insurance.amountApproved ?? 0).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className={styles["billing-divider"]}></div>
            <div className={styles["billing-invoice-amount"]}>
              <div className={styles["billing-desc"]}>
                {/* Header row (unchanged) */}
                <div className={styles["billing-table-header"]}>
                  <div className={styles["billing-description"]}>
                    <p className={styles["bold"]}>Category</p>
                  </div>
                  <div className={styles["billing-name"]}>
                    <p className={styles["bold"]}>Name</p>
                  </div>
                  <div className={styles["billing-name"]}>
                    <p className={styles["bold"]}>Type</p>
                  </div>
                  <div className={styles["billing-date"]}>
                    <p className={styles["bold"]}>Date</p>
                  </div>
                  <div className={styles["billing-quantity"]}>
                    <p className={styles["bold"]}>Quantity</p>
                  </div>

                  <div className={styles["billing-price"]}>
                    <p className={styles["bold"]}>Price</p>
                  </div>
                </div>

                {/* Render each service as one line */}
                {(editableBill?.services || []).map((row, i) => {
                  const desc =
                    row.category ||
                    row.service ||
                    row.details?.description ||
                    "—";

                  const name =
                    row.details?.doctorName ||
                    row.details?.bedNumber ||
                    row.details?.name ||
                    "—";

                  const type = row.details?.bedType || "—";
                  const qty = Number.isFinite(+row.quantity)
                    ? +row.quantity
                    : 0;

                  const date =
                    row.details?.consultationDate ||
                    row.details?.billedDate ||
                    row.date ||
                    row.details?.date ||
                    "";
                  const rate = Number.isFinite(+row.rate) ? +row.rate : 0;
                  // console.log("service", row);
                  const getEditableNameKey = (details = {}) => {
                    if (details.doctorName !== undefined) return "doctorName";
                    if (details.bedNumber !== undefined) return "bedNumber";
                    return "name"; // fallback
                  };

                  return (
                    <div key={i} className={styles["billing-category"]}>
                      <div className={styles["billing-description"]}>
                        {isEditing ? (
                          <input
                            className={styles["inputDescription"]}
                            type="text"
                            inputMode="text"
                            value={desc}
                            onChange={(e) => {
                              const updated = JSON.parse(
                                JSON.stringify(editableBill)
                              );
                              updated.services[i].category = e.target.value;
                              setEditableBill(updated);
                            }}
                            onBlur={() => {
                              const updated = JSON.parse(
                                JSON.stringify(editableBill)
                              );
                              updated.services[i].category =
                                updated.services[i].category || "";
                              setEditableBill(updated);
                            }}
                          />
                        ) : (
                          <div>{desc}</div>
                        )}
                      </div>
                      <div className={styles["billing-name"]}>
                        {isEditing ? (
                          <input
                            className={styles["inputDescription"]}
                            type="text"
                            inputMode="text"
                            value={name}
                            onChange={(e) => {
                              const updated = JSON.parse(
                                JSON.stringify(editableBill)
                              );

                              if (!updated.services[i].details) {
                                updated.services[i].details = {};
                              }

                              const key = getEditableNameKey(
                                updated.services[i].details
                              );
                              updated.services[i].details[key] = e.target.value; // ✅ dynamic field

                              setEditableBill(updated);
                            }}
                            onBlur={() => {
                              const updated = JSON.parse(
                                JSON.stringify(editableBill)
                              );

                              if (!updated.services[i].details) {
                                updated.services[i].details = {};
                              }

                              const key = getEditableNameKey(
                                updated.services[i].details
                              );
                              updated.services[i].details[key] =
                                updated.services[i].details[key] || "";

                              setEditableBill(updated);
                            }}
                          />
                        ) : (
                          <div>{name || "—"}</div>
                        )}
                      </div>
                      <div className={styles["billing-name"]}>
                        <div>{type ? type : "—"}</div>
                      </div>
                      <div className={styles["billing-date"]}>
                        <div>
                          {date ? new Date(date).toLocaleDateString() : "—"}
                        </div>
                      </div>
                      <div className={styles["billing-quantity"]}>
                        {isEditing ? (
                          <input
                            className={styles["inputQuantity"]}
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

                      <div className={styles["billing-price"]}>
                        {isEditing ? (
                          <input
                            className={styles["inputPrice"]}
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
                          <div>₹{rate.toLocaleString("en-IN")}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles["billing-divider"]}></div>

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
                  <div className={styles["billing-total"]}>
                    <div className={styles["bold"]}>Total</div>
                    <div className={styles["bold"]}>
                      ₹{grand.toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          {isEditing ? (
            <div className={styles["billing-edited-save-btn"]}>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </div>
          ) : (
            <div className={styles["billing-edited-save-btn"]}>
              <Button variant="contained" onClick={openAddDialog}>
                Add to Bill
              </Button>
            </div>
          )}
          <div className={styles["billing-amount"]}>
            <div className={styles["billing-amount-details"]}>
              <div>
                <div className={styles["bold"]}>Total Amount</div>
                <div>
                  ₹
                  {isEditing
                    ? computedGrand
                    : editableBill?.totalAmount.toLocaleString("en-IN") ??
                      bill.totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
              {bill?.discount?.amount > 0 && (
                <div>
                  <div className={styles["bold"]}>Discount</div>
                  <div style={{ color: "red" }}>
                    - ₹{bill.discount.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              )}

              <div>
                <div className={styles["bold"]}>Paid</div>

                <div>₹{bill.paidAmount.toLocaleString("en-IN")}</div>
              </div>

              <div>
                <div className={styles["bold"]}>Outstanding</div>
                <div className={styles["center"]}>
                  ₹<>{bill.outstanding.toLocaleString("en-IN")}</>
                </div>
              </div>

              <div>
                <div className={styles["bold"]}>Status</div>

                <div
                  className={`${styles["center"]} ${styles["status"]} ${
                    editableBill?.status || bill.status
                      ? styles[
                          (editableBill?.status || bill.status).toLowerCase()
                        ]
                      : ""
                  }`}
                >
                  {isEditing ? (
                    <select
                      className={`${styles["statusSelect"]}`}
                      value={editableBill?.status ?? bill.status}
                      onChange={(e) => {
                        const updated = JSON.parse(
                          JSON.stringify(editableBill)
                        );
                        updated.status = e.target.value;
                        setEditableBill(updated);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  ) : (
                    <div>{editableBill?.status ?? bill.status}</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles["billing-divider"]}></div>
            <div className={styles["billing-history"]}>
              <div className={styles["payment-heading"]}>Payment History</div>
              {bill.payments && bill.payments.length > 0 ? (
                <div>
                  <div className={styles["payment-list-header"]}>
                    <div className={styles["payment-list-header-item"]}>
                      <span>Date</span>
                    </div>
                    <div className={styles["payment-list-header-item"]}>
                      <span>Amount</span>
                    </div>
                    <div className={styles["payment-list-header-item"]}>
                      <span>Mode</span>
                    </div>
                    <div className={styles["payment-list-header-item"]}>
                      <span>Reference</span>
                    </div>
                  </div>
                  <div className={styles["payment-list"]}>
                    {bill.payments.map((payment) => (
                      <div
                        className={styles["billing-summary"]}
                        key={payment._id}
                      >
                        <p>
                          <span>
                            {new Date(payment.date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </p>
                        <p>
                          <span>₹{payment.amount.toLocaleString("en-IN")}</span>
                        </p>
                        <p>
                          <span>
                            <span> {payment?.mode}</span>
                          </span>
                        </p>

                        <p>
                          <span> {payment?.reference || "N/A"}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className={styles["no-records"]}>
                  No payments recorded yet.
                </p>
              )}
            </div>
          </div>
          <div className={styles["billing-edited-save-btn"]}>
            <Button variant="contained" onClick={openAddPayment}>
              Add Payment
            </Button>
            <Button variant="outlined" color="error" onClick={openDiscount}>
              Apply Discount
            </Button>
          </div>
        </div>
      </div>
      {/* DISCOUNT Dialog  */}

      <Dialog
        open={discountOpen}
        onClose={discountLoading ? undefined : closeDiscount}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Apply Discount</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Type */}
            <TextField
              select
              label="Discount Type"
              value={discountForm.type}
              onChange={(e) =>
                setDiscountForm((p) => ({ ...p, type: e.target.value }))
              }
              fullWidth
            >
              <MenuItem value="Flat">Flat</MenuItem>
              <MenuItem value="Percentage">Percentage</MenuItem>
            </TextField>

            {/* Value */}
            <TextField
              label={
                discountForm.type === "Percentage" ? "Percentage (%)" : "Amount"
              }
              value={discountForm.value}
              onChange={(e) =>
                setDiscountForm((p) => ({
                  ...p,
                  value: Number(e.target.value),
                }))
              }
              error={!!discountErrors.value}
              helperText={discountErrors.value}
              fullWidth
              InputProps={{
                startAdornment:
                  discountForm.type === "Flat" ? (
                    <InputAdornment position="start">₹</InputAdornment>
                  ) : null,
              }}
            />

            {/* Reason */}
            <TextField
              label="Reason (optional)"
              value={discountForm.reason}
              onChange={(e) =>
                setDiscountForm((p) => ({ ...p, reason: e.target.value }))
              }
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDiscount} disabled={discountLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyDiscount}
            disabled={discountLoading}
            startIcon={discountLoading ? <CircularProgress size={18} /> : null}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add to Bill Dialog  */}
      <Dialog
        open={addOpen}
        onClose={addLoading ? undefined : closeAddDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add to Bill</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Category"
              value={addForm.category}
              onChange={handleAddChange("category")}
              error={!!addErrors.category}
              helperText={addErrors.category}
              fullWidth
              autoFocus
            />
            <TextField
              label="Date"
              type="date"
              value={addForm.date || ""}
              onChange={handleAddChange("date")}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!addErrors.date}
              helperText={addErrors.date}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  value={addForm.quantity}
                  onChange={handleAddChange("quantity")}
                  onBlur={() =>
                    setAddForm((p) => ({
                      ...p,
                      quantity: String(parseIntSafe(p.quantity, 1)),
                    }))
                  }
                  error={!!addErrors.quantity}
                  helperText={addErrors.quantity}
                  fullWidth
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Rate"
                  value={addForm.rate}
                  onChange={handleAddChange("rate")}
                  onBlur={() =>
                    setAddForm((p) => ({
                      ...p,
                      rate: String(parseIntSafe(p.rate, 0)),
                    }))
                  }
                  error={!!addErrors.rate}
                  helperText={addErrors.rate}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                    inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Name"
              value={addForm.details}
              onChange={handleAddChange("details")}
              fullWidth
              multiline
              minRows={2}
            />

            <Box
              sx={{
                mt: 1,
                p: 1.5,
                borderRadius: 1,
                bgcolor: "rgba(37,48,127,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "#0B0B0B" }}>
                Line total
              </Typography>
              <Typography variant="h6">
                ₹{Number.isFinite(lineTotal) ? lineTotal : 0}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog} disabled={addLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSubmit}
            disabled={addLoading}
            startIcon={addLoading ? <CircularProgress size={18} /> : null}
          >
            {addLoading ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog
        open={addPaymentOpen}
        onClose={addPaymentLoading ? undefined : closeAddPayment}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Payment</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Amount */}
            <TextField
              label="Amount"
              value={addPaymentForm.amount}
              onChange={(e) => {
                setAddPaymentForm((p) => ({
                  ...p,
                  amount: e.target.value === "" ? "" : Number(e.target.value),
                }));
                setAddPaymentErrors((prev) => ({ ...prev, amount: "" })); // clear error while typing
              }}
              onBlur={() => {
                if (
                  !addPaymentForm.amount ||
                  isNaN(addPaymentForm.amount) ||
                  Number(addPaymentForm.amount) <= 0
                ) {
                  setAddPaymentErrors((prev) => ({
                    ...prev,
                    amount: "Enter a valid amount",
                  }));
                }
              }}
              error={!!addPaymentErrors.amount}
              helperText={addPaymentErrors.amount}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
                inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
              }}
            />

            {/* Payment Mode */}
            <TextField
              label="Mode"
              value={addPaymentForm.mode}
              onChange={(e) => {
                setAddPaymentForm((p) => ({ ...p, mode: e.target.value }));
                setAddPaymentErrors((prev) => ({ ...prev, mode: "" })); // clear error
              }}
              onBlur={() => {
                if (!addPaymentForm.mode) {
                  setAddPaymentErrors((prev) => ({
                    ...prev,
                    mode: "Select a payment mode",
                  }));
                }
              }}
              error={!!addPaymentErrors.mode}
              helperText={addPaymentErrors.mode}
              fullWidth
              select
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
            </TextField>

            {/* Reference ID */}
            <TextField
              label="Reference (optional)"
              value={addPaymentForm.reference}
              onChange={(e) => {
                const value = e.target.value;
                setAddPaymentForm((p) => ({ ...p, reference: value }));
                setAddPaymentErrors((prev) => ({ ...prev, reference: "" })); // clear error
              }}
              onBlur={() => {
                if (
                  addPaymentForm.reference &&
                  addPaymentForm.reference.length > 30
                ) {
                  setAddPaymentErrors((prev) => ({
                    ...prev,
                    reference: "Reference too long",
                  }));
                }
              }}
              error={!!addPaymentErrors.reference}
              helperText={addPaymentErrors.reference}
              fullWidth
            />

            {/* General error (like API failure) */}
            {addPaymentErrors.general && (
              <Typography color="error" variant="body2">
                {addPaymentErrors.general}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeAddPayment} disabled={addPaymentLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPaymentSubmit}
            disabled={addPaymentLoading}
            startIcon={
              addPaymentLoading ? <CircularProgress size={18} /> : null
            }
          >
            {addPaymentLoading ? "Adding..." : "Add Payment"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hidden Printable Section */}
      <div style={{ display: "none" }}>
        <div id="printable-bill" className="bill-wrap">
          {/* Header */}
          <div className="bill-head">
            {logoUrl ? (
              <img className="logo" src={logoUrl} alt="Hospital Logo" />
            ) : null}
            <div className="titleblock" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {hospitalName}
              </div>
              <div>{hospitalAddr}</div>
              <div> {hospitalPhone}</div>
              {(hospitalGstin || hospitalPan) && (
                <div className="muted">
                  {hospitalGstin ? <>GSTIN: {hospitalGstin} </> : null}
                  {hospitalPan ? <>| PAN: {hospitalPan}</> : null}
                </div>
              )}
            </div>
          </div>

          <div className="bill-title">INVOICE</div>

          {/* Bill-to + Invoice Meta */}
          <div className="grid-2">
            <div className="box">
              <div className="section-title">Bill To</div>
              <div>
                <b>Patient:</b> {bill?.patient?.name || "—"}
              </div>
              <div>
                <b>Patient ID:</b>{" "}
                {bill?.patient?.patId || bill?.patient?.patId || "—"}
              </div>
              <div>
                <b>Phone:</b> {bill?.patient?.phone || "—"}
              </div>
              {bill?.patient?.age || bill?.patient?.gender ? (
                <div>
                  <b>Age/Gender:</b>{" "}
                  {[bill?.patient?.age, bill?.patient?.gender]
                    .filter(Boolean)
                    .join(" / ") || "—"}
                </div>
              ) : null}
              {bill?.patient?.address ? (
                <div>
                  <b>Address:</b> {bill.patient.address}
                </div>
              ) : null}
            </div>
            <div className="box">
              <div className="section-title">Invoice Details</div>
              <div>
                <b>Invoice No:</b> {bill?.invoiceNumber || "—"}
              </div>
              <div>
                <b>Invoice Date:</b>{" "}
                {bill?.invoiceDate
                  ? new Date(bill.invoiceDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "—"}
              </div>

              {bill?.doctor?.name ? (
                <div>
                  <b>Doctor:</b> {bill?.doctor?.name}
                </div>
              ) : null}
            </div>
          </div>
          {bill?.insurance?.hasInsurance ? (
            <div className="box">
              <div className="section-title">Insurance Details</div>
              <div>
                <b>Company Name:</b> {bill?.insurance?.insuranceCompany || "—"}
              </div>
              <div>
                <b>Policy Number:</b> {bill?.insurance?.policyNumber || "—"}
              </div>
              <div>
                <b>Insurance ID:</b> {bill?.insurance?.insuranceIdNumber || "—"}
              </div>
              <div>
                <b>Employee Code:</b> {bill?.insurance?.employeeCode || "—"}
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* Services Table */}
          <table className="bill">
            <thead>
              <tr>
                <th style={{ width: 36 }} className="center">
                  #
                </th>
                <th>Description</th>
                {hasGST && (
                  <th className="center" style={{ width: 80 }}>
                    HSN/SAC
                  </th>
                )}
                <th className="center" style={{ width: 60 }}>
                  Date
                </th>
                <th className="center" style={{ width: 60 }}>
                  Qty
                </th>
                <th className="right" style={{ width: 90 }}>
                  Rate
                </th>
                {hasGST && (
                  <>
                    <th className="center" style={{ width: 70 }}>
                      GST %
                    </th>
                    <th className="right" style={{ width: 90 }}>
                      GST Amt
                    </th>
                  </>
                )}
                <th className="right" style={{ width: 110 }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedRows).map(([category, rows], catIndex) => (
                <React.Fragment key={catIndex}>
                  {/* Category Header Row */}
                  <tr style={{ background: "#f9f9f9" }}>
                    <td colSpan={hasGST ? 9 : 7} style={{ fontWeight: "bold" }}>
                      {category}
                    </td>
                  </tr>

                  {/* Items under this category */}
                  {rows.map((r, idx) => (
                    <tr key={`${catIndex}-${idx}`}>
                      <td className="center">{idx + 1}</td>
                      <td>{r.name}</td>
                      {hasGST && <td className="center">{r.hsn || "—"}</td>}
                      <td className="center">
                        {r.date ? new Date(r.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="center">{r.qty}</td>
                      <td className="right">
                        ₹{r.rate.toLocaleString("en-IN")}
                      </td>
                      {hasGST && (
                        <>
                          <td className="center">{r.gstPct}%</td>
                          <td className="right">
                            ₹
                            {r.gstAmt.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </>
                      )}
                      <td className="right">
                        ₹
                        {r.lineTotal.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}

                  {/* Optional category subtotal */}
                  <tr style={{ background: "#efefef" }}>
                    <td colSpan={hasGST ? 8 : 6} className="right">
                      <b>Subtotal ({category})</b>
                    </td>
                    <td className="right">
                      <b>
                        ₹
                        {rows
                          .reduce((sum, r) => sum + r.lineTotal, 0)
                          .toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                      </b>
                    </td>
                  </tr>
                </React.Fragment>
              ))}

              {Object.keys(groupedRows).length === 0 && (
                <tr>
                  <td colSpan={hasGST ? 8 : 6} className="center">
                    No services
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="totals">
            {/* <div className="row">
                    <div className="label">
                      <b>Subtotal</b>
                    </div>
                    <div className="value">
                      ₹
                      {subTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div> */}
            {hasGST && (
              <div className="row">
                <div className="label">
                  <b>Total GST</b>
                </div>
                <div className="value">
                  ₹
                  {taxTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            )}
            {/* <div className="row">
                    <div className="label">Round Off</div>
                    <div className="value">
                      ₹
                      {roundOff.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div> */}
            <div className="row">
              <div className="label">
                <b>Grand Total</b>
              </div>
              <div className="value">
                <b>
                  ₹
                  {netPayable.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </b>
              </div>
            </div>
            <div className="row">
              <div className="label">Paid</div>
              <div className="value">
                ₹{paidAmt.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="row">
              <div className="label">
                <b>Balance Due</b>
              </div>
              <div className="value">
                <b>
                  ₹
                  {balanceDue.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </b>
              </div>
            </div>
          </div>

          {/* Amount in words */}
          <div className="amount-words">
            <b>Amount in words:</b> {amountInWordsINR(netPayable)}
          </div>

          {/* Signatures */}
          <div className="signatures">
            <div className="sig-box">
              <span>Patient / Authorized Signatory</span>
              <span style={{ opacity: 0.6 }}>Signature</span>
            </div>
            <div className="sig-box">
              <span>For {hospitalName}</span>
              <span style={{ opacity: 0.6 }}>Authorized Signatory</span>
            </div>
          </div>

          {/* Footer */}
          <div className="footnote">
            This is a computer-generated invoice. Subject to jurisdiction.
            Thanks for choosing <b>{hospitalName}</b>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetailsReception;
