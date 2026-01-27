import React, { useEffect, useState } from "react";
import styles from "./ViewModal.module.scss";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  editInsuredPatients,
  getEstimatedBill,
  updateStatusOfInsuredPatients,
} from "../../../../../components/State/Admin/Action.js";
import EstimateBill from "./EstimateBill.jsx";
import ViewBill from "./viewBillModal/ViewBill.jsx";
import OngoingBill from "./ongoingBill/OngoingBill.jsx";

const ViewModal = ({ onClose, record }) => {
  const { patient } = record;
  // console.log("rex", record);

  const [activeModal, setActiveModal] = useState(null);
  const statusOptions = ["Approved", "Rejected", "Pending"];
  const [openStatus, setOpenStatus] = useState(false);

  // ---------- Discount state ----------
  const [hasDiscount, setHasDiscount] = useState(false); // yes / no
  const [discountType, setDiscountType] = useState(""); // Flat | Percentage
  const [discountValue, setDiscountValue] = useState("");
  // ------------------------------------
  const [selectedStatus, setSelectedStatus] = useState(
    record.admissionDetails.insurance.insuranceApproved
      .charAt(0)
      .toUpperCase() +
      record.admissionDetails.insurance.insuranceApproved.slice(1),
  );

  const [approvedAmount, setApprovedAmount] = useState(
    record.admissionDetails.insurance.amountApproved || "",
  );

  // ---------- helpers ----------
  function formatDateInput(dateVal) {
    if (!dateVal) return "";
    const d = new Date(dateVal);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  // ------------------------------

  // ---------- Edit mode state for Patient Profile ----------
  const [editMode, setEditMode] = useState(false);
  const [patientForm, setPatientForm] = useState({
    name: patient?.name || "",
    email: patient?.email || "",
    phone: patient?.phone || "",
    insuranceIdNumber:
      record?.admissionDetails?.insurance?.insuranceIdNumber || "",
    insuranceCompany:
      record?.admissionDetails?.insurance?.insuranceCompany || "",
    employeeCode: record?.admissionDetails?.insurance?.employeeCode || "",
    policyNumber: record?.admissionDetails?.insurance?.policyNumber || "",
    insuranceStartDate: formatDateInput(
      record?.admissionDetails?.insurance?.insuranceStartDate,
    ),
    insuranceExpiryDate: formatDateInput(
      record?.admissionDetails?.insurance?.insuranceExpiryDate,
    ),
  });
  // --------------------------------------------------------

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEstimatedBill(record._id));
  }, [dispatch, record._id]);

  useEffect(() => {
    if (selectedStatus !== "Approved") {
      setHasDiscount(false);
      setDiscountType("");
      setDiscountValue("");
    }
  }, [selectedStatus]);

  const estimatedBill = useSelector((store) => store.admin.estimatedBill);

  const handleClick = (option) => {
    setSelectedStatus(option);
    setOpenStatus(false);
  };

  const handleSave = () => {
    const payload = {
      status: selectedStatus.toLowerCase(),
    };

    if (selectedStatus === "Approved") {
      payload.approvedAmount = Number(approvedAmount || 0);

      if (hasDiscount && discountType && discountValue) {
        payload.discount = {
          type: discountType,
          value: Number(discountValue),
        };
      }
    }

    dispatch(updateStatusOfInsuredPatients(record._id, payload));
    onClose();
  };

  const closeBill = () => setActiveModal(null);
  const handleBillClick = () => setActiveModal("bill");

  // ---------- Indian currency formatting ----------
  const [formattedAmount, setFormattedAmount] = useState("");

  const formatIndianCurrency = (value) => {
    if (!value) return "";
    const s = value.toString().split("").reverse().join("");
    const parts = [];
    parts.push(s.substring(0, 3));
    let remaining = s.substring(3);
    while (remaining.length > 0) {
      parts.push(remaining.substring(0, 2));
      remaining = remaining.substring(2);
    }
    return parts.join(",").split("").reverse().join("");
  };

  const handleApprovedAmountChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setApprovedAmount(digitsOnly);
    setFormattedAmount(formatIndianCurrency(digitsOnly));
  };

  useEffect(() => {
    if (record.admissionDetails.insurance.amountApproved) {
      const amount = record.admissionDetails.insurance.amountApproved;
      setApprovedAmount(amount);
      setFormattedAmount(formatIndianCurrency(amount));
    }
  }, [record]);
  // ------------------------------------------------

  // ---------- Edit mode handlers ----------
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    // Reset form on entering edit mode so you get fresh values
    if (!editMode) {
      setPatientForm({
        name: patient?.name || "",
        email: patient?.email || "",
        phone: patient?.phone || "",
        insuranceIdNumber:
          record?.admissionDetails?.insurance?.insuranceIdNumber || "",
        insuranceCompany:
          record?.admissionDetails?.insurance?.insuranceCompany || "",
        employeeCode: record?.admissionDetails?.insurance?.employeeCode || "",
        policyNumber: record?.admissionDetails?.insurance?.policyNumber || "",
        insuranceStartDate: formatDateInput(
          record?.admissionDetails?.insurance?.insuranceStartDate,
        ),
        insuranceExpiryDate: formatDateInput(
          record?.admissionDetails?.insurance?.insuranceExpiryDate,
        ),
      });
    }
    setEditMode((v) => !v);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveProfile = async () => {
    // Flat payload for /admissions/:admissionId/insurance
    const payload = {
      insuranceIdNumber: patientForm.insuranceIdNumber || "",
      insuranceCompany: patientForm.insuranceCompany || "",
      employeeCode: patientForm.employeeCode || "",
      policyNumber: patientForm.policyNumber || "",
      insuranceStartDate: patientForm.insuranceStartDate || null, // 'YYYY-MM-DD' OK
      insuranceExpiryDate: patientForm.insuranceExpiryDate || null,
      // Optional: include status/amount here too if desired
      insuranceApproved: selectedStatus?.toLowerCase(),
      amountApproved:
        selectedStatus === "Approved" ? Number(approvedAmount || 0) : undefined,
    };

    dispatch(editInsuredPatients(record._id, payload));
    setEditMode(false);
    onClose();
  };
  // ----------------------------------------

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>

      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className={styles.title}>Patient Insurance Details</h1>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className={styles.viewBill}>
              <button
                className={styles.viewBillBtn}
                onClick={() => setActiveModal("ongoingBill")}
              >
                View Ongoing Bill
              </button>
            </div>
            {/* View / Create Estimate Bill */}
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

        {/* Edit profile toggle (pencil) */}
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "0.4rem",
          }}
          onClick={handleToggleEdit}
          title={editMode ? "Exit Edit Mode" : "Edit Patient Profile"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1313_1066"
              maskType="alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1313_1066)">
              <path
                d="M1.66699 20V16.6667H18.3337V20H1.66699ZM5.00033 13.3334H6.16699L12.667 6.85419L11.4795 5.66669L5.00033 12.1667V13.3334ZM3.33366 15V11.4584L12.667 2.14585C12.8198 1.99308 12.9969 1.87502 13.1982 1.79169C13.3996 1.70835 13.6114 1.66669 13.8337 1.66669C14.0559 1.66669 14.2712 1.70835 14.4795 1.79169C14.6878 1.87502 14.8753 2.00002 15.042 2.16669L16.1878 3.33335C16.3545 3.48613 16.476 3.66669 16.5524 3.87502C16.6288 4.08335 16.667 4.29863 16.667 4.52085C16.667 4.72919 16.6288 4.93405 16.5524 5.13544C16.476 5.33683 16.3545 5.52085 16.1878 5.68752L6.87533 15H3.33366Z"
                fill={editMode ? "#6C5CE7" : "#1C1B1F"}
              />
            </g>
          </svg>
          <span style={{ marginLeft: 6, fontSize: 13 }}>
            {editMode ? "Editing" : "Edit"}
          </span>
        </div>

        {/* content */}
        <div className={styles.content} style={{ marginTop: "-0.6rem" }}>
          {/* Name (kept read-only) */}
          <div className={styles.data}>
            <p className={styles.label}>Name</p>
            <p className={styles.value}>{patient?.name}</p>
          </div>

          {/* Email (read-only) */}
          <div className={styles.data}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{patient?.email}</p>
          </div>

          {/* Phone (read-only) */}
          <div className={styles.data}>
            <p className={styles.label}>Phone</p>
            <p className={styles.value}>{patient?.phone}</p>
          </div>

          {/* Insurance ID */}
          <div className={styles.data}>
            <p className={styles.label}>Insurance ID</p>
            {editMode ? (
              <input
                name="insuranceIdNumber"
                type="text"
                className={styles.input}
                value={patientForm.insuranceIdNumber}
                onChange={handleProfileChange}
                placeholder="Enter Insurance ID"
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.insuranceIdNumber}
              </p>
            )}
          </div>

          {/* Employee Code */}
          <div className={styles.data}>
            <p className={styles.label}>Employee Code</p>
            {editMode ? (
              <input
                name="employeeCode"
                type="text"
                className={styles.input}
                value={patientForm.employeeCode}
                onChange={handleProfileChange}
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.employeeCode}
              </p>
            )}
          </div>

          {/* Policy No. */}
          <div className={styles.data}>
            <p className={styles.label}>Policy No.</p>
            {editMode ? (
              <input
                name="policyNumber"
                type="text"
                className={styles.input}
                value={patientForm.policyNumber}
                onChange={handleProfileChange}
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.policyNumber}
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className={styles.data}>
            <p className={styles.label}>Start Date</p>
            {editMode ? (
              <input
                name="insuranceStartDate"
                type="date"
                className={styles.input}
                value={patientForm.insuranceStartDate}
                onChange={handleProfileChange}
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.insuranceStartDate &&
                  new Date(
                    record.admissionDetails.insurance.insuranceStartDate,
                  ).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div className={styles.data}>
            <p className={styles.label}>Expiry Date</p>
            {editMode ? (
              <input
                name="insuranceExpiryDate"
                type="date"
                className={styles.input}
                value={patientForm.insuranceExpiryDate}
                onChange={handleProfileChange}
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.insuranceExpiryDate &&
                  new Date(
                    record.admissionDetails.insurance.insuranceExpiryDate,
                  ).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Company */}
          <div className={styles.data}>
            <p className={styles.label}>Company</p>
            {editMode ? (
              <input
                name="insuranceCompany"
                type="text"
                className={styles.input}
                value={patientForm.insuranceCompany}
                onChange={handleProfileChange}
              />
            ) : (
              <p className={styles.value}>
                {record?.admissionDetails?.insurance?.insuranceCompany}
              </p>
            )}
          </div>

          {/* Status dropdown */}
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

          {/* Discount section (only when Approved) */}
          {selectedStatus === "Approved" && (
            <div className={styles.data}>
              <p className={styles.label}>Apply Discount?</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <label>
                  <input
                    type="radio"
                    name="discount"
                    checked={hasDiscount === true}
                    onChange={() => setHasDiscount(true)}
                  />{" "}
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="discount"
                    checked={hasDiscount === false}
                    onChange={() => setHasDiscount(false)}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          )}
          {selectedStatus === "Approved" && hasDiscount && (
            <div className={styles.data}>
              <p className={styles.label}>Discount Type</p>
              <select
                className={styles.input}
                value={discountType}
                onChange={(e) => {
                  setDiscountType(e.target.value);
                  setDiscountValue("");
                }}
              >
                <option value="">Select</option>
                <option value="Flat">Flat</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>
          )}
          {selectedStatus === "Approved" && hasDiscount && discountType && (
            <div className={styles.data}>
              <p className={styles.label}>
                {discountType === "Flat"
                  ? "Discount Amount"
                  : "Discount Percentage"}
              </p>
              <input
                type="number"
                className={styles.input}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={
                  discountType === "Flat" ? "Enter amount" : "Enter percentage"
                }
              />
            </div>
          )}
        </div>

        {/* Profile edit buttons */}
        {editMode && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button className={styles.openBillBtn} onClick={handleSaveProfile}>
              Save Profile
            </button>
            <button className={styles.viewBillBtn} onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        )}

        {/* Existing Save (insurance status) */}
        {!editMode && (
          <div className={styles.submitContainer} onClick={handleSave}>
            <button>Save</button>
          </div>
        )}

        {/* Modals */}
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
        {activeModal === "ongoingBill" && (
          <>
            <div
              className={styles.backdropOverlay2}
              onClick={() => setActiveModal(null)}
            />
            <div className={styles.billModal}>
              <OngoingBill record={record} onClose={closeBill} />
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
