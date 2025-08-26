import React, { useState } from "react";
import styles from "./ViewModal.module.scss";
import { ChevronUp, ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstimatedBill,
  updateStatusOfInsuredPatients,
} from "../../../../../components/State/Admin/Action.js";
import EstimateBill from "./EstimateBill.jsx";
import { useEffect } from "react";
import ViewBill from "./viewBillModal/ViewBill.jsx";
const ViewModal = ({ onClose, record }) => {
  const { patient } = record;

  // console.log("Rec: ",record)

  // console.log("Rec: ",record)
  const [activeModal, setActiveModal] = useState(null);
  const statusOptions = ["Approved", "Rejected", "Pending"];
  const [openStatus, setOpenStatus] = useState(false);
  const [isEstimateBillExist, setIsEstimateBillExist] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(
    record.admissionDetails.insurance.insuranceApproved
      .charAt(0)
      .toUpperCase() +
      record.admissionDetails.insurance.insuranceApproved.slice(1)
  );

  const [approvedAmount, setApprovedAmount] = useState(
    record.admissionDetails.insurance.amountApproved || "" // if you already store it in backend
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEstimatedBill(record._id));
  }, [dispatch, record._id]);

  const estimatedBill = useSelector((store) => store.admin.estimatedBill);
  const handleClick = (option) => {
    setSelectedStatus(option);
    setOpenStatus(false);
  };

  const handleSave = () => {
    const payload = {
      status: selectedStatus.toLowerCase(),
    };

    // if status = approved, add approvedAmount
    if (selectedStatus === "Approved") {
      payload.approvedAmount = approvedAmount;
    }

    // console.log("Sec: ",selectedStatus.toLowerCase())
    dispatch(updateStatusOfInsuredPatients(record._id, payload));
    onClose();
  };
  const closeBill = () => {
    setActiveModal(null);
  };
  const handleBillClick = (record) => {
    setActiveModal("bill");
  };

  // Add these after your existing state declarations
  const [formattedAmount, setFormattedAmount] = useState("");

  // Helper function to format number with commas
  const formatIndianCurrency = (value) => {
    if (!value) return "";

    const s = value.toString().split("").reverse().join("");
    const parts = [];

    parts.push(s.substring(0, 3)); // Last 3 digits

    let remaining = s.substring(3);
    while (remaining.length > 0) {
      parts.push(remaining.substring(0, 2)); // Every 2 digits after
      remaining = remaining.substring(2);
    }

    return parts.join(",").split("").reverse().join("");
  };

  // Helper function to remove commas from formatted string
  const removeCommasFromNumber = (value) => {
    return value.replace(/,/g, "");
  };

  // Replace your existing onChange handler with this
  const handleApprovedAmountChange = (e) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/[^0-9]/g, "");

    setApprovedAmount(digitsOnly);
    setFormattedAmount(formatIndianCurrency(digitsOnly));
  };

  // Initialize formatted amount
  useEffect(() => {
    if (record.admissionDetails.insurance.amountApproved) {
      const amount = record.admissionDetails.insurance.amountApproved;
      setApprovedAmount(amount);
      setFormattedAmount(formatIndianCurrency(amount));
    }
  }, [record]);

  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className={styles.title}>Patient Insurance Details</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={styles.viewBill}>
              <button
                className={styles.viewBillBtn}
                onClick={() => setActiveModal("viewBill")}
              >
                View Estimate Bill
              </button>
            </div>
            <div className={styles.openBill}>
              <button onClick={handleBillClick} className={styles.openBillBtn}>
                {estimatedBill ? "Edit" : "Create"} Estimate Bill
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className={styles.content}>
          <div className={styles.data}>
            <p className={styles.label}>PAT-ID</p>
            <p className={styles.value}>{patient?.patId}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Name</p>
            <p className={styles.value}>{patient.name}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{patient.email}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Phone</p>
            <p className={styles.value}>{patient.phone}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Employee Code</p>
            <p className={styles.value}>
              {patient?.insuranceDetails?.employeeCode}
            </p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Policy No.</p>
            <p className={styles.value}>
              {patient?.insuranceDetails?.policyNumber}
            </p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Start Date</p>
            <p className={styles.value}>
              {patient?.insuranceDetails?.insuranceStartDate &&
                new Date(
                  patient.insuranceDetails.insuranceStartDate
                ).toLocaleDateString()}
            </p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Expiry Date</p>
            <p className={styles.value}>
              {patient?.insuranceDetails?.insuranceExpiryDate &&
                new Date(
                  patient.insuranceDetails.insuranceExpiryDate
                ).toLocaleDateString()}
            </p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Company</p>
            <p className={styles.value}>
              {patient?.insuranceDetails?.insuranceCompany}
            </p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Status</p>
            <div className={styles.dropdown}>
              <button
                className={`${styles.trigger} ${
                  selectedStatus === "Rejected"
                    ? styles.rejected
                    : selectedStatus === "Approved"
                    ? styles.ongoing
                    : styles.pending
                } `}
                onClick={() => setOpenStatus((prev) => !prev)}
              >
                <p>{selectedStatus}</p>
                <span className={styles.arrow}>
                  {openStatus ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openStatus && (
                <ul className={styles.menu}>
                  {statusOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedStatus === option ? styles.active : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Approved Amount input (only when status = Approved) */}
          {selectedStatus === "Approved" && (
            <div className={styles.data}>
              <p className={styles.label}>Approved Amount</p>
              <input
                type="text"
                className={styles.input}
                value={formattedAmount}
                onChange={handleApprovedAmountChange}
                placeholder="Enter approved amount"
              />
            </div>
          )}
        </div>

        <div className={styles.submitContainer} onClick={handleSave}>
          <button>Save</button>
        </div>
        {/* Modal */}
        {activeModal === "bill" && (
          <>
            <div className={styles.backdropOverlay2} />
            <div className={styles.billModal}>
              <EstimateBill
                record={record}
                onClose={onClose}
                closeBill={closeBill}
                estimateOld={estimatedBill || undefined}
              />
            </div>
          </>
        )}
        {activeModal === "viewBill" && (
          <>
            <div
              className={styles.backdropOverlay2}
              onClick={() => setActiveModal(null)}
            />
            <div className={styles.billModal}>
              <ViewBill
                record={record}
                onClose={closeBill}
                estimatedBill={estimatedBill}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewModal;
