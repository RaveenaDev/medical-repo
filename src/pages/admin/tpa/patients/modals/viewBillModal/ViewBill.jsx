import { X } from "lucide-react";
import React, { useState } from "react";
import styles from "./ViewBill.module.scss";
const ViewBill = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1 className={styles.title}>Patient Estimated Bill</h1>

              <div className={styles.viewBill}>
                  <button
                      className={styles.viewBillBtn}
                  >
                      Print
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ViewBill;
