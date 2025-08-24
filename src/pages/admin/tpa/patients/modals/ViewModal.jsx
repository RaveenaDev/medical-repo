import React, { useState } from "react";
import styles from "./ViewModal.module.scss";
import { ChevronUp, ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateStatusOfInsuredPatients } from "../../../../../components/State/Admin/Action.js";
import EstimateBill from "./EstimateBill.jsx";
const ViewModal = ({ onClose, record }) => {
  const { patient } = record;

  // console.log("Rec: ",record)
  const [activeModal, setActiveModal] = useState(null);
  const statusOptions = ["Approved", "Rejected", "Pending"];
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    record.admissionDetails.insurance.insuranceApproved
      .charAt(0)
      .toUpperCase() +
      record.admissionDetails.insurance.insuranceApproved.slice(1)
  );

  const [approvedAmount, setApprovedAmount] = useState(
    record.admissionDetails.insurance.approvedAmount || "" // if you already store it in backend
  );

  const dispatch = useDispatch();

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
    dispatch(updateStatusOfInsuredPatients(record._id, payload.status));
    onClose();
  };
  const closeBill = () => {
    setActiveModal(null);
  };
  const handleBillClick = (record) => {
    setActiveModal("bill");
  };
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Patient Insurance Details</h1>

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
                type="number"
                className={styles.input}
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                placeholder="Enter approved amount"
              />
            </div>
          )}

          <div className={styles.openBill}>
            <button onClick={handleBillClick} className={styles.openBillBtn}>
              Open Estimate Bill
            </button>
          </div>
        </div>

        <div className={styles.submitContainer} onClick={handleSave}>
          <button>Save</button>
        </div>
        {/* Modal */}
        {activeModal === "bill" && (
          <>
            <div className={styles.backdropOverlay2} />
            <div className={styles.billModal}>
              <EstimateBill onClose={closeBill} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewModal;
