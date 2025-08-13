import React, { useState } from "react";
import styles from "./ViewModal.module.scss";
import { ChevronUp, ChevronDown } from "lucide-react";
import { X } from "lucide-react";
const ViewModal = ({ onClose, record }) => {
  const {
    caseId,
    patient: { name, email, phone },
    status,
    totalAmount,
    company,
  } = record;

  const statusOptions = ["Completed", "Ongoing", "Pending"];
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Record New Vital</h1>

        {/* content */}
        <div className={styles.content}>
          <div className={styles.data}>
            <p className={styles.label}>Case-ID</p>
            <p className={styles.value}>{caseId}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Name</p>
            <p className={styles.value}>{name}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{email}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Phone</p>
            <p className={styles.value}>{phone}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Status</p>
            <div className={styles.dropdown}>
              <button
                className={`${styles.trigger} ${
                  selectedStatus === "Completed"
                    ? styles.completed
                    : selectedStatus === "Ongoing"
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
                      onClick={() => {
                        setSelectedStatus(option);
                        setOpenStatus(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Total Amount</p>
            <p className={styles.value}>{totalAmount}</p>
          </div>

          <div className={styles.data}>
            <p className={styles.label}>Company</p>
            <p className={styles.value}>{company}</p>
          </div>
        </div>

        <div className={styles.submitContainer}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
